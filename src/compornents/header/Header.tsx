import React, { memo, VFC } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from './Header.module.scss'

export const Header:VFC = memo(() => {
  return (
<Box sx={{ flexGrow: 1 }} className={styles.root}>
      <AppBar position="static" className={styles.app_bar}>
        <Toolbar className={styles.tool_bar}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={styles.title}>
            Redux Toolkit Todo
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
})


