import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/Context.js";
function Logout() {
    let { setAccount, setUser } = useContext(UserContext);
    setAccount("guest");
    setUser("");
    return <Redirect to="/" />
}
export default Logout;