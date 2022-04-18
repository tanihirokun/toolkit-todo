import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { db } from "../../firebase";
import firebase from "firebase/compat/app";

interface TaskState {
  //taskが何個あるか管理
  idCount: number;
  //storeに保存するtask一覧
  tasks: { id: string; title: string; completed: boolean }[];
  //taskのtitleを編集する際にどのtaskが選択されているか
  selectedTask: { id: string; title: string; completed: boolean };
  //Modalを開くか判断
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [],
  selectedTask: { id: "", title: "", completed: false },
  isModalOpen: false,
};

//-----------------------------------
//taskの全権取得
//-----------------------------------
export const fetchTasks = createAsyncThunk("task/getAllTasks", async () => {
  //日付の降順（新しいデータが上に来る）にデータをソートしてtaskのデータを全件取得
  //db.collectionはcloud firebaseのコレクションでつけた名前
  //orderByは作られた中身のdateTime
  const res = await db.collection("tasks").orderBy("dateTime", "desc").get();

  //レスポンスの生成
  const allTasks = res.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    completed: doc.data().completed,
  }));

  const taskNumber = allTasks.length;
  const passData = { allTasks, taskNumber };
  return passData;
});
//-----------------------------------
//taskの新規作成
//-----------------------------------
export const createTask = async (title: string) => {
  try {
    const dateTime = firebase.firestore.Timestamp.fromDate(new Date());
    await db
      .collection("tasks")
      .add({ title: title, completed: false, dateTime: dateTime });
  } catch (error) {
    console.log("Error writing document:", error);
  }
};

//-----------------------------------
//taskの新規作成
//-----------------------------------



export const taskSlice = createSlice({
  //作成するsliceの名前 actionTypeを生成するときにprefixとなる。
  name: "task",
  // このsliceで用いるinitialStateの値
  initialState,
  // reducersの中身を記述
  reducers: {
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
    deleteTask: (state, action) => {
      //指定したtask以外で新しくstate.tasksの配列を作成し直している
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
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
  extraReducers: (builder) => {
    //stateとactionの型が正しく推論されるためにbuilder関数を用いる
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      //action.paylod === return passData
      state.tasks = action.payload.allTasks;
      state.idCount = action.payload.taskNumber;
    });
  },
});
//作ったreducersの中身をexport
export const {
  handleModalOpen,
  selectTask,
  editTask,
  completeTask,
  deleteTask,
} = taskSlice.actions;

// コンポーネント側からuseSlectorを用いてselectTaskを指定することで
// stateの値をコンポーネントに渡すことが可能
//RootStateはstoreからインポート
export const selectTasks = (state: RootState): TaskState["tasks"] =>
  state.task.tasks;

export const selectIsModalOpen = (state: RootState): TaskState["isModalOpen"] =>
  state.task.isModalOpen;

export const selectSelectedTask = (
  state: RootState
): TaskState["selectedTask"] => state.task.selectedTask;

export default taskSlice.reducer;
