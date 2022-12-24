import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { parse } from 'url';
import 'react-toastify/dist/ReactToastify.css';
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

export default function Verify(props: any) {
    return (
        <div style={{width: "100%"}}>
            <Typography component="h1" variant="h5">
                Verify Your Information
            </Typography>
            <Box component="form" sx={{mt: 3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="PuffinKYC Contract Address"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <p style={{textAlign: "left", margin: 0}}>
                            Chain ID:
                        </p>
                    </Grid>
                    <Grid item xs={9}>
                        <p style={{textAlign: "right", margin: 0}}>
                            {props.chainId}
                        </p>
                    </Grid>
                    <Grid item xs={3}>
                        <p style={{textAlign: "left", margin: 0}}>
                            RPC URL:
                        </p>
                    </Grid>
                    <Grid item xs={9}>
                        <p style={{textAlign: "right", margin: 0}}>
                            ...{parse(props.rpcURL).pathname?.slice(0, 15)}...
                        </p>
                    </Grid>
                    <Grid item xs={4}>
                        <p style={{textAlign: "left", margin: 0}}>
                            Subnet Name:
                        </p>
                    </Grid>
                    <Grid item xs={8}>
                        <p style={{textAlign: "right", margin: 0}}>
                            {props.name}
                        </p>
                    </Grid>
                    <Grid item xs={4}>
                        <p style={{textAlign: "left", margin: 0}}>
                            VM:
                        </p>
                    </Grid>
                    <Grid item xs={8}>
                        <p style={{textAlign: "right", margin: 0}}>
                            Subnet-EVM
                        </p>
                    </Grid>
                    <Grid item xs={4}>
                        <p style={{textAlign: "left", margin: 0}}>
                            # of Users:
                        </p>
                    </Grid>
                    <Grid item xs={8}>
                        <p style={{textAlign: "right", margin: 0}}>
                            {props.users == "" ? 0 : Number(props.users).toLocaleString()}
                        </p>
                    </Grid>
                    <Grid item xs={4}>
                        <p style={{textAlign: "left", margin: 0}}>
                            Package:
                        </p>
                    </Grid>
                    <Grid item xs={8}>
                        <p style={{textAlign: "right", margin: 0}}>
                            {props.level}
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
