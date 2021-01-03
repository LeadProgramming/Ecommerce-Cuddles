import React, { useContext } from "react";
import { UserContext } from "../context/Context.js";
import AddToCartBtn from "./AddToCartBtn.js";
import UpdateItemBtn from "./UpdateItemBtn.js";
import LoginBtn from "./LoginBtn.js";
function PrivilegeBtns(props) {
    const { account } = useContext(UserContext);
    return (<>
        {(account === "user") ? <AddToCartBtn {...props.itmBody} />
            : (account === "admin") ? <UpdateItemBtn update={props.handleUpdate} />
                : <LoginBtn />}
    </>);
}
export default PrivilegeBtns;