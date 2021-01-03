import React, { useState, useContext, useEffect } from "react";
import { UserContext, CartContext } from "./context/Context";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Container, Grid, ListItemText, Paper } from "@material-ui/core";
import axios from "axios";
import UserNavBar from "./components/UserNavBar";
const useStyles = makeStyles(() => ({
    confirmList: {
        // textAlign: "center",
        marginBottom: "5px"
    },
    img: {
        width: '100px',
        height: '100px',
    },
    image: {
        maxWidth: "100%",
        maxHeight: "100%"
    },
    outerShell: {
        width: "100%",
    }
}));

function ConfirmationPage(props) {
    let { user } = useContext(UserContext);
    let { cart, clearCart } = useContext(CartContext);
    let styled = useStyles();
    let [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        async function fetchData() {
            fetch(`/api/users/${user}/confirmation`)
                .then((res) => {
                    return res.json()
                })
                .then((json) => {
                    setUserInfo(...json);
                })
        }
        fetchData();
    }, [user])

    function placeOrder() {
        cart.map((i) => {
            axios.post(`/api/users/${user}/orders`, {
                id: i.ItemID,
                price: i.ItemPrice
            })
        });
        clearCart();
    }

    return (
        <UserNavBar>
            <Container>
                <h1>Order Confirmation</h1>
                <Grid container justify={"space-evenly"} style={{ marginBottom: "5px" }}>
                    <ListItemText
                        primary="Name:"
                        secondary={userInfo.fullname}
                    />
                    <ListItemText
                        primary="Email:"
                        secondary={userInfo.email}
                    />
                    <ListItemText
                        primary="Phone#:"
                        secondary={userInfo.phone}
                    />
                    <ListItemText
                        primary="Address:"
                        secondary={`${userInfo.street} ${userInfo.city}, ${userInfo.state}, ${userInfo.zip}`}
                    />
                    <ListItemText
                        primary="Payment:"
                        secondary={userInfo.payment}
                    />
                    <ListItemText
                        primary="Card#:"
                        secondary={userInfo.cardnumber}
                    />
                </Grid>
                <Grid container spacing={1}>
                    {cart.map((i, j) => (
                        <Grid item className={styled.outerShell} key={i.ItemName}>
                            <Grid container component={Paper} variant={"outlined"} alignItems={"center"} justify={"space-around"}>
                                <Grid item className={styled.img}>
                                    <img className={styled.image} src={getUrl(i.ItemImage)} alt={i.ItemName}></img>
                                </Grid>
                                <Grid item>
                                    <span>{i.ItemName}</span>
                                </Grid>
                                <Grid item>
                                    $<span>{i.ItemPrice}</span>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
                <Box margin="10px" display="flex" justifyContent="center">
                    <Button variant={"contained"} color={"primary"} component={Link} to="/listings" style={{ marginRight: "5px" }}>Cancel</Button>
                    <Button variant={"contained"} color={"primary"} component={Link} to="/orders" onClick={placeOrder} type="submit">Confirm/Pay</Button>
                </Box>
            </Container>
        </UserNavBar>
    )
}

function getUrl(b) {
    let view = new Uint8Array(b.data);
    let blob = new Blob([view], { type: "image/jpeg" });
    return URL.createObjectURL(blob);
}
export default ConfirmationPage;