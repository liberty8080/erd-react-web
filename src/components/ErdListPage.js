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
import {AppBar, Toolbar} from "@material-ui/core";
import FastAddERD from "./FastAddERD";
import AddEmptyErd from "./AddEmptyErd";

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
        position: "absolute",
        bottom: 0,
        width: "100%"
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
    const [emptyErdDialog, setEmptyDialog] = useState(
        {
            open: false,
            dataName: "",
            desc: ""
        }
    );

    const [fastAddErdDialog, setFastAddErdDialog] = useState(
        {
            open: false,
            dataName: "",
            desc: "",
            erdData: {nodes: [], edges: [], groups: []}
        });

    const [nodes, setNodes] = useState([{
        id: "",
        type: "",
        label: ""
    }]);

    const [edges, setEdges] = useState([{
        id: "",
        source: "",
        target: "",
        sourceEntity: "",
        targetEntity: "",
        relation: "",
        relationName: "",
        type: ""
    }]);

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
    }, [userId, emptyErdDialog]);


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


    const handleAccept = () => {
        setEmptyDialog({...emptyErdDialog, open: false});
        let dataId = uuidv4().replace(/-/g, "");
        axios.post("http://192.168.98.11:8080/erd/user-data/saveErd", {
            userId, dataId,
            desc: emptyErdDialog.desc,
            name: emptyErdDialog.dataName,
        })
            .then((res) => {
                if (true === res.data.success) {
                    history.push("/app/" + userId + "/" + dataId)
                }
            })
    };

    const fastAddAccept = () => {
        let erdData = {nodes: nodes, edges: edges, groups: []};
        setFastAddErdDialog({...fastAddErdDialog, open: false});
        let dataId = uuidv4().replace(/-/g, "");

        axios.post("http://192.168.98.11:8080/erd/user-data/saveErd", {
            userId, dataId,
            desc: fastAddErdDialog.desc,
            name: fastAddErdDialog.dataName,
            data: JSON.stringify(erdData)
        })
            .then((res) => {
                if (true === res.data.success) {
                    history.push("/app/" + userId + "/" + dataId)
                }
            })
    };

    const handleChange = (e) => {
        setEmptyDialog({...emptyErdDialog, [e.target.name]: e.target.value});
    };

    const fastErdChange = (e) => {
        setFastAddErdDialog({...fastAddErdDialog, [e.target.name]: e.target.value})
    };

    const entityChange = index => e => {
        let newEntity = [...nodes];
        let node = {
            id: "node-" + uuidv4(),
            type: "entity",
            label: ""
        };
        node.label = e.target.value;
        newEntity[index] = node;
        setNodes(newEntity);
    };


    const relationChange = index => e => {
        let newRelation = [...edges];
        let edge = newRelation[index];
        edge.id = "edge-" + uuidv4();
        edge.type = "relation";
        if (e.target.name === "source") {
            edge.source = e.target.value;
        }
        if (e.target.name === "target") {
            edge.target = e.target.value;
        }
        if (e.target.name === "relation") {
            edge.relation = e.target.value;
            switch (e.target.value) {
                case "1to1":
                    edge.sourceEntity = "1";
                    edge.targetEntity = "1";
                    break;
                case "1toN":
                    edge.targetEntity = "N";
                    edge.sourceEntity = "1";
                    break;
                case "NtoN" :
                    edge.sourceEntity = "N";
                    edge.targetEntity = "N";
                    break;
                default:
                    break;
            }
        }
        if (e.target.name === "relationName") {
            edge.relationName = e.target.value;
        }
        newRelation[index] = edge;
        setEdges(newRelation);
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
                        <Button variant="outlined"
                                href="/classErd"
                                style={{color: "white", marginRight: 5}}>
                            快速创建实体属性图
                        </Button>
                        <Button variant="outlined"
                                onClick={() => setFastAddErdDialog({...fastAddErdDialog, open: true})}
                                style={{color: "white", marginRight: 5}}>
                            快速创建实体联系图
                        </Button>
                        <FastAddERD erdData={fastAddErdDialog}
                                    handleClose={() => {
                                        setFastAddErdDialog({...fastAddErdDialog, open: false})
                                    }}
                                    handleAccept={fastAddAccept}
                                    onChange={fastErdChange}
                                    entityChange={entityChange}
                                    relationChange={relationChange}
                                    nodes={nodes}
                                    edges={edges}
                                    addRelation={() => {
                                        setEdges([...edges, {
                                            id: "",
                                            source: "",
                                            target: "",
                                            sourceEntity: "",
                                            targetEntity: "",
                                            relation: "",
                                            type: "",
                                            relationName: ""
                                        }])
                                    }}
                                    addEntity={() => {
                                        setNodes([...nodes, {
                                            id: "",
                                            type: "",
                                            label: ""
                                        }])
                                    }}
                                    removeEntity={(index0) => {
                                        setNodes(nodes.filter((item, index) => index !== index0))
                                    }}
                                    removeRelation={(index0) => {
                                        setEdges(edges.filter((item, index) => index !== index0))
                                    }}
                        />
                        <Button variant="outlined"
                                onClick={() =>
                                    setEmptyDialog({...emptyErdDialog, open: true})}
                                style={{color: "white"}}
                        >
                            新建E-R图
                        </Button>
                        <AddEmptyErd erdData={emptyErdDialog}
                                     handleClose={() => {
                                         setEmptyDialog({...emptyErdDialog, open: false})
                                     }}
                                     onChange={handleChange}
                                     handleAccept={handleAccept}
                        />
                    </Toolbar>
                </AppBar>
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
                                        image={process.env.PUBLIC_URL + '/erdphoto.jpg'}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2" defaultValue="Title">
                                            {diagram.dataName}
                                        </Typography>
                                        <Typography defaultValue="description">
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
                <Copyright/>
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}