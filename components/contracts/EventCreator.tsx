'use client'

import { useState } from 'react'
import { useContractContext } from './ContractProvider'
import { formatDate, generateEventMetadata } from '@/lib/contract-utils'
import { Calendar, MapPin, DollarSign, Users, Image, FileText } from 'lucide-react'

interface EventCreatorProps {
  onEventCreated?: (eventId: number) => void
}

export function EventCreator({ onEventCreated }: EventCreatorProps) {
  const { createEvent, isLoading, error } = useContractContext()
  
  const [formData, setFormData] = useState({
    name: '',
    venue: '',
    date: '',
    price: '',
    maxSupply: '',
    description: '',
    image: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.venue || !formData.date || !formData.price || !formData.maxSupply) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Generar metadata URI
      const metadata = generateEventMetadata({
        name: formData.name,
        venue: formData.venue,
        date: formData.date,
        description: formData.description,
        image: formData.image
      })
      
      // Crear evento
      const tx = await createEvent({
        name: formData.name,
        venue: formData.venue,
        date: formData.date,
        price: formData.price,
        maxSupply: parseInt(formData.maxSupply),
        metadataURI: `data:application/json;base64,${btoa(metadata)}`
      })
      
      console.log('✅ Event created successfully:', tx)
      
      // Limpiar formulario
      setFormData({
        name: '',
        venue: '',
        date: '',
        price: '',
        maxSupply: '',
        description: '',
        image: ''
      })
      
      // Callback
      if (onEventCreated) {
        onEventCreated(1) // TODO: Obtener ID real del evento
      }
      
    } catch (err) {
      console.error('❌ Error creating event:', err)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Event</h2>
        <p className="text-gray-600">Fill in the details to create your event and start selling tickets</p>
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
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="inline w-4 h-4 mr-1" />
            Event Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter event name"
            required
          />
        </div>
        
        {/* Venue */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Venue *
          </label>
          <input
            type="text"
            value={formData.venue}
            onChange={(e) => handleInputChange('venue', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter venue name"
            required
          />
        </div>
        
        {/* Date and Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline w-4 h-4 mr-1" />
            Date & Time *
          </label>
          <input
            type="datetime-local"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        {/* Price and Supply */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="inline w-4 h-4 mr-1" />
              Price (ETH) *
            </label>
            <input
              type="number"
              step="0.001"
              min="0"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.05"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline w-4 h-4 mr-1" />
              Max Supply *
            </label>
            <input
              type="number"
              min="1"
              value={formData.maxSupply}
              onChange={(e) => handleInputChange('maxSupply', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="100"
              required
            />
          </div>
        </div>
        
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter event description"
          />
        </div>
        
        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Image className="inline w-4 h-4 mr-1" />
            Image URL
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => handleInputChange('image', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Event...
              </>
            ) : (
              'Create Event'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
