import React from "react";
import { ItemThumblink } from "../layout/ItemLayout.js";
import { Grid, Paper } from "@material-ui/core";
import DeleteItemBtn from "./DeleteItemBtn.js";
import PrivilegeBtns from "./PrivilegeBtns.js";

function ListingsItem(props) {
    return (
        <Grid item lg={4}>
            <DeleteItemBtn handleDelete={props.handleDelete} />
            <Paper variant={"outlined"} style={{
                textAlign: "center",
                padding: "10px 0 10px 0",
            }}>
                <ItemThumblink clickHandler={props.handleRead} {...props.itmBody} />
                <PrivilegeBtns itmBody={props.itmBody} handleUpdate={props.handleUpdate} />
            </Paper>
        </Grid>
    );
}
export default ListingsItem;