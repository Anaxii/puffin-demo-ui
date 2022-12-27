import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";

export default function TeamInfo(props: any) {

    const setId = (e: any) => {
        e.preventDefault()
        props.setChainId(e.target.value)
    }

    return (
        <div>
            <Typography component="h1" variant="h5">
                Subnet Info
            </Typography>
            <Box component="form" sx={{mt: 3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="Your Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Project/Company Name"
                            name="lastName"
                            autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="Your Telegram or Discord"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="Team Size"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Project/Company Discord or Telegram"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="address"
                            label="Project/Company Website"
                            name="address"
                        />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
