import { useState, useCallback } from 'react';
import { OrderService, type CartItem } from '../services/orderService';
import type { Drink, Topping, MilkOption, SweetnessLevel } from '../lib/supabase';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addToCart = useCallback((
    drink: Drink,
    toppings: Topping[],
    milkOption: MilkOption,
    sweetnessLevel: SweetnessLevel,
    quantity: number = 1
  ) => {
    const totalPrice = OrderService.calculateItemPrice(drink, toppings, milkOption);
    
    const newItem: CartItem = {
      drink,
      quantity,
      toppings,
      milkOption,
      sweetnessLevel,
      totalPrice
    };

    setCartItems(prev => {
      // Check if identical item already exists
      const existingItemIndex = prev.findIndex(item => 
        item.drink.id === drink.id &&
        item.milkOption.id === milkOption.id &&
        item.sweetnessLevel.id === sweetnessLevel.id &&
        JSON.stringify(item.toppings.map(t => t.id).sort()) === 
        JSON.stringify(toppings.map(t => t.id).sort())
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prev, newItem];
      }
    });
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateQuantity = useCallback((index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }

    setCartItems(prev => {
      const updatedItems = [...prev];
      updatedItems[index] = {
        ...updatedItems[index],
        quantity
      };
      return updatedItems;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0);
  }, [cartItems]);

  const submitOrder = useCallback(async (customerInfo?: { email?: string; name?: string }) => {
    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    try {
      setIsSubmitting(true);

      const orderData = {
        customerEmail: customerInfo?.email,
        customerName: customerInfo?.name,
        items: cartItems,
        totalAmount: getTotalPrice()
      };

      const order = await OrderService.createOrder(orderData);
      clearCart();
      return order;
    } catch (error) {
      console.error('Error submitting order:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [cartItems, getTotalPrice, clearCart]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    submitOrder,
    isSubmitting
  };
}