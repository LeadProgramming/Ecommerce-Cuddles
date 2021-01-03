import React, { useContext } from "react";
import { UserContext } from "./context/Context";
import { withRouter } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput, Selection } from "./layout/FieldLayout";
import { Box, Button, Container } from "@material-ui/core";
import UserNavBar from "./components/UserNavBar";

function BillingPage(props) {
    let curr = useContext(UserContext);
    return (
        <UserNavBar>
            <Container maxWidth={'sm'}>
                <Box component="fieldset" textAlign="center" marginTop="15px">
                    <legend>Payment Information</legend>
                    <Formik
                        initialValues={{
                            cardNumber: "",
                            payment: "",
                            cvv: "",
                            expirationDate: ""
                        }}
                        validationSchema={Yup.object({
                            cardNumber: Yup.string().length(16).required("Card Number required."),
                            payment: Yup.string().required("Payment info. required."),
                            cvv: Yup.string().length(3).required("CVV code required."),
                            expirationDate: Yup.string().length(4).required("Expiration date required.")

                        })}
                        onSubmit={(values) => {
                            fetch(`/api/users/${curr.user}/accountInfo/billing`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(values)
                            }).then(res => {
                                if (res.status !== 200) {
                                    throw new Error("Cannot Update Billing Information. Please retry.");
                                }
                                else {
                                    props.history.push('/confirmation');
                                }
                            }).catch(alert);
                        }}
                    >
                        <Form>
                            <TextInput
                                label={"Card Number"}
                                name={"cardNumber"}
                                type={"text"}
                                placeholder={"(no spaces please) 1234567898765432"}
                            />
                            <Selection label={""} name={"payment"}>
                                <option value={""}>Payment</option>
                                <option value={"debit"}>Debit</option>
                                <option value={"credit"}>Credit</option>
                            </Selection>
                            <TextInput
                                label={"CVV"}
                                name={"cvv"}
                                type={"text"}
                                placeholder={"(back of your card) 3 digits"}
                            />
                            <TextInput
                                label={"ExpirationDate"}
                                name={"expirationDate"}
                                type={"text"}
                                placeholder={"Expiration Date"}
                            />
                            <Button variant="contained" size="medium" color="primary" type={"submit"}>Proceed</Button>
                        </Form>
                    </Formik>
                </Box>
            </Container >
        </UserNavBar>
    );
}
export default withRouter(BillingPage);