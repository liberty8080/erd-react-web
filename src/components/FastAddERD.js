import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemSecondaryAction,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import AddBox from '@material-ui/icons/AddBox'
import DeleteIcon from '@material-ui/icons/Delete';
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


function EntityList(props) {

    const {onClick, onChange} = props;
    return (<div>
        <ListItem>
            <TextField
                margin="dense"
                label="实体"
                name="desc"
                type="email"
                fullWidth
                /*onChange={(event) => {
                    setDesc(event.target.value)
                }}*/
                onChange={onChange}
            />

            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={onClick}>
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    </div>)

}

function RelationList(props) {
    const classes = useStyles();
    const {onDelete, nodes, onChange, edges, edgeIndex} = props;


    return (<div>
        <ListItem>
            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="relation-placeholder">
                    起点
                </InputLabel>
                <Select
                    displayEmpty={true}
                    value={edges[edgeIndex].source}
                    name='source'
                    onChange={onChange}
                >
                    {
                        nodes.map((node, index) => {
                            return (
                                <MenuItem key={index} value={node.id}>{node.label}</MenuItem>
                            )
                        })}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="relation-placeholder">
                    联系
                </InputLabel>
                <Select
                    value={edges[edgeIndex].relation}
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
                    value={edges[edgeIndex].target}
                >
                    {
                        nodes.map((node, index) => {
                            return (
                                <MenuItem key={index} value={node.id}>{node.label}</MenuItem>
                            )
                        })}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>

                <TextField
                    margin="dense"
                    label="关系"
                    name="relationName"
                    // type="email"
                    fullWidth
                    onChange={onChange}
                />
            </FormControl>

            <IconButton edge="end" aria-label="delete" onClick={onDelete}>
                <DeleteIcon/>
            </IconButton>
            <ListItemSecondaryAction>

            </ListItemSecondaryAction>
        </ListItem>
    </div>)

}

function FastAddERD(props) {
    const classes = useStyles();
    const {
        erdData, handleClose, handleAccept, onChange, entityChange, relationChange, nodes, edges, addRelation,
        addEntity, removeRelation, removeEntity
    } = props;
    return (
        <div>
            <Dialog open={erdData.open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="xl">
                <DialogTitle id="form-dialog-title">新增实体联系图</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        您可以在此处添加新的关系图
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="name"
                        label="名称"
                        name="dataName"
                        type="text"
                        fullWidth
                        /*onChange={(event) => {
                            setDataName(event.target.value)
                        }}*/
                        onChange={onChange}
                    />
                    <TextField
                        margin="dense"
                        id="desc"
                        label="描述"
                        name="desc"
                        type="email"
                        fullWidth
                        /*onChange={(event) => {
                            setDesc(event.target.value)
                        }}*/
                        onChange={onChange}
                    />

                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" className={classes.title}>
                            添加实体
                            <IconButton edge="end" aria-label="delete"
                                        onClick={addEntity}>
                                <AddBox/>
                            </IconButton>
                        </Typography>

                        <div className={classes.demo}>

                            <List dense={false}>
                                {nodes.map((value, index) => {
                                    return (
                                        <EntityList key={index}
                                            /*                       onClick={() => setEntityInputArray(
                                                                       entityInputArray.filter(listItem => listItem !== value))}*/
                                                    onClick={() => {
                                                        removeEntity(index)
                                                    }}
                                                    onChange={entityChange(index)}/>
                                    )
                                })}
                            </List>
                        </div>
                    </Grid>
                    {/*添加联系*/}
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" className={classes.title}>
                            添加联系
                            <IconButton edge="end" aria-label="delete"
                                        onClick={addRelation}>
                                <AddBox/>
                            </IconButton>
                        </Typography>

                        <div className={classes.demo}>

                            <List dense={false}>
                                {edges.map((value, index) => {
                                    return (
                                        <RelationList key={index} edgeIndex={index}
                                                      onDelete={() => removeRelation(index)}
                                                      nodes={nodes} edges={edges}
                                                      onChange={relationChange(index)}
                                        />
                                    )
                                })}
                            </List>
                        </div>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        取消
                    </Button>
                    <Button onClick={handleAccept} color="primary">
                        确认
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default FastAddERD;