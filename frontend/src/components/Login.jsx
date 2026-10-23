import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Loader2, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    if (result.success) {
      if (result.role === 'admin') navigate('/admin');
      else if (result.role === 'faculty') navigate('/faculty');
      else if (result.role === 'student') navigate('/dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page-wrapper">
      {/* Left Panel — Illustration */}
      <div className={`auth-illustration-panel ${mounted ? 'auth-animate-in' : 'auth-animate-out'}`}>
        <div className="auth-illustration-content">
          {/* Floating shapes */}
          <div className="auth-shape auth-shape-1" />
          <div className="auth-shape auth-shape-2" />
          <div className="auth-shape auth-shape-3" />

          <div className="relative z-10 text-center px-8">
            <img
              src="/images/login-illustration.jpg"
              alt="Student working"
              className="w-full max-w-xs mx-auto mb-8 rounded-2xl drop-shadow-2xl"
              style={{ animationDelay: '0.3s' }}
            />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">
              Welcome to Make4SIT
            </h2>
            <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
              Your one-stop platform for generating error-free NSS reports with faculty approval.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className={`auth-form-panel ${mounted ? 'auth-animate-in-delay' : 'auth-animate-out'}`}>
        <div className="auth-form-inner">
          {/* Logo */}
          <div className="mb-10">
            <div className="auth-logo-badge">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-5">
              Sign in
            </h1>
            <p className="text-sm text-slate-400 mt-1.5">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="auth-field-group">
              <label htmlFor="login-email" className="auth-label">Email / Login ID</label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" />
                <input
                  ref={emailRef}
                  id="login-email"
                  type="text"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="auth-input"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-field-group">
              <label htmlFor="login-password" className="auth-label">Password</label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="auth-input pr-12"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="auth-error">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading} className="auth-btn-primary group">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Switch */}
          <p className="text-center text-sm text-slate-400">
            New student?{' '}
            <Link to="/signup" className="auth-link">
              Create an account <ArrowRight className="inline w-3 h-3 ml-0.5" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
