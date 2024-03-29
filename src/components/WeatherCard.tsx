import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { FaUtensils } from "react-icons/fa"; // Example restaurant icon
import { getRestaurantData } from "../api/actions"; // Update this import to your actual function

// Update to use your actual RestaurantData interface
interface RestaurantData {
  name: string;
  address: string;
  cuisine: string;
  rating: number;
  isOpen: boolean;
}

const RestaurantCard: React.FC = () => {
  const [data, setData] = useState<RestaurantData>();
  const [loadingState, setLoadingState] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    console.log("Fetching Restaurant Data...");
    setLoadingState(true);
    getRestaurantData(search) // Assume this function now fetches restaurant data
      .then((res) => {
        setError("");
        if (res) {
          console.log(res);
          setData(res);
          setLoadingState(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });
  };

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="restaurantSearch"
              type="text"
              label="Search Restaurants"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button color="primary" isLoading={loadingState} type="submit">
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <FaUtensils className="w-20 h-20" />
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="text-xl">{data.address}</p>
            <p className="text-lg">Cuisine: {data.cuisine}</p>
            <p className="text-lg">Rating: {data.rating} / 5</p>
            <p className="text-lg">{data.isOpen ? "Open Now" : "Closed"}</p>
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please search for a restaurant</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {!data && <p className="text-xs text-gray-600 ">Waiting for input...</p>}
        </div>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;
