import React,{useEffect} from "react";
import { useDispatch } from "react-redux";
import styles from"./App.module.scss";

import { Header } from "./compornents/header/Header";
import { TaskForm } from "./features/task/taskForm/TaskForm";
import { TaskList } from "./features/task/taskList/TaskList";
import { fetchTasks } from "./features/task/taskSlice";
import { AppDispatch } from "./app/store";
import { auth } from "./firebase";
import {useNavigate} from 'react-router-dom'

function App() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  //ログインしていない人が直接HOME画面に行かないための処理
  useEffect(() => {
    auth.onAuthStateChanged((user) =>{
      //渡される引数はユーザー情報　それがなかったらページ変える
      !user && navigate('/user-auth')
    }
  )},[])

  useEffect(() => {
    const getData= ()=> {
      dispatch(fetchTasks())
    };
    getData();
  }, [])
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Header />
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
