import React from "react";
import { Box, Drawer, Divider, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Logo } from "../teddyLogo2.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
    drawerPaper: {
        background: "rgb(82,102,216)",
        color: "white",
        width: "240px"
    }
}))
function AdminNavBar({ children }) {
    const styled = useStyles();
    return (
        <>
            <Box display="flex">
                <Drawer variant="permanent" anchor="left" style={{ width: "240px" }} classes={{ paper: styled.drawerPaper }}>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} margin={"10px"}>
                        <Logo width={"75px"} />
                        <Box>
                            <Typography variant={"h6"} display={"block"}>Cuddles</Typography>
                            <Divider />
                            <Typography variant={"h6"} align="center" display={"block"}>Admin</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <List>
                        {["Dashboard", "Sales", "Orders"].map((opt) => {
                            return (<ListItem button key={opt} component={Link} to={`/dashboard/${opt}`} style={{ textAlign: "center" }}>
                                <ListItemText primary={opt} />
                            </ListItem>)
                        })}
                        <ListItem button key={"Listings"} component={Link} to={"/dashboard/listings"} style={{ textAlign: "center" }}>
                            <ListItemText primary={"Listings"} />
                        </ListItem>
                        <ListItem button key={"Logout"} component={Link} to={"/logout"}>
                            <ListItemText primary={"Logout"} style={{ textAlign: "center" }} />
                        </ListItem>
                    </List>
                </Drawer>
            {children}
            </Box>
        </>);
}
export default AdminNavBar;