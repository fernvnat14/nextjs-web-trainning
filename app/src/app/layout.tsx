import type { Metadata } from "next";
import { ModalProvider } from "../components/ModalProvider";
import { CheckinProvider } from "../context/CheckinContext";
import "./globals.css";

export const metadata: Metadata = {
    title: "Qoomlee Airline",
    description: "Shine and fly, reach the sky.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ModalProvider>
                    <CheckinProvider>
                        {children}
                    </CheckinProvider>
                </ModalProvider>
            </body>
        </html>
    );
}
