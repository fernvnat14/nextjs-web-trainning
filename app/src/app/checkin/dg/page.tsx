"use client";

import { useCheckin } from '../../../context/CheckinContext';
import { useRouter } from 'next/navigation';

export default function DangerousGoodsPage() {
  const router = useRouter();
  const { booking } = useCheckin();

  const handleAccept = () => {
    router.push('/checkin/boarding');
  };

  const handleBack = () => {
    router.push('/checkin/details');
  };

  if (!booking) {
    if (typeof window !== 'undefined') {
      router.replace('/checkin/select');
    }
    return null;
  }

  return (
    <>
      {/* Policy Content */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden mb-4 relative z-10 mx-auto max-w-3xl lg:mt-8">
        <div className="px-5 pt-5 pb-4 bg-gradient-to-b from-slate-50/50 to-white border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Dangerous Goods Declaration</h3>
          <p className="text-sm text-slate-600 mt-1.5">A mandatory safety and legal declaration as required by Thai law (CAAT/AOT).</p>
        </div>
        <div className="p-5 sm:p-6">
          <div className="text-base text-slate-700 space-y-4">
            <p className="leading-relaxed font-semibold text-red-600"> For the safety of the flight, the transport of specific hazardous items is strictly forbidden. </p>
            <p className="leading-relaxed"> By continuing, you confirm that you and those in your booking are NOT carrying the following Dangerous Goods in your carry-on or checked baggage, which are prohibited under all circumstances: </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Explosives (e.g., Fireworks, Flares, Ammunition, Toy Caps, Gunpowder).</li>
              <li>Flammable Items (e.g., Flammable Gases, Gasoline, Lighter Fluid, Aerosol Paints, Strike-Anywhere Matches).</li>
              <li>Corrosives & Poisons (e.g., Acids, Bleach, Pesticides, Toxic or Infectious Substances).</li>
              <li>Lithium Battery-Powered Vehicles (e.g., Hoverboards, Self-Balancing Wheels, Mini-Segways are forbidden in all baggage).</li>
              <li>Other items like Tear Gas, Pepper Spray, or Radioactive Material.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sticky action buttons and NEW acceptance wording */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 safe-area-inset-bottom">
        {/* NEW Acceptance Wording moved above the buttons */}
        <div className="max-w-3xl mx-auto px-4 pt-3 pb-2">
          <p className="text-sm font-medium text-slate-700 text-center leading-relaxed">
            I understand and accept the dangerous goods policy.
          </p>
        </div>

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
            onClick={handleAccept}
            className="flex-1 inline-flex items-center justify-center rounded-lg bg-sky-600 text-white px-4 py-3.5 text-base font-semibold hover:bg-sky-700 active:scale-[0.98] touch-manipulation"
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </>
  );
}