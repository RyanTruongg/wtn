import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import PacmanLoader from "react-spinners/PacmanLoader";

import { OCRService } from "services";
import { Page, FilesDropzone } from "components";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        padding: theme.spacing(3),
    },
}));

const Demo = () => {
    const classes = useStyles();
    const [predictionResult, setPredictionResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    const onUpload = async (files) => {
        try {
            setLoading(true);

            var reader = new FileReader();
            reader.onload = function(e) {
                setImage(e.target.result);

                console.log(e.target.result);
            };

            reader.readAsDataURL(files[0]);

            const result = await OCRService.predict(files[0]);

            console.log(result);

            // let result = ["Câu A", "Câu B"];

            setLoading(false);
            setPredictionResult(result);
        } catch (err) {
            console.log("Predict err...", err);
        }
    };

    return (
        <Page className={classes.root} title="Demo">
            <Grid className={"mb-4"} container spacing={3}>
                <Grid lg={12} md={12}>
                    <Paper>
                        <FilesDropzone onUpload={onUpload} />
                    </Paper>
                </Grid>
            </Grid>
            <Grid className={"mt-4 pb-4"} container spacing={3}>
                <Grid lg={6} md={6}>
                    {image ? (
                        <Paper className="d-flex justify-content-center align-items-center me-4 px-3 py-2">
                            <img style={{ width: "100%" }} src={image} />
                        </Paper>
                    ) : null}
                </Grid>

                <Grid lg={6} md={6}>
                    <Paper
                        className={
                            "d-flex justify-content-center align-items-center"
                        }
                    >
                        {predictionResult ? (
                            <div class={"m-3"}>
                                {predictionResult.map((item, idx) => (
                                    <p>{item}</p>
                                ))}
                            </div>
                        ) : loading ? (
                            <div style={{ minHeight: 50 }} className={"my-3"}>
                                <PacmanLoader
                                    color={"#0d6efd"}
                                    loading={true}
                                    // css={override}
                                    size={25}
                                />
                            </div>
                        ) : null}
                    </Paper>
                </Grid>
            </Grid>
        </Page>
    );
};

export default Demo;
