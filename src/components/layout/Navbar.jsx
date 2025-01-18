// src/components/layout/Navbar.jsx
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    const closeMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const isActive = (path) => {
        return location.pathname === path
    }

    const publicLinks = [
        { path: '/login', label: 'Login' },
        { path: '/register', label: 'Register' },
    ]

    const privateLinks = [
        { path: '/game', label: 'Game Board' },
        { path: '/wallet', label: 'Wallet' },
        { path: '/history', label: 'History' },
    ]

    const links = isAuthenticated ? privateLinks : publicLinks

    return (
        <nav className="bg-gray-800 border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and brand name */}
                    <div className="flex items-center">
                        <div
                            className="text-xl font-bold text-white cursor-pointer"
                            onClick={() => navigate('/')}
                        >
                            Winners
                        </div>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-4">
                            {links.map((link) => (
                                <button
                                    key={link.path}
                                    onClick={() => navigate(link.path)}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive(link.path)
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                                >
                                    {link.label}
                                </button>
                            ))}
                            {isAuthenticated && (
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            {isMobileMenuOpen ? (
                                <X size={24} />
                            ) : (
                                <Menu size={24} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {links.map((link) => (
                        <button
                            key={link.path}
                            onClick={() => {
                                navigate(link.path)
                                closeMenu()
                            }}
                            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                                isActive(link.path)
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                        >
                            {link.label}
                        </button>
                    ))}
                    {isAuthenticated && (
                        <button
                            onClick={() => {
                                handleLogout()
                                closeMenu()
                            }}
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
