import { create } from 'zustand';
import { BookingState } from '../types';

export const useBookingStore = create<BookingState>((set) => ({
  currentBooking: null,
  
  setBookingData: (data) => set((state) => ({
    currentBooking: { ...state.currentBooking, ...data }
  })),
  
  clearBooking: () => set({ currentBooking: null }),
}));