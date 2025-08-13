import QRCode from 'qrcode';

export interface OrderQRData {
  orderId: string;
  customerName?: string;
  customerEmail?: string;
  totalAmount: number;
  timestamp: string;
  items: Array<{
    drinkName: string;
    quantity: number;
    customizations: string[];
  }>;
}

export class QRCodeGenerator {
  /**
   * Generate QR code data URL for an order
   */
  static async generateOrderQR(orderData: OrderQRData): Promise<string> {
    try {
      // Create a structured data object for the QR code
      const qrData = {
        type: 'BOBABBLE_ORDER',
        orderId: orderData.orderId,
        customer: {
          name: orderData.customerName,
          email: orderData.customerEmail
        },
        order: {
          total: orderData.totalAmount,
          timestamp: orderData.timestamp,
          items: orderData.items
        },
        // Add verification URL (could be used for order lookup)
        verifyUrl: `https://bobabble.app/verify/${orderData.orderId}`
      };

      // Convert to JSON string
      const qrString = JSON.stringify(qrData);

      // Generate QR code as data URL
      const qrCodeDataUrl = await QRCode.toDataURL(qrString, {
        errorCorrectionLevel: 'M',
        type: 'image/png',
        quality: 0.92,
        margin: 2,
        color: {
          dark: '#1A202C', // Dark color
          light: '#FFFFFF' // Light color
        },
        width: 300
      });

      return qrCodeDataUrl;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw new Error('Failed to generate QR code');
    }
  }

  /**
   * Generate a simple QR code with just the order ID
   */
  static async generateSimpleOrderQR(orderId: string): Promise<string> {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(orderId, {
        errorCorrectionLevel: 'M',
        type: 'image/png',
        quality: 0.92,
        margin: 2,
        color: {
          dark: '#7C3AED', // Purple color to match theme
          light: '#FFFFFF'
        },
        width: 250
      });

      return qrCodeDataUrl;
    } catch (error) {
      console.error('Error generating simple QR code:', error);
      throw new Error('Failed to generate QR code');
    }
  }

  /**
   * Parse QR code data back to order information
   */
  static parseOrderQR(qrString: string): OrderQRData | null {
    try {
      const data = JSON.parse(qrString);
      
      if (data.type !== 'BOBABBLE_ORDER') {
        return null;
      }

      return {
        orderId: data.orderId,
        customerName: data.customer?.name,
        customerEmail: data.customer?.email,
        totalAmount: data.order?.total || 0,
        timestamp: data.order?.timestamp || '',
        items: data.order?.items || []
      };
    } catch (error) {
      console.error('Error parsing QR code data:', error);
      return null;
    }
  }
}