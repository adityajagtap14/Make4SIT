import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Loader2, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';

const DEPARTMENTS = ['CSE', 'AIML', 'Civil', 'EEE', 'ECE'];
const SEMESTERS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '', usn: '', email: '', password: '',
    department: 'CSE', semester: 'IV', academicYear: '2025-2026'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const { signupStudent } = useAuth();
  const navigate = useNavigate();
  const nameRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    nameRef.current?.focus();
  }, []);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    const result = await signupStudent(formData);
    if (result.success) {
      navigate('/dashboard');
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
              src="/images/signup-illustration.jpg"
              alt="Students celebrating"
              className="w-full max-w-xs mx-auto mb-8 rounded-2xl drop-shadow-2xl"
            />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">
              Join Make4SIT
            </h2>
            <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
              Register once, generate unlimited perfect reports. Your classmates are already here.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className={`auth-form-panel ${mounted ? 'auth-animate-in-delay' : 'auth-animate-out'}`}>
        <div className="auth-form-inner auth-form-inner-wide">
          {/* Logo */}
          <div className="mb-8">
            <div className="auth-logo-badge">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-5">
              Create account
            </h1>
            <p className="text-sm text-slate-400 mt-1.5">
              Register with your VTU details to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Row 1: Name + USN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="auth-field-group">
                <label htmlFor="signup-name" className="auth-label">Full Name</label>
                <input
                  ref={nameRef}
                  id="signup-name"
                  required
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  className="auth-input-solo uppercase"
                  placeholder="Your full name"
                />
              </div>
              <div className="auth-field-group">
                <label htmlFor="signup-usn" className="auth-label">USN</label>
                <input
                  id="signup-usn"
                  required
                  type="text"
                  name="usn"
                  onChange={handleInputChange}
                  className="auth-input-solo uppercase"
                  placeholder="e.g. 2SI22CS001"
                />
              </div>
            </div>

            {/* Row 2: Email + Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="auth-field-group">
                <label htmlFor="signup-email" className="auth-label">Email</label>
                <input
                  id="signup-email"
                  required
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  className="auth-input-solo"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              <div className="auth-field-group">
                <label htmlFor="signup-password" className="auth-label">Password</label>
                <div className="relative">
                  <input
                    id="signup-password"
                    required
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    onChange={handleInputChange}
                    className="auth-input-solo pr-11"
                    placeholder="Min 6 characters"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Row 3: Department + Semester + Year */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="auth-field-group">
                <label htmlFor="signup-dept" className="auth-label">Department</label>
                <select
                  id="signup-dept"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="auth-input-solo"
                >
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="auth-field-group">
                <label htmlFor="signup-sem" className="auth-label">Semester</label>
                <select
                  id="signup-sem"
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className="auth-input-solo"
                >
                  {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="auth-field-group">
                <label htmlFor="signup-year" className="auth-label">Academic Year</label>
                <input
                  id="signup-year"
                  required
                  type="text"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleInputChange}
                  className="auth-input-solo"
                />
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
                  Create Account
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
            Already registered?{' '}
            <Link to="/login" className="auth-link">
              Sign in <ArrowRight className="inline w-3 h-3 ml-0.5" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
