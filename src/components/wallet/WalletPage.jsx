// src/components/wallet/WalletPage.jsx
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMoney, withdrawMoney } from '../../store/slices/walletSlice'
import { useNavigate } from 'react-router-dom'

const WalletPage = () => {
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { balance } = useSelector((state) => state.wallet)
    const { transactions } = useSelector((state) => state.wallet)

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
        <div className="min-h-screen bg-gray-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-white">
                            Wallet
                        </h2>
                        <button
                            onClick={() => navigate('/game')}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            Back to Game
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-gray-700 p-6 rounded-lg">
                                <p className="text-gray-400">Current Balance</p>
                                <p className="text-4xl font-bold text-green-400">
                                    ${balance.toFixed(2)}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full p-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
                                    placeholder="Enter amount"
                                />

                                {error && (
                                    <p className="text-red-500">{error}</p>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() =>
                                            handleTransaction('deposit')
                                        }
                                        className="p-4 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 transition duration-200"
                                    >
                                        Deposit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleTransaction('withdraw')
                                        }
                                        className="p-4 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 transition duration-200"
                                    >
                                        Withdraw
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-4">
                                Recent Transactions
                            </h3>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {transactions.map((tx, index) => (
                                    <div
                                        key={index}
                                        className={`p-3 rounded-lg bg-gray-800 border-l-4 ${
                                            tx.type === 'deposit'
                                                ? 'border-green-500'
                                                : 'border-red-500'
                                        }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-300 capitalize">
                                                {tx.type}
                                            </span>
                                            <span
                                                className={
                                                    tx.type === 'deposit'
                                                        ? 'text-green-400'
                                                        : 'text-red-400'
                                                }
                                            >
                                                {tx.type === 'deposit'
                                                    ? '+'
                                                    : '-'}
                                                ${tx.amount.toFixed(2)}
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-sm">
                                            {new Date(
                                                tx.timestamp
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WalletPage
