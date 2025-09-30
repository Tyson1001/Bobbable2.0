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
        console.warn('Falling back to mock data due to Supabase error');
        return mockDrinks;
      }

      return data || [];
    } catch (error) {
      console.error('MenuService.getDrinks error:', error);
      console.warn('Falling back to mock data due to error');
      return mockDrinks;
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
        console.warn('Falling back to mock data due to Supabase error');
        if (category === 'all') {
          return mockDrinks;
        }
        return mockDrinks.filter(drink => drink.category === category);
      }

      return data || [];
    } catch (error) {
      console.error('MenuService.getDrinksByCategory error:', error);
      console.warn('Falling back to mock data due to error');
      if (category === 'all') {
        return mockDrinks;
      }
      return mockDrinks.filter(drink => drink.category === category);
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
        console.warn('Falling back to mock data due to Supabase error');
        return mockToppings;
      }

      return data || [];
    } catch (error) {
      console.error('MenuService.getToppings error:', error);
      console.warn('Falling back to mock data due to error');
      return mockToppings;
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
        console.warn('Falling back to mock data due to Supabase error');
        return mockMilkOptions;
      }

      return data || [];
    } catch (error) {
      console.error('MenuService.getMilkOptions error:', error);
      console.warn('Falling back to mock data due to error');
      return mockMilkOptions;
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
        console.warn('Falling back to mock data due to Supabase error');
        return mockSweetnessLevels;
      }

      return data || [];
    } catch (error) {
      console.error('MenuService.getSweetnessLevels error:', error);
      console.warn('Falling back to mock data due to error');
      return mockSweetnessLevels;
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
        console.warn('Falling back to mock data due to Supabase error');
        return mockDrinks.filter(drink => drink.popular);
      }

      return data || [];
    } catch (error) {
      console.error('MenuService.getPopularDrinks error:', error);
      console.warn('Falling back to mock data due to error');
      return mockDrinks.filter(drink => drink.popular);
    }
  }
}