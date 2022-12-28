import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Web3Context} from "../../helpers/context";
import PFNNameService from "../../abi/PFNNameService.json";
import {AddNetwork} from "../../util/AddNetwork";

const theme = createTheme();

export default function NameService(props: any) {
    const web3Context: any = useContext(Web3Context);
    const [name, setName] = useState("")

    const changeName = async (_name: any) => {
        let nameArray = _name.split(".")
        nameArray.pop()

        let namesId: any
        let subNameId: any

        let newStatus: any
        if (nameArray.length == 1) {
            web3Context.domains.map((item: any) => {
                if (item?.domainName == _name) {
                    namesId = item?.domainId
                    return
                }
            })
            if (!namesId) {
                toast.error("Invalid name")
                return
            }
            newStatus = new Promise(async (ok: any, reject: any) => {
                let nameContract = new web3Context.web3.eth.Contract(PFNNameService, "0x1374ECB08beA236BBED4337c02ef6788aB0e2216");
                await nameContract.methods.setPrimaryAsDomain(namesId).send({from: props.account}).then(() => {
                    web3Context.updateBalances()
                    ok()
                }).catch((err: any) => reject(err))
            })
        } else if (nameArray.length == 2) {
            web3Context.domains.map((item: any) => {
                if (item?.domainName == nameArray[1] + ".pfn") {
                    namesId = item?.domainId
                    item?.subaccounts.map((sub: any) => {
                        if (sub.name == _name) {
                            subNameId = sub.subId
                            return
                        }
                    })
                    return
                }
            })
            newStatus = new Promise(async (ok: any, reject: any) => {
                let nameContract = new web3Context.web3.eth.Contract(PFNNameService, "0x1374ECB08beA236BBED4337c02ef6788aB0e2216");
                await nameContract.methods.setPrimaryAsSubdomain(namesId, subNameId).send({from: props.account}).then(() => {
                    web3Context.updateBalances()
                    ok()
                }).catch((err: any) => reject(err))
            })
        }
        await toast.promise(
            newStatus,
            {
                success: 'Transaction Successful',
                pending: 'Transaction pending',
                error: 'Transaction failed'
            }
        )
    };

    async function newName(_type: string) {
        await AddNetwork("pfn")
        let nameArray = name.split(".")
        let names: any = {}
        let namesId: any = {}
        let isSubaccount = false

        web3Context.domains.map((item: any) => {
            names[item?.domainName] = true
            namesId[item?.domainName] = item?.domainId
        })
        if (nameArray.length > 1) {
            if (nameArray[nameArray.length] == "pfn") {
                nameArray.pop()
            }
            if (nameArray.length > 2) {
                toast.error("Too many names")
                console.log(name)
                return
            }
            if (nameArray.length == 2) {
                if (!names[nameArray[1] + ".pfn"]) {
                    toast.error("Invalid primary name")
                    console.log(name)
                    return
                }
                isSubaccount = true
            }
        }

        let newStatus
        if (isSubaccount) {
            newStatus = new Promise(async (ok: any, reject: any) => {
                let nameContract = new web3Context.web3.eth.Contract(PFNNameService, "0x1374ECB08beA236BBED4337c02ef6788aB0e2216");
                await nameContract.methods.createSubDomain(namesId[nameArray[1] + ".pfn"], nameArray[0]).send({from: props.account}).then(() => {
                    web3Context.updateBalances()
                    ok()
                }).catch((err: any) => reject(err))
            })
        } else {
            newStatus = new Promise(async (ok: any, reject: any) => {
                let nameContract = new web3Context.web3.eth.Contract(PFNNameService, "0x1374ECB08beA236BBED4337c02ef6788aB0e2216");
                await nameContract.methods.createDomain(name, 12).send({from: props.account}).then(() => {
                    web3Context.updateBalances()
                    ok()
                }).catch((err: any) => reject(err))
            })
        }


        await toast.promise(
            newStatus,
            {
                success: 'Transaction Successful',
                pending: 'Transaction pending',
                error: 'Transaction failed'
            }
        )

    }

    async function handleNewName(event: any) {
        event.preventDefault()
        setName(event.target.value)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box component="form" sx={{mt: 3}}>
                <p>
                    PFN Name Service
                </p>
                <p>{props.name && "Current Name: " + props.name}</p>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            label={name ? name : "New Name"}
                            id="new_name"
                            onChange={handleNewName}
                        />
                    </Grid>
                    <Grid item xs={4} style={{paddingBottom: "2rem"}}>
                        <Box textAlign='center'>
                            <a onClick={() => {
                                newName(name)
                            }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    id={"new_name_button"}
                                    sx={{mt: 1, mb: 1}}
                                    style={{backgroundColor: "#E55021"}}
                                >
                                    Create
                                </Button>
                            </a>
                        </Box>
                    </Grid>

                    {web3Context.domains.map((item: any, index: any) => {
                        return (
                            <Grid container spacing={0}>
                                <Grid item xs={8}>
                                    <p id={"domain_name_" + item?.domainName}>
                                        {item?.domainName || ""}
                                    </p>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box textAlign='center'>

                                        <Button
                                            fullWidth
                                            variant="contained"
                                            id={"set_domain_to_" + item?.domainName}
                                            sx={{mt: 1, mb: 1}}
                                            style={{backgroundColor: "#E55021"}}
                                            onClick={() => {
                                                changeName(item?.domainName)
                                            }}
                                        >
                                            Set
                                        </Button>
                                    </Box>
                                </Grid>
                                {item.subaccounts.map((subaccount: any) => {
                                    return (
                                        <Grid container spacing={0}>
                                            <Grid item xs={8}>
                                                <p id={"subaccount_name_" + subaccount?.name}>
                                                    {subaccount?.name || ""}
                                                </p>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Box textAlign='center'>

                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        id={"set_subaccount_name_" + subaccount?.name}
                                                        sx={{mt: 1, mb: 1}}
                                                        style={{backgroundColor: "#E55021"}}
                                                        onClick={() => {
                                                            changeName(subaccount?.name)
                                                        }}
                                                    >
                                                        Set
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </ThemeProvider>
    );
}
