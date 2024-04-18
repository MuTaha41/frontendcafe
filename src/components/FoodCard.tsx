import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button } from "@nextui-org/react";
import { useState } from "react";
// Import your food icons or images if you have any
import { getFoodData, FoodData } from "../api/actions"; // Make sure this path is correct

const FoodCard: React.FC = () => {
  const [data, setData] = useState<FoodData | undefined>();
  const [loadingState, setLoadingState] = useState(false);
  const [foodType, setFoodType] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    console.log("Fetching Food Data...");
    console.log(foodType);
    setLoadingState(true);
    getFoodData(foodType)
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
            id="foodtype"
            type="text"
            label="Food Type"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            isClearable={true} // Assuming 'isClearable' is the correct prop name
          />


            {/* <Input
              id="foodtype"
              type="text"
              label="Food Type"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              clearable
            /> */}
            <Button isLoading={loadingState} type="submit">
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">{data.type}</h1>
            
            <p className="text-xl">Size: {data.size}</p>
            <p className="text-lg">Toppings: {data.toppings.join(", ")}</p>
            <p className="text-lg">Price: {data.price}</p>
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            {error ? (
              <p className="text-xl font-bold">{error}</p>
            ) : (
              <p className="text-xl font-bold">Please enter a food type</p>
            )}
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {data && <p className="text-xs text-gray-600 ">Last update successful.</p>}
          {!data && <p className="text-xs text-gray-600 ">Waiting for input...</p>}
        </div>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
