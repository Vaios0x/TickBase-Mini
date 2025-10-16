'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign, Lock, Zap, BarChart3, Coins, ArrowUpRight } from 'lucide-react'

interface StakingPool {
  id: number
  name: string
  apy: number
  tvl: string
  token: string
  lockPeriod: string
  minStake: string
  color: string
}

interface LiquidityPool {
  id: number
  pair: string
  apy: number
  volume24h: string
  fees24h: string
  color: string
}

export function DeFiFeatures() {
  const [activeTab, setActiveTab] = useState<'staking' | 'liquidity' | 'flashloans'>('staking')
  const [stakingPools, setStakingPools] = useState<StakingPool[]>([])
  const [liquidityPools, setLiquidityPools] = useState<LiquidityPool[]>([])
  const [userBalance, setUserBalance] = useState('0.0')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    loadStakingPools()
    loadLiquidityPools()
    // Simular conexión de wallet
    setIsConnected(true)
    setUserBalance('2.5')
  }, [])

  const loadStakingPools = async () => {
    const pools: StakingPool[] = [
      {
        id: 1,
        name: "Base ETH Staking",
        apy: 8.5,
        tvl: "1.2M",
        token: "ETH",
        lockPeriod: "30 days",
        minStake: "0.1",
        color: "from-blue-500 to-cyan-500"
      },
      {
        id: 2,
        name: "USDC Yield Pool",
        apy: 12.3,
        tvl: "850K",
        token: "USDC",
        lockPeriod: "7 days",
        minStake: "100",
        color: "from-green-500 to-emerald-500"
      },
      {
        id: 3,
        name: "TICKET Token Pool",
        apy: 25.7,
        tvl: "320K",
        token: "TICKET",
        lockPeriod: "14 days",
        minStake: "1000",
        color: "from-purple-500 to-pink-500"
      }
    ]
    setStakingPools(pools)
  }

  const loadLiquidityPools = async () => {
    const pools: LiquidityPool[] = [
      {
        id: 1,
        pair: "ETH/USDC",
        apy: 18.5,
        volume24h: "2.1M",
        fees24h: "1,250",
        color: "from-blue-500 to-cyan-500"
      },
      {
        id: 2,
        pair: "TICKET/ETH",
        apy: 32.1,
        volume24h: "850K",
        fees24h: "425",
        color: "from-purple-500 to-pink-500"
      },
      {
        id: 3,
        pair: "USDC/USDT",
        apy: 5.2,
        volume24h: "1.5M",
        fees24h: "750",
        color: "from-green-500 to-emerald-500"
      }
    ]
    setLiquidityPools(pools)
  }

  const tabs = [
    { id: 'staking', label: 'Staking', icon: Lock },
    { id: 'liquidity', label: 'Liquidity', icon: BarChart3 },
    { id: 'flashloans', label: 'Flash Loans', icon: Zap }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
          <Coins className="w-8 h-8 text-yellow-400" />
          DeFi Features
        </h2>
        <p className="text-white/70">
          Gana rendimientos con tus activos en Base
        </p>
      </div>

      {/* Wallet Status */}
      <div className="neural-glass-card rounded-xl p-6 border border-green-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Wallet Conectado</h3>
            <p className="text-white/70">Balance: {userBalance} ETH</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">+12.5%</div>
            <div className="text-sm text-white/70">APY Total</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
        <div className="flex neural-glass-card rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Staking Tab */}
      {activeTab === 'staking' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Staking Pools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stakingPools.map((pool) => (
              <div key={pool.id} className="neural-glass-card rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${pool.color} flex items-center justify-center text-white font-bold`}>
                      {pool.token.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{pool.name}</h4>
                      <p className="text-white/70 text-sm">TVL: {pool.tvl}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">{pool.apy}%</div>
                    <div className="text-sm text-white/70">APY</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Lock Period:</span>
                    <span className="text-white">{pool.lockPeriod}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Min Stake:</span>
                    <span className="text-white">{pool.minStake} {pool.token}</span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all">
                    Stake Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Liquidity Tab */}
      {activeTab === 'liquidity' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Liquidity Pools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liquidityPools.map((pool) => (
              <div key={pool.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{pool.pair}</h4>
                    <p className="text-white/70 text-sm">Volume 24h: {pool.volume24h}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">{pool.apy}%</div>
                    <div className="text-sm text-white/70">APY</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Fees 24h:</span>
                    <span className="text-white">${pool.fees24h}</span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all">
                    Add Liquidity
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Flash Loans Tab */}
      {activeTab === 'flashloans' && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Flash Loans</h3>
            <p className="text-white/70 mb-6">
              Obtén liquidez instantánea sin colateral
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-purple-400" />
              <h4 className="text-lg font-semibold text-white">Flash Loan Calculator</h4>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Amount to Borrow</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0.0"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70">
                    ETH
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-white/70 text-sm">Fee</div>
                  <div className="text-white font-semibold">0.05%</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-white/70 text-sm">Max Amount</div>
                  <div className="text-white font-semibold">100 ETH</div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                Execute Flash Loan
              </button>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Recent Flash Loans</h4>
            <div className="space-y-3">
              {[
                { amount: "5.2 ETH", fee: "0.0026 ETH", time: "2 min ago", status: "success" },
                { amount: "12.8 ETH", fee: "0.0064 ETH", time: "15 min ago", status: "success" },
                { amount: "3.1 ETH", fee: "0.0015 ETH", time: "1 hour ago", status: "success" }
              ].map((loan, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div>
                      <div className="text-white font-medium">{loan.amount}</div>
                      <div className="text-white/70 text-sm">{loan.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">{loan.fee}</div>
                    <div className="text-green-400 text-sm">Success</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}