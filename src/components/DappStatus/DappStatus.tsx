import React, {useContext, useEffect, useState} from "react";
import {ACCOUNT_URL, CLIENT_URL, KYC_URL} from "../../constants/Global";
import Grid from "@mui/material/Grid";
import {AddNetwork} from "../../util/AddNetwork";
import Button from "@mui/material/Button";
import {toast} from "react-toastify";
import Typography from "@mui/material/Typography";
import LoadingModal from "../LoadingModal/LoadingModal";
import {InfinitySpin} from "react-loader-spinner";
import {Web3Context} from "../../helpers/context";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

export default function DappStatus(props: any){

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let id = data.get('firstName')

        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };
            fetch(CLIENT_URL + '/client/status?id=' + id, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status)
                        alert(data.status)
                }).catch((err: any) => {
                return false
            });
    };
    return (
        <div>
            <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="dApp Status ID"
                            autoFocus
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
                    Get dApp Status
                </Button>
            </Box>
        </div>
    );
}

