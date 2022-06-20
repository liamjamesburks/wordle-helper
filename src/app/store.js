import { configureStore } from '@reduxjs/toolkit';
import alphabetStateReducer from '../features/alphabet-state/alphabetStateSlice';
import guessHistoryReducer from '../features/guess-history/guessHistorySlice';
import wordInputReducer from "../features/word-input-state/wordInputStateSlice";
export const store = configureStore({
  reducer: {
    alphabetState: alphabetStateReducer,
    guessHistory: guessHistoryReducer,
    wordInput: wordInputReducer
  },
});
