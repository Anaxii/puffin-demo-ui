import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Checkbox from '@mui/material/Checkbox';

export default function SelectFeatures(props: any) {

    const setUsers = (e: any) => {
        e.preventDefault()
        props.updateClientInfo(e.target.id, e.target.value)
    }

    return (
        <div style={{width: "100%"}}>
            <Typography component="h1" variant="h5">
                Select Features
            </Typography>
            <p>Package: {props.bridge && props.geo && props.aml && props.kyc ? "Full Package" : "Flex Package"}</p>
            <Box component="form" sx={{mt: 3}}>
                <Grid container spacing={2}>
                    <Grid style={{margin: "auto"}} item xs={1}>
                        <Checkbox checked={props.bridge} disabled onClick={() => {
                            props.setBridge(!props.bridge)
                        }}/>
                    </Grid>
                    <Grid item xs={5}>
                        <p>
                            Bridge
                        </p>
                    </Grid>
                    <Grid style={{margin: "auto"}} item xs={1}>
                        <Checkbox checked={props.geo} onClick={() => {
                            props.setGeo(!props.geo)
                        }}/>
                    </Grid>
                    <Grid item xs={5}>
                        <p>
                            Geo Block
                        </p>
                    </Grid>
                    <Grid style={{margin: "auto"}} item xs={1}>
                        <Checkbox checked={props.aml} disabled onClick={() => {
                            props.setAML(!props.aml)
                        }}/>
                    </Grid>
                    <Grid item xs={5}>
                        <p>
                            AML Tracking
                        </p>
                    </Grid>
                    <Grid style={{margin: "auto"}} item xs={1}>
                        <Checkbox checked={props.kyc} onClick={() => {
                            props.setKYC(!props.kyc)
                        }}/>
                    </Grid>
                    <Grid item xs={5}>
                        <p>
                            KYC/KYB
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            onChange={setUsers}
                            id="max_users"
                            label="Max Number of Users"
                            name="address"
                        />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
