const { ethers } = require("ethers");

async function main() {
  console.log("🔍 Verificando estado del TicketFactory...");
  console.log("=" .repeat(50));

  // Configurar provider y wallet
  const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");
  const privateKey = "5f0a78243564952c45fc64a9347410abe9c9b0056918b650bc1c76d019d17d41";
  const wallet = new ethers.Wallet(privateKey, provider);
  
  console.log("📋 Usando cuenta:", wallet.address);

  // Direcciones de contratos
  const factoryAddress = "0x7A8917D50441c154A0eE545f02c6695C20fb92d7";

  try {
    // Cargar ABI del factory
    const fs = require('fs');
    const factoryBytecode = fs.readFileSync('./artifacts/contracts/TicketFactory.sol/TicketFactory.json', 'utf8');
    const factoryABI = JSON.parse(factoryBytecode).abi;
    
    // Conectar al contrato
    const factory = new ethers.Contract(factoryAddress, factoryABI, wallet);
    
    console.log("🔗 Conectado al TicketFactory:", factoryAddress);
    console.log("");

    // Verificar información del evento
    console.log("📊 Información del evento 1:");
    try {
      const eventInfo = await factory.getEvent(1);
      console.log("   🎫 Nombre:", eventInfo.name);
      console.log("   📅 Fecha:", new Date(Number(eventInfo.eventDate) * 1000).toLocaleString());
      console.log("   📍 Ubicación:", eventInfo.location);
      console.log("   🎟️ Tickets totales:", eventInfo.totalTickets.toString());
      console.log("   🎟️ Tickets vendidos:", eventInfo.soldTickets.toString());
      console.log("   ✅ Activo:", eventInfo.isActive);
      console.log("   🎫 Tipos de tickets:", eventInfo.ticketTypeCount.toString());
    } catch (error) {
      console.log("   ❌ Error obteniendo evento:", error.message);
    }

    console.log("");

    // Verificar tipos de tickets
    console.log("🎟️ Verificando tipos de tickets:");
    try {
      const ticketTypeCount = await factory.getTicketTypeCount(1);
      console.log("   📦 Cantidad de tipos:", ticketTypeCount.toString());
      
      if (ticketTypeCount > 0) {
        for (let i = 0; i < Number(ticketTypeCount); i++) {
          try {
            const ticketTypeInfo = await factory.getTicketType(1, i);
            console.log(`   🎟️ Tipo ${i}:`);
            console.log(`      Nombre: ${ticketTypeInfo.name}`);
            console.log(`      Precio: ${ethers.formatEther(ticketTypeInfo.price)} ETH`);
            console.log(`      Max Supply: ${ticketTypeInfo.maxSupply.toString()}`);
            console.log(`      Vendidos: ${ticketTypeInfo.sold.toString()}`);
            console.log(`      Activo: ${ticketTypeInfo.active}`);
          } catch (error) {
            console.log(`   ❌ Error obteniendo tipo ${i}:`, error.message);
          }
        }
      }
    } catch (error) {
      console.log("   ❌ Error obteniendo tipos de tickets:", error.message);
    }

    console.log("");

    // Verificar estadísticas globales
    console.log("📈 Estadísticas globales:");
    try {
      const stats = await factory.getGlobalStats();
      console.log("   🎫 Total eventos:", stats._totalEvents.toString());
      console.log("   🎟️ Total tickets vendidos:", stats._totalTicketsSold.toString());
      console.log("   ✅ Eventos activos:", stats._activeEvents.toString());
    } catch (error) {
      console.log("   ❌ Error obteniendo estadísticas:", error.message);
    }

    console.log("");
    console.log("🔗 Enlaces del explorador:");
    console.log(`   📊 Factory: https://sepolia.basescan.org/address/${factoryAddress}`);
    console.log("   📋 Ahora deberías ver transacciones en BaseScan!");

  } catch (error) {
    console.error("❌ Error durante la verificación:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error fatal:", error);
    process.exit(1);
  });
