import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import LandingPage from './components/LandingPage';
import StudentForm from './components/StudentForm';
import AdminDashboard from './components/AdminDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import DocumentsPage from './components/DocumentsPage';
import ClickSpark from './components/ClickSpark';
import { useNavbarScroll } from './hooks/useScrollAnimation';
import { FileText, LayoutDashboard, LogIn, LogOut, Users, Menu, X, Sun, Moon, FileSpreadsheet } from 'lucide-react';
import { useState, useEffect } from 'react';


function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

/* ── Scroll to top on route change ── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Navigation() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navRef = useNavbarScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`;

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 transition-all duration-500 border-b print:hidden"
      style={{
        background: isDark ? 'rgba(12, 10, 9, 0.8)' : 'rgba(250, 250, 249, 0.7)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl font-black text-sm text-white transition-all duration-500 group-hover:scale-105 group-hover:rotate-2"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}>
              M4
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-extrabold text-surface-900 dark:text-surface-100 leading-tight tracking-tight">Make4SIT</h1>
              <p className="text-[10px] text-surface-400 leading-none font-medium tracking-wide uppercase">Zero-Error Reports</p>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {!user && (
              <NavLink to="/" end className={linkClass}>Home</NavLink>
            )}

            {user?.role === 'student' && (
              <NavLink to="/dashboard" className={linkClass}>
                <FileText className="w-4 h-4" /> My Report
              </NavLink>
            )}

            {user?.role === 'admin' && (
              <NavLink to="/admin" className={linkClass}>
                <LayoutDashboard className="w-4 h-4" /> Admin
              </NavLink>
            )}

            {user?.role === 'faculty' && (
              <>
                <NavLink to="/faculty" className={linkClass}>
                  <Users className="w-4 h-4" /> Dashboard
                </NavLink>
                <NavLink to="/documents" className={linkClass}>
                  <FileSpreadsheet className="w-4 h-4 text-brand-500" /> Word Processor
                </NavLink>
              </>
            )}

            <div className="w-px h-6 bg-surface-200 dark:bg-surface-700 mx-2" />

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl transition-all duration-300 hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className="w-px h-6 bg-surface-200 dark:bg-surface-700 mx-1" />

            {!user ? (
              <>
                <NavLink to="/login" className={linkClass}>
                  <LogIn className="w-4 h-4" /> Login
                </NavLink>
                <NavLink to="/signup" className="btn-primary py-2 px-5 text-xs rounded-xl ml-1">
                  Sign Up
                </NavLink>
              </>
            ) : (
              <button onClick={logout} className="nav-link text-red-500 hover:bg-red-50 hover:text-red-700">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            )}
          </nav>

          {/* Mobile burger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl transition-colors hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 dark:text-surface-400"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-surface-100 dark:border-surface-800 animate-slide-down space-y-1">
            {!user && <NavLink to="/" end onClick={() => setMobileOpen(false)} className={linkClass}>Home</NavLink>}
            {user?.role === 'student' && <NavLink to="/dashboard" onClick={() => setMobileOpen(false)} className={linkClass}><FileText className="w-4 h-4" /> My Report</NavLink>}
            {user?.role === 'admin' && <NavLink to="/admin" onClick={() => setMobileOpen(false)} className={linkClass}><LayoutDashboard className="w-4 h-4" /> Admin</NavLink>}
            {user?.role === 'faculty' && (
              <>
                <NavLink to="/faculty" onClick={() => setMobileOpen(false)} className={linkClass}><Users className="w-4 h-4" /> Dashboard</NavLink>
                <NavLink to="/documents" onClick={() => setMobileOpen(false)} className={linkClass}>
                  <FileSpreadsheet className="w-4 h-4 text-brand-500" /> Word Processor
                </NavLink>
              </>
            )}
            {!user ? (
              <>
                <NavLink to="/login" onClick={() => setMobileOpen(false)} className={linkClass}><LogIn className="w-4 h-4" /> Login</NavLink>
                <NavLink to="/signup" onClick={() => setMobileOpen(false)} className="btn-primary w-full mt-2">Sign Up</NavLink>
              </>
            ) : (
              <button onClick={() => { logout(); setMobileOpen(false); }} className="nav-link text-red-500 hover:bg-red-50 dark:hover:bg-red-950 w-full"><LogOut className="w-4 h-4" /> Logout</button>
            )}
          </div>
        )}
      </div>
    </header>

  );
}

import TargetCursor from './components/TargetCursor';

/* ── Smart routing: full-width for auth, constrained for other pages ── */
function AuthRoutes() {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  if (isAuthPage) {
    return (
      <main className="flex-1 w-full">
        <TargetCursor 
          targetSelector=".auth-btn-primary, .auth-link, input, select, button"
          spinDuration={2.8}
          hideDefaultCursor={true}
          parallaxOn={true}
          cursorColor="#0d9488"
          cursorColorOnTarget="#0f766e"
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    );
  }

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 print:p-0 print:m-0 print:max-w-none">
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/documents" element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <DocumentsPage />
          </ProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentForm />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/faculty" element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <FacultyDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </main>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <ClickSpark sparkColor='#0d9488' sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
            <div className="min-h-screen flex flex-col bg-mesh print:bg-white">
              <Navigation />

              <AuthRoutes />

              <footer className="border-t border-surface-100 dark:border-surface-800 mt-auto print:hidden">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg font-black text-xs text-white flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}>M4</div>
                    <span className="text-xs text-surface-400">&copy; {new Date().getFullYear()} Shetty Institute of Technology</span>
                  </div>
                  <span className="text-xs text-surface-400 tracking-wide">Built for Make4SIT Hackathon</span>
                </div>
              </footer>
            </div>
          </ClickSpark>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}


/* Show landing page if not logged in, redirect to dashboard if logged in */
function PublicHome() {
  const { user } = useAuth();
  if (user?.role === 'student') return <Navigate to="/dashboard" replace />;
  if (user?.role === 'admin') return <Navigate to="/admin" replace />;
  if (user?.role === 'faculty') return <Navigate to="/faculty" replace />;
  return <LandingPage />;
}

export default App;
