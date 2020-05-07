import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    AppBar,
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import {v4 as uuid} from 'uuid';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function UserManage() {

    const classes = useStyles();
    const [usersData, setUsersData] = useState([]);
    const [userId, setUserId] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await axios("http://192.168.98.11:8080/erd/user/listUsers")
                .then((res) => {
                    if (res.data.data !== null) {
                        let userData = JSON.parse(res.data.data);
                        setUsersData(userData);
                    }

                });
        };
        fetchData().then();
    }, []);

    const deleteUser = (userId) => {
        axios("http://192.168.98.11:8080/erd/user/deleteUser", {params: {userId}}).then((res) => {
            setUsersData(usersData.filter(u => u.userId !== userId));
            console.info(res.data)
        })
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUserAdd = () => {
        setOpen(false);
        let newUserId = uuid().replace(/-/g, "");
        console.info(newUserId, username, password);
        let newUser = {userId: newUserId, name: username, password};
        axios.post("http://192.168.98.11:8080/erd/user/addUser", newUser)
            .then((res) => {
                if (res.data.success === true) {
                    setUsersData(
                        [newUser, ...usersData]
                    )
                }
            })
    };

    const handleEditClose = () => {
        setEdit(false);
    };

    const handleUserUpdate = () => {
        setEdit(false);
        let newUserInfo = {userId, name: username, password};
        axios.post("http://192.168.98.11:8080/erd/user/updateUser", newUserInfo)
            .then((res) => {
                if (res.data.success === true) {
                    let userArrayTemp = [...usersData];
                    userArrayTemp.map((user, index) => {
                        if (user.userId === userId) {
                            user.name = username;
                            user.password = password;
                            console.log(user)
                        }
                        return null;
                    });
                    setUsersData(userArrayTemp);
                }
            })
    };

    return (
        <div>
            {/*顶栏*/}
            <div>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">
                            用户管理
                        </Typography>
                        <div style={{flex: 1}}/>
                        <Button variant="outlined" style={{color: "white"}} onClick={handleClickOpen}>
                            增加用户
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
            {/*新增用户弹出框*/}
            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">新增用户</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            在此处新增用户
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="用户名"
                            type="text"
                            fullWidth
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="desc"
                            label="密码"
                            type="email"
                            fullWidth
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={handleUserAdd} color="primary">
                            确认
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div>
                <Dialog open={edit} onClose={handleEditClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="add-user-dialog">新增用户</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            在此处编辑用户信息
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="userId"
                            label="用户Id"
                            type="text"
                            fullWidth
                            disabled
                            defaultValue={userId}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="用户名"
                            type="text"
                            fullWidth
                            defaultValue={username}
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="desc"
                            label="密码"
                            type="email"
                            fullWidth
                            defaultValue={password}
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={handleUserUpdate} color="primary">
                            确认
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography>用户ID</Typography></TableCell>
                            <TableCell><Typography>用户名</Typography></TableCell>
                            <TableCell><Typography>用户密码</Typography></TableCell>
                            <TableCell align={"right"}
                                       style={{paddingRight: "60px"}}><Typography>操作</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersData.map((row) => (
                            <TableRow key={row.userId}>
                                <TableCell>{row.userId}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.password}</TableCell>
                                <TableCell align={"right"}>
                                    <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                                        <Button onClick={() => {
                                            setEdit(true);
                                            setUserId(row.userId);
                                            setUsername(row.name);
                                            setPassword(row.password);
                                        }}>编辑</Button>
                                        <Button onClick={() => deleteUser(row.userId)}>删除</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default UserManage;