import React from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export function QRCode({ value, size = 200, className = '' }: QRCodeProps) {
  // Simple QR code generator using a public API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}`;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-purple-200/50">
        <img 
          src={qrCodeUrl} 
          alt="QR Code"
          width={size}
          height={size}
          className="rounded-lg"
          onError={(e) => {
            // Fallback to a simple placeholder if QR service fails
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <div className="hidden w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center text-gray-500 text-sm">
          QR Code
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-3 text-center max-w-xs">
        Scan this QR code to track your order or share with friends
      </p>
    </div>
  );
}