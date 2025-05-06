import { useState, useEffect } from 'react';
import { filter } from '@/utils/urls';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(filter + "?category=&tag=");
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return { categories };
};