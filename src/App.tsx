import React from "react";
import styles from"./App.module.scss";

import { Header } from "./compornents/header/Header";
import { TaskForm } from "./features/task/taskForm/TaskForm";
import { TaskList } from "./features/task/taskList/TaskList";

function App() {
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
