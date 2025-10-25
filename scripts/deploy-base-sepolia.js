const { ethers } = require("ethers");
const fs = require('fs');

async function main() {
  console.log("🚀 Desplegando TickBase a Base Sepolia...");
  console.log("=" .repeat(50));

  // Configurar provider y wallet
  const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");
  const privateKey = "5f0a78243564952c45fc64a9347410abe9c9b0056918b650bc1c76d019d17d41";
  const wallet = new ethers.Wallet(privateKey, provider);
  
  console.log("📋 Desplegando con la cuenta:", wallet.address);

  // Verificar balance
  const balance = await provider.getBalance(wallet.address);
  console.log("💰 Balance de la cuenta:", ethers.formatEther(balance), "ETH");

  if (balance < ethers.parseEther("0.01")) {
    console.error("❌ Balance insuficiente. Necesitas al menos 0.01 ETH para el despliegue.");
    console.log("💡 Obtén ETH de testnet en: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet");
    process.exit(1);
  }

  const network = await provider.getNetwork();
  console.log("🌐 Red:", network.name, "| Chain ID:", network.chainId);
  console.log("");

  try {
    // 1. Desplegar TicketNFT
    console.log("🎫 1/5 Desplegando TicketNFT...");
    const ticketNFTBytecode = fs.readFileSync('./artifacts/contracts/TicketNFT.sol/TicketNFT.json', 'utf8');
    const ticketNFTABI = JSON.parse(ticketNFTBytecode).abi;
    const ticketNFTBytecodeData = JSON.parse(ticketNFTBytecode).bytecode;
    
    const ticketNFTFactory = new ethers.ContractFactory(ticketNFTABI, ticketNFTBytecodeData, wallet);
    const ticketNFT = await ticketNFTFactory.deploy();
    await ticketNFT.waitForDeployment();
    const ticketNFTAddress = await ticketNFT.getAddress();
    console.log("   ✅ TicketNFT desplegado en:", ticketNFTAddress);

    // 2. Desplegar TicketMarketplace
    console.log("🏪 2/5 Desplegando TicketMarketplace...");
    const marketplaceBytecode = fs.readFileSync('./artifacts/contracts/TicketMarketplace.sol/TicketMarketplace.json', 'utf8');
    const marketplaceABI = JSON.parse(marketplaceBytecode).abi;
    const marketplaceBytecodeData = JSON.parse(marketplaceBytecode).bytecode;
    
    const marketplaceFactory = new ethers.ContractFactory(marketplaceABI, marketplaceBytecodeData, wallet);
    const marketplace = await marketplaceFactory.deploy();
    await marketplace.waitForDeployment();
    const marketplaceAddress = await marketplace.getAddress();
    console.log("   ✅ TicketMarketplace desplegado en:", marketplaceAddress);

    // 3. Desplegar TicketValidator
    console.log("🔍 3/5 Desplegando TicketValidator...");
    const validatorBytecode = fs.readFileSync('./artifacts/contracts/TicketValidator.sol/TicketValidator.json', 'utf8');
    const validatorABI = JSON.parse(validatorBytecode).abi;
    const validatorBytecodeData = JSON.parse(validatorBytecode).bytecode;
    
    const validatorFactory = new ethers.ContractFactory(validatorABI, validatorBytecodeData, wallet);
    const validator = await validatorFactory.deploy(ticketNFTAddress);
    await validator.waitForDeployment();
    const validatorAddress = await validator.getAddress();
    console.log("   ✅ TicketValidator desplegado en:", validatorAddress);

    // 4. Desplegar TicketFactory
    console.log("🏭 4/5 Desplegando TicketFactory...");
    const factoryBytecode = fs.readFileSync('./artifacts/contracts/TicketFactory.sol/TicketFactory.json', 'utf8');
    const factoryABI = JSON.parse(factoryBytecode).abi;
    const factoryBytecodeData = JSON.parse(factoryBytecode).bytecode;
    
    const factoryContractFactory = new ethers.ContractFactory(factoryABI, factoryBytecodeData, wallet);
    const factory = await factoryContractFactory.deploy(ticketNFTAddress);
    await factory.waitForDeployment();
    const factoryAddress = await factory.getAddress();
    console.log("   ✅ TicketFactory desplegado en:", factoryAddress);

    // 5. Desplegar SimpleTicketFactory
    console.log("🔧 5/5 Desplegando SimpleTicketFactory...");
    const simpleFactoryBytecode = fs.readFileSync('./artifacts/contracts/SimpleTicketFactory.sol/SimpleTicketFactory.json', 'utf8');
    const simpleFactoryABI = JSON.parse(simpleFactoryBytecode).abi;
    const simpleFactoryBytecodeData = JSON.parse(simpleFactoryBytecode).bytecode;
    
    const simpleFactoryContractFactory = new ethers.ContractFactory(simpleFactoryABI, simpleFactoryBytecodeData, wallet);
    const simpleFactory = await simpleFactoryContractFactory.deploy(ticketNFTAddress);
    await simpleFactory.waitForDeployment();
    const simpleFactoryAddress = await simpleFactory.getAddress();
    console.log("   ✅ SimpleTicketFactory desplegado en:", simpleFactoryAddress);

    console.log("");
    console.log("🔍 Verificando despliegues...");

    // Verificar que todos los contratos fueron desplegados correctamente
    const contracts = [
      { name: "TicketNFT", address: ticketNFTAddress },
      { name: "TicketMarketplace", address: marketplaceAddress },
      { name: "TicketValidator", address: validatorAddress },
      { name: "TicketFactory", address: factoryAddress },
      { name: "SimpleTicketFactory", address: simpleFactoryAddress }
    ];

    for (const contract of contracts) {
      const code = await provider.getCode(contract.address);
      if (code === "0x") {
        console.error(`❌ Error: ${contract.name} no se desplegó correctamente`);
        process.exit(1);
      }
      console.log(`   ✅ ${contract.name} verificado`);
    }

    // Crear configuración completa
    const config = {
      network: {
        name: "Base Sepolia",
        chainId: 84532,
        rpcUrl: "https://sepolia.base.org",
        explorer: "https://sepolia.basescan.org"
      },
      deployer: wallet.address,
      deployedAt: new Date().toISOString(),
      contracts: {
        TICKET_NFT: ticketNFTAddress,
        MARKETPLACE: marketplaceAddress,
        VALIDATOR: validatorAddress,
        FACTORY: factoryAddress,
        SIMPLE_FACTORY: simpleFactoryAddress
      },
      gasUsed: {
        estimated: "~5,000,000 gas",
        actual: "Verificar en explorer"
      }
    };

    // Guardar configuración
    const configPath = './deployment-config.json';
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`📝 Configuración guardada en: ${configPath}`);

    // Mostrar resumen
    console.log("");
    console.log("📋 RESUMEN DEL DESPLIEGUE:");
    console.log("=" .repeat(50));
    console.log("Red: Base Sepolia");
    console.log("Chain ID: 84532");
    console.log("Deployer:", wallet.address);
    console.log("");
    console.log("Contratos desplegados:");
    console.log("🎫 TicketNFT:", ticketNFTAddress);
    console.log("🏪 Marketplace:", marketplaceAddress);
    console.log("🔍 Validator:", validatorAddress);
    console.log("🏭 Factory:", factoryAddress);
    console.log("🔧 SimpleFactory:", simpleFactoryAddress);
    console.log("");

    console.log("🔗 Enlaces del explorador:");
    console.log(`🎫 TicketNFT: https://sepolia.basescan.org/address/${ticketNFTAddress}`);
    console.log(`🏪 Marketplace: https://sepolia.basescan.org/address/${marketplaceAddress}`);
    console.log(`🔍 Validator: https://sepolia.basescan.org/address/${validatorAddress}`);
    console.log(`🏭 Factory: https://sepolia.basescan.org/address/${factoryAddress}`);
    console.log(`🔧 SimpleFactory: https://sepolia.basescan.org/address/${simpleFactoryAddress}`);

    console.log("");
    console.log("🎉 ¡Despliegue completado exitosamente!");
    console.log("");
    console.log("📋 PRÓXIMOS PASOS:");
    console.log("1. Actualizar las direcciones en el frontend");
    console.log("2. Configurar validadores autorizados");
    console.log("3. Probar las funciones de los contratos");
    console.log("4. Crear eventos de prueba");

  } catch (error) {
    console.error("❌ Error durante el despliegue:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error fatal:", error);
    process.exit(1);
  });
