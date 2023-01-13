import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { parse } from 'url';
import 'react-toastify/dist/ReactToastify.css';
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import {CLIENT_URL, KYC_URL} from "../../../constants/Global";
import {toast} from "react-toastify";

export default function Verify(props: any) {
    const setContract = (e: any) => {
        e.preventDefault()
        if (e.target.id == "puffin_kyc_address") {
            if (props.geo) {
                props.updateClientInfo("puffin_geo_address", e.target.value)
            } else {
                props.updateClientInfo(e.target.id, e.target.value)
            }
        } else {
            props.updateClientInfo(e.target.id, e.target.value)
        }
    }

    return (
        <div style={{width: "100%"}}>
            <Typography component="h1" variant="h5">
                Verify Your Information
            </Typography>
            <Box component="form" sx={{mt: 3}}>
                <Grid container spacing={2}>
                    {/*<Grid item xs={12}>*/}
                    {/*    <TextField*/}
                    {/*        autoComplete="given-name"*/}
                    {/*        name="firstName"*/}
                    {/*        required*/}
                    {/*        fullWidth*/}
                    {/*        id="puffin_kyc_address"*/}
                    {/*        label="PuffinUsers Contract Address"*/}
                    {/*        autoFocus*/}
                    {/*        onChange={setContract}*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={12}>*/}
                    {/*    <TextField*/}
                    {/*        autoComplete="given-name"*/}
                    {/*        name="firstName"*/}
                    {/*        required*/}
                    {/*        fullWidth*/}
                    {/*        id="puffin_client_address"*/}
                    {/*        label="PuffinClient Contract Address"*/}
                    {/*        autoFocus*/}
                    {/*        onChange={setContract}*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    <Grid item xs={3}>
                        <p style={{textAlign: "left", margin: 0}}>
                            Chain ID:
                        </p>
                    </Grid>
                    <Grid item xs={9}>
                        <p style={{textAlign: "right", margin: 0}}>
                            {43113}
                        </p>
                    </Grid>
                    <Grid item xs={4}>
                        <p style={{textAlign: "left", margin: 0}}>
                            VM:
                        </p>
                    </Grid>
                    <Grid item xs={8}>
                        <p style={{textAlign: "right", margin: 0}}>
                            EVM
                        </p>
                    </Grid>
                    <Grid item xs={4}>
                        <p style={{textAlign: "left", margin: 0}}>
                            Package:
                        </p>
                    </Grid>
                    <Grid item xs={8}>
                        <p style={{textAlign: "right", margin: 0}}>
                            Flex
                        </p>
                    </Grid>
                    <Grid style={{margin: "auto"}} item xs={1}>
                        <Checkbox checked={props.bridge} disabled/>
                    </Grid>
                    <Grid item xs={5}>
                        <p>
                            Bridge
                        </p>
                    </Grid>
                    <Grid style={{margin: "auto"}} item xs={1}>
                        <Checkbox checked={props.geo} disabled/>
                    </Grid>
                    <Grid item xs={5}>
                        <p>
                            Geo Block
                        </p>
                    </Grid>
                    <Grid style={{margin: "auto"}} item xs={1}>
                        <Checkbox checked={props.aml} disabled/>
                    </Grid>
                    <Grid item xs={5}>
                        <p>
                            AML Tracking
                        </p>
                    </Grid>
                    <Grid style={{margin: "auto"}} item xs={1}>
                        <Checkbox checked={props.kyc} disabled/>
                    </Grid>
                    <Grid item xs={5}>
                        <p>
                            KYC/KYB
                        </p>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

