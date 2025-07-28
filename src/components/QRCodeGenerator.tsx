import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Smartphone } from 'lucide-react';

interface QRCodeGeneratorProps {
  orderId: string;
  customerName?: string;
  totalAmount: number;
  onClose: () => void;
}

export function QRCodeGenerator({ orderId, customerName, totalAmount, onClose }: QRCodeGeneratorProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateQRCode();
  }, [orderId]);

  const generateQRCode = async () => {
    try {
      setLoading(true);
      
      // Create QR code data with order information
      const qrData = {
        orderId,
        customerName,
        totalAmount,
        timestamp: new Date().toISOString(),
        type: 'BOBABBLE_ORDER'
      };

      // Generate QR code as data URL
      const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrData), {
        width: 300,
        margin: 2,
        color: {
          dark: '#6B46C1', // Purple color
          light: '#FFFFFF'
        }
      });

      setQrCodeUrl(qrCodeDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `bobabble-order-${orderId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Order Confirmation
          </h2>
          
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully! Use this QR code as proof of purchase at the vending machine.
          </p>

          {loading ? (
            <div className="w-64 h-64 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <div className="animate-spin w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full"></div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
              <img 
                src={qrCodeUrl} 
                alt="Order QR Code" 
                className="w-64 h-64 mx-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600">Order ID:</span>
              <span className="text-sm font-mono text-gray-800">{orderId}</span>
            </div>
            {customerName && (
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-600">Customer:</span>
                <span className="text-sm text-gray-800">{customerName}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-600">Total:</span>
              <span className="text-sm font-bold text-purple-600">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={downloadQRCode}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Present this QR code at the vending machine to collect your order
          </p>
        </div>
      </div>
    </div>
  );
}