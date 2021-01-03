import React, { useContext } from "react";
import { CartContext } from "../context/Context";
import { Button } from "@material-ui/core";

function AddToCartBtn({ ItemID, ItemImage, ItemName, ItemPrice }) {
  const { addToCart } = useContext(CartContext);
  console.log(ItemID)
  return <Button
    size={"small"}
    variant={"outlined"}
    color={"primary"}
    onClick={() => addToCart({ ItemID, ItemImage, ItemName, ItemPrice })}
  >
    Add to Cart
          </Button>;
}
export default AddToCartBtn;
