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
import axios from 'axios';
import {useHistory} from 'react-router-dom';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="">
                Your Website
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignupPage(props) {
    const classes = useStyles();
    // const [userId,setUserId] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://192.168.98.11:8080/erd/user/addUser', {name, password})
            .then((response) => {
                let userId = response.data.data;
                if (response.data.success === true) {
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
                    注册
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>


                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="用户名"
                                name="name"
                                autoComplete="name"
                                onChange={(event) => setName(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="密码"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </Grid>
                        {/*                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                label="接受用户协议"
                            />
                        </Grid>*/}
                    </Grid>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        注册
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                已注册？登录
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}