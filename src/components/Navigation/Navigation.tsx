import {useContext} from "react";
import {Web3Context} from "../../helpers/context";
import Button from "@mui/material/Button";
import * as React from "react";
// import logo from "../images/png/logo.png"
export default function Navigation(props: any) {
    const web3Context: any = useContext(Web3Context);

    return <div className={'navigation'}>
        <div className={"logo-div"}>
            <div className={"logo"}>
                {/*<img width={"55px"} src={logo}/>*/}

            </div>
            <h2 className={"exposure-title"}>
                Puffin KYC
            </h2>
        </div>

        <div className={"color-primary"} style={{margin: "auto"}}>
            <p>{web3Context.account}</p>
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
