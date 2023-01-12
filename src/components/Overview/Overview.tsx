import React, {useContext, useEffect, useState} from "react";
import {ACCOUNT_URL, CLIENT_URL} from "../../constants/Global";
import Grid from "@mui/material/Grid";
import {AddNetwork} from "../../util/AddNetwork";
import Button from "@mui/material/Button";
import {toast} from "react-toastify";
import Typography from "@mui/material/Typography";
import LoadingModal from "../LoadingModal/LoadingModal";
import {InfinitySpin} from "react-loader-spinner";
import {Web3Context} from "../../helpers/context";

export default function Overview(props: any){

    const web3Context: any = useContext(Web3Context);

    useEffect(() => {
        console.log(props)
        if (Object.keys(props.clients).length == 0)
            props.getClients()
    }, [])

    return (
        <div>
            <Typography component="h1" variant="h5">
                User Settings
            </Typography>
            <div style={{paddingTop: "20px"}}/>
            {props.showLoadingModal ? <div style={{marginLeft: "auto", marginRight: "auto", marginBottom: 0}}>
              <InfinitySpin
                color="#E55021"
              />
            </div>
            :
            <div style={{paddingBottom: "20px"}}>
                <Grid container spacing={2} style={{paddingBottom: "5px"}}>
                    <Grid item xs={6}>
                        <p style={{textAlign: "left", margin: 0}}>
                            Account:
                        </p>
                    </Grid>
                    <Grid item xs={6}>
                        <p style={{textAlign: "right", margin: 0}}>
                            {web3Context.account.slice(0, 7)}...{web3Context.account.slice(web3Context.account.length - 8, web3Context.account.length)}
                        </p>
                    </Grid>
                </Grid>
            </div>}
            {Object.keys(props.clients).map((index: any, val: any) => {
                // @ts-ignore
                let id = props.clients[index]
                // @ts-ignore
                let hasJoined = props.clientUsers[id]
                return (
                    <div style={{width: "400px", paddingBottom: "20px"}} key={id}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <p style={{margin: "auto", textAlign: "left"}}>
                                    {index}
                                </p>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    style={{backgroundColor: "#E55021", margin: "auto"}}
                                    onClick={() => props.joinNetwork(id)}
                                >
                                    {hasJoined ? "Leave" : "Join"}
                                </Button>

                            </Grid>
                        </Grid>
                    </div>
                )
            })}
        </div>
    );
}

