import React, { useContext, useEffect, useReducer } from "react";
import { ItemsContext, UserContext } from "./context/Context";
import { useGet } from "./hooks/networkHooks.js";
import { Box, Container, Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListingsItem from "./components/ListingsItem.js";
import Heading from "./components/Heading.js";
import NewItemPlaceholder from "./components/NewItemPlaceholder.js";
import AdminNavBar from "./components/AdminNavBar";
import UserNavBar from "./components/UserNavBar";
import { CreateDialog, UpdateDialog, ReadDialog, DeleteDialog } from "./layout/DialogLayout";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    padding: "10px 0 10px 0",
  },
  item: {
    display: "flex",
    padding: "10px"
  },
  newTeddy: {
    display: "flex",
    flexDirection: "column",
    height: "376px",
    textAlign: "center",
    padding: "10px 0 10px 0",
    justifyContent: "space-between",
    alignItems: "center"
  }
}));
const initialState = {
  create: false,
  read: false,
  update: false,
  delete: false,
  itmBody: [],
}
function storeReducer(state, action) {
  switch (action.type) {
    case 'image':
      return { ...state, image: action.payload };
    case 'createItem':
      return { ...state, create: true };
    case 'readItem':
      return { ...state, read: true, itmBody: action.payload };
    case 'UpdateItemBtn':
      return { ...state, update: true, itmBody: action.payload };
    case 'deleteItem':
      return { ...state, delete: true, itmBody: action.payload };
    case 'cancel':
      return { ...initialState, itmBody: state.itmBody };
    default:
      throw new Error();
  }
}
function ListingsPage(props) {
  const { items, setItems } = useContext(ItemsContext);
  const { account } = useContext(UserContext);
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const { fetched, error } = useGet("/api/items")
  const styled = useStyles();
  const handleCreate = () => {
    dispatch({ type: 'createItem' });
  }
  const handleRead = (itm) => {
    dispatch({ type: 'readItem', payload: itm })
  }
  const handleUpdate = (itm) => {
    dispatch({ type: 'UpdateItemBtn', payload: itm })
  }
  const handleDelete = (itm) => {
    dispatch({ type: 'deleteItem', payload: itm });
  }
  const handleCancel = () => {
    dispatch({ type: 'cancel' });
  }
  if (!items || items.length == 0) {
    setItems(fetched);
    console.log(fetched)
    return (
      <Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size={80} color="secondary" />
      </Box>
    );
  }
  else if (account === "admin") {
    return (
      <AdminNavBar>
        <Container maxWidth='md'>
          <Heading> Collections</Heading>
          <Grid container spacing={3} justify={"center"}>
            {items.map((itm) => {
              return (
                <ListingsItem handleUpdate={() => { handleUpdate(itm) }} handleRead={() => { handleRead(itm) }} handleDelete={() => { handleDelete(itm) }} itmBody={{ ...itm }} />
              );
            })}
            <NewItemPlaceholder {... { handleCreate }} />
          </Grid>
        </Container >
        <CreateDialog  {...{ create: state.create, handleCancel }} />
        <ReadDialog {...{ read: state.read, itmBody: state.itmBody, handleCancel, handleUpdate }} />
        <UpdateDialog {...{ update: state.update, itmBody: state.itmBody, handleCancel }} />
        <DeleteDialog {...{ del: state.delete, itmBody: state.itmBody, handleCancel }} />
      </AdminNavBar>
    )
  }
  else {
    return (
      <UserNavBar>
        <Container maxWidth='md'>
          <Heading> Collections</Heading>
          <Grid container spacing={3} justify={"center"}>
            {items.map((itm) => {
              return (
                <ListingsItem handleRead={() => { handleRead(itm) }} handleDelete={() => { handleDelete(itm) }} itmBody={{ ...itm }} />
              );
            })}
          </Grid>
        </Container >
        <ReadDialog {...{ read: state.read, itmBody: state.itmBody, handleCancel, handleUpdate }} />
      </UserNavBar >
    );
  }
}
export default ListingsPage;
