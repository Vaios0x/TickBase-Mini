
// Hook personalizado para transacciones
// Generado automáticamente - 2025-10-24T05:43:24.187Z

import { useState, useCallback } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { formatTransactionResult, waitForTransaction } from '@/lib/transaction-utils';

export function useTicketTransaction() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionResult, setTransactionResult] = useState(null);
  const [error, setError] = useState(null);
  
  const { writeAsync: buyTicket, data: txData } = useContractWrite({
    address: '0xff85e8A49d4623C3D1edE1c0CbC7ed08685D7CC4',
    abi: marketplaceABI,
    functionName: 'buyTicket',
  });
  
  const { isLoading: isConfirming } = useWaitForTransaction({
    hash: txData?.hash,
  });
  
  const executeTransaction = useCallback(async (functionName: string, args: any[], value?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const tx = await buyTicket({
        args,
        value: value ? ethers.parseEther(value) : undefined
      });
      
      console.log('📝 Transacción enviada:', tx.hash);
      console.log('🔗 Link BaseScan:', `https://sepolia.basescan.org/tx/${tx.hash}`);
      
      const result = formatTransactionResult(tx);
      setTransactionResult(result);
      
      return result;
      
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [buyTicket]);
  
  return {
    executeTransaction,
    isLoading,
    isConfirming,
    transactionResult,
    error,
    txHash: txData?.hash
  };
}
