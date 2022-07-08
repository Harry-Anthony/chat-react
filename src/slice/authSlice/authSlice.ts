import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RemoteSourceImpl } from "../../data/remote_source_impl";
import { IAuthRepository } from "../../interface/repository/auth/auth_repository";
import { User } from "../../models/i_user";
import { AuthRepository } from "../../repository/auth/auth_repository";
import { RootState } from "../../store/store";
import { LoginStatus } from "./login_enum";


export interface AuthState {
    status: LoginStatus,
    user: User | null
}

const initialState: AuthState = {
    status: LoginStatus.initial,
    user: null
}

let repository:  IAuthRepository = new AuthRepository(new RemoteSourceImpl());

interface LoginData {
    name: string,
    password: string,
}

export const login = createAsyncThunk(
    'auth/login',
    async (loginData: LoginData) => {
      const response = await repository.login(loginData.name, loginData.password);
      return response.data;
    }
  );
  
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
          .addCase(login.pending, (state) => {
            state.status = LoginStatus.loading;
          })
          .addCase(login.fulfilled, (state, action) => {
            const payload = action.payload;
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("token", payload.token)
            localStorage.setItem("user", JSON.stringify(payload.user));
            state.status = LoginStatus.success;
            state.user = payload.user
          })
          .addCase(login.rejected, (state) => {
            state.status = LoginStatus.error;
          });
      },
    });




// export const {login} = authSlice.actions;

export const loginStatus = (state: RootState) => state.auth.status
export const selectUser = (state: RootState) => state.auth.user


export default authSlice.reducer;

