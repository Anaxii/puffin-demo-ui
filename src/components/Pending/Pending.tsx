import * as React from 'react';
import {toast} from "react-toastify";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Copyright} from "../Copyright/Copyright";
import {useContext, useEffect, useState} from "react";
import Web3 from "web3";
import Web3Modal from 'web3modal'
import TextField from "@mui/material/TextField";
import {AddNetwork} from "../../util/AddNetwork";
import {KYC_URL} from "../../constants/Global";
import {clear} from "@testing-library/user-event/dist/clear";
import {Web3Context} from "../../helpers/context";

const theme = createTheme();

export default function Pending(props: any) {
    const web3Context: any = useContext(Web3Context);
    const [web3Modal, setWeb3Modal] = useState(null)

    const whilePending = async (): Promise<any> => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    wallet_address: props.account.toLowerCase(),
                })
        };

        if (!props.account.toLowerCase())
            return false

        fetch(KYC_URL + '/status', requestOptions)
            .then(response => response.json())
            .then(data => {
                props.setStatus(data.status)
                web3Context.updateBalances()
                return true
            }).catch((err) => {
            return false
        });
    }

    useEffect(() => {
        props.setStatus("pending")
    }, [])

    useEffect(() => {
        let _interval = setInterval(async () => {
            let is: boolean = await whilePending()
            if (is) {
                clearInterval(_interval)
            }

        }, 2500)
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
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        KYC Request Pending
                    </Typography>
                    <p>
                        Your account request has been sent, please wait up to 5 minutes for approval. Once your account
                        is approved,
                        you will have access to the PFN - the first permissioned network built on Avalanche.
                    </p>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                style={{backgroundColor: "#E55021"}}
                                onClick={() => AddNetwork("pfn")}
                            >
                                Add PFN to wallet
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                style={{backgroundColor: "#E55021"}}
                                onClick={() => AddNetwork("fuji")}
                            >
                                Add Fuji to Wallet
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
