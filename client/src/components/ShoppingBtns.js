import React, { useContext } from 'react';
import {CartContext} from "../context/Context";
import { Box, Button } from '@material-ui/core';
import {Link} from "react-router-dom";
export default function ShoppingBtns(props) {
    const {clearCart} = useContext(CartContext);
    return (
        <Box margin="10px" display="flex" justifyContent="center">
            <Button
                size={"medium"}
                variant={"outlined"}
                color={"secondary"}
                style={{ marginRight: "5px" }}
                onClick={clearCart}>Clear Cart</Button>
            <Button
                size={"medium"}
                variant={"contained"}
                color={"primary"}
                component={Link}
                to="/checkout"
            >Checkout</Button>
        </Box>
    )
}
