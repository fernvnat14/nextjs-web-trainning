"use client";

import Header from '../../components/nav/Header';
import CheckinForm, { CheckinPayload } from '../../components/Checkin/CheckinForm';
import InfoCards from '../../components/InfoCards';
import TravelTipsSidebar from '../../components/TravelTipsSidebar';
import Footer from '../../components/Footer';
import MobileBottomNav from '../../components/nav/MobileBottomNav';
import { useModal } from '../../components/ModalProvider';
import { useRouter } from 'next/navigation';
import { useCheckin } from '../../context/CheckinContext';
import { checkinApi } from '../../services/checkinApi';
import { useCallback } from 'react';

export default function CheckinPage() {
    const { openModal } = useModal();
    const router = useRouter();
    const { setBooking } = useCheckin();

    const handleCheckinSubmit = useCallback(async (payload: CheckinPayload) => {
        try {
            const booking = await checkinApi.startCheckin(payload.bookingRef, payload.lastName);
            setBooking(booking as any);
            router.push('/checkin/select');
        } catch (error: any) {
            openModal({
                title: 'Check-in Error',
                message: error.userMessage || error.message,
            });
        }
    }, [setBooking, router, openModal]);

    return (
        <div id="checkin-container" className="min-h-screen bg-[#f4f7f9] flex flex-col font-sans">
            <Header />

            {/* Hero Banner matched to desktop-001-checkin.png */}
            <div className="bg-gradient-to-r from-[#6367FF] via-[#8494FF] to-[#C9BEFF] text-white py-10 sm:py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-[44px] font-bold mb-3 sm:mb-4 tracking-tight">Online Check-in</h1>
                    <p className="text-lg sm:text-xl md:text-2xl font-medium text-white/95 mb-1 sm:mb-2 tracking-wide">Fly Smart. Fly Qoomlee.</p>
                    <p className="text-sm sm:text-base text-white/90">Check in online and save time at the airport</p>
                </div>
            </div>

            <div className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                    <div className="lg:col-span-2">
                        <CheckinForm onSubmit={handleCheckinSubmit} />
                        <InfoCards />
                    </div>

                    <div className="lg:col-span-1">
                        <TravelTipsSidebar />
                    </div>
                </div>
            </div>

            <Footer />
            <MobileBottomNav />
        </div>
    );
}
