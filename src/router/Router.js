import React from 'react';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Checkout from '../pages/Checkout';

import {
    BrowserRouter, Routes, Route, Link
  } from "react-router-dom";
  
export default function Router() {
    return (
        <>
            <BrowserRouter>                                
                <Routes>
                    <Route exact  path="/"  element={<Home />}></Route>
                    <Route exact  path="/login" element={<Auth />}></Route>  
                    <Route exact  path="/checkout" element={<Checkout />}></Route>                                                                 
                </Routes>
            </BrowserRouter>
        </>
    );
}