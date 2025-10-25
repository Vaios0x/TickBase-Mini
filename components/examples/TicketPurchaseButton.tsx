
// Ejemplo de componente que abre el wallet para comprar
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { useState } from 'react';

export function TicketPurchaseButton({ eventId, price }) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  
  // Hook para escribir en el contrato
  const { writeAsync: buyTicket, data: txData } = useContractWrite({
    address: '0xff85e8A49d4623C3D1edE1c0CbC7ed08685D7CC4',
    abi: [/* ABI del marketplace */],
    functionName: 'buyTicket',
  });
  
  // Hook para esperar confirmación
  const { isLoading: isConfirming } = useWaitForTransaction({
    hash: txData?.hash,
  });
  
  const handlePurchase = async () => {
    setIsPurchasing(true);
    
    try {
      // Esta función abrirá automáticamente el wallet
      const tx = await buyTicket({
        args: [eventId],
        value: ethers.parseEther(price)
      });
      
      console.log('📝 Transacción enviada:', tx.hash);
      console.log('🔗 Link BaseScan:', `https://sepolia.basescan.org/tx/${tx.hash}`);
      
      // El wallet se cierra automáticamente después de firmar
      // La transacción se confirma en segundo plano
      
    } catch (error) {
      console.error('❌ Error:', error);
    } finally {
      setIsPurchasing(false);
    }
  };
  
  return (
    <button 
      onClick={handlePurchase}
      disabled={isPurchasing || isConfirming}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      {isPurchasing ? 'Abriendo Wallet...' : 'Comprar Ticket'}
    </button>
  );
}
