import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { Message } from "../../models/i_message";
import { User } from "../../models/i_user";
import { ChatRepository } from "../../refact/repository/chat_repository";
import { AppState } from "../../refact/tools/enum/app_enum";
import { RootState } from "../../store/store";

export interface DiscussionState {
    listMessage: any[];
    chatList: any;
    friendSelected: any | null;
    discDataState: AppState;
    chatDataState: AppState;
    anotherMessageState: AppState;
};

const initialState: DiscussionState = {
    discDataState: AppState.initial,
    listMessage: [],
    friendSelected: null,
    chatList: {
        allMessage: []
    },
    chatDataState: AppState.initial,
    anotherMessageState: AppState.initial
}

export const chatRepository = new ChatRepository();


export const getAllDiscussion = createAsyncThunk(
    'message/chat',
    async (user: string) => {
        // await new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve("200")
        //     }, 3000);
        // })
        const result = await chatRepository.getUserDiscussion(user);
        return result.data;
    }
)

export const getLastMessage = createAsyncThunk(
    'message/lastMessage',
    async ({ firstId, secondId, lastIndex }: { firstId: string, secondId: string, lastIndex: any }) => {
        // await new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve("200")
        //     }, 3000);
        // });
        const result = await chatRepository.getLastMessage({ firstId, secondId, lastIndex });
        return result.data;
    }
)

export const getAnotherMessage = createAsyncThunk(
    'message/anotherMessage',
    async ({ firstId, secondId, lastIndex }: { firstId: string, secondId: string, lastIndex: any }) => {
        // await new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve("200")
        //     }, 3000);
        // });
        const result = await chatRepository.getLastMessage({ firstId, secondId, lastIndex });
        return result.data;
    }
)

export const discussionSlice = createSlice({
    name: 'discussion',
    initialState,
    reducers: {
        setChatList: (state, action: PayloadAction<any>) => {
            state.chatList.allMessage = action.payload.allMessage;
            state.chatList.count = action.payload.count;
        },
        addMessage: (state, action: PayloadAction<any>) => {
            let index = state.listMessage.findIndex((value) => value.friend._id === state.friendSelected?._id);
            if(index >=0 ){
                state.listMessage[index].friend.count++;
            }
            state.chatList.allMessage.push(action.payload);
            state.chatList.count++;
        },
        handleDiscussion: (state, action: PayloadAction<any>) => {
            let newMessage = action.payload;
            let tempFriend: any = null;
            let user = JSON.parse(localStorage.getItem("user")!);
            if (user._id != newMessage.userReceiver._id) {
                tempFriend = newMessage.userReceiver
            } else {
                tempFriend = newMessage.userSender
            }
            let allMessage = [];
            let index = state.listMessage.findIndex((value) => value.friend._id === state.friendSelected?._id);
            if (index >= 0) {
                allMessage = state.listMessage[index].friend.allMessage
                allMessage.push(action.payload)
            } else {
                // if friend is not available inside the discussion
                allMessage = [action.payload]
                tempFriend.count = 1;
            }
            let tempList = state.listMessage.filter((value) => value.friend._id != tempFriend._id);
            tempFriend = {...tempFriend, allMessage}
            let itemFriend = {
                friend: tempFriend,
                message: action.payload,
            }
            tempList.push(itemFriend);
            state.listMessage = tempList;
        },
        selectFriendForDiscussion: (state, action: PayloadAction<User>) => {
            if (state.friendSelected && state.friendSelected._id != action.payload._id) {
                state.chatList.allMessage = [];
            }
            state.friendSelected = action.payload;
        },
        resetDiscussionSlice: () => {
            return initialState
        }
    },
    extraReducers: (builder) => {

        // case for discussion
        builder.addCase(getAllDiscussion.pending, (state) => {
            state.discDataState = AppState.loading;
        })
            .addCase(getAllDiscussion.fulfilled, (state, action) => {
                if (action.payload.messages) {
                    state.listMessage = action.payload.messages.discussion;
                } else {
                    state.listMessage = [];
                }
                state.discDataState = AppState.success;
            })
            .addCase(getAllDiscussion.rejected, (state, action) => {
                state.discDataState = AppState.error;
                console.log("list message rejected", action.payload)
            });

        // case for chat
        builder.addCase(getLastMessage.pending, (state) => {
            state.chatDataState = AppState.loading;
        })
            .addCase(getLastMessage.fulfilled, (state, action) => {
                // let payload = action.payload.discussion;
                let count = 0;
                if (action.payload.discussion) { 
                    count = action.payload.discussion.count;
                    state.chatList.allMessage = action.payload.discussion.allMessage;
                    state.chatList.count = count
                } else {
                    state.chatList.allMessage = [];
                    state.chatList.count = 0;
                }
                let index = state.listMessage.findIndex((value) => value.friend._id === state.friendSelected?._id);
                if (index >= 0) {
                    state.listMessage[index].friend.allMessage = state.chatList.allMessage;
                    state.listMessage[index].friend.count = count;
                }
                state.chatDataState = AppState.success;
            })
            .addCase(getLastMessage.rejected, (state, action) => {
                state.chatDataState = AppState.error;
            });
        builder.addCase(getAnotherMessage.pending, (state) => {
                state.anotherMessageState = AppState.loading;
            })
            .addCase(getAnotherMessage.fulfilled, (state, action) => {
                let payload = action.payload.discussion;
                state.anotherMessageState = AppState.success;
                state.chatList.allMessage = [...payload.allMessage, ...state.chatList.allMessage];
                let index = state.listMessage.findIndex((value) => value.friend._id === state.friendSelected?._id);
                if (index >= 0) {
                    state.listMessage[index].friend.allMessage = state.chatList.allMessage;
                }
            })
            .addCase(getAnotherMessage.rejected, (state, action) => {
                state.chatDataState = AppState.error;
            });
    }
});

export const { addMessage, selectFriendForDiscussion, setChatList, handleDiscussion, resetDiscussionSlice } = discussionSlice.actions;

export const selectListMessage = (state: RootState) => state.discussion.listMessage;
export const selectChatList = (state: RootState) => state.discussion.chatList;
export const selectFriend = (state: RootState) => state.discussion.friendSelected;
export const selectDiscussionState = (state: RootState) => state.discussion.discDataState;
export const selectChatDataState = (state: RootState) => state.discussion.chatDataState;
export const selectAnotherMessageState = (state: RootState) => state.discussion.anotherMessageState;




export default discussionSlice.reducer;

