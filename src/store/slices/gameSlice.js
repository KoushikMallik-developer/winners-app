// src/store/gameSlice.js
import { createSlice } from '@reduxjs/toolkit'

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        stake: 0,
        selectedOption: null,
        diceResults: [],
        gameHistory: [],
        isRolling: false,
    },
    reducers: {
        setStake: (state, action) => {
            state.stake = action.payload
        },
        setSelectedOption: (state, action) => {
            state.selectedOption = action.payload
        },
        setDiceResults: (state, action) => {
            state.diceResults = action.payload
        },
        addToHistory: (state, action) => {
            state.gameHistory.unshift(action.payload)
        },
        setIsRolling: (state, action) => {
            state.isRolling = action.payload
        },
        resetGame: (state) => {
            state.stake = 0
            state.selectedOption = null
            state.diceResults = []
            state.isRolling = false
        },
    },
})

export const {
    setStake,
    setSelectedOption,
    setDiceResults,
    addToHistory,
    setIsRolling,
    resetGame,
} = gameSlice.actions
export default gameSlice.reducer
