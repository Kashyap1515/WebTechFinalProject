import { Route, Routes } from "react-router-dom";
import NotFound from "../Pages/NotFound";
import ProductRoutes  from "./ProductRoutes";
import Account from "../Pages/Account";
import Cart from "../Pages/Cart";
import HeaderLayout from "../Component/HeaderLayout";

 function HomeRoutes({cartItems, addToCart, changeQuantity, removeFromCart, formData, handleInputChange, handleSubmit}) {
    return (
        <>
            <HeaderLayout formData={formData}/>
            <Routes>
                <Route index element={<ProductRoutes addToCart={addToCart}/>} />
                <Route path="/product/*" element={<ProductRoutes addToCart={addToCart}/>} />
                <Route path="cart" element={<Cart cartItems={cartItems} changeQuantity={changeQuantity} removeFromCart={removeFromCart}/>} />
                <Route path="account" element={<Account formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default HomeRoutes;