const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying TickBase contracts...");

  // Deploy TicketNFT contract
  console.log("📝 Deploying TicketNFT contract...");
  const TicketNFT = await hre.ethers.getContractFactory("TicketNFT");
  const ticketNFT = await TicketNFT.deploy();

  await ticketNFT.waitForDeployment();
  const ticketNFTAddress = await ticketNFT.getAddress();
  console.log("✅ TicketNFT deployed to:", ticketNFTAddress);

  // Deploy TicketMarketplace contract
  console.log("🏪 Deploying TicketMarketplace contract...");
  const TicketMarketplace = await hre.ethers.getContractFactory("TicketMarketplace");
  const ticketMarketplace = await TicketMarketplace.deploy(ticketNFTAddress);

  await ticketMarketplace.waitForDeployment();
  const marketplaceAddress = await ticketMarketplace.getAddress();
  console.log("✅ TicketMarketplace deployed to:", marketplaceAddress);

  // Deploy TicketFactory contract
  console.log("🏭 Deploying TicketFactory contract...");
  const TicketFactory = await hre.ethers.getContractFactory("TicketFactory");
  const ticketFactory = await TicketFactory.deploy();

  await ticketFactory.waitForDeployment();
  const factoryAddress = await ticketFactory.getAddress();
  console.log("✅ TicketFactory deployed to:", factoryAddress);

  // Verificar contratos en Basescan
  if (hre.network.name === "base" || hre.network.name === "base-sepolia") {
    console.log("⏳ Waiting for block confirmations...");
    await ticketNFT.deploymentTransaction().wait(6);
    
    console.log("🔍 Verifying contracts on Basescan...");
    
    try {
      await hre.run("verify:verify", {
        address: ticketNFTAddress,
        constructorArguments: [],
      });
      console.log("✅ TicketNFT verified");
    } catch (error) {
      console.log("❌ TicketNFT verification failed:", error.message);
    }

    try {
      await hre.run("verify:verify", {
        address: marketplaceAddress,
        constructorArguments: [ticketNFTAddress],
      });
      console.log("✅ TicketMarketplace verified");
    } catch (error) {
      console.log("❌ TicketMarketplace verification failed:", error.message);
    }

    try {
      await hre.run("verify:verify", {
        address: factoryAddress,
        constructorArguments: [],
      });
      console.log("✅ TicketFactory verified");
    } catch (error) {
      console.log("❌ TicketFactory verification failed:", error.message);
    }
  }

  // Crear eventos de ejemplo en testnet
  if (hre.network.name === "base-sepolia") {
    console.log("🎫 Creating sample events...");
    
    const [owner] = await hre.ethers.getSigners();
    
    try {
      // Evento 1: Festival de Verano
      const tx1 = await ticketNFT.createEvent(
        "Festival de Verano 2025",
        "Parque Central",
        Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 días desde ahora
        hre.ethers.parseEther("0.05"),
        100,
        "ipfs://QmSampleHash1/metadata.json"
      );
      await tx1.wait();
      console.log("✅ Sample event 1 created");
      
      // Evento 2: Concierto de Rock
      const tx2 = await ticketNFT.createEvent(
        "Concierto de Rock",
        "Estadio Nacional",
        Math.floor(Date.now() / 1000) + 45 * 24 * 60 * 60, // 45 días desde ahora
        hre.ethers.parseEther("0.03"),
        250,
        "ipfs://QmSampleHash2/metadata.json"
      );
      await tx2.wait();
      console.log("✅ Sample event 2 created");
      
      // Evento 3: Conferencia de Blockchain
      const tx3 = await ticketNFT.createEvent(
        "Conferencia de Blockchain",
        "Centro de Convenciones",
        Math.floor(Date.now() / 1000) + 60 * 24 * 60 * 60, // 60 días desde ahora
        hre.ethers.parseEther("0.02"),
        200,
        "ipfs://QmSampleHash3/metadata.json"
      );
      await tx3.wait();
      console.log("✅ Sample event 3 created");
      
      console.log("🎉 Sample events created successfully!");
    } catch (error) {
      console.log("❌ Error creating sample events:", error.message);
    }
  }

  // Resumen del deployment
  console.log("\n📋 Deployment Summary:");
  console.log("========================");
  console.log(`Network: ${hre.network.name}`);
  console.log(`TicketNFT: ${ticketNFTAddress}`);
  console.log(`Marketplace: ${marketplaceAddress}`);
  console.log(`Factory: ${factoryAddress}`);
  console.log("\n🔗 Update your .env.local with these addresses:");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${ticketNFTAddress}`);
  console.log(`NEXT_PUBLIC_MARKETPLACE_ADDRESS=${marketplaceAddress}`);
  console.log(`NEXT_PUBLIC_FACTORY_ADDRESS=${factoryAddress}`);

  return {
    ticketNFT: ticketNFTAddress,
    marketplace: marketplaceAddress,
    factory: factoryAddress
  };
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
