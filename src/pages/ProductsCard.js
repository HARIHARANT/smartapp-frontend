import { React, useContext, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HttpService from '../util/HttpService';
import Context from '../util/Context';
import Grid from '@mui/material/Grid';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function ProductsCard() {
    const [expanded, setExpanded] = useState(false);
    const [productsList, setproductsList] = useState("");
    const [cartList, setCartList] = useState(0);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    async function fetcProducts() {
        try {            
            let response = await HttpService("get/products", 'GET', {},'Live');
            console.log(response);
            if (response.status == 200) {
                console.log("Inside success");
                console.log(response.data.data);
                setproductsList(response.data.data);                
            }else{
                confirm(response.data.message)
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function addCartCB(data) {
        try {            
            let request = {
                userId:localStorage.getItem("userId"),
                productId:data.id
            }
            let response = await HttpService("add/cart", 'POST', request,'Live');
            console.log(response);
            if (response.status == 201 && (response.data.status || response.data.success)) {
                console.log("Inside success");
                console.log(response.data.userId);
                setCartList((cartList)=>{
                    cartList+=1;                   
                });                
            }else{
                confirm(response.data.message)
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    let handleAddCart = (event)=>{
        if(localStorage.getItem("_token")){
            let indexClick = event.currentTarget.tabIndex;
            let filterCartItem = productsList.filter((data, index)=>{
                if(indexClick ==index){
                    addCartCB(data);
                    return data;       
                }                            
            });
            console.log(filterCartItem);
        }else{
            confirm("Please login to the application!");
        }       
    }

    console.log("productsList final");
    console.log(productsList+" "+cartList);
    useEffect(() => {        
        fetcProducts();
    }, []);        

    return (
        <>
            {
            productsList.length > 0 ? productsList.map((data,index) => {
                return (
                <Grid key={index} item md={3} xs={12} sx={{alignContent:'center'}}>
                    <Card key={index}>                    
                        <CardMedia
                            component="img"
                            height="194"
                            image={data.images[0]}
                            alt={data.images[0]}
                        />
                        <CardContent>
                            <Typography variant="body1" color="text.primary" sx={{fontWeight:"bold"}}>{data.title} - Rs.{data.price}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}>
                                {data.description}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites"
                            tabIndex={index}
                            onClick={handleAddCart}
                            >
                                <AddShoppingCartIcon />
                            </IconButton>
                            <IconButton aria-label="share"
                            tabIndex={index}
                            >
                                <ShareIcon />
                            </IconButton>                        
                        </CardActions>                    
                    </Card>
                </Grid>
                )
            })
             : <>Loading...</>}
        </>
    );
}
