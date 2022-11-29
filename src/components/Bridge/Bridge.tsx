import * as React from 'react';
import {toast} from "react-toastify";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from "react";
import Web3 from "web3";
import TextField from "@mui/material/TextField";
const theme = createTheme();



export default function Bridge(props: any) {

    const [web3Modal, setWeb3Modal] = useState(null)
    const [tokenA, setTokenA] = useState('WAVAX (fuji)')
    const [tokenB, setTokenB] = useState('WAVAX (PFN)')

    const handleSubmit = async () => {
        console.log("test")


    };

    const handleChange = async (event: any) => {
        event.preventDefault();
        if (event.target.name == "tokenA") {
            if (event.target.value == 'WAVAX (fuji)') {
                setTokenA('WAVAX (fuji)')
                setTokenB('WAVAX (PFN)')
            }
            if (event.target.value == 'WAVAX (PFN)') {
                setTokenB('WAVAX (fuji)')
                setTokenA('WAVAX (PFN)')
            }
        } else if (event.target.name == "tokenB") {
            if (event.target.value == 'WAVAX (fuji)') {
                setTokenB('WAVAX (fuji)')
                setTokenA('WAVAX (PFN)')
            }
            if (event.target.value == 'WAVAX (PFN)') {
                setTokenA('WAVAX (fuji)')
                setTokenB('WAVAX (PFN)')
            }
        }


    };

    useEffect(() => {
        // @ts-ignore
    }, [web3Modal])

    async function connectWallet() {
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
                <CssBaseline />
                {/*<Box*/}
                {/*    sx={{*/}
                {/*        marginTop: 8,*/}
                {/*        display: 'flex',*/}
                {/*        flexDirection: 'column',*/}
                {/*        alignItems: 'center',*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>*/}
                        <Grid style={{marginTop: "5%"}} container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Token In</InputLabel>
                                    <Select
                                        labelId="tokenA"
                                        id="tokenA"
                                        name={"tokenA"}
                                        value={tokenA}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"WAVAX (fuji)"}>WAVAX (fuji)</MenuItem>
                                        <MenuItem value={"WAVAX (PFN)"}>WAVAX (PFN)</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Token Out</InputLabel>
                                    <Select
                                        labelId="tokenB"
                                        name={"tokenB"}
                                        id="tokenB"
                                        value={tokenB}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"WAVAX (fuji)"}>WAVAX (fuji)</MenuItem>
                                        <MenuItem value={"WAVAX (PFN)"}>WAVAX (PFN)</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="amount"
                                    fullWidth
                                    id="amount"
                                    label="Amount"
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
                            onClick={() => {
                                handleSubmit()
                            }}
                        >
                            Bridge
                        </Button>

                    {/*</Box>*/}
                {/*</Box>*/}
        </ThemeProvider>
    );
}
