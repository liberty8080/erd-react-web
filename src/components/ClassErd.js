import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {Button, IconButton, TextField} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AddBox from '@material-ui/icons/AddBox'


const drawerWidth = document.body.clientWidth * 0.5;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function EntityInput(props) {
    const {onChange, onDelete, onPropDelete, onPropChange, addProperty, entity} = props;
    return (
        <React.Fragment>
            <ListItem>
                <TextField
                    margin="dense"
                    label="实体"
                    name="entity"
                    type=""
                    onChange={onChange}
                    value={entity.entity}
                    fullWidth
                    autoFocus
                />
                <IconButton edge="start" aria-label="add" onClick={addProperty}>
                    <AddBox/>
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={onDelete}>
                    <DeleteIcon/>
                </IconButton>
            </ListItem>

            {entity.column.map((data, index) => (
                <ListItem key={index}>
                    <TextField
                        margin="dense"
                        label="属性"
                        name="property"
                        type=""
                        onChange={onPropChange(index)}
                        value={data}
                    />
                    <IconButton edge="end" aria-label="delete" onClick={onPropDelete(index)}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItem>
            ))}
            <Divider/>
        </React.Fragment>
    )
}

export default function ClassErd() {
    const classes = useStyles();

    const [erdData, setErdData] = useState([{entity: "", column: [""], fk: ""}]);

    useEffect(() => {

    }, [erdData]);

    const onEntityChange = index => e => {
        let data = erdData;
        data[index].entity = e.target.value;
        setErdData(data.slice())
        console.info("erdData", erdData)
    };

    const onPropChange = entityIndex => propIndex => e => {
        let data = erdData;
        data[entityIndex].column[propIndex] = e.target.value;
        setErdData(data.slice());
    };

    const addProperty = entityIndex => e => {
        let data = erdData;
        data[entityIndex].column.push("");
        setErdData(data.slice())
    };

    const onPropDelete = entityIndex => propIndex => e => {
        let data = erdData;
        data[entityIndex].column = data[entityIndex].column.filter((item, index0) => index0 !== propIndex);
        setErdData(data.slice())
    };
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        ErdGenerator
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                style={{width: "50%"}}
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar/>
                <Button onClick={() => setErdData([...erdData, {entity: "", column: [""], fk: ""}])}>添加实体</Button>
                <Button></Button>
                <div className={classes.drawerContainer}>
                    <List>
                        {erdData.map((data, index) => (
                                <EntityInput key={index} onChange={onEntityChange(index)}
                                             onDelete={() => {
                                                 setErdData(erdData.filter((item, index0) => index !== index0))
                                                 console.info(erdData)
                                             }}
                                             entity={data} onPropDelete={onPropDelete(index)}
                                             onPropChange={onPropChange(index)}
                                             addProperty={addProperty(index)}
                                />
                            )
                        )}
                    </List>
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar/>
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                    facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                    gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                    donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                    Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                    imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                    arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                    donec massa sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                    facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                    tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                    consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                    vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                    hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                    tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                    nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                    accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </main>
        </div>
    );
}
