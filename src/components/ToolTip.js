import React from "react";
import {Button, Input, Typography} from "@material-ui/core";
import '../index.css'

export default function ToolTip(props) {

    
    return (
        <div className='nodeTooltips' style={{top: `${props.y}px`, left: `${props.x}px`}}>
            <Typography variant="h6" >
                编辑节点
            </Typography>
            <div>
                <Input
                    placeholder={"节点名称： "+props.label}
                    onKeyUp={props.updateLabel}
                />
                <p/>
                <Button variant="contained" color="primary" onClick={props.destroyToolTip}>关闭</Button>
                <Button style={{float: "right"}} variant="contained" color="secondary"
                        onClick={props.removeNode}>删除节点</Button>
            </div>
        </div>
    )
}
