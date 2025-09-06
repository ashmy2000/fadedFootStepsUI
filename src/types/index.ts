export interface City {
  id: string;
  name: string;
  heroImage: string;
  towns: Town[];
}

export interface Town {
  id: string;
  name: string;
  image: string;
  venues: Venue[];
}

export interface Venue {
  id: string;
  name: string;
  images: string[];
  address: string;
  capacity: number;
  experiences: Array<'MOVIE' | 'VR'>;
  basePriceGBP: number;
  description: string;
  safetyNotes: string;
}

export interface Booking {
  id: string;
  userId: string;
  venueId: string;
  experience: 'MOVIE' | 'VR';
  date: string;
  time: string;
  guests: number;
  addons: string[];
  totalGBP: number;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED';
}

export interface User {
  id: string;
  role: 'CUSTOMER' | 'ADMIN';
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'CUSTOMER' | 'ADMIN', inviteCode?: string) => Promise<boolean>;
  logout: () => void;
}

export interface BookingState {
  currentBooking: Partial<Booking> | null;
  setBookingData: (data: Partial<Booking>) => void;
  clearBooking: () => void;
}