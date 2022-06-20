import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    'history': []
}

export const guessHistorySlice = createSlice({
    name: 'guessHistory',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        addGuess: (state, action) => {
            const guess = action.payload;
            state['history'].push(guess);
        },
        resetHistoryState: (state) => {
            state['history'] = [];
        }
    }
});

export const { addGuess, resetHistoryState } = guessHistorySlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGuessHistory = (state) => state;
export default guessHistorySlice.reducer;
