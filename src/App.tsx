import "./App.css";
import NavBar from "./components/NavBar";
import RestaurantCard from "./components/RestaurantCard"; // Renamed from WeatherCard

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-auto flex-col items-center align-middle justify-center  h-full w-full">
        {/* Assuming that RestaurantCard is now expecting restaurant data */}
        <RestaurantCard />
      </div>
    </div>
  );
};

export default App;
