// src/components/game/DiceSumGameBoard.jsx
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
    ArrowDown,
    ArrowUp,
    Dice1,
    Dice2,
    Dice3,
    Dice4,
    Dice5,
    Dice6,
    Equal,
} from 'lucide-react'
import WalletSection from './WalletSection.jsx'
import GameHistory from './GameHistory.jsx'

const STAKE_OPTIONS = [
    10, 50, 100, 200, 500, 1000, 5000, 10000, 20000, 50000, 100000, 500000,
]
const SUM_OPTIONS = Array.from({ length: 11 }, (_, i) => i + 2) // [2, 3, 4, ..., 12]

const DiceSumGame = () => {
    const dispatch = useDispatch()
    const { stake, selectedOption, diceResults, isRolling } = useSelector(
        (state) => state.game.diceSum
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
        dispatch(setStake({ gameType: 'diceSum', amount: value }))
    }

    const handleOptionSelect = (option) => {
        dispatch(setSelectedOption({ gameType: 'diceSum', option }))
    }

    const getMultiplier = (sum) => {
        return sum === 2 || sum === 12 ? 5.8 : 1.8
    }

    const rollDice = () => {
        if (!stake || !selectedOption) {
            setError('Please set stake and select a number')
            return
        }

        dispatch(setIsRolling({ gameType: 'diceSum', isRolling: true }))

        // Simulate dice rolling animation
        const rollInterval = setInterval(() => {
            const dice1 = Math.floor(Math.random() * 6) + 1
            const dice2 = Math.floor(Math.random() * 6) + 1
            dispatch(
                setDiceResults({ gameType: 'diceSum', results: [dice1, dice2] })
            )
        }, 100)

        // Stop rolling after 2 seconds and calculate result
        setTimeout(() => {
            clearInterval(rollInterval)
            const finalDice1 = Math.floor(Math.random() * 6) + 1
            const finalDice2 = Math.floor(Math.random() * 6) + 1
            const sum = finalDice1 + finalDice2
            dispatch(
                setDiceResults({
                    gameType: 'diceSum',
                    results: [finalDice1, finalDice2],
                })
            )

            const won = sum === selectedOption
            const multiplier = getMultiplier(sum)
            const winAmount = won ? stake * multiplier : 0

            const newBalance = won
                ? balance + winAmount - stake
                : balance - stake
            dispatch(updateBalance(newBalance))

            dispatch(
                addToHistory({
                    gameType: 'diceSum',
                    gameData: {
                        stake,
                        selectedNumber: selectedOption,
                        diceResults: [finalDice1, finalDice2],
                        sum,
                        won,
                        multiplier,
                        winAmount,
                        timestamp: new Date().toISOString(),
                    },
                })
            )

            dispatch(setIsRolling({ gameType: 'diceSum', isRolling: false }))
            setTimeout(() => dispatch(resetGame({ gameType: 'diceSum' })), 2000)
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
                        ₹{balance.toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="bg-gray-800 rounded-lg shadow-xl p-4 md:p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-white">
                            Dice Sum Game
                        </h2>
                        <div className="hidden lg:block text-white">
                            Balance:{' '}
                            <span className="font-bold text-green-400">
                                ₹{balance.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Stake Selection */}
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
                                        ₹{amount.toLocaleString()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="bg-gray-800 rounded-lg shadow-xl ">
                                    <div className="flex justify-center items-center mb-8">
                                        <h2 className="text-3xl font-bold text-white">
                                            Your Turn to Shine.
                                        </h2>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="bg-gray-700 p-4 md:p-6 rounded-lg">
                                            <h3 className="text-xl text-white mb-4">
                                                Select Target Result
                                            </h3>
                                            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                                                {SUM_OPTIONS.map((num) => (
                                                    <button
                                                        key={num}
                                                        onClick={() =>
                                                            handleOptionSelect(
                                                                num
                                                            )
                                                        }
                                                        className={`p-4 rounded-lg font-bold text-lg transition duration-200 ${
                                                            selectedOption ===
                                                            num
                                                                ? 'bg-purple-600 text-white'
                                                                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                                        }`}
                                                    >
                                                        {num}
                                                        <div className="text-xs mt-1">
                                                            {num === 2 ||
                                                            num === 12
                                                                ? '5.8x'
                                                                : '1.8x'}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-gray-700 p-6 rounded-lg">
                                            <h3 className="text-xl text-white mb-4">
                                                Your Bet Amount:
                                            </h3>
                                            <h5
                                                className="w-full p-3 rounded bg-gray-600 text-white border border-gray-500 focus:border-blue-500 focus:outline-none"
                                                max={balance}
                                            >
                                                {stake}
                                            </h5>
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
                                <GameHistory gameType="diceSum" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiceSumGame
