import { City, User, Booking } from '../types';

export const cities: City[] = [
  {
    id: 'birmingham',
    name: 'Birmingham',
    heroImage: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg',
    towns: [
      {
        id: 'oldbury',
        name: 'Oldbury',
        image: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg',
        venues: [
          {
            id: 'abandoned-mill',
            name: 'Abandoned Textile Mill',
            images: [
              'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg',
              'https://images.pexels.com/photos/274001/pexels-photo-274001.jpeg'
            ],
            address: '45 Mill Lane, Oldbury, B69 4PX',
            capacity: 12,
            experiences: ['MOVIE', 'VR'],
            basePriceGBP: 35,
            description: 'Experience terror in this genuinely haunted Victorian textile mill. With its crumbling machinery and ghostly whispers echoing through the halls, this venue offers an authentic supernatural encounter.',
            safetyNotes: 'Uneven floors, low lighting conditions. Not suitable for those with mobility issues or claustrophobia.',
          }
        ]
      },
      {
        id: 'edgbaston',
        name: 'Edgbaston',
        image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg',
        venues: [
          {
            id: 'old-cinema',
            name: 'Old Cinema Basement',
            images: [
              'https://images.pexels.com/photos/274001/pexels-photo-274001.jpeg',
              'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg'
            ],
            address: '28 Church Road, Edgbaston, B15 3SH',
            capacity: 8,
            experiences: ['MOVIE', 'VR'],
            basePriceGBP: 42,
            description: 'Descend into the forgotten basement of a 1920s cinema where the projectors still flicker with ghostly images. Perfect for immersive horror experiences.',
            safetyNotes: 'Steep stairs, confined spaces. Maximum 8 people for safety reasons.',
          }
        ]
      },
      {
        id: 'harborne',
        name: 'Harborne',
        image: 'https://images.pexels.com/photos/274001/pexels-photo-274001.jpeg',
        venues: [
          {
            id: 'canal-tunnel',
            name: 'Canal Tunnel Entrance',
            images: [
              'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg',
              'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg'
            ],
            address: 'Harborne Canal, B17 0BD',
            capacity: 15,
            experiences: ['VR'],
            basePriceGBP: 28,
            description: 'Enter the darkness of the historic Harborne Canal tunnel. The echoing chambers and dripping walls create the perfect atmosphere for VR horror adventures.',
            safetyNotes: 'Damp conditions, echo effects may be intense. Waterproof footwear recommended.',
          }
        ]
      }
    ]
  },
  {
    id: 'london',
    name: 'London',
    heroImage: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg',
    towns: [
      {
        id: 'shoreditch',
        name: 'Shoreditch',
        image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg',
        venues: [
          {
            id: 'victorian-mortuary',
            name: 'Victorian Mortuary',
            images: [
              'https://images.pexels.com/photos/274001/pexels-photo-274001.jpeg',
              'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg'
            ],
            address: '12 Bethnal Green Rd, London E1 6GY',
            capacity: 10,
            experiences: ['MOVIE', 'VR'],
            basePriceGBP: 55,
            description: 'A genuine Victorian mortuary with original fixtures. The marble slabs and preservation chambers provide an authentically chilling experience.',
            safetyNotes: 'Very cold conditions, sensitive historical artifacts. Please respect the venue.',
          }
        ]
      }
    ]
  }
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    role: 'CUSTOMER',
    name: 'John Doe',
    email: 'john@example.com'
  },
  {
    id: 'admin1',
    role: 'ADMIN',
    name: 'Admin User',
    email: 'admin@fadedsteps.com'
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'booking1',
    userId: 'user1',
    venueId: 'abandoned-mill',
    experience: 'VR',
    date: '2025-02-15',
    time: '19:00',
    guests: 4,
    addons: ['snacks', 'extra-vr'],
    totalGBP: 160,
    status: 'CONFIRMED'
  }
];

export const timeSlots = [
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
];

export const addons = [
  { id: 'snacks', name: 'Horror Snacks Pack', price: 8 },
  { id: 'extra-vr', name: 'Extra VR Headset', price: 15 },
  { id: 'photo-package', name: 'Photo Package', price: 12 },
];