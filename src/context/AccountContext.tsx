"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { apiClient } from '@/lib/api'
import { useAuth } from './AuthContext'
import { useMultiAccountBalancePolling } from '@/hooks/useAccountBalances'

export interface MT5Account {
  id: string
  accountId: string
  displayAccountId: string
  accountType: 'Live' | 'Demo'
  group: string
  linkedAt: string
}

interface AccountContextType {
  mt5Accounts: MT5Account[]
  currentAccountId: string | null
  setCurrentAccountId: (accountId: string | null) => void
  defaultAccountId: string | null
  isLoading: boolean
  isAccountSwitching: boolean
  error: string | null
  refreshAccounts: () => Promise<void>
  balances: Record<string, any>
  isBalanceLoading: Record<string, boolean>
  balanceErrors: Record<string, string | null>
  currentBalance: any | null
  currentAccount: MT5Account | null
  refreshBalance: (accountId: string) => void
  metaApiTokens: Record<string, string> // accountId -> accessToken
  getMetaApiToken: (accountId: string) => Promise<string | null>
}

const AccountContext = createContext<AccountContextType | undefined>(undefined)

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth()

  const [mt5Accounts, setMt5Accounts] = useState<MT5Account[]>([])
  const [currentAccountId, setCurrentAccountIdState] = useState<string | null>(null)
  const [defaultAccountId, setDefaultAccountId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAccountSwitching, setIsAccountSwitching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [metaApiTokens, setMetaApiTokens] = useState<Record<string, string>>({})

  // Get account IDs for balance polling
  const accountIds = useMemo(() => mt5Accounts.map(account => account.accountId), [mt5Accounts])
  // Load current account from localStorage or URL params on mount
  useEffect(() => {
    // Demo Mode: Force demo account with 'pro' group to fetch all instruments
    const demoAccountId = 'demo-10001';
    setCurrentAccountIdState(demoAccountId);
    setMt5Accounts([{
      id: 'demo-id',
      accountId: demoAccountId,
      displayAccountId: '10001',
      accountType: 'Demo',
      group: 'pro',
      linkedAt: new Date().toISOString()
    }]);
    setIsLoading(false);
  }, [])

  // Current balance data for easy access (Demo Mode: Static Balance)
  const balances = useMemo(() => ({
    'demo-10001': {
      balance: 10000,
      equity: 10000,
      margin: 0,
      freeMargin: 10000,
      marginLevel: 0,
      currency: 'USD',
      leverage: '1:400'
    }
  }), []);

  const isBalanceLoading = useMemo(() => ({ 'demo-10001': false }), []);
  const balanceErrors = useMemo(() => ({ 'demo-10001': null }), []);

  const currentBalance = useMemo(() => balances['demo-10001'], [balances]);
  const currentAccount = useMemo(() => mt5Accounts[0] || null, [mt5Accounts]);

  const fetchAccounts = useCallback(async () => {
    // No-op for demo
  }, []);

  const refreshAccounts = useCallback(async () => {
    // No-op for demo
  }, []);

  const getMetaApiToken = useCallback(async (accountId: string): Promise<string | null> => {
    // For demo, we might still need a valid token to fetch real-time data if context requires it,
    // but usually, the socket feed is separate. Let's return a dummy or handle in socket.
    return 'demo-token';
  }, []);

  const setCurrentAccountId = useCallback((accountId: string | null) => {
    // No-op for demo
  }, []);

  const refreshBalance = useCallback((accountId: string) => {
    // No-op for demo
  }, []);

  return (
    <AccountContext.Provider
      value={{
        mt5Accounts,
        currentAccountId,
        setCurrentAccountId,
        defaultAccountId,
        isLoading,
        isAccountSwitching,
        error,
        refreshAccounts,
        balances,
        isBalanceLoading,
        balanceErrors,
        currentBalance,
        currentAccount,
        refreshBalance,
        metaApiTokens,
        getMetaApiToken,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export function useAccount() {
  const context = useContext(AccountContext)
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider')
  }
  return context
}
