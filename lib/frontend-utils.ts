
// Utilidades para el frontend - Generadas automáticamente
// Fecha: 2025-10-24T05:42:25.355Z

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

export const getTransactionLink = (txHash: string) => {
  return `https://sepolia.basescan.org/tx/${txHash}`;
};

export const getContractLink = (contractAddress: string) => {
  return `https://sepolia.basescan.org/address/${contractAddress}`;
};

export const formatTransactionResult = (tx: any) => {
  return {
    hash: tx.hash,
    link: getTransactionLink(tx.hash),
    status: 'pending',
    explorer: 'https://sepolia.basescan.org'
  };
};

export const waitForTransaction = async (tx: any) => {
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
