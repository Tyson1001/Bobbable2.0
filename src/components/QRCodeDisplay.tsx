import React from 'react';
import { CheckCircle, Download, Share2 } from 'lucide-react';

interface QRCodeDisplayProps {
  qrCodeDataUrl: string;
  orderId: string;
  onClose: () => void;
}

export function QRCodeDisplay({ qrCodeDataUrl, orderId, onClose }: QRCodeDisplayProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = `order-${orderId}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        // Convert data URL to blob for sharing
        const response = await fetch(qrCodeDataUrl);
        const blob = await response.blob();
        const file = new File([blob], `order-${orderId}-qr.png`, { type: 'image/png' });
        
        await navigator.share({
          title: 'Bobabble Order QR Code',
          text: `Your order QR code for order #${orderId}`,
          files: [file]
        });
      } catch (error) {
        console.error('Error sharing QR code:', error);
        // Fallback to download if sharing fails
        handleDownload();
      }
    } else {
      // Fallback to download if Web Share API is not supported
      handleDownload();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Order Confirmed!
        </h2>
        
        <p className="text-gray-600 mb-6">
          Your order has been successfully placed. Use this QR code to track your order or show it when picking up your drinks.
        </p>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-lg inline-block">
            <img 
              src={qrCodeDataUrl} 
              alt={`QR Code for order ${orderId}`}
              className="w-48 h-48 mx-auto"
            />
          </div>
          <p className="text-sm text-gray-600 mt-4 font-semibold">
            Order ID: #{orderId.slice(-8).toUpperCase()}
          </p>
        </div>
        
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleDownload}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Download</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
        
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-3 px-4 rounded-2xl font-semibold hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 transition-all duration-300"
        >
          Continue Shopping
        </button>
        
        <p className="text-xs text-gray-500 mt-4">
          Keep this QR code safe. You'll need it to collect your order.
        </p>
      </div>
    </div>
  );
}