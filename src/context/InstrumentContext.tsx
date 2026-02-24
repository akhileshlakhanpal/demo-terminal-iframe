
"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { apiClient } from '@/lib/api'
import { useAccount } from './AccountContext'

export interface Instrument {
    id: string
    symbol: string
    name: string
    description: string
    category: string
    group: string
    digits?: number
    bid?: string
    ask?: string
    change?: string
    favorite?: boolean
}

interface InstrumentContextType {
    instruments: Instrument[]
    isLoading: boolean
    error: string | null
    categories: string[]
    refreshInstruments: () => Promise<void>
    getInstrumentsByCategory: (category: string) => Instrument[]
    toggleFavorite: (instrumentId: string) => Promise<void>
    reorderInstruments: (newOrder: Instrument[]) => Promise<void>
}

const InstrumentContext = createContext<InstrumentContextType | undefined>(undefined)

export function InstrumentProvider({ children }: { children: React.ReactNode }) {
    const { currentAccount, currentAccountId } = useAccount()
    const [instruments, setInstruments] = useState<Instrument[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const accountGroup = currentAccount?.group

    const getFavoritesKey = useCallback((accountId: string) => {
        return `zup-favorites-${accountId}`
    }, [])

    const fetchInstruments = useCallback(async (groupName: string, accountId?: string) => {
        if (!groupName) {
            setInstruments([])
            return
        }

        const cacheKey = `zup-instruments-${groupName}-${accountId || 'global'}`
        const cached = localStorage.getItem(cacheKey)

        let initialData: Instrument[] = []
        if (cached) {
            try {
                const { data } = JSON.parse(cached)
                initialData = data
            } catch (e) { }
        }

        // Apply local favorites override immediately if we have data
        if (initialData.length > 0 && accountId) {
            const favKey = getFavoritesKey(accountId)
            const rawFavs = localStorage.getItem(favKey)
            const favSet = rawFavs ? new Set(JSON.parse(rawFavs)) : new Set()

            initialData = initialData.map(inst => ({
                ...inst,
                favorite: favSet.has(inst.id)
            }))
        }

        // Initial render with cached data (and merged favorites)
        if (initialData.length > 0) {
            setInstruments(initialData)
            // If we have cached data, don't set loading state to avoid blocking UI
            // We still fetch in background
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }
        setError(null)

        try {
            const endpoint = `/api/instruments?group=${encodeURIComponent(groupName)}${accountId ? `&accountId=${accountId}` : ''}`
            const response = await apiClient.get<Instrument[]>(endpoint)

            if (response.success && response.data && response.data.length > 0) {
                let freshData = response.data

                // Merge Client-Side Favorites
                if (accountId) {
                    const favKey = getFavoritesKey(accountId)
                    const rawFavs = localStorage.getItem(favKey)
                    const favSet = rawFavs ? new Set(JSON.parse(rawFavs)) : new Set()

                    freshData = freshData.map(inst => ({
                        ...inst,
                        favorite: favSet.has(inst.id)
                    }))
                }

                setInstruments(freshData)
                localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: freshData }))
            } else {
                // Demo Mode: Use fallback symbols if API fails
                const fallbackInstruments: Instrument[] = [
                    { id: 'xagusd', symbol: 'XAGUSD', name: 'XAGUSD', description: 'Silver vs US-Dollar', category: 'Metals', group: 'pro', digits: 3 },
                    { id: 'xauusd', symbol: 'XAUUSD', name: 'XAUUSD', description: 'Gold vs US-Dollar', category: 'Metals', group: 'pro', digits: 2 },
                    { id: 'audusd', symbol: 'AUDUSD', name: 'AUDUSD', description: 'Australian Dollar vs US Dollar', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'eurusd', symbol: 'EURUSD', name: 'EURUSD', description: 'Euro vs US Dollar', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'gbpusd', symbol: 'GBPUSD', name: 'GBPUSD', description: 'Great Britain Pound vs US Dollar', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'nzdusd', symbol: 'NZDUSD', name: 'NZDUSD', description: 'New Zealand Dollar vs US Dollar', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'usdcad', symbol: 'USDCAD', name: 'USDCAD', description: 'US Dollar vs Canadian Dollar', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'usdchf', symbol: 'USDCHF', name: 'USDCHF', description: 'US Dollar vs Swiss Franc', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'usdjpy', symbol: 'USDJPY', name: 'USDJPY', description: 'US Dollar vs Japanese Yen', category: 'Forex', group: 'pro', digits: 3 },
                    { id: 'audcad', symbol: 'AUDCAD', name: 'AUDCAD', description: 'Australian Dollar vs Canadian Dollar', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'audchf', symbol: 'AUDCHF', name: 'AUDCHF', description: 'Australian Dollar vs Swiss Franc', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'audjpy', symbol: 'AUDJPY', name: 'AUDJPY', description: 'Australian Dollar vs Japanese Yen', category: 'Forex', group: 'pro', digits: 3 },
                    { id: 'audnzd', symbol: 'AUDNZD', name: 'AUDNZD', description: 'Australian Dollar vs New Zealand Dollar', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'cadchf', symbol: 'CADCHF', name: 'CADCHF', description: 'Canadian Dollar vs Swiss Franc', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'cadjpy', symbol: 'CADJPY', name: 'CADJPY', description: 'Canadian Dollar vs Japanese Yen', category: 'Forex', group: 'pro', digits: 3 },
                    { id: 'chfjpy', symbol: 'CHFJPY', name: 'CHFJPY', description: 'Swiss Frank vs Japanese Yen', category: 'Forex', group: 'pro', digits: 3 },
                    { id: 'euraud', symbol: 'EURAUD', name: 'EURAUD', description: 'Euro vs Australian Dollar', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'eurcad', symbol: 'EURCAD', name: 'EURCAD', description: 'Euro vs Canadian Dollar', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'eurchf', symbol: 'EURCHF', name: 'EURCHF', description: 'Euro vs Swiss Franc', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'eurgbp', symbol: 'EURGBP', name: 'EURGBP', description: 'Euro vs Great Britain Pound ', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'eurjpy', symbol: 'EURJPY', name: 'EURJPY', description: 'Euro vs Japanese Yen', category: 'Forex', group: 'pro', digits: 3 },
                    { id: 'eurnzd', symbol: 'EURNZD', name: 'EURNZD', description: 'Euro vs New Zealand Dollar', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'gbpaud', symbol: 'GBPAUD', name: 'GBPAUD', description: 'Great Britain Pound vs Australian Dollar', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'gbpcad', symbol: 'GBPCAD', name: 'GBPCAD', description: 'Great Britain Pound vs Canadian Dollar', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'gbpchf', symbol: 'GBPCHF', name: 'GBPCHF', description: 'Great Britain Pound vs Swiss Franc', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'gbpjpy', symbol: 'GBPJPY', name: 'GBPJPY', description: 'Great Britain Pound vs Japanese Yen', category: 'Forex', group: 'pro', digits: 3 },
                    { id: 'gbpnzd', symbol: 'GBPNZD', name: 'GBPNZD', description: 'Great Britan Pound vs New Zealand Dollar', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'nzdcad', symbol: 'NZDCAD', name: 'NZDCAD', description: 'New Zealand Dollar vs Canadian Dollar', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'nzdchf', symbol: 'NZDCHF', name: 'NZDCHF', description: 'New Zealand Dollar vs Swiss Franc', category: 'Forex', group: 'pro', digits: 5 },
                    { id: 'nzdjpy', symbol: 'NZDJPY', name: 'NZDJPY', description: 'New Zealand Dollar vs Japanese Yen', category: 'Forex', group: 'pro', digits: 3 },
                    { id: 'ukoil', symbol: 'UKOIL', name: 'UKOIL', description: 'Brent Crude Oil vs USD', category: 'Energies', group: 'pro', digits: 3 },
                    { id: 'usoil', symbol: 'USOIL', name: 'USOIL', description: 'Oil vs US Dollar', category: 'Energies', group: 'pro', digits: 3 },
                    { id: 'btcusd', symbol: 'BTCUSD', name: 'BTCUSD', description: 'Bitcoin vs US Dollar', category: 'Crypto', group: 'pro', digits: 2 },
                    { id: 'ethusd', symbol: 'ETHUSD', name: 'ETHUSD', description: 'Ethereum vs US Dollar', category: 'Crypto', group: 'pro', digits: 2 },
                    { id: 'aus200', symbol: 'AUS200', name: 'AUS200', description: 'S&P/ASX200', category: 'Indices', group: 'pro', digits: 2 },
                    { id: 'fr40', symbol: 'FR40', name: 'FR40', description: 'CAC40', category: 'Indices', group: 'pro', digits: 2 },
                    { id: 'hk50', symbol: 'HK50', name: 'HK50', description: 'Hong Kong 50', category: 'Indices', group: 'pro', digits: 2 },
                    { id: 'jp225', symbol: 'JP225', name: 'JP225', description: 'Nikkei Stock Average 225', category: 'Indices', group: 'pro', digits: 2 },
                    { id: 'us500', symbol: 'US500', name: 'US500', description: 'S&P 500 Index', category: 'Indices', group: 'pro', digits: 2 },
                    { id: 'uk100', symbol: 'UK100', name: 'UK100', description: 'FTSE 100', category: 'Indices', group: 'pro', digits: 2 },
                    { id: 'us30', symbol: 'US30', name: 'US30', description: 'DJIA30', category: 'Indices', group: 'pro', digits: 2 },
                    { id: 'ustec', symbol: 'USTEC', name: 'USTEC', description: 'USTEC', category: 'Indices', group: 'pro', digits: 2 },
                    { id: 'de30', symbol: 'DE30', name: 'DE30', description: 'DE30', category: 'Indices', group: 'pro', digits: 2 }
                ]
                setInstruments(fallbackInstruments)
                setError(null)
            }
        } catch (err) {
            // Demo Mode: Use fallback symbols on error
            const fallbackInstruments: Instrument[] = [
                { id: 'xagusd', symbol: 'XAGUSD', name: 'XAGUSD', description: 'Silver vs US-Dollar', category: 'Metals', group: 'pro', digits: 3 },
                { id: 'xauusd', symbol: 'XAUUSD', name: 'XAUUSD', description: 'Gold vs US-Dollar', category: 'Metals', group: 'pro', digits: 2 },
                { id: 'audusd', symbol: 'AUDUSD', name: 'AUDUSD', description: 'Australian Dollar vs US Dollar', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'eurusd', symbol: 'EURUSD', name: 'EURUSD', description: 'Euro vs US Dollar', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'gbpusd', symbol: 'GBPUSD', name: 'GBPUSD', description: 'Great Britain Pound vs US Dollar', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'nzdusd', symbol: 'NZDUSD', name: 'NZDUSD', description: 'New Zealand Dollar vs US Dollar', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'usdcad', symbol: 'USDCAD', name: 'USDCAD', description: 'US Dollar vs Canadian Dollar', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'usdchf', symbol: 'USDCHF', name: 'USDCHF', description: 'US Dollar vs Swiss Franc', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'usdjpy', symbol: 'USDJPY', name: 'USDJPY', description: 'US Dollar vs Japanese Yen', category: 'Forex', group: 'pro', digits: 3 },
                { id: 'audcad', symbol: 'AUDCAD', name: 'AUDCAD', description: 'Australian Dollar vs Canadian Dollar', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'audchf', symbol: 'AUDCHF', name: 'AUDCHF', description: 'Australian Dollar vs Swiss Franc', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'audjpy', symbol: 'AUDJPY', name: 'AUDJPY', description: 'Australian Dollar vs Japanese Yen', category: 'Forex', group: 'pro', digits: 3 },
                { id: 'audnzd', symbol: 'AUDNZD', name: 'AUDNZD', description: 'Australian Dollar vs New Zealand Dollar', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'cadchf', symbol: 'CADCHF', name: 'CADCHF', description: 'Canadian Dollar vs Swiss Franc', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'cadjpy', symbol: 'CADJPY', name: 'CADJPY', description: 'Canadian Dollar vs Japanese Yen', category: 'Forex', group: 'pro', digits: 3 },
                { id: 'chfjpy', symbol: 'CHFJPY', name: 'CHFJPY', description: 'Swiss Frank vs Japanese Yen', category: 'Forex', group: 'pro', digits: 3 },
                { id: 'euraud', symbol: 'EURAUD', name: 'EURAUD', description: 'Euro vs Australian Dollar', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'eurcad', symbol: 'EURCAD', name: 'EURCAD', description: 'Euro vs Canadian Dollar', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'eurchf', symbol: 'EURCHF', name: 'EURCHF', description: 'Euro vs Swiss Franc', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'eurgbp', symbol: 'EURGBP', name: 'EURGBP', description: 'Euro vs Great Britain Pound ', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'eurjpy', symbol: 'EURJPY', name: 'EURJPY', description: 'Euro vs Japanese Yen', category: 'Forex', group: 'pro', digits: 3 },
                { id: 'eurnzd', symbol: 'EURNZD', name: 'EURNZD', description: 'Euro vs New Zealand Dollar', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'gbpaud', symbol: 'GBPAUD', name: 'GBPAUD', description: 'Great Britain Pound vs Australian Dollar', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'gbpcad', symbol: 'GBPCAD', name: 'GBPCAD', description: 'Great Britain Pound vs Canadian Dollar', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'gbpchf', symbol: 'GBPCHF', name: 'GBPCHF', description: 'Great Britain Pound vs Swiss Franc', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'gbpjpy', symbol: 'GBPJPY', name: 'GBPJPY', description: 'Great Britain Pound vs Japanese Yen', category: 'Forex', group: 'pro', digits: 3 },
                { id: 'gbpnzd', symbol: 'GBPNZD', name: 'GBPNZD', description: 'Great Britan Pound vs New Zealand Dollar', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'nzdcad', symbol: 'NZDCAD', name: 'NZDCAD', description: 'New Zealand Dollar vs Canadian Dollar', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'nzdchf', symbol: 'NZDCHF', name: 'NZDCHF', description: 'New Zealand Dollar vs Swiss Franc', category: 'Forex', group: 'pro', digits: 5 },
                { id: 'nzdjpy', symbol: 'NZDJPY', name: 'NZDJPY', description: 'New Zealand Dollar vs Japanese Yen', category: 'Forex', group: 'pro', digits: 3 },
                { id: 'ukoil', symbol: 'UKOIL', name: 'UKOIL', description: 'Brent Crude Oil vs USD', category: 'Energies', group: 'pro', digits: 3 },
                { id: 'usoil', symbol: 'USOIL', name: 'USOIL', description: 'Oil vs US Dollar', category: 'Energies', group: 'pro', digits: 3 },
                { id: 'btcusd', symbol: 'BTCUSD', name: 'BTCUSD', description: 'Bitcoin vs US Dollar', category: 'Crypto', group: 'pro', digits: 2 },
                { id: 'ethusd', symbol: 'ETHUSD', name: 'ETHUSD', description: 'Ethereum vs US Dollar', category: 'Crypto', group: 'pro', digits: 2 },
                { id: 'aus200', symbol: 'AUS200', name: 'AUS200', description: 'S&P/ASX200', category: 'Indices', group: 'pro', digits: 2 },
                { id: 'fr40', symbol: 'FR40', name: 'FR40', description: 'CAC40', category: 'Indices', group: 'pro', digits: 2 },
                { id: 'hk50', symbol: 'HK50', name: 'HK50', description: 'Hong Kong 50', category: 'Indices', group: 'pro', digits: 2 },
                { id: 'jp225', symbol: 'JP225', name: 'JP225', description: 'Nikkei Stock Average 225', category: 'Indices', group: 'pro', digits: 2 },
                { id: 'us500', symbol: 'US500', name: 'US500', description: 'S&P 500 Index', category: 'Indices', group: 'pro', digits: 2 },
                { id: 'uk100', symbol: 'UK100', name: 'UK100', description: 'FTSE 100', category: 'Indices', group: 'pro', digits: 2 },
                { id: 'us30', symbol: 'US30', name: 'US30', description: 'DJIA30', category: 'Indices', group: 'pro', digits: 2 },
                { id: 'ustec', symbol: 'USTEC', name: 'USTEC', description: 'USTEC', category: 'Indices', group: 'pro', digits: 2 },
                { id: 'de30', symbol: 'DE30', name: 'DE30', description: 'DE30', category: 'Indices', group: 'pro', digits: 2 }
            ]
            setInstruments(fallbackInstruments)
            setError(null)
        } finally {
            setIsLoading(false)
        }
    }, [getFavoritesKey])

    useEffect(() => {
        if (accountGroup) {
            fetchInstruments(accountGroup, currentAccountId || undefined)
        }
    }, [accountGroup, currentAccountId, fetchInstruments])

    const categories = useMemo(() => {
        const cats = new Set(['Favorites', 'All instruments'])
        instruments.forEach(item => {
            if (item.category) cats.add(item.category)
        })
        return Array.from(cats)
    }, [instruments])

    const toggleFavorite = async (instrumentId: string) => {
        if (!currentAccountId) return

        const favKey = getFavoritesKey(currentAccountId)
        const rawFavs = localStorage.getItem(favKey)
        const favSet = rawFavs ? new Set<string>(JSON.parse(rawFavs)) : new Set<string>()

        // Toggle
        if (favSet.has(instrumentId)) {
            favSet.delete(instrumentId)
        } else {
            favSet.add(instrumentId)
        }

        // Save to Cache
        localStorage.setItem(favKey, JSON.stringify(Array.from(favSet)))

        // Update State
        setInstruments(prev => prev.map(inst =>
            inst.id === instrumentId ? { ...inst, favorite: favSet.has(instrumentId) } : inst
        ))
    }

    const reorderInstruments = async (newOrder: Instrument[]) => {
        setInstruments(newOrder)
        // Note: Reordering persistence removed as per user request to avoid DB usage.
        // If client-side reordering persistence is needed, we would implement `zup-order-<accountId>` here.
    }

    const refreshInstruments = async () => {
        if (accountGroup) {
            await fetchInstruments(accountGroup, currentAccountId || undefined)
        }
    }

    const getInstrumentsByCategory = (category: string) => {
        if (category === 'All instruments') return instruments
        if (category === 'Favorites') return instruments.filter(i => i.favorite)
        return instruments.filter(i => i.category === category)
    }

    return (
        <InstrumentContext.Provider
            value={{
                instruments,
                isLoading,
                error,
                categories,
                refreshInstruments,
                getInstrumentsByCategory,
                toggleFavorite,
                reorderInstruments
            }}
        >
            {children}
        </InstrumentContext.Provider>
    )
}

export function useInstruments() {
    const context = useContext(InstrumentContext)
    if (context === undefined) {
        throw new Error('useInstruments must be used within an InstrumentProvider')
    }
    return context
}
