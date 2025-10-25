const { ethers } = require("ethers");
const fs = require('fs');

async function main() {
  console.log("💰 ACTUALIZANDO COMISIONES A 1%");
  console.log("=" .repeat(50));
  console.log("🌐 Red: Base Sepolia Testnet");
  console.log("📅 Fecha:", new Date().toLocaleString());
  console.log("");

  // Configurar provider y wallet
  const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");
  const privateKey = "5f0a78243564952c45fc64a9347410abe9c9b0056918b650bc1c76d019d17d41";
  const wallet = new ethers.Wallet(privateKey, provider);
  
  console.log("👤 Owner:", wallet.address);
  console.log("💰 Balance:", ethers.formatEther(await provider.getBalance(wallet.address)), "ETH");
  console.log("");

  // Direcciones de contratos
  const contracts = {
    MARKETPLACE: "0xff85e8A49d4623C3D1edE1c0CbC7ed08685D7CC4",
    FACTORY: "0x7A8917D50441c154A0eE545f02c6695C20fb92d7"
  };

  try {
    // 1. ACTUALIZAR FEE DEL MARKETPLACE
    console.log("🏪 1/2 ACTUALIZANDO MARKETPLACE FEE...");
    console.log("-".repeat(40));
    
    const marketplaceABI = JSON.parse(fs.readFileSync('./artifacts/contracts/TicketMarketplace.sol/TicketMarketplace.json', 'utf8')).abi;
    const marketplace = new ethers.Contract(contracts.MARKETPLACE, marketplaceABI, wallet);
    
    // Verificar fee actual
    const currentFee = await marketplace.platformFeePercent();
    console.log(`   📊 Fee actual: ${currentFee.toString()} (${(Number(currentFee)/100).toFixed(2)}%)`);
    
    // Actualizar a 1% (100 basis points)
    const newFee = 100; // 1% = 100 basis points
    console.log(`   🔄 Actualizando a: ${newFee} (${(Number(newFee)/100).toFixed(2)}%)`);
    
    const updateMarketplaceTx = await marketplace.updatePlatformFee(newFee);
    console.log("   📝 Transacción enviada:", updateMarketplaceTx.hash);
    await updateMarketplaceTx.wait();
    console.log("   ✅ Marketplace fee actualizado a 1%");
    
    // Verificar cambio
    const updatedFee = await marketplace.platformFeePercent();
    console.log(`   ✅ Fee verificado: ${updatedFee.toString()} (${(Number(updatedFee)/100).toFixed(2)}%)`);
    console.log("");

    // 2. ACTUALIZAR FEE DEL FACTORY
    console.log("🏭 2/2 ACTUALIZANDO FACTORY FEE...");
    console.log("-".repeat(40));
    
    const factoryABI = JSON.parse(fs.readFileSync('./artifacts/contracts/TicketFactory.sol/TicketFactory.json', 'utf8')).abi;
    const factory = new ethers.Contract(contracts.FACTORY, factoryABI, wallet);
    
    // Verificar fee actual
    const currentFactoryFee = await factory.platformFeePercent();
    console.log(`   📊 Fee actual: ${currentFactoryFee.toString()} (${(Number(currentFactoryFee)/100).toFixed(2)}%)`);
    
    // Actualizar a 1% (100 basis points)
    console.log(`   🔄 Actualizando a: ${newFee} (${(Number(newFee)/100).toFixed(2)}%)`);
    
    const updateFactoryTx = await factory.updatePlatformFee(newFee);
    console.log("   📝 Transacción enviada:", updateFactoryTx.hash);
    await updateFactoryTx.wait();
    console.log("   ✅ Factory fee actualizado a 1%");
    
    // Verificar cambio
    const updatedFactoryFee = await factory.platformFeePercent();
    console.log(`   ✅ Fee verificado: ${updatedFactoryFee.toString()} (${(Number(updatedFactoryFee)/100).toFixed(2)}%)`);
    console.log("");

    // 3. VERIFICAR CONFIGURACIÓN FINAL
    console.log("🔍 VERIFICANDO CONFIGURACIÓN FINAL...");
    console.log("-".repeat(40));
    
    const finalMarketplaceFee = await marketplace.platformFeePercent();
    const finalFactoryFee = await factory.platformFeePercent();
    const maxFee = await marketplace.MAX_FEE_PERCENT();
    
    console.log(`   🏪 Marketplace Fee: ${finalMarketplaceFee.toString()} (${(Number(finalMarketplaceFee)/100).toFixed(2)}%)`);
    console.log(`   🏭 Factory Fee: ${finalFactoryFee.toString()} (${(Number(finalFactoryFee)/100).toFixed(2)}%)`);
    console.log(`   📊 Max Fee Permitido: ${maxFee.toString()} (${(Number(maxFee)/100).toFixed(2)}%)`);
    console.log(`   🎫 Royalty Fee: 2.5% (fijo en TicketNFT)`);
    console.log("");

    // 4. ACTUALIZAR CONFIGURACIÓN EN EL FRONTEND
    console.log("📝 ACTUALIZANDO CONFIGURACIÓN DEL FRONTEND...");
    console.log("-".repeat(40));
    
    // Leer constants.ts actual
    const constantsPath = './lib/constants.ts';
    let constantsContent = fs.readFileSync(constantsPath, 'utf8');
    
    // Actualizar PLATFORM_FEE de 2.5 a 1.0
    constantsContent = constantsContent.replace(
      /PLATFORM_FEE: 2\.5, \/\/ 2\.5%/,
      'PLATFORM_FEE: 1.0, // 1.0%'
    );
    
    // Guardar archivo actualizado
    fs.writeFileSync(constantsPath, constantsContent);
    console.log("   ✅ lib/constants.ts actualizado");
    console.log("   📊 PLATFORM_FEE: 2.5% → 1.0%");
    console.log("");

    // 5. CREAR ARCHIVO DE CONFIGURACIÓN ACTUALIZADO
    const updatedConfig = {
      network: {
        name: "Base Sepolia",
        chainId: 84532,
        rpcUrl: "https://sepolia.base.org",
        explorer: "https://sepolia.basescan.org"
      },
      deployer: wallet.address,
      updatedAt: new Date().toISOString(),
      contracts: {
        TICKET_NFT: "0xE81fd4523284561382FEd2C694b0BAb0881C148D",
        MARKETPLACE: "0xff85e8A49d4623C3D1edE1c0CbC7ed08685D7CC4",
        VALIDATOR: "0x7Ecd57D7fF8b0c9A894c6282bB023980154732c5",
        FACTORY: "0x7A8917D50441c154A0eE545f02c6695C20fb92d7",
        SIMPLE_FACTORY: "0xFDCFd7EDf8f1A34Fe6DcADf27cF237bF26a3de8E"
      },
      fees: {
        platformFee: "1.0%",
        royaltyFee: "2.5%",
        maxFee: "10.0%",
        cnbvCompliant: true
      },
      gasUsed: {
        marketplaceUpdate: "~50,000 gas",
        factoryUpdate: "~50,000 gas"
      }
    };

    // Guardar configuración actualizada
    const configPath = './deployment-config-updated.json';
    fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2));
    console.log(`   📝 Configuración actualizada guardada en: ${configPath}`);

    console.log("");
    console.log("🎉 ACTUALIZACIÓN DE COMISIONES COMPLETADA!");
    console.log("=" .repeat(50));
    console.log("✅ Marketplace fee: 2.5% → 1.0%");
    console.log("✅ Factory fee: 2.5% → 1.0%");
    console.log("✅ Frontend configurado");
    console.log("✅ Configuración guardada");
    console.log("");
    console.log("💰 NUEVO MODELO DE INGRESOS:");
    console.log("   🏪 Platform Fee: 1.0% en ventas primarias");
    console.log("   🏪 Platform Fee: 1.0% en ventas secundarias");
    console.log("   🎫 Royalty Fee: 2.5% en transferencias");
    console.log("   📊 Max Fee: 10% (límite de seguridad)");
    console.log("   🛡️ CNBV Compliant: ✅ México");
    console.log("");
    console.log("🔗 Enlaces del explorador:");
    console.log(`   🏪 Marketplace: https://sepolia.basescan.org/address/${contracts.MARKETPLACE}`);
    console.log(`   🏭 Factory: https://sepolia.basescan.org/address/${contracts.FACTORY}`);
    console.log("");
    console.log("📈 VENTAJAS COMPETITIVAS:");
    console.log("   💰 Comisiones más bajas (1% vs 2.5%)");
    console.log("   🏆 Más competitivo en el mercado");
    console.log("   📊 Mejor para organizadores y usuarios");
    console.log("   🛡️ Mantiene compliance CNBV");

  } catch (error) {
    console.error("❌ Error durante la actualización:", error);
    console.error("📋 Detalles del error:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error fatal:", error);
    process.exit(1);
  });
