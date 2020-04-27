import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SwitchEditModes(props) {
    const classes = useStyles();

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label" style={{color:"white"}}>编辑模式</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={props.value}
                onChange={props.handleChange}
                label="EditMode"
                style={{color:"white"}}
            >
                <MenuItem value="default">
                    <em>默认</em>
                </MenuItem>
                <MenuItem value="addEntity">添加实体</MenuItem>
                <MenuItem value="addProperty">添加属性</MenuItem>
                <MenuItem value="addEdge">添加联系</MenuItem>
            </Select>
        </FormControl>
    )
}
