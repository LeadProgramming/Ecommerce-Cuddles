import React, { useContext } from "react";
import UpdateItem from "../components/UpdateItem.js";
import PrivilegeBtns from "../components/PrivilegeBtns.js";
import NewItem from "../components/NewItem.js";
import { Item } from "../layout/ItemLayout";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Slide, Typography } from "@material-ui/core";
import { useDelete } from "../hooks/networkHooks";
import { ItemsContext } from "../context/Context";
export function CreateDialog({ create, handleCancel }) {
    return (
        <Dialog
            open={create}
            TransitionComponent={Slide}
            onClose={handleCancel}
            maxWidth={'xl'}
        >
            <NewItem handleCancel={handleCancel} />
        </Dialog>
    );
}
export function ReadDialog({ itmBody, read, handleCancel, handleUpdate }) {
    return (
        <Dialog
            open={read}
            TransitionComponent={Slide}
            onClose={handleCancel}
        >
            <Paper style={{
                display: "flex",
                padding: "10px"
            }}>
                <Item {...itmBody} />
                <Box display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                    <Typography color='secondary'>{itmBody.ItemName}</Typography>
                    <Typography>${itmBody.ItemPrice}</Typography>
                    <div>{itmBody.ItemDescription}</div>
                    {/* <div>Quantity:</div> */}
                    {/* <div>{item.ItemQuantity}</div> */}
                    {/* <PrivilegeBtns itmBody={itmBody} handleUpdate={handleUpdate} /> */}
                </Box>
            </Paper>
        </Dialog >)
}

export function UpdateDialog({ update, itmBody, handleCancel }) {
    return (
        <Dialog
            open={update}
            TransitionComponent={Slide}
            onClose={handleCancel}
        >
            <UpdateItem {...itmBody} handleCancel={handleCancel} />
        </Dialog>
    );
}

export function DeleteDialog({ del, itmBody, handleCancel }) {
    const { deleteItem } = useContext(ItemsContext);
    const deleting = () => {
        useDelete("/api/items", itmBody);
        deleteItem(itmBody);
        handleCancel();
    }
    return (
        <Dialog
            open={del}
            TransitionComponent={Slide}
            onClose={handleCancel}
        >
            <DialogTitle>{"Warning: Permanent Deletion!"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure that you want to delete this item? All deletions are permanent and irreversible!
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleCancel} variant="outlined">
                    Cancel
            </Button>
                <Button color="secondary" onClick={deleting} variant="contained">
                    Continue
            </Button>
            </DialogActions>
        </Dialog>
    );
}
