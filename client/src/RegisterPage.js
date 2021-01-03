import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput, Checkbox } from "./layout/FieldLayout.js";
import { UserContext } from "./context/Context";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Container } from "@material-ui/core";
import UserNavBar from "./components/UserNavBar";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  }
})
function RegisterPage(props) {
  const user = useContext(UserContext);
  const styled = useStyles();
  useStyles();
  return (
    <UserNavBar>
      <Container maxWidth={'sm'}>
        <Box component="fieldset" textAlign="center" marginTop="15px">
          <legend>Registration</legend>
          <Formik
            initialValues={{
              username: "",
              password: "",
              newPassword: "",
              fullName: "",
              email: "",
              phone: "",
              TOS: false
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .matches(/[a-zA-Z0-9]+/)
                .required("Username required"),
              password: Yup.string()
                .required("Password required"),
              newPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required("Enter Password Again"),
              fullName: Yup.string()
                .matches(/^\w(\w|\s)*/)
                .required("Full name required"),
              email: Yup.string().email("Email only").required("Email Required"),
              phone: Yup.string().matches(/\d/g).max(10, "maximum of 10 digits"),
              TOS: Yup.boolean()
                .required("Terms of Service must be accepted.")
                .oneOf([true], "Terms of Service must be accepted.")
            })}
            onSubmit={
              async values => {
                fetch('/api/register', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(values),
                }).then(res => {
                  if (res.status !== 200) {
                    throw new Error("Username already exists!");
                  }
                  else {
                    return res.json();
                  }
                }).then(json => {
                  user.setAccount(json.account);
                  user.setUser(json.user);
                  props.history.push('/');
                }).catch(alert);
              }
            }

          >
            <Form className={styled.root}>
              <TextInput
                lab={"Username"}
                name={"username"}
                type={"text"}
                placeholder={"Username"}
              />
              <TextInput
                lab={"Password"}
                name={"password"}
                type={"password"}
                placeholder={"Enter password"}
              />
              <TextInput
                lab={"Enter Password again:"}
                name={"newPassword"}
                type={"password"}
                placeholder={"Enter Password again"}
              />
              <TextInput
                lab={"Full Name"}
                name={"fullName"}
                type={"input"}
                placeholder={"e.g. Jane Smith"}
              />
              <TextInput
                lab={"Email Addrees"}
                name={"email"}
                type={"email"}
                placeholder={"e.g. jane.smith@email.com"}
              />
              <TextInput
                lab={"Phone Number"}
                name={"phone"}
                type={"tel"}
                placeholder={'e.g "1234567890" (no hyphens) '}
              />
              <Box>
                <Checkbox name="TOS"></Checkbox>
                <span> I accept the terms and conditions </span>
              </Box>
              <Button variant="contained" color="primary" type={"submit"}>Sign Up </Button>
            </Form>
          </Formik>
        </Box>
      </Container>
    </UserNavBar>
  );
}
export default withRouter(RegisterPage);
