import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useContext, useEffect, useState} from "react";
import Button from "@mui/material/Button";

const theme = createTheme();

export default function Transactions(props: any) {
    const [subAccounts, setSubAccounts]: any = useState({})
    const [transactions, setTransactions]: any = useState([])

    useEffect(() => {
        let _subAccounts = JSON.parse(localStorage.getItem("subs") || "")
        if (!_subAccounts)
            return

        let _transactions = localStorage.getItem("txs")
        if (_transactions) {
            setTransactions(JSON.parse(_transactions))
            return
        }

        const getRandAmount = (max: number) => {
            return Math.floor(Math.random() * max)
        }

        let accounts = Object.keys(_subAccounts)
        let txs = []
        for (let i = 0; i < 7; i++) {
            let acc = _subAccounts[accounts[getRandAmount(accounts.length)]]
            let amount = getRandAmount(10000)
            txs.push({account: acc, amount: amount, in: "fuji", out: "pfn", token: "wavax"})
        }

        if (transactions.length == 0) {
            setTransactions(txs)
            localStorage.setItem("txs", JSON.stringify(txs))
        }
        setSubAccounts(_subAccounts)
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box component="form" sx={{mt: 3}} style={{backgroundColor: "#fdf8f7", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} width={"700px"}>
                <div style={{margin: "15px", paddingBottom: "15px"}}>
                    <Grid container spacing={2} style={{color: "#6d6d6d", fontSize: "14px", paddingBottom: "5px", fontWeight: "300"}}>
                        <Grid item xs={3} style={{textAlign: "left"}}>
                            Account
                        </Grid>
                        <Grid style={{textAlign: "right"}} item xs={2}>
                            Token
                        </Grid>
                        <Grid style={{textAlign: "right"}} item xs={2}>
                            From
                        </Grid>
                        <Grid style={{textAlign: "right"}} item xs={2}>
                            To
                        </Grid>
                        <Grid style={{textAlign: "right"}} item xs={3}>
                            Amount
                        </Grid>
                    </Grid>
                    {transactions.map((item: any, index: any) => {
                        return (
                            <div>
                                <div style={{borderTop: "1px solid black", width: "100%", margin: "auto"}}/>
                                <Grid container spacing={2}>
                                    <Grid style={{textAlign: "left", margin: "3px 0"}} item xs={3}>
                                        {item.account.slice(0, 5)} . . . {item.account.slice(item.account.length - 6, item.account.length - 1)}
                                    </Grid>
                                    <Grid style={{textAlign: "right", margin: "3px 0"}} item xs={2}>
                                        {item.token.toUpperCase()}
                                    </Grid>
                                    <Grid style={{textAlign: "right", margin: "3px 0"}} item xs={2}>
                                        {item.in.toUpperCase()}
                                    </Grid>
                                    <Grid style={{textAlign: "right", margin: "3px 0"}} item xs={2}>
                                        {item.out.toUpperCase()}
                                    </Grid>
                                    <Grid style={{textAlign: "right", margin: "3px 0"}} item xs={3}>
                                        {item.amount}
                                    </Grid>
                                </Grid>
                            </div>
                        )
                    })}
                    <div style={{borderTop: "1px solid black", width: "100%", margin: "auto"}}/>

                </div>
            </Box>

        </ThemeProvider>
    );
}
