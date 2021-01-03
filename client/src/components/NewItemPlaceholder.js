import React, { useContext } from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import { UserContext } from "../context/Context";
import { ReactComponent as Logo } from "../teddyLogo2.svg";
let newTeddy = {
    display: "flex",
    flexDirection: "column",
    height: "376px",
    textAlign: "center",
    padding: "10px 0 10px 0",
    justifyContent: "space-between",
    alignItems: "center"
}
function NewItemPlaceholder({ handleCreate }) {
    const { account } = useContext(UserContext);
    return (
        (account !== "admin" || (<Grid item lg={4} >
            <Paper variant={"outlined"} style={newTeddy}>
                <Logo width={275} />
                <Button size={"small"} variant={"outlined"} color={"primary"} style={{ width: "80%" }} onClick={handleCreate} > New Teddy Bear</Button>
            </Paper>
        </Grid>))
    )
}
export default NewItemPlaceholder;