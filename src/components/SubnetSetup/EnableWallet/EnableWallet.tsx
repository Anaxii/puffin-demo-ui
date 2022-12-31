import * as React from "react";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import useCollapse from "react-collapsed";
import Button from "@mui/material/Button";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TextField from "@mui/material/TextField";

export default function EnableWallet(props: any) {
    const {getCollapseProps, getToggleProps} = useCollapse({isExpanded: props.isExpanded})

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
                (OPTIONAL) If your network is permissioned, approve our address for contract interaction using the IAllowInterface.
              </p>
              <Button
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                style={{backgroundColor: "#E55021"}}
              >
                Enable Puffin Wallet
              </Button>
            </div>
            }
        </div>
    )
}
