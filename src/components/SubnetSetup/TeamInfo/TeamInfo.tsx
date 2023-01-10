import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";

export default function TeamInfo(props: any) {
    const setValue = (e: any) => {
        e.preventDefault()
        props.updateClientInfo(e.target.id, e.target.value)
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
                            id="admin_name"
                            label="Your Name"
                            autoFocus
                            onChange={setValue}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="admin_telegram"
                            label="Your Telegram or Discord"
                            autoFocus
                            onChange={setValue}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="team_size"
                            label="Team Size"
                            autoFocus
                            onChange={setValue}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="project_communication_channel"
                            label="Project/Company Discord or Telegram"
                            name="email"
                            autoComplete="email"
                            onChange={setValue}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="project_website"
                            label="Project/Company Website"
                            name="address"
                            onChange={setValue}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Your Email"
                            name="address"
                            onChange={setValue}
                        />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
