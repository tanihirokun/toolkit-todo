import React, { useEffect, useState, VFC } from "react";
import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">
        toolkit todo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

interface AuthDataTypes {
  email: string;
  password: string;
}

const theme = createTheme();

export const UserAuth: VFC = (props: any) => {
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthDataTypes>();
//サインイン画面かサインアップ画面か切り替えをuseStateで管理
  const [isSignIn, setIsSignIn] = useState(true);

  //ログイン処理
  const handleSignIn = async (data: AuthDataTypes) => {
    const {email, password} = data;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigate('/')
    } catch (error: any) {
      alert(error.message)
    }
  }

  //新規登録処理
  const handleSignUp = async (data: AuthDataTypes) => {
    const {email, password} = data;
    try{
      await auth.createUserWithEmailAndPassword(email, password)
      navigate('/')
    } catch(error: any) {
      alert(error.message)
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) =>{
      //渡される引数はユーザー情報　それがなかったらページ変える
      user && navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  )},[])


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignIn ? "ログイン" : "サインイン"}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={isSignIn ? handleSubmit(handleSignIn) : handleSubmit(handleSignUp)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  error={Boolean(errors.email)}
                  helperText={errors.email && errors.email.message}
                  {...register("email", {
                    required: true,
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "正しい形式でアドレスを入力したください",
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={Boolean(errors.password)}
                  helperText={errors.password && errors.password.message}
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 6,
                      message: "パスワードを６文字以上で入力してください",
                    },
                  })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignIn ? "ログインする" : "新規登録する"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => setIsSignIn(!isSignIn)}
                >
                  {isSignIn
                    ? "アカウントをお持ちでない方はこちら"
                    : "アカウントをお持ちの方はこちら"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
