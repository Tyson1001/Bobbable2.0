import React, { useState, useRef, useEffect } from 'react';
import { QrCode, Download, Copy, Palette, Settings, Smartphone, Link, Mail, Wifi, MessageSquare, Phone, MapPin, Calendar, User, CreditCard, Eye, EyeOff, RefreshCw, Sparkles } from 'lucide-react';
import QRCodeLib from 'qrcode';

type QRType = 'text' | 'url' | 'email' | 'phone' | 'sms' | 'wifi' | 'location' | 'event' | 'contact' | 'payment';

interface QROptions {
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  type: 'image/png' | 'image/jpeg' | 'image/webp';
  quality: number;
  margin: number;
  color: {
    dark: string;
    light: string;
  };
  width: number;
}

interface WiFiData {
  ssid: string;
  password: string;
  security: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

interface ContactData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
  url: string;
}

interface EventData {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
}

export default function App() {
  const [qrType, setQrType] = useState<QRType>('text');
  const [text, setText] = useState('');
  const [qrDataURL, setQrDataURL] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Advanced options
  const [qrOptions, setQrOptions] = useState<QROptions>({
    errorCorrectionLevel: 'M',
    type: 'image/png',
    quality: 0.92,
    margin: 4,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    },
    width: 512
  });

  // Specialized data states
  const [wifiData, setWifiData] = useState<WiFiData>({
    ssid: '',
    password: '',
    security: 'WPA',
    hidden: false
  });

  const [contactData, setContactData] = useState<ContactData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    organization: '',
    url: ''
  });

  const [eventData, setEventData] = useState<EventData>({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: ''
  });

  const qrTypes = [
    { id: 'text', name: 'Text', icon: MessageSquare, description: 'Plain text or message' },
    { id: 'url', name: 'Website', icon: Link, description: 'Website URL or link' },
    { id: 'email', name: 'Email', icon: Mail, description: 'Email address with subject' },
    { id: 'phone', name: 'Phone', icon: Phone, description: 'Phone number for calling' },
    { id: 'sms', name: 'SMS', icon: MessageSquare, description: 'Text message with number' },
    { id: 'wifi', name: 'WiFi', icon: Wifi, description: 'WiFi network credentials' },
    { id: 'location', name: 'Location', icon: MapPin, description: 'GPS coordinates or address' },
    { id: 'event', name: 'Event', icon: Calendar, description: 'Calendar event details' },
    { id: 'contact', name: 'Contact', icon: User, description: 'Contact information (vCard)' },
    { id: 'payment', name: 'Payment', icon: CreditCard, description: 'Payment information' }
  ];

  const generateQRData = (): string => {
    switch (qrType) {
      case 'url':
        return text.startsWith('http') ? text : `https://${text}`;
      case 'email':
        const [email, subject] = text.split('|');
        return `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
      case 'phone':
        return `tel:${text}`;
      case 'sms':
        const [number, message] = text.split('|');
        return `sms:${number}${message ? `?body=${encodeURIComponent(message)}` : ''}`;
      case 'wifi':
        return `WIFI:T:${wifiData.security};S:${wifiData.ssid};P:${wifiData.password};H:${wifiData.hidden ? 'true' : 'false'};;`;
      case 'location':
        if (text.includes(',')) {
          const [lat, lng] = text.split(',').map(s => s.trim());
          return `geo:${lat},${lng}`;
        }
        return `geo:0,0?q=${encodeURIComponent(text)}`;
      case 'event':
        const formatDate = (date: string) => date.replace(/[-:]/g, '').replace('T', '') + '00Z';
        return `BEGIN:VEVENT\nSUMMARY:${eventData.title}\nDESCRIPTION:${eventData.description}\nLOCATION:${eventData.location}\nDTSTART:${formatDate(eventData.startDate)}\nDTEND:${formatDate(eventData.endDate)}\nEND:VEVENT`;
      case 'contact':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${contactData.firstName} ${contactData.lastName}\nORG:${contactData.organization}\nTEL:${contactData.phone}\nEMAIL:${contactData.email}\nURL:${contactData.url}\nEND:VCARD`;
      case 'payment':
        return text; // Assuming payment format like "bitcoin:address?amount=0.1"
      default:
        return text;
    }
  };

  const generateQRCode = async () => {
    const qrData = generateQRData();
    if (!qrData.trim()) return;

    setIsGenerating(true);
    try {
      const dataURL = await QRCodeLib.toDataURL(qrData, {
        errorCorrectionLevel: qrOptions.errorCorrectionLevel,
        type: qrOptions.type,
        quality: qrOptions.quality,
        margin: qrOptions.margin,
        color: qrOptions.color,
        width: qrOptions.width
      });
      setQrDataURL(dataURL);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrDataURL) return;
    
    const link = document.createElement('a');
    link.download = `qrcode-${qrType}-${Date.now()}.${qrOptions.type.split('/')[1]}`;
    link.href = qrDataURL;
    link.click();
  };

  const copyToClipboard = async () => {
    if (!qrDataURL) return;
    
    try {
      const response = await fetch(qrDataURL);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      alert('QR code copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert('Failed to copy QR code to clipboard');
    }
  };

  useEffect(() => {
    if (text || qrType === 'wifi' || qrType === 'contact' || qrType === 'event') {
      const timer = setTimeout(generateQRCode, 300);
      return () => clearTimeout(timer);
    }
  }, [text, qrType, qrOptions, wifiData, contactData, eventData]);

  const renderInputFields = () => {
    const currentType = qrTypes.find(type => type.id === qrType);
    const IconComponent = currentType?.icon || MessageSquare;

    switch (qrType) {
      case 'text':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Plain Text</h3>
                <p className="text-sm text-gray-600">Enter any text or message</p>
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none resize-none h-32 font-mono text-sm"
            />
          </div>
        );

      case 'url':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Website URL</h3>
                <p className="text-sm text-gray-600">Enter a website address</p>
              </div>
            </div>
            <input
              type="url"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://example.com"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none font-mono text-sm"
            />
          </div>
        );

      case 'email':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Email Address</h3>
                <p className="text-sm text-gray-600">Email with optional subject</p>
              </div>
            </div>
            <input
              type="email"
              value={text.split('|')[0] || ''}
              onChange={(e) => {
                const subject = text.split('|')[1] || '';
                setText(`${e.target.value}${subject ? `|${subject}` : ''}`);
              }}
              placeholder="email@example.com"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none"
            />
            <input
              type="text"
              value={text.split('|')[1] || ''}
              onChange={(e) => {
                const email = text.split('|')[0] || '';
                setText(`${email}${e.target.value ? `|${e.target.value}` : ''}`);
              }}
              placeholder="Subject (optional)"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none"
            />
          </div>
        );

      case 'phone':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Phone Number</h3>
                <p className="text-sm text-gray-600">Phone number for calling</p>
              </div>
            </div>
            <input
              type="tel"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="+1234567890"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none font-mono"
            />
          </div>
        );

      case 'sms':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">SMS Message</h3>
                <p className="text-sm text-gray-600">Phone number and message</p>
              </div>
            </div>
            <input
              type="tel"
              value={text.split('|')[0] || ''}
              onChange={(e) => {
                const message = text.split('|')[1] || '';
                setText(`${e.target.value}${message ? `|${message}` : ''}`);
              }}
              placeholder="+1234567890"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none font-mono"
            />
            <textarea
              value={text.split('|')[1] || ''}
              onChange={(e) => {
                const phone = text.split('|')[0] || '';
                setText(`${phone}${e.target.value ? `|${e.target.value}` : ''}`);
              }}
              placeholder="Message (optional)"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none resize-none h-24"
            />
          </div>
        );

      case 'wifi':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">WiFi Network</h3>
                <p className="text-sm text-gray-600">Network credentials for easy connection</p>
              </div>
            </div>
            <input
              type="text"
              value={wifiData.ssid}
              onChange={(e) => setWifiData(prev => ({ ...prev, ssid: e.target.value }))}
              placeholder="Network Name (SSID)"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none"
            />
            <input
              type="password"
              value={wifiData.password}
              onChange={(e) => setWifiData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Password"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none font-mono"
            />
            <div className="grid grid-cols-2 gap-4">
              <select
                value={wifiData.security}
                onChange={(e) => setWifiData(prev => ({ ...prev, security: e.target.value as 'WPA' | 'WEP' | 'nopass' }))}
                className="p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
              </select>
              <label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={wifiData.hidden}
                  onChange={(e) => setWifiData(prev => ({ ...prev, hidden: e.target.checked }))}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">Hidden Network</span>
              </label>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Location</h3>
                <p className="text-sm text-gray-600">GPS coordinates or address</p>
              </div>
            </div>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="40.7128, -74.0060 or 123 Main St, City"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none"
            />
            <p className="text-xs text-gray-500">
              Enter coordinates as "latitude, longitude" or a street address
            </p>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Contact Information</h3>
                <p className="text-sm text-gray-600">vCard format for easy saving</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={contactData.firstName}
                onChange={(e) => setContactData(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="First Name"
                className="p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none"
              />
              <input
                type="text"
                value={contactData.lastName}
                onChange={(e) => setContactData(prev => ({ ...prev, lastName: e.target.value }))}
                placeholder="Last Name"
                className="p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none"
              />
            </div>
            <input
              type="tel"
              value={contactData.phone}
              onChange={(e) => setContactData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Phone Number"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none"
            />
            <input
              type="email"
              value={contactData.email}
              onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Email Address"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none"
            />
            <input
              type="text"
              value={contactData.organization}
              onChange={(e) => setContactData(prev => ({ ...prev, organization: e.target.value }))}
              placeholder="Organization (optional)"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none"
            />
            <input
              type="url"
              value={contactData.url}
              onChange={(e) => setContactData(prev => ({ ...prev, url: e.target.value }))}
              placeholder="Website (optional)"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none"
            />
          </div>
        );

      case 'event':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Calendar Event</h3>
                <p className="text-sm text-gray-600">Event details for calendar apps</p>
              </div>
            </div>
            <input
              type="text"
              value={eventData.title}
              onChange={(e) => setEventData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Event Title"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none"
            />
            <textarea
              value={eventData.description}
              onChange={(e) => setEventData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Event Description"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none resize-none h-24"
            />
            <input
              type="text"
              value={eventData.location}
              onChange={(e) => setEventData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Location"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date & Time</label>
                <input
                  type="datetime-local"
                  value={eventData.startDate}
                  onChange={(e) => setEventData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date & Time</label>
                <input
                  type="datetime-local"
                  value={eventData.endDate}
                  onChange={(e) => setEventData(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Payment Information</h3>
                <p className="text-sm text-gray-600">Cryptocurrency or payment URI</p>
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa?amount=0.01&label=Donation"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none resize-none h-32 font-mono text-sm"
            />
            <p className="text-xs text-gray-500">
              Enter a payment URI (Bitcoin, Ethereum, etc.) or payment app deep link
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-3xl shadow-xl border-2 border-white/30 backdrop-blur-sm relative overflow-hidden group hover:scale-110 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                  QR Generator
                </h1>
                <p className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold">
                  Create Custom QR Codes
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-2xl font-medium transition-all duration-300 ${
                  showAdvanced
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white/80 text-gray-700 hover:bg-white border border-purple-200'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Advanced</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <div className="space-y-8">
            {/* QR Type Selection */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <span>Choose QR Type</span>
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {qrTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setQrType(type.id as QRType)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                        qrType === type.id
                          ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white border-purple-600 shadow-xl'
                          : 'bg-white border-gray-200 hover:border-purple-300 text-gray-700 hover:shadow-lg'
                      }`}
                    >
                      <IconComponent className={`w-6 h-6 mb-2 ${qrType === type.id ? 'text-white' : 'text-purple-600'}`} />
                      <div className="font-semibold text-sm">{type.name}</div>
                      <div className={`text-xs mt-1 ${qrType === type.id ? 'text-purple-100' : 'text-gray-500'}`}>
                        {type.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Fields */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter Information</h2>
              {renderInputFields()}
            </div>

            {/* Advanced Options */}
            {showAdvanced && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                  <Settings className="w-6 h-6 text-purple-600" />
                  <span>Advanced Options</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Error Correction</label>
                    <select
                      value={qrOptions.errorCorrectionLevel}
                      onChange={(e) => setQrOptions(prev => ({ ...prev, errorCorrectionLevel: e.target.value as 'L' | 'M' | 'Q' | 'H' }))}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    >
                      <option value="L">Low (7%)</option>
                      <option value="M">Medium (15%)</option>
                      <option value="Q">Quartile (25%)</option>
                      <option value="H">High (30%)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image Format</label>
                    <select
                      value={qrOptions.type}
                      onChange={(e) => setQrOptions(prev => ({ ...prev, type: e.target.value as 'image/png' | 'image/jpeg' | 'image/webp' }))}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    >
                      <option value="image/png">PNG</option>
                      <option value="image/jpeg">JPEG</option>
                      <option value="image/webp">WebP</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size (px)</label>
                    <input
                      type="range"
                      min="128"
                      max="1024"
                      step="64"
                      value={qrOptions.width}
                      onChange={(e) => setQrOptions(prev => ({ ...prev, width: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-600 mt-1">{qrOptions.width}px</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Margin</label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={qrOptions.margin}
                      onChange={(e) => setQrOptions(prev => ({ ...prev, margin: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-600 mt-1">{qrOptions.margin} modules</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Foreground Color</label>
                    <input
                      type="color"
                      value={qrOptions.color.dark}
                      onChange={(e) => setQrOptions(prev => ({ ...prev, color: { ...prev.color, dark: e.target.value } }))}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                    <input
                      type="color"
                      value={qrOptions.color.light}
                      onChange={(e) => setQrOptions(prev => ({ ...prev, color: { ...prev.color, light: e.target.value } }))}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* QR Code Display */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-100 sticky top-32">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <QrCode className="w-6 h-6 text-purple-600" />
                <span>Generated QR Code</span>
              </h2>
              
              <div className="flex flex-col items-center space-y-6">
                {isGenerating ? (
                  <div className="w-64 h-64 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <div className="flex items-center space-x-3">
                      <RefreshCw className="w-6 h-6 text-purple-600 animate-spin" />
                      <span className="text-gray-600">Generating...</span>
                    </div>
                  </div>
                ) : qrDataURL ? (
                  <div className="relative group">
                    <img
                      src={qrDataURL}
                      alt="Generated QR Code"
                      className="w-64 h-64 rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition-colors duration-300"></div>
                  </div>
                ) : (
                  <div className="w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 font-medium">Enter data to generate QR code</p>
                    </div>
                  </div>
                )}
                
                {qrDataURL && (
                  <div className="flex space-x-4">
                    <button
                      onClick={downloadQRCode}
                      className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download</span>
                    </button>
                    
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center space-x-2 bg-white text-gray-700 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200"
                    >
                      <Copy className="w-5 h-5" />
                      <span>Copy</span>
                    </button>
                  </div>
                )}
              </div>
              
              {qrDataURL && (
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                  <h3 className="font-semibold text-gray-800 mb-2">QR Code Details</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Type:</span> {qrTypes.find(t => t.id === qrType)?.name}</p>
                    <p><span className="font-medium">Size:</span> {qrOptions.width}×{qrOptions.width}px</p>
                    <p><span className="font-medium">Format:</span> {qrOptions.type.split('/')[1].toUpperCase()}</p>
                    <p><span className="font-medium">Error Correction:</span> {qrOptions.errorCorrectionLevel}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}