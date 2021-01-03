import React, { useReducer, useContext } from 'react';
import { Formik, Form } from "formik";
import { TextInput, TextAreaInput } from "../layout/FieldLayout.js";
import { Box, Button, DialogActions, DialogContent, DialogTitle, Paper, Snackbar } from "@material-ui/core";
import { Alert } from "../layout/FeedbackLayout";
import { makeStyles } from "@material-ui/core/styles";
import { ItemThumblink } from "../layout/ItemLayout";
import { ItemsContext } from "../context/Context";
import axios from "axios";
import * as Yup from "yup";
const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        padding: "10px"
    },
    content: {
        display: "flex",
    }
}))

function itemUpdaterReducer(state, action) {
    switch (action.type) {
        case 'rawImage':
            return { ...state, rawImg: action.payload }
        case 'image':
            return { ...state, image: action.payload }
        case 'name':
            return { ...state, name: action.payload }
        case 'quantity':
            return { ...state, quantity: action.payload }
        case 'description':
            return { ...state, description: action.payload }
        case 'price':
            return { ...state, price: action.payload }
        case 'cleared':
            return { ...state, error: 1, status: action.status }
        case 'error':
            return { ...state, error: 2, status: action.status  }
        case 'close':
            return { ...state, error: 0 }
        default:
            throw new Error();
    }
}
function UpdateItem(props) {
    const styled = useStyles();
    const { updateItem, items } = useContext(ItemsContext);
    const [state, dispatch] = useReducer(itemUpdaterReducer, {
        rawImg: {},
        image: props.ItemImage,
        name: props.ItemName,
        description: props.ItemDescription,
        quantity: props.ItemQuantity,
        price: props.ItemPrice,
        error: 0,
        status: '',
    });
    return (
        <>
            <DialogTitle>Update Item</DialogTitle>
            <DialogContent>
                <DialogActions>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            name: state.name,
                            quantity: state.quantity,
                            price: state.price,
                            description: state.description
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .max(50, `Maximum of 50 characters.`)
                                .required("Required"),
                            quantity: Yup.number()
                                .positive("Must be a positive number!")
                                .integer("Must be a whole number!")
                                .required("Required"),
                            price: Yup.number().required("Required")
                                .positive("Must be a positive number!")
                                .moreThan(0.01, "Must cost more than a penny."),
                            description: Yup.string()
                        })}
                        onSubmit={values => {
                            let formData = new FormData();
                            formData.append("id", props.ItemID);
                            formData.append("name", values.name);
                            formData.append("description", values.description);
                            formData.append("quantity", values.quantity);
                            formData.append("price", values.price);
                            formData.append("image", state.rawImg);
                            axios.put('/api/items', formData).then(res => {
                                updateItem({ state, props });
                                dispatch({ type: 'cleared', status: res.data });
                                // props.handleCancel();
                            }).catch((err) => {
                                dispatch({ type: "error", status: "Item cannot be updated." });
                            })
                        }}>
                        {({ }) => (
                            <Form className={styled.content} encType="multipart/form-data">
                                <Box display={"flex"} flexDirection={"column"} marginRight="10px">
                                    <Paper variant={"outlined"} className={styled.root}>
                                        <ItemThumblink ItemImage={state.image} ItemName={state.name} ItemPrice={state.price} />
                                        <Button variant={"outlined"} color="primary">Just A Preview</Button>
                                    </Paper>
                                </Box>
                                <Box display={"flex"} flexDirection={"column"}>
                                    <label htmlFor={"image"}>Update Item's Image</label>
                                    <input name={"image"} type={"file"} accept={"image/jpg,image/jpeg,image/png,image/gif"} onChange={(event) => {
                                        dispatch({ type: "rawImage", payload: event.currentTarget.files[0] });
                                        if (event.currentTarget.files[0]) {
                                            let reader = new FileReader();
                                            reader.readAsArrayBuffer(event.currentTarget.files[0]);
                                            reader.onload = () => {
                                                dispatch({ type: 'image', payload: reader.result });
                                            }
                                        }
                                    }} />
                                    <TextInput
                                        lab={"Name"}
                                        name={"name"}
                                        type={"text"}
                                        placeholder={"name"}
                                        size={"small"}
                                        value={state.name}
                                        onChange={(event) => { dispatch({ type: 'name', payload: event.target.value }) }}
                                    />
                                    <TextAreaInput
                                        lab={"Description"}
                                        name={"description"}
                                        type={"text"}
                                        placeholder={"description"}
                                        onChange={(event) => { dispatch({ type: 'description', payload: event.target.value }) }}
                                        value={state.description}
                                        rows={5}
                                    />
                                    <TextInput
                                        lab={"Quantity"}
                                        name={"quantity"}
                                        type={"number"}
                                        size={"small"}
                                        placeholder={"quantity"}
                                        onChange={(event) => { dispatch({ type: 'quantity', payload: event.target.value }) }}
                                        value={state.quantity}
                                    />
                                    <TextInput
                                        lab={"Price"}
                                        name={"price"}
                                        type={"text"}
                                        size={"small"}
                                        placeholder={"USD price"}
                                        value={state.price}
                                        onChange={(event) => { dispatch({ type: 'price', payload: event.target.value }) }}
                                    />
                                    <input type={"submit"} />
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </DialogActions>
            </DialogContent>
            <Snackbar open={state.error === 2} autoHideDuration={5000} onClose={() => dispatch({ type: "close" })}>
                <Alert severity="error" onClose={() => dispatch({ type: "close" })}>
                    {/* {state.name + " has not been updated."} */}
                    {state.status}
                </Alert>
            </Snackbar>
            <Snackbar open={state.error == 1} autoHideDuration={5000} onClose={() => dispatch({ type: "close" })}>
                <Alert severity="success" onClose={() => dispatch({ type: "close" })}>
                    {/* {state.name + " has been updated."} */}
                    {state.status}
                </Alert>
            </Snackbar>
        </>
    );
}
export default UpdateItem;