// src/components/game/WalletSection.jsx
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMoney, withdrawMoney } from '../../store/slices/walletSlice'
import { Link } from 'react-router-dom'

const WalletSection = () => {
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const { balance } = useSelector((state) => state.wallet)

    const handleTransaction = (type) => {
        const value = Number(amount)
        if (!value || value <= 0) {
            setError('Please enter a valid amount')
            return
        }

        if (type === 'withdraw' && value > balance) {
            setError('Insufficient balance')
            return
        }

        if (type === 'deposit') {
            dispatch(addMoney(value))
        } else {
            dispatch(withdrawMoney(value))
        }

        setAmount('')
        setError('')
    }

    return (
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
            <Link to="/wallet">
                <h3 className="text-2xl font-bold text-white mb-4">Wallet</h3>
            </Link>
            <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-400">Current Balance</p>
                    <p className="text-3xl font-bold text-green-400">
                        ₹{balance.toFixed(2)}
                    </p>
                </div>

                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter amount"
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => handleTransaction('deposit')}
                        className="p-3 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 transition duration-200"
                    >
                        Deposit
                    </button>
                    <button
                        onClick={() => handleTransaction('withdraw')}
                        className="p-3 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 transition duration-200"
                    >
                        Withdraw
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WalletSection
