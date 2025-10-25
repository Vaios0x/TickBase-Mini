const { ethers } = require("ethers");
const fs = require('fs');

async function main() {
  console.log("🧪 Probando TicketFactory en Base Sepolia...");
  console.log("=" .repeat(50));

  // Configurar provider y wallet
  const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");
  const privateKey = "5f0a78243564952c45fc64a9347410abe9c9b0056918b650bc1c76d019d17d41";
  const wallet = new ethers.Wallet(privateKey, provider);
  
  console.log("📋 Usando cuenta:", wallet.address);

  // Direcciones de contratos
  const ticketNFTAddress = "0xE81fd4523284561382FEd2C694b0BAb0881C148D";
  const factoryAddress = "0x7A8917D50441c154A0eE545f02c6695C20fb92d7";

  try {
    // Cargar ABI del factory
    const factoryBytecode = fs.readFileSync('./artifacts/contracts/TicketFactory.sol/TicketFactory.json', 'utf8');
    const factoryABI = JSON.parse(factoryBytecode).abi;
    
    // Conectar al contrato
    const factory = new ethers.Contract(factoryAddress, factoryABI, wallet);
    
    console.log("🔗 Conectado al TicketFactory:", factoryAddress);
    console.log("");

    // 1. Crear un evento de prueba
    console.log("🎫 1/3 Creando evento de prueba...");
    
    const eventName = "Concierto de Prueba - Base Sepolia";
    const eventDescription = "Evento de prueba para verificar el funcionamiento del contrato";
    const eventDate = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60); // 7 días en el futuro
    const eventLocation = "Base Sepolia Testnet";
    const totalTickets = 100;
    const metadataURI = "https://example.com/metadata.json";

    const createEventTx = await factory.createEvent(
      eventName,
      eventDescription,
      eventDate,
      eventLocation,
      totalTickets,
      metadataURI
    );

    console.log("   📝 Transacción enviada:", createEventTx.hash);
    const createEventReceipt = await createEventTx.wait();
    console.log("   ✅ Evento creado exitosamente!");
    console.log("   🎫 Event ID: 1 (primer evento)");
    console.log("");

    // 2. Agregar tipo de ticket
    console.log("🎟️ 2/3 Agregando tipo de ticket...");
    
    const ticketTypeName = "General";
    const ticketTypeDescription = "Entrada general al concierto";
    const ticketPrice = ethers.parseEther("0.01"); // 0.01 ETH
    const maxSupply = 50;
    const ticketMetadataURI = "https://example.com/ticket-metadata.json";
    const benefits = ["Acceso al evento", "Merchandise exclusivo"];

    const addTicketTypeTx = await factory.addTicketType(
      1, // eventId
      ticketTypeName,
      ticketTypeDescription,
      ticketPrice,
      maxSupply,
      ticketMetadataURI,
      benefits
    );

    console.log("   📝 Transacción enviada:", addTicketTypeTx.hash);
    const addTicketTypeReceipt = await addTicketTypeTx.wait();
    console.log("   ✅ Tipo de ticket agregado!");
    console.log("   💰 Precio:", ethers.formatEther(ticketPrice), "ETH");
    console.log("   📦 Max Supply:", maxSupply);
    console.log("");

    // 3. Mintear un ticket de prueba
    console.log("🎫 3/3 Minteando ticket de prueba...");
    
    const mintQuantity = 1;
    const totalCost = ticketPrice * BigInt(mintQuantity);

    const mintTx = await factory.mintTickets(
      1, // eventId
      0, // ticketTypeId
      mintQuantity,
      wallet.address, // to
      { value: totalCost }
    );

    console.log("   📝 Transacción enviada:", mintTx.hash);
    const mintReceipt = await mintTx.wait();
    console.log("   ✅ Ticket minteado exitosamente!");
    console.log("   💰 Costo total:", ethers.formatEther(totalCost), "ETH");
    console.log("");

    // Obtener información del evento
    console.log("📊 Información del evento creado:");
    const eventInfo = await factory.getEvent(1);
    console.log("   🎫 Nombre:", eventInfo.name);
    console.log("   📅 Fecha:", new Date(Number(eventInfo.eventDate) * 1000).toLocaleString());
    console.log("   📍 Ubicación:", eventInfo.location);
    console.log("   🎟️ Tickets totales:", eventInfo.totalTickets.toString());
    console.log("   🎟️ Tickets vendidos:", eventInfo.soldTickets.toString());
    console.log("   ✅ Activo:", eventInfo.isActive);
    console.log("");

    // Obtener información del tipo de ticket
    console.log("🎟️ Información del tipo de ticket:");
    const ticketTypeInfo = await factory.getTicketType(1, 0);
    console.log("   🎫 Nombre:", ticketTypeInfo.name);
    console.log("   💰 Precio:", ethers.formatEther(ticketTypeInfo.price), "ETH");
    console.log("   📦 Max Supply:", ticketTypeInfo.maxSupply.toString());
    console.log("   🎟️ Vendidos:", ticketTypeInfo.sold.toString());
    console.log("   ✅ Activo:", ticketTypeInfo.active);
    console.log("");

    console.log("🎉 ¡Prueba completada exitosamente!");
    console.log("");
    console.log("🔗 Ahora puedes ver las transacciones en BaseScan:");
    console.log(`   📊 Factory: https://sepolia.basescan.org/address/${factoryAddress}`);
    console.log(`   🎫 TicketNFT: https://sepolia.basescan.org/address/${ticketNFTAddress}`);
    console.log("");
    console.log("📋 Transacciones realizadas:");
    console.log("   1. createEvent() - Crear evento");
    console.log("   2. addTicketType() - Agregar tipo de ticket");
    console.log("   3. mintTickets() - Mintear ticket");

  } catch (error) {
    console.error("❌ Error durante la prueba:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error fatal:", error);
    process.exit(1);
  });
