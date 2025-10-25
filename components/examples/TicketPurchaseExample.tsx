
// Ejemplo de componente frontend para comprar tickets
// Generado automáticamente - 2025-10-24T05:43:24.186Z

import { useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { formatTransactionResult, waitForTransaction, displayTransactionResult } from '@/lib/transaction-utils';

export function TicketPurchaseComponent() {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [transactionResult, setTransactionResult] = useState(null);
  
  // Hook para escribir en el contrato
  const { writeAsync: buyTicket, data: txData } = useContractWrite({
    address: '0xff85e8A49d4623C3D1edE1c0CbC7ed08685D7CC4',
    abi: marketplaceABI,
    functionName: 'buyTicket',
  });
  
  // Hook para esperar confirmación
  const { isLoading: isConfirming } = useWaitForTransaction({
    hash: txData?.hash,
  });
  
  const handlePurchase = async (listingId: number, price: string) => {
    setIsPurchasing(true);
    
    try {
      // Ejecutar transacción
      const tx = await buyTicket({
        args: [listingId],
        value: ethers.parseEther(price)
      });
      
      console.log('📝 Transacción enviada:', tx.hash);
      console.log('🔗 Link BaseScan:', `https://sepolia.basescan.org/tx/${tx.hash}`);
      
      // Formatear resultado
      const result = formatTransactionResult(tx);
      setTransactionResult(result);
      
      // Mostrar en UI
      displayTransactionResult(result);
      
    } catch (error) {
      console.error('❌ Error comprando ticket:', error);
    } finally {
      setIsPurchasing(false);
    }
  };
  
  return (
    <div className="ticket-purchase">
      {transactionResult && (
        <div className="transaction-result">
          <h3>✅ Transacción Completada</h3>
          <p><strong>Hash:</strong> {transactionResult.hash}</p>
          <p><strong>Link:</strong> 
            <a href={transactionResult.link} target="_blank" rel="noopener noreferrer">
              Ver en BaseScan
            </a>
          </p>
          <p><strong>Status:</strong> {transactionResult.status}</p>
          {transactionResult.blockNumber && (
            <p><strong>Block:</strong> {transactionResult.blockNumber}</p>
          )}
        </div>
      )}
      
      <button 
        onClick={() => handlePurchase(1, "0.05")}
        disabled={isPurchasing || isConfirming}
      >
        {isPurchasing ? 'Comprando...' : 'Comprar Ticket'}
      </button>
    </div>
  );
}
