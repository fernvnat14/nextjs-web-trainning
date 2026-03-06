# Qoomlee Next.js Check-in App

This project is a Next.js (App Router) migration of the Qoomlee Airline Check-in flow. It features responsive, modern designs that map the complete user flow from finding a booking to receiving a boarding pass.

## Prerequisites

- Node.js 18+  
- [Bun](https://bun.sh/) (recommended for faster package management and script execution)

## Getting Started

1. **Install dependencies** (if not already installed):
   ```bash
   bun install
   ```
2. **Run the development server**:
   ```bash
   bun run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser. The app will automatically redirect to the `/checkin` flow.

## Test Cases 🧪

To test the application without a real backend, several mock bookings are provided. You can manually type these into the Check-in form or use the **"Test Cases"** quick-fill buttons natively built into the UI:

*   **Case 1: Standard Check-in (Multi-Passenger Mix)**
    *   **Last Name:** `Huum`
    *   **Booking Ref (PNR):** `ABC123`
    *   *Details:* Contains two passengers, testing both checked-in states and fresh check-in states.
*   **Case 2: Different Passenger (Single Passenger)**
    *   **Last Name:** `Smith`
    *   **Booking Ref (PNR):** `XYZ789`
    *   *Details:* A standard single passenger US flight checkout.
*   **Case 3: Long Booking Reference**
    *   **Last Name:** `Johnson`
    *   **Booking Ref (PNR):** `LONG123456`
    *   *Details:* Tests the UI constraints and interactions with non-standard PNR lengths.
*   **Case 4: Not Eligible (Ineligible Booking)**
    *   **Last Name:** `Doe`
    *   **Booking Ref (PNR):** `NOCHECKIN`
    *   *Details:* Demonstrates the error handling and modal popup functionality for flights closed to online check-ins.

Similarly, on the **Passenger Details** page, you'll find quick-fill buttons to test different International formats for nationality and phone validation (e.g., TH, US, SG).

## App Architecture & Routing

This app fully embraces the **Next.js App Router**:
*   `/checkin` -> Initial booking retrieval screen.
*   `/checkin/select` -> Passenger selection interface.
*   `/checkin/details` -> Mandatory safety forms and ID info.
*   `/checkin/dg` -> Dangerous Goods declaration logic.
*   `/checkin/boarding` -> Final interactive Boarding Pass screen with Apple Wallet placeholder UI.

Global state management is driven cleanly decoupled via the `src/context/CheckinContext.tsx` provider wrapping the primary App layout.
