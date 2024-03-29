import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useContext, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import {ACCOUNT_URL, CLIENT_URL} from "../../constants/Global";
import {GetClientInfo} from "../../helpers/Client";
import Web3 from "web3";
import TextField from "@mui/material/TextField";

const theme = createTheme();

export default function Settings(props: any) {
    const [_type, _setType] = useState("developer")
    const [clientInfo, setClientInfo] = useState({})
    const [kyc, setKYC] = useState(false)
    const [geo, setGeo] = useState(false)
    const [period, setPeriod] = useState(0)
    const [users, setUsers] = useState(0)
    const [cost, setCost] = useState(0)
    const [paymentToken, setPaymentToken] = useState("")
    const [blockedCountries, setBlockedCountries] = useState({})
    const [isCurrent, setIsCurrent] = useState(false)
    const [id, setId] = useState("0")

    const getClients = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };
        fetch(CLIENT_URL + '/client?id=' + id, requestOptions)
            .then(response => response.json())
            .then(async data => {
                console.log(data)
                setClientInfo(data)
                if (data.blocked_countries)
                    setBlockedCountries(data.blocked_countries)
                for (let i = 0; i < data.package_options.length; i ++) {
                    if (data.package_options[i] == "kyc")
                        setKYC(true)
                    if (data.package_options[i] == "geo_block")
                        setGeo(true)
                }

                let info: any
                if (data.puffin_geo_address) {
                    info = await GetClientInfo(data.puffin_client_address, data.puffin_geo_address, data.rpc_url)
                } else {
                    info = await GetClientInfo(data.puffin_client_address, data.puffin_kyc_address, data.rpc_url)
                }

                if (info) {
                    setPaymentToken(info.paymentToken)
                    setUsers(info.users)
                    setPeriod(info.epoch)
                    setIsCurrent(info.isCurrent)
                }
            }).catch((err: any) => {
            return false
        });
    }

    const handleChange = (e: any) => {
        setId(e.target.value)
    }

    // useEffect(() => {
    //         getClients()
    // }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Typography component="h1" variant="h5">
                Developer Settings
            </Typography>
            <div style={{width: "300px", margin: "auto", marginTop: "25px", fontSize: "12px"}}>
                <Grid container spacing={2} style={{paddingBottom: "5px"}}>
                    <Grid item xs={7}>
                        <TextField
                            name="firstName"
                            required
                            fullWidth
                            id="uuid"
                            label="Client UUID"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{mt: 1, mb: 1}}
                            style={{backgroundColor: "#E55021"}}
                            onClick={() => {getClients()}}
                        >
                            Get Info
                        </Button>
                    </Grid>
                </Grid>
            </div>

            {/*<Grid container spacing={2}>*/}
            {/*    <Grid item xs={6}>*/}
            {/*        <Button*/}
            {/*            type="submit"*/}
            {/*            fullWidth*/}
            {/*            variant="contained"*/}
            {/*            sx={{mt: 3, mb: 2}}*/}
            {/*            style={{backgroundColor: "#01001A"}}*/}
            {/*            onClick={() => {*/}
            {/*                _setType("user")*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            User*/}
            {/*        </Button>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={6}>*/}
            {/*        <Button*/}
            {/*            type="submit"*/}
            {/*            fullWidth*/}
            {/*            variant="contained"*/}
            {/*            sx={{mt: 3, mb: 2}}*/}
            {/*            style={{backgroundColor: "#01001A"}}*/}
            {/*            onClick={() => {*/}
            {/*                _setType("developer")*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            Developer*/}
            {/*        </Button>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
            {/*{_type == "user" &&*/}
            {/*<div>*/}
            {/*  <Typography component="h1" variant="h5" textAlign={"left"} marginTop={"2em"} >*/}
            {/*    Account Info*/}
            {/*  </Typography>*/}
            {/*  <Box component="form" width={"396px"} sx={{mt: 3}}>*/}
            {/*    <Grid container spacing={2}>*/}
            {/*      <Grid item xs={6}>*/}
            {/*        <p style={{textAlign: "left", margin: 0}}>*/}
            {/*          Geo Location Tier:*/}
            {/*        </p>*/}
            {/*      </Grid>*/}
            {/*      <Grid item xs={6}>*/}
            {/*        <p style={{textAlign: "right", margin: 0}}>*/}
            {/*          0*/}
            {/*        </p>*/}
            {/*      </Grid>*/}
            {/*    </Grid>*/}
            {/*    <Typography component="h3" variant="h5" textAlign={"left"} marginTop={"2em"}>*/}
            {/*      Sub Accounts*/}
            {/*    </Typography>*/}
            {/*      {Object.keys(subAccounts).map((key: any, value: any) => {*/}
            {/*          return (*/}
            {/*              <div>*/}
            {/*                  <Grid container spacing={2}>*/}
            {/*                      <Grid item xs={6}>*/}
            {/*                          <p style={{textAlign: "left", marginBottom: 0}}>*/}
            {/*                              {key}:*/}
            {/*                          </p>*/}
            {/*                      </Grid>*/}
            {/*                      <Grid item xs={6}>*/}
            {/*                          <p style={{textAlign: "right", marginBottom: 0}}>*/}
            {/*                              {subAccounts[key].slice(0, 15)}...*/}
            {/*                          </p>*/}
            {/*                      </Grid>*/}
            {/*                  </Grid>*/}
            {/*              </div>*/}
            {/*          )*/}
            {/*      })}*/}
            {/*  </Box>*/}
            {/*  <Typography component="h1" variant="h5" textAlign={"left"} marginTop={"2em"}>*/}
            {/*    Connected Subnets*/}
            {/*  </Typography>*/}
            {/*  <Box component="form" width={"396px"} sx={{mt: 3}}>*/}
            {/*    <Grid container spacing={2}>*/}
            {/*      <Grid item xs={6}>*/}
            {/*        <p style={{textAlign: "left", margin: 0}}>*/}
            {/*          Puffin:*/}
            {/*        </p>*/}
            {/*      </Grid>*/}
            {/*      <Grid item xs={6}>*/}
            {/*        <p style={{textAlign: "right", margin: 0}}>*/}
            {/*          Connected*/}
            {/*        </p>*/}
            {/*      </Grid>*/}
            {/*      <Grid item xs={6}>*/}
            {/*        <p style={{textAlign: "left", margin: 0}}>*/}
            {/*          Dexalot:*/}
            {/*        </p>*/}
            {/*      </Grid>*/}
            {/*      <Grid item xs={6}>*/}
            {/*        <p style={{textAlign: "right", margin: 0}}>*/}
            {/*          Connected*/}
            {/*        </p>*/}
            {/*      </Grid>*/}
            {/*    </Grid>*/}
            {/*  </Box>*/}
            {/*</div>*/}
            {/*}*/}
            {_type == "developer" &&
            <div>

              <Typography component="h1" variant="h5" textAlign={"left"} marginTop={"2em"} >
                dApp Settings
              </Typography>
              <Box component="form" width={"600px"} sx={{mt: 3}}>
                  {Object.keys(clientInfo).map((i: any, v: any) => {
                      // @ts-ignore
                      let c = clientInfo[i]
                      if (typeof c == "object") {
                          return
                      }
                      let l = i.replace(/_/g, " ").replace(/\b\w/g, (l: any) => l.toUpperCase())

                      if (c.length > 15)
                          c = c.slice(0, 15) + "..."

                      return (
                          <Grid container spacing={2} style={{paddingBottom: "5px"}}>
                              <Grid item xs={6}>
                                  <p style={{textAlign: "left", margin: 0}}>
                                      {l}:
                                  </p>
                              </Grid>
                              <Grid item xs={6}>
                                  <p style={{textAlign: "right", margin: 0}}>
                                      {c}
                                  </p>
                              </Grid>
                          </Grid>
                      )
                  })}
                  {Object.keys(blockedCountries).length > 0 && <div>
                    <Typography component="h1" variant="h5" textAlign={"left"} marginTop={"2em"} >
                      Blocked Countries
                    </Typography>
                    <div style={{marginTop: "20px"}}/>
                  </div>
                  }

                  {Object.keys(blockedCountries).map((i: any, v: any) => {
                      for (const i in blockedCountries) {
                          let countries: any
                          try {
                              // @ts-ignore
                              if (blockedCountries[i].length > 0) {
                                  // @ts-ignore
                                  countries = blockedCountries[i].toString()
                              }
                          } catch {
                              return <div></div>
                          }
                          return (
                              <Grid container spacing={2} style={{paddingBottom: "5px"}}>
                                  <Grid item xs={2}>
                                      <p style={{textAlign: "left", margin: 0}}>
                                          Tier {i}:
                                      </p>
                                  </Grid>
                                  <Grid item xs={10}>
                                      <p style={{textAlign: "right", margin: 0}}>
                                          {countries}
                                      </p>
                                  </Grid>
                              </Grid>
                          )
                      }


                  })}
                <Grid container spacing={2} style={{paddingTop: "25px"}}>

                  <Grid style={{margin: "auto"}} item xs={1}>
                    <Checkbox checked={false} disabled/>
                  </Grid>
                  <Grid item xs={5}>
                    <p>
                      Bridge
                    </p>
                  </Grid>
                  <Grid style={{margin: "auto"}} item xs={1}>
                    <Checkbox checked={geo} disabled/>
                  </Grid>
                  <Grid item xs={5}>
                    <p>
                      Geo Block
                    </p>
                  </Grid>
                  <Grid style={{margin: "auto"}} item xs={1}>
                    <Checkbox checked={false} disabled/>
                  </Grid>
                  <Grid item xs={5}>
                    <p>
                      AML Tracking
                    </p>
                  </Grid>
                  <Grid style={{margin: "auto"}} item xs={1}>
                    <Checkbox checked={kyc} disabled/>
                  </Grid>
                  <Grid item xs={5}>
                    <p>
                      KYC/KYB
                    </p>
                  </Grid>
                </Grid>

              </Box>
              <Typography component="h1" variant="h5" textAlign={"left"} marginTop={"2em"} >
                On-Chain Data
              </Typography>
              <Grid container spacing={2} style={{paddingBottom: "30px", paddingTop: "20px"}}>
                <Grid item xs={6} >
                  <p style={{textAlign: "left", margin: 0}}>
                      Payment Period:
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <p style={{textAlign: "right", margin: 0}}>
                      {period}
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <p style={{textAlign: "left", margin: 0}}>
                    Users:
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <p style={{textAlign: "right", margin: 0}}>
                      {users}
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <p style={{textAlign: "left", margin: 0}}>
                    Cost Per User:
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <p style={{textAlign: "right", margin: 0}}>
                      ${Web3.utils.fromWei(cost.toString(), 'ether')}
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <p style={{textAlign: "left", margin: 0}}>
                    Is Current:
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <p style={{textAlign: "right", margin: 0}}>
                      {isCurrent.toString()}
                  </p>
                </Grid>
              </Grid>
            </div>
            }

        </ThemeProvider>
    );
}
