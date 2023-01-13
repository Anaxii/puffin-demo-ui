import Button from "@mui/material/Button";
import * as React from "react";
import Grid from "@mui/material/Grid";

export default function Step(props: any) {

    return (
        <div style={{width: "100%"}}>
            {props.step == 0 &&
            <div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                    style={{backgroundColor: "#E55021"}}
                    onClick={() => {
                        props.setStep(1)
                    }}
                >
                    Next
                </Button>
            </div>
            }
            {(props.step > 0 && props.step < 3) &&
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            style={{backgroundColor: "#E55021"}}
                            onClick={() => {
                                props.setStep(props.step - 1)
                            }}
                        >
                            Previous
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            style={{backgroundColor: "#E55021"}}
                            onClick={() => {
                                if (props.isExpanded) {
                                    props.setStep(7)
                                    props.setExpanded(false)
                                    return
                                }
                                props.setStep(props.step + 1)
                            }}
                        >
                            Next
                        </Button>
                    </Grid>
                </Grid>

            </div>
            }
            {props.step == 3 &&
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            style={{backgroundColor: "#E55021"}}
                            onClick={() => {
                                props.setStep(props.step - 1)
                            }}
                        >
                            Previous
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            style={{backgroundColor: "#E55021"}}
                            onClick={() => {
                                props.sendVerify()
                            }}
                        >
                            Verify
                        </Button>
                    </Grid>
                </Grid>
            </div>
            }
        </div>
    )
}
