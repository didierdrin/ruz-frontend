import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversations: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConversations(state, action) {
      state.conversations = action.payload;
    },
  },
});

export const { setConversations } = chatSlice.actions;
export default chatSlice.reducer;
