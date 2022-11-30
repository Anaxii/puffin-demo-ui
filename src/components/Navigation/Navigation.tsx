import {useContext} from "react";
import {Web3Context} from "../../helpers/context";
import Button from "@mui/material/Button";
import * as React from "react";
import Web3 from "web3";

import logo from "../../assets/logo.png"
export default function Navigation(props: any) {
    const web3Context: any = useContext(Web3Context);

    function balances() {
        let msg = ""
        Object.keys(props.balances).map((index: any, val: any) => {
            msg += Object.keys(props.balances)[val].toUpperCase().replace("_", " ") + ": " + Number(Web3.utils.fromWei(props.balances[Object.keys(props.balances)[val]].toString(), 'ether')).toLocaleString()
            if (index != "pfn_wavax") {
                msg += " | "
            }
        })
        return msg
    }

    return <div className={'navigation'}>
        <div className={"logo-div"}>
            <div className={"logo"}>
                <img width={"55px"} src={logo}/>

            </div>
            <h2 className={"exposure-title"}>
                Puffin KYC
            </h2>
        </div>

        <div className={"color-primary"} style={{margin: "auto"}}>
            <p style={{textAlign: "center", marginBottom: 0}}>Demo Balances</p>
            <p style={{margin: 0}}>{balances()}</p>
        </div>
        <div style={{marginLeft: "auto", margin: "auto", marginRight: "0"}}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{backgroundColor: "#E55021"}}
                onClick={
                    () => {
                        console.log("test")
                        props.disconnect()
                    }}
            >
                Disconnect
            </Button>
        </div>
    </div>
}
