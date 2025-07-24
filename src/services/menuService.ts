import { supabase } from '../lib/supabase';
import { isSupabaseConfigured } from '../lib/supabase';
import type { Drink, Topping, MilkOption, SweetnessLevel } from '../lib/supabase';
import { mockDrinks, mockToppings, mockMilkOptions, mockSweetnessLevels } from '../data/mockData';

export class MenuService {
  static async getDrinks(): Promise<Drink[]> {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        console.warn('Supabase is not configured. Using mock data.');
        return mockDrinks;
      }

      const { data, error } = await supabase
        .from('drinks')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching drinks:', error);
        throw new Error('Failed to fetch drinks');
      }

      return data || [];
    } catch (error) {
      console.error('MenuService.getDrinks error:', error);
      throw error;
    }
  }

  static async getDrinksByCategory(category: string): Promise<Drink[]> {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        console.warn('Supabase is not configured. Using mock data.');
        if (category === 'all') {
          return mockDrinks;
        }
        return mockDrinks.filter(drink => drink.category === category);
      }

      if (category === 'all') {
        return this.getDrinks();
      }

      const { data, error } = await supabase
        .from('drinks')
        .select('*')
        .eq('category', category)
        .order('name');

      if (error) {
        console.error('Error fetching drinks by category:', error);
        throw new Error('Failed to fetch drinks by category');
      }

      return data || [];
    } catch (error) {
      console.error('MenuService.getDrinksByCategory error:', error);
      throw error;
    }
  }

  static async getToppings(): Promise<Topping[]> {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        console.warn('Supabase is not configured. Using mock data.');
        return mockToppings;
      }

      const { data, error } = await supabase
        .from('toppings')
        .select('*')
        .eq('available', true)
        .order('name');

      if (error) {
        console.error('Error fetching toppings:', error);
        throw new Error('Failed to fetch toppings');
      }

      return data || [];
    } catch (error) {
      console.error('MenuService.getToppings error:', error);
      throw error;
    }
  }

  static async getMilkOptions(): Promise<MilkOption[]> {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        console.warn('Supabase is not configured. Using mock data.');
        return mockMilkOptions;
      }

      const { data, error } = await supabase
        .from('milk_options')
        .select('*')
        .eq('available', true)
        .order('price', { ascending: true });

      if (error) {
        console.error('Error fetching milk options:', error);
        throw new Error('Failed to fetch milk options');
      }

      return data || [];
    } catch (error) {
      console.error('MenuService.getMilkOptions error:', error);
      throw error;
    }
  }

  static async getSweetnessLevels(): Promise<SweetnessLevel[]> {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        console.warn('Supabase is not configured. Using mock data.');
        return mockSweetnessLevels;
      }

      const { data, error } = await supabase
        .from('sweetness_levels')
        .select('*')
        .order('level');

      if (error) {
        console.error('Error fetching sweetness levels:', error);
        throw new Error('Failed to fetch sweetness levels');
      }

      return data || [];
    } catch (error) {
      console.error('MenuService.getSweetnessLevels error:', error);
      throw error;
    }
  }

  static async getPopularDrinks(): Promise<Drink[]> {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        console.warn('Supabase is not configured. Using mock data.');
        return mockDrinks.filter(drink => drink.popular);
      }

      const { data, error } = await supabase
        .from('drinks')
        .select('*')
        .eq('popular', true)
        .order('name');

      if (error) {
        console.error('Error fetching popular drinks:', error);
        throw new Error('Failed to fetch popular drinks');
      }

      return data || [];
    } catch (error) {
      console.error('MenuService.getPopularDrinks error:', error);
      throw error;
    }
  }
}