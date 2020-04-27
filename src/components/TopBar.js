import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import SaveIcon from '@material-ui/icons/Save';
import SwitchEditModes from "./SwitchEditModes";
import FastEdit from "./FastEdit";

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
    //todo:保存到数据库
    const saveData = () => {
        let data = props.graph.save();
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
