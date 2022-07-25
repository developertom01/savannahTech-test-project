import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddProductHistory from '../pages/AddProductHistory';
import LandingPage from '../pages/Dashboard';
import PriceTable from '../pages/PriceTable';

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/add-product" element={<AddProductHistory />} />
            <Route path="/product/:id/price-history" element={<PriceTable />} />
        </Routes>
    );
};

export default AppRoutes;
