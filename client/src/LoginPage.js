import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput } from "./layout/FieldLayout.js";
import { UserContext } from "./context/Context";
import { withRouter, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Container } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import UserNavBar from "./components/UserNavBar";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  }
})
function LoginPage(props) {
  const { account, setAccount, setUser } = useContext(UserContext);
  const styled = useStyles();
  return (
    <UserNavBar>
      <Container maxWidth={'sm'}>
        <Box component="fieldset" textAlign="center" marginTop="15px">
          {(account !== "guest") || <Alert severity="warning">Guest must Sign-in/Register for full access.</Alert>}
          <legend>Login</legend>
          <Formik
            initialValues={{
              username: "",
              password: ""
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .matches(/[a-zA-Z0-9]*/)
                .required("Please Enter Username"),
              password: Yup.string()
                .matches(/[a-zA-Z0-9._!@#$%^&*()+=<>,"']/)
                .required("Please Enter Password")
            })}
            onSubmit={
              async values => {
                fetch('/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(values),
                }).then(res => {
                  if (res.status !== 200) {
                    throw new Error("Username/Password is not correct.");
                  }
                  else {
                    return res.json();
                  }
                }).then(json => {
                  setAccount(json.account);
                  setUser(json.user);
                  if (json.account === "admin") {
                    props.history.push('/dashboard');
                  }
                  else {
                    props.history.push('/');
                  }
                }).catch(alert);
              }
            }
          >
            <Form className={styled.root}>
              <TextInput
                lab={"Username"}
                name={"username"}
                type={"text"}
              />
              <TextInput
                lab={"Password"}
                name={"password"}
                type={"password"}
              />
              <Link to="/register">New User? Register here.</Link>
              <Button variant="contained" size="medium" type={"submit"} color="primary">Login</Button>
            </Form>
          </Formik>
        </Box>
      </Container>
    </UserNavBar>
  );
}

export default withRouter(LoginPage);
