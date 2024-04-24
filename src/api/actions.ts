import axios, { AxiosError } from "axios";

const API_URL = "https://cuddly-happiness-9vvqqxp6g44299p7-3000.app.github.dev/api"
// "https://friendly-waffle-6j4wqrqg5pc5gv-3000.app.github.dev/api"

//"https://cautious-palm-tree-r5ww7995vrgh5q67-3000.app.github.dev/"

export interface DrinkData {
  type: string;
  size: string;
  toppings: string[];
  price: string;
  calories: number;
  category: 'Vegetarian' | 'Vegan' | 'Seafood' | 'Regular';
}

export const getDrinkData = async (drinkType: string): Promise<DrinkData> => {
  return new Promise<DrinkData>((resolve, reject) => {
    axios
      .get(`${API_URL}/drink/${drinkType}`)
      .then((res) => {
        resolve({
          type: drinkType,
          size: res.data.size,
          toppings: res.data.toppings,
          price: res.data.price,
          calories: res.data.calories,
          category: res.data.category,
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject(`${drinkType} not found`);
          } else {
            reject(axiosError.message);
          }
        } else {
          reject("An unknown error occurred");
        }
      });
  });
};

