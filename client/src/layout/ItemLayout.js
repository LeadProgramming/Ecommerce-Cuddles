import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Filler } from "../teddyLogo2.svg";
const useStyles = makeStyles(() => ({
  img: {
    width: 'calc(275px)',
    height: 'calc(250px + 1vh)',
  },
  thumb: {
    width: 'calc(275px)',
    height: 'calc(250px + 1vh)',
    "&:hover": {
      opacity: 0.5,
    }
  },
  overlay: {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50 %, -50 %)"
  }
}));

export const Item = (props) => {
  const styled = useStyles();
  const [hover, setHover] = useState(false);
  if (props.ItemImage === "") {
    return (
      <>
        <Filler />
      </>)
  }
  else if (props.tl) {
    function hoverInHandler() {
      setHover(true);
    }
    function hoverOutHandler() {
      setHover(false);
    }
    return (
      <>
        <Box width={"100%"}>
          <img className={styled.thumb} src={getUrl(props.ItemImage)} alt={props.ItemName} onClick={props.clickHandler} onMouseOver={hoverInHandler} onMouseOut={hoverOutHandler} />
          {/* {!hover || <Typography className={styled.overlay}>View</Typography>} */}
        </Box>
      </>)
  }
  return (
    <img className={styled.img} src={getUrl(props.ItemImage)} alt={props.ItemName} onClick={props.clickHandler}></img>
  );
};
export const ItemThumblink = (props) => {
  return (
    <>
      <Item tl={true} {...props} />
      <Box>
        <Typography color='secondary'>{props.ItemName}</Typography>
        <Typography paragraph>${props.ItemPrice}</Typography>
      </Box>
    </>
  );
};

function getUrl(b) {
  let view = new Uint8Array(b.data || b);
  let blob = new Blob([view], { type: "image/*" });
  return URL.createObjectURL(blob);
}