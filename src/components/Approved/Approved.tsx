import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from "react";
import Web3 from "web3";
import {AddNetwork} from "../../util/AddNetwork";
import Bridge from "../Bridge/Bridge";
import WrapAvax from "../WrapAvax/WrapAvax";
import SubAccountRequest from "../SubaccountRequest/SubaccountRequest";
import NameService from "../NameService/NameService";
import logo from "../../assets/logo.png";
const theme = createTheme();

export default function Approved(props: any) {

    const [web3Modal, setWeb3Modal] = useState(null)
    const [selected, setSelected] = useState("Bridge")
    useEffect(() => {
        // @ts-ignore
    }, [web3Modal])

    async function connectWallet() {
        console.log(props.status)
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
            <AppBar position="fixed" style={{backgroundColor: "#FFFFFF", boxShadow: "none"}} sx={{ bottom: 'auto', top: 0 }}>
                <div className={'navigation'}>
                    <div className={"logo-div"}>
                        <div className={"logo"}>
                            <img width={"55px"} src={logo}/>

                        </div>
                        <h2 className={"exposure-title"}>
                            Puffin KYC
                        </h2>
                    </div>

                    <div className={"color-primary"} style={{margin: "auto", color: "black", textAlign: "center", "width": "100%"}}>
                        <Grid container spacing={2}>
                            <Grid item xs={(props.status != "sub" ? 3 : 4)} >
                                <p style={{cursor: "pointer", color: selected == "Bridge" ? "#E55021" : "black"}}
                                onClick={() => {
                                    setSelected("Bridge")
                                }}>
                                    Bridge
                                </p>
                            </Grid>
                            {props.status != "sub" &&
                            <Grid item xs={3} >
                              <p style={{cursor: "pointer", color: selected == "Sub-Accounts" ? "#E55021" : "black"}}
                                 onClick={() => {
                                     setSelected("Sub-Accounts")
                                 }}>
                                Sub-Accounts
                              </p>
                            </Grid>
                            }

                            <Grid item xs={(props.status != "sub" ? 3 : 4)} >
                                <p style={{cursor: "pointer", color: selected == "Name Service" ? "#E55021" : "black"}}
                                onClick={() => {
                                    setSelected("Name Service")
                                }}>
                                    Name Service
                                </p>
                            </Grid>
                            <Grid item xs={(props.status != "sub" ? 3 : 4)} >
                                <p style={{cursor: "not-allowed", color: "gray"}}
                                   >
                                    dApp Directory
                                </p>
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{marginLeft: "auto", margin: "auto", marginRight: "0"}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{backgroundColor: "#E55021"}}
                            onClick={
                                () => {
                                    props.disconnect()
                                }}
                        >
                            Disconnect
                        </Button>
                    </div>
                </div>
            </AppBar>
            <Container component="main" maxWidth="xs" style={{paddingTop: "5%", paddingBottom: "5%"}}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        {props.name == "" ? "Welcome to Puffin" : `Welcome ${props.name}`}
                    </Typography>
                    {selected == "Bridge" && <div>
                      <Bridge account={props.account} balances={props.balances} />
                      <WrapAvax account={props.account} balances={props.balances} />
                    </div>
                    }
                    {selected == "Sub-Accounts" && <div>
                      <SubAccountRequest account={props.account} balances={props.balances} />
                    </div>
                    }
                    {selected == "Name Service" && <NameService account={props.account} balances={props.balances} name={props.name} />}
                    <div style={{margin: "2.5%"}}/>
                    {props.account}
                    <Grid container spacing={2}>
                        <Grid item xs={6} >
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{backgroundColor: "#E55021"}}
                                onClick={() => AddNetwork("pfn")}
                            >
                                Connect to PFN
                            </Button>
                        </Grid>
                        <Grid item xs={6} >
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{backgroundColor: "#E55021"}}
                                onClick={() => AddNetwork("fuji")}
                            >
                                Connect to Fuji
                            </Button>
                        </Grid>
                    </Grid>


                </Box>
            </Container>
        </ThemeProvider>
    );
}
