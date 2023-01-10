import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {useState} from "react";

export default function SubnetInfo(props: any) {
    const [subnetType, setSubnetType] = useState("evm")

    const setValue = (e: any) => {
        e.preventDefault()
        props.updateClientInfo(e.target.id, e.target.value)
    }

    return (
        <div>
            <Typography component="h1" variant="h5">
                Subnet Info
            </Typography>
            <Box component="form" sx={{mt: 3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="project_name"
                            onChange={setValue}
                            label="Subnet Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="rpc_url"
                            label="RPC URL"
                            onChange={setValue}
                            name="lastName"
                            autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="ws_url"
                            label="Websocket URL"
                            onChange={setValue}
                            name="lastName"
                            autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="gas_token_symbol"
                            label="Gas Token Symbol"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            id="chain_id"
                            label="Chain ID"
                            onChange={setValue}
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            disabled
                            value={subnetType}
                            onChange={setValue}
                            id="vm"
                            label="VM Name"
                            name="address"
                        />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
