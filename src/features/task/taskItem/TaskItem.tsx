import React, { VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import { handleModalOpen, selectIsModalOpen, selectTask,deleteTask, editTask, fetchTasks } from "../taskSlice";
import { AppDispatch } from "../../../app/store";

import styles from "./TaskItem.module.scss";
import { TaskForm } from "../taskForm/TaskForm";

interface Props {
  task: {
    id: string;
    title: string;
    completed: boolean;
  };
}
export const TaskItem: VFC<Props> = ({ task }) => {
  //reduxからインポートしたものを使えるようにする
  const isModalOpen = useSelector(selectIsModalOpen);
  const dispatch:AppDispatch = useDispatch();

  const handleOpen = () => {
    //propsにデータが入っているので引数に渡す
    dispatch(selectTask(task));
    dispatch(handleModalOpen(true));
  }
  const handleClose = () => dispatch(handleModalOpen(false));

  const handleEdit =async (id:string, title: string, completed: boolean) => {
    const sendDate = {id, title, completed: !completed};
    await editTask(sendDate);
    dispatch(fetchTasks());
  }
  const handleDelete =async (id:string) => {
    await deleteTask(id);
    dispatch(fetchTasks());
  }

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <EventNoteIcon />
        <div className={styles.title_text}>{task.title}</div>
      </div>
      <div className={styles.right_item}>
        <Checkbox
          checked={task.completed}
          onClick={() => handleEdit(task.id, task.title, task.completed)}
          className={styles.checkbox}
        />
        <button onClick={handleOpen} className={styles.edit_button}>
          <EditIcon className={styles.icon} />
        </button>
        <button
          onClick={() => handleDelete(task.id)}
          className={styles.delete_button}
        >
          <DeleteIcon className={styles.icon} />
        </button>
      </div>
      <Modal open={isModalOpen} onClose={handleClose} className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_title}>Edit</div>
          <TaskForm edit />
        </div>
      </Modal>
    </div>
  );
};
