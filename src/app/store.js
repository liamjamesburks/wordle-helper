import { configureStore } from '@reduxjs/toolkit';
import alphabetStateReducer from '../features/alphabet-state/alphabetStateSlice';
import guessHistoryReducer from '../features/guess-history/guessHistorySlice';


export const store = configureStore({
  reducer: {
    alphabetState: alphabetStateReducer,
    guessHistory: guessHistoryReducer
  },
});
