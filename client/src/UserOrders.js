import React, { useContext } from "react";
import { UserContext } from "./context/Context"
import { useGet } from "./hooks/networkHooks";
import { Link, Redirect } from "react-router-dom";
import { Box, Button, Container, CircularProgress } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import UserNavBar from "./components/UserNavBar.js";
function UserOrders() {
    const { user, account } = useContext(UserContext);
    if (account !== "user") {
        return <Redirect to="/login" />
    }
    const { fetched: orderInfo, err: orderError } = useGet(`/api/users/${user}/orders`);
    if (!orderInfo) {
        return (
            <Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center">
                <CircularProgress size={80} color="secondary" />
            </Box>
        );
    }
    else {
        const sortModel = [
            {
                field: 'orderDate',
                sort: 'desc'
            },
        ]
        const columns = [
            {
                field: 'ItemImage', headerName: 'Image', width: 100, renderCell: (params) => {
                    return <img src={getUrl(params.data.ItemImage)} alt={params.data.ItemName} style={{ width: "100%", height: "100%" }} />
                }
            },
            { field: 'ItemName', headerName: 'Name', width: 150 },
            { field: 'ItemPrice', headerName: 'Price', width: 150 },
            { field: 'quantity', headerName: 'Quantity', width: 100 },
            { field: 'charge', headerName: 'Charge', width: 150 },
            { field: 'status', headerName: 'Status', width: 150 },
            { field: 'OrderID', headerName: 'Order#', width: 100 },
            { field: 'orderDate', headerName: 'Order Date', width: 150 },
        ]
        const rows = orderInfo.map((i, j) => {
            i.id = j;
            i.orderDate = i.orderDate.slice(0, 10);
            return i;
        });
        return (
            <UserNavBar>
                <Container>
                    <Box margin={"10px 0 80px 0"} width={"100%"} height={"400px"}>
                        <h1>Order History</h1>
                        <DataGrid rows={rows} columns={columns} rowHeight={50} pageSize={5} sortModel={sortModel} />
                    </Box>
                </Container>
            </UserNavBar>);
    }
}
function getUrl(b) {
    let view = new Uint8Array(b.data);
    let blob = new Blob([view], { type: "image/jpeg" });
    return URL.createObjectURL(blob);
}
export default UserOrders;