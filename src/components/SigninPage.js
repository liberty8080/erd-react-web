import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import {useHistory} from "react-router-dom"

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
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {
    const classes = useStyles();
    const history = useHistory();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const login = () => {
        const role = "user";
        axios.get("http://192.168.98.11:8080/erd/login", {params: {username, password, role}})
            .then((res) => {
                let userId = res.data.data;
                if (res.data.success === true) {
                    history.push("/erdList/" + userId)
                }
            })
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    登录
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="用户名"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="密码"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                    {/*    label="记住密码"*/}
                    {/*/>*/}
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={login}
                    >
                        登录
                    </Button>
                    <Grid container>
                        {/*                        <Grid item xs>
                            <Link href="#" variant="body2">
                                忘记密码?
                            </Link>
                        </Grid>*/}
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"没有账号？点击注册"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}