import React, { memo, VFC } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from './Header.module.scss'
import {auth} from '../../firebase'
import { useNavigate } from 'react-router-dom';

export const Header:VFC = memo(() => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/user-auth')
    } catch (error: any) {
      alert(error.message)
    }
  }
  return (
<Box sx={{ flexGrow: 1 }} className={styles.root}>
      <AppBar position="static" className={styles.app_bar}>
        <Toolbar className={styles.tool_bar}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={styles.title}>
            Redux Toolkit Todo
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
})


