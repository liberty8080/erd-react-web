import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import SaveIcon from '@material-ui/icons/Save';
import SwitchEditModes from "./SwitchEditModes";
import FastEdit from "./FastEdit";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    downloadButton: {
        float: "right"
    }
}));

function ToolBar(props) {
    const classes = useStyles();
    //下载图片
    const downloadImage = () => {
        props.graph.downloadImage();
    };

    //保存数据
    const saveData = () => {
        let data = props.graph.save();
        let userId = "09a954b2456d4292b2891251ffac3aac";
        let desc = "描述";
        let name = "名称";
        axios.post("http://192.168.98.11:8080/erd/user-data/saveErd",{userId,data:JSON.stringify(data),desc,name})
            .then((res)=>{
                console.log(res.data)
            });
        console.log(data)
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                {/*            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>*/}

                <Typography variant="h6" className={classes.title}>
                    ERDEditor
                </Typography>
                <SwitchEditModes handleChange={props.handleChange} value={props.editMode}/>
                <FastEdit checked={props.checked} toggleChecked={props.toggleChecked}/>
                <IconButton onClick={saveData} className={classes.downloadButton} color="inherit" aria-label="save">
                    <SaveIcon/>
                </IconButton>
                <IconButton onClick={downloadImage} className={classes.downloadButton} color="inherit"
                            aria-label="save">
                    <SaveAltIcon/>
                </IconButton>
                {/*<Button color="inherit" onClick={downloadImage}>保存图片</Button>*/}
            </Toolbar>
        </AppBar>
    )
}

export default ToolBar;
