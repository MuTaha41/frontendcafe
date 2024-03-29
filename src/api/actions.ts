import axios, { AxiosError } from "axios";
import { RestaurantData } from './global'; // Ensure this import points to the file where RestaurantData is defined

const API_URL = "https://example.com/api"; // Replace with your actual Restaurant API URL

// This function name should also be updated to reflect its new purpose
export const getRestaurantData = async (): Promise<RestaurantData[]> => {
  return new Promise<RestaurantData[]>((resolve, reject) => {
    axios
      .get(`${API_URL}/restaurants`) // The endpoint will likely be different for restaurants
      .then((res) => {
        // Assuming res.data is an array of restaurant objects
        resolve(res.data.map((restaurant: any) => ({
          name: restaurant.name,
          address: restaurant.address,
          cuisine: restaurant.cuisine,
          rating: restaurant.rating,
          isOpen: restaurant.isOpen, // Or whatever logic you need to determine if it's open
        })));
      })
      .catch((error: AxiosError | Error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            reject(new Error("Restaurants not found"));
          } else {
            reject(new Error(error.message));
          }
        } else {
          reject(new Error("An unknown error occurred"));
        }
      });
  });
};
