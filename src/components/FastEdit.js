import React from "react";
import {FormControlLabel, Switch} from "@material-ui/core";

export default function FastEdit(props) {

    return (
        <FormControlLabel
            control={<Switch checked={props.checked} onChange={props.toggleChecked}/>}
            label="快速编辑"
        />
    )
}
