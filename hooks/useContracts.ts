// Hooks de React para interactuar con smart contracts
// Generado automáticamente - NO EDITAR MANUALMENTE
// Fecha: 2025-10-24T05:26:53.693Z

import { useContract, useContractRead, useContractWrite, useAccount } from 'wagmi';
import { 
  TICKET_NFT_ABI, 
  MARKETPLACE_ABI, 
  FACTORY_ABI, 
  VALIDATOR_ABI, 
  SIMPLE_FACTORY_ABI 
} from './complete-abis';
import { CONTRACT_ADDRESSES } from './constants';

// Hook para TicketNFT
export function useTicketNFT() {
  return useContract({
    address: CONTRACT_ADDRESSES.TICKET_NFT,
    abi: TICKET_NFT_ABI,
  });
}

// Hook para Marketplace
export function useMarketplace() {
  return useContract({
    address: CONTRACT_ADDRESSES.MARKETPLACE,
    abi: MARKETPLACE_ABI,
  });
}

// Hook para Factory
export function useFactory() {
  return useContract({
    address: CONTRACT_ADDRESSES.FACTORY,
    abi: FACTORY_ABI,
  });
}

// Hook para Validator
export function useValidator() {
  return useContract({
    address: CONTRACT_ADDRESSES.VALIDATOR,
    abi: VALIDATOR_ABI,
  });
}

// Hook para SimpleFactory
export function useSimpleFactory() {
  return useContract({
    address: CONTRACT_ADDRESSES.SIMPLE_FACTORY,
    abi: SIMPLE_FACTORY_ABI,
  });
}

// Hooks específicos para funciones comunes
export function useCreateEvent() {
  const { writeAsync } = useContractWrite({
    address: CONTRACT_ADDRESSES.FACTORY,
    abi: FACTORY_ABI,
    functionName: 'createEvent',
  });
  return writeAsync;
}

export function useMintTickets() {
  const { writeAsync } = useContractWrite({
    address: CONTRACT_ADDRESSES.FACTORY,
    abi: FACTORY_ABI,
    functionName: 'mintTickets',
  });
  return writeAsync;
}

export function useListTicket() {
  const { writeAsync } = useContractWrite({
    address: CONTRACT_ADDRESSES.MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: 'listTicket',
  });
  return writeAsync;
}

export function useBuyTicket() {
  const { writeAsync } = useContractWrite({
    address: CONTRACT_ADDRESSES.MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: 'buyTicket',
  });
  return writeAsync;
}

export function useValidateTicket() {
  const { writeAsync } = useContractWrite({
    address: CONTRACT_ADDRESSES.VALIDATOR,
    abi: VALIDATOR_ABI,
    functionName: 'validateTicket',
  });
  return writeAsync;
}

// Hooks para lectura de datos
export function useEventData(eventId: number) {
  return useContractRead({
    address: CONTRACT_ADDRESSES.FACTORY,
    abi: FACTORY_ABI,
    functionName: 'events',
    args: [eventId],
  });
}

export function useTicketData(tokenId: number) {
  return useContractRead({
    address: CONTRACT_ADDRESSES.TICKET_NFT,
    abi: TICKET_NFT_ABI,
    functionName: 'tickets',
    args: [tokenId],
  });
}

export function useListingData(listingId: number) {
  return useContractRead({
    address: CONTRACT_ADDRESSES.MARKETPLACE,
    abi: MARKETPLACE_ABI,
    functionName: 'listings',
    args: [listingId],
  });
}

// Hook para obtener todos los eventos
export function useAllEvents() {
  return useContractRead({
    address: CONTRACT_ADDRESSES.FACTORY,
    abi: FACTORY_ABI,
    functionName: 'totalEvents',
  });
}

// Hook para obtener balance de tickets del usuario
export function useUserTicketBalance() {
  const { address } = useAccount();
  return useContractRead({
    address: CONTRACT_ADDRESSES.TICKET_NFT,
    abi: TICKET_NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    enabled: !!address,
  });
}
