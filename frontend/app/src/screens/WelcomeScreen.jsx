import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [isAuthTab, setIsAuthTab] = useState('login');

  return (
    <div className="min-h-screen bg-surface-base flex flex-col items-center justify-center px-6 py-12">
      <Card elevation="l1" className="w-full max-w-md animate-fade-in">
        {/* Tab Switcher */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setIsAuthTab('login')}
            className={`flex-1 py-3 font-ui font-semibold rounded-md transition-all duration-250 ${
              isAuthTab === 'login'
                ? 'bg-gold-functional text-surface-base'
                : 'bg-surface-l2 text-text-medium hover:text-text-high'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsAuthTab('register')}
            className={`flex-1 py-3 font-ui font-semibold rounded-md transition-all duration-250 ${
              isAuthTab === 'register'
                ? 'bg-gold-functional text-surface-base'
                : 'bg-surface-l2 text-text-medium hover:text-text-high'
            }`}
          >
            Register
          </button>
        </div>

        {/* Login Tab */}
        {isAuthTab === 'login' && (
          <LoginForm onSuccess={() => navigate('/home')} />
        )}

        {/* Register Tab */}
        {isAuthTab === 'register' && (
          <RegisterForm onSuccess={() => navigate('/home')} />
        )}
      </Card>

      {/* Continue as Guest */}
      <button
        onClick={() => navigate('/home')}
        className="mt-6 text-text-medium hover:text-gold-functional transition-colors text-body font-ui"
      >
        Continue as Guest →
      </button>
    </div>
  );
};

// Login Form Component
const LoginForm = ({ onSuccess }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: Number(phone), password }),
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onSuccess();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <h2 className="font-display text-h2 text-text-high mb-6">Welcome Back</h2>

      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full bg-surface-base border-2 border-surface-l3 rounded-md px-4 py-3 text-text-high placeholder:text-text-disabled font-ui focus:outline-none focus:border-gold-functional transition-colors"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-surface-base border-2 border-surface-l3 rounded-md px-4 py-3 text-text-high placeholder:text-text-disabled font-ui focus:outline-none focus:border-gold-functional transition-colors"
        required
      />

      {error && <p className="text-semantic-error text-body font-ui">{error}</p>}

      <Button
        variant="primary"
        size="md"
        type="submit"
        disabled={loading}
        className="w-full mt-6"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
};

// Register Form Component
const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: Number(formData.phone),
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onSuccess();
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <h2 className="font-display text-h2 text-text-high mb-6">Create Account</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full bg-surface-base border-2 border-surface-l3 rounded-md px-4 py-3 text-text-high placeholder:text-text-disabled font-ui focus:outline-none focus:border-gold-functional transition-colors"
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full bg-surface-base border-2 border-surface-l3 rounded-md px-4 py-3 text-text-high placeholder:text-text-disabled font-ui focus:outline-none focus:border-gold-functional transition-colors"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full bg-surface-base border-2 border-surface-l3 rounded-md px-4 py-3 text-text-high placeholder:text-text-disabled font-ui focus:outline-none focus:border-gold-functional transition-colors"
        required
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-full bg-surface-base border-2 border-surface-l3 rounded-md px-4 py-3 text-text-high placeholder:text-text-disabled font-ui focus:outline-none focus:border-gold-functional transition-colors"
        required
      />

      {error && <p className="text-semantic-error text-body font-ui">{error}</p>}

      <Button
        variant="primary"
        size="md"
        type="submit"
        disabled={loading}
        className="w-full mt-6"
      >
        {loading ? 'Creating account...' : 'Register'}
      </Button>
    </form>
  );
};

export default WelcomeScreen;
