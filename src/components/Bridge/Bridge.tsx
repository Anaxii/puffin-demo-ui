import * as React from 'react';
import {toast} from "react-toastify";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import ERC20 from "../../abi/IERC20.json"
import BrideABI from "../../abi/PuffinMainnetBridge.json"
import SubnetBrideABI from "../../abi/PuffinSubnetBridge.json"

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useContext, useEffect, useState} from "react";
import Web3 from "web3";
import TextField from "@mui/material/TextField";
import {AddNetwork} from "../../util/AddNetwork";
import {Web3Context} from "../../helpers/context";

const theme = createTheme();


export default function Bridge(props: any) {
    const web3Context: any = useContext(Web3Context);

    const [web3Modal, setWeb3Modal] = useState(null)
    const [tokenA, setTokenA] = useState('WAVAX (fuji)')
    const [tokenB, setTokenB] = useState('WAVAX (PFN)')
    const [amount, setAmount] = useState('0')
    const [buttonMessage, setButtonMessage] = useState('Bridge')

    const handleSubmit = async () => {
        let allowances = await web3Context.GetAllowance(props.account)

        if (tokenA == 'WAVAX (fuji)') {
            await AddNetwork("fuji")
        } else {
            await AddNetwork("pfn")
        }

        let weiValue = Web3.utils.toWei(amount, 'ether');
        if (BigInt(weiValue) > props.balances.avax) {
            weiValue = (props.balances.avax - BigInt(Web3.utils.toWei(0.01.toString(), 'ether'))).toString()
        }

        let network = ""
        let allowance = BigInt(0)

        if (tokenA == 'WAVAX (fuji)') {
            network = "fuji"
            allowance = BigInt(allowances.fuji_wavax)
        } else {
            network = "pfn"
            allowance = BigInt(allowances.pfn_wavax)
        }

        let contractAddress = network == "fuji" ? "0x1D308089a2D1Ced3f1Ce36B1FcaF815b07217be3" : "0xa61E9ed5E29850a1DCfD357a466D49E1E8eB5fB7"
        let bridgeAddress = network == "fuji" ? "0x40dA58598877009868B9B876f52d31a0C204FC63" : "0xd3E11DeF6d34E231ab410e5aA187e1f2d9fF19E1"

        if (allowance < BigInt(weiValue))
            await approve()


        async function approve() {
            let checkStatus = new Promise(async (ok: any, reject: any) => {


                let wavaxContract = new web3Context.web3.eth.Contract(ERC20, contractAddress);
                await wavaxContract.methods.approve(bridgeAddress, weiValue).send({from: props.account}).then(() => {
                    web3Context.updateBalances()
                    ok()
                }).catch(() => reject())
            })

            await toast.promise(
                checkStatus,
                {
                    success: 'Transaction Successful',
                    pending: 'Transaction pending, another transaction will appear after',
                    error: 'Transaction failed'
                }
            )
        }

        let checkStatus = new Promise(async (ok: any, reject: any) => {


            if (tokenA == 'WAVAX (fuji)') {
                let wavaxContract = new web3Context.web3.eth.Contract(BrideABI, bridgeAddress);
                await wavaxContract.methods.bridgeIn(weiValue, contractAddress).send({from: props.account}).then(() => {
                    web3Context.updateBalances()
                    ok()
                }).catch((err: any) => {
                    console.log(err)
                    reject()
                })
            } else {
                let wavaxContract = new web3Context.web3.eth.Contract(SubnetBrideABI, bridgeAddress);
                await wavaxContract.methods.bridgeIn(weiValue, contractAddress, 43113).send({from: props.account}).then(() => {
                    web3Context.updateBalances()
                    ok()
                }).catch((err: any) => {
                    console.log(err)
                    reject()
                })
            }

        })

        await toast.promise(
            checkStatus,
            {
                success: 'Allow up to 5 minutes for bridge request to fulfill',
                pending: 'Transaction pending',
                error: 'Transaction failed'
            }
        )


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
        } else if (event.target.name == "amount") {
            setAmount(event.target.value.toString())
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
            <CssBaseline/>
            <p style={{marginTop: "5%"}}>
                Bridge AVAX
            </p>
            <Grid container spacing={2}>
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
                        onChange={handleChange}
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
                {buttonMessage}
            </Button>
            <Button
                fullWidth
                variant="contained"
                style={{backgroundColor: "#01001A"}}
                href={"https://faucet.avax.network/"}
                target={"_blank"}
            >
                Fuji Faucet
            </Button>

        </ThemeProvider>
    );
}
