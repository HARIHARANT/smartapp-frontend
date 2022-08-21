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
import Header from '../pages/Header';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

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

export default function Checkout() {
    const [expanded, setExpanded] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    async function fetcCartItems() {
        try {
            let request = {
                userId:localStorage.getItem("userId")
            };

            let response = await HttpService("get/cart", 'GET', request, 'Live');
            console.log(response);
            if (response.status == 200) {
                console.log("Inside success");
                console.log(response.data.records);
                setCartItems(response.data.records);
            }
        } catch (e) {
            console.log(e);
        }
    }
    
  const [name, setName] = useState('Composed TextField');
  const handleChange = (event) => {
    setName(event.target.value);
  };


    console.log("cartItems final");
    console.log(cartItems);
    useEffect(() => {
        fetcCartItems();
    }, []);

    return (
        <>
            <Header />            
            <h1>Checkout</h1>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ padding: "20px" }}>
                    <Grid item md={8} xs={12} sx={{ alignContent: 'center' }}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        R
                                    </Avatar>
                                }                               
                                title="Shrimp and Chorizo Paella"
                                subheader="September 14, 2016"
                            />
                            <CardContent>
                                <Typography variant="body1" color="text.primary" sx={{ fontWeight: "bold" }}>ssfs</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}>
                                    test
                                </Typography>
                            </CardContent>
                        </Card><br />
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        R
                                    </Avatar>
                                }                               
                                title="Shrimp and Chorizo Paella"
                                subheader="September 14, 2016"
                            />
                            <CardContent>
                                <Typography variant="body1" color="text.primary" sx={{ fontWeight: "bold" }}>ssfs</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}>
                                    test
                                </Typography>
                            </CardContent>
                        </Card><br />
                    </Grid>
                    <Grid item md={4} xs={12} sx={{ alignContent: 'center' }}>
                        <Card>                            
                            <CardContent>
                                <Typography variant="body1" color="text.primary" sx={{ fontWeight: "bold" }}>Total Amount: </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}>
                                    Tax Free
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                            <Button variant="outlined">PayNow</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ padding: "20px" }}>
                    <Grid item md={8} xs={12} sx={{ alignContent: 'center' }}>
                        <Card>
                            <CardContent>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Name</InputLabel>
                                    <Input id="component-simple" value={name} onChange={handleChange} />
                                </FormControl>&nbsp;
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="component-helper">Name</InputLabel>
                                    <Input
                                        id="component-helper"
                                        value={name}
                                        onChange={handleChange}
                                        aria-describedby="component-helper-text"
                                    />                                    
                                    <FormHelperText id="component-helper-text">
                                        Some important helper text
                                    </FormHelperText>
                                </FormControl>
                            </CardContent>
                        </Card><br />                        
                    </Grid>                    
                </Grid>              
            </Box>
        </>
    );
}
