import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import CartPage from "./Pages/CartPage/Cart";
import Navbar from "./Components/Navbar";
import DisplayProductsContextProvider from './Context/DisplayProductsContext/DisplayProductsContext';
import CartCountContextProvider from './Context/CartCountContext/CartCountContext';
import SelectionProductsContextProvider from "./Context/SelectionProductsContext/SelectionProductsContext"


function App() {
  return (
    <div>
      <CartCountContextProvider>
        <Navbar />
        <DisplayProductsContextProvider>
          <SelectionProductsContextProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/cart' element={<CartPage />} />
          </Routes>
          </SelectionProductsContextProvider>
        </DisplayProductsContextProvider>
      </CartCountContextProvider>
    </div>
  );
}

export default App;
