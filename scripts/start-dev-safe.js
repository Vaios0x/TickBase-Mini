#!/usr/bin/env node

/**
 * Script seguro para iniciar el servidor de desarrollo
 * Maneja conflictos de puerto y errores de hidratación
 */

const { spawn } = require('child_process');
const net = require('net');

// Función para verificar si un puerto está en uso
function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => {
        resolve(false);
      });
      server.close();
    });
    
    server.on('error', () => {
      resolve(true);
    });
  });
}

// Función para encontrar un puerto disponible
async function findAvailablePort(startPort = 3000) {
  for (let port = startPort; port < startPort + 10; port++) {
    const inUse = await isPortInUse(port);
    if (!inUse) {
      return port;
    }
  }
  throw new Error('No se encontró un puerto disponible');
}

// Función para matar procesos en puertos específicos
function killProcessOnPort(port) {
  return new Promise((resolve) => {
    const { exec } = require('child_process');
    
    // En Windows
    if (process.platform === 'win32') {
      exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
        if (stdout) {
          const lines = stdout.split('\n');
          const pids = lines
            .map(line => line.trim().split(/\s+/))
            .filter(parts => parts.length > 4 && parts[1].includes(`:${port}`))
            .map(parts => parts[4])
            .filter(pid => pid && pid !== '0');
          
          if (pids.length > 0) {
            console.log(`🔪 Terminando procesos en puerto ${port}: ${pids.join(', ')}`);
            pids.forEach(pid => {
              exec(`taskkill /PID ${pid} /F`, () => {});
            });
          }
        }
        resolve();
      });
    } else {
      // En Unix/Linux/Mac
      exec(`lsof -ti:${port}`, (error, stdout) => {
        if (stdout) {
          const pids = stdout.trim().split('\n');
          console.log(`🔪 Terminando procesos en puerto ${port}: ${pids.join(', ')}`);
          pids.forEach(pid => {
            exec(`kill -9 ${pid}`, () => {});
          });
        }
        resolve();
      });
    }
  });
}

async function startDevServer() {
  console.log('🚀 Iniciando servidor de desarrollo seguro...\n');
  
  try {
    // Verificar puerto 3000
    const port3000InUse = await isPortInUse(3000);
    
    if (port3000InUse) {
      console.log('⚠️ Puerto 3000 está en uso');
      console.log('🔪 Intentando liberar el puerto...');
      
      await killProcessOnPort(3000);
      
      // Esperar un momento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Verificar nuevamente
      const stillInUse = await isPortInUse(3000);
      if (stillInUse) {
        console.log('⚠️ Puerto 3000 aún está en uso, buscando puerto alternativo...');
        const availablePort = await findAvailablePort(3001);
        console.log(`✅ Usando puerto ${availablePort}`);
        
        // Iniciar servidor en puerto alternativo
        const child = spawn('npm', ['run', 'dev', '--', '-p', availablePort.toString()], {
          stdio: 'inherit',
          shell: true
        });
        
        child.on('error', (error) => {
          console.error('❌ Error iniciando servidor:', error);
        });
        
        return;
      }
    }
    
    console.log('✅ Puerto 3000 disponible');
    console.log('🚀 Iniciando servidor en puerto 3000...\n');
    
    // Iniciar servidor normal
    const child = spawn('npm', ['run', 'dev'], {
      stdio: 'inherit',
      shell: true
    });
    
    child.on('error', (error) => {
      console.error('❌ Error iniciando servidor:', error);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Manejar señales de terminación
process.on('SIGINT', () => {
  console.log('\n🛑 Deteniendo servidor...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Deteniendo servidor...');
  process.exit(0);
});

// Ejecutar
startDevServer();
