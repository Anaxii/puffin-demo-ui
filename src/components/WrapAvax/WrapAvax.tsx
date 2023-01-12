import * as React from 'react';
import {toast} from "react-toastify";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {Web3Context} from "../../helpers/context";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useContext, useEffect, useState} from "react";
import Web3 from "web3";
import TextField from "@mui/material/TextField";
import {AddNetwork} from "../../util/AddNetwork";

const theme = createTheme();

export default function WrapAvax(props: any) {
    const web3Context: any = useContext(Web3Context);

    const [web3Modal, setWeb3Modal] = useState(null)
    const [amount, setAmount] = useState("0")
    const [contract, setContract] = useState("")
    const handleSubmit = async () => {
        await AddNetwork("fuji")

        let checkStatus = new Promise(async (ok: any, reject: any) => {
            let weiValue = Web3.utils.toWei(amount, 'ether');
            if (BigInt(weiValue) > props.balances.avax) {
                weiValue = (props.balances.avax - BigInt(Web3.utils.toWei(0.01.toString(), 'ether'))).toString()
            }
            console.log(props.balances)
            web3Context.web3.eth.sendTransaction({
                from: props.account,
                to: contract,
                value: weiValue
            }).then(() => {
                web3Context.updateBalances()
                ok()
            }).catch(() => reject())
        })

        await toast.promise(
            checkStatus,
            {
                success: 'Transaction Successful',
                pending: 'Transaction pending',
                error: 'Transaction failed'
            }
        )

    };

    const handleChange = async (event: any) => {
        event.preventDefault();
        console.log(event.target.id)
        if (event.target.id == "contract") {
            setContract(event.target.value.toString())

        } else {
            setAmount(event.target.value.toString())

        }
    };

    useEffect(() => {
        // @ts-ignore
    }, [web3Modal])

    async function connectWallet() {
        // @ts-ignore
        const provider = await web3Modal.connect();
        if (provider) {
            props.setConnecting(true)
            props.setWeb3(await new Web3(provider))
            props.setProvider(provider)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <p style={{marginTop: "5%"}}>
                Wrap AVAX
            </p>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        name="amount"
                        type="text"
                        fullWidth
                        id="contract"
                        label="WAVAX Contract Address"
                        autoFocus
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="amount"
                        type="number"
                        fullWidth
                        id="amount"
                        label="Amount"
                        autoFocus
                        onChange={handleChange}
                    />
                </Grid>

            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                style={{backgroundColor: "#E55021"}}
                onClick={() => {
                    handleSubmit()
                }}
            >
                Wrap AVAX
            </Button>

            {/*</Box>*/}
            {/*</Box>*/}
        </ThemeProvider>
    );
}
