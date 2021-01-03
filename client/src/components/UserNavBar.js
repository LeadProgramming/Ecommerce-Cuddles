import React, { useContext } from "react";
import { UserContext } from "../context/Context";
import { AppBar, Box, Container, Divider, Tabs, Tab, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Logo } from "../teddyLogo2.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
    logo: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "5px",
        
    }
}))
function UserNavBar({ children }) {
    const { account, user } = useContext(UserContext);
    const styled = useStyles();
    return (
        <>
            <Container className={styled.logo}>
                <Box flexBasis={"35%"}>
                    <Typography display={"inline"}>Account Status :  <Typography display={"inline"} color={"secondary"}> {account} </Typography> </Typography>
                    <br></br>
                    {(user != "guest") ? <Typography display={"inline"}> Username : <Typography display={"inline"} color={"primary"}>{user}</Typography></Typography> : <span>To become a user: <Link to="/register">Register here!</Link></span>}
                </Box>
                <Box display="flex" flexBasis={"50%"}>
                    <Logo width={"90px"} />
                    <Box>
                        <Typography variant={"h2"} color={"primary"} display={"block"}>Cuddles</Typography>
                        <Divider light />
                        <Typography variant={"h6"} align="center" display={"block"}>Plush Life</Typography>
                    </Box>
                </Box>
                <Box>

                </Box>
            </Container>
            <AppBar position="sticky">
                <Tabs
                    textColor="white"
                    centered>
                    {/* <Tab component={Link} to="/" label="Home" /> */}
                    <Tab component={Link} to="/" label="Teddy Bears" />
                    <Tab component={Link} to="/orders" label="Orders" />
                    <Tab component={Link} to="/account" label="Account" />
                    <Tab component={Link} to="/cart" label="Shopping Cart" />
                    {account === "guest" ? <Tab component={Link} to="/login" label="Login/Register" /> : <Tab component={Link} to={"/logout"} label={"Logout"} />}
                </Tabs>
            </AppBar>
            {children}
        </>)
}
export default UserNavBar;