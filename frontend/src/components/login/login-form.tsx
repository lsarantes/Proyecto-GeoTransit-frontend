'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';


export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Simulate authentication
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Here you would integrate with your actual auth system
            console.log('Login attempt with:', { email, password });

            // Redirect to dashboard (placeholder)
            login()
            router.push('/dashboard');
        } catch (err) {
            setError('Error al iniciar sesión. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                    Correo Electrónico
                </label>
                <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="usuario@empresa.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-input border border-border text-foreground placeholder:text-foreground/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        required
                    />
                </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                    Contraseña
                </label>
                <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 bg-input border border-border text-foreground placeholder:text-foreground/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-foreground/70 hover:text-foreground cursor-pointer transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded border-border bg-input accent-primary" />
                    <span className="ml-2">Recuérdame</span>
                </label>
                <a href="#" className="text-primary hover:text-primary/90 font-medium transition-colors">
                    ¿Olvidaste tu contraseña?
                </a>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
                    {error}
                </div>
            )}

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 font-semibold rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Iniciando sesión...
                    </span>
                ) : (
                    'Iniciar Sesión'
                )}
            </Button>

            
        </form>
    );
}
