import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const BookingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const service = location.state?.service;
  const [step, setStep] = useState('date'); // date, review, payment, confirmation
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  if (!service) {
    return (
      <div className="min-h-screen bg-surface-base flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-medium text-body mb-4">No service selected</p>
          <Button variant="primary" onClick={() => navigate('/home')}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleProceedToReview = () => {
    if (selectedDate && selectedTime) {
      setStep('review');
    }
  };

  const handleConfirmBooking = async () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token) {
      navigate('/welcome');
      return;
    }

    setLoading(true);

    try {
      const bookingDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      bookingDateTime.setHours(parseInt(hours), parseInt(minutes), 0);

      const response = await fetch('http://localhost:8080/api/v1/user/bookingInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          service: service._id,
          bookingTime: bookingDateTime.toISOString(),
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setBookingId(data.data._id);
        setStep('confirmation');
      } else {
        alert(data.message || 'Booking failed');
      }
    } catch (error) {
      alert('Error creating booking: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  const getNextDays = () => {
    const days = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-surface-base pb-20">
      {/* Header */}
      <header className="bg-surface-l2 border-b border-gold-functional border-opacity-20 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => {
              if (step !== 'date') {
                setStep('date');
              } else {
                navigate(-1);
              }
            }}
            className="text-gold-functional text-body font-semibold mb-3"
          >
            ← Back
          </button>
          <h1 className="font-display text-h2 text-text-high">
            {step === 'date' && 'Select Date & Time'}
            {step === 'review' && 'Review Booking'}
            {step === 'payment' && 'Confirm Payment'}
            {step === 'confirmation' && 'Booking Confirmed!'}
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Indicator */}
        <div className="flex items-center gap-3 mb-12">
          {['date', 'review', 'payment', 'confirmation'].map((s, i) => (
            <React.Fragment key={s}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-surface-base transition-all ${
                  step === s
                    ? 'bg-gold-functional'
                    : ['date', 'review', 'payment'].includes(step) && ['date', 'review', 'payment'].indexOf(step) >= i
                    ? 'bg-gold-functional'
                    : 'bg-surface-l2 text-text-medium'
                }`}
              >
                {i + 1}
              </div>
              {i < 3 && <div className="h-1 flex-1 bg-surface-l2" />}
            </React.Fragment>
          ))}
        </div>

        {/* Date Selection Step */}
        {step === 'date' && (
          <div>
            <h2 className="font-display text-h3 text-text-high mb-6">Select a Date</h2>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 mb-12">
              {getNextDays().map((date, i) => (
                <button
                  key={i}
                  onClick={() => handleDateSelect(date.toISOString().split('T')[0])}
                  className={`p-4 rounded-lg text-center transition-all ${
                    selectedDate === date.toISOString().split('T')[0]
                      ? 'bg-gold-functional text-surface-base drop-shadow-gold'
                      : 'bg-surface-l2 text-text-high hover:border-gold-functional'
                  } border border-surface-l3`}
                >
                  <p className="text-caption font-semibold">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className="text-body-lg font-bold">{date.getDate()}</p>
                </button>
              ))}
            </div>

            <h2 className="font-display text-h3 text-text-high mb-6">Select a Time</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`py-3 px-3 rounded-md transition-all text-center font-semibold ${
                    selectedTime === time
                      ? 'bg-gold-functional text-surface-base drop-shadow-gold'
                      : 'bg-surface-l2 text-text-high hover:bg-surface-l3'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <Button
                variant="tertiary"
                onClick={() => navigate(-1)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleProceedToReview}
                disabled={!selectedDate || !selectedTime}
                className="flex-1"
              >
                Continue to Review
              </Button>
            </div>
          </div>
        )}

        {/* Review Step */}
        {step === 'review' && (
          <div>
            <Card elevation="l1" className="mb-8">
              <h2 className="font-display text-h2 text-text-high mb-6">Booking Summary</h2>

              <div className="space-y-6">
                {/* Service Details */}
                <div className="pb-6 border-b border-surface-l3">
                  <p className="text-text-medium text-caption mb-2">Service</p>
                  <h3 className="font-ui text-h3 text-text-high mb-3">{service.serviceName}</h3>
                  <p className="text-text-medium text-body mb-4">{service.description}</p>
                </div>

                {/* Date & Time */}
                <div className="pb-6 border-b border-surface-l3">
                  <p className="text-text-medium text-caption mb-2">Date & Time</p>
                  <p className="font-ui text-body-lg text-text-high">
                    {new Date(selectedDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })} at {selectedTime}
                  </p>
                </div>

                {/* Duration & Price */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-medium">Duration</span>
                    <span className="text-text-high font-semibold">{service.duration} minutes</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-surface-l3">
                    <span className="font-semibold text-text-high">Total Price</span>
                    <span className="text-gold-functional text-h3">₹{service.price}</span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex gap-4">
              <Button
                variant="tertiary"
                onClick={() => setStep('date')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirmBooking}
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </div>
          </div>
        )}

        {/* Confirmation Step */}
        {step === 'confirmation' && (
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-gold-functional to-gold-decorative rounded-full flex items-center justify-center drop-shadow-gold">
                <svg
                  className="w-10 h-10 text-surface-base"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h2 className="font-display text-h2 text-text-high mb-4">Booking Confirmed!</h2>
            <p className="text-text-medium text-body mb-8 max-w-sm mx-auto">
              Your appointment has been successfully booked. A confirmation has been sent to your registered phone number.
            </p>

            <Card elevation="l1" className="mb-8 text-left">
              <div className="space-y-4">
                <div className="border-b border-surface-l3 pb-4">
                  <p className="text-text-medium text-caption mb-1">Booking Reference</p>
                  <p className="font-ui font-semibold text-text-high">{bookingId?.slice(-8).toUpperCase()}</p>
                </div>
                <div className="border-b border-surface-l3 pb-4">
                  <p className="text-text-medium text-caption mb-1">Service</p>
                  <p className="font-ui text-body-lg text-text-high">{service.serviceName}</p>
                </div>
                <div className="border-b border-surface-l3 pb-4">
                  <p className="text-text-medium text-caption mb-1">Appointment Time</p>
                  <p className="font-ui text-body-lg text-text-high">
                    {new Date(selectedDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                    })} at {selectedTime}
                  </p>
                </div>
                <div>
                  <p className="text-text-medium text-caption mb-1">Amount Paid</p>
                  <p className="text-gold-functional text-h3 font-semibold">₹{service.price}</p>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button
                variant="primary"
                onClick={() => navigate('/bookings')}
                className="w-full"
              >
                View All Bookings
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/home')}
                className="w-full"
              >
                Back to Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingScreen;
