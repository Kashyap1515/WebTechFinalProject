import { Route, Routes } from "react-router-dom";
import ProductList from "../Pages/ProductList";
import Product from "../Component/Product";

function ProductRoutes() {
    return (
        <>
            <Routes>
                <Route index element={<ProductList />} />
                <Route path=":id" element={<Product />} />
            </Routes>
        </>
    );
} 
export default ProductRoutes;