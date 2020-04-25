import {AppBar, Toolbar, IconButton, Typography, makeStyles, Button} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

import React from "react";
import SignupPage from "./SignupPage";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    signupButton: {
        flex: 1,
    }
}));

function NavigationBar() {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        ErdEditor
                    </Typography>
                    <div className={classes.signupButton}/>
                    <Button variant="outlined"  href="/signup" style={{color:"white"}}>
                        注册
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavigationBar;