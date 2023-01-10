import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import SubnetInfo from "./SubnetInfo/SubnetInfo";
import Step from "./Step/Step";
import SelectFeatures from "./SelectFeatures/SelectFeatures";
import Deploy from "./Deploy/Deploy";
import Verify from "./Verify/Verify";
import TeamInfo from "./TeamInfo/TeamInfo";
import SetOwner from "./SetOwner/SetOwner";
import EnableWallet from "./EnableWallet/EnableWallet";
import SendTokens from "./SendTokens/SendTokens";
import {CLIENT_URL} from "../../constants/Global";

const theme = createTheme();

export default function SubnetSetup(props: any) {

    const [name, setName] = useState("PFN")
    const [rpcURL, setRpcURL] = useState("https://node.thepuffin.network/ext/bc/273dwzFtrR6JQzLncTAbN5RBtiqdysVfKTJKBvYHhtUHBnrYWe/rpc")

    const [step, setStep] = useState(0)
    const [projectInfo, setProjectInfo]: [any, any] = useState({})

    const [level, setLevel] = useState("flex")
    const [chainId, setChainId] = useState(0)

    const [bridge, setBridge] = useState(false)
    const [geo, setGeo] = useState(false)
    const [aml, setAML] = useState(false)
    const [kyc, setKYC] = useState(false)
    const [users, setUsers] = useState("")

    const [isExpanded, setExpanded] = useState(false)
    const [clientInfo, setClientInfo] = useState({
        "admin_name": "",
        "project_name": "",
        "admin_telegram": "",
        "team_size": 0,
        "project_communication_channel": "",
        "project_website": "",
        "dapp_name": "",
        "rpc_url": "",
        "ws_url": "",
        "gas_token_symbol": "",
        "chain_id": 0,
        "vm": "",
        "package": "",
        "package_options": [],
        "max_users": 0,
        "puffin_geo_address": "",
        "puffin_kyc_address": "",
        "puffin_client_address": "",
        "admin_wallet_address": "",
        "blocked_countries": {
        }
    })
    useEffect(() => {
        if (bridge && geo && aml && kyc) {
            setLevel("full")
        } else {
            setLevel("flex")
        }
    }, [bridge, geo, aml, kyc])

    const updateClientInfo = (key: any, val: any) => {
        let c = clientInfo
        // @ts-ignore
        c[key] = val
        setClientInfo(c)
    }

    const sendVerify = async () => {
        let features: string[] = []
        if (kyc)
            features.push("kyc")
        if (geo)
            features.push("geo")

        let c = clientInfo
        // @ts-ignore
        c.package_options = features

        console.log(features, c)
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(c)
        };
        let status = new Promise(async (ok: any, reject: any) => {
            fetch(CLIENT_URL + '/client/new', requestOptions)
                .then(response => response.json())
                .then(data => {
                    ok()
                    console.log(data)
                }).catch((err: any) => {
                console.log(err)
                reject()
                return false
            });
        })
        await toast.promise(
            status,
            {
                success: 'Verification successful, we will contact you within 2 business days',
                pending: 'Verifying your information',
                error: 'Verification failed'
            }
        )

    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {step == 0 &&
                <TeamInfo updateClientInfo={updateClientInfo} clientInfo={clientInfo} projectInfo={projectInfo} setProjectInfo={setProjectInfo} setChainId={setChainId}/>}
                {step == 1 &&
                <SubnetInfo updateClientInfo={updateClientInfo} clientInfo={clientInfo} projectInfo={projectInfo} setProjectInfo={setProjectInfo} setChainId={setChainId}
                            setRpcURL={setRpcURL} setName={setName}/>}
                {step == 2 &&
                <SelectFeatures updateClientInfo={updateClientInfo} clientInfo={clientInfo} setLevel={setLevel} projectInfo={projectInfo} setProjectInfo={setProjectInfo}
                                setBridge={setBridge} setGeo={setGeo} setKYC={setKYC} setAML={setAML}
                                setUsers={setUsers} users={users}
                                geo={geo} aml={aml} bridge={bridge} kyc={kyc}/>}
                {step == 3 &&
                <Deploy updateClientInfo={updateClientInfo} clientInfo={clientInfo} level={level} chainId={chainId} projectInfo={projectInfo} setProjectInfo={setProjectInfo}
                        isExpanded={isExpanded} setExpanded={setExpanded} geo={geo}/>}
                {/*{step == 4 &&*/}
                {/*<SetOwner updateClientInfo={updateClientInfo} clientInfo={clientInfo} level={level} chainId={chainId} projectInfo={projectInfo} setProjectInfo={setProjectInfo}*/}
                {/*          isExpanded={isExpanded} setExpanded={setExpanded}/>}*/}
                {/*{step == 4 &&*/}
                {/*<EnableWallet updateClientInfo={updateClientInfo} clientInfo={clientInfo} level={level} chainId={chainId} projectInfo={projectInfo} setProjectInfo={setProjectInfo}*/}
                {/*              isExpanded={isExpanded} setExpanded={setExpanded}/>}*/}
                {step == 4 &&
                <SendTokens updateClientInfo={updateClientInfo} clientInfo={clientInfo} level={level} chainId={chainId} projectInfo={projectInfo} setProjectInfo={setProjectInfo}
                            isExpanded={isExpanded} setExpanded={setExpanded}/>}
                {step == 5 &&
                <Verify updateClientInfo={updateClientInfo} clientInfo={clientInfo} level={level} chainId={chainId} projectInfo={projectInfo} setProjectInfo={setProjectInfo}
                        geo={geo} aml={aml} bridge={bridge} kyc={kyc} users={users} rpcURL={rpcURL} name={name}/>}
                <Step updateClientInfo={updateClientInfo} clientInfo={clientInfo} setStep={setStep} step={step} isExpanded={isExpanded} setExpanded={setExpanded}
                      sendVerify={sendVerify}/>
            </Box>
        </ThemeProvider>
    );
}
