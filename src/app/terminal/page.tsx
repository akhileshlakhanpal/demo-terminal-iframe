'use client';

import TradingTerminal from '../../components/trading/TradingTerminal';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/ui/loading-wave';

export default function TerminalPage() {
  return <TradingTerminal />;
}
