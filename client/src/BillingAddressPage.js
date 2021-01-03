import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/Context";
import { withRouter } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput, Selection } from "./layout/FieldLayout";
import { Box, Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserNavBar from "./components/UserNavBar";
const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
    }
}))
function BillingAddressPage(props) {
    const states = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"];
    const curr = useContext(UserContext);
    const styled = useStyles();
    let [billing, setBililng] = useState(false);
    //check if address has been filled out then check billing.
    useEffect(() => {
        async function fetchData() {
            fetch(`/api/users/${curr.user}/accountInfo/billing`).then((res) => {
                if (res.status === 200) {
                    setBililng(true);
                }
            })
        }
        fetchData();
    }, [curr.user]);
    return (
        <UserNavBar>
            <Container maxWidth={'sm'}>

                <Box component="fieldset" textAlign="center" marginTop="15px">
                    <legend>Address Information</legend>
                    <Formik
                        initialValues={{
                            street: "",
                            city: "",
                            zip: "",
                            state: "",
                        }}
                        validationSchema={Yup.object({
                            street: Yup.string().max(35).required("Address required."),
                            city: Yup.string().max(35).required("City required."),
                            zip: Yup.string()
                                .matches(/\d{5}/)
                                .required("Postal/Zip Code required."),
                            state: Yup.string().required("State required."),
                        })}
                        onSubmit={(values) => {
                            fetch(`/api/users/${curr.user}/accountInfo/address`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(values)
                            }).then(res => {
                                if (res.status !== 200) {
                                    throw new Error("Cannot Update Address Information. Please retry.");
                                }
                                else {
                                    if (billing) {
                                        props.history.push('/confirmation')
                                    }
                                    else {
                                        props.history.push('/billing');
                                    }
                                }
                            }).catch(alert);
                        }}
                    >
                        <Form>
                            <TextInput
                                lab={"Street"}
                                name={"street"}
                                type={"text"}
                                placeholder={"e.g 12345 TaroBoba St. "}
                            />
                            <TextInput
                                lab={"City"}
                                name={"city"}
                                type={"text"}
                                placeholder={"e.g MilkTea "}
                            />
                            <TextInput
                                lab={"Postal/Zip"}
                                name={"zip"}
                                type={"text"}
                                placeholder={"e.g 12345 "}
                            />
                            <Selection label={""} name={"state"} style={{ marginRight: "5px" }}>
                                <option value={""}>State</option>
                                {states.map((i) => (
                                    <option value={i}>{i}</option>
                                ))}
                            </Selection>

                            <Button variant="contained" size="medium" color="primary" type={"submit"}>Proceed</Button>
                        </Form>
                    </Formik>
                </Box >
            </Container>
        </UserNavBar>
    );
}
export default withRouter(BillingAddressPage);