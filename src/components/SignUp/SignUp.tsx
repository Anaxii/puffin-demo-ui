import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Copyright} from "../Copyright/Copyright";
import Web3 from "web3";
import Web3Modal from 'web3modal'
import {useEffect, useState} from "react";
import {Sign} from "../../util/Sign";
import {toast} from "react-toastify";

const theme = createTheme();

export default function SignUp(props: any) {

    const [web3Modal, setWeb3Modal] = useState(null)
    const [signature, setSignature] = useState({
        signature: "",
        r: "",
        v: "",
        s: "",
        hashedMessage: ""
    })

    useEffect(() => {
        const providerOptions = {
            injected: {
                package: null,
            },
        };

        const newWeb3Modal = new Web3Modal({
            cacheProvider: true, // very important
            network: "mainnet",
            providerOptions,
        });

        // @ts-ignore
        setWeb3Modal(newWeb3Modal)
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        let fname = data.get('firstName')
        let lname = data.get('lastName')

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    wallet_address: accounts[0],
                    email: data.get('email'),
                    physical_address: data.get('address'),
                    name: fname + " " + lname,
                    country: data.get('country'),
                    signature: {
                        signature_data: {
                            hashed_message: signature.hashedMessage.toString(),
                            r: signature.r.toString(),
                            s: signature.s.toString(),
                            v: signature.v.toString(),
                            sig: signature.signature.toString()
                        },
                        message: "Puffin KYC Request: " + accounts[0],
                        account: accounts[0]
                    },
                })
        };
        await connectWallet(true)
        let checkStatus = new Promise(async (ok: any, reject: any) => {
            fetch('https://kyc-testnet.thepuffin.network/verify', requestOptions)
                .then(response => response.json())
                .then(data => {
                    ok()
                    props.setStatus("pending")
                    return data.status
                }).catch((err: any) => {
                console.log(err)
                reject()
                return false
            });
        })
        await toast.promise(
            checkStatus,
            {
                success: 'KYC request received, please wait up to 5 minutes for approval',
                pending: 'Sending KYC request',
                error: 'Could not connect to server, try again later.'
            }
        )

    };

    useEffect(() => {
        // @ts-ignore
        if (web3Modal && web3Modal.cachedProvider) {
            connectWallet(false)
        }
    }, [web3Modal])

    async function connectWallet(disc: boolean) {
        return new Promise(async (ok: any) => {
            // @ts-ignore
            const provider = await web3Modal.connect();
            if (provider) {
                if (disc) {
                    console.log("disc")
                    props.setDisconnect(false)
                }
                props.setConnecting(true)
                props.setWeb3(await new Web3(provider))
                props.setProvider(provider)
                ok()
            }
        })
    }

    async function sign() {
        if (!props.Provider) {
            await connectWallet(false)
        }
        let _signature: any = await Sign()
        if (_signature.signature)
            setSignature(_signature)
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

                    <Avatar sx={{m: 1, bgcolor: '#E55021'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="country"
                                    label="Country"
                                    name="country"
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    required
                                    disabled
                                    fullWidth
                                    name="password"
                                    label={signature.signature ? signature.signature : "Wallet Signature"}
                                    type="test"
                                    id="signature"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Box textAlign='center'>
                                    <a onClick={sign}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{mt: 1, mb: 1}}
                                            style={{backgroundColor: "#E55021"}}
                                        >
                                            Sign
                                        </Button>
                                    </a>
                                </Box>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            style={{backgroundColor: "#E55021"}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={() => props.setPage("signIn")} href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
