import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserInfo = {
  _id: string;
  username: string;
  email: string;
  role : string 
};

type InitialState = {
  userLogin: UserInfo | null;
  authStatus: boolean;
  searchTerm?: string;
};

const initialState: InitialState = {
  userLogin: null,
  authStatus: false,
  searchTerm : ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<UserInfo>) => {
      state.userLogin = action.payload;
      state.authStatus = true;
    },
    userLogout: (state) => {
      state.userLogin = null;
      state.authStatus = false;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { userLogin, userLogout, setSearchTerm } = userSlice.actions;

export default userSlice.reducer;