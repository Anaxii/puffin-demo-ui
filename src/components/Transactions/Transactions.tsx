import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Web3Context} from "../../helpers/context";
import PFNNameService from "../../abi/PFNNameService.json";
import {AddNetwork} from "../../util/AddNetwork";
import {local} from "web3modal";

const theme = createTheme();

export default function Transactions(props: any) {
    const web3Context: any = useContext(Web3Context);
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
        console.log("TEST")

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
            <Box component="form" sx={{mt: 3}} width={"600px"}>
                <Grid container spacing={2} style={{color: "#1d1d1d", fontSize: "14px", paddingBottom: "15px"}}>
                    <Grid xs={1}/>
                    <Grid item xs={2}>
                        Account
                    </Grid>
                    <Grid item xs={2}>
                        Token
                    </Grid>
                    <Grid item xs={2}>
                        From
                    </Grid>
                    <Grid item xs={2}>
                        To
                    </Grid>
                    <Grid item xs={2}>
                        Amount
                    </Grid>
                    <Grid xs={1}/>
                </Grid>
                {transactions.map((item: any, index: any) => {
                    return (
                        <div>
                            <Grid container spacing={2}>
                                <Grid xs={1}/>
                                <Grid item xs={2}>
                                    {item.account.slice(0, 5)}...
                                </Grid>
                                <Grid item xs={2}>
                                    {item.token.toUpperCase()}
                                </Grid>
                                <Grid item xs={2}>
                                    {item.in}
                                </Grid>
                                <Grid item xs={2}>
                                    {item.out}
                                </Grid>
                                <Grid item xs={2}>
                                    {item.amount}
                                </Grid>
                                <Grid xs={1}/>
                            </Grid>
                        </div>
                    )
                })}
            </Box>
        </ThemeProvider>
    );
}
