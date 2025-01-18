// src/components/history/GameHistoryPage.jsx
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const GameHistoryPage = () => {
    const navigate = useNavigate()
    const { upDownEqual, diceSum } = useSelector((state) => state.game)

    const renderHistory = (gameHistory, gameType) => (
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
                                Bet: ₹{game.stake} on{' '}
                                {gameType === 'upDownEqual'
                                    ? game.selectedOption
                                    : game.selectedNumber}
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
                                ? `+₹${game.winAmount.toFixed(2)}`
                                : `-₹${game.stake}`}
                        </div>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">
                        {new Date(game.timestamp).toLocaleString()}
                    </p>
                </div>
            ))}
            {gameHistory.length === 0 && (
                <p className="text-gray-400 text-center">No games played yet</p>
            )}
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-white">
                            Game History
                        </h2>
                        <button
                            onClick={() => navigate('/game')}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            Back to Game
                        </button>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-4">
                        Up or Down
                    </h4>
                    {renderHistory(upDownEqual.gameHistory, 'upDownEqual')}
                    <h4 className="text-xl font-bold text-white mb-4 mt-8">
                        Dice Sum
                    </h4>
                    {renderHistory(diceSum.gameHistory, 'diceSum')}
                </div>
            </div>
        </div>
    )
}

export default GameHistoryPage
