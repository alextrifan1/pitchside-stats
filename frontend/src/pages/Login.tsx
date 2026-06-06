import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed. Please check your credentials.');
            }

            dispatch(setCredentials({token: data.token}));
            navigate('/dashboard')
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 font-sans">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 w-full max-w-md">

                <h1 className="text-3xl font-bold tracking-tight mb-2 text-center">Welcome Back</h1>
                <p className="text-gray-500 text-center mb-8">Enter your credentials to proceed.</p>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-6 border border-red-100 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-colors"
                            required
                        />
                    </div>

                    {/* The Bold Warm Yellow Button */}
                    <button
                        type="submit"
                        className="w-full bg-amber-400 text-black font-semibold px-4 py-2 rounded-md hover:bg-amber-500 transition-colors"
                    >
                        Sign In
                    </button>
                </form>

            </div>
        </div>
    )
}