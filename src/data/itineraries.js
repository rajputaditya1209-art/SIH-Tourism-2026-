export const itineraries = {
  lonavala: {
    destination: 'Lonavala',
    summary: {
      accommodation: '₹4,500',
      food: '₹2,300',
      transport: '₹2,100',
      activities: '₹1,600',
      total: '₹10,500',
    },
    days: [
      {
        day: 1,
        time: '09:00 AM',
        activity: 'Check-in and easy breakfast near the hill station',
        cost: '₹600',
        location: 'Lonavala town',
      },
      {
        day: 1,
        time: '11:30 AM',
        activity: 'Explore Karla Caves and a nature trail',
        cost: '₹900',
        location: 'Karla Caves',
      },
      {
        day: 1,
        time: '06:30 PM',
        activity: 'Sunset point and local café stop',
        cost: '₹700',
        location: 'Tiger Point',
      },
      {
        day: 2,
        time: '08:30 AM',
        activity: 'Waterfall and viewpoint drive',
        cost: '₹500',
        location: 'Bhushi Dam',
      },
      {
        day: 2,
        time: '01:00 PM',
        activity: 'Local Maharashtrian lunch and market walk',
        cost: '₹800',
        location: 'Market area',
      },
      {
        day: 2,
        time: '04:00 PM',
        activity: 'Short trekking route and scenic rest stop',
        cost: '₹600',
        location: 'Forest trail',
      },
      {
        day: 3,
        time: '09:00 AM',
        activity: 'Heritage walk and local shopping',
        cost: '₹650',
        location: 'Town market',
      },
      {
        day: 3,
        time: '12:30 PM',
        activity: 'Lunch and return journey planning',
        cost: '₹700',
        location: 'Local cafe',
      },
    ],
  },
  matheran: {
    destination: 'Matheran',
    summary: {
      accommodation: '₹3,800',
      food: '₹2,200',
      transport: '₹1,800',
      activities: '₹1,500',
      total: '₹9,300',
    },
    days: [
      {
        day: 1,
        time: '09:00 AM',
        activity: 'Arrival, hotel check-in, and forest walk',
        cost: '₹500',
        location: 'Matheran town',
      },
      {
        day: 1,
        time: '02:00 PM',
        activity: 'Panorama Point and scenic picnic break',
        cost: '₹700',
        location: 'Panorama Point',
      },
      {
        day: 1,
        time: '06:30 PM',
        activity: 'Sunset view and local dinner',
        cost: '₹700',
        location: 'Echo Point',
      },
      {
        day: 2,
        time: '07:30 AM',
        activity: 'Nature trail and photography drive',
        cost: '₹600',
        location: 'Forest route',
      },
      {
        day: 2,
        time: '12:30 PM',
        activity: 'Lunch with local specialties',
        cost: '₹650',
        location: 'Main market',
      },
      {
        day: 2,
        time: '03:30 PM',
        activity: 'Horse carriage or easy sightseeing ride',
        cost: '₹800',
        location: 'Town circle',
      },
      {
        day: 3,
        time: '08:30 AM',
        activity: 'Visit Charlotte Lake and local trails',
        cost: '₹600',
        location: 'Charlotte Lake',
      },
      {
        day: 3,
        time: '01:00 PM',
        activity: 'Shopping and return journey planning',
        cost: '₹500',
        location: 'Market',
      },
    ],
  },
};

export const getDefaultItinerary = (destinationId = 'matheran') => {
  return itineraries[destinationId] || itineraries.matheran;
};
