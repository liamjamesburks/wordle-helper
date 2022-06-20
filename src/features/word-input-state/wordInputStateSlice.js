import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    'input' : {
        '0': { 'letter': '', 'colour': null },
        '1': { 'letter': '', 'colour': null },
        '2': { 'letter': '', 'colour': null },
        '3': { 'letter': '', 'colour': null },
        '4': { 'letter': '', 'colour': null },
    }
}

export const wordInputSlice = createSlice({
    name: 'wordInput',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        changeLetter: (state, action) => {
            state['input'][action.payload.position]['letter'] = action.payload.letter;
        },
        changeColour: (state, action) => {
            state['input'][action.payload.position]['colour'] = action.payload.colour;
        },
        resetState: (state) => {
            state['input'] =
            {
                '0': { 'letter': '', 'colour': null },
                '1': { 'letter': '', 'colour': null },
                '2': { 'letter': '', 'colour': null },
                '3': { 'letter': '', 'colour': null },
                '4': { 'letter': '', 'colour': null },
            }
        }
    }
});

export const { changeLetter, changeColour, resetState } = wordInputSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectWordInput = (state) => state;
export default wordInputSlice.reducer;
