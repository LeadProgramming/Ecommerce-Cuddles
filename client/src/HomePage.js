import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput } from "./layout/FieldLayout.js";
import { UserContext } from "./context/Context";
import { Link } from "react-router-dom";
import { Typography, Container } from "@material-ui/core";
import UserNavBar from "./components/UserNavBar";
function HomePage() {
  const curr = useContext(UserContext);
  console.log(curr.account, curr.user);
  return (
    <UserNavBar>
      <Container component={"main"} maxWidth={"md"} style={{ marginTop: "15px" }}>
        <Typography display={"inline"}>Account Status :  <Typography display={"inline"} color={"secondary"}> {curr.account} </Typography> </Typography>
        <br></br>
        {(curr.user != "guest") ? <Typography display={"inline"}> Username : <Typography display={"inline"} color={"primary"}>{curr.user}</Typography></Typography> : <span>To become a user: <Link to="/register">Register here!</Link></span>}
        {/* <div className={"buyerSearch"}>
          <Formik
            initialValues={{
              buyerSearch: ""
            }}
            validationSchema={Yup.object({
              buyerSearch: Yup.string()
            })}
            onSubmit={(values) => {
              //Buyer query for items on the market.
              // Form's action is actually here and will contain the username and password passed here.
              alert(JSON.stringify(values, null, 2));
            }}
          >
            <Form>
              <TextInput
                label={"Your cuddle buddy starts here."}
                name={"buyerSearch"}
                type={"search"}
                placeholder={"Find your buddy here"}
              />
            </Form>
          </Formik>
        </div> */}
      </Container>
    </UserNavBar>
  );
}

export default HomePage;
