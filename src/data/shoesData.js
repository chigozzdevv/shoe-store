// src/data/shoesData.js
import { create } from 'zustand';

const initialShoeData = [
  {
    id: 1,
    name: "Air Zoom Elite",
    description: "Lightweight performance running shoes with responsive cushioning and breathable mesh upper. Ideal for daily training and tempo runs.",
    price: 129.99,
    sizeInventory: [
      { size: 7, quantity: 5 },
      { size: 8, quantity: 4 },
      { size: 9, quantity: 6 },
      { size: 10, quantity: 3 },
      { size: 11, quantity: 4 },
      { size: 12, quantity: 3 },
    ],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    color: "Black/Red",
    brand: "NikeX",
    category: "Running"
  },
  {
    id: 2,
    name: "Urban Street Walker",
    description: "Casual shoes perfect for everyday city life with cushioned insole and durable outsole. Premium materials make these comfortable for all-day wear.",
    price: 89.99,
    sizeInventory: [
      { size: 6, quantity: 3 },
      { size: 7, quantity: 4 },
      { size: 8, quantity: 5 },
      { size: 9, quantity: 2 },
      { size: 10, quantity: 3 },
      { size: 11, quantity: 1 },
    ],
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    color: "White",
    brand: "Adidox",
    category: "Casual"
  },
  {
    id: 3,
    name: "Business Executive",
    description: "Elegant formal shoes for professional settings. Hand-crafted from genuine leather with memory foam insole for all-day comfort in the office or at special events.",
    price: 149.99,
    sizeInventory: [
      { size: 8, quantity: 2 },
      { size: 9, quantity: 3 },
      { size: 10, quantity: 3 },
      { size: 11, quantity: 2 },
      { size: 12, quantity: 2 },
    ],
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZHJlc3MlMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D",
    color: "Brown",
    brand: "Clarksford",
    category: "Formal"
  },
  {
    id: 4,
    name: "Trail Blazer",
    description: "Durable hiking boots with superior ankle support and waterproof Gore-Tex membrane. Vibram outsole provides exceptional grip on varied terrain.",
    price: 159.99,
    sizeInventory: [
      { size: 7, quantity: 3 },
      { size: 8, quantity: 3 },
      { size: 9, quantity: 4 },
      { size: 10, quantity: 3 },
      { size: 11, quantity: 2 },
    ],
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlraW5nJTIwYm9vdHN8ZW58MHx8MHx8fDA%3D",
    color: "Green/Brown",
    brand: "MountainX",
    category: "Hiking"
  },
  {
    id: 5,
    name: "Sport Elite Pro",
    description: "Versatile athletic shoes for various sports with responsive cushioning and lateral support. Breathable upper keeps feet cool during intense activities.",
    price: 119.99,
    sizeInventory: [
      { size: 6, quantity: 2 },
      { size: 7, quantity: 3 },
      { size: 8, quantity: 4 },
      { size: 9, quantity: 5 },
      { size: 10, quantity: 3 },
      { size: 11, quantity: 2 },
      { size: 12, quantity: 1 },
    ],
    image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNwb3J0JTIwc2hvZXN8ZW58MHx8MHx8fDA%3D",
    color: "Blue/White",
    brand: "NikeX",
    category: "Athletic"
  },
  {
    id: 6,
    name: "Summer Breeze",
    description: "Comfortable slip-on shoes for warm weather with moisture-wicking lining and cushioned footbed. Perfect for beach outings and casual summer days.",
    price: 69.99,
    sizeInventory: [
      { size: 6, quantity: 5 },
      { size: 7, quantity: 6 },
      { size: 8, quantity: 6 },
      { size: 9, quantity: 5 },
      { size: 10, quantity: 5 },
      { size: 11, quantity: 3 },
    ],
    image: "https://images.unsplash.com/photo-1469395446868-fb6a048d5ca3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNsaXAlMjBvbiUyMHNob2VzfGVufDB8fDB8fHww",
    color: "Beige",
    brand: "Crocs",
    category: "Casual"
  },
  {
    id: 7,
    name: "Cloud Walker",
    description: "Ultra-cushioned walking shoes with proprietary foam technology for maximum comfort. Designed for those who are on their feet all day.",
    price: 109.99,
    sizeInventory: [
      { size: 7, quantity: 3 },
      { size: 8, quantity: 4 },
      { size: 9, quantity: 5 },
      { size: 10, quantity: 6 },
      { size: 11, quantity: 3 },
      { size: 12, quantity: 1 },
    ],
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tZm9ydCUyMHNob2VzfGVufDB8fDB8fHww",
    color: "Grey/Blue",
    brand: "Hoka",
    category: "Walking"
  },
  {
    id: 8,
    name: "Retro Classic",
    description: "Vintage-inspired sneakers with modern comfort features. These iconic shoes blend nostalgic design with contemporary technology.",
    price: 99.99,
    sizeInventory: [
      { size: 6, quantity: 2 },
      { size: 7, quantity: 3 },
      { size: 8, quantity: 3 },
      { size: 9, quantity: 3 },
      { size: 10, quantity: 3 },
      { size: 11, quantity: 2 },
      { size: 12, quantity: 1 },
    ],
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNuZWFrZXJzfGVufDB8fDB8fHww",
    color: "White/Red",
    brand: "Reebox",
    category: "Casual"
  },
  {
    id: 9,
    name: "Aqua Stride",
    description: "Water-resistant shoes perfect for rainy days and light water activities. Quick-drying materials and non-slip soles keep you safe on wet surfaces.",
    price: 89.99,
    sizeInventory: [
      { size: 7, quantity: 2 },
      { size: 8, quantity: 3 },
      { size: 9, quantity: 4 },
      { size: 10, quantity: 3 },
      { size: 11, quantity: 2 },
    ],
    image: "https://images.unsplash.com/photo-1578116922645-3976907a7671?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXJwcm9vZiUyMHNob2VzfGVufDB8fDB8fHww",
    color: "Navy/Teal",
    brand: "Keens",
    category: "Outdoor"
  },
  {
    id: 10,
    name: "Minimal Runner",
    description: "Barefoot-style running shoes with zero drop and wide toe box for natural movement. Ultra-lightweight design makes you feel connected to the ground.",
    price: 119.99,
    sizeInventory: [
      { size: 6, quantity: 1 },
      { size: 7, quantity: 2 },
      { size: 8, quantity: 2 },
      { size: 9, quantity: 2 },
      { size: 10, quantity: 1 },
      { size: 11, quantity: 1 },
      { size: 12, quantity: 1 },
    ],
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJ1bm5pbmclMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D",
    color: "Black/Neon",
    brand: "Altra",
    category: "Running"
  },
  {
    id: 11,
    name: "Luxury Loafer",
    description: "Premium handcrafted leather loafers with hand-stitched details. The epitome of casual luxury for the discerning gentleman.",
    price: 199.99,
    sizeInventory: [
      { size: 8, quantity: 1 },
      { size: 9, quantity: 2 },
      { size: 10, quantity: 2 },
      { size: 11, quantity: 2 },
      { size: 12, quantity: 1 },
    ],
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZHJlc3MlMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D",
    color: "Burgundy",
    brand: "Gucci",
    category: "Formal"
  },
  {
    id: 12,
    name: "Eco Friendly Trainer",
    description: "Sustainable sneakers made from recycled materials and natural rubber. Carbon-neutral manufacturing process makes these the environmentally conscious choice.",
    price: 129.99,
    sizeInventory: [
      { size: 6, quantity: 2 },
      { size: 7, quantity: 2 },
      { size: 8, quantity: 2 },
      { size: 9, quantity: 2 },
      { size: 10, quantity: 2 },
      { size: 11, quantity: 2 },
    ],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    color: "Natural/Green",
    brand: "Allbirds",
    category: "Casual"
  }
];

// Helper function to get total quantity for a shoe
const getTotalQuantity = (sizeInventory) => {
  return sizeInventory.reduce((total, item) => total + item.quantity, 0);
};

// Create a store to manage the shoe inventory
export const useShoeStore = create((set, get) => ({
  shoes: initialShoeData,
  
  // Get total quantity for a specific shoe
  getTotalQuantity: (shoeId) => {
    const shoe = get().shoes.find(s => s.id === shoeId);
    return shoe ? getTotalQuantity(shoe.sizeInventory) : 0;
  },
  
  // Get quantity for a specific shoe and size
  getSizeQuantity: (shoeId, size) => {
    const shoe = get().shoes.find(s => s.id === shoeId);
    if (!shoe) return 0;
    
    const sizeItem = shoe.sizeInventory.find(s => s.size === size);
    return sizeItem ? sizeItem.quantity : 0;
  },
  
  // Check if a specific size is available for a shoe
  isSizeAvailable: (shoeId, size) => {
    return get().getSizeQuantity(shoeId, size) > 0;
  },
  
  // Reduce quantity when purchase is made
  updateQuantity: (shoeId, size, quantityToRemove) => {
    set((state) => ({
      shoes: state.shoes.map(shoe => 
        shoe.id === shoeId 
          ? {
              ...shoe,
              sizeInventory: shoe.sizeInventory.map(sizeItem => 
                sizeItem.size === size
                  ? { ...sizeItem, quantity: Math.max(0, sizeItem.quantity - quantityToRemove) }
                  : sizeItem
              )
            } 
          : shoe
      )
    }));
  },
  
  // Reset inventory to initial state (for demo purposes)
  resetInventory: () => {
    set({ shoes: initialShoeData });
  },
  
  // Get all available sizes for a shoe
  getAvailableSizes: (shoeId) => {
    const shoe = get().shoes.find(s => s.id === shoeId);
    if (!shoe) return [];
    
    return shoe.sizeInventory
      .filter(sizeItem => sizeItem.quantity > 0)
      .map(sizeItem => sizeItem.size);
  },
  
  // Get all sizes (regardless of availability) for a shoe
  getAllSizes: (shoeId) => {
    const shoe = get().shoes.find(s => s.id === shoeId);
    if (!shoe) return [];
    
    return shoe.sizeInventory.map(sizeItem => sizeItem.size);
  }
}));

// Helper function to calculate total quantity
export const calculateTotalQuantity = (shoe) => {
  return getTotalQuantity(shoe.sizeInventory);
};

// Backward compatibility - for components that expect "sizes" and "quantity" properties
export const getProcessedShoeData = () => {
  return initialShoeData.map(shoe => ({
    ...shoe,
    sizes: shoe.sizeInventory.map(item => item.size),
    quantity: getTotalQuantity(shoe.sizeInventory)
  }));
};

export const shoesData = getProcessedShoeData();

// For sales data (dashboard)
export const salesData = {
  weekly: [1200, 1500, 1300, 1700, 1600, 1800, 2000],
  topSellers: [
    { name: "Air Zoom Elite", count: 42 },
    { name: "Urban Street Walker", count: 38 },
    { name: "Business Executive", count: 25 }
  ]
};