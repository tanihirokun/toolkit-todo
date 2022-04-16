import React, { VFC } from 'react'
import { TaskItem } from '../taskItem/TaskItem'
import { useSelector } from 'react-redux'
import {selectTasks} from '../taskSlice'

import styles from './TaskList.module.scss'

export const TaskList: VFC = () => {
  const tasks = useSelector(selectTasks);
  return (
    <div className={styles.root}>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id}/>
      ))}

    </div>
  )
}

