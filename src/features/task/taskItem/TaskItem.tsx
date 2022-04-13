import React, { VFC } from 'react'
import Checkbox from '@mui/material/Checkbox';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './TaskItem.module.scss'

interface Props {
  task: {
    id: number;
    title: string;
    completed: boolean;
  }
}

export const TaskItem: VFC<Props> = ({task}) => {

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <EventNoteIcon/>
        <div className={styles.title_text}>{task.title}</div>
      </div>
      <div className={styles.right_item}>
      <Checkbox
        checked={task.completed}
        onClick={() => console.log(`check ${task.id}`)}
        className={styles.checkbox}
      />
      <button onClick={() => console.log(`edit ${task.id}`)} className={styles.edit_button}>
        <EditIcon className={styles.icon}/>
      </button>
      <button onClick={() => console.log(`delete ${task.id}`)} className={styles.delete_button}>
        <DeleteIcon className={styles.icon}/>
      </button>
      </div>
    </div>
  )
}


