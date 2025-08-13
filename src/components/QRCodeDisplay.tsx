import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { CheckCircle, Download, Share2 } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface QRCodeDisplayProps {
  orderId: string;
  customerName?: string;
  totalAmount: number;
  onClose: () => void;
}

export function QRCodeDisplay({ orderId, customerName, totalAmount, onClose }: QRCodeDisplayProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    generateQRCode();
  }, [orderId]);

  const generateQRCode = async () => {
    try {
      setLoading(true);
      setError('');

      // Create QR code data with order information
      const qrData = {
        orderId,
        customerName: customerName || 'Guest',
        totalAmount,
        timestamp: new Date().toISOString(),
        type: 'BOBABBLE_ORDER'
      };

      // Generate QR code as data URL
      const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrData), {
        width: 300,
        margin: 2,
        color: {
          dark: '#7C3AED', // Purple color to match theme
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      });

      setQrCodeUrl(qrCodeDataUrl);
    } catch (err) {
      console.error('Error generating QR code:', err);
      setError('Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.download = `bobabble-order-${orderId}.png`;
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareQRCode = async () => {
    if (!qrCodeUrl) return;

    try {
      // Convert data URL to blob
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const file = new File([blob], `bobabble-order-${orderId}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Bobabble Order QR Code',
          text: `Order #${orderId} - Total: $${totalAmount.toFixed(2)}`,
          files: [file]
        });
      } else {
        // Fallback: copy to clipboard if available
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob
            })
          ]);
          alert('QR code copied to clipboard!');
        } else {
          alert('Sharing not supported on this device. Use the download button instead.');
        }
      }
    } catch (err) {
      console.error('Error sharing QR code:', err);
      alert('Failed to share QR code. Please try downloading instead.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Order Confirmed!
          </h2>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 mb-6">
            <p className="text-gray-700 font-semibold">Order ID: {orderId}</p>
            {customerName && (
              <p className="text-gray-600">Customer: {customerName}</p>
            )}
            <p className="text-gray-700 font-bold">Total: ${totalAmount.toFixed(2)}</p>
          </div>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Order QR Code</h3>
          <p className="text-gray-600 mb-6">
            Show this QR code to collect your order at the vending machine
          </p>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-200/50 mb-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <LoadingSpinner size="lg" />
                <p className="text-gray-600 mt-4">Generating QR code...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-64 text-red-500">
                <p className="font-semibold">Error generating QR code</p>
                <p className="text-sm">{error}</p>
                <button
                  onClick={generateQRCode}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <img
                src={qrCodeUrl}
                alt="Order QR Code"
                className="w-64 h-64 mx-auto"
              />
            )}
          </div>

          {qrCodeUrl && !loading && !error && (
            <div className="flex gap-3 justify-center mb-6">
              <button
                onClick={downloadQRCode}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              
              <button
                onClick={shareQRCode}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}