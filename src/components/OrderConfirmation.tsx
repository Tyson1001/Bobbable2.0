import React, { useState, useEffect } from 'react';
import { CheckCircle, Download, Share2, X, Copy, Check } from 'lucide-react';
import { QRCodeGenerator, type OrderQRData } from '../utils/qrCodeGenerator';
import type { Order } from '../lib/supabase';
import type { CartItem } from '../services/orderService';

interface OrderConfirmationProps {
  order: Order;
  orderItems: CartItem[];
  onClose: () => void;
}

export function OrderConfirmation({ order, orderItems, onClose }: OrderConfirmationProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGeneratingQR, setIsGeneratingQR] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generateQRCode();
  }, [order, orderItems]);

  const generateQRCode = async () => {
    try {
      setIsGeneratingQR(true);

      // Prepare order data for QR code
      const qrData: OrderQRData = {
        orderId: order.id,
        customerName: order.customer_name,
        customerEmail: order.customer_email,
        totalAmount: order.total_amount,
        timestamp: order.created_at,
        items: orderItems.map(item => ({
          drinkName: item.drink.name,
          quantity: item.quantity,
          customizations: [
            `Milk: ${item.milkOption.name}`,
            `Sweetness: ${item.sweetnessLevel.name}`,
            ...(item.toppings.length > 0 ? [`Toppings: ${item.toppings.map(t => t.name).join(', ')}`] : [])
          ]
        }))
      };

      const qrUrl = await QRCodeGenerator.generateOrderQR(qrData);
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      // Fallback to simple QR code with just order ID
      try {
        const simpleQrUrl = await QRCodeGenerator.generateSimpleOrderQR(order.id);
        setQrCodeUrl(simpleQrUrl);
      } catch (fallbackError) {
        console.error('Failed to generate fallback QR code:', fallbackError);
      }
    } finally {
      setIsGeneratingQR(false);
    }
  };

  const handleDownloadQR = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `bobabble-order-${order.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(order.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy order ID:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share && qrCodeUrl) {
      try {
        // Convert data URL to blob for sharing
        const response = await fetch(qrCodeUrl);
        const blob = await response.blob();
        const file = new File([blob], `bobabble-order-${order.id}.png`, { type: 'image/png' });

        await navigator.share({
          title: 'Bobabble Order Confirmation',
          text: `Order #${order.id} - Total: $${order.total_amount.toFixed(2)}`,
          files: [file]
        });
      } catch (error) {
        console.error('Error sharing:', error);
        // Fallback to copying order ID
        handleCopyOrderId();
      }
    } else {
      // Fallback to copying order ID
      handleCopyOrderId();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Order Confirmed!
              </h2>
              <p className="text-gray-600 text-sm">Your drink is being prepared</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-2xl transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Order Details */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-700 font-semibold">Order ID:</span>
            <div className="flex items-center space-x-2">
              <code className="bg-white px-3 py-1 rounded-lg text-sm font-mono text-gray-800">
                {order.id.slice(0, 8)}...
              </code>
              <button
                onClick={handleCopyOrderId}
                className="p-1 hover:bg-white/50 rounded-lg transition-colors"
                title="Copy full order ID"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-700 font-semibold">Total Amount:</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ${order.total_amount.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-semibold">Status:</span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold capitalize">
              {order.status}
            </span>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Your Order QR Code</h3>
          
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-4 inline-block">
            {isGeneratingQR ? (
              <div className="w-64 h-64 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full"></div>
              </div>
            ) : qrCodeUrl ? (
              <img 
                src={qrCodeUrl} 
                alt="Order QR Code" 
                className="w-64 h-64 mx-auto"
              />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-2">⚠️</div>
                  <p>QR Code generation failed</p>
                </div>
              </div>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Show this QR code to collect your order or use it for verification
          </p>

          {/* Action Buttons */}
          <div className="flex space-x-3 justify-center">
            <button
              onClick={handleDownloadQR}
              disabled={!qrCodeUrl}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>

            <button
              onClick={handleShare}
              disabled={!qrCodeUrl}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Order Items Summary */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-gray-800 mb-3">Order Summary:</h4>
          <div className="space-y-2">
            {orderItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <div>
                  <span className="font-medium">{item.quantity}x {item.drink.name}</span>
                  <div className="text-gray-500 text-xs">
                    {item.milkOption.name}, {item.sweetnessLevel.name}
                    {item.toppings.length > 0 && (
                      <span>, {item.toppings.map(t => t.name).join(', ')}</span>
                    )}
                  </div>
                </div>
                <span className="font-semibold">
                  ${(item.totalPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  );
}