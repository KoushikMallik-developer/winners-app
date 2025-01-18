// src/store/walletSlice.js
import { createSlice } from '@reduxjs/toolkit'

const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        balance: 1000,
        transactions: [],
    },
    reducers: {
        addMoney: (state, action) => {
            state.balance += action.payload
            state.transactions.push({
                type: 'deposit',
                amount: action.payload,
                timestamp: new Date().toISOString(),
            })
        },
        withdrawMoney: (state, action) => {
            state.balance -= action.payload
            state.transactions.push({
                type: 'withdraw',
                amount: action.payload,
                timestamp: new Date().toISOString(),
            })
        },
        updateBalance: (state, action) => {
            state.balance = action.payload
        },
    },
})

export const { addMoney, withdrawMoney, updateBalance } = walletSlice.actions
export default walletSlice.reducer
