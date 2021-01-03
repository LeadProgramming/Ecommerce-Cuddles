import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "./context/Context";
import { LinearProgress } from "@material-ui/core";

function CheckoutPage(props) {
    //control page
    let curr = useContext(UserContext);
    let [address, setAddress] = useState(false);
    let [billing, setBilling] = useState(false);
    let [finished, setFinished] = useState(false);
    //check if address has been filled out then check billing.
    useEffect(() => {
        async function fetchData() {
            let addr = await fetch(`/api/users/${curr.user}/accountInfo/address`).then((res) => {
                if (res.status === 200) {
                    setAddress(true);
                    return true;
                }
                else {
                    setAddress(false);
                    return true;
                }
            })
            let bill = await fetch(`/api/users/${curr.user}/accountInfo/billing`).then((res) => {
                console.log(res.status)
                if (res.status === 200) {
                    setBilling(true);
                    return true;
                }
                else {
                    setAddress(false);
                    return true;
                }
            })
            if (bill && addr)
                setFinished(true);
        }
        fetchData();
    }, [curr.user]);
    if (finished === false) {
        return <LinearProgress color="secondary" />;
    }
    else {
        return (
            (address === false) ? <Redirect to="/address" /> : (billing === false) ? <Redirect to="/billing" /> : <Redirect to="/confirmation" />
        );
    }

}

export default CheckoutPage;