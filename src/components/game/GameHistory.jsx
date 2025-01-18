// src/components/game/GameHistory.jsx
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const GameHistory = () => {
    const { gameHistory } = useSelector((state) => state.game)

    return (
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
            <Link to="/history">
                <h3 className="text-2xl font-bold text-white mb-4">
                    Game History
                </h3>
            </Link>
            <div className="space-y-4 max-h-96 overflow-y-auto">
                {gameHistory.map((game, index) => (
                    <div
                        key={index}
                        className={`bg-gray-700 p-4 rounded-lg border-l-4 ${
                            game.won ? 'border-green-500' : 'border-red-500'
                        }`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-300">
                                    Bet: ${game.stake} on {game.option}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    Dice: {game.diceResults[0]} +{' '}
                                    {game.diceResults[1]} = {game.sum}
                                </p>
                            </div>
                            <div
                                className={`text-right ${game.won ? 'text-green-400' : 'text-red-400'}`}
                            >
                                {game.won
                                    ? `+$${game.winAmount.toFixed(2)}`
                                    : `-$${game.stake}`}
                            </div>
                        </div>
                        <p className="text-gray-500 text-xs mt-2">
                            {new Date(game.timestamp).toLocaleString()}
                        </p>
                    </div>
                ))}
                {gameHistory.length === 0 && (
                    <p className="text-gray-400 text-center">
                        No games played yet
                    </p>
                )}
            </div>
        </div>
    )
}

export default GameHistory
