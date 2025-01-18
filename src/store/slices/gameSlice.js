// src/store/slices/gameSlice.js
import { createSlice } from '@reduxjs/toolkit'

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        diceSum: {
            stake: 0,
            selectedOption: null,
            diceResults: [],
            gameHistory: [],
            isRolling: false,
        },
        upDownEqual: {
            stake: 0,
            selectedOption: null,
            diceResults: [],
            gameHistory: [],
            isRolling: false,
        },
    },
    reducers: {
        setStake: (state, action) => {
            const { gameType, amount } = action.payload
            state[gameType].stake = amount
        },
        setSelectedOption: (state, action) => {
            const { gameType, option } = action.payload
            state[gameType].selectedOption = option
        },
        setDiceResults: (state, action) => {
            const { gameType, results } = action.payload
            state[gameType].diceResults = results
        },
        addToHistory: (state, action) => {
            const { gameType, gameData } = action.payload
            state[gameType].gameHistory.unshift(gameData)
        },
        setIsRolling: (state, action) => {
            const { gameType, isRolling } = action.payload
            state[gameType].isRolling = isRolling
        },
        resetGame: (state, action) => {
            const { gameType } = action.payload
            state[gameType] = {
                stake: 0,
                selectedOption: null,
                diceResults: [],
                gameHistory: state[gameType].gameHistory, // Preserve game history
                isRolling: false,
            }
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
