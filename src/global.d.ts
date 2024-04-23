interface DrinkData {
  type: string;
  size: string;
  ingredients: string[];
  price: string;
  calories: number;
  category: 'Coffee' | 'Tea' | 'Smoothie' | 'Soda';
}
