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

    useEffect(() => {
        if (bridge && geo && aml && kyc) {
            setLevel("full")
        } else {
            setLevel("flex")
        }
    }, [bridge, geo, aml, kyc])

    const sendVerify = async () => {
        let status = new Promise((ok: any) => {
            setTimeout(() => {
                ok()
            }, 10000)
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
                <TeamInfo projectInfo={projectInfo} setProjectInfo={setProjectInfo} setChainId={setChainId}/>}
                {step == 1 &&
                <SubnetInfo projectInfo={projectInfo} setProjectInfo={setProjectInfo} setChainId={setChainId}
                setRpcURL={setRpcURL} setName={setName}/>}
                {step == 2 &&
                <SelectFeatures setLevel={setLevel} projectInfo={projectInfo} setProjectInfo={setProjectInfo}
                setBridge={setBridge} setGeo={setGeo} setKYC={setKYC} setAML={setAML} setUsers={setUsers} users={users}
                geo={geo} aml={aml} bridge={bridge} kyc={kyc}/>}
                {step == 3 &&
                <Deploy level={level} chainId={chainId} projectInfo={projectInfo} setProjectInfo={setProjectInfo} isExpanded={isExpanded} setExpanded={setExpanded}/>}
                {step == 4 &&
                <SetOwner level={level} chainId={chainId} projectInfo={projectInfo} setProjectInfo={setProjectInfo} isExpanded={isExpanded} setExpanded={setExpanded} />}
                {step == 5 &&
                <EnableWallet level={level} chainId={chainId} projectInfo={projectInfo} setProjectInfo={setProjectInfo} isExpanded={isExpanded} setExpanded={setExpanded}/>}
                {step == 6 &&
                <SendTokens level={level} chainId={chainId} projectInfo={projectInfo} setProjectInfo={setProjectInfo} isExpanded={isExpanded} setExpanded={setExpanded}/>}
                {step == 7 &&
                <Verify level={level} chainId={chainId} projectInfo={projectInfo} setProjectInfo={setProjectInfo}
                        geo={geo} aml={aml} bridge={bridge} kyc={kyc} users={users} rpcURL={rpcURL} name={name} />}
                <Step setStep={setStep} step={step} isExpanded={isExpanded} setExpanded={setExpanded} sendVerify={sendVerify}/>
            </Box>
        </ThemeProvider>
    );
}
