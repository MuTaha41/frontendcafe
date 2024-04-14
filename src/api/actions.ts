import axios, { AxiosError } from "axios";

const API_URL = "https://special-giggle-5755v6679742v9gj-3000.app.github.dev/"

//"https://cautious-palm-tree-r5ww7995vrgh5q67-3000.app.github.dev/"

export interface FoodData {
  type: string;
  size: string;
  toppings: string[];
  price: string;
}

export const getFoodData = async (foodType: string): Promise<FoodData> => {
  return new Promise<FoodData>((resolve, reject) => {
    axios
      .get(`${API_URL}/food/${foodType}`)
      .then((res) => {
        resolve({
          type: foodType,
          size: res.data.size,
          toppings: res.data.toppings,
          price: res.data.price,
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject(`${foodType} not found`);
          } else {
            reject(axiosError.message);
          }
        } else {
          reject("An unknown error occurred");
        }
      });
  });
};

