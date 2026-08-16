import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData(parsedUser);
    } else {
      navigate('/welcome');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/welcome');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-surface-base flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-functional" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-base pb-20">
      {/* Header */}
      <header className="bg-surface-l2 border-b border-gold-functional border-opacity-20 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gold-functional text-body font-semibold mb-3"
          >
            ← Back
          </button>
          <h1 className="font-display text-h2 text-text-high">Profile</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Avatar */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-gold-functional to-gold-decorative rounded-full flex items-center justify-center text-4xl font-bold text-surface-base drop-shadow-gold">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        </div>

        {/* Account Information */}
        <Card elevation="l1" className="mb-8">
          <h2 className="font-display text-h3 text-text-high mb-6">Account Information</h2>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-text-medium text-caption mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="w-full bg-surface-base border-2 border-surface-l3 rounded-md px-4 py-3 text-text-high font-ui focus:outline-none focus:border-gold-functional transition-colors"
                />
              </div>

              <div>
                <label className="block text-text-medium text-caption mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className="w-full bg-surface-base border-2 border-surface-l3 rounded-md px-4 py-3 text-text-high font-ui focus:outline-none focus:border-gold-functional transition-colors"
                />
              </div>

              <div>
                <label className="block text-text-medium text-caption mb-2">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role || ''}
                  disabled
                  className="w-full bg-surface-base border-2 border-surface-l3 rounded-md px-4 py-3 text-text-high font-ui focus:outline-none opacity-60 cursor-not-allowed"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="tertiary"
                  onClick={() => {
                    setFormData(user);
                    setIsEditing(false);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  className="flex-1"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                <div className="border-b border-surface-l3 pb-4">
                  <p className="text-text-medium text-caption mb-2">Full Name</p>
                  <p className="text-text-high text-body-lg font-semibold">{user.name}</p>
                </div>

                <div className="border-b border-surface-l3 pb-4">
                  <p className="text-text-medium text-caption mb-2">Phone Number</p>
                  <p className="text-text-high text-body-lg font-semibold">{user.phone}</p>
                </div>

                <div className="border-b border-surface-l3 pb-4">
                  <p className="text-text-medium text-caption mb-2">Account Type</p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-gold-functional bg-opacity-20 text-gold-functional rounded-full text-caption font-semibold">
                      {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || 'User'}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="secondary"
                onClick={() => setIsEditing(true)}
                className="w-full mt-6"
              >
                Edit Profile
              </Button>
            </>
          )}
        </Card>

        {/* Quick Actions */}
        <Card elevation="l1" className="mb-8">
          <h2 className="font-display text-h3 text-text-high mb-6">Quick Actions</h2>

          <div className="space-y-3">
            <ActionButton
              label="View Bookings"
              onClick={() => navigate('/bookings')}
            />
            <ActionButton
              label="Explore Services"
              onClick={() => navigate('/services')}
            />
            <ActionButton
              label="Notifications"
              onClick={() => navigate('/notifications')}
            />
            <ActionButton
              label="Help Center"
              onClick={() => navigate('/help')}
            />
          </div>
        </Card>

        {/* Settings */}
        <Card elevation="l1" className="mb-8">
          <h2 className="font-display text-h3 text-text-high mb-6">Settings</h2>

          <div className="space-y-4">
            <SettingItem label="Notifications" description="Manage appointment reminders" />
            <SettingItem label="Privacy" description="Control data sharing" />
            <SettingItem label="Payment Methods" description="Manage saved cards" />
            <SettingItem label="Terms & Conditions" description="View our policies" />
          </div>
        </Card>

        {/* Danger Zone */}
        <Card elevation="l1" className="border-semantic-error border-opacity-30">
          <h2 className="font-display text-h3 text-semantic-error mb-6">Account</h2>

          <Button
            variant="danger"
            onClick={handleLogout}
            className="w-full"
          >
            Sign Out
          </Button>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface-l2 border-t border-gold-functional border-opacity-20 drop-shadow-surface-l2">
        <div className="max-w-7xl mx-auto px-6 flex justify-around h-16">
          <NavItem label="Home" onClick={() => navigate('/home')} />
          <NavItem label="Services" onClick={() => navigate('/services')} />
          <NavItem label="Bookings" onClick={() => navigate('/bookings')} />
          <NavItem label="Profile" active={true} onClick={() => navigate('/profile')} />
        </div>
      </nav>
      <div className="h-16" />
    </div>
  );
};

// Action Button Component
const ActionButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3 rounded-lg bg-surface-l2 text-text-high hover:bg-surface-l3 transition-colors font-semibold text-body flex justify-between items-center group"
    >
      <span>{label}</span>
      <svg
        className="w-5 h-5 text-gold-functional opacity-0 group-hover:opacity-100 transition-opacity"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

// Setting Item Component
const SettingItem = ({ label, description }) => {
  return (
    <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-surface-l3 transition-colors group">
      <p className="text-text-high font-semibold text-body mb-1">{label}</p>
      <p className="text-text-medium text-caption">{description}</p>
    </button>
  );
};

const NavItem = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center
        py-2 px-4
        transition-all duration-250
        ${active ? 'text-gold-functional' : 'text-text-medium hover:text-text-high'}
      `}
    >
      <span className="text-caption font-ui font-semibold">{label}</span>
    </button>
  );
};

export default ProfileScreen;
