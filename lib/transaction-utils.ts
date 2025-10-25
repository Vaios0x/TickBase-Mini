
// Utilidades para transacciones en el frontend
// Generadas automáticamente - 2025-10-24T05:43:24.185Z

export interface TransactionResult {
  hash: string;
  link: string;
  status: 'pending' | 'confirmed' | 'failed';
  blockNumber?: number;
  gasUsed?: string;
  gasPrice?: string;
  explorer: string;
}

export const BASE_SEPOLIA_CONFIG = {
  chainId: 84532,
  name: 'Base Sepolia',
  rpcUrl: 'https://sepolia.base.org',
  explorer: 'https://sepolia.basescan.org',
  contracts: {
    TICKET_NFT: '0xE81fd4523284561382FEd2C694b0BAb0881C148D',
    MARKETPLACE: '0xff85e8A49d4623C3D1edE1c0CbC7ed08685D7CC4',
    FACTORY: '0x7A8917D50441c154A0eE545f02c6695C20fb92d7',
    VALIDATOR: '0x7Ecd57D7fF8b0c9A894c6282bB023980154732c5',
    SIMPLE_FACTORY: '0xFDCFd7EDf8f1A34Fe6DcADf27cF237bF26a3de8E'
  }
};

// Función para generar link de transacción
export const getTransactionLink = (txHash: string): string => {
  return `https://sepolia.basescan.org/tx/${txHash}`;
};

// Función para generar link de contrato
export const getContractLink = (contractAddress: string): string => {
  return `https://sepolia.basescan.org/address/${contractAddress}`;
};

// Función para formatear resultado de transacción
export const formatTransactionResult = (tx: any): TransactionResult => {
  return {
    hash: tx.hash,
    link: getTransactionLink(tx.hash),
    status: 'pending',
    explorer: 'https://sepolia.basescan.org'
  };
};

// Función para esperar confirmación de transacción
export const waitForTransaction = async (tx: any): Promise<TransactionResult> => {
  const receipt = await tx.wait();
  return {
    hash: tx.hash,
    link: getTransactionLink(tx.hash),
    status: 'confirmed',
    blockNumber: receipt.blockNumber,
    gasUsed: receipt.gasUsed.toString(),
    gasPrice: receipt.gasPrice.toString(),
    explorer: 'https://sepolia.basescan.org'
  };
};

// Función para manejar errores de transacción
export const handleTransactionError = (error: any): string => {
  if (error?.message?.includes('execution reverted')) {
    const revertReason = error.message.match(/execution reverted: "([^"]+)"/);
    return revertReason ? revertReason[1] : 'Transaction failed';
  }
  return error?.message || 'Unknown error occurred';
};

// Función para mostrar resultado en UI
export const displayTransactionResult = (result: TransactionResult): void => {
  console.log('🎉 Transacción completada:');
  console.log(`📝 Hash: ${result.hash}`);
  console.log(`🔗 Link: ${result.link}`);
  console.log(`✅ Status: ${result.status}`);
  if (result.blockNumber) {
    console.log(`📦 Block: ${result.blockNumber}`);
  }
  if (result.gasUsed) {
    console.log(`⛽ Gas Used: ${result.gasUsed}`);
  }
};
