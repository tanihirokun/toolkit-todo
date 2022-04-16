import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

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
    //taskの編集
    editTask: (state, action) => {
      //state.tasksの中から指定したtaskを抜き出す
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        //抜き出したtaskのtitleを書き換える
        task.title = action.payload.title;
      }
    },
    //taskの削除
    deleteTask: (state,action) => {
      //指定したtask以外で新しくstate.tasksの配列を作成し直している
      state.tasks= state.tasks.filter((t) => t.id !== action.payload.id)
    },
    //どのtaskを選択しているか管理
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    //Modalを開くか閉じるかの管理
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    //task完了・未完了のチェック変更
    completeTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        //抜き出したtaskのcompletedを反転させる
        task.completed = !task.completed;
      }
    },
  },
});

export const {
  createTask,
  handleModalOpen,
  selectTask,
  editTask,
  completeTask,
  deleteTask,
} = taskSlice.actions;

// コンポーネント側からuseSlectorを用いてselectTaskを指定することで
// stateの値をコンポーネントに渡すことが可能
export const selectTasks = (state: RootState): TaskState["tasks"] =>
  state.task.tasks;

export const selectIsModalOpen = (state: RootState): TaskState["isModalOpen"] =>
  state.task.isModalOpen;

export const selectSelectedTask = (
  state: RootState
): TaskState["selectedTask"] => state.task.selectedTask;

export default taskSlice.reducer;
