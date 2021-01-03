import React from 'react';
import { Box, Container, CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from '@material-ui/core/styles';
import { useGet } from "./hooks/networkHooks";
import AdminNavBar from "./components/AdminNavBar";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column"
    },
    paper: {
        padding: "1em",
        textAlign: "center"
    }
}))
function AdminSalesPage(props) {
    let { fetched: daily, error: dailyError } = useGet("/api/admin/sales/daily");
    let { fetched: weekly, error: weeklyError } = useGet("/api/admin/sales/weekly");
    let { fetched: monthly, error: monthlyError } = useGet("/api/admin/sales/monthly");
    let { fetched: yearly, error: yearlyError } = useGet("/api/admin/sales/yearly");
    let { fetched: leaderboard, error: lbError } = useGet("/api/admin/sales/leaderboard");
    let styled = useStyles();
    if (!daily || !weekly || !monthly || !yearly || !leaderboard) {
        return (
            <Box width="100%" height="50vh" display="flex" justifyContent="center" alignItems="center">
                <CircularProgress size={80} color="secondary" />
            </Box>
        );
    }
    else {
        const columns = [
            {
                field: 'ItemImage', headerName: 'Image', width: 100, renderCell: (params) => {
                    return <img src={getUrl(params.data.ItemImage)} alt={params.data.ItemName} style={{ width: "100%", height: "100%" }} />
                }
            },
            { field: 'ItemName', headerName: 'Name', width: 150 },
            { field: 'ItemPrice', headerName: 'Price', width: 150 },
            { field: 'sold', headerName: '# of sold', width: 150 }
        ]
        const rows = leaderboard.map((i, j) => {
            i.id = j;
            return i;
        });
        return (
            <AdminNavBar>
                <Container className={styled.root} >
                    <h1>Sales</h1>
                    <Grid container spacing={1}>
                        <Grid container item spacing={1} xs={12}>
                            <Grid item xs={3}>
                                <Paper className={styled.paper}>
                                    <Typography>Todays Sold</Typography>
                                    <Typography>{daily.count}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={styled.paper}>
                                    <Typography>Weekly Sold</Typography>
                                    <Typography>{weekly.count}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={styled.paper}>
                                    <Typography>Monthly Sold</Typography>
                                    <Typography>{monthly.count}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={styled.paper}>
                                    <Typography>Yearly Sold</Typography>
                                    <Typography>{yearly.count}</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={1} xs={12}>
                            <Grid item xs={3}>
                                <Paper className={styled.paper}>
                                    <Typography>Todays Profit</Typography>
                                    <Typography>${daily.profit || 0}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={styled.paper}>
                                    <Typography>Weekly Profit</Typography>
                                    <Typography>${weekly.profit || 0}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={styled.paper}>
                                    <Typography>Monthly Profit</Typography>
                                    <Typography>${monthly.profit || 0}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={styled.paper}>
                                    <Typography>Yearly Profit</Typography>
                                    <Typography>${yearly.profit || 0}</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box margin={"10px 0 100px 0"} width={"100%"} height={"400px"}>
                        <h1>Leaderboard</h1>
                        <DataGrid rows={rows} columns={columns} rowHeight={50} pageSize={5} />
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
export default AdminSalesPage;