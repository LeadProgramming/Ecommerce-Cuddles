import React, { useContext } from "react";
import { UserContext, CartContext } from "../context/Context.js";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Grid, Paper } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import ShoppingBtns from "./ShoppingBtns"
import UserNavBar from "./UserNavBar";
const useStyles = makeStyles(() => ({
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
function ShoppingCart() {
  const { account } = useContext(UserContext);
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const styled = useStyles();
  if (account !== "user") {
    return <Redirect to="/login" />
  }
  else {
    return (
      <UserNavBar>
        <Container>
          <h1>Shopping Cart</h1>
          <Grid container spacing={1}>
            {cart.map((i, j) => (
              <Grid item className={styled.outerShell} key={i.ItemID}>
                <Grid container component={Paper} variant={"outlined"} alignItems={"center"} justify={"space-around"}>
                  <Grid item className={styled.img}>
                    <img className={styled.image} src={getUrl(i.ItemImage)} alt={i.ItemName}></img>
                  </Grid>
                  <Grid item>
                    <span>{i.ItemName}</span>
                  </Grid>
                  <Grid item>
                    <span>{i.ItemPrice}</span>
                  </Grid>
                  <Grid item>
                    <Button variant={"outlined"} size={"small"} color={"primary"} onClick={() => { removeFromCart(j) }}>
                      x
                  </Button>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
          {(cart.length === 0) ? <span>Empty Cart</span> : <ShoppingBtns />}
        </Container>
      </UserNavBar>
    );
  }
}

function getUrl(b) {
  let view = new Uint8Array(b.data);
  let blob = new Blob([view], { type: "image/jpeg" });
  return URL.createObjectURL(blob);
}
export default ShoppingCart;
