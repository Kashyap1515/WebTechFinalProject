import { Navigate, Route, Routes } from "react-router-dom";
import ProductRoutes from "./ProductRoutes";
import Account from "../Pages/Account";
import Cart from "../Pages/Cart";
import HeaderLayout from "../Component/HeaderLayout";
import AdminProductList from "../Pages/Admin/AdminProductList";
import AddProduct from "../Pages/Admin/AddProduct";
import CheckoutScreen from "../Pages/Checkout";
import Login from "../Pages/Auth/Login";
import React, { useEffect, useState } from "react";

function HomeRoutes() {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const localUserInfo = JSON.parse(localStorage.getItem('usetInfo'));
        if (localUserInfo) {
            setUserData(localUserInfo);
        } else {
            setUserData(null);
        }
    }, []);

    return (
        <>
            <HeaderLayout />
            <Routes>
                {
                    userData && userData.role === 'admin' ? 
                    <Route index element={<AdminProductList />} /> :
                     <Route index element={<ProductRoutes />} />
                }
                <Route index element={<ProductRoutes />} />
                <Route path="/product/*" element={<ProductRoutes />} />
                <Route path="cart" element={<Cart />} />
                <Route path="login" element={<Login />} />
                <Route path="checkout" element={<CheckoutScreen />} />
                <Route path="account" element={<Account />} />

                {userData && userData.role === 'admin' && (
                    <React.Fragment>
                        <Route path="dashboard" element={<AdminProductList />} />
                        <Route path="product/add" element={<AddProduct />} />
                        <Route path="product/update/:id" element={<AddProduct />} />
                    </React.Fragment>
                )}

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
}

export default HomeRoutes;