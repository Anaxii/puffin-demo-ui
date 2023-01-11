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

const theme = createTheme();

export default function Settings(props: any) {
    const [subAccounts, setSubAccounts]: any = useState({})
    const [_type, _setType] = useState("developer")
    const [clientInfo, setClientInfo] = useState({})
    const [kyc, setKYC] = useState(false)
    const [geo, setGeo] = useState(false)
    useEffect(() => {
        let _subAccounts = localStorage.getItem("subs")
        if (_subAccounts)
            setSubAccounts(JSON.parse(_subAccounts))
    }, [])

    const getClients = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };
        fetch(CLIENT_URL + '/client?id=1', requestOptions)
            .then(response => response.json())
            .then(data => {
                setClientInfo(data)
                for (let i = 0; i < data.package_options.length; i ++) {
                    if (data.package_options[i] == "kyc")
                        setKYC(true)
                    if (data.package_options[i] == "geo_block")
                        setGeo(true)
                }
            }).catch((err: any) => {
            console.log(err)
            return false
        });
    }

    useEffect(() => {
            getClients()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Typography component="h1" variant="h5">
                Developer Settings
            </Typography>
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
                Subnet Info
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
            </div>
            }

        </ThemeProvider>
    );
}
