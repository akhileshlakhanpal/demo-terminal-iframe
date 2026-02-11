'use client';

import { useRef, useEffect, useState, useCallback } from 'react'
import { ChevronLeft } from 'lucide-react'
import LeftSidebar from '@/components/layout/LeftSidebar'
import ChartSection from '@/components/layout/ChartSection'
import OrderPanel from '@/components/trading/OrderPanel'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import StatusBar from '@/components/layout/StatusBar'

import { useSidebar } from '@/context/SidebarContext'
import { useTrading } from '@/context/TradingContext'
import { useInstruments } from '@/context/InstrumentContext'

import { ImperativePanelHandle } from 'react-resizable-panels'

import ModifyPositionModal from '@/components/modals/ModifyPositionModal'
import OrderPlacedToast from '@/components/ui/OrderPlacedToast'
import ReactDOM from 'react-dom'

export default function TradingTerminal() {
  const { isSidebarExpanded, setIsSidebarExpanded } = useSidebar();
  const { symbol } = useTrading();
  const { instruments } = useInstruments();
  const [marketClosedToast, setMarketClosedToast] = useState<string | null>(null);
  const leftPanelRef = useRef<ImperativePanelHandle>(null)
  const [orderToast, setOrderToast] = useState<any>(null)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true)

  // Read-only demo: Close-all is disabled, but we keep the prop for StatusBar API.
  const handleCloseAll = useCallback((_option: string) => {
    // no-op in demo mode
  }, []);

  // Memoize toast close handlers to prevent timer resets
  const handleOrderToastClose = useCallback(() => {
    setOrderToast(null);
  }, []);

  // Read-only demo: no positions or history
  const openPositions: any[] = [];

  // Order placement handlers
  const handleBuyOrder = async (orderData: any) => {
    setOrderToast({
      side: 'buy',
      symbol: symbol || 'BTCUSD',
      volume: orderData.volume || 0,
      price: null,
      orderType: orderData.orderType || 'market',
      profit: null,
      error: 'Trading is disabled in Demo Mode.',
    });
  };

  const handleSellOrder = async (orderData: any) => {
    setOrderToast({
      side: 'sell',
      symbol: symbol || 'BTCUSD',
      volume: orderData.volume || 0,
      price: null,
      orderType: orderData.orderType || 'market',
      profit: null,
      error: 'Trading is disabled in Demo Mode.',
    });
  };

  // Demo mode: position modification is fully disabled; chart brackets are visual-only

  // Resize the left panel when it expands or collapses
  useEffect(() => {
    if (leftPanelRef.current) {
      if (isSidebarExpanded) {
        leftPanelRef.current.resize(23) // 15% ≈ 290px on 1920px screen
      } else {
        leftPanelRef.current.resize(0)
      }
    }
  }, [isSidebarExpanded])

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden min-h-0">
        {/* Left sidebar with panels */}
        <ResizablePanel
          ref={leftPanelRef}
          defaultSize={20}
          minSize={8}
          maxSize={40}
          className={`min-h-0 h-full ${!isSidebarExpanded ? "!min-w-[48px] !max-w-[48px] !flex-none" : ""}`}
          collapsedSize={0}
          collapsible={true}
          onCollapse={() => setIsSidebarExpanded(false)}
          onExpand={() => setIsSidebarExpanded(true)}
        >
          <LeftSidebar
            onPanelStateChange={setIsSidebarExpanded}
            isExpanded={isSidebarExpanded}
          />
        </ResizablePanel>

        {/* Horizontal resize handle */}
        <ResizableHandle withHandle={false} disabled={!isSidebarExpanded} className={!isSidebarExpanded ? "pointer-events-none w-0" : ""} />

        {/* Main content area with status bar */}
        <ResizablePanel defaultSize={80} className="flex flex-col h-full gap-1">
          {/* Top content area */}
          <div className="relative flex flex-1 overflow-hidden gap-1">
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
              {/* Chart section - Demo Mode: Full Height */}
              <div className="flex-1 min-h-0 overflow-hidden">
                <ChartSection />
              </div>
            </div>

            {/* Order Panel */}
            {isRightSidebarOpen && (
              <div className="w-[280px] border-l border-[#2a2f36] bg-background flex-shrink-0">
                <OrderPanel
                  onClose={() => setIsRightSidebarOpen(false)}
                  onBuy={handleBuyOrder}
                  onSell={handleSellOrder}
                />
              </div>
            )}

            {/* Floating Open Button */}
            {!isRightSidebarOpen && (
              <button
                onClick={() => setIsRightSidebarOpen(true)}
                className="absolute right-0 top-2 z-50 bg-background border border-[#2a2f36] border-r-0 text-gray-400 hover:text-white transition-colors p-1.5 rounded-l-md shadow-lg cursor-pointer"
                title="Open Order Panel"
              >
                <ChevronLeft size={20} />
              </button>
            )}
          </div>

          {/* Status bar only for center and right areas */}
          <StatusBar
            openPositions={openPositions}
            onCloseAll={handleCloseAll}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
      <ModifyPositionModal />
      <OrderPlacedToast
        order={orderToast}
        onClose={handleOrderToastClose}
      />
      {marketClosedToast && ReactDOM.createPortal(
        <div className="fixed bottom-4 left-4 z-[99999] bg-[#0b0e14] text-[#d1d5db] rounded-md shadow-lg border border-amber-500/60 w-[320px] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="p-4 relative">
            <button
              onClick={() => setMarketClosedToast(null)}
              className="absolute top-2 right-2 text-[#9ca3af] hover:text-white transition-colors"
            >
              ×
            </button>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-amber-400">⚠</div>
              <div className="flex-1">
                <h3 className="text-white font-medium text-[14px] leading-tight mb-1">Market closed</h3>
                <p className="text-[13px] text-[#d1d5db]">{marketClosedToast}</p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
