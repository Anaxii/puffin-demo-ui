import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useEffect, useState} from "react";
import Web3 from "web3";
import {AddNetwork} from "../../util/AddNetwork";
import Bridge from "../Bridge/Bridge";
import WrapAvax from "../WrapAvax/WrapAvax";
import SubAccountRequest from "../SubaccountRequest/SubaccountRequest";
import Transactions from "../Transactions/Transactions";
import logo from "../../assets/logo.png";
import SubnetSetup from "../SubnetSetup/SubnetSetup";
import Settings from "../Settings/Settings";
import Map from "../Map/Map";
import Overview from "../Overview/Overview"
import {ACCOUNT_URL} from "../../constants/Global";
import {toast} from "react-toastify";
import DappStatus from "../DappStatus/DappStatus";

const theme = createTheme();

export default function Approved(props: any) {

    const [web3Modal, setWeb3Modal] = useState(null)
    const [selected, setSelected] = useState("Overview")
    const [clients, setClients] = useState({})
    const [clientUsers, setClientUsers] = useState({})
    const [showLoadingModal, setShowLoadingModal] = useState(true)
    const [t, setT] = useState(0)

    async function connectWallet() {
        // @ts-ignore
        const provider = await web3Modal.connect();
        if (provider) {
            props.setConnecting(true)
            props.setWeb3(await new Web3(provider))
            props.setProvider(provider)
        }
    }

    const getClients = async () => {
        return new Promise<any>((ok: any) => {
            const requestOptions = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            };
            fetch(ACCOUNT_URL + '/client/all?wallet=' + props.account, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setShowLoadingModal(false)
                    setClients(data.clients)
                    setClientUsers(data.user_clients)
                    ok()
                }).catch((err: any) => {
                console.log(err)
                ok()
            });
        })
    }

    const joinNetwork = async (id: any) => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };
        let status = new Promise(async (ok: any, reject: any) => {
            fetch(ACCOUNT_URL + '/client/join?wallet=' + props.account + "&id=" + id, requestOptions)
                .then(response => response.json())
                .then(async () => {
                    await getClients()
                    ok()
                }).catch((err: any) => {
                console.log(err)
                reject()
                return false
            });
        })
        await toast.promise(
            status,
            {
                success: 'Successfully joined/left client',
                pending: 'Waiting for join/leave confirmation',
                error: 'Failed to join/leave client'
            }
        )
    }

    return (
        <ThemeProvider theme={theme}>
            {/*main*/}
            {/*<AppBar position="fixed" style={{backgroundColor: "#FFFFFF", boxShadow: "none"}}*/}
            {/*        sx={{bottom: 'auto', top: 0}}>*/}
            {/*    <div className={'navigation'}>*/}
            {/*        <div className={"logo-div"}>*/}
            {/*            <div className={"logo"}>*/}
            {/*                <img width={"55px"} src={logo}/>*/}

            {/*            </div>*/}
            {/*            <h2 className={"exposure-title"}>*/}
            {/*                Puffin KYC*/}
            {/*            </h2>*/}
            {/*        </div>*/}

            {/*        <div className={"color-primary"}*/}
            {/*             style={{margin: "auto", color: "black", textAlign: "center", "width": "100%"}}>*/}
            {/*            <Grid container spacing={2}>*/}
            {/*                <Grid item xs={(props.status != "sub" ? 1 : 2)}>*/}
            {/*                </Grid>*/}
            {/*                <Grid item xs={(props.status != "sub" ? 2 : 2)}>*/}
            {/*                    <p style={{cursor: "pointer", color: selected == "Bridge" ? "#E55021" : "black"}}*/}
            {/*                       onClick={() => {*/}
            {/*                           setSelected("Bridge")*/}
            {/*                       }}>*/}
            {/*                        Bridge*/}
            {/*                    </p>*/}
            {/*                </Grid>*/}
            {/*                {props.status != "sub" &&*/}
            {/*                <Grid item xs={2}>*/}
            {/*                  <p style={{cursor: "pointer", color: selected == "Sub-Accounts" ? "#E55021" : "black"}}*/}
            {/*                     onClick={() => {*/}
            {/*                         setSelected("Sub-Accounts")*/}
            {/*                     }}>*/}
            {/*                    Sub-Accounts*/}
            {/*                  </p>*/}
            {/*                </Grid>*/}
            {/*                }*/}
            {/*                <Grid item xs={(props.status != "sub" ? 2 : 2)}>*/}
            {/*                    <p style={{cursor: "pointer", color: selected == "Name Service" ? "#E55021" : "black"}}*/}
            {/*                       onClick={() => {*/}
            {/*                           setSelected("Transactions")*/}
            {/*                       }}>*/}
            {/*                        Transactions*/}
            {/*                    </p>*/}
            {/*                </Grid>*/}
            {/*                <Grid item xs={(props.status != "sub" ? 2 : 2)}>*/}
            {/*                    <p style={{*/}
            {/*                        cursor: "pointer",*/}
            {/*                        color: selected == "Integrate Puffin" ? "#E55021" : "black"*/}
            {/*                    }}*/}
            {/*                       onClick={() => {*/}
            {/*                           setSelected("Integrate Puffin")*/}
            {/*                       }}*/}
            {/*                    >*/}
            {/*                        Integrate Puffin*/}
            {/*                    </p>*/}
            {/*                </Grid>*/}
            {/*                <Grid item xs={(props.status != "sub" ? 2 : 2)}>*/}
            {/*                    <p style={{cursor: "pointer", color: selected == "Settings" ? "#E55021" : "black"}}*/}
            {/*                       onClick={() => {*/}
            {/*                           setSelected("Settings")*/}
            {/*                       }}*/}
            {/*                    >*/}
            {/*                        Settings*/}
            {/*                    </p>*/}
            {/*                </Grid>*/}
            {/*                <Grid item xs={(props.status != "sub" ? 1 : 0)}>*/}
            {/*                </Grid>*/}
            {/*            </Grid>*/}
            {/*        </div>*/}
            {/*        <div style={{marginLeft: "auto", margin: "auto", marginRight: "0"}}>*/}
            {/*            <Button*/}
            {/*                type="submit"*/}
            {/*                fullWidth*/}
            {/*                variant="contained"*/}
            {/*                sx={{mt: 3, mb: 2}}*/}
            {/*                style={{backgroundColor: "#E55021"}}*/}
            {/*                onClick={*/}
            {/*                    () => {*/}
            {/*                        props.disconnect()*/}
            {/*                    }}*/}
            {/*            >*/}
            {/*                Disconnect*/}
            {/*            </Button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</AppBar>*/}

            {/*Geo*/}
            <AppBar position="fixed" style={{backgroundColor: "#FFFFFF", boxShadow: "none"}}
                    sx={{bottom: 'auto', top: 0}}>
                <div className={'navigation'}>
                    <div className={"logo-div"}>
                        <div className={"logo"}>
                            <img width={"55px"} src={logo}/>

                        </div>
                        <h2 className={"exposure-title"}>
                            Puffin KYC
                        </h2>
                    </div>

                    <div className={"color-primary"}
                         style={{margin: "auto", color: "black", textAlign: "center", "width": "100%"}}>
                        <Grid container spacing={2}>
                            {/*<Grid item xs={3}>*/}
                            {/*    <p style={{cursor: "pointer", color: selected == "Map" ? "#E55021" : "black"}}*/}
                            {/*       onClick={() => {*/}
                            {/*           setSelected("Map")*/}
                            {/*       }}>*/}
                            {/*        Map*/}
                            {/*    </p>*/}
                            {/*</Grid>*/}
                            {/*{props.status != "sub" &&*/}
                            {/*<Grid item xs={2}>*/}
                            {/*  <p style={{cursor: "pointer", color: selected == "Sub-Accounts" ? "#E55021" : "black"}}*/}
                            {/*     onClick={() => {*/}
                            {/*         setSelected("Sub-Accounts")*/}
                            {/*     }}>*/}
                            {/*    Sub-Accounts*/}
                            {/*  </p>*/}
                            {/*</Grid>*/}
                            {/*}*/}
                            <Grid item xs={1}/>
                            <Grid item xs={2}>
                                <p style={{cursor: "pointer", color: selected == "Overview" ? "#E55021" : "black"}}
                                   onClick={() => {
                                       setSelected("Overview")
                                   }}>
                                    User Settings
                                </p>
                            </Grid>
                            <Grid item xs={2}>
                                <p style={{cursor: "pointer", color: selected == "Settings" ? "#E55021" : "black"}}
                                   onClick={() => {
                                       setSelected("Settings")
                                   }}
                                >
                                    Developer Settings
                                </p>
                            </Grid>
                            <Grid item xs={2}>
                                <p style={{
                                    cursor: "pointer",
                                    color: selected == "Integrate Puffin" ? "#E55021" : "black"
                                }}
                                   onClick={() => {
                                       setSelected("Integrate Puffin")
                                   }}
                                >
                                    dApp Setup
                                </p>
                            </Grid>
                            <Grid item xs={2}>
                                <p style={{cursor: "pointer", color: selected == "dapp status" ? "#E55021" : "black"}}
                                   onClick={() => {
                                       setSelected("dapp status")
                                   }}
                                >
                                    dApp Status
                                </p>
                            </Grid>
                            <Grid item xs={2}>
                                <p style={{cursor: "pointer", color: selected == "demo dapp" ? "#E55021" : "black"}}
                                   onClick={() => {
                                       setSelected("demo dapp")
                                   }}
                                >
                                    Demo dApp
                                </p>
                            </Grid>
                            <Grid item xs={1}/>
                        </Grid>
                    </div>
                    <div style={{marginLeft: "auto", margin: "auto", marginRight: "0"}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
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
            <Container component="main" maxWidth="xs" style={{paddingTop: "5%"}}>
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    {selected == "Bridge" && <div>
                      <Typography component="h1" variant="h5">
                        Puffin Bridge
                      </Typography>
                      <Bridge account={props.account} balances={props.balances}/>
                      <WrapAvax account={props.account} balances={props.balances}/>
                    </div>
                    }
                    {selected == "demo dapp" && <WrapAvax account={props.account} balances={props.balances}/>}
                    {selected == "Sub-Accounts" && <div>
                      <Typography component="h1" variant="h5">
                        Sub-Accounts
                      </Typography>
                      <SubAccountRequest account={props.account} balances={props.balances}/>
                    </div>
                    }
                    {selected == "dapp status" && <div>
                      <DappStatus/>
                    </div>
                    }
                    {selected == "Overview" && <div>
                      <Overview account={props.account} balances={props.balances} clients={clients}
                                setClients={setClients} showLoadingModal={showLoadingModal}
                                clientUsers={clientUsers} setClientUsers={setClientUsers} getClients={getClients}
                                t={t} setT={setT} joinNetwork={joinNetwork}/>
                    </div>
                    }
                    {selected == "Transactions" && <div>
                      <Typography component="h1" variant="h5">
                        Bridge Transactions
                      </Typography>
                      <Transactions account={props.account} balances={props.balances} name={props.name}/>
                    </div>}
                    {selected == "Integrate Puffin" && <div>
                      <SubnetSetup account={props.account} balances={props.balances} name={props.name}/>
                    </div>}
                    {selected == "Settings" && <div>
                      <Settings account={props.account} balances={props.balances} name={props.name}/>
                    </div>}
                    {selected == "Map" && <div>
                      <Map account={props.account} balances={props.balances} name={props.name}/>
                    </div>}
                    <div style={{margin: "2.5%"}}/>
                    {selected != "Integrate Puffin" && selected != "Settings" && selected != "Transactions" &&
                    <div>
                        {/*{props.account}*/}
                        {/*<Grid container spacing={2}>*/}
                        {/*    <Grid item xs={6}>*/}
                        {/*        <Button*/}
                        {/*            type="submit"*/}
                        {/*            fullWidth*/}
                        {/*            variant="contained"*/}
                        {/*            sx={{mt: 3, mb: 2}}*/}
                        {/*            style={{backgroundColor: "#E55021"}}*/}
                        {/*            onClick={() => AddNetwork("pfn")}*/}
                        {/*        >*/}
                        {/*            Connect to PFN*/}
                        {/*        </Button>*/}
                        {/*    </Grid>*/}
                        {/*    <Grid item xs={6}>*/}
                        {/*        <Button*/}
                        {/*            type="submit"*/}
                        {/*            fullWidth*/}
                        {/*            variant="contained"*/}
                        {/*            sx={{mt: 3, mb: 2}}*/}
                        {/*            style={{backgroundColor: "#E55021"}}*/}
                        {/*            onClick={() => AddNetwork("fuji")}*/}
                        {/*        >*/}
                        {/*            Connect to Fuji*/}
                        {/*        </Button>*/}
                        {/*    </Grid>*/}
                        {/*</Grid>*/}
                    </div>}

                </Box>
            </Container>
        </ThemeProvider>
    );
}
