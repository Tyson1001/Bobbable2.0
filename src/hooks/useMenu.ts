import { useState, useEffect } from 'react';
import { MenuService } from '../services/menuService';
import type { Drink, Topping, MilkOption, SweetnessLevel } from '../lib/supabase';

export function useMenu() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [milkOptions, setMilkOptions] = useState<MilkOption[]>([]);
  const [sweetnessLevels, setSweetnessLevels] = useState<SweetnessLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMenuData();
  }, []);

  const loadMenuData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [drinksData, toppingsData, milkOptionsData, sweetnessLevelsData] = await Promise.all([
        MenuService.getDrinks(),
        MenuService.getToppings(),
        MenuService.getMilkOptions(),
        MenuService.getSweetnessLevels()
      ]);

      setDrinks(drinksData);
      setToppings(toppingsData);
      setMilkOptions(milkOptionsData);
      setSweetnessLevels(sweetnessLevelsData);
    } catch (err) {
      console.error('Error loading menu data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load menu data');
    } finally {
      setLoading(false);
    }
  };

  const getDrinksByCategory = async (category: string) => {
    try {
      setError(null);
      const categoryDrinks = await MenuService.getDrinksByCategory(category);
      return categoryDrinks;
    } catch (err) {
      console.error('Error loading drinks by category:', err);
      setError(err instanceof Error ? err.message : 'Failed to load drinks');
      return [];
    }
  };

  const refreshMenu = () => {
    loadMenuData();
  };

  return {
    drinks,
    toppings,
    milkOptions,
    sweetnessLevels,
    loading,
    error,
    getDrinksByCategory,
    refreshMenu
  };
}