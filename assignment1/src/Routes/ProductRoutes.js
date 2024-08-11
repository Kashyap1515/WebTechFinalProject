import { Route, Routes } from "react-router-dom";
import ProductList from "../Component/ProductComponent/ProductList";
import Product from "../Component/ProductComponent/Product";

function ProductRoutes({ addToCart }) {
    return (
        <>
            <Routes>
                <Route index element={<ProductList addToCart={addToCart}/>} />
                <Route path=":id" element={<Product addToCart={addToCart}/>} />
            </Routes>
        </>
    );
} 
export default ProductRoutes;