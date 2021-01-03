import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
function LoginBtn() {
    return <Button size={"small"} variant={"outlined"} color={"primary"} component={Link} to={"/login"}>Login / Register</Button >;
}
export default LoginBtn;