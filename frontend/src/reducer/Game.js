import { createSlice } from '@reduxjs/toolkit';

const initialGame = {
    initGame: null,
    winGame: null
}

const gameSlice = createSlice({
    name: 'game',
    initialState: initialGame,
    reducers:{
        setInitGame: (state, action) => {
            state.initGame = action.payload;
        },
        setWinGame: (state, action) => {
            state.winGame = action.payload;
        },
    }
});

const { actions, reducer } = gameSlice;

export const {
    setInitGame,
    setWinGame
} = actions;

export default reducer;
