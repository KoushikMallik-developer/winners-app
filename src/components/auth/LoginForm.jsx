// src/components/auth/LoginForm.jsx
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // In a real app, you'd make an API call here
        if (credentials.email && credentials.password) {
            dispatch(setUser({ email: credentials.email, id: Date.now() }))
            navigate('/game')
        } else {
            setError('Please fill in all fields')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-96">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    Login to Winners
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            value={credentials.email}
                            onChange={(e) =>
                                setCredentials({
                                    ...credentials,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            value={credentials.password}
                            onChange={(e) =>
                                setCredentials({
                                    ...credentials,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="text-gray-400 text-center mt-4">
                    Don't have an account?{' '}
                    <button
                        onClick={() => navigate('/register')}
                        className="text-blue-400 hover:text-blue-300"
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    )
}

export default LoginForm
