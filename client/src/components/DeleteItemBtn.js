import React, { useContext } from "react";
import { UserContext } from "../context/Context";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";


function DeleteItemBtn(props) {
    const { account } = useContext(UserContext);
    return (<>
        {(account === "admin") && (<IconButton color="secondary" style={{ position: "absolute", zIndex: 1 }} onClick={props.handleDelete} {...props}>
            <CloseIcon />
        </IconButton>)}
    </>);
}

export default DeleteItemBtn;
