import React, { useEffect, useState } from 'react';
import data from "../../../data/product.json"
import { Grid, Card, Tooltip, CardHeader, Avatar, IconButton, CardMedia, Typography, CardContent, CardActions } from "@material-ui/core"
// const axios = require('axios')
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default function ProductComponent(props) {
    const [productData, setProductData] = useState([])
    useEffect(() => {
        // axios.get('http:/localhost:3333/api/v1/products')
        //     .then(response => { console.log(response) })
        //     .catch(error => console.log(error))
        if (data && data.success) {
            setProductData(data.data)
        }
    }, [])
    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // };


    return (<div>
        <h2>Product Section</h2>
        <Grid container spacing={3}>
            {productData.map(item => {
                return (<Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>

                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe">P</Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={item.name}
                            subheader={item.category}
                        />

                        <CardMedia
                            style={{ height: '150px', margin: '0 16px' }}
                            image={item.image}
                            title={item.name}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                This section will consist of product description
        </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Tooltip title="add to wishlist"><IconButton >
                                <FavoriteIcon />
                            </IconButton>
                            </Tooltip>
                            <Tooltip title="add to cart"><IconButton >
                                <ShoppingCartIcon />
                            </IconButton></Tooltip>
                            <Tooltip title="share"><IconButton aria-label="">
                                <ShareIcon />
                            </IconButton></Tooltip>
                        </CardActions>
                    </Card>
                </Grid>)
            })}
        </Grid>
    </div>);
}