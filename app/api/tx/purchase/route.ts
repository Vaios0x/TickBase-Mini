import { NextRequest, NextResponse } from 'next/server'
import { encodeFunctionData } from 'viem'
import { TICKET_ABI } from '@/lib/abi'
import { parseEther } from 'viem'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const eventId = searchParams.get('eventId')
  const quantity = parseInt(searchParams.get('quantity') || '1')

  if (!eventId) {
    return new NextResponse('Event ID is required', { status: 400 })
  }

  // Obtener precio del evento (esto debería venir de una base de datos o API)
  const eventPrice = '0.05' // Precio por defecto, debería ser dinámico
  const totalPrice = (parseFloat(eventPrice) * quantity).toString()

  const transactionData = {
    to: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    value: parseEther(totalPrice),
    data: encodeFunctionData({
      abi: TICKET_ABI,
      functionName: 'mintTickets',
      args: [BigInt(eventId), BigInt(quantity)]
    })
  }

  return NextResponse.json({
    chainId: `eip155:${process.env.NEXT_PUBLIC_CHAIN_ID}`,
    method: 'eth_sendTransaction',
    params: {
      abi: TICKET_ABI,
      to: transactionData.to,
      value: transactionData.value.toString(),
      data: transactionData.data,
    }
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { eventId, quantity = 1, price } = body

    if (!eventId) {
      return new NextResponse('Event ID is required', { status: 400 })
    }

    const totalPrice = price ? (parseFloat(price) * quantity).toString() : '0.05'
    
    const transactionData = {
      to: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      value: parseEther(totalPrice),
      data: encodeFunctionData({
        abi: TICKET_ABI,
        functionName: 'mintTickets',
        args: [BigInt(eventId), BigInt(quantity)]
      })
    }

    return NextResponse.json({
      success: true,
      transaction: transactionData,
      message: `Compra de ${quantity} ticket${quantity > 1 ? 's' : ''} para el evento ${eventId}`
    })

  } catch (error) {
    console.error('Purchase transaction error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
