import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {useState} from "react";

export default function SubnetInfo(props: any) {
    const [subnetType, setSubnetType] = useState("Subnet-EVM")

    const setValue = (e: any) => {
        e.preventDefault()
        console.log(e.target.id)
        if (e.target.id == "name") {
            props.setName(e.target.value)
        } else if (e.target.id == "chain") {
            props.setChainId(e.target.value)
        } else {
            props.setRpcURL(e.target.value)
        }
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
                            id="name"
                            onChange={setValue}
                            label="Subnet Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="rpc"
                            label="RPC URL"
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
                            id="firstName"
                            label="Gas Token Symbol"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="Gas Token Decimals"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            id="chain"
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
                            id="address"
                            label="VM Name"
                            name="address"
                        />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
