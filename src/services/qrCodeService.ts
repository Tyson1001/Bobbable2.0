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
    customizations: {
      milkOption: string;
      sweetnessLevel: string;
      toppings: string[];
    };
  }>;
}

export class QRCodeService {
  /**
   * Generate a QR code data URL for an order
   */
  static async generateOrderQRCode(orderData: OrderQRData): Promise<string> {
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
          itemCount: orderData.items.reduce((sum, item) => sum + item.quantity, 0)
        },
        verification: this.generateVerificationHash(orderData.orderId, orderData.timestamp)
      };

      // Convert to JSON string for QR code
      const qrString = JSON.stringify(qrData);

      // Generate QR code with high error correction and good size
      const qrCodeDataUrl = await QRCode.toDataURL(qrString, {
        errorCorrectionLevel: 'H', // High error correction
        type: 'image/png',
        quality: 0.92,
        margin: 2,
        color: {
          dark: '#1A202C', // Dark color
          light: '#FFFFFF' // Light color
        },
        width: 256 // Size in pixels
      });

      return qrCodeDataUrl;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw new Error('Failed to generate QR code');
    }
  }

  /**
   * Generate a simple verification hash for the order
   */
  private static generateVerificationHash(orderId: string, timestamp: string): string {
    // Simple hash function for verification (in production, use a proper cryptographic hash)
    const combined = `${orderId}-${timestamp}-BOBABBLE`;
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).toUpperCase();
  }

  /**
   * Parse QR code data (for future use in order verification)
   */
  static parseOrderQRCode(qrString: string): OrderQRData | null {
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
        items: [] // Items would need to be stored separately or included in QR if needed
      };
    } catch (error) {
      console.error('Error parsing QR code:', error);
      return null;
    }
  }

  /**
   * Verify QR code authenticity
   */
  static verifyOrderQRCode(qrString: string): boolean {
    try {
      const data = JSON.parse(qrString);
      
      if (data.type !== 'BOBABBLE_ORDER') {
        return false;
      }

      const expectedHash = this.generateVerificationHash(data.orderId, data.order?.timestamp || '');
      return data.verification === expectedHash;
    } catch (error) {
      console.error('Error verifying QR code:', error);
      return false;
    }
  }
}