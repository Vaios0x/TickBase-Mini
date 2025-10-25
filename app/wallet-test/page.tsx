
'use client'

import { WalletTestComponent } from '@/components/contracts/WalletTestComponent'
import { ContractProvider } from '@/components/contracts/ContractProvider'

export default function WalletTestPage() {
  return (
    <ContractProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🧪 Prueba de Wallet</h1>
            <p className="text-gray-600">Prueba si el wallet se abre automáticamente</p>
          </div>
          
          <WalletTestComponent />
        </div>
      </div>
    </ContractProvider>
  )
}
