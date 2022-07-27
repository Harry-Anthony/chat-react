import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RemoteSourceImpl } from "../../data/remote_source_impl";
import { IAuthRepository } from "../../interface/repository/auth/auth_repository";
import { User } from "../../models/i_user";
import { AuthRepository } from "../../repository/auth/auth_repository";
import { RootState } from "../../store/store";
import { LoginStatus } from "./login_enum";


export enum InputType {
  login,
  register
}
export interface AuthState {
  status: LoginStatus,
  user: User | null,
  inputType: InputType
  errorMessage: string | null
}

const initialState: AuthState = {
  status: LoginStatus.initial,
  user: null,
  inputType: InputType.login,
  errorMessage: ""
}

let repository: IAuthRepository = new AuthRepository(new RemoteSourceImpl());

interface LoginData {
  mail: string,
  password: string,
}

interface RegisterData {
  name: string,
  mail: string,
  password: string,
}

export const login = createAsyncThunk(
  'auth/login',
  async (loginData: LoginData) => {
    const response = await repository.login(loginData.mail, loginData.password);
    return response.data;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (registerData: RegisterData) => {
    const response = await repository.register(registerData.name, registerData.mail, registerData.password);
    return response.data;
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInputType: (state, action: PayloadAction<InputType>) => {
      state.inputType = action.payload;
    }
  },

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

    builder.addCase(register.pending, (state) => {
      state.status = LoginStatus.loading;
    }).addCase(register.fulfilled, (state, action) => {
      const payload = action.payload;
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", payload.token)
      localStorage.setItem("user", JSON.stringify(payload.user));
      state.status = LoginStatus.success;
      state.user = payload.user;
    }).addCase(register.rejected, (state, action) => {
      if(action.error.message?.includes("401")) {
        state.errorMessage = "Mail déjà utilisé";
      } else {
        state.errorMessage = "une erreur est survenue du server";
      }
      state.status = LoginStatus.error;
    })
  },
});




export const { setInputType } = authSlice.actions;

export const loginStatus = (state: RootState) => state.auth.status
export const selectInputType = (state: RootState) => state.auth.inputType;
export const selectUser = (state: RootState) => state.auth.user
export const selectErrorMessage = (state: RootState) => state.auth.errorMessage


export default authSlice.reducer;
