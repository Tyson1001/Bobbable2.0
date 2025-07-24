import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Sparkles, Plus, Eye, Star, Clock, Award, Users, Heart } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [showImages, setShowImages] = useState(false);

  const drinks = [
    { name: 'Classic Milk Tea', price: 4.50, category: 'milk-tea', popular: true },
    { name: 'Taro Milk Tea', price: 5.00, category: 'milk-tea', popular: true },
    { name: 'Thai Tea', price: 4.75, category: 'milk-tea' },
    { name: 'Matcha Latte', price: 5.25, category: 'specialty', popular: true },
    { name: 'Brown Sugar Milk Tea', price: 5.50, category: 'milk-tea' },
    { name: 'Honeydew Smoothie', price: 4.25, category: 'smoothie' },
    { name: 'Mango Green Tea', price: 4.00, category: 'fruit-tea' },
    { name: 'Passion Fruit Tea', price: 4.00, category: 'fruit-tea' },
    { name: 'Coconut Milk Tea', price: 4.75, category: 'milk-tea' },
    { name: 'Jasmine Green Tea', price: 3.50, category: 'tea' },
    { name: 'Oolong Tea', price: 3.75, category: 'tea' },
    { name: 'Lychee Black Tea', price: 4.25, category: 'fruit-tea' },
    { name: 'Rose Milk Tea', price: 5.00, category: 'specialty' },
    { name: 'Wintermelon Tea', price: 3.75, category: 'tea' },
    { name: 'Peach Oolong', price: 4.50, category: 'fruit-tea' },
    { name: 'Lavender Honey Tea', price: 4.75, category: 'specialty' },
    { name: 'Strawberry Milk Tea', price: 4.50, category: 'milk-tea' },
    { name: 'Coffee Milk Tea', price: 5.25, category: 'specialty' },
    { name: 'Earl Grey Milk Tea', price: 4.25, category: 'milk-tea' },
    { name: 'Pineapple Green Tea', price: 4.00, category: 'fruit-tea' },
    { name: 'Almond Milk Tea', price: 5.00, category: 'milk-tea' },
    { name: 'Grapefruit Green Tea', price: 4.25, category: 'fruit-tea' },
    { name: 'Vanilla Milk Tea', price: 4.75, category: 'milk-tea' },
    { name: 'Lemon Honey Tea', price: 3.50, category: 'tea' }
  ];

  const categories = [
    { id: 'all', name: 'All Drinks', icon: () => (
      <svg viewBox="0 0 24 32" className="w-5 h-5">
        <path d="M5 8 L19 8 L18 28 L6 28 Z" fill="currentColor" opacity="0.3"/>
        <path d="M6 9 L18 9 L17 27 L7 27 Z" fill="currentColor" opacity="0.7"/>
        <ellipse cx="12" cy="9" rx="6" ry="2" fill="currentColor"/>
        <circle cx="9" cy="25" r="1" fill="currentColor"/>
        <circle cx="12" cy="26" r="1" fill="currentColor"/>
        <circle cx="15" cy="25" r="1" fill="currentColor"/>
      </svg>
    ) },
    { id: 'milk-tea', name: 'Milk Tea', icon: () => (
      <svg viewBox="0 0 24 32" className="w-5 h-5">
        <path d="M5 8 L19 8 L18 28 L6 28 Z" fill="currentColor" opacity="0.3"/>
        <path d="M6 9 L18 9 L17 27 L7 27 Z" fill="currentColor" opacity="0.7"/>
        <ellipse cx="12" cy="9" rx="6" ry="2" fill="currentColor"/>
        <circle cx="9" cy="25" r="1" fill="currentColor"/>
        <circle cx="12" cy="26" r="1" fill="currentColor"/>
        <circle cx="15" cy="25" r="1" fill="currentColor"/>
      </svg>
    ) },
    { id: 'fruit-tea', name: 'Fruit Tea', icon: () => (
      <svg viewBox="0 0 24 32" className="w-5 h-5">
        {/* Cup outline */}
        <path d="M5 8 L19 8 L18 28 L6 28 Z" fill="currentColor" opacity="0.3"/>
        <path d="M6 9 L18 9 L17 27 L7 27 Z" fill="currentColor" opacity="0.5"/>
        <ellipse cx="12" cy="9" rx="6" ry="2" fill="currentColor"/>
        {/* Fruit slices */}
        <circle cx="8" cy="15" r="2" fill="currentColor" opacity="0.8"/>
        <circle cx="16" cy="18" r="1.5" fill="currentColor" opacity="0.8"/>
        <circle cx="10" cy="22" r="1.5" fill="currentColor" opacity="0.8"/>
        <circle cx="14" cy="20" r="1" fill="currentColor" opacity="0.8"/>
        {/* Fruit garnish on top */}
        <path d="M10 7 Q12 5 14 7" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.9"/>
        <circle cx="12" cy="6" r="1" fill="currentColor" opacity="0.9"/>
      </svg>
    ) },
    { id: 'specialty', name: 'Specialty', icon: Sparkles },
    { id: 'tea', name: 'Pure Tea', icon: () => (
      <svg viewBox="0 0 24 32" className="w-5 h-5">
        {/* Traditional teacup shape */}
        <path d="M6 12 L18 12 L17 26 L7 26 Z" fill="currentColor" opacity="0.4"/>
        <path d="M7 13 L17 13 L16 25 L8 25 Z" fill="currentColor" opacity="0.6"/>
        <ellipse cx="12" cy="13" rx="5" ry="1.5" fill="currentColor"/>
        {/* Tea handle */}
        <path d="M18 16 Q22 16 22 20 Q22 24 18 24" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.8"/>
        {/* Steam lines */}
        <path d="M9 10 Q9 8 10 8 Q10 6 9 6" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7"/>
        <path d="M12 10 Q12 8 13 8 Q13 6 12 6" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7"/>
        <path d="M15 10 Q15 8 16 8 Q16 6 15 6" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7"/>
      </svg>
    ) },
    { id: 'smoothie', name: 'Smoothies', icon: Heart }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredDrinks = selectedCategory === 'all' 
    ? drinks 
    : drinks.filter(drink => drink.category === selectedCategory);

  const addToCart = (drinkName: string) => {
    setCart(prev => ({
      ...prev,
      [drinkName]: (prev[drinkName] || 0) + 1
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [name, count]) => {
      const drink = drinks.find(d => d.name === name);
      return sum + (drink ? drink.price * count : 0);
    }, 0);
  };

  const generateDrinkImage = (name: string) => {
    if (name === 'Taro Milk Tea') {
      return (
        <svg viewBox="0 0 120 160" className="w-full h-full">
          <defs>
            <linearGradient id="taroGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E6D7FF" />
              <stop offset="30%" stopColor="#D4B5FF" />
              <stop offset="70%" stopColor="#B794F6" />
              <stop offset="100%" stopColor="#9F7AEA" />
            </linearGradient>
            <linearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F7FAFC" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#EDF2F7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          
          {/* Cup */}
          <path d="M25 40 L95 40 L90 140 L30 140 Z" fill="url(#cupGradient)" stroke="#CBD5E0" strokeWidth="2"/>
          
          {/* Taro milk tea with gradient */}
          <path d="M27 42 L93 42 L88 138 L32 138 Z" fill="url(#taroGradient)"/>
          
          {/* Foam layer */}
          <ellipse cx="60" cy="42" rx="33" ry="8" fill="#FFFFFF" opacity="0.9"/>
          <ellipse cx="60" cy="40" rx="33" ry="6" fill="#F7FAFC"/>
          
          {/* Foam bubbles */}
          <circle cx="45" cy="38" r="2" fill="#FFFFFF" opacity="0.8"/>
          <circle cx="75" cy="39" r="1.5" fill="#FFFFFF" opacity="0.7"/>
          <circle cx="60" cy="37" r="1" fill="#FFFFFF" opacity="0.9"/>
          
          {/* Taro color swirls */}
          <path d="M35 60 Q50 55 65 65 T85 70" stroke="#D4B5FF" strokeWidth="3" fill="none" opacity="0.6"/>
          <path d="M40 80 Q55 75 70 85 T80 90" stroke="#E6D7FF" strokeWidth="2" fill="none" opacity="0.5"/>
          
          {/* Tapioca pearls */}
          <circle cx="45" cy="125" r="4" fill="#2D3748"/>
          <circle cx="55" cy="130" r="3.5" fill="#1A202C"/>
          <circle cx="65" cy="128" r="4" fill="#2D3748"/>
          <circle cx="75" cy="132" r="3" fill="#1A202C"/>
          <circle cx="50" cy="120" r="3" fill="#2D3748"/>
          <circle cx="70" cy="120" r="3.5" fill="#1A202C"/>
          
          {/* Cup rim */}
          <ellipse cx="60" cy="40" rx="35" ry="8" fill="none" stroke="#A0AEC0" strokeWidth="2"/>
          
          {/* Cup highlights */}
          <path d="M30 45 L30 135" stroke="#FFFFFF" strokeWidth="2" opacity="0.3"/>
          <path d="M90 45 L85 135" stroke="#CBD5E0" strokeWidth="1" opacity="0.5"/>
          
          {/* Straw */}
          <rect x="75" y="20" width="4" height="100" fill="#E53E3E" rx="2"/>
          <rect x="76" y="20" width="2" height="100" fill="#FC8181" rx="1"/>
        </svg>
      );
    }
    
    // Default colorful drink SVG for other drinks
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
    const color = colors[name.length % colors.length];
    
    return (
      <svg viewBox="0 0 120 160" className="w-full h-full">
        <defs>
          <linearGradient id={`gradient-${name.replace(/\s+/g, '')}`} x1="0%\" y1=\"0%\" x2=\"0%\" y2=\"100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>
        </defs>
        
        {/* Cup */}
        <path d="M25 40 L95 40 L90 140 L30 140 Z" fill="#F8F9FA" stroke="#DEE2E6" strokeWidth="2"/>
        
        {/* Drink */}
        <path d="M27 42 L93 42 L88 138 L32 138 Z" fill={`url(#gradient-${name.replace(/\s+/g, '')})`}/>
        
        {/* Foam/Ice */}
        <ellipse cx="60" cy="42" rx="33" ry="6" fill="#FFFFFF" opacity="0.7"/>
        
        {/* Bubbles */}
        <circle cx="45" cy="125" r="3" fill="#2C3E50"/>
        <circle cx="60" cy="130" r="3" fill="#2C3E50"/>
        <circle cx="75" cy="125" r="3" fill="#2C3E50"/>
        
        {/* Straw */}
        <rect x="75" y="20" width="4" height="80" fill="#E74C3C" rx="2"/>
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-3xl shadow-xl border-2 border-white/30 backdrop-blur-sm relative overflow-hidden group hover:scale-110 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300/10 via-green-400/10 to-cyan-400/10"></div>
                <svg viewBox="0 0 48 64" className="w-12 h-16">
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#E6D7FF" />
                      <stop offset="30%" stopColor="#D4B5FF" />
                      <stop offset="70%" stopColor="#B794F6" />
                      <stop offset="100%" stopColor="#9F7AEA" />
                    </linearGradient>
                    <linearGradient id="logoCupGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F7FAFC" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#EDF2F7" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>
                  
                  {/* Cup */}
                  <path d="M10 16 L38 16 L36 56 L12 56 Z" fill="url(#logoCupGradient)" stroke="#E2E8F0" strokeWidth="1.5"/>
                  
                  {/* Boba drink with gradient */}
                  <path d="M11 17 L37 17 L35 55 L13 55 Z" fill="url(#logoGradient)" className="drop-shadow-sm"/>
                  
                  {/* Foam layer */}
                  <ellipse cx="24" cy="17" rx="13" ry="3" fill="#FFFFFF" opacity="0.95"/>
                  <ellipse cx="24" cy="16" rx="13" ry="2" fill="#FEFEFE"/>
                  
                  {/* Tapioca pearls */}
                  <circle cx="18" cy="50" r="1.5" fill="#1A202C" className="drop-shadow-sm"/>
                  <circle cx="22" cy="52" r="1.3" fill="#2D3748" className="drop-shadow-sm"/>
                  <circle cx="26" cy="51" r="1.5" fill="#1A202C" className="drop-shadow-sm"/>
                  <circle cx="30" cy="53" r="1.2" fill="#2D3748" className="drop-shadow-sm"/>
                  <circle cx="20" cy="48" r="1.2" fill="#1A202C" className="drop-shadow-sm"/>
                  <circle cx="28" cy="48" r="1.3" fill="#2D3748" className="drop-shadow-sm"/>
                  
                  {/* Cup rim */}
                  <ellipse cx="24" cy="16" rx="14" ry="3" fill="none" stroke="#CBD5E0" strokeWidth="1.5"/>
                  
                  {/* Straw */}
                  <rect x="30" y="8" width="2" height="40" fill="#DC2626" rx="1" className="drop-shadow-sm"/>
                  <rect x="30.3" y="8" width="1.4" height="40" fill="#F87171" rx="0.7"/>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent animate-pulse">
                  Bobabble
                </h1>
                <p className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold">Premium Boba Experience</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#menu" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Menu</a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Contact</a>
              <button 
                onClick={() => setShowImages(true)}
                className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>View Images</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              
              <button 
                className="md:hidden p-2 text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-500/10 to-orange-400/10"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-yellow-300/5 via-green-400/5 to-cyan-400/5"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-green-400 to-cyan-400 rounded-full opacity-20 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-white/90 to-purple-50/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl border-2 border-purple-200/50 hover:scale-105 transition-all duration-300">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">Premium Quality Guaranteed</span>
              </div>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-bold mb-10 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent animate-pulse">
                Bubble Tea
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-800 via-purple-700 to-pink-700 bg-clip-text text-transparent">Perfection</span>
            </h1>
            
            <p className="text-2xl md:text-3xl bg-gradient-to-r from-gray-700 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-16 leading-relaxed max-w-4xl mx-auto font-medium">
              Experience the finest selection of handcrafted bubble teas, made with premium ingredients 
              and served fresh from our state-of-the-art vending machines.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
                <span className="flex items-center space-x-3">
                  <span>Order Now</span>
                  <svg viewBox="0 0 48 64" className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300 fill-white">
                  </svg>
                </span>
              </button>
              
              <button className="group bg-gradient-to-r from-white/90 to-purple-50/90 backdrop-blur-sm text-gray-800 px-12 py-6 rounded-3xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 border-2 border-purple-200/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 via-pink-100/30 to-orange-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="flex items-center space-x-3">
                  <span>View Menu</span>
                  <Eye className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-white/60 via-purple-50/60 to-pink-50/60 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-pink-100/20 to-orange-100/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300/20 via-green-400/20 to-cyan-400/20 animate-pulse"></div>
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">4.9</div>
              <div className="text-gray-700 font-semibold">Rating</div>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-300/20 via-blue-400/20 to-purple-400/20 animate-pulse"></div>
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">2min</div>
              <div className="text-gray-700 font-semibold">Prep Time</div>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300/20 via-pink-400/20 to-purple-400/20 animate-pulse"></div>
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent mb-3">24</div>
              <div className="text-gray-700 font-semibold">Flavors</div>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-300/20 via-blue-400/20 to-purple-400/20 animate-pulse"></div>
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-3">50k+</div>
              <div className="text-gray-700 font-semibold">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-32 bg-gradient-to-br from-white via-purple-50/40 to-pink-50/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/30 via-purple-50/30 to-pink-50/30"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Our Menu
              </span>
            </h2>
            <p className="text-2xl bg-gradient-to-r from-gray-700 to-purple-600 bg-clip-text text-transparent max-w-3xl mx-auto font-medium">
              Discover our carefully curated selection of premium bubble teas, 
              each crafted with the finest ingredients and attention to detail.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white shadow-2xl'
                      : 'bg-gradient-to-r from-white/90 to-purple-50/90 backdrop-blur-sm text-gray-700 hover:bg-white border-2 border-purple-200/50 hover:border-purple-300/70'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Drinks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredDrinks.map((drink, index) => (
              <div key={index} className="group bg-gradient-to-br from-white/90 via-purple-50/50 to-pink-50/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-3xl transition-all duration-700 hover:scale-110 hover:-translate-y-4 border-2 border-purple-200/30 hover:border-purple-300/60 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-pink-100/20 to-orange-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {drink.popular && (
                  <div className="flex justify-end mb-2">
                    <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white text-xs px-4 py-2 rounded-full font-bold shadow-xl flex items-center space-x-1 animate-pulse">
                      <Star className="w-3 h-3" />
                      <span>Popular</span>
                    </span>
                  </div>
                )}
                
                <div className="w-28 h-36 mx-auto mb-8 group-hover:scale-125 group-hover:rotate-3 transition-transform duration-500">
                  {generateDrinkImage(drink.name)}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {drink.name}
                </h3>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                    ${drink.price.toFixed(2)}
                  </span>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold text-gray-700">4.8</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => addToCart(drink.name)}
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 flex items-center justify-center space-x-2 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <Plus className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-6 right-6 bg-gradient-to-br from-white/95 via-purple-50/90 to-pink-50/90 backdrop-blur-md rounded-3xl p-8 shadow-3xl border-2 border-purple-200/50 z-40 min-w-[350px] hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-pink-100/20 to-orange-100/20 rounded-3xl"></div>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text" />
            <span>Your Order</span>
          </h3>
          
          <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
            {Object.entries(cart).map(([name, count]) => (
              <div key={name} className="flex justify-between items-center text-sm">
                <span className="text-gray-700">{name} x{count}</span>
                <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ${((drinks.find(d => d.name === name)?.price || 0) * count).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-purple-100 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-gray-800">Total:</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            
            <button className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              Checkout ({getTotalItems()} items)
            </button>
          </div>
        </div>
      )}

      {/* Image Gallery Modal */}
      {showImages && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Drink Gallery
              </h2>
              <button 
                onClick={() => setShowImages(false)}
                className="p-2 hover:bg-gray-100 rounded-2xl transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {drinks.map((drink, index) => (
                <div key={index} className="text-center group">
                  <div className="w-full h-48 mb-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                    {generateDrinkImage(drink.name)}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{drink.name}</h3>
                  <p className="text-purple-600 font-bold">${drink.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}