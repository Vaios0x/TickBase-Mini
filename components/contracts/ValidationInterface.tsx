'use client'

import { useState } from 'react'
import { useContractContext } from './ContractProvider'
import { QrCode, CheckCircle, XCircle, AlertTriangle, Search } from 'lucide-react'

interface ValidationInterfaceProps {
  onTicketValidated?: (tokenId: number, isValid: boolean) => void
}

export function ValidationInterface({ onTicketValidated }: ValidationInterfaceProps) {
  const { validateTicket, isLoading, error } = useContractContext()
  
  const [tokenId, setTokenId] = useState('')
  const [validationCode, setValidationCode] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<{
    tokenId: number
    isValid: boolean
    message: string
  } | null>(null)
  
  const handleValidate = async () => {
    if (!tokenId || !validationCode) return
    
    setIsValidating(true)
    setValidationResult(null)
    
    try {
      const tx = await validateTicket(parseInt(tokenId), validationCode)
      console.log('✅ Ticket validated successfully:', tx)
      
      // Simular resultado de validación
      const result = {
        tokenId: parseInt(tokenId),
        isValid: true, // En producción esto vendría del contrato
        message: 'Ticket is valid and has been marked as used'
      }
      
      setValidationResult(result)
      
      // Callback
      if (onTicketValidated) {
        onTicketValidated(parseInt(tokenId), result.isValid)
      }
      
    } catch (err) {
      console.error('❌ Error validating ticket:', err)
      
      // Simular resultado de error
      const result = {
        tokenId: parseInt(tokenId),
        isValid: false,
        message: 'Ticket validation failed'
      }
      
      setValidationResult(result)
      
      // Callback
      if (onTicketValidated) {
        onTicketValidated(parseInt(tokenId), result.isValid)
      }
    } finally {
      setIsValidating(false)
    }
  }
  
  const handleScanQR = () => {
    // Simular escaneo de QR
    const mockTokenId = Math.floor(Math.random() * 1000) + 1
    const mockValidationCode = `VALID_${Date.now()}`
    
    setTokenId(mockTokenId.toString())
    setValidationCode(mockValidationCode)
  }
  
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Validation Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Validate Ticket</h2>
          <p className="text-gray-600">Enter ticket details to validate and mark as used</p>
        </div>
        
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-red-600 mr-2">⚠️</div>
              <div>
                <h3 className="text-red-800 font-medium">Error</h3>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          {/* Token ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Token ID
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter token ID"
              />
              <button
                onClick={handleScanQR}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center"
              >
                <QrCode className="w-4 h-4 mr-1" />
                Scan QR
              </button>
            </div>
          </div>
          
          {/* Validation Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Validation Code
            </label>
            <input
              type="text"
              value={validationCode}
              onChange={(e) => setValidationCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter validation code"
            />
          </div>
          
          {/* Validate Button */}
          <button
            onClick={handleValidate}
            disabled={!tokenId || !validationCode || isValidating || isLoading}
            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isValidating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Validating...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Validate Ticket
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Validation Result */}
      {validationResult && (
        <div className={`rounded-lg p-6 ${
          validationResult.isValid 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center mb-4">
            {validationResult.isValid ? (
              <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600 mr-2" />
            )}
            <h3 className={`text-lg font-semibold ${
              validationResult.isValid ? 'text-green-800' : 'text-red-800'
            }`}>
              {validationResult.isValid ? 'Ticket Valid' : 'Ticket Invalid'}
            </h3>
          </div>
          
          <div className="space-y-2">
            <p className={`text-sm ${
              validationResult.isValid ? 'text-green-700' : 'text-red-700'
            }`}>
              Token ID: {validationResult.tokenId}
            </p>
            <p className={`text-sm ${
              validationResult.isValid ? 'text-green-700' : 'text-red-700'
            }`}>
              {validationResult.message}
            </p>
          </div>
          
          {validationResult.isValid && (
            <div className="mt-4 p-3 bg-green-100 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm text-green-800 font-medium">
                  Ticket has been successfully validated and marked as used
                </span>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Validation Instructions</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Enter the token ID of the ticket you want to validate</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Provide the validation code from the ticket holder</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Click "Validate Ticket" to confirm and mark as used</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Once validated, the ticket cannot be used again</p>
          </div>
        </div>
      </div>
      
      {/* Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
          <div>
            <h4 className="text-yellow-800 font-medium">Important</h4>
            <p className="text-yellow-700 text-sm">
              Only authorized validators can validate tickets. Make sure you have the proper permissions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
