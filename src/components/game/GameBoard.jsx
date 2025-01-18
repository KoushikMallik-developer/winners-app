// src/components/game/GameBoard.jsx
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    setStake,
    setSelectedOption,
    setDiceResults,
    addToHistory,
    setIsRolling,
    resetGame,
} from '../../store/slices/gameSlice'
import { updateBalance } from '../../store/slices/walletSlice'
import {
    Dice1,
    Dice2,
    Dice3,
    Dice4,
    Dice5,
    Dice6,
    ArrowUp,
    ArrowDown,
    Minus,
    Equal,
} from 'lucide-react'
import WalletSection from './WalletSection.jsx'
import GameHistory from './GameHistory.jsx'

const STAKE_OPTIONS = [
    10, 50, 100, 200, 500, 1000, 5000, 10000, 20000, 50000, 100000, 500000,
]

const GameBoard = () => {
    const dispatch = useDispatch()
    const { stake, selectedOption, diceResults, isRolling } = useSelector(
        (state) => state.game
    )
    const { balance } = useSelector((state) => state.wallet)
    const [error, setError] = useState('')

    const diceIcons = {
        1: Dice1,
        2: Dice2,
        3: Dice3,
        4: Dice4,
        5: Dice5,
        6: Dice6,
    }

    const handleStakeChange = (value) => {
        if (value > balance) {
            setError('Insufficient balance')
            return
        }
        setError('')
        dispatch(setStake(Number(value)))
    }

    const handleOptionSelect = (option) => {
        dispatch(setSelectedOption(option))
    }

    const rollDice = () => {
        if (!stake || !selectedOption) {
            setError('Please set stake and select an option')
            return
        }
        if (stake > balance) {
            setError('Insufficient balance')
            return
        }

        dispatch(setIsRolling(true))

        // Simulate dice rolling animation
        const rollInterval = setInterval(() => {
            const dice1 = Math.floor(Math.random() * 6) + 1
            const dice2 = Math.floor(Math.random() * 6) + 1
            dispatch(setDiceResults([dice1, dice2]))
        }, 100)

        // Stop rolling after 2 seconds and calculate result
        setTimeout(() => {
            clearInterval(rollInterval)
            const finalDice1 = Math.floor(Math.random() * 6) + 1
            const finalDice2 = Math.floor(Math.random() * 6) + 1
            const sum = finalDice1 + finalDice2
            dispatch(setDiceResults([finalDice1, finalDice2]))

            let won = false
            let winAmount = 0

            if (selectedOption === 'up' && sum > 6) {
                won = true
                winAmount = stake * 1.8
            } else if (selectedOption === 'down' && sum < 6) {
                won = true
                winAmount = stake * 1.8
            } else if (selectedOption === 'equal' && sum === 6) {
                won = true
                winAmount = stake * 5.8
            }

            const newBalance = won
                ? balance + winAmount - stake
                : balance - stake
            dispatch(updateBalance(newBalance))

            dispatch(
                addToHistory({
                    stake,
                    option: selectedOption,
                    diceResults: [finalDice1, finalDice2],
                    sum,
                    won,
                    winAmount: won ? winAmount : 0,
                    timestamp: new Date().toISOString(),
                })
            )

            dispatch(setIsRolling(false))
            setTimeout(() => dispatch(resetGame()), 2000)
        }, 2000)
    }

    const DiceComponent = ({ value }) => {
        const Icon = diceIcons[value] || Dice1
        return <Icon size={64} className="text-white" />
    }

    return (
        <div className="min-h-screen bg-gray-900 p-4 md:p-8">
            {/* Mobile Wallet Display */}
            <div className="lg:hidden bg-gray-800 rounded-lg shadow-xl p-4 mb-4">
                <div className="flex justify-between items-center">
                    <span className="text-white">Balance:</span>
                    <span className="text-2xl font-bold text-green-400">
                        ${balance.toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="bg-gray-800 rounded-lg shadow-xl p-4 md:p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-white">
                            Winners Game
                        </h2>
                        <div className="hidden lg:block text-white">
                            Balance:{' '}
                            <span className="font-bold text-green-400">
                                ${balance.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-gray-700 p-4 md:p-6 rounded-lg">
                            <h3 className="text-xl text-white mb-4">
                                Select Stake Amount
                            </h3>
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                {STAKE_OPTIONS.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() =>
                                            handleStakeChange(amount)
                                        }
                                        className={`p-2 rounded-lg font-bold transition duration-200 ${
                                            stake === amount
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                        }`}
                                    >
                                        ${amount.toLocaleString()}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="bg-gray-800 rounded-lg shadow-xl p-8">
                                    <div className="flex justify-center items-center mb-8">
                                        <h2 className="text-3xl font-bold text-white">
                                            Try Hard, Win Big.
                                        </h2>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="bg-gray-700 p-6 rounded-lg">
                                            <h3 className="text-xl text-white mb-4">
                                                Place Your Bet
                                            </h3>
                                            <h5
                                                className="w-full p-3 rounded bg-gray-600 text-white border border-gray-500 focus:border-blue-500 focus:outline-none"
                                                max={balance}
                                            >
                                                {stake}
                                            </h5>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <button
                                                onClick={() =>
                                                    handleOptionSelect('up')
                                                }
                                                className={`p-6 rounded-lg font-bold text-lg transition duration-200 flex flex-col items-center ${
                                                    selectedOption === 'up'
                                                        ? 'bg-green-600 text-white'
                                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                }`}
                                            >
                                                <ArrowUp size={32} />
                                                <span className="mt-2">
                                                    Up (1.8x)
                                                </span>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleOptionSelect('equal')
                                                }
                                                className={`p-6 rounded-lg font-bold text-lg transition duration-200 flex flex-col items-center ${
                                                    selectedOption === 'equal'
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                }`}
                                            >
                                                <Equal size={32} />
                                                <span className="mt-2">
                                                    Equal (5.8x)
                                                </span>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleOptionSelect('down')
                                                }
                                                className={`p-6 rounded-lg font-bold text-lg transition duration-200 flex flex-col items-center ${
                                                    selectedOption === 'down'
                                                        ? 'bg-red-600 text-white'
                                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                }`}
                                            >
                                                <ArrowDown size={32} />
                                                <span className="mt-2">
                                                    Down (1.8x)
                                                </span>
                                            </button>
                                        </div>

                                        {error && (
                                            <div className="text-red-500 text-center font-bold">
                                                {error}
                                            </div>
                                        )}

                                        <div className="flex justify-center space-x-8">
                                            {diceResults.map((value, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-700 p-4 rounded-lg animate-bounce"
                                                    style={{
                                                        animationDelay: `${index * 0.2}s`,
                                                    }}
                                                >
                                                    <DiceComponent
                                                        value={value}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            onClick={rollDice}
                                            disabled={isRolling}
                                            className={`w-full p-4 rounded-lg font-bold text-xl transition duration-200 ${
                                                isRolling
                                                    ? 'bg-gray-600 cursor-not-allowed'
                                                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                                            }`}
                                        >
                                            {isRolling
                                                ? 'Rolling...'
                                                : 'Roll Dice'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-1 space-y-8">
                                <div className="hidden lg:block">
                                    <WalletSection />
                                </div>
                                <GameHistory />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameBoard
