import React from "react";
import {Button, FormControl, Input, InputLabel, Grid, MenuItem, Select, Typography} from "@material-ui/core";
import '../index.css'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function EdgeToolTip(props) {
    const classes = useStyles();
    const {removeEdge, edgeModel, onRelationNameChange, onRelationTypeChange} = props;
    return (
        <div className='nodeTooltips' style={{top: `${props.y}px`, left: `${props.x}px`}}>
            <Typography variant="h6">
                编辑联系
            </Typography>

            <div>
                <Grid container className={classes.root} spacing={1}>
                    <Grid item xs={12}>
                        <Grid container  direction="column" justify="center" spacing={1}>
                                <Grid  item>
                                    <Input
                                        placeholder={"关系名称: " + edgeModel.relationName}
                                        onChange={onRelationNameChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="relation-placeholder">
                                            关系类型
                                        </InputLabel>
                                        <Select
                                            displayEmpty={true}
                                            name="relation"
                                            onChange={onRelationTypeChange}
                                            value={edgeModel.relation}
                                        >
                                            <MenuItem value={"1to1"}>一对一</MenuItem>
                                            <MenuItem value={"1toN"}>一对多</MenuItem>
                                            <MenuItem value={"Nto1"}>多对一</MenuItem>
                                            <MenuItem value={"NtoN"}>多对多</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                        </Grid>
                    </Grid>

                </Grid>



                <p/>
                <Button variant="contained" color="primary" onClick={props.destroyToolTip}>关闭</Button>
                <Button style={{float: "right"}} variant="contained" color="secondary"
                        onClick={removeEdge}>删除联系</Button>
            </div>
        </div>
    )
}
