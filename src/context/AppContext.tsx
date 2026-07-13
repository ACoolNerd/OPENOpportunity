import React, { createContext, useContext, useState, useEffect } from 'react';

// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface UserProfile {
  name: string;
  email: string;
  handle: string;
  points: number;
  punches: number; // Tracker 0-10 for buy 10, get 1 free
  isSubscribed: boolean; // Juice Up subscription
  registeredCards: string[];
  rsvpedEvents: string[];
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  rsvps: number;
  hostName: string;
  category: string; // e.g. 'local service professional', 'tcg', 'sports', 'creators'
}

export interface CardAsset {
  code: string;
  name: string;
  type: 'GoldenDrinkCard' | 'AutographCard' | 'ChaseCollectible' | 'JuiceUpPass';
  details: string;
  pointsReward: number;
  isClaimed: boolean;
}

export interface CommunityDrinkCoupon {
  id: string;
  code: string;
  donorName: string;
  isClaimed: boolean;
  claimedBy?: string;
}

export interface StoreProduct {
  id: string;
  name: string;
  price: number; // in USD
  points: number;
  isDrink: boolean;
  image: string;
  category: 'drink' | 'item' | 'repack';
}

interface AppContextType {
  user: UserProfile | null;
  events: CommunityEvent[];
  cardAssets: CardAsset[];
  communityCoupons: CommunityDrinkCoupon[];
  products: StoreProduct[];
  login: (email: string, name: string) => void;
  logout: () => void;
  buyProduct: (productId: string) => { success: boolean; message: string };
  claimFreeDrink: () => { success: boolean; message: string };
  registerCard: (code: string) => { success: boolean; message: string };
  toggleSubscription: () => void;
  hostEvent: (eventData: Omit<CommunityEvent, 'id' | 'rsvps' | 'hostName'>) => { success: boolean };
  rsvpEvent: (eventId: string) => void;
  claimCommunityDrink: (couponId: string) => { success: boolean; message: string };
}

// ─── Initial Data ────────────────────────────────────────────────────────────

const INITIAL_EVENTS: CommunityEvent[] = [
  {
    id: 'evt-1',
    title: 'Local Service Professionals Networking & Coffee',
    description: 'An intimate, engaging space for service professionals looking for proximity to progress. Share goals, expand networks, and build connections.',
    date: '2026-07-20',
    time: '18:00',
    location: 'OPEN LA Boutique & Showroom',
    capacity: 25,
    rsvps: 12,
    hostName: 'Stephen Smalls',
    category: 'local service professional'
  },
  {
    id: 'evt-2',
    title: 'Collectors Trade Night & Pack Rip',
    description: 'Bring your trade binders and slabs. Keith McPherson is hosting a live repacking demonstration and Q&A on pricing models.',
    date: '2026-07-25',
    time: '19:00',
    location: 'ACoolCOLLECTOR Co-Op Table',
    capacity: 40,
    rsvps: 28,
    hostName: 'Keith McPherson',
    category: 'tcg'
  },
  {
    id: 'evt-3',
    title: 'Mind Openers: Local Founders Roundtable',
    description: 'An intimate, quiet roundtable discussion for startup founders and local shop operators looking to collaborate.',
    date: '2026-08-02',
    time: '17:30',
    location: 'OPEN LA Loft Space',
    capacity: 15,
    rsvps: 6,
    hostName: 'Vijay Amarahi',
    category: 'local service professional'
  }
];

const INITIAL_CARDS: CardAsset[] = [
  {
    code: 'DRINK-SHARE-777',
    name: 'Golden Drink Gift Card (1-of-10)',
    type: 'GoldenDrinkCard',
    details: 'Redeems 1 free drink for you + places 10 free drink coupons in the community pool to allow mutual interest engagement!',
    pointsReward: 200,
    isClaimed: false
  },
  {
    code: 'AUTOGRAPH-KEITH-101',
    name: 'Keith McPherson Signed 1-of-1 Autograph Card',
    type: 'AutographCard',
    details: 'Authentic 1-of-1 Keith autographed insert from Series 001 packs. Grants massive loyalty points!',
    pointsReward: 1000,
    isClaimed: false
  },
  {
    code: 'LUFFY-CHASE-001',
    name: 'One Piece Luffy Parallel Chase Card',
    type: 'ChaseCollectible',
    details: 'Exclusive Luffy Parallel Card. Grants premium points and special status.',
    pointsReward: 500,
    isClaimed: false
  },
  {
    code: 'JUICE-UP-FREE-PASS',
    name: 'Juice Up Subscription Pass Card',
    type: 'JuiceUpPass',
    details: 'Activates a free month of our Juice Up premium subscription program.',
    pointsReward: 300,
    isClaimed: false
  }
];

const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 'prod-soursop-juice',
    name: 'Premium Soursop Wellness Juice',
    price: 7.99,
    points: 80,
    isDrink: true,
    image: '🥤',
    category: 'drink'
  },
  {
    id: 'prod-latte',
    name: 'Organic Espresso Latte',
    price: 4.99,
    points: 50,
    isDrink: true,
    image: '☕',
    category: 'drink'
  },
  {
    id: 'prod-standard-repack',
    name: 'O.P.E.N. Standard Mystery Pack (Series 001)',
    price: 29.99,
    points: 300,
    isDrink: false,
    image: '🎴',
    category: 'repack'
  },
  {
    id: 'prod-premium-repack',
    name: 'O.P.E.N. Premium Mystery Pack (Series 001)',
    price: 49.99,
    points: 500,
    isDrink: false,
    image: '🔥',
    category: 'repack'
  },
  {
    id: 'prod-mystery-single',
    name: 'Vintage Collectible Mystery Single',
    price: 9.99,
    points: 100,
    isDrink: false,
    image: '🃏',
    category: 'item'
  }
];

// ─── Context Implementation ──────────────────────────────────────────────────

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [events, setEvents] = useState<CommunityEvent[]>(INITIAL_EVENTS);
  const [cardAssets, setCardAssets] = useState<CardAsset[]>(INITIAL_CARDS);
  const [communityCoupons, setCommunityCoupons] = useState<CommunityDrinkCoupon[]>([]);

  // Load state from local storage on mount (since this is sandbox client-side testing)
  useEffect(() => {
    const savedUser = localStorage.getItem('coop_user');
    const savedEvents = localStorage.getItem('coop_events');
    const savedCards = localStorage.getItem('coop_cards');
    const savedCoupons = localStorage.getItem('coop_coupons');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedEvents) setEvents(JSON.parse(savedEvents));
    if (savedCards) setCardAssets(JSON.parse(savedCards));
    if (savedCoupons) setCommunityCoupons(JSON.parse(savedCoupons));
  }, []);

  // Save changes helper
  const saveState = (updatedUser: UserProfile | null, updatedEvents?: CommunityEvent[], updatedCards?: CardAsset[], updatedCoupons?: CommunityDrinkCoupon[]) => {
    if (updatedUser !== undefined) {
      setUser(updatedUser);
      if (updatedUser) {
        localStorage.setItem('coop_user', JSON.stringify(updatedUser));
      } else {
        localStorage.removeItem('coop_user');
      }
    }
    if (updatedEvents) {
      setEvents(updatedEvents);
      localStorage.setItem('coop_events', JSON.stringify(updatedEvents));
    }
    if (updatedCards) {
      setCardAssets(updatedCards);
      localStorage.setItem('coop_cards', JSON.stringify(updatedCards));
    }
    if (updatedCoupons) {
      setCommunityCoupons(updatedCoupons);
      localStorage.setItem('coop_coupons', JSON.stringify(updatedCoupons));
    }
  };

  // Login handler
  const login = (email: string, name: string) => {
    const handle = name.toLowerCase().replace(/\s+/g, '');
    const newUser: UserProfile = {
      name,
      email,
      handle,
      points: 120, // Starting points as loyalty gift
      punches: 3,  // Seeded punches
      isSubscribed: false,
      registeredCards: [],
      rsvpedEvents: []
    };
    saveState(newUser);
  };

  // Logout handler
  const logout = () => {
    saveState(null);
  };

  // Buy Product handler
  const buyProduct = (productId: string) => {
    if (!user) return { success: false, message: 'Please log in to make purchases.' };
    const product = STORE_PRODUCTS.find((p) => p.id === productId);
    if (!product) return { success: false, message: 'Product not found.' };

    const multiplier = user.isSubscribed ? 1.5 : 1.0;
    const addedPoints = Math.round(product.points * multiplier);
    let addedPunches = 0;

    if (product.isDrink) {
      addedPunches = 1;
    }

    const updatedUser = {
      ...user,
      points: user.points + addedPoints,
      punches: product.isDrink ? (user.punches + addedPunches) : user.punches
    };

    saveState(updatedUser);
    
    let confirmationMsg = `Successfully purchased ${product.name}! Earned ${addedPoints} points.`;
    if (product.isDrink) {
      confirmationMsg += ` Added 1 punch to your drink card (Current punches: ${updatedUser.punches % 10}/10).`;
    }
    return { success: true, message: confirmationMsg };
  };

  // Claim Free Drink handler
  const claimFreeDrink = () => {
    if (!user) return { success: false, message: 'Please log in to redeem rewards.' };
    if (user.punches < 10) {
      return { success: false, message: `You need 10 punches to claim a free drink. Currently you have ${user.punches % 10}.` };
    }

    const updatedUser = {
      ...user,
      punches: user.punches - 10
    };

    saveState(updatedUser);
    return { success: true, message: 'Redeemed 10 punches! Enjoy your free Soursop wellness drink!' };
  };

  // Register Card handler
  const registerCard = (code: string) => {
    if (!user) return { success: false, message: 'Please log in to register cards.' };
    
    const formattedCode = code.trim().toUpperCase();
    if (user.registeredCards.includes(formattedCode)) {
      return { success: false, message: 'This card is already registered to your account.' };
    }

    const card = cardAssets.find((c) => c.code === formattedCode);
    if (!card) {
      return { success: false, message: 'Invalid registration code. Please check your physical card.' };
    }

    if (card.isClaimed) {
      return { success: false, message: 'This physical card has already been registered by another user.' };
    }

    // Process card claim
    const updatedCards = cardAssets.map((c) => 
      c.code === formattedCode ? { ...c, isClaimed: true } : c
    );

    let multiplier = user.isSubscribed ? 1.5 : 1.0;
    let rewardPoints = Math.round(card.pointsReward * multiplier);
    let newSubscriptionState = user.isSubscribed;
    let newPunches = user.punches;

    const newRegisteredCards = [...user.registeredCards, formattedCode];
    const newCoupons = [...communityCoupons];

    // Card specific triggers
    if (card.type === 'GoldenDrinkCard') {
      newPunches += 10; // Instantly grants a free drink (10 punches)
      // Spawn 10 coupons for the community board
      for (let i = 1; i <= 10; i++) {
        newCoupons.push({
          id: `coupon-${formattedCode}-${i}`,
          code: `GIFT-${formattedCode}-${Math.floor(1000 + Math.random() * 9000)}`,
          donorName: user.name,
          isClaimed: false
        });
      }
    } else if (card.type === 'JuiceUpPass') {
      newSubscriptionState = true;
    }

    const updatedUser: UserProfile = {
      ...user,
      points: user.points + rewardPoints,
      punches: newPunches,
      isSubscribed: newSubscriptionState,
      registeredCards: newRegisteredCards
    };

    saveState(updatedUser, events, updatedCards, newCoupons);

    let successMsg = `Successfully registered ${card.name}! Earned ${rewardPoints} points.`;
    if (card.type === 'GoldenDrinkCard') {
      successMsg += ' You received 10 drink punches (1 free drink) + spawned 10 free drink coupons on the community board for others!';
    } else if (card.type === 'JuiceUpPass') {
      successMsg += ' Premium Juice Club subscription activated!';
    }

    return { success: true, message: successMsg };
  };

  // Toggle Subscription
  const toggleSubscription = () => {
    if (!user) return;
    const updatedUser = {
      ...user,
      isSubscribed: !user.isSubscribed
    };
    saveState(updatedUser);
  };

  // Host Event handler
  const hostEvent = (eventData: Omit<CommunityEvent, 'id' | 'rsvps' | 'hostName'>) => {
    if (!user) return { success: false };
    
    const newEvent: CommunityEvent = {
      ...eventData,
      id: `evt-${Date.now()}`,
      rsvps: 0,
      hostName: user.name
    };

    const updatedEvents = [newEvent, ...events];
    saveState(user, updatedEvents);
    return { success: true };
  };

  // RSVP Event handler
  const rsvpEvent = (eventId: string) => {
    if (!user) return;
    
    const isAlreadyRsvped = user.rsvpedEvents.includes(eventId);
    let updatedRsvped = [...user.rsvpedEvents];

    if (isAlreadyRsvped) {
      updatedRsvped = updatedRsvped.filter((id) => id !== eventId);
    } else {
      updatedRsvped.push(eventId);
    }

    const updatedEvents = events.map((e) => {
      if (e.id === eventId) {
        return {
          ...e,
          rsvps: isAlreadyRsvped ? Math.max(0, e.rsvps - 1) : e.rsvps + 1
        };
      }
      return e;
    });

    const updatedUser = {
      ...user,
      rsvpedEvents: updatedRsvped
    };

    saveState(updatedUser, updatedEvents);
  };

  // Claim Community Drink handler
  const claimCommunityDrink = (couponId: string) => {
    if (!user) return { success: false, message: 'Please log in to claim drinks.' };
    
    const couponIndex = communityCoupons.findIndex((c) => c.id === couponId && !c.isClaimed);
    if (couponIndex === -1) {
      return { success: false, message: 'This drink coupon has already been claimed or does not exist.' };
    }

    const updatedCoupons = communityCoupons.map((c) => 
      c.id === couponId ? { ...c, isClaimed: true, claimedBy: user.name } : c
    );

    const updatedUser = {
      ...user,
      punches: user.punches + 1 // Add 1 free punch for claiming!
    };

    saveState(updatedUser, events, cardAssets, updatedCoupons);
    return { success: true, message: `Successfully claimed a free drink coupon gifted by ${communityCoupons[couponIndex].donorName}! Coupon Code: ${communityCoupons[couponIndex].code}. Enjoy!` };
  };

  return (
    <AppContext.Provider
      value={{
        user,
        events,
        cardAssets,
        communityCoupons,
        products: STORE_PRODUCTS,
        login,
        logout,
        buyProduct,
        claimFreeDrink,
        registerCard,
        toggleSubscription,
        hostEvent,
        rsvpEvent,
        claimCommunityDrink
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
