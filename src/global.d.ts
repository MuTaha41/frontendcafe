interface FoodData {
  type: string;
  size: string;
  toppings: string[];
  price: string;
  calories: number;
  category: 'Vegetarian' | 'Vegan' | 'Seafood' | 'Regular';
}
