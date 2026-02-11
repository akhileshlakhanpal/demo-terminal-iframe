'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  FiX,
  FiPlus,
  FiChevronDown,
  FiDollarSign
} from 'react-icons/fi'
import { MdOutlineAccessAlarms, MdApps } from "react-icons/md"
import { BiUserCircle } from "react-icons/bi"
import { Bell, User, ChevronDown } from 'lucide-react'
import SymbolSearchPopup from '../panels/SymbolSearchPopup'
import AccountDropdown from '../panels/AccountDropdown'
import PriceAlertsDropdown from '../panels/PriceAlertsDropdown'
import ApplicationsDropdown from '../panels/ApplicationsDropdown'
import ProfileDropdown from '../panels/ProfileDropdown'
import DepositPopup from '../panels/DepositPopup'
import FlagIcon from '../ui/FlagIcon'
import { WebSocketStatus } from '../data-display/websocket-status'
import { Button } from '../ui/button'
import IconButton from '../ui/IconButton'
import { useAuth } from '../../context/AuthContext'
import { usePrivacy } from '../../context/PrivacyContext'
import { useAccount } from '../../context/AccountContext'
import { formatCurrency, cn } from '../../lib/utils'
import { useInstruments } from '../../context/InstrumentContext'
import { useTrading } from '../../context/TradingContext'
import { apiClient } from '../../lib/api'

// InstrumentTab Component
interface Tab {
  id: string;
  symbol: string;
  flagType: string;
  isActive: boolean;
}

interface InstrumentTabProps {
  tab: Tab;
  isActive: boolean;
  onClick: (id: string) => void;
  onClose: (id: string) => void;
}

const InstrumentTab = ({ tab, isActive, onClick, onClose }: InstrumentTabProps) => {
  const tabClasses = `
    relative flex text-gray-400 font-semibold items-center h-10 px-3 cursor-pointer group hover:border-b-2 hover:border-white 
    ${isActive ? 'border-b-2 border-white text-white' : ''}
  `

  return (
    <div
      className={tabClasses}
      onClick={() => onClick(tab.id)}
      data-test={`instrument-tab-${tab.symbol}`}
    >
      {/* Close button in upper right corner */}
      <button
        className="cursor-pointer absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded text-yellow-400 hover:border hover:border-yellow-400 hover:bg-gray-800 z-1"
        data-test="instrument-tab-close"
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onClose(tab.id)
        }}
      >
        <FiX size={14} className="stroke-current fill-none" />
      </button>

      {/* Tab content */}
      <div className="flex items-center justify-center gap-1.5 h-full">
        <div className="w-5 h-5">
          <FlagIcon symbol={tab.symbol} type={tab.flagType} />
        </div>
        <div className="text-sm font-medium" data-test="instrument-tab-symbol">
          {tab.symbol}
        </div>
      </div>
    </div>
  )
}

import { useSidebar } from '../../context/SidebarContext'

interface NavbarProps {
  logoLarge: string;
  logoSmall: string;
}

export default function Navbar({ logoLarge, logoSmall }: NavbarProps) {
  const { isSidebarExpanded } = useSidebar();
  const { hideBalance } = usePrivacy();
  const { user } = useAuth();
  const {
    currentAccountId,
    mt5Accounts,
    balances,
    isBalanceLoading,
    currentBalance
  } = useAccount();

  const { instruments } = useInstruments();

  // Start with empty tabs, will be initialized by useEffect
  const [tabs, setTabs] = useState<Tab[]>([]);

  const [currentData, setCurrentData] = useState<any>(null);

  // Direct fetch for selected account
  const balance = currentBalance?.balance ?? 10000;
  const equity = currentBalance?.equity ?? 10000;
  const [positionsConnected] = useState(true) // TODO: Connect to actual WebSocket status

  const [isSymbolSearchOpen, setIsSymbolSearchOpen] = useState(false)
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false)
  const [isPriceAlertsOpen, setIsPriceAlertsOpen] = useState(false)
  const [isAppsDropdownOpen, setIsAppsDropdownOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [isDepositPopupOpen, setIsDepositPopupOpen] = useState(false)
  const addTabButtonRef = useRef<HTMLButtonElement>(null)

  const { symbol, setSymbol, setAddNavbarTab } = useTrading();

  // Sync active tab with current symbol from TradingContext
  useEffect(() => {
    if (tabs.length > 0 && symbol) {
      // Find tab that matches the current symbol
      const matchingTab = tabs.find(tab =>
        tab.symbol.toUpperCase() === symbol.toUpperCase()
      );

      if (matchingTab && !matchingTab.isActive) {
        // Update tabs to make the matching tab active
        setTabs(prevTabs =>
          prevTabs.map(tab => ({
            ...tab,
            isActive: tab.symbol.toUpperCase() === symbol.toUpperCase()
          }))
        );
      }
    }
  }, [symbol, tabs.length]); // Only re-run when symbol changes or tabs are initialized

  const handleTabClick = (tabId: string) => {
    const clickedTab = tabs.find(tab => tab.id === tabId);
    if (clickedTab) {
      // Update Order Panel with the clicked symbol
      setSymbol(clickedTab.symbol);
    }

    setTabs(prevTabs =>
      prevTabs.map(tab => ({
        ...tab,
        isActive: tab.id === tabId
      }))
    )
  }

  const handleCloseTab = (tabId: string) => {
    const tabIndex = tabs.findIndex(tab => tab.id === tabId)
    const isActiveTab = tabs[tabIndex]?.isActive

    const newTabs = tabs.filter(tab => tab.id !== tabId)

    // If we closed the active tab, make the first remaining tab active
    if (isActiveTab && newTabs.length > 0) {
      newTabs[0].isActive = true
    }

    setTabs(newTabs)
  }

  const handleAddTab = () => {
    setIsSymbolSearchOpen(true)
  }

  const handleSelectSymbol = useCallback((symbolData: { symbol: string }) => {
    // Normalize symbol for comparison (trim and uppercase)
    const normalizedSymbol = symbolData.symbol.trim().toUpperCase();


    const existingTab = tabs.find(tab => tab.symbol.trim().toUpperCase() === normalizedSymbol)

    if (existingTab) {
      // Tab already exists, just make it active
      handleTabClick(existingTab.id)
      return
    }

    // Create new tab only if it doesn't exist
    const newId = Date.now().toString()
    const newTab: Tab = {
      id: newId,
      symbol: symbolData.symbol,
      flagType: symbolData.symbol, // Use symbol as flagType for new logic
      isActive: true
    }

    // Update Order Panel with the new symbol
    setSymbol(symbolData.symbol);

    setTabs(prevTabs =>
      prevTabs.map(tab => ({ ...tab, isActive: false })).concat([newTab])
    )
  }, [tabs, setSymbol]);

  // Register handleSelectSymbol with TradingContext - use ref to avoid infinite loop
  const handleSelectSymbolRef = useRef(handleSelectSymbol);

  useEffect(() => {
    handleSelectSymbolRef.current = handleSelectSymbol;
  }, [handleSelectSymbol]);

  useEffect(() => {
    setAddNavbarTab(() => (symbol: string) => {
      handleSelectSymbolRef.current({ symbol });
    });
  }, []); // Empty deps - only run once

  return (
    <nav className="bg-background flex-shrink-0 border-t border-x border-gray-800">
      <div className="flex items-center h-14 px-2">
        {/* Logo */}
        <div className="px-2 flex-shrink-0">
          <div className='flex items-center'>
            <div className="text-yellow-300 font-semi-bold">
              <img
                src={isSidebarExpanded ? logoLarge : logoSmall}
                className='h-8'
                alt="Zuperior Navbar"
              />
            </div>
          </div>
        </div>

        {/* Instrument Tabs */}
        <div className="flex-1 ml-1 min-w-0 overflow-x-auto navbar-scrollbar">
          <div className="flex items-center min-w-max">
            <div className="flex items-center ">
              <div className="flex gap-0">
                {tabs.map((tab) => (
                  <InstrumentTab
                    key={tab.id}
                    tab={tab}
                    isActive={tab.isActive}
                    onClick={handleTabClick}
                    onClose={handleCloseTab}
                  />
                ))}
              </div>

              {/* Add Tab Button */}
              <div className="flex items-center h-full relative">
                <button
                  ref={addTabButtonRef}
                  className="cursor-pointer px-2 py-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors mx-1 flex items-center justify-center h-8 border border-transparent hover:border-gray-400 "
                  data-test="add-tab-button"
                  type="button"
                  onClick={handleAddTab}
                >
                  <FiPlus size={18} className="stroke-current fill-white text-white cursor-pointer" />
                </button>

                {/* Symbol Search Popup */}
                <SymbolSearchPopup
                  isOpen={isSymbolSearchOpen}
                  onClose={() => setIsSymbolSearchOpen(false)}
                  onSelectSymbol={handleSelectSymbol}
                  triggerRef={addTabButtonRef}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Demo Mode: Limited Actions */}
        <div className="flex items-center gap-1.5 pr-2 flex-shrink-0">
          {/* WebSocket Status (Live indicator) */}
          <WebSocketStatus showDetails={false} positionsConnected={positionsConnected} />

          {/* Account Indicator (Non-clickable in Demo) */}
          <div className="relative">
            <div className="flex items-center gap-1.5 px-2 py-1">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-white/60">
                    <span className="px-1 py-0.5 rounded text-[10px] font-medium bg-info/20 text-info">
                      Demo
                    </span>
                    &nbsp;
                    <span className="text-[11px]">Demo User</span>
                  </span>
                </div>
                <span className="text-xs font-semibold text-success leading-tight">
                  {hideBalance ? "......" : `${formatCurrency(balance, 2)} USD`}
                </span>
              </div>
            </div>
          </div>

          {/* User Placeholder (Non-clickable in Demo) */}
          <div className="relative">
            <div className="p-1.5 text-gray-400">
              <User className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
