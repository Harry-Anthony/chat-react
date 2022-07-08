import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RemoteSourceImpl } from "../../data/remote_source_impl";
import IUserRepository from "../../interface/repository/user/user_repository";
import { User } from "../../models/i_user";
import { UserRepository } from "../../repository/user/user_repository";
import { RootState } from "../../store/store";
import { LoginStatus } from "../authSlice/login_enum";


export interface UserState {
    listUser: User[] | null;
    status: LoginStatus;
}

const initialState: UserState = {
    listUser: null,
    status: LoginStatus.initial
}

let repository: IUserRepository = new UserRepository(new RemoteSourceImpl());

export const searchUser = createAsyncThunk(
    'user/searchUser',
    async (keyWord: string) => {
        const response = await repository.searchUser(keyWord);
        if(!response.data) {
            return []
        }
        return response.data
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateListUser: (state) => {
            state.listUser = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchUser.pending, (state) => {
            state.status = LoginStatus.loading;
        });
        builder.addCase(searchUser.fulfilled, (state, action) => {
            state.listUser = action.payload.users;
            state.status = LoginStatus.success
        })
        builder.addCase(searchUser.rejected, (state) => {
            state.status = LoginStatus.error;
        })
    }
});

export const {updateListUser} = userSlice.actions;
export const searchUserStatus = (state: RootState) => state.user.status;
export const selectListUser = (state: RootState) => state.user.listUser;

export default userSlice.reducer;


