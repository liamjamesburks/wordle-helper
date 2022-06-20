import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    'alphabetState': {
        'a': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        'b': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        'c': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        'd': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        'e': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},

        'f': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        'g': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        'h': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        'i': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        'j': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},

        'k': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        'l': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        'm': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        'n': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        'o': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},

        'p': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        'q': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        'r': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        's': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        't': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},

        'u': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        'v': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        'w': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        'x': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
        'y': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},

        'z': { 'state': "unknown", 'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}},
    }
}


export const alphabetStateSlice = createSlice({
    name: 'alphabetState',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        changeLetterState: (state, action) => {
            const { character, index, validLetter, validPosition } = action.payload;

            if (!validLetter) {
                state['alphabetState'][character]['state'] = "invalid";
                state['alphabetState'][character]['possibleIndices'] = [];
            } else {
                state['alphabetState'][character]['state'] = "valid";

                if (validPosition) {
                    // We know that the letter is definitively at the given index
                    state['alphabetState'][character]['possibleIndices'][index] = true;

                    // We need to remove the index as a possible index from every other letter in the alphabet state
                    Object.keys(state['alphabetState']).forEach((key) => {
                        if (key !== character) {
                            delete state['alphabetState'][key]['possibleIndices'][index];
                        }
                    })
                } else {
                    // We know the letter is valid but is definitely not at the current index, so we can remove this index as a possibility
                    delete state['alphabetState'][character]['possibleIndices'][index];

                    // Check if the length of the possible indices is only one, then we know we've found the exact position
                    if (Object.keys(state['alphabetState'][character]['possibleIndices']).length === 1) {
                        state['alphabetState'][character]['possibleIndices'][Object.keys(state['alphabetState'][character]['possibleIndices'])[0]] = true;

                        // We need to remove the index as a possible index from every other letter in the alphabet state
                        Object.keys(state['alphabetState']).forEach((key) => {
                            if (key !== character) {
                                delete state['alphabetState'][key]['possibleIndices'][Object.keys(state['alphabetState'][character]['possibleIndices'])[0]];
                            }
                        })
                    }
                }
            }
        },
        resetAlphabetState: (state) => {
            state['alphabetState'] = {
                'a': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                'b': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                'c': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                'd': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                'e': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },

                'f': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                'g': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                'h': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                'i': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                'j': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },

                'k': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                'l': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                'm': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                'n': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                'o': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },

                'p': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                'q': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                'r': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                's': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                't': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },

                'u': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                'v': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                'w': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                'x': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
                'y': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },

                'z': {
                    'state': "unknown",
                    'possibleIndices': {'0': false, '1': false, '2': false, '3': false, '4': false}
                },
            };
        }
    }
});

export const { changeLetterState, resetAlphabetState } = alphabetStateSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAlphabetState = (state) => state;

export const selectLetterState = (state, letter) => state[letter];

export default alphabetStateSlice.reducer;
