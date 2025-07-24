import { supabase } from '../lib/supabase';
import { isSupabaseConfigured } from '../lib/supabase';
import type { Order, OrderItem, Drink, Topping, MilkOption, SweetnessLevel } from '../lib/supabase';

export interface CartItem {
  drink: Drink;
  quantity: number;
  toppings: Topping[];
  milkOption: MilkOption;
  sweetnessLevel: SweetnessLevel;
  totalPrice: number;
}

export interface CreateOrderRequest {
  customerEmail?: string;
  customerName?: string;
  items: CartItem[];
  totalAmount: number;
}

export class OrderService {
  static async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error('Supabase is not configured. Please connect to Supabase.');
      }

      // Start a transaction by creating the order first
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_email: orderData.customerEmail,
          customer_name: orderData.customerName,
          total_amount: orderData.totalAmount,
          status: 'pending',
          payment_status: 'pending'
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        throw new Error('Failed to create order');
      }

      // Create order items
      for (const item of orderData.items) {
        const { data: orderItem, error: orderItemError } = await supabase
          .from('order_items')
          .insert({
            order_id: order.id,
            drink_id: item.drink.id,
            quantity: item.quantity,
            unit_price: item.totalPrice,
            milk_option_id: item.milkOption.id,
            sweetness_level_id: item.sweetnessLevel.id
          })
          .select()
          .single();

        if (orderItemError) {
          console.error('Error creating order item:', orderItemError);
          throw new Error('Failed to create order item');
        }

        // Create order item toppings
        for (const topping of item.toppings) {
          const { error: toppingError } = await supabase
            .from('order_item_toppings')
            .insert({
              order_item_id: orderItem.id,
              topping_id: topping.id
            });

          if (toppingError) {
            console.error('Error creating order item topping:', toppingError);
            throw new Error('Failed to create order item topping');
          }
        }
      }

      return order;
    } catch (error) {
      console.error('OrderService.createOrder error:', error);
      throw error;
    }
  }

  static async getOrder(orderId: string): Promise<Order | null> {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error('Supabase is not configured. Please connect to Supabase.');
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Order not found
        }
        console.error('Error fetching order:', error);
        throw new Error('Failed to fetch order');
      }

      return data;
    } catch (error) {
      console.error('OrderService.getOrder error:', error);
      throw error;
    }
  }

  static async getOrderItems(orderId: string): Promise<OrderItem[]> {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error('Supabase is not configured. Please connect to Supabase.');
      }

      const { data, error } = await supabase
        .from('order_items')
        .select(`
          *,
          drink:drinks(*),
          milk_option:milk_options(*),
          sweetness_level:sweetness_levels(*),
          order_item_toppings(
            topping:toppings(*)
          )
        `)
        .eq('order_id', orderId);

      if (error) {
        console.error('Error fetching order items:', error);
        throw new Error('Failed to fetch order items');
      }

      // Transform the data to include toppings array
      const orderItems = (data || []).map(item => ({
        ...item,
        toppings: item.order_item_toppings?.map((oit: any) => oit.topping) || []
      }));

      return orderItems;
    } catch (error) {
      console.error('OrderService.getOrderItems error:', error);
      throw error;
    }
  }

  static async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order> {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error('Supabase is not configured. Please connect to Supabase.');
      }

      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select()
        .single();

      if (error) {
        console.error('Error updating order status:', error);
        throw new Error('Failed to update order status');
      }

      return data;
    } catch (error) {
      console.error('OrderService.updateOrderStatus error:', error);
      throw error;
    }
  }

  static async updatePaymentStatus(orderId: string, paymentStatus: Order['payment_status']): Promise<Order> {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error('Supabase is not configured. Please connect to Supabase.');
      }

      const { data, error } = await supabase
        .from('orders')
        .update({ 
          payment_status: paymentStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select()
        .single();

      if (error) {
        console.error('Error updating payment status:', error);
        throw new Error('Failed to update payment status');
      }

      return data;
    } catch (error) {
      console.error('OrderService.updatePaymentStatus error:', error);
      throw error;
    }
  }

  static calculateItemPrice(
    drink: Drink,
    toppings: Topping[],
    milkOption: MilkOption
  ): number {
    let total = drink.price;
    
    // Add topping prices
    toppings.forEach(topping => {
      total += topping.price;
    });
    
    // Add milk option price
    total += milkOption.price;
    
    return Math.round(total * 100) / 100; // Round to 2 decimal places
  }
}