"use client";

import { useCheckin } from '../../../context/CheckinContext';
import { useRouter } from 'next/navigation';
import { Plane } from 'lucide-react';
import { FlightRoute } from '../../../components/BoardingPass/FlightRoute';
import { DateTime } from 'luxon';
import type { Passenger } from '../../../types/checkin';

const AppleWalletIcon = '/Apple_Wallet_Icon.svg';

export default function BoardingPassPage() {
  const router = useRouter();
  const { booking, selectedPassengers, reset } = useCheckin();

  const passengers = selectedPassengers;
  const flight = booking?.journeys?.[0];

  // Format time as HH:MM with timezone
  const formatTime = (dateString: string, includeTz = false, testId: string) => {
    const date = DateTime.fromISO(dateString, { setZone: true });
    const hours = date.hour.toString().padStart(2, '0');
    const minutes = date.minute.toString().padStart(2, '0');
    if (!includeTz) return `${hours}:${minutes}`;

    const tz = date.offsetNameShort;

    return (
      <span className="inline-flex items-baseline">
        <span className="text-2xl" data-testid={testId + '-time'}>{hours}:{minutes}</span>
        <span className="text-sm font-normal text-slate-500 ml-1.5" data-testid={testId + '-tz'}>{tz}</span>
      </span>
    );
  };

  // Format date as DD MMM YYYY
  const formatDate = (dateString: string, includeYear = false) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return includeYear ? `${day} ${month} ${year}` : `${day} ${month}`;
  };

  // Format day of week (e.g., Mon, Tue)
  const formatDay = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en', { weekday: 'short' });
  };

  const handleFinish = () => {
    reset();
    router.push('/');
  };

  const handleAddToWallet = (passenger: Passenger) => {
    // In a real app, this would generate a .pkpass file
    alert(`Adding boarding pass for ${passenger.firstName} ${passenger.lastName} to Apple Wallet`);
  };

  if (!booking || !flight || passengers.length === 0) {
    if (typeof window !== 'undefined') {
      router.replace('/checkin/select');
    }
    return null;
  }

  const boardingTime = formatTime(DateTime.fromISO(flight.departure.time).minus({ minutes: 40 }).toISO() || '', false, 'boardingTime');

  return (
    <>
      <div className="space-y-4 mb-4 relative z-10 mx-auto max-w-3xl lg:mt-8 pb-20">
        {passengers.map((p, idx) => {
          return (
            <div key={`${p.firstName}-${p.lastName}-${idx}`} className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Header with Qoomlee branding */}
              <div className="bg-gradient-to-r from-sky-600 to-cyan-600 px-5 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Plane className="w-6 h-6 text-white" />
                    <span className="text-2xl font-bold text-white tracking-tight">Qoomlee</span>
                  </div>
                  <div className="text-white text-sm font-medium">Boarding Pass</div>
                </div>
              </div>

              {/* Main boarding pass content */}
              <div className="p-5">
                {/* Passenger and gate info */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Passenger</div>
                    <div className="text-xl font-bold text-slate-900">{p.firstName} {p.lastName}</div>
                    <div className="text-sm text-slate-600 mt-1" data-testid={`paxType-${idx}`}>{p.paxType} • PNR: {booking.bookingRef}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-xs text-slate-500">Terminal</div>
                      <div className="text-lg font-bold" data-testid={`terminal-${idx}`}>{flight.terminal || 'TBD'}</div>
                    </div>
                    <div className="h-8 w-px bg-slate-200"></div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500">Gate</div>
                      <div className="text-lg font-bold" data-testid={`gate-${idx}`}>{flight.gate || 'TBD'}</div>
                    </div>
                  </div>
                </div>

                {/* Flight route with airport details */}
                <FlightRoute flight={flight} idx={idx} />

                {/* Flight details grid */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-slate-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-slate-500 mb-0.5">Seat</div>
                    <div className="text-lg font-bold text-slate-900" data-testid={`seat-${idx}`}>{p.seat}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2 text-center">
                    <div className="flex items-center justify-center gap-4">
                      <div>
                        <div className="text-xs text-slate-500">Zone</div>
                        <div className="text-lg font-bold" data-testid={`boardingZone-${idx}`}>{p.boardingZone}</div>
                      </div>
                      <div className="h-8 w-px bg-slate-200"></div>
                      <div>
                        <div className="text-xs text-slate-500">Seq</div>
                        <div className="text-lg font-bold" data-testid={`boardingSequence-${idx}`}>{p.boardingSequence}</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-slate-500 mb-0.5">Boarding</div>
                    <div className="text-xl font-bold text-sky-600" data-testid={`boardingTime-${idx}`}>{boardingTime}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-xs text-slate-500 mb-1">Departure</div>
                    <div className="text-xl font-bold text-slate-900">
                      {formatTime(flight.departure.time, true, `departureTime-${idx}`)}
                    </div>
                    <div className="flex items-center text-xs text-slate-500 mt-1" data-testid={`departureDay-${idx}`}>
                      <span>{formatDay(flight.departure.time)}</span>
                      <span className="mx-1">•</span>
                      <span>{formatDate(flight.departure.time, true)}</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-xs text-slate-500 mb-1">Arrival</div>
                    <div className="text-xl font-bold text-slate-900">
                      {formatTime(flight.arrival.time, true, `arrivalTime-${idx}`)}
                    </div>
                    <div className="flex items-center text-xs text-slate-500 mt-1" data-testid={`arrivalDay-${idx}`}>
                      <span>{formatDay(flight.arrival.time)}</span>
                      <span className="mx-1">•</span>
                      <span>{formatDate(flight.arrival.time, true)}</span>
                    </div>
                  </div>
                </div>

                {/* Barcode and Add to Wallet */}
                <div className="border-t border-dashed border-slate-300 pt-4 mt-4">
                  {/* Barcode */}
                  <div className="mb-4">
                    <div className="bg-white border-2 border-slate-200 rounded-lg p-4 flex items-center justify-center">
                      <svg viewBox="0 0 200 60" className="w-full h-16">
                        <g fill="black">
                          {/* Generate barcode pattern */}
                          <rect x="5" y="5" width="2" height="50" />
                          <rect x="10" y="5" width="4" height="50" />
                          <rect x="17" y="5" width="2" height="50" />
                          <rect x="22" y="5" width="3" height="50" />
                          <rect x="28" y="5" width="2" height="50" />
                          <rect x="33" y="5" width="5" height="50" />
                          <rect x="41" y="5" width="2" height="50" />
                          <rect x="46" y="5" width="3" height="50" />
                          <rect x="52" y="5" width="2" height="50" />
                          <rect x="57" y="5" width="4" height="50" />
                          <rect x="64" y="5" width="2" height="50" />
                          <rect x="69" y="5" width="3" height="50" />
                          <rect x="75" y="5" width="5" height="50" />
                          <rect x="83" y="5" width="2" height="50" />
                          <rect x="88" y="5" width="4" height="50" />
                          <rect x="95" y="5" width="2" height="50" />
                          <rect x="100" y="5" width="3" height="50" />
                          <rect x="106" y="5" width="2" height="50" />
                          <rect x="111" y="5" width="5" height="50" />
                          <rect x="119" y="5" width="2" height="50" />
                          <rect x="124" y="5" width="3" height="50" />
                          <rect x="130" y="5" width="2" height="50" />
                          <rect x="135" y="5" width="4" height="50" />
                          <rect x="142" y="5" width="2" height="50" />
                          <rect x="147" y="5" width="3" height="50" />
                          <rect x="153" y="5" width="5" height="50" />
                          <rect x="161" y="5" width="2" height="50" />
                          <rect x="166" y="5" width="4" height="50" />
                          <rect x="173" y="5" width="2" height="50" />
                          <rect x="178" y="5" width="3" height="50" />
                          <rect x="184" y="5" width="2" height="50" />
                          <rect x="189" y="5" width="6" height="50" />
                        </g>
                      </svg>
                    </div>
                    <div className="text-center text-xs text-slate-500 mt-2">
                      Scan at security and boarding gate
                    </div>
                  </div>

                  {/* Add to Apple Wallet button */}
                  <button
                    onClick={() => handleAddToWallet(p)}
                    className="w-full bg-black text-white rounded-xl px-4 py-3.5 flex items-center justify-center gap-3 hover:bg-slate-800 active:scale-[0.98] transition-all"
                  >
                    <img src={AppleWalletIcon} alt="Apple Wallet" className="w-8 h-8" />
                    <span className="font-semibold text-base">Add to Apple Wallet</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Sticky Finish button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 safe-area-inset-bottom">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <button
            type="button"
            onClick={handleFinish}
            className="w-full inline-flex items-center justify-center rounded-lg bg-sky-600 text-white px-4 py-3.5 text-base font-semibold hover:bg-sky-700 active:scale-[0.98] touch-manipulation"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}