import { createSlice,  } from "@reduxjs/toolkit";
import { RootState,  } from "../../app/store";

interface TaskState {
  //taskが何個あるか管理
  idCount: number;
  //storeに保存するtask一覧
  tasks: { id: number; title: string; completed: boolean }[];
  //taskのtitleを編集する際にどのtaskが選択されているか
  selectedTask: { id: number; title: string; completed: boolean };
  //Modalを開くか判断
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [{ id: 1, title: "task A", completed: false }],
  selectedTask: { id: 0, title: "", completed: false },
  isModalOpen: false,
};

export const taskSlice = createSlice({
  //作成するsliceの名前 actionTypeを生成するときにprefixとなる。
  name: "task",
  // このsliceで用いるinitialStateの値
  initialState,
  // reducersの中身を記述
  reducers: {
    //taskの作成
    createTask: (state, action) => {
      //idCountをプラス
      state.idCount++;
      //新しいtaskを作る
      const newTask = {
        id: state.idCount,
        //TaskFormフォルダの dispatch(createTask(data.taskTitle));のデータが渡ってくる
        title: action.payload,
        completed: false,
      };
      //今までのタスクと合体
      state.tasks = [newTask, ...state.tasks];
    },
  },
});

export const { createTask } = taskSlice.actions;

// コンポーネント側からuseSlectorを用いてselectTaskを指定することで
// stateの値をコンポーネントに渡すことが可能
export const selectTask = (state: RootState): TaskState["tasks"] =>
  state.task.tasks;

export default taskSlice.reducer;
