
// Utilidades para manejo de wallet
export const WALLET_CONFIG = {
  networks: {
    baseSepolia: {
      chainId: 84532,
      name: 'Base Sepolia',
      rpcUrl: 'https://sepolia.base.org',
      explorer: 'https://sepolia.basescan.org'
    }
  },
  contracts: {
    marketplace: '0xff85e8A49d4623C3D1edE1c0CbC7ed08685D7CC4',
    factory: '0x7A8917D50441c154A0eE545f02c6695C20fb92d7'
  }
};

export const openWallet = () => {
  // Esta función se ejecuta automáticamente cuando se llama a writeAsync
  console.log('🔗 Abriendo wallet...');
  // El wallet se abre automáticamente con wagmi
};

export const formatTransactionResult = (tx) => {
  return {
    hash: tx.hash,
    link: `https://sepolia.basescan.org/tx/${tx.hash}`,
    status: 'pending',
    explorer: 'https://sepolia.basescan.org'
  };
};

export const waitForConfirmation = async (tx) => {
  const receipt = await tx.wait();
  return {
    hash: tx.hash,
    link: `https://sepolia.basescan.org/tx/${tx.hash}`,
    status: 'confirmed',
    blockNumber: receipt.blockNumber,
    gasUsed: receipt.gasUsed.toString(),
    explorer: 'https://sepolia.basescan.org'
  };
};
