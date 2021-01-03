import React from 'react';
import { Box, Container, CircularProgress } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/styles";
import { useGet } from "./hooks/networkHooks";
import AdminNavBar from "./components/AdminNavBar";
const useStyles = makeStyles(() => ({
    root: {
    }
}))
function AdminOrdersPage() {
    let styled = useStyles();
    const { fetched: orderInfo, err: orderError } = useGet(`/api/admin/orders`);
    if (!orderInfo) {
        return (
            <Box width="100%" height="50vh" display="flex" justifyContent="center" alignItems="center">
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
            { field: 'username', headerName: "Username", width: 100 },
            {
                field: 'ItemImage', headerName: 'Image', width: 100, renderCell: (params) => {
                    return <img src={getUrl(params.data.ItemImage)} alt={params.data.ItemName} style={{ width: "100%", height: "100%" }} />
                }
            },
            { field: 'ItemName', headerName: 'Name', width: 150 },
            { field: 'ItemPrice', headerName: 'Price', width: 100 },
            { field: 'quantity', headerName: 'Quantity', width: 75 },
            { field: 'charge', headerName: 'Charge', width: 100 },
            { field: 'status', headerName: 'Status', width: 100 },
            { field: 'OrderID', headerName: 'Order#', width: 75 },
            { field: 'orderDate', headerName: 'Order Date', width: 125 },
        ]
        const rows = orderInfo.map((i, j) => {
            i.id = j;
            i.orderDate = i.orderDate.slice(0, 10);
            return i;
        });
        return (
            <AdminNavBar>
                <Container>
                    <Box margin={"10px 0 80px 0"} width={"100%"} height={"400px"}>
                        <h1>Order History</h1>
                        <DataGrid rows={rows} columns={columns} rowHeight={50} pageSize={5} sortModel={sortModel} />
                    </Box>
                </Container>
            </AdminNavBar>
        );
    }
}
function getUrl(b) {
    let view = new Uint8Array(b.data);
    let blob = new Blob([view], { type: "image/jpeg" });
    return URL.createObjectURL(blob);
}

export default AdminOrdersPage;