import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Grid from "@material-ui/core/Grid";
import {
    Button,
    FormControl,
    IconButton,
    InputLabel,
    ListItemSecondaryAction,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AddBox from '@material-ui/icons/AddBox'
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import SendIcon from '@material-ui/icons/Send';
import axios from "axios";

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

function EntityInput(props) {
    const classes = useStyles();
    const {onChange, onDelete, onPropDelete, onPropChange, addProperty, entity, erdData, onFkChange} = props;
    const relation = useRef("1to1");
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
            <ListItem>
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="relation-placeholder">
                        联系
                    </InputLabel>
                    <Select
                        // value={relation}
                        displayEmpty={true}
                        name="relation"
                        ref={relation}
                        defaultValue={"1toN"}
                    >
                        <MenuItem value={"1to1"}>一对一</MenuItem>
                        <MenuItem value={"1toN"}>一对多</MenuItem>
                        <MenuItem value={"NtoN"}>多对多</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="relation-placeholder">
                        目标实体
                    </InputLabel>
                    <Select
                        displayEmpty={true}
                        name="target"
                        onChange={onFkChange}
                        // value={}
                        value={entity.fk}
                    >
                        {
                            erdData.map((item, index) => (
                                <MenuItem key={index} value={item.entity}>{item.entity}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>


                <ListItemSecondaryAction>

                </ListItemSecondaryAction>
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

/*function RelationInput(props) {
    const classes = useStyles();
    const {onDelete, onChange, erdData} = props;


    return (<div>
        <ListItem>
            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="relation-placeholder">
                    起点
                </InputLabel>
                <Select
                    displayEmpty={true}
                    value={erdData}
                    name='source'
                    onChange={onChange}
                >
                    {
                        erdData.map((item, entityIndex) => (
                                <MenuItem key={entityIndex} value={item.entity}>{item.entity}</MenuItem>
                            )
                        )
                    }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="relation-placeholder">
                    联系
                </InputLabel>
                <Select
                    // value={}
                    displayEmpty={true}

                    name="relation"
                    onChange={onChange}
                >
                    <MenuItem value={"1to1"}>一对一</MenuItem>
                    <MenuItem value={"1toN"}>一对多</MenuItem>
                    <MenuItem value={"NtoN"}>多对多</MenuItem>
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="relation-placeholder">
                    终点
                </InputLabel>
                <Select
                    displayEmpty={true}
                    name="target"
                    onChange={onChange}
                    // value={}
                >
                    {
                    }
                </Select>
            </FormControl>


            <IconButton edge="end" aria-label="delete" onClick={onDelete}>
                <DeleteIcon/>
            </IconButton>
            <ListItemSecondaryAction>

            </ListItemSecondaryAction>
        </ListItem>
    </div>)

}*/

export default function ClassErd() {
    const classes = useStyles();

    const [erdData, setErdData] = useState([{entity: "", column: [""], fk: ""}]);
    const [image, setImage] = useState("default");
    useEffect(() => {

    }, [erdData]);

    const onEntityChange = index => e => {
        let data = erdData;
        data[index].entity = e.target.value;
        setErdData(data.slice());
    };

    const onFkChange = index => e => {
        let data = erdData;
        data[index].fk = e.target.value;
        setErdData(data.slice());
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


    const generateErd = () => {
        axios.post("http://192.168.98.11:5000/", {erdData})
            .then((res) => {
                setImage(res.data)
            })
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
                <div>
                    <Button startIcon={<AddToQueueIcon/>} color="primary"
                            onClick={() => setErdData([...erdData, {entity: "", column: [""], fk: ""}])}>添加实体</Button>
                    <Button startIcon={<SendIcon/>} style={{float: "right"}} color="primary"
                            onClick={generateErd}>生成</Button>
                </div>

                <div className={classes.drawerContainer}>
                    <List>
                        {erdData.map((data, index) => (
                                <EntityInput key={index} onChange={onEntityChange(index)}
                                             onDelete={() => {
                                                 setErdData(erdData.filter((item, index0) => index !== index0));
                                             }}
                                             entity={data} onPropDelete={onPropDelete(index)}
                                             onPropChange={onPropChange(index)}
                                             addProperty={addProperty(index)}
                                             erdData={erdData}
                                             onFkChange={onFkChange(index)}
                                />
                            )
                        )}
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar/>
                {
                image==="default"?null:(
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="flex-start"
                        justify="center"
                    >
                        <Grid item xs={3}>
                            <img src={"http://192.168.98.11:5000/image/" + image + ".png"}
                                 style={{minWidth: 500}}/>
                        </Grid>

                    </Grid>
                    )
                }


            </main>
        </div>
    );
}
