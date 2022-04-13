import React from "react";
import { useDispatch } from "react-redux";
import styles from "./TaskForm.module.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import {createTask} from '../taskSlice'


type Input = {
  taskTitle: string;
};

export const TaskForm = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm<Input>();

  const onSubmit = (data: Input) => {
    //data.taskTitleこの引数が action.payloadに渡される
    dispatch(createTask(data.taskTitle));
    reset();
  }

  return (
    <div className={styles.root}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "95%" },
        }}
        noValidate
        autoComplete="off"
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          id="outlined-basic"
          label="New Task"
          variant="outlined"
          className={styles.text_fieid}
          {...register("taskTitle", { required: true })}
        />
      </Box>
    </div>
  );
};
