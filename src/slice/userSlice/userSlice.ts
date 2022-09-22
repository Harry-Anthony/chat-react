import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RemoteSourceImpl } from "../../data/remote_source_impl";
import IUserRepository from "../../interface/repository/user/user_repository";
import { User } from "../../models/i_user";
import { UserRepository } from "../../repository/user/user_repository";
import { RootState } from "../../store/store";
import { AppState } from "../../refact/tools/enum/app_enum";


export interface UserState {
    listUser: User[] | null;
    status: AppState;
}

const initialState: UserState = {
    listUser: null,
    status: AppState.initial
}

let repository: IUserRepository = new UserRepository(new RemoteSourceImpl());

export const searchUser = createAsyncThunk(
    'user/searchUser',
    async (keyWord: string) => {
        const response = await repository.searchUser(keyWord);
        if (!response.data) {
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
        },
        resetUserSlice: () => {
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("token")
            localStorage.removeItem("user");
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchUser.pending, (state) => {
            state.status = AppState.loading;
        });
        builder.addCase(searchUser.fulfilled, (state, action) => {
            let users = action.payload.users
            let user = JSON.parse(localStorage.getItem("user")!);

            if (users.length != 0) {
                users = users.filter((e: any) => {
                    return e._id != user?._id
                })
            }
            console.log("users found in search", users);
            state.listUser = users;
            state.status = AppState.success
        })
        builder.addCase(searchUser.rejected, (state) => {
            state.status = AppState.error;
        })
    }
});

export const { updateListUser, resetUserSlice } = userSlice.actions;
export const searchUserStatus = (state: RootState) => state.user.status;
export const selectListUser = (state: RootState) => state.user.listUser;

export default userSlice.reducer;


