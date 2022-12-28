import * as React from 'react';
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
import {useEffect, useState} from "react";
import Web3 from "web3";
import Web3Modal from 'web3modal'
import {InfinitySpin} from "react-loader-spinner";
import {KYC_URL} from "../../constants/Global";

const theme = createTheme();

export default function SignIn(props: any) {

    const [web3Modal, setWeb3Modal] = useState(null)

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

    const submit = async () => {
        await connectWallet()
        handleSubmit()
    }
    useEffect(() => {
        props.setStatus("")
    }, [])

    const handleSubmit = async () => {
        if (!props.account)
            return

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    wallet_address: props.account.toLowerCase(),
                })
        };

        fetch(KYC_URL + '/status', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.status == "nonExist") {
                    props.setPage("signUp")
                    return
                }
                props.setStatus(data.status)
                props.setDisconnect(false)
            }).catch((err) => {
            console.log(err)
            props.setPage("signUp")
            return false
        });

    };

    useEffect(() => {
        // @ts-ignore
        if (web3Modal && web3Modal.cachedProvider) {
            connectWallet()
        }
        if (Web3Modal && props.account) {
            handleSubmit()
        }
    }, [web3Modal, props.account])

    async function connectWallet() {
        // @ts-ignore
        const provider = await web3Modal.connect();
        if (provider) {
            let w3 = await new Web3(provider)
            props.setWeb3(w3)
            props.setProvider(provider)
            props.setWeb3Data()
            return {provider, w3: w3}
        }
        return {}
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
                        Sign in
                    </Typography>
                    {props.account &&
                    <div>
                        <p style={{marginBottom: 0}}>Connected Account <br/>{props.account}</p>
                        <div style={{marginLeft: "auto", marginRight: "auto", marginBottom: 0}}>
                            <InfinitySpin
                                color="#E55021"
                            />
                        </div>

                    </div>}
                    {!props.account ?

                        <Box style={{marginTop: 0, paddingTop: 0}} component="form" noValidate onSubmit={submit}
                             sx={{mt: 3}}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                style={{backgroundColor: "#E55021"}}
                                onClick={() => {
                                    submit()
                                }}
                            >
                                Sign In
                            </Button>


                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link onClick={() => props.setPage("signUp")} href="#" variant="body2">
                                        Don't have an account? Sign up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                        :
                        <Link onClick={() => props.setPage("signUp")} href="#" variant="body2">
                            Don't have an account? Sign up
                        </Link>
                    }
                </Box>
            </Container>
        </ThemeProvider>
    );
}
