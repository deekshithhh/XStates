import logo from "./logo.svg";
import "./App.css";
import Homepage from "./Components/homepage";
import LocationSelector from "./Components/api"
import CountrySelector from "./Components/Home";

function App() {
  return (
    <div >
      {/* <Homepage /> */}
      {/* <LocationSelector /> */}
      <CountrySelector />
    </div>
  );
}

export default App;
