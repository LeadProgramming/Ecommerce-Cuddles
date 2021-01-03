import React from "react";
import { Button } from "@material-ui/core";
function UpdateItemBtn(props) {
    return (
        <Button
            size={"small"}
            variant={"outlined"}
            color={"primary"}
            onClick={props.update}
        >
            Update Item
        </Button>
    );
}

export default UpdateItemBtn;