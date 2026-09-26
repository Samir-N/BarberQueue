import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';

const BookingsHistoryScreen = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, completed, cancelled

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/welcome');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/v1/user/getBookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredBookings = () => {
    const now = new Date();
    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.bookingTime);
      if (filter === 'upcoming') return bookingDate > now && booking.status !== 'cancelled';
      if (filter === 'completed') return booking.status === 'completed';
      if (filter === 'cancelled') return booking.status === 'cancelled';
      return true;
    });
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/user/personalBooking/delete/${bookingId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setBookings(bookings.filter((b) => b._id !== bookingId));
      } else {
        alert(data.message || 'Failed to cancel booking');
      }
    } catch (error) {
      alert('Error cancelling booking: ' + error.message);
    }
  };

  const filteredBookings = getFilteredBookings();

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
          <h1 className="font-display text-h2 text-text-high">Your Bookings</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {['all', 'upcoming', 'completed', 'cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-body font-semibold whitespace-nowrap transition-all ${
                filter === f
                  ? 'bg-gold-functional text-surface-base drop-shadow-gold'
                  : 'bg-surface-l2 text-text-medium hover:text-text-high'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-functional" />
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancel={() => handleCancelBooking(booking._id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            headline="No Bookings"
            body={`You haven't made any ${filter !== 'all' ? filter : ''} bookings yet. Book premium grooming services today!`}
            ctaText="Explore Services"
            ctaAction={() => navigate('/home')}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface-l2 border-t border-gold-functional border-opacity-20 drop-shadow-surface-l2">
        <div className="max-w-7xl mx-auto px-6 flex justify-around h-16">
          <NavItem label="Home" onClick={() => navigate('/home')} />
          <NavItem label="Services" onClick={() => navigate('/services')} />
          <NavItem label="Bookings" active={true} onClick={() => navigate('/bookings')} />
          <NavItem label="Profile" onClick={() => navigate('/profile')} />
        </div>
      </nav>
      <div className="h-16" />
    </div>
  );
};

// Booking Card Component
const BookingCard = ({ booking, onCancel }) => {
  const bookingDate = new Date(booking.bookingTime);
  const isPast = new Date() > bookingDate;
  const statusColors = {
    pending: 'text-semantic-warning bg-semantic-warning bg-opacity-10',
    conformed: 'text-semantic-success bg-semantic-success bg-opacity-10',
    completed: 'text-semantic-success bg-semantic-success bg-opacity-10',
    cancelled: 'text-semantic-error bg-semantic-error bg-opacity-10',
  };

  return (
    <Card elevation="l1" interactive={false} className="hover:border-gold-functional">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-ui text-h3 text-text-high mb-1">
            {booking.service?.serviceName || 'Service'}
          </h3>
          <p className="text-text-medium text-body">
            {bookingDate.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div
          className={`px-3 py-1 rounded-full font-semibold text-caption ${
            statusColors[booking.status] || statusColors.pending
          }`}
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </div>
      </div>

      <div className="mb-4 pb-4 border-b border-surface-l3 space-y-2">
        <div className="flex justify-between">
          <span className="text-text-medium">Duration</span>
          <span className="text-text-high font-semibold">
            {booking.service?.duration || '-'} min
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-medium">Price</span>
          <span className="text-gold-functional font-semibold">
            ₹{booking.service?.price || '-'}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        {booking.status !== 'cancelled' && !isPast && (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onCancel()}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button variant="primary" size="sm" className="flex-1">
              Reschedule
            </Button>
          </>
        )}
        {booking.status === 'completed' && (
          <Button variant="primary" size="sm" className="flex-1">
            Rebook
          </Button>
        )}
      </div>
    </Card>
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

export default BookingsHistoryScreen;
