import React, { useContext, useEffect, useReducer } from "react";
import { UpdateInput, Selection } from "./layout/FieldLayout.js";
import { useGet } from "./hooks/networkHooks";
import { UserContext } from "./context/Context";
import { Redirect, withRouter } from "react-router-dom";
import { Button, Box, Container, CircularProgress, MenuItem, Snackbar, Typography } from "@material-ui/core";
import { Alert } from "./layout/FeedbackLayout";
import { AccountOption } from "./layout/AccountLayout";
import UserNavBar from "./components/UserNavBar";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

function accountReducer(state, action) {
  switch (action.type) {
    case 'username':
      return { ...state, finished: 1, status: action.status };
    case 'password':
      return { ...state, finished: 2, status: action.status };
    case 'email':
      return { ...state, finished: 3, status: action.status };
    case 'fullname':
      return { ...state, finished: 4, status: action.status };
    case 'phone':
      return { ...state, finished: 5, status: action.status };
    case 'address':
      return { ...state, finished: 6, status: action.status };
    case 'billing':
      return { ...state, finished: 7, status: action.status };
    case 'error':
      return { ...state, finished: -1, status: action.status };
    case 'close':
      return { ...state, finished: 0 };
    default:
      return state;
  }
}
function AccountPage({ history }) {
  const states = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"];
  let initialState = {};
  const { account, user } = useContext(UserContext);
  const [state, dispatch] = useReducer(accountReducer, initialState);

  if (account !== "user") {
    return <Redirect to="/login" />
  }
  const { fetched: accInfo, err: accError } = useGet(`/api/users/${user}/accountInfo`);

  if (!accInfo) {
    return (
      <Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size={80} color="secondary" />
      </Box>
    );
  }
  else {
    initialState = {
      username: accInfo.username,
      password: accInfo.password,
      email: accInfo.email,
      fullname: accInfo.fullname,
      phone: accInfo.phone,
      address: {
        street: accInfo.street,
        city: accInfo.city,
        zip: accInfo.zip,
        state: accInfo.state
      },
      billing: {
        payment: accInfo.payment,
        card: accInfo.cardnumber,
        cvv: accInfo.cvv,
        exp: accInfo.expiration_date
      },
      finished: 0,
      status: ''
    }

    return (
      <UserNavBar>
        <Container maxWidth={"md"} >
          <Box margin={"10px 0 10px 0"}>
            <h1>Account Information</h1>
            <AccountOption label={"Username"} info={accInfo.username}>
              <Formik
                initialValues={{
                  username: ""
                }}
                validationSchema={Yup.object({
                  username: Yup.string()
                    .matches(/[a-zA-Z0-9]+/)
                    .required("Username required")
                })}
                onSubmit={(values) => {
                  axios.put(`/api/users/${user}/accountInfo/username`, values).then((res) => {
                    dispatch({ type: "username", status: res.data });
                  }).catch(() => {
                    dispatch({ type: "error", status: "Cannot change username." })
                  });
                }}
              >
                <Form style={{ display: "flex", justifyContent: "space-evenly", alignItems: "flex-end", width: "100%" }}>
                  <Box flexBasis="50%">
                    <UpdateInput
                      lab={"New Username"}
                      name={"username"}
                      type={"text"}
                      placeholder={"Username"}
                      size={"small"}
                      variant={"standard"} />
                  </Box>
                  <Button variant="contained" size="small" color="secondary" type={"submit"}>Change Username</Button>
                </Form>
              </Formik>
            </AccountOption>
            <AccountOption label={"Password"} info={accInfo.password.split('').map(i => "*").join('')}>
              <Formik
                initialValues={{
                  password: "",
                  newPassword: ""
                }}
                validationSchema={Yup.object({
                  password: Yup.string()
                    .required("Password required"),
                  newPassword: Yup.string()
                    .oneOf([Yup.ref('password')], 'Passwords must match')
                    .required("Enter Password Again"),
                })}
                onSubmit={(values) => {
                  axios.put(`/api/users/${user}/accountInfo/password`, values).then((res) => {
                    dispatch({ type: "password", status: res.data });
                  }).catch(() => {
                    dispatch({ type: "error", status: "Cannot change password." })
                  });
                }}
              >
                <Form style={{ display: "flex", justifyContent: "space-evenly", alignItems: "flex-end", width: "100%" }}>
                  <Box flexBasis="50%">
                    <UpdateInput
                      lab={"New Password"}
                      name={"password"}
                      type={"password"}
                      placeholder={"new password"}
                      size={"small"}
                      variant={"standard"} />
                    <UpdateInput
                      lab={"Repeat New Password"}
                      name={"newPassword"}
                      type={"password"}
                      placeholder={"Repeat New Password"}
                      size={"small"}
                      variant={"standard"} />
                  </Box>
                  <Box >
                    <Button variant="contained" size="small" color="secondary" type={"submit"}>Change Password</Button>
                  </Box>
                </Form>
              </Formik>
            </AccountOption>
            <AccountOption label={"Email"} info={accInfo.email}>
              <Formik
                initialValues={{
                  email: ""
                }}
                validationSchema={Yup.object({
                  email: Yup.string().email("Email only").required("Email Required")
                })}
                onSubmit={(values) => {
                  axios.put(`/api/users/${user}/accountInfo/email`, values).then((res) => {
                    dispatch({ type: "email", status: res.data });

                  }).catch(() => {
                    dispatch({ type: "error", status: "Cannot change email." })
                  });
                }}
              >
                <Form style={{ display: "flex", justifyContent: "space-evenly", alignItems: "flex-end", width: "100%" }}>
                  <Box flexBasis="50%">
                    <UpdateInput
                      lab={"New Email"}
                      name={"email"}
                      type={"email"}
                      placeholder={"E-mail"}
                      size={"small"}
                      variant={"standard"} />
                  </Box>
                  <Box>
                    <Button variant="contained" size="small" color="secondary" type={"submit"}>Change E-mail</Button>
                  </Box>
                </Form>
              </Formik>
            </AccountOption>
            <AccountOption label={"Full Name"} info={accInfo.fullname}>
              <Formik
                initialValues={{
                  fullName: ""
                }}
                validationSchema={Yup.object({
                  fullName: Yup.string()
                    .matches(/^\w(\w|\s)*/)
                    .required("Full name required"),
                })}
                onSubmit={(values) => {
                  axios.put(`/api/users/${user}/accountInfo/fullname`, values).then((res) => {
                    dispatch({ type: "fullname", status: res.data });

                  }).catch(() => {
                    dispatch({ type: "error", status: "Cannot change full name." })
                  });
                }}
              >
                <Form style={{ display: "flex", justifyContent: "space-evenly", alignItems: "flex-end", width: "100%" }}>
                  <Box flexBasis="50%">
                    <UpdateInput
                      lab={"New Name"}
                      name={"fullName"}
                      type={"text"}
                      placeholder={"Full name"}
                      size={"small"}
                      variant={"standard"} />
                  </Box>
                  <Box >
                    <Button variant="contained" size="small" color="secondary" type={"submit"}>Change Full Name</Button>
                  </Box>
                </Form>
              </Formik>
            </AccountOption>
            <AccountOption label={"Phone Number"} info={accInfo.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}>
              <Formik
                initialValues={{
                  phone: ""
                }}
                validationSchema={Yup.object({
                  phone: Yup.string().matches(/\d/g).max(10, "maximum of 10 digits"),
                })}
                onSubmit={(values) => {
                  axios.put(`/api/users/${user}/accountInfo/phone`, values).then((res) => {
                    dispatch({ type: "phone", status: res.data });

                  }).catch(() => {
                    dispatch({ type: "error", status: "Cannot change phone #" })
                  });
                }}
              >
                <Form style={{ display: "flex", justifyContent: "space-evenly", alignItems: "flex-end", width: "100%" }}>
                  <Box flexBasis="50%">
                    <UpdateInput
                      lab={"New Phone"}
                      name={"phone"}
                      type={"tel"}
                      placeholder={"Phone #"}
                      size={"small"}
                      variant={"standard"} />
                  </Box>
                  <Box>
                    <Button variant="contained" size="small" color="secondary" type={"submit"}>Change Phone #</Button>
                  </Box>
                </Form>
              </Formik>
            </AccountOption>
            <AccountOption label={"Address"}>
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
                  axios.put(`/api/users/${user}/accountInfo/address`, values).then((res) => {
                    dispatch({ type: "address", status: res.data });
                  }).catch(() => {
                    dispatch({ type: "error", status: "Cannot change address" })
                  });
                }}
              >
                <Form style={{ display: "flex", justifyContent: "space-evenly", alignItems: "flex-end", width: "100%" }}>
                  <Box flexBasis="50%">
                    <Typography>
                      
                    </Typography>
                    <UpdateInput
                      lab={"Street"}
                      name={"street"}
                      type={"text"}
                      placeholder={"e.g 12345 TaroBoba St. "}
                      size={"small"}
                      variant={"standard"}
                    />
                    <UpdateInput
                      lab={"City"}
                      name={"city"}
                      type={"text"}
                      placeholder={"e.g MilkTea "}
                      size={"small"}
                      variant={"standard"}
                    />
                    <UpdateInput
                      lab={"Postal/Zip"}
                      name={"zip"}
                      type={"text"}
                      placeholder={"e.g 12345 "}
                      size={"small"}
                      variant={"standard"}
                    />
                    <Selection label={"State"} name={"state"} style={{ width: "80px" }} labelWidth={5}>
                      {states.map((i) => (
                        <MenuItem value={i}>{i}</MenuItem>
                      ))}
                    </Selection>
                  </Box>
                  <Box>
                    <Button variant="contained" size="small" color="secondary" type={"submit"}>Change Address</Button>
                  </Box>
                </Form>
              </Formik>
            </AccountOption>
            <AccountOption label={"Billing Information"} >
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
                  axios.put(`/api/users/${user}/accountInfo/billing`, values).then((res) => {
                    dispatch({ type: "billing", status: res.data });
                  }).catch(() => {
                    dispatch({ type: "error", status: "Cannot change billing information" })
                  });
                }}
              >
                <Form style={{ display: "flex", justifyContent: "space-evenly", alignItems: "flex-end", width: "100%" }}>
                  <Box flexBasis="50%">
                    <UpdateInput
                      lab={"Card Number"}
                      name={"cardNumber"}
                      type={"text"}
                      placeholder={"(no spaces please) 1234567898765432"}
                      size={"small"}
                      variant={"standard"}
                    />
                    <UpdateInput
                      lab={"CVV"}
                      name={"cvv"}
                      type={"text"}
                      placeholder={"(back of your card) 3 digits"}
                      size={"small"}
                      variant={"standard"}
                    />
                    <UpdateInput
                      lab={"ExpirationDate"}
                      name={"expirationDate"}
                      type={"text"}
                      placeholder={"Expiration Date"}
                      size={"small"}
                      variant={"standard"}
                    />
                    <Selection label={"Payment"} name={"payment"} style={{ width: "90px" }} labelWidth={5}>
                      <MenuItem value={"debit"}>Debit</MenuItem>
                      <MenuItem value={"credit"}>Credit</MenuItem>
                    </Selection>
                  </Box>
                  <Box>
                    <Button variant="contained" size="small" color="secondary" type={"submit"}>Change Billing</Button>
                  </Box>
                </Form>
              </Formik>
            </AccountOption>
          </Box>
        </Container >
        <Snackbar open={state.finished === -1} autoHideDuration={5000} onClose={() => dispatch({ type: "close" })}>
          <Alert severity="error" onClose={() => dispatch({ type: "close" })}>
            {state.status}
          </Alert>
        </Snackbar>
        <Snackbar open={state.finished > 0} autoHideDuration={5000} onClose={() => dispatch({ type: "close" })}>
          <Alert severity="success" onClose={() => dispatch({ type: "close" })}>
            {state.status}
          </Alert>
        </Snackbar>
      </UserNavBar >
    );
  }
}

export default withRouter(AccountPage);
