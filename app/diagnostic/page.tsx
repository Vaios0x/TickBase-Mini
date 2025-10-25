
'use client'

import { WalletDiagnostic } from '@/components/contracts/WalletDiagnostic'
import { ContractProvider } from '@/components/contracts/ContractProvider'

export default function DiagnosticPage() {
  return (
    <ContractProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🔍 Diagnóstico de Wallet</h1>
            <p className="text-gray-600">Diagnostica problemas con la conexión del wallet</p>
          </div>
          
          <WalletDiagnostic />
        </div>
      </div>
    </ContractProvider>
  )
}
