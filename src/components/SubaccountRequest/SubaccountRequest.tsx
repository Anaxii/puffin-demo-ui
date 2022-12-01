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
import {KYC_URL} from "../../constants/Global";

const theme = createTheme();

export default function SubAccountRequest(props: any) {

    const [web3Modal, setWeb3Modal] = useState(null)
    const [parentSignature, setParentSignature] = useState({
        signature: "",
        r: "",
        v: "",
        s: "",
        hashedMessage: "",
        walletAddress: ""
    })
    const [subaccountSignature, setSubaccountSignature] = useState({
        signature: "",
        r: "",
        v: "",
        s: "",
        hashedMessage: "",
        walletAddress: ""
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    parent_address: parentSignature.walletAddress,
                    subaccount_address: subaccountSignature.walletAddress,
                    parent_signature: {
                        signature_data: {
                            hashed_message: parentSignature.hashedMessage.toString(),
                            r: parentSignature.r.toString(),
                            s: parentSignature.s.toString(),
                            v: parentSignature.v.toString(),
                            sig: parentSignature.signature.toString()
                        },
                        message: "Puffin KYC Request: " + parentSignature.walletAddress,
                        account: parentSignature.walletAddress
                    },
                    sub_account_signature: {
                        signature_data: {
                            hashed_message: subaccountSignature.hashedMessage.toString(),
                            r: subaccountSignature.r.toString(),
                            s: subaccountSignature.s.toString(),
                            v: subaccountSignature.v.toString(),
                            sig: subaccountSignature.signature.toString()
                        },
                        message: "Puffin KYC Request: " + parentSignature.walletAddress,
                        account: parentSignature.walletAddress
                    },
                })
        };
        let checkStatus = new Promise(async (ok: any, reject: any) => {
            fetch(KYC_URL + '/requestsubaccount', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.success == "true") {
                        ok()
                    } else {
                        console.log(data)
                        reject()
                    }
                    return data.status
                }).catch((err: any) => {
                reject()
                return false
            });
        })
        await toast.promise(
            checkStatus,
            {
                success: 'Subaccount request received, please wait up to 5 minutes for approval',
                pending: 'Sending KYC request',
                error: 'Could not connect to server, try again later.'
            }
        )

    };

    async function sign(_type: string) {

        if (_type == "sub") {
            let _signature: any = await Sign()
            if (_signature.signature)
                setSubaccountSignature(_signature)
        } else {
            let _signature: any = await Sign()
            if (_signature.signature)
                setParentSignature(_signature)
        }
    }

    return (
        <ThemeProvider theme={theme}>
                <CssBaseline/>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                        <p>
                            Sub-Account Request Form
                        </p>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <TextField
                                    required
                                    disabled
                                    fullWidth
                                    name="parent_signature"
                                    label={parentSignature.signature ? parentSignature.signature : "Parent Wallet Signature"}
                                    id="parent_signature"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Box textAlign='center'>
                                    <a onClick={() => {
                                        sign("parent")
                                    }}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            id={"parent_sign"}
                                            sx={{mt: 1, mb: 1}}
                                            style={{backgroundColor: "#E55021"}}
                                        >
                                            Sign
                                        </Button>
                                    </a>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    disabled
                                    fullWidth
                                    name="parent_address"
                                    label={parentSignature.signature ? parentSignature.signature : "Parent Wallet Address"}
                                    type="parent_address"
                                    id="signature"
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    required
                                    disabled
                                    fullWidth
                                    name="subaccount_signature"
                                    label={subaccountSignature.signature ? subaccountSignature.signature : "Sub-Account Wallet Signature"}
                                    id="subaccount_signature"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Box textAlign='center'>
                                    <a onClick={() => {
                                        sign("sub")
                                    }}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            id={"subaccount_sign"}
                                            sx={{mt: 1, mb: 1}}
                                            style={{backgroundColor: "#E55021"}}
                                        >
                                            Sign
                                        </Button>
                                    </a>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    disabled
                                    fullWidth
                                    name="subaccount_address"
                                    label={subaccountSignature.signature ? subaccountSignature.signature : "Sub-Account Wallet Address"}
                                    type="subaccount_address"
                                    id="signature"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            style={{backgroundColor: "#E55021"}}
                        >
                            Request Subaccount
                        </Button>
                    </Box>
        </ThemeProvider>
    );
}
