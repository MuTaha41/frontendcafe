// import axios, { AxiosError } from "axios";

// //const API_URL = "https://cautious-fiesta-9rjxq6gjgwx2xw5x-3000.app.github.dev/"
// const API_URL = "https://cautious-palm-tree-r5ww7995vrgh5q67-3000.app.github.dev/"

 

// export const getFoodData = async (foodType: string): Promise<FoodData> => {
//   return new Promise<FoodData>((resolve, reject) => {
//     axios
//       .get(`${API_URL}/food/${foodType}`)
//       .then((res) => {
//         resolve({
//           city: city,
//           temperature: res.data.temperature,
//           humidity: res.data.humidity,
//           wind: res.data.wind,
//           rain: res.data.rain,
//         });
//       })
//       .catch((error) => {
//         if (axios.isAxiosError(error)) {
//           const axiosError = error as AxiosError;
//           if (axiosError.response?.status === 404) {
//             reject("City not found");
//           } else {
//             // It's a good practice to reject with an Error object
//             reject(axiosError.message);
//           }
//         } else {
//           // Handle non-Axios errors
//           reject("An unknown error occurred");
//         }
//       });
//   });
// };

import axios, { AxiosError } from "axios";

const API_URL = "https://cautious-palm-tree-r5ww7995vrgh5q67-3000.app.github.dev/"

// export interface FoodData {
//   type: string;
//   size: string;
//   toppings: string[];
//   price: string;
// }

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

