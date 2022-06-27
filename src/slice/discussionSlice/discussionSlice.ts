import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../models/i_message";
import { User } from "../../models/i_user";
import { RootState } from "../../store/store";

export interface DiscussionState {
    listMessage: Message[];
    friendSelected: User | null;
};

const initialState: DiscussionState = {
    listMessage: [],
    friendSelected: null
}

export const discussionSlice = createSlice({
    name: 'discussion',
    initialState,
    reducers: {
        sendMessage: (state, action: PayloadAction<Message>) => {
            state.listMessage.push(action.payload);
        },
        getListMessage: (state, action: PayloadAction<Message[]>) => {
            state.listMessage = action.payload
        },
        selectFriendForDiscussion: (state, action: PayloadAction<User>) => {
            console.log("selected friend", action.payload);
            state.friendSelected = action.payload;
        },
    }
});

export const { sendMessage, getListMessage, selectFriendForDiscussion } = discussionSlice.actions;

export const selectListMessage = (state: RootState) => state.discussion.listMessage;
export const selectFriend = (state: RootState) => state.discussion.friendSelected;

export default discussionSlice.reducer;