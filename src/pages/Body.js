import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductCard from '../pages/ProductsCard';
import '../index.css';
import SlideImg from '../slide1.jpg';

function Body(){
    return(
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                    <img src={SlideImg} className="slide"/>
                </Grid>                           
            </Grid>
            <Grid container spacing={2} sx={{padding: "20px"}}>                
                <ProductCard />                 
            </Grid>
        </Box>
    );
};

export default Body;