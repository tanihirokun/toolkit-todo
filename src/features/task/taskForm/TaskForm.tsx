import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TaskForm.module.scss";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import {createTask, handleModalOpen, selectSelectedTask, editTask, fetchTasks} from '../taskSlice'
import {AppDispatch} from '../../../app/store'

type Input = {
  taskTitle: string;
};

type Props = {
  edit?: boolean;
}

export const TaskForm: FC<Props> = ({edit}) => {
  const dispatch: AppDispatch = useDispatch();
  const selectedTask = useSelector(selectSelectedTask)

  const { register, handleSubmit, reset } = useForm<Input>();

  const handleCreate = async (data: Input) => {
    //data.taskTitleこの引数が action.payloadに渡される
    await createTask(data.taskTitle);
    reset();
    dispatch(fetchTasks());
  }
  const handleEdit = (data: Input) => {
    const sendData = {...selectedTask ,title: data.taskTitle}
    dispatch(editTask(sendData))
    dispatch(handleModalOpen(false))
  }

  return (
    <div className={styles.root}>
      <form
        className={styles.form}
        //editがtrueならhandleEditの処理が走り、falseならonSubmitが走る
        onSubmit={edit ? handleSubmit(handleEdit) : handleSubmit(handleCreate)}
      >
        <TextField
          id="outlined-basic"
          label={edit ? 'Edit Task' : "New Task"}
          defaultValue={edit ? selectedTask.title : ''}
          variant="outlined"
          className={styles.text_field}
          {...register("taskTitle", { required: true })}
        />
        {edit ?
          (<div className={styles.button_wrapper}>
            <button type="submit" className={styles.submit_button}>Submit</button>
            <button type="button" onClick={()=> dispatch(handleModalOpen(false))} className={styles.cancel_button}>Cancel</button>
          </div>)
         : null}
      </form>
    </div>
  );
};
