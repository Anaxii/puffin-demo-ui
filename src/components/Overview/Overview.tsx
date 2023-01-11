import React, {useEffect, useState} from "react";
import {ACCOUNT_URL, CLIENT_URL} from "../../constants/Global";
import Grid from "@mui/material/Grid";
import {AddNetwork} from "../../util/AddNetwork";
import Button from "@mui/material/Button";
import {toast} from "react-toastify";

export default function Overview(props: any){
    const [clients, setClients] = useState({})
    const [clientUsers, setClientUsers] = useState({})

    const getClients = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };
        fetch(ACCOUNT_URL + '/client/all?wallet=' + props.account, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setClients(data.clients)
                setClientUsers(data.user_clients)
            }).catch((err: any) => {
            console.log(err)
            return false
        });
    }

    const joinNetwork = async (id: any) => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };
        let status = new Promise(async (ok: any, reject: any) => {
            fetch(ACCOUNT_URL + '/client/join?wallet=' + props.account + "&id=" + id, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    ok()
                    getClients()
                }).catch((err: any) => {
                console.log(err)
                reject()
                return false
            });
        })
        await toast.promise(
            status,
            {
                success: 'Successfully joined/left client',
                pending: 'Waiting for join/leave confirmation',
                error: 'Failed to join/leave client'
            }
        )
    }

    useEffect(() => {
        if (Object.keys(clients).length == 0)
            getClients()
    }, [])
    return (
        <div>
            {Object.keys(clients).map((index: any, val: any) => {
                // @ts-ignore
                let id = clients[index]
                // @ts-ignore
                let hasJoined = clientUsers[id]
                return (
                    <div style={{width: "400px", paddingBottom: "20px"}}>
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
                                    onClick={() => joinNetwork(id)}
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

