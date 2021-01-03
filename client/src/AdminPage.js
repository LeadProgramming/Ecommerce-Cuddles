import React from 'react';
import { Box } from "@material-ui/core";
import AdminNavBar from "./components/AdminNavBar";
function AdminPage(props) {
    return (
        <AdminNavBar>
            <Box width="100%" height="50vh" display="flex" justifyContent="center" alignItems="center">
                <h1>Welcome back. Admin</h1>
            </Box>
        </AdminNavBar>
    );
}
export default AdminPage;