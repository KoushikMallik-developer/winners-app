// src/components/auth/RegisterForm.jsx
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }
        // In a real app, you'd make an API call here
        dispatch(setUser({ email: formData.email, id: Date.now() }))
        navigate('/game')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-96">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    Register for Winners
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
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
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    confirmPassword: e.target.value,
                                })
                            }
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition duration-200"
                    >
                        Register
                    </button>
                </form>
                <p className="text-gray-400 text-center mt-4">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-blue-400 hover:text-blue-300"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    )
}

export default RegisterForm
