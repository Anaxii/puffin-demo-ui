import * as React from "react";
import Typography from "@mui/material/Typography";
import {useContext, useState} from "react";
import useCollapse from "react-collapsed";
import Button from "@mui/material/Button";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TextField from "@mui/material/TextField";
import {AddNetwork} from "../../../util/AddNetwork";
import Factory from "../../../abi/PuffinFactory.json";
import Users from "../../../abi/PuffinUsers.json";
import Clients from "../../../abi/PuffinClient.json";

import {Web3Context} from "../../../helpers/context";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function Deploy(props: any) {
    const web3Context: any = useContext(Web3Context);
    const [users, setUsers] = useState("")
    const [client, setClient] = useState("")

    const {getCollapseProps, getToggleProps} = useCollapse({isExpanded: props.isExpanded})

    async function deployContract(_type: string) {
        await AddNetwork("fuji")

        let newStatus = new Promise(async (ok: any, reject: any) => {
            let nameContract = new web3Context.web3.eth.Contract(Factory, "0x2E7Aec2B995c3b50C823C249D1D99B9CD92026A9");
            if (_type == "c") {
                await nameContract.methods.newClient(web3Context.account, "0x56A52b69179fB4BF0d0Bc9aefC340E63c36d3895").send({from: web3Context.account}).then((tx: any) => {
                    let newContract = tx.events.OwnershipTransferred[0].address
                    setClient(newContract)
                    props.updateClientInfo("puffin_client_address", newContract)
                    ok()
                }).catch((err: any) => reject(err))
            } else {
                await nameContract.methods.newUsers(web3Context.account, "0x56A52b69179fB4BF0d0Bc9aefC340E63c36d3895").send({from: web3Context.account}).then((tx: any) => {
                    let newContract = tx.events.OwnershipTransferred[0].address
                    setUsers(newContract)
                    if (props.geo) {
                        props.updateClientInfo("puffin_geo_address", newContract)
                    } else {
                        props.updateClientInfo("puffin_kyc_address", newContract)
                    }
                    ok()
                }).catch((err: any) => reject(err))
            }

        })

        await toast.promise(
            newStatus,
            {
                success: 'Transaction Successful',
                pending: 'Transaction pending',
                error: 'Transaction failed'
            }
        )

    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let dapp = data.get('dapp')
        await AddNetwork("fuji")

        let newStatus = new Promise(async (ok: any, reject: any) => {
            let nameContract = new web3Context.web3.eth.Contract(Users, users);
            await nameContract.methods.setCanView(dapp, true).send({from: web3Context.account}).then((tx: any) => {
                ok()
            }).catch((err: any) => reject(err))
        })

        await toast.promise(
            newStatus,
            {
                success: 'Transaction Successful',
                pending: 'Transaction pending',
                error: 'Transaction failed'
            }
        )

        newStatus = new Promise(async (ok: any, reject: any) => {
            let nameContract = new web3Context.web3.eth.Contract(Clients, client);
            await nameContract.methods.setUsers(dapp, true).send({from: web3Context.account}).then((tx: any) => {
                ok()
            }).catch((err: any) => reject(err))
        })

        await toast.promise(
            newStatus,
            {
                success: 'Transaction Successful',
                pending: 'Transaction pending',
                error: 'Transaction failed'
            }
        )

    }

    return (
        <div style={{width: "100%"}}>
            <Typography component="h1" variant="h5">
                Prepare Your Subnet
            </Typography>
            <Button
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                style={{backgroundColor: "#01001A"}}
                {...getToggleProps({
                    onClick: () => props.setExpanded((prevExpanded: any) => !prevExpanded),
                })}
            >
                {!props.isExpanded ? "Self Deploy" : "Deployment Helper"}
            </Button>
            <div style={{maxWidth: "100%"}}>
                <div  {...getCollapseProps()}>
                    <div style={{
                        margin: "auto",
                        backgroundColor: "#1d1d1d",
                        color: "white",
                        textAlign: "left",
                        overflow: "hidden"
                    }}>
                        <p style={{
                            maxWidth: "400px",
                            margin: "1%",
                            overflowX: "scroll",
                            whiteSpace: "nowrap",
                            cursor: "pointer",
                            paddingBottom: "15px"
                        }} onClick={() => {
                            navigator.clipboard.writeText(`git clone https://github.com/Anaxii/subnet-setup && cd subnet-setup && ./deploy —owner 0x673717B80715c13eF5f6e1DcdB599b6c0dEe3d6d —complianceLevel ${props.level} —chainID ${props.chainId}`);
                            toast("Copied to clipboard", {
                                position: "top-center",
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            });
                        }}>
                            <ContentCopyIcon
                                fontSize={"small"}/>{`  git clone https://github.com/Puffin/subnet-integration-setup && cd subnet-setup && ./deploy —owner 0x673717B80715c13eF5f6e1DcdB599b6c0dEe3d6d —complianceLevel ${props.level} —chainID ${props.chainId}`}
                        </p>
                    </div>
                    <p>
                        After the script has finished, copy the deployed contract address and click NEXT.
                    </p>
                </div>
            </div>
            {!props.isExpanded &&
            <div>
              <p>
                The first step is to deploy the PuffinClient and PuffinUsers contracts on your network. You will be
                prompted to switch to your network. Make sure to save the contract addresses after deploying.
              </p>
              <Button
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                style={{backgroundColor: "#E55021"}}
                onClick={() => {
                    deployContract("c")
                }}
              >
                Deploy Client
              </Button>
                {client != "" && <p>{client}</p>}
              <Button
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                style={{backgroundColor: "#E55021"}}
                onClick={() => {
                    deployContract("u")
                }}
              >
                Deploy Users
              </Button>
                {users != "" && <p>{users}</p>}
              <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                <TextField
                  name="dapp"
                  required
                  fullWidth
                  id="dapp"
                  label="Your dApp Address"
                  autoFocus
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{mt: 3, mb: 2}}
                  style={{backgroundColor: "#E55021"}}
                >
                  Add dApp (2 txs)
                </Button>
              </Box>
            </div>
            }
        </div>
    )
}
