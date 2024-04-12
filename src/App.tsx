import "./App.css";
import NavBar from "./components/NavBar";
import FoodCard from "./components/FoodCard";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-auto flex-col items-center align-middle justify-center  h-full w-full">
        <FoodCard />
      </div>
    </div>
  );
};

export default App;
