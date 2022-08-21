import React, { useState, Fragment } from "react";
import Header from '../pages/Header';
import Body from '../pages/Body';
import Context from '../util/Context';
import '../index.css';

function Home(){
    const [productsUrl, setproductsUrl] = useState('https://fakestoreapi.com');    
    return (
        <>
            <Fragment>                
                <Context.Provider value={productsUrl} >                    
                    <Header/>
                    <Body/>                                
                </Context.Provider>   
            </Fragment>             
        </>
      );
}

export default Home;