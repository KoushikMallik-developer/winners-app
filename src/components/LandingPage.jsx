// src/components/LandingPage.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-8">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                    Welcome to Winners
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl">
                    Test your luck with our exciting dice game! Win up to 5.8x
                    your stake.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate('/login')}
                        className="px-8 py-4 bg-purple-600 text-white rounded-lg font-bold text-lg hover:bg-purple-700 transition duration-200"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate('/register')}
                        className="px-8 py-4 bg-gray-700 text-white rounded-lg font-bold text-lg hover:bg-gray-600 transition duration-200"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
