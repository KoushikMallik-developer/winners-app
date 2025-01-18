// src/App.jsx
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/layout/Navbar'
import LandingPage from './components/LandingPage'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import GameBoard from './components/game/GameBoard'
import WalletPage from './components/wallet/WalletPage'
import GameHistoryPage from './components/game_history/GameHistory'

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    return isAuthenticated ? children : <Navigate to="/login" />
}

const AppLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />
            <main className="pt-4">{children}</main>
        </div>
    )
}

const App = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    return (
        <Router>
            <AppLayout>
                <Routes>
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? (
                                <Navigate to="/game" />
                            ) : (
                                <LandingPage />
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            isAuthenticated ? (
                                <Navigate to="/game" />
                            ) : (
                                <LoginForm />
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            isAuthenticated ? (
                                <Navigate to="/game" />
                            ) : (
                                <RegisterForm />
                            )
                        }
                    />
                    <Route
                        path="/game"
                        element={
                            <PrivateRoute>
                                <GameBoard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/wallet"
                        element={
                            <PrivateRoute>
                                <WalletPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/history"
                        element={
                            <PrivateRoute>
                                <GameHistoryPage />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </AppLayout>
        </Router>
    )
}

export default App
