import React, { useContext } from "react";
import { Alert } from "../layout/FeedbackLayout";
import { UserContext } from "../context/Context";
function Heading(props) {
    const { account } = useContext(UserContext);
    return (<>
        { (account !== "guest") || <Alert severity={'warning'} >Guest must Sign-in/Register for full access.</Alert>}
        <h1>{props.children}</h1>
    </>)
}
export default Heading;
