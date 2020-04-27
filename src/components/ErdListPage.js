import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {
    AppBar, Dialog, Toolbar, DialogActions, DialogTitle,
    DialogContent, DialogContentText, TextField} from "@material-ui/core";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                ErdEditor.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    TopBarSpace: {
        flex: 1,
    },

}));

export default function ErdListPage(props) {
    const classes = useStyles();
    const history = useHistory();

    const [diagrams, setDiagrams] = useState([]);
    const [userId, setUserId] = useState();
    const [open, setOpen] = React.useState(false);
    const [dataName,setDataName]=useState();
    const [desc,setDesc]=useState();


    useEffect(() => {
        //在渲染页面之前获取到列表的数据
        setUserId(props.match.params.userId);
        const fetchData = async () => {
            await axios("http://192.168.98.11:8080/erd/user-data/listErd", {params: {userId}})
                .then((res) => {
                    let erdData = res.data.data;
                    erdData = JSON.parse(erdData);
                    setDiagrams(erdData);
                });
        };
        fetchData().then();
    }, [userId]);


    const deleteDiagram = async (dataId) => {
        setDiagrams(diagrams.filter(d => d.dataId !== dataId));
        await axios("http://192.168.98.11:8080/erd/user-data/deleteErd", {params: {dataId}})
            .then((res) => {
            })
    };

    const editDiagram = async (dataId) => {
        let path = "/app/" + userId + "/" + dataId;
        history.push(path)
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAccept = () => {
        setOpen(false);
        let dataId = uuidv4().replace(/-/g,"");
        console.log(dataId,dataName,desc);
        axios.post("http://192.168.98.11:8080/erd/user-data/saveErd",{userId,dataId,desc,name:dataName})
            .then((res)=>{
                if(true===res.data.success){
                    history.push("/app/"+userId+"/"+dataId)
                }
            })
    };

    return (
        <React.Fragment>
            <CssBaseline/>
            <div>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">
                            ErdEditor
                        </Typography>
                        <div className={classes.TopBarSpace}/>
                        <Button variant="outlined" onClick={handleClickOpen} style={{color: "white"}}>
                            新建E-R图
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>

            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">新增E-R图</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            您可以在此处添加新的关系图
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="名称"
                            type="text"
                            fullWidth
                            onChange={(event)=>{setDataName(event.target.value)}}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="desc"
                            label="描述"
                            type="email"
                            fullWidth
                            onChange={(event)=> {setDesc(event.target.value)}}
                        />
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

            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {diagrams.map((diagram, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {diagram.dataName}
                                        </Typography>
                                        <Typography>
                                            {diagram.dataDesc}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary"
                                                onClick={() => editDiagram(diagram.dataId)}>
                                            编辑
                                        </Button>
                                        <Button size="small" color="primary"
                                                onClick={() => deleteDiagram(diagram.dataId)}>
                                            删除
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    欢迎使用ERD生成系统
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">

                </Typography>
                <Copyright/>
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}