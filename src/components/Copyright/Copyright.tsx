import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";

export function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Contact Information: '}
            <Link color="inherit" target={"_blank"} href="https://linktr.ee/puffinnetwork/">
                linktr.ee/puffinnetwork
            </Link>
            {'.'}
        </Typography>
    );
}
