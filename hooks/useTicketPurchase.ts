
// Hook personalizado para compra de tickets
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { useState } from 'react';

export function useTicketPurchase() {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);
  
  const { writeAsync: buyTicket, data: txData } = useContractWrite({
    address: '0xff85e8A49d4623C3D1edE1c0CbC7ed08685D7CC4',
    abi: [/* ABI del marketplace */],
    functionName: 'buyTicket',
  });
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransaction({
    hash: txData?.hash,
  });
  
  const purchaseTicket = async (eventId, price) => {
    setIsPurchasing(true);
    
    try {
      // Esta función abre automáticamente el wallet
      const tx = await buyTicket({
        args: [eventId],
        value: ethers.parseEther(price)
      });
      
      setTransactionHash(tx.hash);
      console.log('📝 Transacción enviada:', tx.hash);
      
      return {
        hash: tx.hash,
        link: `https://sepolia.basescan.org/tx/${tx.hash}`,
        status: 'pending'
      };
      
    } catch (error) {
      console.error('❌ Error:', error);
      throw error;
    } finally {
      setIsPurchasing(false);
    }
  };
  
  return {
    purchaseTicket,
    isPurchasing,
    isConfirming,
    isConfirmed,
    transactionHash,
    txData
  };
}
