// Utilidades para interactuar con smart contracts
// Generado automáticamente - NO EDITAR MANUALMENTE
// Fecha: 2025-10-24T05:26:53.694Z

import { parseEther, formatEther } from 'viem';
import { CONTRACT_ADDRESSES } from './constants';

// Utilidades para formateo de precios
export function formatPrice(price: bigint | string): string {
  const priceInEth = formatEther(BigInt(price));
  return `${parseFloat(priceInEth).toFixed(4)} ETH`;
}

export function parsePrice(price: string): bigint {
  return parseEther(price);
}

// Utilidades para fechas
export function formatDate(timestamp: bigint | number): string {
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function parseDate(dateString: string): bigint {
  return BigInt(Math.floor(new Date(dateString).getTime() / 1000));
}

// Utilidades para validación
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function isValidEventId(eventId: number | bigint): boolean {
  return Number(eventId) > 0;
}

export function isValidTokenId(tokenId: number | bigint): boolean {
  return Number(tokenId) > 0;
}

// Utilidades para fees
export function calculatePlatformFee(amount: bigint, feePercent: number = 100): bigint {
  return (amount * BigInt(feePercent)) / BigInt(10000);
}

export function calculateRoyaltyFee(amount: bigint, royaltyPercent: number = 250): bigint {
  return (amount * BigInt(royaltyPercent)) / BigInt(10000);
}

// Utilidades para metadata
export function generateEventMetadata(eventData: {
  name: string;
  venue: string;
  date: string;
  description: string;
  image?: string;
}): string {
  return JSON.stringify({
    name: eventData.name,
    description: eventData.description,
    image: eventData.image || '',
    attributes: [
      { trait_type: 'Venue', value: eventData.venue },
      { trait_type: 'Date', value: eventData.date },
      { trait_type: 'Type', value: 'Event Ticket' }
    ]
  });
}

// Utilidades para errores
export function parseContractError(error: any): string {
  if (error?.message?.includes('execution reverted')) {
    const revertReason = error.message.match(/execution reverted: "([^"]+)"/);
    return revertReason ? revertReason[1] : 'Transaction failed';
  }
  return error?.message || 'Unknown error occurred';
}

// Utilidades para gas
export function estimateGasForMint(quantity: number): bigint {
  // Estimación básica: 100,000 gas por ticket
  return BigInt(100000 * quantity);
}

export function estimateGasForCreateEvent(): bigint {
  // Estimación para crear evento
  return BigInt(500000);
}

// Constantes útiles
export const GAS_LIMITS = {
  MINT_TICKET: 200000n,
  CREATE_EVENT: 500000n,
  LIST_TICKET: 150000n,
  BUY_TICKET: 200000n,
  VALIDATE_TICKET: 100000n,
} as const;

export const ERROR_CODES = {
  INSUFFICIENT_FUNDS: 'Insufficient funds',
  EVENT_NOT_FOUND: 'Event not found',
  TICKET_NOT_AVAILABLE: 'Ticket not available',
  INVALID_QUANTITY: 'Invalid quantity',
  UNAUTHORIZED: 'Unauthorized',
  TRANSACTION_FAILED: 'Transaction failed',
} as const;
