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
//taskの編集
//-----------------------------------

export const editTask = async (submitData: {
  id: string;
  title: string;
  completed: boolean;
}): Promise<void> => {
  const { id, title, completed } = submitData;
  const dateTime = firebase.firestore.Timestamp.fromDate(new Date());
  try {
    await db
      .collection("tasks")
      .doc(id)
      //mergeの意味は中身がある時は、更新する
      .set({ title, completed, dateTime }, { merge: true });
  } catch (error) {
    console.log("Error updating document", error);
  }
};
//-----------------------------------
//taskの削除
//-----------------------------------
export const deleteTask = async (id: string): Promise<void> => {
  try {
    await db.collection("tasks").doc(id).delete();
  } catch (error) {
    console.log("Error removing document:", error);
  }
};

export const taskSlice = createSlice({
  //作成するsliceの名前 actionTypeを生成するときにprefixとなる。
  name: "task",
  // このsliceで用いるinitialStateの値
  initialState,
  // reducersの中身を記述
  reducers: {
    //どのtaskを選択しているか管理
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    //Modalを開くか閉じるかの管理
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
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
export const { handleModalOpen, selectTask } = taskSlice.actions;

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
