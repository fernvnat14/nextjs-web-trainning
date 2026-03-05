"use client";

import { usePassengerForm } from '../../../hooks/usePassengerForm';
import { PassengerDetail } from '../../../components/Passenger/PassengerDetail';
import { TestCases } from '../../../components/Passenger/TestCases';
import { useCheckin } from '../../../context/CheckinContext';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { checkinApi } from '../../../services/checkinApi';
import { useModal } from '../../../components/ModalProvider';

export default function PassengerDetailsPage() {
  const router = useRouter();
  const { booking, selectedPassengers, setDetails } = useCheckin();
  const { openModal } = useModal();
  const [submitting, setSubmitting] = useState(false);

  // In the real app, passengers is actually selectedPassengers
  const passengers = selectedPassengers;

  const {
    details,
    getFieldError,
    isFormValid,
    updateDetail,
    setFieldTouched,
    getPassengerKey,
  } = usePassengerForm(passengers);

  const handleNext = useCallback(async () => {
    if (!booking) return;

    try {
      setSubmitting(true);
      const updates = Object.entries(details).map(([passengerId, detail]) => ({
        passengerId,
        phoneNumber: detail.phone,
        nationality: detail.nationality,
        documentNumber: '',
      }));

      await checkinApi.updatePassengerDetails(booking.bookingRef, updates);

      // Update context
      setDetails((prevDetails: any) => ({
        ...prevDetails,
        ...details
      }));

      router.push('/checkin/dg');
    } catch (error: any) {
      console.error('Passenger details update failed:', error);
      openModal({
        title: 'Update Failed',
        message: error.userMessage || error.message || 'An error occurred while updating passenger details. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  }, [booking, details, router, setDetails, openModal]);

  const handleBack = useCallback(() => {
    router.push('/checkin/select');
  }, [router]);

  if (!booking || passengers.length === 0) {
    if (typeof window !== 'undefined') {
      router.replace('/checkin/select');
    }
    return null;
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden mb-4 relative z-10 mx-auto max-w-3xl lg:mt-8">
        <div className="px-5 pt-5 pb-4 bg-gradient-to-b from-slate-50/50 to-white border-b border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Passenger Details</h3>
              <p className="text-sm text-slate-600 mt-1.5">Enter required information for each passenger</p>
            </div>
            <TestCases
              passengers={passengers}
              getPassengerKey={getPassengerKey}
              updateDetail={updateDetail}
            />
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="space-y-5">
            {passengers.map((passenger, index) => {
              const key = getPassengerKey(passenger);
              const detail = details[key] || { nationality: '', phone: '', countryCode: '+66' };
              const nationalityError = getFieldError(key, 'nationality');
              const phoneError = getFieldError(key, 'phone');

              return (
                <PassengerDetail
                  key={key}
                  passenger={passenger}
                  index={index}
                  detail={detail}
                  nationalityError={nationalityError}
                  phoneError={phoneError}
                  onNationalityChange={(value) => updateDetail(key, 'nationality', value)}
                  onPhoneChange={(value) => updateDetail(key, 'phone', value)}
                  onCountryCodeChange={(value) => updateDetail(key, 'countryCode', value)}
                  onNationalityBlur={() => setFieldTouched(key, 'nationality')}
                  onPhoneBlur={() => setFieldTouched(key, 'phone')}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky action buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 safe-area-inset-bottom">
        <div className="max-w-3xl mx-auto px-4 py-3 flex gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 inline-flex items-center justify-center rounded-lg border-2 border-slate-300 px-4 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] touch-manipulation"
          >
            Back
          </button>
          <button
            type="button"
            disabled={!isFormValid || submitting}
            onClick={handleNext}
            className="flex-1 inline-flex items-center justify-center rounded-lg bg-sky-600 text-white px-4 py-3.5 text-base font-semibold hover:bg-sky-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed touch-manipulation"
          >
            {submitting ? 'Continuing...' : 'Continue'}
          </button>
        </div>
      </div>
    </>
  );
}
