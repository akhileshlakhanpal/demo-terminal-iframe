module.exports = [
"[project]/src/components/panels/WatchlistPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WatchlistPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FlagIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/FlagIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$lu$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/lu/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AccountContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AccountContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$InstrumentContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/InstrumentContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$WebSocketContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/WebSocketContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TradingContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/TradingContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
// Extract Row for performance/blink logic
const InstrumentRow = ({ item, isVisible, toggleFavorite, lastQuote, handleDragStart, handleDragEnter, handleDragEnd, idx, onSelect, addNavbarTab })=>{
    // Refs for tracking previous values to trigger blinks
    const prevBidRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(item.bid);
    const prevAskRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(item.ask);
    // Live Data or Static Fallback
    const quote = lastQuote || {};
    // Format to 6 significant digits total
    const formatPrice = (price)=>{
        if (price === undefined || price === null) return '0.00000';
        const priceNum = Number(price);
        if (isNaN(priceNum) || priceNum === 0) return '0.00000';
        // Use toPrecision(6) for exactly 6 significant digits
        return parseFloat(priceNum.toPrecision(6)).toString();
    };
    const bid = formatPrice(quote.bid ?? item.bid);
    const ask = formatPrice(quote.ask ?? item.ask);
    // Spread calculation
    const spread = quote.spread !== undefined ? quote.spread : item.spread || 0;
    // Weekend market closure (all non-crypto instruments)
    const isWeekend = [
        0,
        6
    ].includes(new Date().getUTCDay());
    const isCrypto = (item.category || '').toLowerCase().includes('crypto');
    const isMarketClosed = isWeekend && !isCrypto;
    // Calculate Day Change (as Range %)
    // "calculate how much is in +ve or -ve inpercentage based on day high/low and current"
    let dayChangeLabel = '0.00%';
    let changeColor = 'gray';
    if (quote.dayHigh && quote.dayLow && quote.bid) {
        const range = quote.dayHigh - quote.dayLow;
        if (range > 0) {
            const pct = (quote.bid - quote.dayLow) / range * 100;
            // If closer to High = Green? Closer to Low = Red?
            // Or usually change is vs Open. Since we don't have Open, I will map Range % to a visual indicator
            // But the column says "1D Change". Let's show Range % for now as requested.
            dayChangeLabel = `${pct.toFixed(2)}%`;
            changeColor = pct > 50 ? 'green' : 'red';
        }
    } else if (item.change) {
        dayChangeLabel = item.change;
        changeColor = parseFloat(item.change) >= 0 ? 'green' : 'red';
    }
    // Blink Logic
    const [bidColor, setBidColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [askColor, setAskColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (quote.bid && prevBidRef.current !== quote.bid) {
            const color = quote.bid > prevBidRef.current ? 'text-[#2ebd85]' : 'text-[#f6465d]';
            setBidColor(color);
            const timer = setTimeout(()=>setBidColor(''), 300); // Blink duration
            prevBidRef.current = quote.bid;
            return ()=>clearTimeout(timer);
        }
    }, [
        quote.bid
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (quote.ask && prevAskRef.current !== quote.ask) {
            const color = quote.ask > prevAskRef.current ? 'text-[#2ebd85]' : 'text-[#f6465d]';
            setAskColor(color);
            const timer = setTimeout(()=>setAskColor(''), 300);
            prevAskRef.current = quote.ask;
            return ()=>clearTimeout(timer);
        }
    }, [
        quote.ask
    ]);
    // Fallback static color logic
    const staticBidColor = changeColor === 'green' ? 'text-[#2ebd85]' : 'text-[#f6465d]';
    const staticAskColor = changeColor === 'green' ? 'text-[#2ebd85]' : 'text-[#f6465d]';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        draggable: true,
        onDragStart: (e)=>handleDragStart(e, idx),
        onDragEnter: (e)=>handleDragEnter(e, idx),
        onDragEnd: handleDragEnd,
        onClick: ()=>{
            onSelect(item.symbol);
            // Also add to Navbar if not already there
            if (addNavbarTab) {
                addNavbarTab(item.symbol);
            }
        },
        className: "group grid grid-cols-[30px_36px_minmax(100px,1fr)_auto_auto_auto_30px] gap-0 items-center border-b border-gray-800 hover:bg-[#1c252f] transition-colors h-[40px] cursor-pointer min-w-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center text-[#565c66] cursor-grab active:cursor-grabbing bg-[#0b0e14] group-hover:bg-[#1c252f] h-full transition-colors border-r border-gray-800",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$lu$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LuGripVertical"], {
                    size: 14
                }, void 0, false, {
                    fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center bg-[#0b0e14] group-hover:bg-[#1c252f] h-full transition-colors border-r border-gray-800 p-1.5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-6 h-6 rounded-full overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FlagIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        symbol: item.symbol
                    }, void 0, false, {
                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                        lineNumber: 114,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pl-2 flex flex-col justify-center border-r border-gray-800 bg-[#0b0e14] group-hover:bg-[#1c252f] h-full transition-colors overflow-hidden min-w-[100px] flex-shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[13px] font-bold text-gray-200 truncate",
                        children: item.symbol
                    }, void 0, false, {
                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    isVisible('description') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-gray-500 truncate",
                        children: item.description || item.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                        lineNumber: 121,
                        columnNumber: 38
                    }, ("TURBOPACK compile-time value", void 0)),
                    isMarketClosed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-1 text-amber-400",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiSlash"], {
                            size: 12
                        }, void 0, false, {
                            fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                            lineNumber: 124,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isVisible('bid') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-1 w-[90px] min-w-[90px] text-center flex items-center justify-center h-full flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-[12px] font-medium px-1.5 py-1 rounded-[4px] w-full block transition-colors bg-[#2ebd85]/10 truncate", bidColor || staticBidColor),
                    children: bid
                }, void 0, false, {
                    fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                    lineNumber: 132,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                lineNumber: 131,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isVisible('ask') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-1 w-[90px] min-w-[90px] text-center flex items-center justify-center h-full flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-[12px] font-medium px-1.5 py-1 rounded-[4px] w-full block transition-colors bg-[#f6465d]/10 truncate", askColor || staticAskColor),
                    children: ask
                }, void 0, false, {
                    fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                    lineNumber: 144,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                lineNumber: 143,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isVisible('change') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("px-1 w-[70px] min-w-[70px] text-center text-[11px] font-medium flex items-center justify-center h-full truncate flex-shrink-0", changeColor === 'green' ? 'text-[#2ebd85]' : 'text-[#f6465d]'),
                children: dayChangeLabel
            }, void 0, false, {
                fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                lineNumber: 155,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center h-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: (e)=>{
                        e.stopPropagation();
                        toggleFavorite(item.id);
                    },
                    className: `text-[14px] transition-colors ${item.favorite ? 'text-[#f59e0b]' : 'text-gray-600 hover:text-gray-400'}`,
                    children: item.favorite ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiStar"], {
                        fill: "currentColor"
                    }, void 0, false, {
                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                        lineNumber: 169,
                        columnNumber: 28
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiStar"], {}, void 0, false, {
                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                        lineNumber: 169,
                        columnNumber: 61
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
function WatchlistPanel({ onClose }) {
    const { currentAccount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AccountContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAccount"])();
    const { setSymbol, addNavbarTab } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TradingContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTrading"])();
    const { instruments, categories: dynamicCategories, isLoading, toggleFavorite, reorderInstruments } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$InstrumentContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInstruments"])();
    const { subscribe, unsubscribe, lastQuotes, normalizeSymbol } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$WebSocketContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWebSocket"])();
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('Favorites');
    const [showCategoryDropdown, setShowCategoryDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showPriceHighlight, setShowPriceHighlight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Columns configuration based on "Image 2"
    const [columns, setColumns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: 'flag',
            label: '',
            visible: true,
            draggable: false
        },
        {
            id: 'signal',
            label: 'Signal',
            visible: false,
            draggable: true
        },
        {
            id: 'description',
            label: 'Description',
            visible: true,
            draggable: true
        },
        {
            id: 'bid',
            label: 'Bid',
            visible: true,
            draggable: true
        },
        {
            id: 'spread',
            label: 'Spread',
            visible: false,
            draggable: true
        },
        {
            id: 'ask',
            label: 'Ask',
            visible: true,
            draggable: true
        },
        {
            id: 'change',
            label: '1D change',
            visible: true,
            draggable: true
        },
        {
            id: 'chart',
            label: 'Show chart',
            visible: false,
            draggable: false
        },
        {
            id: 'pl',
            label: 'P/L',
            visible: false,
            draggable: true
        }
    ]);
    // Drag and drop logic
    const dragItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dragOverItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleDragStart = (e, position)=>{
        dragItem.current = position;
        e.dataTransfer.effectAllowed = 'move';
    };
    const handleDragEnter = (e, position)=>{
        dragOverItem.current = position;
        e.preventDefault();
    };
    const handleDragEnd = async ()=>{
        if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
            const newList = [
                ...instruments
            ];
            // Map filtered indices back to original indices
            const itemToMove = filteredItems[dragItem.current];
            const targetItem = filteredItems[dragOverItem.current];
            const fromIdx = newList.findIndex((i)=>i.id === itemToMove.id);
            const toIdx = newList.findIndex((i)=>i.id === targetItem.id);
            if (fromIdx !== -1 && toIdx !== -1) {
                newList.splice(fromIdx, 1);
                newList.splice(toIdx, 0, itemToMove);
                await reorderInstruments(newList);
            }
        }
        dragItem.current = null;
        dragOverItem.current = null;
    };
    const items = instruments;
    const isVisible = (id)=>columns.find((c)=>c.id === id)?.visible;
    const toggleColumn = (id)=>{
        setColumns(columns.map((col)=>col.id === id ? {
                ...col,
                visible: !col.visible
            } : col));
    };
    const filteredItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let filtered = items;
        // Filter by Category
        if (selectedCategory === 'Favorites') {
            filtered = filtered.filter((item)=>item.favorite);
        } else if (selectedCategory !== 'All instruments') {
            filtered = filtered.filter((item)=>item.category === selectedCategory);
        }
        // Filter by Search
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            filtered = filtered.filter((item)=>item.symbol.toLowerCase().includes(lowerTerm) || item.name && item.name.toLowerCase().includes(lowerTerm) || item.description && item.description.toLowerCase().includes(lowerTerm));
        }
        return filtered;
    }, [
        items,
        selectedCategory,
        searchTerm
    ]);
    // Automatically switch to 'All instruments' if Favorites is selected but empty
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (selectedCategory === 'Favorites' && filteredItems.length === 0 && items.length > 0) {
            setSelectedCategory('All instruments');
        }
    }, [
        selectedCategory,
        filteredItems.length,
        items.length
    ]);
    // Handle Subscriptions
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const symbols = filteredItems.map((i)=>i.symbol);
        subscribe(symbols);
        return ()=>unsubscribe(symbols); // Cleanup on unmount/change
    }, [
        filteredItems,
        subscribe,
        unsubscribe
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full overflow-hidden bg-background text-[#b2b5be] font-sans border border-gray-800 rounded-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex items-center justify-between pl-3 pr-2 py-2 flex-shrink-0 min-h-[44px] border-b border-gray-800/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowCategoryDropdown(!showCategoryDropdown),
                                className: "flex items-center gap-2 text-[14px] font-semibold text-white hover:text-gray-300 transition-colors",
                                children: [
                                    selectedCategory,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "10",
                                        height: "6",
                                        viewBox: "0 0 10 6",
                                        fill: "none",
                                        className: `transition-transform duration-200 ${showCategoryDropdown ? 'rotate-180' : ''}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M1 1L5 5L9 1",
                                            stroke: "currentColor",
                                            strokeWidth: "1.5",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                                            lineNumber: 304,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                                        lineNumber: 303,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                                lineNumber: 298,
                                columnNumber: 11
                            }, this),
                            showCategoryDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "fixed inset-0 z-40",
                                        onClick: ()=>setShowCategoryDropdown(false)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                                        lineNumber: 311,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-full left-0 mt-2 w-[220px] bg-[#1a1e25] border border-gray-700 rounded-lg shadow-xl z-50 py-1 max-h-[400px] overflow-y-auto",
                                        children: dynamicCategories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: ()=>{
                                                    setSelectedCategory(cat);
                                                    setShowCategoryDropdown(false);
                                                },
                                                className: "px-4 py-2.5 text-[13px] text-gray-300 hover:bg-[#2a303c] hover:text-white cursor-pointer flex items-center justify-between group transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: cat
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                                                        lineNumber: 322,
                                                        columnNumber: 21
                                                    }, this),
                                                    selectedCategory === cat ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "10",
                                                        height: "8",
                                                        viewBox: "0 0 10 8",
                                                        fill: "none",
                                                        className: "text-white",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M1 4L3.5 6.5L9 1",
                                                            stroke: "currentColor",
                                                            strokeWidth: "1.5",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                                                            lineNumber: 325,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                                                        lineNumber: 324,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "opacity-0 group-hover:opacity-100 text-[#f59e0b]",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiStar"], {
                                                            size: 12,
                                                            fill: "currentColor"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                                                            lineNumber: 329,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, cat, true, {
                                                fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                                                lineNumber: 314,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                                        lineNumber: 312,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                        lineNumber: 297,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "16",
                                height: "16",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "18",
                                        y1: "6",
                                        x2: "6",
                                        y2: "18"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                                        lineNumber: 347,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "6",
                                        y1: "6",
                                        x2: "18",
                                        y2: "18"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                                        lineNumber: 348,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                                lineNumber: 346,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                            lineNumber: 342,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                        lineNumber: 340,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                lineNumber: 294,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 py-2 flex-shrink-0 border-b border-gray-800/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative group bg-[#131720] rounded-md border border-gray-800 group-focus-within:border-gray-600 transition-colors",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "14",
                                height: "14",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "11",
                                        cy: "11",
                                        r: "8"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                                        lineNumber: 359,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "21",
                                        y1: "21",
                                        x2: "16.65",
                                        y2: "16.65"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                                        lineNumber: 360,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                                lineNumber: 358,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                            lineNumber: 357,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "Search",
                            value: searchTerm,
                            onChange: (e)=>setSearchTerm(e.target.value),
                            className: "w-full pl-9 pr-3 py-1.5 bg-transparent text-[13px] text-white placeholder-gray-600 focus:outline-none"
                        }, void 0, false, {
                            fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                            lineNumber: 363,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                    lineNumber: 356,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                lineNumber: 355,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-[30px_36px_minmax(100px,1fr)_auto_auto_auto_30px] gap-0 border-b border-gray-800 bg-background text-[11px] font-medium text-gray-500 uppercase min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-2 text-center bg-[#0b0e14] border-r border-gray-800"
                    }, void 0, false, {
                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                        lineNumber: 375,
                        columnNumber: 9
                    }, this),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-2 text-center bg-[#0b0e14] border-r border-gray-800"
                    }, void 0, false, {
                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-2 pl-2 text-left bg-[#0b0e14] border-r border-gray-800 min-w-[100px] flex-shrink-0",
                        children: "Symbol"
                    }, void 0, false, {
                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                        lineNumber: 377,
                        columnNumber: 9
                    }, this),
                    isVisible('bid') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-2 px-1 text-center w-[90px] min-w-[90px] flex-shrink-0",
                        children: "Bid"
                    }, void 0, false, {
                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                        lineNumber: 379,
                        columnNumber: 30
                    }, this),
                    isVisible('ask') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-2 px-1 text-center w-[90px] min-w-[90px] flex-shrink-0",
                        children: "Ask"
                    }, void 0, false, {
                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                        lineNumber: 380,
                        columnNumber: 30
                    }, this),
                    isVisible('change') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-2 px-1 text-center w-[70px] min-w-[70px] flex-shrink-0",
                        children: "1D"
                    }, void 0, false, {
                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                        lineNumber: 381,
                        columnNumber: 33
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-2 text-center"
                    }, void 0, false, {
                        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                        lineNumber: 383,
                        columnNumber: 9
                    }, this),
                    " "
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                lineNumber: 374,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto overflow-x-auto custom-scrollbar",
                children: filteredItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center justify-center h-full text-gray-600 grayscale opacity-40 py-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiSearch"], {
                            size: 48,
                            className: "mb-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                            lineNumber: 390,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[14px] font-medium",
                            children: "No symbols found"
                        }, void 0, false, {
                            fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                            lineNumber: 391,
                            columnNumber: 13
                        }, this),
                        currentAccount?.group && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[11px] mt-1 opacity-60",
                            children: [
                                "for ",
                                currentAccount.group
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                            lineNumber: 392,
                            columnNumber: 39
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                    lineNumber: 389,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-max",
                    children: filteredItems.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InstrumentRow, {
                            item: item,
                            idx: idx,
                            isVisible: isVisible,
                            toggleFavorite: toggleFavorite,
                            lastQuote: lastQuotes[normalizeSymbol(item.symbol)],
                            handleDragStart: handleDragStart,
                            handleDragEnter: handleDragEnter,
                            handleDragEnd: handleDragEnd,
                            onSelect: setSymbol,
                            addNavbarTab: addNavbarTab
                        }, item.id, false, {
                            fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                            lineNumber: 397,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                    lineNumber: 395,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
                lineNumber: 387,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/panels/WatchlistPanel.tsx",
        lineNumber: 291,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/Tooltip.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Tooltip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function Tooltip({ children, text, className = '', placement = 'bottom' }) {
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [coords, setCoords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        top: 0,
        left: 0
    });
    const triggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const updatePosition = ()=>{
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            let top = 0;
            let left = 0;
            switch(placement){
                case 'bottom':
                    top = rect.bottom + scrollY + 8;
                    left = rect.left + scrollX + rect.width / 2;
                    break;
                case 'top':
                    top = rect.top + scrollY - 8;
                    left = rect.left + scrollX + rect.width / 2;
                    break;
                case 'right':
                    top = rect.top + scrollY + rect.height / 2;
                    left = rect.right + scrollX + 8;
                    break;
                case 'left':
                    top = rect.top + scrollY + rect.height / 2;
                    left = rect.left + scrollX - 8;
                    break;
                default:
                    top = rect.bottom + scrollY + 8;
                    left = rect.left + scrollX + rect.width / 2;
            }
            setCoords({
                top,
                left
            });
        }
    };
    const handleMouseEnter = ()=>{
        updatePosition();
        setIsVisible(true);
    };
    const handleMouseLeave = ()=>{
        setIsVisible(false);
    };
    const arrowClasses = {
        bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-[#2a353e]',
        right: 'right-full top-1/2 transform -translate-y-1/2 border-r-[#2a353e]',
        top: 'top-full left-1/2 transform -translate-x-1/2 border-t-[#2a353e]',
        left: 'left-full top-1/2 transform -translate-y-1/2 border-l-[#2a353e]'
    };
    const tooltipContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute px-2 py-1 bg-[#2a353e] text-white text-xs rounded shadow-lg whitespace-nowrap z-[9999] border border-[#4a5568] pointer-events-none transition-opacity duration-75",
        style: {
            top: coords.top,
            left: coords.left,
            transform: placement === 'left' || placement === 'right' ? 'translateY(-50%)' : 'translateX(-50%)',
            opacity: isVisible ? 1 : 0
        },
        children: [
            text,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute border-4 border-transparent ${arrowClasses[placement]}`
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Tooltip.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Tooltip.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: triggerRef,
                className: `relative flex items-center justify-center ${className}`,
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Tooltip.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            isVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(tooltipContent, document.body)
        ]
    }, void 0, true);
}
}),
"[project]/src/components/ui/IconButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>IconButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Tooltip.tsx [app-ssr] (ecmascript)");
;
;
function IconButton({ children, onClick, tooltip, className = '', ...props }) {
    const button = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: `p-1 text-[#b2b5be] hover:text-white transition-colors cursor-pointer hover:bg-[#2a353e] hover:border hover:border-[#4a5568] rounded-sm border border-transparent ${className}`,
        onClick: onClick,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/IconButton.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
    if (tooltip) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            text: tooltip,
            children: button
        }, void 0, false, {
            fileName: "[project]/src/components/ui/IconButton.tsx",
            lineNumber: 16,
            columnNumber: 12
        }, this);
    }
    return button;
}
}),
"[project]/src/components/panels/EconomicCalendarPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EconomicCalendarPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/IconButton.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function EconomicCalendarPanel({ onClose }) {
    const [selectedImpact, setSelectedImpact] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('All impacts');
    const [selectedCountry, setSelectedCountry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('All countries');
    const economicEvents = [
        {
            time: '12:00',
            ampm: 'AM',
            event: 'ANZ Business Confidence',
            country: 'NZ',
            impact: 2,
            actual: '67',
            forecast: '58',
            previous: '58'
        },
        {
            time: '12:00',
            ampm: 'AM',
            event: 'Thanksgiving Day',
            country: 'US',
            impact: 1,
            actual: '-',
            forecast: '-',
            previous: '-'
        },
        {
            time: '12:30',
            ampm: 'AM',
            event: 'Building Capital Expenditure QoQ',
            country: 'NZ',
            impact: 1,
            actual: '2.1%',
            forecast: '0.4%',
            previous: '0.3%'
        },
        {
            time: '12:30',
            ampm: 'AM',
            event: 'Plant Machinery Capital Expenditure QoQ',
            country: 'NZ',
            impact: 1,
            actual: '12%',
            forecast: '0.4%',
            previous: '0.7%'
        }
    ];
    const getCountryFlag = (country)=>{
        const flags = {
            'NZ': '🇳🇿',
            'US': '🇺🇸',
            'CN': '🇨🇳',
            'JP': '🇯🇵',
            'AU': '🇦🇺',
            'DE': '🇩🇪'
        };
        return flags[country] || '🏳️';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full overflow-hidden bg-background text-[#b2b5be] border border-gray-800 rounded-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between pt-4 px-4 flex-shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-[#b2b5be] text-[13px] font-medium uppercase tracking-wider",
                        children: "ECONOMIC CALENDAR"
                    }, void 0, false, {
                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        onClick: onClose,
                        tooltip: "Hide panel",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-4 h-4",
                            fill: "currentColor",
                            viewBox: "0 0 20 20",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                fillRule: "evenodd",
                                d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                                clipRule: "evenodd"
                            }, void 0, false, {
                                fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 space-y-4 flex-shrink-0 border-b border-gray-800",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: selectedImpact,
                                onChange: (e)=>setSelectedImpact(e.target.value),
                                className: "w-full bg-background border border-gray-800 rounded px-3 py-2.5 text-sm text-[#e1e2e5] appearance-none cursor-pointer focus:outline-none focus:border-[#4a5568]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "All impacts"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "High impact"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "Medium impact"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "Low impact"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                        lineNumber: 87,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "absolute right-3 top-3 w-4 h-4 text-[#6f7682] pointer-events-none",
                                fill: "currentColor",
                                viewBox: "0 0 20 20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    fillRule: "evenodd",
                                    d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                                    clipRule: "evenodd"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: selectedCountry,
                                onChange: (e)=>setSelectedCountry(e.target.value),
                                className: "w-full bg-background border border-gray-800 rounded px-3 py-2.5 text-sm text-[#e1e2e5] appearance-none cursor-pointer focus:outline-none focus:border-[#4a5568]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "All countries"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "United States"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "China"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                        lineNumber: 102,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "Japan"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "Australia"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                        lineNumber: 104,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "Germany"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                        lineNumber: 105,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "New Zealand"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                        lineNumber: 106,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "absolute right-3 top-3 w-4 h-4 text-[#6f7682] pointer-events-none",
                                fill: "currentColor",
                                viewBox: "0 0 20 20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    fillRule: "evenodd",
                                    d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                                    clipRule: "evenodd"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto custom-scrollbar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[#1e2830] px-4 py-2.5 text-[13px] font-bold text-[#e1e2e5] sticky top-0 z-10 border-b border-gray-800",
                        children: "November 27"
                    }, void 0, false, {
                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: economicEvents.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex border-b border-gray-800 py-3 px-4 hover:bg-[#1c252f] transition-colors cursor-pointer group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-[70px] flex flex-col gap-2.5 flex-shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col leading-none",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[13px] text-[#b2b5be] font-medium",
                                                        children: item.time
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                                        lineNumber: 125,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] text-[#6f7682] mt-0.5",
                                                        children: item.ampm
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                                        lineNumber: 126,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                                lineNumber: 124,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm leading-none",
                                                        children: getCountryFlag(item.country)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                                        lineNumber: 129,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-[2px] items-end h-3",
                                                        children: [
                                                            1,
                                                            2,
                                                            3
                                                        ].map((bar)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `w-[3px] rounded-[1px] ${bar <= item.impact ? 'bg-[#eab308]' : 'bg-[#2a353e]'} ${bar === 1 ? 'h-1.5' : bar === 2 ? 'h-2.5' : 'h-3.5'}`
                                                            }, bar, false, {
                                                                fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                                                lineNumber: 132,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                                lineNumber: 128,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0 pl-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[#e1e2e5] text-[13px] font-normal leading-tight pr-2",
                                                        children: item.event
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-4 h-4 text-[#6f7682] group-hover:text-[#b2b5be] transition-colors flex-shrink-0",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M19 9l-7 7-7-7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                                            lineNumber: 146,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                                lineNumber: 143,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-[13px] pr-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `font-medium w-1/3 text-left ${item.actual !== '-' ? 'text-[#e1e2e5]' : 'text-[#6f7682]'}`,
                                                        children: item.actual
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                                        lineNumber: 150,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[#6f7682] w-1/3 text-center",
                                                        children: item.forecast
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                                        lineNumber: 151,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[#6f7682] w-1/3 text-right",
                                                        children: item.previous
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                                        lineNumber: 152,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                                lineNumber: 149,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                        lineNumber: 142,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/panels/EconomicCalendarPanel.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/Toggle.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Toggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function Toggle({ checked, onChange, label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "relative inline-flex items-center cursor-pointer",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "checkbox",
                checked: checked,
                onChange: onChange,
                className: "sr-only peer"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Toggle.tsx",
                lineNumber: 4,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-9 h-5 bg-[#545b64] rounded-full peer peer-checked:bg-[#7f8792] peer-focus:outline-none transition-colors relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `absolute top-0.5 left-0.5 bg-white rounded-full h-4 w-4 transition-transform duration-200 ${checked ? 'translate-x-4' : 'translate-x-0'}`
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/Toggle.tsx",
                    lineNumber: 11,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Toggle.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Toggle.tsx",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/panels/SettingsPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SettingsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toggle.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/IconButton.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function SettingsPanel({ onClose }) {
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        signals: false,
        hmrPeriods: true,
        priceAlerts: true,
        openPositions: true,
        tpsl: false,
        economicCalendar: true,
        highImpact: true,
        middleImpact: false,
        lowImpact: false,
        lowestImpact: false,
        soundPriceAlerts: false,
        soundClosing: false,
        autoTPSL: false,
        orderMode: 'regular',
        priceSource: 'bid',
        theme: 'dark',
        timezone: 'Etc/UTC'
    });
    const handleToggle = (key)=>{
        setSettings((prev)=>({
                ...prev,
                [key]: !prev[key]
            }));
    };
    const handleSelect = (key, value)=>{
        setSettings((prev)=>({
                ...prev,
                [key]: value
            }));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full min-w-[240px] flex flex-col h-full overflow-hidden bg-background border border-gray-800 rounded-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-4 px-4 flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-gray-400 font-medium uppercase text-[13px]",
                            children: "Settings"
                        }, void 0, false, {
                            fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$IconButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onClick: onClose,
                            tooltip: "Hide panel",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4",
                                fill: "currentColor",
                                viewBox: "0 0 20 20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    fillRule: "evenodd",
                                    d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                                    clipRule: "evenodd"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                    lineNumber: 43,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto min-h-0 p-3 lg:p-4 space-y-4 lg:space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-gray-300 text-xs lg:text-sm font-bold mb-3 lg:mb-4",
                                children: "Show on chart"
                            }, void 0, false, {
                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 lg:space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-200 text-sm lg:text-base",
                                                children: "Signals"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                lineNumber: 56,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                checked: settings.signals,
                                                onChange: ()=>handleToggle('signals')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                lineNumber: 57,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-200 text-sm lg:text-base",
                                                children: "HMR periods"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                lineNumber: 60,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                checked: settings.hmrPeriods,
                                                onChange: ()=>handleToggle('hmrPeriods')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                lineNumber: 61,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 59,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-200 text-sm lg:text-base",
                                                children: "Price alerts"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                lineNumber: 64,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                checked: settings.priceAlerts,
                                                onChange: ()=>handleToggle('priceAlerts')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                lineNumber: 65,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-200 text-sm lg:text-base",
                                                children: "Open positions"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                lineNumber: 68,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                checked: settings.openPositions,
                                                onChange: ()=>handleToggle('openPositions')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                lineNumber: 69,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 67,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-200 text-sm lg:text-base",
                                                children: "TP / SL / Stop / Limit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                lineNumber: 72,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                checked: settings.tpsl,
                                                onChange: ()=>handleToggle('tpsl')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                lineNumber: 73,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 71,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-2 lg:mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-200 text-sm lg:text-base",
                                                        children: "Economic calendar"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                        lineNumber: 79,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        checked: settings.economicCalendar,
                                                        onChange: ()=>handleToggle('economicCalendar')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                        lineNumber: 80,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                lineNumber: 78,
                                                columnNumber: 15
                                            }, this),
                                            settings.economicCalendar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ml-4 lg:ml-6 space-y-2 lg:space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 lg:gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: settings.highImpact,
                                                                onChange: ()=>handleToggle('highImpact'),
                                                                className: "w-4 h-4 text-gray-500 bg-gray-700 border-gray-800 rounded focus:ring-gray-500 cursor-pointer"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                                lineNumber: 85,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-200 text-sm lg:text-base",
                                                                children: "High impact"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                                lineNumber: 91,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                        lineNumber: 84,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 lg:gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: settings.middleImpact,
                                                                onChange: ()=>handleToggle('middleImpact'),
                                                                className: "w-4 h-4 text-gray-500 bg-gray-700 border-gray-800 rounded focus:ring-gray-500 cursor-pointer"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                                lineNumber: 94,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-200 text-sm lg:text-base",
                                                                children: "Middle impact"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                                lineNumber: 100,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 lg:gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: settings.lowImpact,
                                                                onChange: ()=>handleToggle('lowImpact'),
                                                                className: "w-4 h-4 text-gray-500 bg-gray-700 border-gray-800 rounded focus:ring-gray-500 cursor-pointer"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                                lineNumber: 103,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-200 text-sm lg:text-base",
                                                                children: "Low impact"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                                lineNumber: 109,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                        lineNumber: 102,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 lg:gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: settings.lowestImpact,
                                                                onChange: ()=>handleToggle('lowestImpact'),
                                                                className: "w-4 h-4 text-gray-500 bg-gray-700 border-gray-800 rounded focus:ring-gray-500 cursor-pointer"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                                lineNumber: 112,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-200 text-sm lg:text-base",
                                                                children: "Lowest impact"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                                lineNumber: 118,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                        lineNumber: 111,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                lineNumber: 83,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 77,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-gray-300 text-xs lg:text-sm font-bold mb-3 lg:mb-4",
                                children: "Sound effects"
                            }, void 0, false, {
                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 lg:space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-200 text-sm lg:text-base",
                                                children: "Price alerts"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                lineNumber: 131,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                checked: settings.soundPriceAlerts,
                                                onChange: ()=>handleToggle('soundPriceAlerts')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                lineNumber: 132,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-200 text-sm lg:text-base",
                                                children: "Closing by TP / SL / SO"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                lineNumber: 135,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                checked: settings.soundClosing,
                                                onChange: ()=>handleToggle('soundClosing')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                                lineNumber: 136,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 134,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-gray-300 text-xs lg:text-sm font-bold mb-3 lg:mb-4",
                                children: "Trading settings"
                            }, void 0, false, {
                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-200 text-sm lg:text-base",
                                        children: "Set TP/SL automatically"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        checked: settings.autoTPSL,
                                        onChange: ()=>handleToggle('autoTPSL')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 146,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-gray-300 text-xs lg:text-sm font-bold mb-3 lg:mb-4",
                                children: "Open order mode"
                            }, void 0, false, {
                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: settings.orderMode,
                                onChange: (e)=>handleSelect('orderMode', e.target.value),
                                className: "w-full bg-[#2a3441] border border-gray-800 rounded px-3 py-2 text-sm lg:text-base text-gray-200 cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "regular",
                                        children: "Regular form"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "quick",
                                        children: "Quick form"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-gray-300 text-xs lg:text-sm font-bold mb-3 lg:mb-4",
                                children: "Price source"
                            }, void 0, false, {
                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: settings.priceSource,
                                onChange: (e)=>handleSelect('priceSource', e.target.value),
                                className: "w-full bg-[#2a3441] border border-gray-800 rounded px-3 py-2 text-sm lg:text-base text-gray-200 cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "bid",
                                        children: "Bid"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "ask",
                                        children: "Ask"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 172,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "mid",
                                        children: "Mid"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 173,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-gray-300 text-xs lg:text-sm font-bold mb-3 lg:mb-4",
                                children: "Appearance"
                            }, void 0, false, {
                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: settings.theme,
                                onChange: (e)=>handleSelect('theme', e.target.value),
                                className: "w-full bg-[#2a3441] border border-gray-800 rounded px-3 py-2 text-sm lg:text-base text-gray-200 cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "dark",
                                        children: "Always dark"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "light",
                                        children: "Always light"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 186,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "auto",
                                        children: "Auto"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 187,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-gray-300 text-xs lg:text-sm font-bold mb-3 lg:mb-4",
                                children: "Time zone"
                            }, void 0, false, {
                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                lineNumber: 193,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: settings.timezone,
                                onChange: (e)=>handleSelect('timezone', e.target.value),
                                className: "w-full bg-[#2a3441] border border-gray-800 rounded px-3 py-2 text-sm lg:text-base text-gray-200 cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Etc/UTC",
                                        children: "UTC"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "America/New_York",
                                        children: "New York"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Europe/London",
                                        children: "London"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Asia/Tokyo",
                                        children: "Tokyo"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/panels/SettingsPanel.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/panels/SettingsPanel.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/LeftSidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeftSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$panels$2f$WatchlistPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/panels/WatchlistPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$panels$2f$EconomicCalendarPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/panels/EconomicCalendarPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$panels$2f$SettingsPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/panels/SettingsPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$lu$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/lu/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Tooltip.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function LeftSidebar({ onPanelStateChange, isExpanded }) {
    const [activePanel, setActivePanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('instruments');
    const togglePanel = (panel)=>{
        setActivePanel(activePanel === panel ? null : panel);
    };
    const closePanel = ()=>{
        setActivePanel(null);
    };
    const hasActivePanel = activePanel !== null;
    // Reset active panel when sidebar is collapsed externally
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isExpanded) {
            setActivePanel(null);
        }
    }, [
        isExpanded
    ]);
    // Notify parent component about panel state changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (onPanelStateChange) {
            onPanelStateChange(hasActivePanel);
        }
    }, [
        hasActivePanel,
        onPanelStateChange
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex h-full overflow-hidden min-h-0 gap-1`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `w-[48px] flex flex-col items-center py-3 gap-4 flex-shrink-0 h-full bg-background rounded-tr-lg border border-gray-800`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            text: "Instruments",
                            placement: "right",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `cursor-pointer w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-200 rounded-sm transition-all duration-200 ${activePanel === 'instruments' ? 'bg-[#263239] border border-gray-400 text-gray-200' : 'hover:bg-[#263239] hover:border hover:border-gray-400 border-2 border-transparent'}`,
                                type: "button",
                                "data-test": "aside-panel-watchlist-button",
                                "aria-label": "Instruments",
                                onClick: ()=>togglePanel('instruments'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$lu$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LuList"], {
                                    size: 20,
                                    className: activePanel === 'instruments' ? 'text-gray-200' : 'text-gray-300'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            text: "Economic calendar",
                            placement: "right",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `cursor-pointer w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-200 rounded-sm transition-all duration-200 ${activePanel === 'calendar' ? 'bg-[#263239] border border-gray-400 text-gray-200' : 'hover:bg-[#263239] hover:border hover:border-gray-400 border-2 border-transparent'}`,
                                type: "button",
                                "data-test": "aside-panel-calendar-events-button",
                                "aria-label": "Economic calendar",
                                onClick: ()=>togglePanel('calendar'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$lu$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LuCalendar"], {
                                    size: 20,
                                    className: activePanel === 'calendar' ? 'text-white' : 'text-gray-300'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                                    lineNumber: 74,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                            lineNumber: 65,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            text: "Settings",
                            placement: "right",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `cursor-pointer w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white rounded-sm transition-all duration-200 ${activePanel === 'settings' ? 'bg-[#263239] border border-gray-400 text-gray-200' : 'hover:bg-[#263239] hover:border hover:border-gray-400 border-2 border-transparent'}`,
                                type: "button",
                                "data-test": "aside-panel-settings-button",
                                "aria-label": "Settings",
                                onClick: ()=>togglePanel('settings'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$lu$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LuSettings"], {
                                    size: 20,
                                    className: activePanel === 'settings' ? 'text-white' : 'text-gray-300'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                                    lineNumber: 91,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            hasActivePanel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    activePanel === 'instruments' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-background border-r border-gray-700 flex flex-col h-full min-h-0 overflow-hidden flex-1 rounded-t-md",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$panels$2f$WatchlistPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onClose: closePanel
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                            lineNumber: 102,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                        lineNumber: 101,
                        columnNumber: 13
                    }, this),
                    false && activePanel === 'calendar' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-background border-r border-gray-700 flex flex-col h-full min-h-0 overflow-hidden flex-1 rounded-t-md",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$panels$2f$EconomicCalendarPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onClose: closePanel
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                            lineNumber: 107,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                        lineNumber: 106,
                        columnNumber: 13
                    }, this),
                    activePanel === 'settings' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-background border-r border-gray-700 flex flex-col h-full min-h-0 overflow-hidden flex-1 rounded-t-md",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$panels$2f$SettingsPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onClose: closePanel
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                            lineNumber: 112,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/LeftSidebar.tsx",
                        lineNumber: 111,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/LeftSidebar.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/chart/RealtimeDataFeed.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RealtimeDataFeed",
    ()=>RealtimeDataFeed
]);
// Helper to map resolution string to API timeframe string
// 1m, 5m, 15m, 30m, 1h, 4h, 1D, 1W, 1M => API: M1, M5, M15, M30, H1, H4, D1, W1, Mn1
const resolutionToTimeframe = (resolution)=>{
    if (resolution === '1') return 'M1';
    if (resolution === '5') return 'M5';
    if (resolution === '15') return 'M15';
    if (resolution === '30') return 'M30';
    if (resolution === '60') return 'H1';
    if (resolution === '240') return 'H4';
    if (resolution === 'D' || resolution === '1D') return 'D1';
    if (resolution === 'W' || resolution === '1W') return 'W1';
    if (resolution === 'M' || resolution === '1M') return 'Mn1';
    // Fallback
    return resolution;
};
// Normalizes symbols by stripping lowercase suffixes (e.g., BTCUSDm -> BTCUSD)
const normalizeSymbol = (symbol)=>{
    if (!symbol) return '';
    const s = symbol.split('.')[0].trim();
    // Strip trailing suffixes like m, a, c, f, h, r (case-insensitive)
    return s.replace(/[macfhrMACFHR]+$/, '').toUpperCase();
};
class WebSocketManager {
    url;
    ws = null;
    reconnectTimeout = null;
    subscribers = new Set();
    historyCallbacks = new Map();
    requestQueue = [];
    constructor(url){
        this.url = url;
        this.connect();
    }
    connect() {
        if (this.ws) {
            this.ws.close();
        }
        this.ws = new WebSocket(this.url);
        this.ws.onopen = ()=>{
            this.resubscribe();
            this.processQueue();
        };
        this.ws.onmessage = (event)=>{
            try {
                const data = JSON.parse(event.data);
                this.handleMessage(data);
            } catch (e) {}
        };
        this.ws.onclose = ()=>{
            this.ws = null;
            this.reconnectTimeout = setTimeout(()=>this.connect(), 2000);
        };
        this.ws.onerror = (err)=>{};
    }
    processQueue() {
        while(this.requestQueue.length > 0){
            const req = this.requestQueue.shift();
            if (req) req();
        }
    }
    resubscribe() {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
        const symbolsToSubscribe = new Set();
        this.subscribers.forEach((sub)=>symbolsToSubscribe.add(normalizeSymbol(sub.symbol)));
        if (symbolsToSubscribe.size > 0) {
            const msg = {
                type: 'sub_symbols',
                symbols: Array.from(symbolsToSubscribe),
                streams: [
                    'candle_live'
                ]
            };
            this.ws.send(JSON.stringify(msg));
        }
    }
    subscribe(symbol, tf, callback) {
        // Use mapped timeframe for subscription tracking
        const mappedTf = resolutionToTimeframe(tf);
        const subscription = {
            symbol,
            tf: mappedTf,
            callback,
            lastBarTime: 0
        };
        this.subscribers.add(subscription);
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            const normalizedSymbol = normalizeSymbol(symbol);
            const msg = {
                type: 'sub_symbols',
                symbols: [
                    normalizedSymbol
                ],
                streams: [
                    'candle_live'
                ]
            };
            this.ws.send(JSON.stringify(msg));
        }
        return subscription;
    }
    unsubscribe(subscription) {
        this.subscribers.delete(subscription);
    }
    getHistory(symbol, tf, count, onSuccess, onError) {
        const runRequest = ()=>{
            if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
                onError("WebSocket not connected during execution");
                return;
            }
            const normalizedSymbol = normalizeSymbol(symbol);
            const key = `${normalizedSymbol}-${tf}`;
            this.historyCallbacks.set(key, {
                onSuccess,
                onError
            });
            const msg = {
                type: 'candle_history',
                symbol: normalizedSymbol,
                tf,
                count
            };
            this.ws.send(JSON.stringify(msg));
        };
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            this.requestQueue.push(runRequest);
        } else {
            runRequest();
        }
    }
    handleMessage(data) {
        if (data.type === 'candle_snapshot') {
            const response = data;
            const key = `${response.symbol}-${response.tf}`;
            const callback = this.historyCallbacks.get(key);
            if (callback) {
                const bars = response.candles.map((c)=>({
                        time: c.t,
                        open: c.o,
                        high: c.h,
                        low: c.l,
                        close: c.c,
                        volume: c.v
                    }));
                // Sort just in case
                bars.sort((a, b)=>a.time - b.time);
                callback.onSuccess(bars, {
                    noData: bars.length === 0
                });
                this.historyCallbacks.delete(key);
            }
        } else if (data.type === 'candle_update') {
            const update = data;
            Array.from(this.subscribers).forEach((sub)=>{
                // sub.tf is already mapped (e.g., 'H1'), update.tf uses mapped values too
                const subTf = sub.tf;
                const subNormalized = normalizeSymbol(sub.symbol);
                const updateNormalized = normalizeSymbol(update.symbol);
                if (subNormalized === updateNormalized && subTf === update.tf) {
                    const bar = {
                        time: update.t,
                        open: update.o,
                        high: update.h,
                        low: update.l,
                        close: update.c,
                        volume: update.v
                    };
                    sub.callback(bar);
                }
            });
        }
    }
}
class RealtimeDataFeed {
    wsManager;
    configuration;
    constructor(){
        const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'wss://metaapi.zuperior.com/ws';
        this.wsManager = new WebSocketManager(wsUrl);
        this.configuration = {
            supports_search: false,
            supports_group_request: false,
            supported_resolutions: [
                '1',
                '5',
                '15',
                '30',
                '60',
                '240',
                '1D',
                '1W',
                '1M'
            ],
            supports_marks: false,
            supports_timescale_marks: false
        };
    }
    onReady(callback) {
        setTimeout(()=>callback(this.configuration), 0);
    }
    searchSymbols(userInput, exchange, symbolType, onResult) {
        onResult([]);
    }
    resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
        const symbolInfo = {
            name: symbolName,
            description: symbolName,
            type: 'crypto',
            session: '24x7',
            timezone: 'Etc/UTC',
            exchange: '',
            minmov: 1,
            pricescale: 100,
            has_intraday: true,
            supported_resolutions: this.configuration.supported_resolutions,
            volume_precision: 2,
            data_status: 'streaming',
            format: 'price',
            listed_exchange: '',
            sector: '',
            industry: ''
        };
        if (symbolName.includes('JPY') || symbolName.includes('XAU')) {
            symbolInfo.pricescale = 1000;
        } else if (symbolName.includes('BTC')) {
            symbolInfo.pricescale = 100;
        } else {
            symbolInfo.pricescale = 100000;
        }
        setTimeout(()=>onSymbolResolvedCallback(symbolInfo), 0);
    }
    getBars(symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) {
        const { from, to, countBack, firstDataRequest } = periodParams;
        const tf = resolutionToTimeframe(resolution);
        const count = 1000;
        if (!firstDataRequest) {
            onHistoryCallback([], {
                noData: true
            });
            return;
        }
        this.wsManager.getHistory(symbolInfo.name, tf, count, onHistoryCallback, onErrorCallback);
    }
    subscribeBars(symbolInfo, resolution, onRealtimeCallback, listenerGuid, onResetCacheNeededCallback) {
        const subscription = this.wsManager.subscribe(symbolInfo.name, resolution, onRealtimeCallback);
        this._subs = this._subs || {};
        this._subs[listenerGuid] = subscription;
    }
    unsubscribeBars(listenerGuid) {
        const subs = this._subs;
        if (subs && subs[listenerGuid]) {
            this.wsManager.unsubscribe(subs[listenerGuid]);
            delete subs[listenerGuid];
        }
    }
    getQuotes(symbols, onDataCallback, onErrorCallback) {
        onDataCallback([]);
    }
    subscribeQuotes(symbols, fastSymbols, onRealtimeCallback, listenerGUID) {}
    unsubscribeQuotes(listenerGUID) {}
}
}),
"[project]/public/charting_library/broker-api.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccountType",
    ()=>F,
    "BracketType",
    ()=>L,
    "BrokerMaintenanceUrgency",
    ()=>r,
    "CommissionAssetType",
    ()=>o,
    "CommissionType",
    ()=>t,
    "CommonAccountManagerColumnId",
    ()=>n,
    "ConcurrentSessionsAllowance",
    ()=>v,
    "ConnectWarningMessageDisplayType",
    ()=>a,
    "ConnectionStatus",
    ()=>l,
    "ConnectionType",
    ()=>y,
    "DisconnectType",
    ()=>g,
    "LatencyTrackingTransactionType",
    ()=>h,
    "MarginRateAssetType",
    ()=>e,
    "NotificationType",
    ()=>N,
    "OrderInfoDependency",
    ()=>c,
    "OrderOrPositionMessageType",
    ()=>A,
    "OrderStatus",
    ()=>S,
    "OrderStatusFilter",
    ()=>C,
    "OrderTicketFocusControl",
    ()=>m,
    "OrderType",
    ()=>s,
    "ParentType",
    ()=>T,
    "PriceType",
    ()=>_,
    "Side",
    ()=>I,
    "StandardFormatterName",
    ()=>x,
    "StopType",
    ()=>i
]);
var i, o, t, e, n, r, a, c, u, l, d, s, f, I, E, P, S, C, p, O, T, L, R, m, D, N, y, A, F, g, k, M, _, v, h, x;
!function(i) {
    i[i.StopLoss = 0] = "StopLoss", i[i.TrailingStop = 1] = "TrailingStop", i[i.GuaranteedStop = 2] = "GuaranteedStop";
}(i || (i = {})), function(i) {
    i.Futures = "futures", i.Options = "options", i.Others = "others", i.FutureAndOptions = "futureAndOptions";
}(o || (o = {})), function(i) {
    i.PerContract = "contract", i.Fixed = "fixed", i.Percent = "percent", i.Disabled = "disabled";
}(t || (t = {})), function(i) {
    i.Stocks = "stocks", i.Futures = "futures", i.Forex = "forex", i.Crypto = "crypto", i.Others = "others";
}(e || (e = {})), function(i) {
    i.Symbol = "symbol";
}(n || (n = {})), function(i) {
    i[i.Critical = 0] = "Critical", i[i.Informational = 1] = "Informational";
}(r || (r = {})), function(i) {
    i[i.PopUp = 0] = "PopUp", i[i.Notification = 1] = "Notification";
}(a || (a = {})), function(i) {
    i.Quantity = "qty", i.OrderSide = "side", i.Price = "price", i.Duration = "duration", i.Brackets = "brackets", i.StopLossType = "slType";
}(c || (c = {})), function(i) {
    i[i.CONNECTED = 1] = "CONNECTED", i[i.CONNECTING = 2] = "CONNECTING", i[i.DISCONNECTED = 3] = "DISCONNECTED", i[i.ERROR = 4] = "ERROR";
}(u || (u = {})), function(i) {
    i[i.Connected = 1] = "Connected", i[i.Connecting = 2] = "Connecting", i[i.Disconnected = 3] = "Disconnected", i[i.Error = 4] = "Error";
}(l || (l = {})), function(i) {
    i[i.LIMIT = 1] = "LIMIT", i[i.MARKET = 2] = "MARKET", i[i.STOP = 3] = "STOP", i[i.STOPLIMIT = 4] = "STOPLIMIT";
}(d || (d = {})), function(i) {
    i[i.Limit = 1] = "Limit", i[i.Market = 2] = "Market", i[i.Stop = 3] = "Stop", i[i.StopLimit = 4] = "StopLimit";
}(s || (s = {})), function(i) {
    i[i.BUY = 1] = "BUY", i[i.SELL = -1] = "SELL";
}(f || (f = {})), function(i) {
    i[i.Buy = 1] = "Buy", i[i.Sell = -1] = "Sell";
}(I || (I = {})), function(i) {
    i[i.CANCELED = 1] = "CANCELED", i[i.FILLED = 2] = "FILLED", i[i.INACTIVE = 3] = "INACTIVE", i[i.PLACING = 4] = "PLACING", i[i.REJECTED = 5] = "REJECTED", i[i.WORKING = 6] = "WORKING";
}(E || (E = {})), function(i) {
    i[i.ALL = 0] = "ALL", i[i.CANCELED = 1] = "CANCELED", i[i.FILLED = 2] = "FILLED", i[i.INACTIVE = 3] = "INACTIVE", i[i.REJECTED = 5] = "REJECTED", i[i.WORKING = 6] = "WORKING";
}(P || (P = {})), function(i) {
    i[i.Canceled = 1] = "Canceled", i[i.Filled = 2] = "Filled", i[i.Inactive = 3] = "Inactive", i[i.Placing = 4] = "Placing", i[i.Rejected = 5] = "Rejected", i[i.Working = 6] = "Working";
}(S || (S = {})), function(i) {
    i[i.All = 0] = "All", i[i.Canceled = 1] = "Canceled", i[i.Filled = 2] = "Filled", i[i.Inactive = 3] = "Inactive", i[i.Rejected = 5] = "Rejected", i[i.Working = 6] = "Working";
}(C || (C = {})), function(i) {
    i[i.Order = 1] = "Order", i[i.Position = 2] = "Position";
}(p || (p = {})), function(i) {
    i[i.ORDER = 1] = "ORDER", i[i.POSITION = 2] = "POSITION";
}(O || (O = {})), function(i) {
    i[i.Order = 1] = "Order", i[i.Position = 2] = "Position", i[i.IndividualPosition = 3] = "IndividualPosition";
}(T || (T = {})), function(i) {
    i[i.StopLoss = 0] = "StopLoss", i[i.TakeProfit = 1] = "TakeProfit", i[i.TrailingStop = 2] = "TrailingStop", i[i.GuaranteedStop = 3] = "GuaranteedStop";
}(L || (L = {})), function(i) {
    i[i.LIMITPRICE = 1] = "LIMITPRICE", i[i.STOPPRICE = 2] = "STOPPRICE", i[i.TAKEPROFIT = 3] = "TAKEPROFIT", i[i.STOPLOSS = 4] = "STOPLOSS";
}(R || (R = {})), function(i) {
    i[i.LimitPrice = 1] = "LimitPrice", i[i.StopPrice = 2] = "StopPrice", i[i.TakeProfit = 3] = "TakeProfit", i[i.StopLoss = 4] = "StopLoss", i[i.Quantity = 5] = "Quantity";
}(m || (m = {})), function(i) {
    i[i.ERROR = 0] = "ERROR", i[i.SUCCESS = 1] = "SUCCESS";
}(D || (D = {})), function(i) {
    i[i.Error = 0] = "Error", i[i.Success = 1] = "Success";
}(N || (N = {})), function(i) {
    i[i.Demo = 1] = "Demo", i[i.Real = 0] = "Real";
}(y || (y = {})), function(i) {
    i.Information = "information", i.Warning = "warning", i.Error = "error";
}(A || (A = {})), function(i) {
    i.Demo = "demo", i.Live = "live";
}(F || (F = {})), function(i) {
    i[i.LogOut = 0] = "LogOut", i[i.FailedRestoring = 1] = "FailedRestoring", i[i.Offline = 2] = "Offline", i[i.APIError = 3] = "APIError", i[i.TwoFactorRequired = 4] = "TwoFactorRequired", i[i.CancelAuthorization = 5] = "CancelAuthorization", i[i.TimeOutForAuthorization = 6] = "TimeOutForAuthorization", i[i.OauthError = 7] = "OauthError", i[i.BrokenConnection = 8] = "BrokenConnection", i[i.Reconnect = 9] = "Reconnect", i[i.FailedSignIn = 10] = "FailedSignIn";
}(g || (g = {})), function(i) {
    i[i.None = 0] = "None", i[i.Pips = 1] = "Pips", i[i.Ticks = 2] = "Ticks";
}(k || (k = {})), function(i) {
    i.Halted = "HALTED", i.NotShortable = "NOT-SHORTABLE", i.HardToBorrow = "HARD-TO-BORROW";
}(M || (M = {})), function(i) {
    i[i.Limit = 1] = "Limit", i[i.Stop = 2] = "Stop";
}(_ || (_ = {})), function(i) {
    i.Disallowed = "disallowed", i.Allowed = "allowed", i.AllowedWithWarning = "allowed_with_warning";
}(v || (v = {})), function(i) {
    i.PlaceOrder = "place_order", i.ModifyOrder = "modify_order", i.CancelOrder = "cancel_order", i.CancelMultipleOrders = "cancel_multiple_orders", i.ModifyPosition = "modify_position", i.ClosePosition = "close_position", i.ModifyIndividualPosition = "modify_individual_position", i.CloseIndividualPosition = "close_individual_position", i.CloseNetPosition = "close_net_position";
}(h || (h = {})), function(i) {
    i.Date = "date", i.DateOrDateTime = "dateOrDateTime", i.Default = "default", i.Fixed = "fixed", i.FixedInCurrency = "fixedInCurrency", i.VariablePrecision = "variablePrecision", i.FormatQuantity = "formatQuantity", i.FormatPrice = "formatPrice", i.FormatPriceForexSup = "formatPriceForexSup", i.FormatPriceInCurrency = "formatPriceInCurrency", i.IntegerSeparated = "integerSeparated", i.LocalDate = "localDate", i.LocalDateOrDateTime = "localDateOrDateTime", i.Percentage = "percentage", i.Pips = "pips", i.Profit = "profit", i.ProfitInInstrumentCurrency = "profitInInstrumentCurrency", i.ProfitInPercent = "profitInPercent", i.Side = "side", i.PositionSide = "positionSide", i.Status = "status", i.Symbol = "symbol", i.Text = "text", i.Type = "type", i.MarginPercent = "marginPercent", i.Empty = "empty";
}(x || (x = {}));
;
}),
"[project]/src/components/chart/abstract-broker-minimal.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AbstractBrokerMinimal",
    ()=>AbstractBrokerMinimal
]);
class AbstractBrokerMinimal {
    _host;
    _quotesProvider;
    constructor(host, quotesProvider){
        this._host = host;
        this._quotesProvider = quotesProvider;
    }
}
}),
"[project]/src/lib/metaapi.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancelPendingOrderDirect",
    ()=>cancelPendingOrderDirect,
    "closeMultiplePositionsDirect",
    ()=>closeMultiplePositionsDirect,
    "closePositionDirect",
    ()=>closePositionDirect,
    "getAccountBalanceDirect",
    ()=>getAccountBalanceDirect,
    "getPendingOrdersDirect",
    ()=>getPendingOrdersDirect,
    "getPositionsAndOrdersDirect",
    ()=>getPositionsAndOrdersDirect,
    "getPositionsDirect",
    ()=>getPositionsDirect,
    "loginDirect",
    ()=>loginDirect,
    "modifyPendingOrderDirect",
    ()=>modifyPendingOrderDirect,
    "modifyPositionDirect",
    ()=>modifyPositionDirect,
    "placeMarketOrderDirect",
    ()=>placeMarketOrderDirect,
    "placePendingOrderDirect",
    ()=>placePendingOrderDirect
]);
/**
 * MetaAPI Direct Client
 * 
 * Direct API calls to MetaAPI for performance-critical operations.
 * Bypasses backend proxy to achieve sub-500ms response times.
 */ const METAAPI_BASE_URL = 'https://metaapi.zuperior.com';
async function loginDirect(credentials) {
    const url = `${METAAPI_BASE_URL}/api/client/ClientAuth/login`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
    }
    return await response.json();
}
async function getPositionsDirect(accountId, accessToken) {
    const url = `${METAAPI_BASE_URL}/api/client/Positions`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'AccountId': String(accountId),
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : data.positions || [];
}
async function getPositionsAndOrdersDirect(accountId, accessToken) {
    // Try multiple endpoints to find orders
    const positionsUrl = `${METAAPI_BASE_URL}/api/client/Positions`;
    const ordersUrl = `${METAAPI_BASE_URL}/api/client/Orders`;
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'AccountId': String(accountId),
        'Content-Type': 'application/json'
    };
    try {
        // Fetch positions and orders in parallel
        const [positionsResponse, ordersResponse] = await Promise.all([
            fetch(positionsUrl, {
                method: 'GET',
                headers
            }),
            fetch(ordersUrl, {
                method: 'GET',
                headers
            })
        ]);
        let positions = [];
        let orders = [];
        // Parse positions
        if (positionsResponse.ok) {
            const posData = await positionsResponse.json();
            console.log('[getPositionsAndOrdersDirect] Positions response:', posData);
            positions = Array.isArray(posData) ? posData : posData.positions || posData.Positions || [];
        } else {
            console.warn('[getPositionsAndOrdersDirect] Positions failed:', positionsResponse.status);
        }
        // Parse orders
        if (ordersResponse.ok) {
            const ordersData = await ordersResponse.json();
            console.log('[getPositionsAndOrdersDirect] Orders response:', ordersData);
            console.log('[getPositionsAndOrdersDirect] Orders keys:', Object.keys(ordersData));
            orders = Array.isArray(ordersData) ? ordersData : ordersData.orders || ordersData.Orders || ordersData.pendingOrders || ordersData.PendingOrders || [];
        } else {
            console.warn('[getPositionsAndOrdersDirect] Orders endpoint failed:', ordersResponse.status);
        }
        console.log('[getPositionsAndOrdersDirect] Final result:', {
            positionsCount: positions.length,
            ordersCount: orders.length
        });
        return {
            positions,
            orders
        };
    } catch (error) {
        console.error('[getPositionsAndOrdersDirect] Error:', error);
        return {
            positions: [],
            orders: []
        };
    }
}
async function getPendingOrdersDirect(accountId, accessToken) {
    const result = await getPositionsAndOrdersDirect(accountId, accessToken);
    return result.orders;
}
async function getAccountBalanceDirect(accountId, accessToken) {
    const url = `${METAAPI_BASE_URL}/api/client/Account/Balance`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'AccountId': String(accountId),
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        console.warn('[MetaAPI] Failed to fetch balance:', response.status);
        return 0;
    }
    const data = await response.json();
    // API might return { balance: 10000 } or just a number
    return typeof data === 'number' ? data : data.balance || data.Balance || 0;
}
async function closePositionDirect({ positionId, accountId, accessToken, volume = 0, price = 0, comment = 'Closed from Terminal', positionVolumeMT5 }) {
    try {
        const API_BASE = METAAPI_BASE_URL.endsWith('/api') ? METAAPI_BASE_URL : `${METAAPI_BASE_URL}/api`;
        const positionIdNum = typeof positionId === 'string' ? parseInt(positionId, 10) : positionId;
        // Build query parameters for DELETE request (only volume, not comment/price)
        const params = new URLSearchParams();
        // REMOVED: Do not send volume in DELETE query to avoid 400 Bad Request
        // if (volume && volume > 0) params.set('volume', String(volume));
        const queryString = params.toString();
        const deleteUrl = `${API_BASE}/client/position/${positionIdNum}${queryString ? `?${queryString}` : ''}`;
        const baseHeaders = {
            'Authorization': `Bearer ${accessToken}`,
            'AccountId': accountId,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        // Validate token before making requests
        if (!accessToken || accessToken.trim() === '') {
            throw new Error('Invalid or missing access token');
        }
        // Try primary method first: DELETE /client/position/{positionId}
        let response = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: baseHeaders
        });
        let finalResponse = response;
        let finalError = null;
        // If DELETE fails, try POST fallbacks
        // Auth errors (401/403) on DELETE/POST endpoints are expected - they may not support our token format
        // We'll skip directly to Trading endpoint which works
        if (!response.ok && response.status !== 204) {
            const isAuthError = response.status === 401 || response.status === 403;
            const isMethodError = response.status === 405 || response.status === 415;
            // Skip fallback 1 if auth error - go directly to Trading endpoint
            let shouldTryFallback2 = isAuthError || isMethodError;
            if (!isAuthError && !isMethodError) {
                // Only log as debug/info, not error, since this is expected fallback behavior
                console.debug(`[ClosePosition] DELETE failed with ${response.status}, trying POST fallbacks`);
                // Fallback 1: POST /client/position/close with JSON payload (camelCase)
                try {
                    const payload = {
                        positionId: positionIdNum
                    };
                    if (volume && volume > 0) payload.volume = Number(volume);
                    const postUrl = `${API_BASE}/client/position/close`;
                    const fallback1Response = await fetch(postUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            ...baseHeaders
                        },
                        body: JSON.stringify(payload)
                    });
                    if (fallback1Response.ok || fallback1Response.status === 204) {
                        finalResponse = fallback1Response;
                        console.log(`[ClosePosition] Success via POST fallback 1`);
                        shouldTryFallback2 = false; // Success, don't try fallback 2
                    } else {
                        // Check if it's an auth/method error - skip to Trading endpoint
                        if (fallback1Response.status === 401 || fallback1Response.status === 403 || fallback1Response.status === 405 || fallback1Response.status === 415) {
                            console.debug(`[ClosePosition] POST fallback 1 not supported (${fallback1Response.status}), trying Trading endpoint`);
                            shouldTryFallback2 = true;
                        } else {
                            console.log(`[ClosePosition] POST fallback 1 failed with ${fallback1Response.status}, trying Trading endpoint`);
                            shouldTryFallback2 = true;
                        }
                    }
                } catch (fallbackError) {
                    console.debug(`[ClosePosition] Fallback 1 error:`, fallbackError);
                    shouldTryFallback2 = true; // Try Trading endpoint on error
                }
            } else {
                // Auth or method error on DELETE - skip fallback 1
                console.debug(`[ClosePosition] DELETE endpoint issue (${response.status}), skipping to Trading endpoint`);
            }
            // Fallback 2: POST /Trading/position/close with PascalCase payload (always try this as last resort)
            if (shouldTryFallback2) {
                try {
                    // Trading endpoint requires Login, PositionId, and Volume (all required)
                    // Login must be parsed as integer from accountId string
                    const accountIdNum = parseInt(String(accountId), 10);
                    if (isNaN(accountIdNum)) {
                        throw new Error(`Invalid accountId: ${accountId}`);
                    }
                    // Trading endpoint requires Volume in MT5 internal format
                    // Volume must be multiples of 100 (step 100) where 100 = 1 lot
                    // But volumes < 100 are also valid (e.g., 1 = 0.01 lot, 10 = 0.1 lot)
                    // If volume is 0 (full close), use positionVolumeMT5 if provided, otherwise fetch position
                    let volumeToSend = 0;
                    if (volume && volume > 0) {
                        // Partial close: convert lots to MT5 format (multiply by 100)
                        volumeToSend = Math.round(volume * 100);
                        // If >= 100, ensure it's a multiple of 100
                        if (volumeToSend >= 100) {
                            volumeToSend = Math.round(volumeToSend / 100) * 100;
                        }
                    } else if (positionVolumeMT5 !== undefined && positionVolumeMT5 !== null) {
                        // Full close: positionVolumeMT5 is already in MT5 format from TradingTerminal
                        // (it was converted from lots to MT5 by multiplying by 100)
                        volumeToSend = Number(positionVolumeMT5);
                        // If >= 100, ensure it's a multiple of 100
                        if (volumeToSend >= 100) {
                            volumeToSend = Math.round(volumeToSend / 100) * 100;
                        }
                    } else {
                        // Fetch position to get actual volume
                        try {
                            const positionsUrl = `${API_BASE}/client/Positions`;
                            const positionsResponse = await fetch(positionsUrl, {
                                method: 'GET',
                                headers: baseHeaders
                            });
                            if (positionsResponse.ok) {
                                const positionsData = await positionsResponse.json();
                                const positions = positionsData?.positions || positionsData?.data || positionsData || [];
                                const position = positions.find((p)=>(p.PositionId || p.positionId || p.Id || p.id) === positionIdNum);
                                if (position) {
                                    console.log('[ClosePosition] Fetched position for volume calculation:', position);
                                    // Get volume - prefer Volume (MT5 format), otherwise VolumeLots (convert to MT5)
                                    const rawVolume = position.Volume || position.volume || 0;
                                    const posVolumeLots = position.VolumeLots || position.volumeLots;
                                    if (rawVolume > 0) {
                                        // Already in MT5 format
                                        volumeToSend = Number(rawVolume);
                                        // If >= 100, ensure it's a multiple of 100
                                        if (volumeToSend >= 100) {
                                            volumeToSend = Math.round(volumeToSend / 100) * 100;
                                        }
                                    } else if (posVolumeLots !== undefined && posVolumeLots !== null) {
                                        // Convert from lots to MT5 format (multiply by 100)
                                        volumeToSend = Math.round(Number(posVolumeLots) * 100);
                                        // If >= 100, ensure it's a multiple of 100
                                        if (volumeToSend >= 100) {
                                            volumeToSend = Math.round(volumeToSend / 100) * 100;
                                        }
                                    }
                                    console.log(`[ClosePosition] Fetched position volume: ${volumeToSend} (MT5 format)`);
                                }
                            }
                        } catch (fetchError) {
                            console.warn(`[ClosePosition] Could not fetch position volume:`, fetchError);
                            // If we can't get volume, we can't close - throw error
                            throw new Error('Cannot determine position volume for closing');
                        }
                    }
                    // Trading endpoint requires Volume - use MT5 format volume directly
                    const tradingPayload = {
                        Login: accountIdNum,
                        PositionId: positionIdNum,
                        Volume: volumeToSend
                    };
                    console.log(`[ClosePosition] Trading payload (Volume: ${volumeToSend} MT5 units):`, tradingPayload);
                    const tradingUrl = `${API_BASE}/Trading/position/close`;
                    const fallback2Response = await fetch(tradingUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            ...baseHeaders
                        },
                        body: JSON.stringify(tradingPayload)
                    });
                    if (fallback2Response.ok || fallback2Response.status === 204) {
                        finalResponse = fallback2Response;
                        console.log(`[ClosePosition] Success via Trading endpoint`);
                    } else {
                        // All methods failed, use the last error
                        finalResponse = fallback2Response;
                        const errorText = await fallback2Response.text().catch(()=>'');
                        finalError = errorText || `All close methods failed. Last status: ${fallback2Response.status}`;
                    }
                } catch (tradingError) {
                    console.error(`[ClosePosition] Trading endpoint error:`, tradingError);
                    finalError = tradingError.message || 'Trading endpoint failed';
                }
            }
        }
        // Check final response
        if (!finalResponse.ok && finalResponse.status !== 204) {
            const errorText = finalError || await finalResponse.text().catch(()=>'');
            // Only log as error if all methods failed
            console.error(`[ClosePosition] All methods failed. Last status: ${finalResponse.status} - ${errorText}`);
            return {
                success: false,
                message: `Failed to close position: ${finalResponse.status} - ${errorText}`
            };
        }
        // Success - log which method worked
        if (finalResponse === response) {
            console.log(`[ClosePosition] Success via DELETE method`);
        } else {
        // Already logged in fallback sections
        }
        // Handle both JSON and empty responses (204 No Content)
        let data = null;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            try {
                data = await response.json();
            } catch  {
            // Response might be empty, that's okay
            }
        }
        console.log(`[ClosePosition] Success: Position ${positionId} closed`);
        return {
            success: true,
            data
        };
    } catch (error) {
        console.error(`[ClosePosition] Error:`, error);
        return {
            success: false,
            message: error.message || 'Network error'
        };
    }
}
async function cancelPendingOrderDirect({ orderId, accountId, accessToken, comment = 'Cancelled from Terminal' }) {
    try {
        const API_BASE = METAAPI_BASE_URL.endsWith('/api') ? METAAPI_BASE_URL : `${METAAPI_BASE_URL}/api`;
        // Parse order ID - handle both string and number, remove "Generated-" prefix if present
        let orderIdNum;
        if (typeof orderId === 'string') {
            // Remove "Generated-" prefix if present
            const cleanedId = orderId.replace('Generated-', '').trim();
            orderIdNum = parseInt(cleanedId, 10);
        } else {
            orderIdNum = orderId;
        }
        // Validate order ID
        if (isNaN(orderIdNum) || orderIdNum <= 0) {
            console.error(`[CancelOrder] Invalid order ID: ${orderId} (parsed as ${orderIdNum})`);
            return {
                success: false,
                message: `Invalid order ID: ${orderId}`
            };
        }
        // Use DELETE /api/client/order/{orderId} as per documentation
        const cancelUrl = `${API_BASE}/client/order/${orderIdNum}`;
        // Request body with optional Comment
        const payload = {};
        if (comment) {
            payload.Comment = comment;
        }
        const response = await fetch(cancelUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'AccountId': String(accountId),
                'Content-Type': 'application/json'
            },
            body: Object.keys(payload).length > 0 ? JSON.stringify(payload) : undefined
        });
        if (!response.ok) {
            const errorText = await response.text().catch(()=>'');
            console.error(`[CancelOrder] Failed: ${response.status} - ${errorText}`);
            return {
                success: false,
                message: `Failed to cancel order: ${response.status} - ${errorText}`
            };
        }
        // Handle both JSON and empty responses (204 No Content)
        let data = null;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            try {
                data = await response.json();
            } catch  {
            // Response might be empty, that's okay
            }
        }
        console.log(`[CancelOrder] Success: Order ${orderId} cancelled`);
        return {
            success: true,
            data
        };
    } catch (error) {
        console.error(`[CancelOrder] Error:`, error);
        return {
            success: false,
            message: error.message || 'Network error'
        };
    }
}
async function closeMultiplePositionsDirect(positions, accountId, accessToken) {
    const closePromises = positions.map((pos)=>closePositionDirect({
            positionId: pos.positionId,
            accountId,
            accessToken
        }));
    const results = await Promise.allSettled(closePromises);
    const successful = results.filter((r)=>r.status === 'fulfilled' && r.value.success).length;
    const failed = results.length - successful;
    return {
        successful,
        failed
    };
}
async function placeMarketOrderDirect({ accountId, accessToken, symbol, side, volume, stopLoss = 0, takeProfit = 0, comment = '' }) {
    try {
        const tradePath = side === 'sell' ? 'trade-sell' : 'trade';
        const url = `${METAAPI_BASE_URL}/api/client/${tradePath}?account_id=${encodeURIComponent(accountId)}`;
        // Volume normalized to units
        const volumeInUnits = Math.round(volume * 100);
        // Mirroring PascalCase keys from fast pending orders
        const payload = {
            Symbol: symbol,
            Volume: volumeInUnits,
            Price: 0,
            StopLoss: Number(stopLoss || 0),
            TakeProfit: Number(takeProfit || 0),
            Comment: comment || (side === 'sell' ? 'Sell' : 'Buy')
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'AccountId': String(accountId),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const errorText = await response.text().catch(()=>'');
            return {
                success: false,
                message: `Failed to place market order: ${response.status} - ${errorText}`
            };
        }
        const data = await response.json();
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || 'Network error'
        };
    }
}
async function placePendingOrderDirect({ accountId, accessToken, symbol, side, volume, price, orderType, stopLoss = 0, takeProfit = 0, comment = '' }) {
    try {
        // Determine endpoint
        let endpoint = '';
        if (side === 'buy' && orderType === 'limit') endpoint = 'buy-limit';
        else if (side === 'sell' && orderType === 'limit') endpoint = 'sell-limit';
        else if (side === 'buy' && orderType === 'stop') endpoint = 'buy-stop';
        else if (side === 'sell' && orderType === 'stop') endpoint = 'sell-stop';
        if (!endpoint) {
            return {
                success: false,
                message: 'Invalid order type'
            };
        }
        const url = `${METAAPI_BASE_URL}/api/client/${endpoint}?account_id=${encodeURIComponent(accountId)}`;
        const volumeInUnits = Math.round(volume * 100);
        const payload = {
            Symbol: symbol,
            Price: Number(price),
            Volume: volumeInUnits,
            StopLoss: Number(stopLoss || 0),
            TakeProfit: Number(takeProfit || 0),
            Expiration: '0001-01-01T00:00:00',
            Comment: comment || ''
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'AccountId': String(accountId),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const errorText = await response.text().catch(()=>'');
            return {
                success: false,
                message: `Failed to place pending order: ${response.status} - ${errorText}`
            };
        }
        const data = await response.json();
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || 'Network error'
        };
    }
}
async function modifyPositionDirect({ positionId, accountId, accessToken, stopLoss, takeProfit, comment = 'Modified from Chart' }) {
    try {
        const API_BASE = METAAPI_BASE_URL.endsWith('/api') ? METAAPI_BASE_URL : `${METAAPI_BASE_URL}/api`;
        const url = `${API_BASE}/client/position/modify`;
        const payload = {
            PositionId: typeof positionId === 'string' ? parseInt(positionId, 10) : positionId,
            Comment: comment
        };
        if (stopLoss !== undefined && stopLoss !== null && Number(stopLoss) > 0) {
            payload.StopLoss = Number(stopLoss);
        }
        if (takeProfit !== undefined && takeProfit !== null && Number(takeProfit) > 0) {
            payload.TakeProfit = Number(takeProfit);
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'AccountId': String(accountId)
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const errorText = await response.text().catch(()=>'');
            return {
                success: false,
                message: `Failed to modify position: ${response.status} - ${errorText}`
            };
        }
        const data = await response.json();
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || 'Network error'
        };
    }
}
async function modifyPendingOrderDirect({ orderId, accountId, accessToken, price, stopLoss, takeProfit, comment = 'Modified from Chart' }) {
    try {
        const API_BASE = METAAPI_BASE_URL.endsWith('/api') ? METAAPI_BASE_URL : `${METAAPI_BASE_URL}/api`;
        // Parse order ID - handle both string and number, remove "Generated-" prefix if present
        let orderIdNum;
        if (typeof orderId === 'string') {
            const cleanedId = orderId.replace('Generated-', '').trim();
            orderIdNum = parseInt(cleanedId, 10);
        } else {
            orderIdNum = orderId;
        }
        const url = `${API_BASE}/client/order/${orderIdNum}`;
        const payload = {
            OrderId: orderIdNum,
            Comment: comment
        };
        if (price !== undefined && price !== null && Number(price) > 0) {
            payload.Price = Number(price);
        }
        if (stopLoss !== undefined && stopLoss !== null) {
            payload.StopLoss = Number(stopLoss) > 0 ? Number(stopLoss) : 0;
        }
        if (takeProfit !== undefined && takeProfit !== null) {
            payload.TakeProfit = Number(takeProfit) > 0 ? Number(takeProfit) : 0;
        }
        console.log('[modifyPendingOrderDirect] Payload:', payload);
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'AccountId': String(accountId)
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const errorText = await response.text().catch(()=>'');
            // Treat unsupported methods as a soft success to avoid noisy errors in UI
            if (response.status === 405 || response.status === 404 || response.status === 501) {
                console.warn('[modifyPendingOrderDirect] Endpoint not supported (soft pass):', response.status, errorText);
                return {
                    success: true,
                    message: 'Modify not supported; skipped'
                };
            }
            console.error('[modifyPendingOrderDirect] Failed:', response.status, errorText);
            return {
                success: false,
                message: `Failed to modify pending order: ${response.status} - ${errorText}`
            };
        }
        const data = await response.json();
        console.log('[modifyPendingOrderDirect] Success:', data);
        return {
            success: true,
            data
        };
    } catch (error) {
        console.error('[modifyPendingOrderDirect] Error:', error);
        return {
            success: false,
            message: error.message || 'Network error'
        };
    }
}
}),
"[project]/src/components/chart/ZuperiorBroker.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ZuperiorBroker",
    ()=>ZuperiorBroker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/charting_library/broker-api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$chart$2f$abstract$2d$broker$2d$minimal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/chart/abstract-broker-minimal.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metaapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/metaapi.ts [app-ssr] (ecmascript)");
;
;
class SimpleSubscription {
    _listeners = [];
    subscribe(listener) {
        this._listeners.push(listener);
    }
    unsubscribe(listener) {
        const index = this._listeners.indexOf(listener);
        if (index > -1) {
            this._listeners.splice(index, 1);
        }
    }
    unsubscribeAll(obj) {
        this._listeners = [];
    }
    fire(...args) {
        this._listeners.forEach((listener)=>{
            if (typeof listener === 'function') {
                // @ts-ignore
                listener(...args);
            }
        });
    }
}
;
// Helper function to change side (Buy <-> Sell)
function changeSide(side) {
    return side === __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Buy ? __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Sell : __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Buy;
}
// Safe host call wrapper
function safeHostCall(host, method, ...args) {
    try {
        if (host && typeof host[method] === 'function') {
            return host[method](...args);
        }
    } catch (e) {
    // Host call failed - silently handle
    }
    return undefined;
}
const PREVIEW_ORDER_ID = 'PREVIEW_ORDER_ID';
class ZuperiorBroker extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$chart$2f$abstract$2d$broker$2d$minimal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AbstractBrokerMinimal"] {
    _accountId;
    _positions = [];
    _orders = [];
    _positionById = {};
    _orderById = {};
    _pollInterval = null;
    _isPolling = false;
    _isWidgetReady = false;
    _getMetaApiToken = null;
    _accessToken = null;
    _accountBalance = 0;
    _lastActionTime = 0;
    _positionsSubscription = new SimpleSubscription();
    _ordersSubscription = new SimpleSubscription();
    constructor(host, quotesProvider, accountId, getMetaApiToken){
        super(host, quotesProvider);
        this._accountId = accountId;
        this._getMetaApiToken = getMetaApiToken || null;
        // Start fetching immediately so positions()/orders() have data when TradingView queries
        this._startPolling();
    }
    // Method to update token function after broker creation
    setMetaApiTokenFunction(getMetaApiToken) {
        this._getMetaApiToken = getMetaApiToken;
    }
    setWidgetReady(ready) {
        this._isWidgetReady = ready;
        if (ready) {
            // When widget becomes ready, trigger updates for all existing positions/orders
            this._notifyAllPositionsAndOrders();
            if (!this._isPolling) {
                this._startPolling();
            }
        }
    }
    setAccountId(accountId) {
        if (this._accountId === accountId) return;
        this._accountId = accountId;
        // Clear existing data
        this._positions.length = 0;
        this._orders.length = 0;
        this._positionById = {};
        this._orderById = {};
        // Restart polling with new account
        if (this._isPolling) {
            this._fetchPositionsAndOrders();
        } else {
            this._startPolling();
        }
    }
    _notifyAllPositionsAndOrders() {
        // Ensure arrays exist before filtering
        if (!Array.isArray(this._orders) || !Array.isArray(this._positions)) {
            return;
        }
        // 1. Update positions FIRST (Matches _fetchPositionsAndOrders flow)
        this._positions.forEach((p)=>{
            try {
                if (this._host) {
                    const cleanPosition = this._createCleanPosition(p);
                    // Update _positionById with clean position before calling positionUpdate
                    this._positionById[cleanPosition.id] = cleanPosition;
                    if (typeof this._host.positionUpdate === 'function') {
                        console.log('[ZuperiorBroker] Notifying position update:', cleanPosition);
                        this._host.positionUpdate(cleanPosition);
                    }
                    if (cleanPosition.pl !== undefined && typeof cleanPosition.pl === 'number' && typeof this._host.plUpdate === 'function') {
                        this._host.plUpdate(cleanPosition.symbol, cleanPosition.pl);
                    }
                }
            } catch (error) {
                console.error('[ZuperiorBroker] Error notifying position:', error, p);
            }
        });
        // CRITICAL: Get bracket orders from _orderById (not _orders) for chart display
        // _orders should only contain real pending orders, bracket orders are in _orderById
        const allOrdersFromMap = Object.values(this._orderById || {});
        const bracketOrders = allOrdersFromMap.filter((o)=>this._isBracketOrder(o));
        console.log(`[ZuperiorBroker] Notify: Total Orders in Map: ${allOrdersFromMap.length}, Brackets: ${bracketOrders.length}`);
        if (bracketOrders.length === 0 && allOrdersFromMap.length > 0) {
            console.log('[ZuperiorBroker] WARNING: Orders exist but no brackets found. Sample order:', allOrdersFromMap[0]);
            console.log('[ZuperiorBroker] _isBracketOrder check result for sample:', this._isBracketOrder(allOrdersFromMap[0]));
        }
        // Regular orders are in _orders array (already filtered to exclude brackets)
        const regularOrders = this._orders.filter((o)=>o && !this._isBracketOrder(o));
        // 2. Send bracket orders via orderUpdate() with correct status and parentId/parentType set
        bracketOrders.forEach((bracket)=>{
            console.log(`[ZuperiorBroker] Processing bracket ${bracket.id} for update`);
            try {
                if (this._host && typeof this._host.orderUpdate === 'function') {
                    if (bracket.parentType === undefined) {
                        bracket.parentType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ParentType"].Position;
                    }
                    // CRITICAL: Calculate projected P/L at bracket price for correct display
                    // CRITICAL: Calculate projected P/L at bracket price for correct display
                    if (bracket.parentId) {
                        const parentPosition = this._positionById[bracket.parentId];
                        const parentOrder = this._orderById[bracket.parentId];
                        if (parentPosition) {
                            // Ensure parentType is Position
                            bracket.parentType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ParentType"].Position;
                            if (parentPosition.avgPrice) {
                                const bracketPrice = bracket.limitPrice || bracket.stopPrice;
                                if (bracketPrice) {
                                    // Calculate using FULL volume (multiply qty by 10000)
                                    const fullVolume = parentPosition.qty * 10000;
                                    const priceDiff = bracketPrice - parentPosition.avgPrice;
                                    const plAtBracket = priceDiff * fullVolume * (parentPosition.side === __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Sell ? -1 : 1);
                                    // Multiply by 100 to compensate for TradingView's recalculation
                                    bracket.pl = plAtBracket * 100;
                                } else if (parentPosition.pl !== undefined && parentPosition.pl !== null) {
                                    bracket.pl = parentPosition.pl * 100;
                                }
                            } else if (parentPosition.pl !== undefined && parentPosition.pl !== null) {
                                bracket.pl = parentPosition.pl * 100;
                            }
                        } else if (parentOrder) {
                            // For order brackets, no P/L calc needed; ensure parentType is Order
                            bracket.parentType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ParentType"].Order;
                        }
                    }
                    console.log('[ZuperiorBroker] Notifying bracket order update:', bracket);
                    this._host.orderUpdate(bracket);
                }
            } catch (error) {
            // Error notifying bracket order - silently handle
            }
        });
        // 3. Update regular orders (for Account Manager)
        regularOrders.forEach((o)=>{
            try {
                if (this._host && typeof this._host.orderUpdate === 'function') {
                    this._host.orderUpdate(o);
                }
            } catch (error) {
            // Error notifying order - silently handle
            }
        });
    }
    async _ensureAuth() {
        if (!this._accessToken) {
            try {
                if (this._getMetaApiToken && this._accountId) {
                    const token = await this._getMetaApiToken(this._accountId);
                    if (token) {
                        this._accessToken = token;
                        // console.log('[ZuperiorBroker] Authenticated successfully with provided token');
                        return !!this._accessToken;
                    }
                }
            // Fallback to hardcoded dev credentials ONLY if token function fails or not present
            // (Or remove this entirely if strict auth is required)
            /*
				const loginRes = await loginDirect({
					AccountId: 19876892,
					Password: "Test@000",
					DeviceId: "test_device_curl",
					DeviceType: "web"
				});
				if (loginRes.Token) {
					this._accessToken = loginRes.Token;
					console.log('[ZuperiorBroker] Authenticated successfully with MetaAPI Direct (Fallback)');
				}
				*/ } catch (e) {
                console.error('[ZuperiorBroker] Auth failed', e);
            }
        }
        return !!this._accessToken;
    }
    connectionStatus() {
        return 1; // Connected
    }
    async _startPolling() {
        if (this._isPolling || !this._accountId) return;
        this._isPolling = true;
        await this._ensureAuth();
        // Initial fetch
        await this._fetchPositionsAndOrders();
        // Poll every 800ms to reduce backend pressure while keeping chart reasonably fresh
        this._pollInterval = setInterval(async ()=>{
            await this._ensureAuth();
            await this._fetchPositionsAndOrders();
        }, 800);
    }
    async _fetchPositionsAndOrders(force = false) {
        // Prevent polling from clobbering optimistic updates unless explicitly forced
        // Reduced window to 1200ms to keep UI fresh while avoiding flicker
        if (!force && Date.now() - this._lastActionTime < 1200) {
            // console.log('[ZuperiorBroker] Skipping poll due to recent user action');
            return;
        }
        if (!this._accountId) {
            return;
        }
        const prevPositions = Array.isArray(this._positions) ? [
            ...this._positions
        ] : [];
        const prevPositionMap = {
            ...this._positionById
        };
        const prevOrderMap = {
            ...this._orderById
        };
        let positionsArray = [];
        let pendingArray = [];
        // Prefer live data already on the page (same source as Position table) to keep UI in lockstep
        const liveData = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else if (this._accessToken) {
            try {
                // Use separate calls since combined endpoint is missing in this version
                const [positions, orders] = await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metaapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPositionsDirect"])(this._accountId, this._accessToken),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metaapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPendingOrdersDirect"])(this._accountId, this._accessToken)
                ]);
                positionsArray = positions;
                pendingArray = orders;
            } catch (error) {
                // Handle 401 Unauthorized gracefully
                if (error?.status === 401) {
                    console.warn('[ZuperiorBroker] 401 Unauthorized - Token expired, will re-auth next poll.');
                    this._accessToken = null; // Clear token to force re-auth
                    return;
                }
                console.error('[ZuperiorBroker] Error fetching positions/orders:', error);
                return;
            }
        }
        // Map positions - filter out invalid ones
        const tvPositions = (Array.isArray(positionsArray) ? positionsArray : []).map((pos)=>{
            try {
                return this._mapApiPositionToTVPosition(pos);
            } catch (error) {
                console.error('[ZuperiorBroker] Error mapping position:', error, pos);
                return null;
            }
        }).filter((p)=>p !== null && !!p.id && !!p.symbol && p.qty > 0 && p.avgPrice > 0);
        // Map pending orders - filter out invalid ones AND bracket orders (TP/SL)
        const tvOrders = (Array.isArray(pendingArray) ? pendingArray : []).map((order)=>{
            try {
                if (!order || typeof order !== 'object') {
                    return null;
                }
                const mappedOrder = this._mapApiOrderToTVOrder(order);
                return mappedOrder;
            } catch (error) {
                console.error('[ZuperiorBroker] Error mapping order:', error, order);
                return null;
            }
        }).filter((o)=>{
            if (!o || !o.id || !o.symbol) {
                return false;
            }
            // Filter out bracket orders (TP/SL) - they should only be shown as position brackets
            if (o.id && (o.id.includes('TP-') || o.id.includes('SL-'))) {
                return false;
            }
            if (o.status === __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].Inactive) {
                return false;
            }
            return true;
        });
        // Create bracket orders for positions with TP/SL using helper methods
        const bracketOrders = [];
        if (Array.isArray(tvPositions)) {
            tvPositions.forEach((p)=>{
                // Create TP bracket order if takeProfit is set
                if (p.takeProfit && p.takeProfit > 0 && !isNaN(p.takeProfit) && isFinite(p.takeProfit)) {
                    try {
                        const tpBracket = this._createTakeProfitBracket(p);
                        bracketOrders.push(tpBracket);
                    } catch (error) {
                        console.error('[ZuperiorBroker] Error creating TP bracket:', error);
                    }
                }
                // Create SL bracket order if stopLoss is set
                if (p.stopLoss && p.stopLoss > 0 && !isNaN(p.stopLoss) && isFinite(p.stopLoss)) {
                    try {
                        const slBracket = this._createStopLossBracket(p);
                        bracketOrders.push(slBracket);
                    } catch (error) {
                        console.error('[ZuperiorBroker] Error creating SL bracket:', error);
                    }
                }
            });
        }
        // Create bracket orders for pending orders with TP/SL
        const orderBracketOrders = [];
        if (Array.isArray(tvOrders)) {
            tvOrders.forEach((o)=>{
                if (o.takeProfit && o.takeProfit > 0) {
                    try {
                        orderBracketOrders.push(this._createOrderTakeProfitBracket(o));
                    } catch (e) {
                        console.error('[ZuperiorBroker] Error creating order TP bracket:', e);
                    }
                }
                if (o.stopLoss && o.stopLoss > 0) {
                    try {
                        orderBracketOrders.push(this._createOrderStopLossBracket(o));
                    } catch (e) {
                        console.error('[ZuperiorBroker] Error creating order SL bracket:', e);
                    }
                }
            });
        }
        // Combine pending orders with bracket orders
        const allOrders = [
            ...Array.isArray(tvOrders) ? tvOrders : [],
            ...bracketOrders,
            ...orderBracketOrders
        ];
        // Keep preview order and its brackets if they exist in internal state
        Object.keys(this._orderById).forEach((id)=>{
            if (id.toString().startsWith(PREVIEW_ORDER_ID)) {
                const pOrder = this._orderById[id];
                if (!allOrders.find((o)=>o.id === pOrder.id)) {
                    allOrders.push(pOrder);
                }
            }
        });
        // Build clean positions map
        const cleanPositions = [];
        const positionMap = {};
        if (Array.isArray(tvPositions)) {
            tvPositions.forEach((p)=>{
                try {
                    const cleanPosition = this._createCleanPosition(p);
                    cleanPositions.push(cleanPosition);
                    positionMap[cleanPosition.id] = cleanPosition;
                } catch (error) {
                    console.error('[ZuperiorBroker] Error creating clean position:', error, p);
                }
            });
        }
        // Update internal state (always)
        this._positions = Array.isArray(tvPositions) ? [
            ...tvPositions
        ] : [];
        // Keep all orders (pending + brackets) so TradingView can track edits/drags
        this._orders = Array.isArray(allOrders) ? [
            ...allOrders
        ] : [];
        this._positionById = positionMap;
        // Update orderById map with ALL orders (including brackets)
        const orderMap = {};
        if (Array.isArray(allOrders)) {
            allOrders.forEach((o)=>{
                if (o && o.id) {
                    orderMap[o.id] = o;
                }
            });
        }
        this._orderById = orderMap;
        // Notify Account Manager tables (if subscribed)
        this._positionsSubscription.fire({});
        this._ordersSubscription.fire({});
        // Notify TradingView if widget is ready
        if (this._isWidgetReady) {
            // Step 1: Detect and handle CLOSED positions (Diff against previous state)
            const previousPositionIds = new Set(prevPositions.map((p)=>p.id));
            const newPositionIds = new Set(cleanPositions.map((p)=>p.id));
            previousPositionIds.forEach((prevId)=>{
                if (!newPositionIds.has(prevId)) {
                    console.log('[ZuperiorBroker] Detected external close for position:', prevId);
                    const closedPosition = prevPositionMap[prevId];
                    if (closedPosition && this._host && typeof this._host.positionUpdate === 'function') {
                        this._host.positionUpdate({
                            ...closedPosition,
                            qty: 0,
                            avgPrice: 0
                        });
                    }
                }
            });
            // Notify TradingView with clean positions
            if (cleanPositions.length > 0) {
                cleanPositions.forEach((cleanPosition)=>{
                    try {
                        // For positions, we usually notify more frequently for P/L updates
                        if (this._host && typeof this._host.positionUpdate === 'function') {
                            this._host.positionUpdate(cleanPosition);
                        }
                        if (cleanPosition.pl !== undefined && typeof cleanPosition.pl === 'number' && this._host && typeof this._host.plUpdate === 'function') {
                            this._host.plUpdate(cleanPosition.symbol, cleanPosition.pl);
                        }
                    } catch (error) {
                        console.error('[ZuperiorBroker] Error updating position:', error, cleanPosition);
                    }
                });
            }
            // Step 2: Send bracket orders via orderUpdate() ONLY IF CHANGED
            const allBracketOrders = [
                ...bracketOrders,
                ...orderBracketOrders
            ];
            if (Array.isArray(allBracketOrders) && allBracketOrders.length > 0) {
                allBracketOrders.forEach((bracket)=>{
                    try {
                        if (bracket && this._host && typeof this._host.orderUpdate === 'function') {
                            // Determine if we should notify
                            const prevBracket = prevOrderMap[bracket.id];
                            let shouldNotify = !prevBracket;
                            if (prevBracket) {
                                const newPrice = bracket.limitPrice || bracket.stopPrice;
                                const oldPrice = prevBracket.limitPrice || prevBracket.stopPrice;
                                if (newPrice !== oldPrice || bracket.qty !== prevBracket.qty || bracket.status !== prevBracket.status) {
                                    shouldNotify = true;
                                }
                            }
                            if (shouldNotify) {
                                if (bracket.parentType === undefined) {
                                    bracket.parentType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ParentType"].Position;
                                }
                                // CRITICAL: Calculate projected P/L at bracket price
                                if (bracket.parentId) {
                                    const parentPosition = this._positionById[bracket.parentId];
                                    const parentOrder = this._orderById[bracket.parentId];
                                    // Use position if parent is a position, otherwise order price as reference
                                    if (parentPosition && parentPosition.avgPrice) {
                                        const bracketPrice = bracket.limitPrice || bracket.stopPrice;
                                        if (bracketPrice && parentPosition.avgPrice) {
                                            const fullVolume = parentPosition.qty * 10000;
                                            const priceDiff = bracketPrice - parentPosition.avgPrice;
                                            const plAtBracket = priceDiff * fullVolume * (parentPosition.side === __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Sell ? -1 : 1);
                                            bracket.pl = plAtBracket * 100;
                                        } else if (parentPosition.pl !== undefined && parentPosition.pl !== null) {
                                            bracket.pl = parentPosition.pl * 100;
                                        }
                                    } else if (parentOrder) {
                                        // For order brackets, no P/L calc needed; ensure parentType is Order
                                        bracket.parentType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ParentType"].Order;
                                    }
                                }
                                this._host.orderUpdate(bracket);
                            }
                        }
                    } catch (error) {
                        console.error('[ZuperiorBroker] Error updating bracket order:', error, bracket);
                    }
                });
            }
            // Step 3: Update pending orders ONLY IF CHANGED
            if (Array.isArray(tvOrders)) {
                tvOrders.forEach((o)=>{
                    try {
                        if (o && this._host && typeof this._host.orderUpdate === 'function') {
                            const prevOrder = prevOrderMap[o.id];
                            let shouldNotify = !prevOrder;
                            if (prevOrder) {
                                if (o.limitPrice !== prevOrder.limitPrice || o.stopPrice !== prevOrder.stopPrice || o.qty !== prevOrder.qty || o.status !== prevOrder.status) {
                                    shouldNotify = true;
                                }
                            }
                            if (shouldNotify) {
                                this._host.orderUpdate(o);
                            }
                        }
                    } catch (error) {
                        console.error('[ZuperiorBroker] Error updating order:', error, o);
                    }
                });
            }
            // Step 4: Cancel removed orders (including brackets)
            const newOrderIds = new Set(Object.keys(orderMap));
            Object.keys(prevOrderMap).forEach((prevId)=>{
                if (!newOrderIds.has(prevId)) {
                    const removedOrder = prevOrderMap[prevId];
                    if (removedOrder && this._host && typeof this._host.orderUpdate === 'function') {
                        this._host.orderUpdate({
                            ...removedOrder,
                            status: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].Canceled
                        });
                    }
                }
            });
        }
    }
    _mapApiPositionToTVPosition(apiPos) {
        const ticket = apiPos.ticket || apiPos.Ticket || apiPos.PositionId || apiPos.id;
        const id = String(ticket);
        // API uses Action field: 0 = Buy, 1 = Sell
        const action = apiPos.Action !== undefined ? apiPos.Action : apiPos.action !== undefined ? apiPos.action : undefined;
        const typeStr = (apiPos.type || apiPos.Type || '').toString();
        let isBuy = false;
        // Priority 1: Check Action field (0 = Buy, 1 = Sell)
        if (action !== undefined) {
            isBuy = action === 0 || String(action) === '0';
        } else if (typeStr === 'Buy') {
            isBuy = true;
        } else if (typeStr === 'Sell') {
            isBuy = false;
        } else {
            isBuy = typeStr.toLowerCase().includes('buy');
        }
        const side = isBuy ? __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Buy : __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Sell;
        const openPrice = Number(apiPos.openPrice || apiPos.OpenPrice || apiPos.PriceOpen || apiPos.priceOpen || apiPos.price || apiPos.Price || 0);
        const currentPrice = Number(apiPos.currentPrice || apiPos.CurrentPrice || apiPos.PriceCurrent || apiPos.priceCurrent || apiPos.price || apiPos.Price || openPrice);
        const rawVolume = apiPos.volume || apiPos.Volume || apiPos.units || 0;
        const volumeLots = apiPos.volumeLots || apiPos.VolumeLots;
        let volume;
        if (volumeLots !== undefined && volumeLots !== null) {
            volume = Number(volumeLots);
        } else {
            const numVolume = Math.abs(Number(rawVolume));
            volume = numVolume / 10000;
        }
        const profit = Number(apiPos.profit || apiPos.Profit || apiPos.pl || apiPos.PL || 0);
        const symbol = apiPos.symbol || apiPos.Symbol || '';
        return {
            id: id,
            symbol: symbol,
            qty: volume,
            side: side,
            sideText: isBuy ? 'Buy' : 'Sell',
            avgPrice: openPrice,
            takeProfit: Number(apiPos.takeProfit || apiPos.TakeProfit || apiPos.PriceTP || apiPos.TP || apiPos.tp || 0) || undefined,
            stopLoss: Number(apiPos.stopLoss || apiPos.StopLoss || apiPos.PriceSL || apiPos.SL || apiPos.sl || 0) || undefined,
            profit: profit,
            pl: profit,
            text: " "
        };
    }
    _mapApiOrderToTVOrder(apiOrder) {
        const ticket = apiOrder.ticket || apiOrder.Ticket || apiOrder.orderId || apiOrder.OrderId || apiOrder.id;
        const id = String(ticket);
        if (!id) return null;
        const symbol = apiOrder.symbol || apiOrder.Symbol;
        if (!symbol) return null;
        // Orders API returns numeric Type field:
        // 0 = Buy, 1 = Sell, 2 = Buy Limit, 3 = Sell Limit, 4 = Buy Stop, 5 = Sell Stop
        const orderType = apiOrder.Type ?? apiOrder.type ?? apiOrder.OrderType ?? apiOrder.orderType;
        let isBuy = false;
        let tvOrderType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Limit;
        let typeText = '';
        if (typeof orderType === 'number') {
            switch(orderType){
                case 0:
                    isBuy = true;
                    tvOrderType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Market;
                    typeText = 'Buy';
                    break;
                case 1:
                    isBuy = false;
                    tvOrderType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Market;
                    typeText = 'Sell';
                    break;
                case 2:
                    isBuy = true;
                    tvOrderType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Limit;
                    typeText = 'Buy Limit';
                    break;
                case 3:
                    isBuy = false;
                    tvOrderType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Limit;
                    typeText = 'Sell Limit';
                    break;
                case 4:
                    isBuy = true;
                    tvOrderType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Stop;
                    typeText = 'Buy Stop';
                    break;
                case 5:
                    isBuy = false;
                    tvOrderType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Stop;
                    typeText = 'Sell Stop';
                    break;
                default:
                    // Fallback
                    isBuy = true;
                    tvOrderType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Limit;
                    typeText = 'Unknown';
            }
        } else {
            // Fallback to string parsing
            const typeStr = String(orderType || '').toLowerCase();
            isBuy = typeStr.includes('buy');
            if (typeStr.includes('limit')) {
                tvOrderType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Limit;
            } else if (typeStr.includes('stop')) {
                tvOrderType = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Stop;
            }
            typeText = typeStr;
        }
        const side = isBuy ? __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Buy : __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Sell;
        // Map API status to TV status - pending orders are Working
        const status = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].Working;
        // Orders API uses Volume field (in MT5 format: 1 = 0.01 lots, 100 = 1 lot)
        const rawVolume = apiOrder.Volume || apiOrder.volume || apiOrder.units || 0;
        const volumeLots = apiOrder.VolumeLots || apiOrder.volumeLots;
        let volume;
        if (volumeLots !== undefined && volumeLots !== null) {
            volume = Number(volumeLots);
        } else {
            // Convert MT5 volume to lots: divide by 100
            const numVolume = Math.abs(Number(rawVolume));
            volume = numVolume / 100;
        }
        // Orders API uses PriceOrder for the order price
        const openPrice = Number(apiOrder.PriceOrder || apiOrder.priceOrder || apiOrder.OpenPrice || apiOrder.openPrice || apiOrder.Price || apiOrder.price || 0);
        const mappedOrderType = tvOrderType;
        const mappedSide = side;
        return {
            id: id,
            symbol: symbol,
            qty: volume,
            side: side,
            sideText: isBuy ? 'Buy' : 'Sell',
            type: tvOrderType,
            status: status,
            limitPrice: tvOrderType === __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Limit ? openPrice : undefined,
            stopPrice: tvOrderType === __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Stop ? openPrice : undefined,
            takeProfit: Number(apiOrder.PriceTP || apiOrder.priceTP || apiOrder.TakeProfit || apiOrder.takeProfit || 0) || undefined,
            stopLoss: Number(apiOrder.PriceSL || apiOrder.priceSL || apiOrder.StopLoss || apiOrder.stopLoss || 0) || undefined,
            text: " "
        };
    }
    _createCleanPosition(p) {
        // Clean position for TV display (similar to original)
        return {
            ...p,
            takeProfit: p.takeProfit,
            stopLoss: p.stopLoss
        };
    }
    _createTakeProfitBracket(position) {
        return {
            id: `${position.id}_TP`,
            symbol: position.symbol,
            qty: position.qty,
            side: changeSide(position.side),
            type: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Limit,
            status: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].Working,
            limitPrice: position.takeProfit,
            parentId: position.id,
            parentType: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ParentType"].Position,
            text: "TP"
        };
    }
    _createStopLossBracket(position) {
        return {
            id: `${position.id}_SL`,
            symbol: position.symbol,
            qty: position.qty,
            side: changeSide(position.side),
            type: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Stop,
            status: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].Working,
            stopPrice: position.stopLoss,
            parentId: position.id,
            parentType: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ParentType"].Position,
            text: "SL"
        };
    }
    _isBracketOrder(order) {
        if (!order) return false;
        if (order.parentId || order.parentType !== undefined) return true;
        const id = (order.id || '').toString();
        return id.includes('_TP') || id.includes('_SL') || id.includes('TP-') || id.includes('SL-');
    }
    // Brackets for pending orders (use parentType=Order)
    _createOrderTakeProfitBracket(order) {
        const isPreview = order.id === PREVIEW_ORDER_ID;
        return {
            id: `${order.id}_TP`,
            symbol: order.symbol,
            qty: order.qty,
            side: changeSide(order.side),
            type: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Limit,
            status: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].Working,
            limitPrice: order.takeProfit,
            parentId: order.id,
            parentType: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ParentType"].Order,
            text: "TP",
            sideText: isPreview ? " " : undefined,
            typeText: isPreview ? " " : undefined,
            qtyText: isPreview ? " " : undefined
        };
    }
    _createOrderStopLossBracket(order) {
        const isPreview = order.id === PREVIEW_ORDER_ID;
        return {
            id: `${order.id}_SL`,
            symbol: order.symbol,
            qty: order.qty,
            side: changeSide(order.side),
            type: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Stop,
            status: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].Working,
            stopPrice: order.stopLoss,
            parentId: order.id,
            parentType: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ParentType"].Order,
            text: "SL",
            sideText: isPreview ? " " : undefined,
            typeText: isPreview ? " " : undefined,
            qtyText: isPreview ? " " : undefined
        };
    }
    chartContextMenuActions(context, options) {
        return Promise.resolve([]);
    }
    isTradable(symbol) {
        return Promise.resolve({
            tradable: true
        });
    }
    async placeOrder(preOrder) {
        console.log('[ZuperiorBroker] placeOrder called:', preOrder);
        if (!this._accessToken || !this._accountId) {
            return Promise.reject('Not authenticated');
        }
        // Pause polling
        this._lastActionTime = Date.now();
        // Normalize symbol: convert trailing M/R to m/r
        const symbol = preOrder.symbol.replace(/M$/, 'm').replace(/R$/, 'r');
        const side = preOrder.side === 1 ? 'buy' : 'sell';
        const volume = preOrder.qty; // already in lots? Standard TV sends what we configured (qty)
        try {
            if (preOrder.type === __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Market) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metaapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["placeMarketOrderDirect"])({
                    accountId: this._accountId,
                    accessToken: this._accessToken,
                    symbol: symbol,
                    side: side,
                    volume: volume,
                    stopLoss: preOrder.stopLoss,
                    takeProfit: preOrder.takeProfit
                });
            } else {
                // Pending
                const price = preOrder.limitPrice || preOrder.stopPrice || 0;
                const orderType = preOrder.type === __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Limit ? 'limit' : 'stop'; // simplified
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metaapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["placePendingOrderDirect"])({
                    accountId: this._accountId,
                    accessToken: this._accessToken,
                    symbol: symbol,
                    side: side,
                    volume: volume,
                    price: price,
                    orderType: orderType,
                    stopLoss: preOrder.stopLoss,
                    takeProfit: preOrder.takeProfit
                });
            }
            // Refresh soon (force redraw quickly once backend confirms)
            setTimeout(()=>this._fetchPositionsAndOrders(true), 600);
            return {};
        } catch (e) {
            console.error('Place order failed', e);
            throw e;
        }
    }
    // TradingView calls this when a pending/order line is dragged
    async modifyOrder(order, confirmId) {
        console.log('[ZuperiorBroker] modifyOrder called:', order.id, order);
        if (!this._accessToken || !this._accountId) {
            return Promise.reject('Not authenticated');
        }
        this._lastActionTime = Date.now();
        const originalOrder = this._orderById[order.id];
        if (!originalOrder) {
            console.error('[ZuperiorBroker] modifyOrder failed: Order not found', order.id);
            return Promise.reject('Order not found');
        }
        // Handle bracket order modification (dragging TP/SL lines)
        if (order.parentId !== undefined) {
            const isTP = order.id.toString().includes('_TP');
            const isSL = order.id.toString().includes('_SL');
            // TradingView can send the dragged price in different fields; normalize
            const newPriceRaw = order.limitPrice ?? order.stopPrice ?? order.price;
            const newPrice = typeof newPriceRaw === 'string' ? parseFloat(newPriceRaw) : newPriceRaw;
            const mod = {};
            if (isTP && newPrice !== undefined) mod.takeProfit = newPrice;
            if (isSL && newPrice !== undefined) mod.stopLoss = newPrice;
            console.log('[ZuperiorBroker] modifyOrder: Bracket drag detected');
            console.log('[ZuperiorBroker] modifyOrder: Parent ID:', order.parentId);
            console.log('[ZuperiorBroker] modifyOrder: Parent Type:', order.parentType);
            console.log('[ZuperiorBroker] modifyOrder: Modification:', mod);
            console.log('[ZuperiorBroker] modifyOrder: Is Preview?', order.parentId === 'PREVIEW_ORDER_ID');
            if (order.parentType === __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ParentType"].Position) {
                return this.editPositionBrackets(order.parentId, mod);
            } else {
                // This will call editOrder which emits __ON_ORDER_PREVIEW_CHANGE__ for preview orders
                console.log('[ZuperiorBroker] modifyOrder: Calling editOrder for bracket modification');
                return this.editOrder(order.parentId, mod);
            }
        }
        // Handle pending order modification (dragging order line)
        const pendingPriceRaw = order.limitPrice ?? order.stopPrice ?? order.price;
        const pendingPrice = typeof pendingPriceRaw === 'string' ? parseFloat(pendingPriceRaw) : pendingPriceRaw;
        originalOrder.limitPrice = order.limitPrice !== undefined ? order.limitPrice : originalOrder.limitPrice;
        originalOrder.stopPrice = order.stopPrice !== undefined ? order.stopPrice : originalOrder.stopPrice;
        // If neither limitPrice nor stopPrice is present but price is, apply it to the correct field based on order type
        if (pendingPrice !== undefined) {
            if (originalOrder.type === __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Stop) {
                originalOrder.stopPrice = pendingPrice;
            } else {
                originalOrder.limitPrice = pendingPrice;
            }
        }
        originalOrder.takeProfit = order.takeProfit !== undefined ? order.takeProfit : originalOrder.takeProfit;
        originalOrder.stopLoss = order.stopLoss !== undefined ? order.stopLoss : originalOrder.stopLoss;
        originalOrder.qty = order.qty !== undefined ? order.qty : originalOrder.qty;
        this._orderById[order.id] = originalOrder;
        const newTP = originalOrder.takeProfit;
        const newSL = originalOrder.stopLoss;
        // Regenerate brackets
        delete this._orderById[`${order.id}_TP`];
        delete this._orderById[`${order.id}_SL`];
        this._orders = this._orders.filter((o)=>!(o.id === `${order.id}_TP` || o.id === `${order.id}_SL`));
        if (newTP && newTP > 0) {
            const tpB = this._createOrderTakeProfitBracket(originalOrder);
            this._orderById[tpB.id] = tpB;
            this._orders.push(tpB);
        }
        if (newSL && newSL > 0) {
            const slB = this._createOrderStopLossBracket(originalOrder);
            this._orderById[slB.id] = slB;
            this._orders.push(slB);
        }
        this._notifyAllPositionsAndOrders();
        // Persist to API
        try {
            // SKIP API FOR PREVIEW
            if (order.id === PREVIEW_ORDER_ID) {
                console.log('[ZuperiorBroker] modifyOrder: Skipping API for preview order');
                // Emit event for OrderPanel sync
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                return Promise.resolve();
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metaapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["modifyPendingOrderDirect"])({
                accountId: this._accountId,
                accessToken: this._accessToken,
                orderId: order.id,
                price: originalOrder.type === __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Limit ? originalOrder.limitPrice : originalOrder.stopPrice,
                stopLoss: newSL,
                takeProfit: newTP
            });
            setTimeout(()=>this._fetchPositionsAndOrders(true), 400);
        } catch (e) {
            console.error('[ZuperiorBroker] modifyOrder API call failed:', e);
            this._fetchPositionsAndOrders();
            throw e;
        }
    }
    async cancelOrder(orderId) {
        if (!this._accessToken || !this._accountId) return Promise.reject("Auth failed");
        console.log('[ZuperiorBroker] cancelOrder called for:', orderId);
        // CHECK IF THIS IS A BRACKET CANCELLATION
        const isTP = orderId.endsWith('_TP');
        const isSL = orderId.endsWith('_SL');
        if (isTP || isSL) {
            const parentId = orderId.replace('_TP', '').replace('_SL', '');
            console.log('[ZuperiorBroker] Bracket cancellation detected. Modifying parent:', parentId);
            // Check if parent is a position
            if (this._positionById[parentId]) {
                const modification = isTP ? {
                    takeProfit: 0
                } : {
                    stopLoss: 0
                };
                return this.editPositionBrackets(parentId, modification);
            }
            // Check if parent is an order
            if (this._orderById[parentId]) {
                const modification = isTP ? {
                    takeProfit: 0
                } : {
                    stopLoss: 0
                };
                return this.editOrder(parentId, modification);
            }
            console.warn('[ZuperiorBroker] Parent entity not found for bracket cancel:', parentId);
            return Promise.resolve(); // Fallback
        }
        // Optimistic update for regular orders
        const order = this._orderById[orderId];
        if (order) {
            // Remove from maps
            delete this._orderById[orderId];
            // Remove from array
            this._orders = this._orders.filter((o)=>o.id !== orderId);
            // Notify chart
            this._notifyAllPositionsAndOrders();
        }
        if (orderId === PREVIEW_ORDER_ID) {
            return Promise.resolve();
        }
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metaapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cancelPendingOrderDirect"])({
                accountId: this._accountId,
                accessToken: this._accessToken,
                orderId: orderId
            });
            setTimeout(()=>this._fetchPositionsAndOrders(true), 400);
        } catch (e) {
            console.error('Cancel order failed', e);
            // Rollback if failed (fetch will restore it)
            this._fetchPositionsAndOrders();
            throw e;
        }
    }
    _notifyBracketCancelled(bracketId, bracketObj) {
        const bracket = bracketObj || this._orderById[bracketId];
        if (this._host && typeof this._host.orderUpdate === 'function') {
            this._host.orderUpdate({
                ...bracket || {
                    id: bracketId
                },
                status: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].Canceled
            });
        }
    }
    async editPositionBrackets(positionId, modification) {
        if (!this._accessToken || !this._accountId) return Promise.reject("Auth failed");
        // Pause polling to protect optimistic update
        this._lastActionTime = Date.now();
        // 1. Capture current state for rollback
        const originalPosition = this._positionById[positionId];
        if (!originalPosition) {
            console.error('[ZuperiorBroker] Position not found for edit:', positionId);
            return;
        }
        // Clone for safety
        const originalState = {
            ...originalPosition
        };
        // Normalize TP/SL values (TradingView may send null/undefined to clear)
        // Preserve existing brackets when the other one is modified.
        const newTPRaw = modification.takeProfit ?? modification.tp;
        const newSLRaw = modification.stopLoss ?? modification.sl;
        const newTP = newTPRaw === null ? 0 : newTPRaw === undefined || isNaN(Number(newTPRaw)) ? originalPosition.takeProfit ?? 0 : Number(newTPRaw);
        const newSL = newSLRaw === null ? 0 : newSLRaw === undefined || isNaN(Number(newSLRaw)) ? originalPosition.stopLoss ?? 0 : Number(newSLRaw);
        // 2. Optimistic Update
        console.log('[ZuperiorBroker] Optimistic Update for Position:', positionId, modification);
        if (newSL !== undefined) originalPosition.stopLoss = newSL;
        if (newTP !== undefined) originalPosition.takeProfit = newTP;
        // Update _positions array reference
        const index = this._positions.findIndex((p)=>p.id === positionId);
        if (index !== -1) {
            this._positions[index] = {
                ...originalPosition
            };
            // Ensure map points to new object reference
            this._positionById[positionId] = this._positions[index];
        }
        // CRITICAL: Update existing brackets in-place if possible, or create new ones
        const tpId = `${positionId}_TP`;
        const slId = `${positionId}_SL`;
        const existingTP = this._orderById[tpId];
        const existingSL = this._orderById[slId];
        // Regenerate brackets with new values
        const newPos = this._positionById[positionId];
        // --- Handle TP Bracket ---
        if (newPos.takeProfit && newPos.takeProfit > 0) {
            if (existingTP) {
                // Update existing TP bracket (Immutable update)
                const updatedTP = {
                    ...existingTP,
                    limitPrice: newPos.takeProfit,
                    qty: newPos.qty,
                    status: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].Working
                };
                this._orderById[tpId] = updatedTP;
                // Update array reference
                const tpIndex = this._orders.findIndex((o)=>o.id === tpId);
                if (tpIndex !== -1) {
                    this._orders[tpIndex] = updatedTP;
                } else {
                    // Should be in array if in map, but safe fallback
                    this._orders.push(updatedTP);
                }
                console.log('[ZuperiorBroker] Updated existing Position TP Bracket:', updatedTP.id, updatedTP.limitPrice);
            } else {
                // Create new TP bracket
                try {
                    const tpBracket = this._createTakeProfitBracket(newPos);
                    this._orderById[tpBracket.id] = tpBracket;
                    this._orders.push(tpBracket);
                    console.log('[ZuperiorBroker] Created new Position TP Bracket:', tpBracket);
                } catch (e) {
                    console.error('[ZuperiorBroker] Error creating TP bracket', e);
                }
            }
        } else {
            // TP removed
            if (existingTP) {
                this._notifyBracketCancelled(tpId, existingTP);
                delete this._orderById[tpId];
                this._orders = this._orders.filter((o)=>o.id !== tpId);
            }
        }
        // --- Handle SL Bracket ---
        if (newPos.stopLoss && newPos.stopLoss > 0) {
            if (existingSL) {
                // Update existing SL bracket (Immutable update)
                const updatedSL = {
                    ...existingSL,
                    stopPrice: newPos.stopLoss,
                    qty: newPos.qty,
                    status: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].Working
                };
                this._orderById[slId] = updatedSL;
                // Update array reference
                const slIndex = this._orders.findIndex((o)=>o.id === slId);
                if (slIndex !== -1) {
                    this._orders[slIndex] = updatedSL;
                } else {
                    this._orders.push(updatedSL);
                }
                console.log('[ZuperiorBroker] Updated existing Position SL Bracket:', updatedSL.id, updatedSL.stopPrice);
            } else {
                // Create new SL bracket
                try {
                    const slBracket = this._createStopLossBracket(newPos);
                    this._orderById[slBracket.id] = slBracket;
                    this._orders.push(slBracket);
                    console.log('[ZuperiorBroker] Created new Position SL Bracket:', slBracket);
                } catch (e) {
                    console.error('[ZuperiorBroker] Error creating SL bracket', e);
                }
            }
        } else {
            // SL removed
            if (existingSL) {
                this._notifyBracketCancelled(slId, existingSL);
                delete this._orderById[slId];
                this._orders = this._orders.filter((o)=>o.id !== slId);
            }
        }
        // 3. Notify Chart IMMEDIATELY
        this._notifyAllPositionsAndOrders();
        try {
            // 4. API Call in Background
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metaapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["modifyPositionDirect"])({
                accountId: this._accountId,
                accessToken: this._accessToken,
                positionId: positionId,
                stopLoss: newSL,
                takeProfit: newTP
            });
            // Fetch validation after a short delay to confirm backend state
            setTimeout(()=>this._fetchPositionsAndOrders(true), 400);
        } catch (e) {
            console.error('Modify position failed', e);
            // 5. Rollback on Failure
            console.log('[ZuperiorBroker] Rolling back optimistic update');
            const posToRevert = this._positionById[positionId];
            if (posToRevert) {
                posToRevert.takeProfit = originalState.takeProfit;
                posToRevert.stopLoss = originalState.stopLoss;
                // Regenerate old brackets? Or just let fetch fix it?
                // Re-notifying will at least correct the position lines
                this._notifyAllPositionsAndOrders();
            }
            // Force re-fetch to ensure sync
            this._fetchPositionsAndOrders(true);
            throw e;
        }
    }
    async closePosition(positionId) {
        if (!this._accessToken || !this._accountId) return Promise.reject("Auth failed");
        console.log('[ZuperiorBroker] closePosition called for:', positionId);
        // Optimistic update: Remove from local state immediately
        const position = this._positionById[positionId];
        if (position) {
            // Notify chart/AM of closure BEFORE removing from state
            if (this._host && typeof this._host.positionUpdate === 'function') {
                const closedPosition = {
                    ...position,
                    qty: 0,
                    avgPrice: 0
                };
                console.log('[ZuperiorBroker] Optimistic Close - Notifying host:', closedPosition);
                this._host.positionUpdate(closedPosition);
                if (position.pl !== undefined && typeof this._host.plUpdate === 'function') {
                // Update P/L to 0 or remove it? Usually just updating position is enough.
                }
            }
            // Remove from maps
            delete this._positionById[positionId];
            delete this._orderById[`${positionId}_TP`];
            delete this._orderById[`${positionId}_SL`];
            // Remove from array
            this._positions = this._positions.filter((p)=>p.id !== positionId);
            // Notify chart (updates the rest)
            this._notifyAllPositionsAndOrders();
        }
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metaapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["closePositionDirect"])({
                accountId: this._accountId,
                accessToken: this._accessToken,
                positionId: positionId,
                volume: position ? position.qty : 0 // Pass known volume (lots) to help API
            });
            // Fetch validation after delay
            setTimeout(()=>this._fetchPositionsAndOrders(true), 500);
        } catch (e) {
            console.error('Close position failed', e);
            // Re-fetch to restore if failed
            this._fetchPositionsAndOrders(true);
            throw e;
        }
    }
    accountManagerInfo() {
        const orderColumns = [
            {
                id: 'symbol',
                label: 'Symbol',
                dataFields: [
                    'symbol'
                ],
                formatter: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StandardFormatterName"].Text
            },
            {
                id: 'side',
                label: 'Side',
                dataFields: [
                    'sideText'
                ],
                formatter: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StandardFormatterName"].Text
            },
            {
                id: 'qty',
                label: 'Qty',
                dataFields: [
                    'qty'
                ],
                formatter: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StandardFormatterName"].Fixed
            },
            {
                id: 'status',
                label: 'Status',
                dataFields: [
                    'status'
                ],
                formatter: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StandardFormatterName"].Text
            }
        ];
        const positionColumns = [
            {
                id: 'symbol',
                label: 'Symbol',
                dataFields: [
                    'symbol'
                ],
                formatter: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StandardFormatterName"].Text
            },
            {
                id: 'side',
                label: 'Side',
                dataFields: [
                    'sideText'
                ],
                formatter: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StandardFormatterName"].Text
            },
            {
                id: 'qty',
                label: 'Qty',
                dataFields: [
                    'qty'
                ],
                formatter: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StandardFormatterName"].Fixed
            },
            {
                id: 'avgPrice',
                label: 'Price',
                dataFields: [
                    'avgPrice'
                ],
                formatter: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StandardFormatterName"].FormatPrice
            },
            {
                id: 'profit',
                label: 'Profit',
                dataFields: [
                    'profit'
                ],
                formatter: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StandardFormatterName"].Fixed
            }
        ];
        return {
            accountTitle: 'Zuperior Financial',
            summary: [
                {
                    text: 'Balance',
                    wValue: {
                        subscribe: (onChange)=>{},
                        unsubscribe: (onChange)=>{},
                        value: ()=>this._accountBalance,
                        when: (callback)=>{} // Dummy implementation to satisfy interface
                    },
                    formatter: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StandardFormatterName"].Fixed // Using fixed format
                }
            ],
            orderColumns: orderColumns,
            positionColumns: positionColumns,
            pages: [
                {
                    id: 'positions',
                    title: 'Positions',
                    tables: [
                        {
                            id: 'positions',
                            columns: positionColumns,
                            getData: ()=>Promise.resolve(this._positions),
                            changeDelegate: this._positionsSubscription
                        }
                    ]
                },
                {
                    id: 'orders',
                    title: 'Orders',
                    tables: [
                        {
                            id: 'orders',
                            columns: orderColumns,
                            getData: ()=>Promise.resolve(this._orders),
                            changeDelegate: this._ordersSubscription
                        }
                    ]
                }
            ]
        };
    }
    accountsMetainfo() {
        return Promise.resolve([
            {
                id: this._accountId || '1',
                name: 'Zuperior Main',
                currency: 'USD'
            }
        ]);
    }
    async orders() {
        return Promise.resolve(this._orders);
    }
    async positions() {
        return Promise.resolve(this._positions);
    }
    async executions(symbol) {
        return [];
    }
    currentAccount() {
        return this._accountId || '';
    }
    async symbolInfo(symbol) {
        const symbolUpper = symbol.toUpperCase();
        let pricescale = 100000; // Default Forex
        let minTick = 0.00001;
        if (symbolUpper.includes('JPY') || symbolUpper.includes('XAU')) {
            pricescale = 100;
            minTick = 0.01;
        } else if (symbolUpper.includes('BTC') || symbolUpper.includes('ETH') || symbolUpper.includes('SOL')) {
            pricescale = 100;
            minTick = 0.01;
        }
        return {
            qty: {
                min: 0.01,
                max: 100,
                step: 0.01
            },
            pipSize: minTick,
            pipValue: 1,
            minTick: minTick,
            description: symbol,
            type: 'crypto',
            domVolumePrecision: 2,
            id: symbol,
            name: symbol,
            minMove2: 0,
            pricescale: pricescale,
            minmov: 1,
            fractional: false,
            session: '24x7',
            timezone: 'Etc/UTC',
            has_intraday: true,
            has_no_volume: false,
            data_status: 'streaming'
        };
    }
    formatter(symbol, alignToMinMove) {
        return Promise.resolve({
            format: (value)=>{
                if (value === undefined || value === null) return '';
                return value.toFixed(2);
            }
        });
    }
    spreadFormatter(symbol) {
        return Promise.resolve({
            format: (value)=>{
                if (value === undefined || value === null) return '';
                return value.toFixed(1) + ' pips';
            }
        });
    }
    quantityFormatter(symbol) {
        return Promise.resolve({
            format: (value)=>{
                if (value === undefined || value === null) return '';
                return value.toString();
            }
        });
    }
    pipValueFormatter(symbol) {
        return Promise.resolve({
            format: (value)=>{
                if (value === undefined || value === null) return '';
                return value.toFixed(2);
            }
        });
    }
    async editOrder(orderId, modification) {
        const originalOrder = this._orderById[orderId];
        if (!originalOrder) {
            console.error(`[ZuperiorBroker] Order not found: ${orderId}`);
            return Promise.reject('Order not found');
        }
        console.log('[ZuperiorBroker] editOrder called:', orderId, modification);
        // SKIP API FOR PREVIEW
        console.log("[ZuperiorBroker] editOrder: Checking if preview order:", orderId, "===", PREVIEW_ORDER_ID, "?", orderId === PREVIEW_ORDER_ID);
        if (orderId === PREVIEW_ORDER_ID) {
            console.log('[ZuperiorBroker] editOrder: Skipping API for preview order');
            // Update local state
            const entryPrice = (originalOrder.type === __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Limit ? originalOrder.limitPrice : originalOrder.stopPrice) || 0;
            const side = originalOrder.side; // Buy=1, Sell=-1
            if (modification.limitPrice !== undefined) originalOrder.limitPrice = modification.limitPrice;
            if (modification.stopPrice !== undefined) originalOrder.stopPrice = modification.stopPrice;
            if (modification.qty !== undefined) originalOrder.qty = modification.qty;
            // Direct update for preview order brackets (Allow dragging anywhere for feedback)
            if (modification.takeProfit !== undefined) {
                originalOrder.takeProfit = modification.takeProfit;
            }
            if (modification.stopLoss !== undefined) {
                originalOrder.stopLoss = modification.stopLoss;
            }
            this._orderById[orderId] = originalOrder;
            // Regents brackets (Preserve objects to allow continuous dragging)
            const tpId = `${orderId}_TP`;
            const slId = `${orderId}_SL`;
            if (originalOrder.takeProfit && originalOrder.takeProfit > 0) {
                const existingTP = this._orderById[tpId];
                if (existingTP) {
                    existingTP.limitPrice = originalOrder.takeProfit;
                    this._host.orderUpdate(existingTP);
                } else {
                    const tpB = this._createOrderTakeProfitBracket(originalOrder);
                    this._orderById[tpB.id] = tpB;
                    this._orders.push(tpB);
                    this._host.orderUpdate(tpB);
                }
            } else {
                if (this._orderById[tpId]) {
                    const cancelledTP = {
                        ...this._orderById[tpId],
                        status: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].Canceled
                    };
                    this._host.orderUpdate(cancelledTP);
                    delete this._orderById[tpId];
                    this._orders = this._orders.filter((o)=>o.id !== tpId);
                }
            }
            if (originalOrder.stopLoss && originalOrder.stopLoss > 0) {
                const existingSL = this._orderById[slId];
                if (existingSL) {
                    existingSL.stopPrice = originalOrder.stopLoss;
                    this._host.orderUpdate(existingSL);
                } else {
                    const slB = this._createOrderStopLossBracket(originalOrder);
                    this._orderById[slB.id] = slB;
                    this._orders.push(slB);
                    this._host.orderUpdate(slB);
                }
            } else {
                if (this._orderById[slId]) {
                    const cancelledSL = {
                        ...this._orderById[slId],
                        status: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].Canceled
                    };
                    this._host.orderUpdate(cancelledSL);
                    delete this._orderById[slId];
                    this._orders = this._orders.filter((o)=>o.id !== slId);
                }
            }
            this._notifyAllPositionsAndOrders();
            // Emit event for OrderPanel sync
            console.log("[ZuperiorBroker] editOrder: About to emit __ON_ORDER_PREVIEW_CHANGE__ event", {
                tp: originalOrder.takeProfit,
                sl: originalOrder.stopLoss
            });
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return Promise.resolve();
        }
        this._lastActionTime = Date.now();
        const originalState = {
            ...originalOrder
        };
        const tpId = `${orderId}_TP`;
        const slId = `${orderId}_SL`;
        // capture prior bracket state
        const existingTP = this._orderById[tpId];
        const existingSL = this._orderById[slId];
        // Update local order object with new values
        if (modification.limitPrice !== undefined) originalOrder.limitPrice = modification.limitPrice;
        if (modification.stopPrice !== undefined) originalOrder.stopPrice = modification.stopPrice;
        if (modification.takeProfit !== undefined) originalOrder.takeProfit = modification.takeProfit;
        if (modification.stopLoss !== undefined) originalOrder.stopLoss = modification.stopLoss;
        // --- Handle TP Bracket ---
        if (originalOrder.takeProfit && originalOrder.takeProfit > 0) {
            if (existingTP) {
                // Update existing (Immutable update for React/TV change detection)
                const updatedTP = {
                    ...existingTP,
                    limitPrice: originalOrder.takeProfit,
                    qty: originalOrder.qty,
                    status: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].Working // Force status
                };
                this._orderById[tpId] = updatedTP;
                // Update array reference
                const tpIndex = this._orders.findIndex((o)=>o.id === tpId);
                if (tpIndex !== -1) {
                    this._orders[tpIndex] = updatedTP;
                }
                console.log('[ZuperiorBroker] Updated existing TP bracket (immutable):', updatedTP.id, updatedTP.limitPrice);
            } else {
                // Create new
                const tpBracket = this._createOrderTakeProfitBracket(originalOrder);
                this._orderById[tpBracket.id] = tpBracket;
                this._orders.push(tpBracket);
            }
        } else {
            // TP removed or was never there
            if (existingTP) {
                // Notify cancellation BEFORE deleting
                this._notifyBracketCancelled(tpId, existingTP);
                // Remove from maps and array
                delete this._orderById[tpId];
                this._orders = this._orders.filter((o)=>o.id !== tpId);
            }
        }
        // --- Handle SL Bracket ---
        if (originalOrder.stopLoss && originalOrder.stopLoss > 0) {
            if (existingSL) {
                // Update existing (Immutable update)
                const updatedSL = {
                    ...existingSL,
                    stopPrice: originalOrder.stopLoss,
                    qty: originalOrder.qty,
                    status: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].Working // Force status
                };
                this._orderById[slId] = updatedSL;
                // Update array reference
                const slIndex = this._orders.findIndex((o)=>o.id === slId);
                if (slIndex !== -1) {
                    this._orders[slIndex] = updatedSL;
                }
                console.log('[ZuperiorBroker] Updated existing SL bracket (immutable):', updatedSL.id, updatedSL.stopPrice);
            } else {
                // Create new
                const slBracket = this._createOrderStopLossBracket(originalOrder);
                this._orderById[slBracket.id] = slBracket;
                this._orders.push(slBracket);
            }
        } else {
            // SL removed
            if (existingSL) {
                // Notify cancellation BEFORE deleting
                this._notifyBracketCancelled(slId, existingSL);
                // Remove from maps and array
                delete this._orderById[slId];
                this._orders = this._orders.filter((o)=>o.id !== slId);
            }
        }
        // Update array reference for the parent order (trigger React/TV updates)
        const index = this._orders.findIndex((o)=>o.id === orderId);
        if (index !== -1) {
            // We mutated originalOrder in place, which is inside _orders[index] if it was by reference.
            // But to be safe and trigger change detection, we shallow copy it back.
            this._orders[index] = {
                ...originalOrder
            };
            this._orderById[orderId] = this._orders[index];
        }
        // Notify all updates
        this._notifyAllPositionsAndOrders();
        try {
            // Use values from originalOrder which now contains the merged state
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metaapi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["modifyPendingOrderDirect"])({
                accountId: this._accountId,
                accessToken: this._accessToken,
                orderId: orderId,
                price: originalOrder.limitPrice || originalOrder.stopPrice,
                stopLoss: originalOrder.stopLoss,
                takeProfit: originalOrder.takeProfit
            });
            // Re-fetch to validate
            setTimeout(()=>this._fetchPositionsAndOrders(true), 400);
        } catch (e) {
            console.error('[ZuperiorBroker] Modify order failed', e);
            // Rollback (Simplified: just re-fetch to restore state)
            this._fetchPositionsAndOrders(true);
            throw e;
        }
    }
    async modifyEntity(id, modification) {
        // Check if it's a position
        if (this._positionById[id]) {
            return this.editPositionBrackets(id, modification);
        }
        // Check if it's an order
        if (this._orderById[id]) {
            // Adapter for order modification fields
            const orderMod = {};
            if (modification.tp !== undefined) orderMod.takeProfit = modification.tp;
            if (modification.sl !== undefined) orderMod.stopLoss = modification.sl;
            // Map price if provided (from "Price" field in modal for Pending Orders)
            if (modification.price !== undefined) {
                const order = this._orderById[id];
                if (order.type === __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Limit) {
                    orderMod.limitPrice = modification.price;
                } else if (order.type === __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Stop) {
                    orderMod.stopPrice = modification.price;
                }
            }
            // Pass other fields if present custom ones
            if (modification.limitPrice) orderMod.limitPrice = modification.limitPrice;
            if (modification.stopPrice) orderMod.stopPrice = modification.stopPrice;
            if (modification.takeProfit) orderMod.takeProfit = modification.takeProfit;
            if (modification.stopLoss) orderMod.stopLoss = modification.stopLoss;
            // Update parent order properties to match bracket changes
            // Update parent order properties to match bracket changes
            const entity = this._orderById[id];
            // If this entity is a bracket (has parentId), update the parent.
            // If it's the main order, it's already being updated via editOrder logic, but detailed props need syncing.
            if (entity && entity.parentId) {
                const actualParent = this._orderById[entity.parentId];
                if (actualParent) {
                    if (modification.limitPrice !== undefined) actualParent.takeProfit = modification.limitPrice;
                    if (modification.stopPrice !== undefined) actualParent.stopLoss = modification.stopPrice;
                    if (modification.takeProfit !== undefined) actualParent.takeProfit = modification.takeProfit;
                    if (modification.stopLoss !== undefined) actualParent.stopLoss = modification.stopLoss;
                    // Notify parent update immediately
                    if (this._host && typeof this._host.orderUpdate === 'function') {
                        this._host.orderUpdate(actualParent);
                    }
                }
            } else if (entity) {
                // It is the parent order itself.
                // We still want to ensure prop consistency if we are setting new params
                if (modification.limitPrice !== undefined) entity.takeProfit = modification.limitPrice;
                if (modification.stopPrice !== undefined) entity.stopLoss = modification.stopPrice;
                if (modification.takeProfit !== undefined) entity.takeProfit = modification.takeProfit;
                if (modification.stopLoss !== undefined) entity.stopLoss = modification.stopLoss;
            // Notification happens in editOrder flow usually, but safe to do here if needed. 
            // editOrder will usually handle the main notification.
            }
            return this.editOrder(id, orderMod);
        }
        console.error('[ZuperiorBroker] Entity not found for modification:', id);
        return Promise.reject('Entity not found');
    }
    // TradingView calls this when a pending/order line is dragged
    async moveOrder(orderId, price) {
        console.log('[ZuperiorBroker] moveOrder invoked:', orderId, price);
        const order = this._orderById[orderId];
        if (!order) {
            console.error('[ZuperiorBroker] moveOrder failed: Order not found', orderId);
            return Promise.reject('Order not found');
        }
        // TradingView sometimes sends undefined/strings for preview bracket drags, normalize it here
        const effectivePrice = price !== undefined && !Number.isNaN(price) ? Number(price) : order.limitPrice ?? order.stopPrice;
        if (effectivePrice === undefined || Number.isNaN(effectivePrice)) {
            console.warn('[ZuperiorBroker] moveOrder aborted: invalid price payload', {
                orderId,
                price,
                order
            });
            return Promise.resolve();
        }
        const isTP = orderId.includes('_TP') || orderId.includes('TP-');
        const isSL = orderId.includes('_SL') || orderId.includes('SL-');
        console.log('[ZuperiorBroker] Moving order details:', {
            isTP,
            isSL,
            parentId: order.parentId,
            parentType: order.parentType
        });
        // If this is a bracket of a pending order
        if (order.parentId && order.parentType === __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ParentType"].Order && (isTP || isSL)) {
            const mod = {};
            if (isTP) mod.takeProfit = effectivePrice;
            if (isSL) mod.stopLoss = effectivePrice;
            console.log('[ZuperiorBroker] Moving pending order bracket -> editOrder', order.parentId, mod);
            // For preview orders, emit sync event immediately for real-time update
            if (order.parentId === PREVIEW_ORDER_ID) {
                const parentOrder = this._orderById[order.parentId];
                if (parentOrder) {
                    // Create the event payload manually to ensure it uses the dragged price
                    const payload = {
                        id: order.parentId,
                        price: parentOrder.type === __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Limit ? parentOrder.limitPrice : parentOrder.stopPrice,
                        takeProfit: isTP ? effectivePrice : parentOrder.takeProfit,
                        stopLoss: isSL ? effectivePrice : parentOrder.stopLoss,
                        qty: parentOrder.qty,
                        source: 'chart'
                    };
                    console.log("[ZuperiorBroker] moveOrder: Emitting real-time sync event for preview bracket drag", payload);
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    // Update local state directly to prevent snap-back during drag
                    if (isTP) parentOrder.takeProfit = price;
                    if (isSL) parentOrder.stopLoss = price;
                }
            }
            return this.editOrder(order.parentId, mod);
        }
        // If this is a bracket of a position
        if (order.parentId && order.parentType === __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ParentType"].Position && (isTP || isSL)) {
            const mod = {};
            if (isTP) mod.takeProfit = price;
            if (isSL) mod.stopLoss = price;
            console.log('[ZuperiorBroker] Moving position bracket -> editPositionBrackets', order.parentId, mod);
            return this.editPositionBrackets(order.parentId, mod);
        }
        // Base pending order line drag
        const mod = {};
        if (order.type === __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Stop) {
            mod.stopPrice = effectivePrice;
        } else {
            mod.limitPrice = effectivePrice;
        }
        console.log('[ZuperiorBroker] Moving pending order main line -> editOrder', orderId, mod);
        return this.editOrder(orderId, mod);
    }
    // TradingView calls this when TP/SL of a position is dragged
    async movePositionBrackets(positionId, brackets) {
        console.log('[ZuperiorBroker] movePositionBrackets invoked:', positionId, brackets);
        return this.editPositionBrackets(positionId, brackets);
    }
    // Fallback alias used by some builds
    async movePosition(positionId, brackets) {
        console.log('[ZuperiorBroker] movePosition invoked:', positionId, brackets); // Often same as movePositionBrackets regarding arg signature? No, movePosition might imply modifying execution price which isn't possible, but TV uses it for brackets sometimes.
        // Actually movePosition signature in API is (id, price) usually?
        // But here we mapped it to brackets in previous logic. Let's check signature.
        // If brackets is a price number, it would die.
        // Usually movePosition is for moving the *entry* price (not possible for market positions)
        // But in this library version, it might map to brackets.
        return this.editPositionBrackets(positionId, brackets);
    }
    setOrderPreview(previewData) {
        if (!this._host || typeof this._host.orderUpdate !== 'function') return;
        if (!previewData.side) {
            // Cancel preview
            const existing = this._orderById[PREVIEW_ORDER_ID];
            if (existing) {
                const canceledPreview = {
                    ...existing,
                    status: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].Canceled
                };
                console.log('[ZuperiorBroker] Canceling order preview');
                this._host.orderUpdate(canceledPreview);
                delete this._orderById[PREVIEW_ORDER_ID];
                // Also remove brackets
                delete this._orderById[`${PREVIEW_ORDER_ID}_TP`];
                delete this._orderById[`${PREVIEW_ORDER_ID}_SL`];
                // Also remove from _orders array to keep internal state consistent
                this._orders = this._orders.filter((o)=>!o.id.toString().startsWith(PREVIEW_ORDER_ID));
            }
            return;
        }
        // Create or update preview order
        const side = previewData.side === 'buy' ? __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Buy : __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Side"].Sell;
        const qty = previewData.qty || 1;
        const price = previewData.price || 0;
        const symbol = previewData.symbol || 'XAUUSD';
        const previewOrder = {
            id: PREVIEW_ORDER_ID,
            symbol: symbol,
            side: side,
            qty: qty,
            status: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].Working,
            type: previewData.type === 'stop' ? __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Stop : previewData.type === 'limit' ? __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Limit : __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].Limit,
            limitPrice: price,
            stopPrice: previewData.type === 'stop' ? price : undefined,
            takeProfit: previewData.takeProfit,
            stopLoss: previewData.stopLoss,
            text: " ",
            sideText: " ",
            typeText: " ",
            qtyText: " "
        };
        console.log('[ZuperiorBroker] Setting order preview:', previewOrder);
        this._orderById[PREVIEW_ORDER_ID] = previewOrder;
        // Update _orders array as well so orders() returns it
        const existingIndex = this._orders.findIndex((o)=>o.id === PREVIEW_ORDER_ID);
        if (existingIndex >= 0) {
            this._orders[existingIndex] = previewOrder;
        } else {
            this._orders.push(previewOrder);
        }
        // Handle preview brackets (Preserve objects to allow iteration)
        const tpId = `${PREVIEW_ORDER_ID}_TP`;
        const slId = `${PREVIEW_ORDER_ID}_SL`;
        if (previewOrder.takeProfit && previewOrder.takeProfit > 0) {
            const existingTP = this._orderById[tpId];
            if (existingTP) {
                existingTP.limitPrice = previewOrder.takeProfit;
                this._host.orderUpdate(existingTP);
            } else {
                const tpB = this._createOrderTakeProfitBracket(previewOrder);
                this._orderById[tpB.id] = tpB;
                this._orders.push(tpB);
                this._host.orderUpdate(tpB);
            }
        } else {
            if (this._orderById[tpId]) {
                const cancelledTP = {
                    ...this._orderById[tpId],
                    status: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].Canceled
                };
                this._host.orderUpdate(cancelledTP);
                delete this._orderById[tpId];
                this._orders = this._orders.filter((o)=>o.id !== tpId);
            }
        }
        if (previewOrder.stopLoss && previewOrder.stopLoss > 0) {
            const existingSL = this._orderById[slId];
            if (existingSL) {
                existingSL.stopPrice = previewOrder.stopLoss;
                this._host.orderUpdate(existingSL);
            } else {
                const slB = this._createOrderStopLossBracket(previewOrder);
                this._orderById[slB.id] = slB;
                this._orders.push(slB);
                this._host.orderUpdate(slB);
            }
        } else {
            if (this._orderById[slId]) {
                const cancelledSL = {
                    ...this._orderById[slId],
                    status: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$charting_library$2f$broker$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].Canceled
                };
                this._host.orderUpdate(cancelledSL);
                delete this._orderById[slId];
                this._orders = this._orders.filter((o)=>o.id !== slId);
            }
        }
        this._host.orderUpdate(previewOrder);
        this._notifyAllPositionsAndOrders();
    // NOTE: Do NOT emit __ON_ORDER_PREVIEW_CHANGE__ here!
    // This method is called when OrderPanel updates the preview via __SET_ORDER_PREVIEW__
    // Emitting here would overwrite chart drag events with source: 'panel'
    // The chart emits its own event with source: 'chart' from editOrder when brackets are dragged
    }
}
}),
"[project]/src/components/chart/TVChartContainer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TVChartContainer",
    ()=>TVChartContainer,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$chart$2f$RealtimeDataFeed$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/chart/RealtimeDataFeed.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$chart$2f$ZuperiorBroker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/chart/ZuperiorBroker.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TradingContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/TradingContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AccountContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AccountContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const TVChartContainer = ()=>{
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const brokerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const widgetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { setModifyModalState, lastModification } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TradingContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTrading"])();
    const { currentAccountId, getMetaApiToken } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AccountContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAccount"])();
    const modifyModalPromiseResolve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Standalone state (Keeping symbol state from standalone for now, or should we use TradingContext symbol?)
    // Let's use TradingContext symbol if available, otherwise fallback
    const { symbol: ctxSymbol, setSymbol: ctxSetSymbol } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TradingContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTrading"])();
    const [localSymbol, setLocalSymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('XAUUSD'); // Default fallback
    const activeSymbol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatSymbolDisplay"])(ctxSymbol || localSymbol);
    const setSymbol = ctxSetSymbol || setLocalSymbol;
    // Expose openModifyPositionModal to window for Broker to use
    const openModifyPositionModal = (position, brackets)=>{
        const mappedPosition = {
            ...position,
            openPrice: position.avg_price || position.avgPrice || position.price || position.limitPrice || position.stopPrice,
            currentPrice: position.currentPrice || position.price,
            tp: brackets?.takeProfit || position.takeProfit || position.tp,
            sl: brackets?.stopLoss || position.stopLoss || position.sl,
            pl: position.profit || position.pl || '0.00',
            volume: position.qty || position.volume,
            flag: (position.symbol || '').toLowerCase().replace(/[^a-z0-9]/g, ''),
            ticket: position.id
        };
        setModifyModalState({
            isOpen: true,
            position: mappedPosition
        });
        return new Promise((resolve)=>{
            modifyModalPromiseResolve.current = resolve;
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        setModifyModalState
    ]);
    // Resolve the promise when the modal closes
    const { modifyModalState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TradingContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTrading"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!modifyModalState.isOpen && modifyModalPromiseResolve.current) {
            // If we have a pending promise and the modal closes
            // Check if a modification was made (lastModification set) to determine success
            // But usually just resolving 'false' or 'true' makes the chart proceed.
            // If we resolve 'false', it cancels drag. If 'true', it generally accepts.
            // If the user Saved, 'lastModification' is set, so we can assume success?
            // Actually, if update is handled via broker.modifyEntity, the chart gets the update event.
            // So for the *dialog result*, we can just say 'false' (cancel internal handling) or 'true'.
            // If we return 'true', the chart might try to apply changes itself if we returned an object.
            // But we return boolean.
            // Let's resolve 'false' to ensure the chart doesn't do anything weird, 
            // relying on our explicit 'modifyEntity' call to update the order.
            // Or if we return 'true', it might imply "user confirmed".
            // NOTE: If we dragged, and then closed modal without saving, we want it to snap back.
            // If we saved, our 'modifyEntity' will update the order, and chart will see the update.
            // So resolving 'false' might be safer to prevent double-modification or stuck state?
            // Let's try resolving true if lastModification is present, false otherwise.
            const wasSaved = !!lastModification;
            console.log('[TVChartContainer] Modal closed. Resolving hook promise:', wasSaved);
            modifyModalPromiseResolve.current(wasSaved);
            modifyModalPromiseResolve.current = null;
        }
    }, [
        modifyModalState.isOpen,
        lastModification
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (lastModification && brokerRef.current) {
            console.log('[TVChartContainer] lastModification received:', lastModification);
            if (brokerRef.current.modifyEntity) {
                brokerRef.current.modifyEntity(lastModification.id, lastModification).catch((err)=>console.error(err));
            } else if (brokerRef.current.editPositionBrackets) {
                // Fallback (legacy)
                const sl = lastModification.sl ? parseFloat(lastModification.sl) : undefined;
                const tp = lastModification.tp ? parseFloat(lastModification.tp) : undefined;
                const modifiedBrackets = {
                    ...sl !== undefined && !isNaN(sl) ? {
                        stopLoss: sl
                    } : {},
                    ...tp !== undefined && !isNaN(tp) ? {
                        takeProfit: tp
                    } : {},
                    _skipModal: true
                };
                brokerRef.current.editPositionBrackets(lastModification.id, modifiedBrackets).catch((err)=>console.error(err));
            }
        }
    }, [
        lastModification
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Add version query parameter to force browser to reload standalone.js
        // This ensures the browser uses the correct version that matches the bundles
        const scripts = [
            '/charting_library/charting_library.standalone.js?v=30.3.0',
            '/datafeeds/udf/dist/bundle.js',
            '/broker-sample/dist/bundle.js',
            '/custom-dialogs/dist/bundle.js'
        ];
        const styles = [
            '/custom-dialogs/dist/bundle.css'
        ];
        const initWidget = ()=>{
            if (!window.TradingView || !window.Brokers || !window.CustomDialogs) {
                return;
            }
            // Use our custom RealtimeDataFeed
            const datafeed = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$chart$2f$RealtimeDataFeed$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RealtimeDataFeed"]();
            // Stub callbacks for CustomDialogs or Broker Sample
            // The logic here is simplified to allow the chart to render
            const onCancelOrderResultCallback = ()=>{};
            const onCloseOrderResultCallback = ()=>{};
            const onReversePositionResultCallback = ()=>{};
            const onOrderResultCallback = ()=>{};
            const onPositionResultCallback = ()=>{};
            // We need to initialize these if we want usage of CustomDialogs from inside the bundle
            // Ideally we should minimize reliance on CustomDialogs if we don't have the whole setup
            // But if broker-sample bundle expects them, we initialize them.
            // If they are missing from public/, this will fail.
            // We copied `custom-dialogs` to public, so it should load.
            let customOrderDialog = null;
            let customPositionDialog = null;
            let customCancelOrderDialog = null;
            let customClosePositionDialog = null;
            let customReversePositionDialog = null;
            if (window.CustomDialogs) {
                customCancelOrderDialog = window.CustomDialogs.createCancelOrderDialog(onCancelOrderResultCallback);
                customClosePositionDialog = window.CustomDialogs.createClosePositionDialog(onCloseOrderResultCallback);
                customReversePositionDialog = window.CustomDialogs.createReversePositionDialog(onReversePositionResultCallback);
            }
            const sendOrderRequest = (order)=>{};
            const sendModifyOrder = (order)=>{};
            const redrawChart = ()=>{};
            let createCancelOrderButtonListener = null;
            let createClosePositionButtonListener = null;
            let createReversePositionButtonListener = null;
            const widgetOptions = {
                symbol: activeSymbol,
                interval: '5',
                container: containerRef.current,
                datafeed: datafeed,
                library_path: '/charting_library/',
                locale: 'en',
                fullscreen: false,
                autosize: true,
                theme: 'Dark',
                custom_css_url: '/charting_library/custom.css',
                disabled_features: [
                    'use_localstorage_for_settings',
                    'widgetbar',
                    'right_toolbar',
                    'legend_show_volume',
                    'header_symbol_search',
                    'symbol_search_hot_key',
                    'header_compare',
                    'buy_sell_buttons',
                    'objects_tree_widget',
                    'trading_notifications',
                    'trading_account_manager'
                ],
                enabled_features: [
                    'study_templates',
                    'order_panel',
                    'trading_bracket_orders'
                ],
                charts_storage_url: 'https://saveload.tradingview.com',
                charts_storage_api_version: '1.1',
                client_id: 'trading_platform_demo',
                user_id: 'public_user',
                loading_screen: {
                    backgroundColor: "#02040d"
                },
                overrides: {
                    "paneProperties.background": "#02040d",
                    "paneProperties.backgroundType": "solid",
                    "paneProperties.vertGridProperties.color": "#02040d",
                    "paneProperties.horzGridProperties.color": "#02040d",
                    "mainSeriesProperties.candleStyle.upColor": "#16A34A",
                    "mainSeriesProperties.candleStyle.downColor": "#EF4444",
                    "mainSeriesProperties.candleStyle.borderUpColor": "#16A34A",
                    "mainSeriesProperties.candleStyle.borderDownColor": "#EF4444",
                    "mainSeriesProperties.candleStyle.wickUpColor": "#16A34A",
                    "mainSeriesProperties.candleStyle.wickDownColor": "#EF4444"
                },
                toolbar_bg: '#02040d',
                broker_factory: (host)=>{
                    // Pass getMetaApiToken to broker constructor to enable dynamic auth
                    const broker = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$chart$2f$ZuperiorBroker$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZuperiorBroker"](host, datafeed, currentAccountId, getMetaApiToken);
                    brokerRef.current = broker;
                    // Setup dialogs if available
                    if (window.CustomDialogs) {
                        customOrderDialog = window.CustomDialogs.createOrderDialog(broker, onOrderResultCallback);
                        customPositionDialog = window.CustomDialogs.createPositionDialog(broker, onPositionResultCallback);
                        // createCancelOrderButtonListener = window.CustomDialogs.createCancelOrderButtonListenerFactory(broker);
                        // Custom Close Position Listener: Bypass modal, call broker directly
                        createClosePositionButtonListener = ()=>(positionId)=>{
                                console.log('[TVChartContainer] Custom close listener triggered for:', positionId);
                                broker.closePosition(positionId).then(()=>console.log('Position closed successfully')).catch((e)=>console.error('Failed to close position', e));
                            };
                    // createReversePositionButtonListener = window.CustomDialogs.createReversePositionButtonListenerFactory(broker);
                    }
                    return broker;
                },
                broker_config: {
                    configFlags: {
                        // Position management flags
                        supportPositions: true,
                        supportPositionBrackets: true,
                        supportIndividualPositionBrackets: true,
                        supportModifyPosition: true,
                        supportPLUpdate: true,
                        supportClosePosition: true,
                        supportReversePosition: false,
                        supportNativeReversePosition: false,
                        supportPositionNetting: false,
                        supportPreviewClosePosition: false,
                        // Order management flags
                        supportOrders: true,
                        supportOrderBrackets: true,
                        supportModifyOrder: true,
                        supportCancelOrder: true,
                        supportCloseOrder: true,
                        supportMarketBrackets: true,
                        supportModifyOrderPrice: true,
                        supportModifyOrderBrackets: true,
                        supportIndividualOrderBrackets: true,
                        supportAddBracketsToExistingOrder: true,
                        supportAddBracketsToExistingPosition: true,
                        supportCancelBrackets: true,
                        supportMoveOrder: true,
                        supportMoveOrderBrackets: true,
                        supportMovePosition: true,
                        supportMovePositionBrackets: true,
                        supportEditAmount: true,
                        supportDragToModify: true,
                        // Order type flags
                        supportStopLoss: true,
                        supportStopOrders: true,
                        supportStopLimitOrders: false,
                        supportTrailingStop: true,
                        supportMultiposition: true,
                        // UI and other flags
                        showQuantityInsteadOfAmount: true,
                        supportDOM: false,
                        supportSymbolSearch: false,
                        supportStrictCheckingLimitOrderPrice: false,
                        supportLevel2Data: false,
                        supportReducePosition: false,
                        supportWorkOrder: true,
                        supportModifyPositionBrackets: true,
                        supportModifyBrackets: true,
                        supportGuaranteedStop: false,
                        supportOrdersHistory: false,
                        supportPlaceOrderPreview: true
                    },
                    durations: [
                        {
                            name: 'DAY',
                            value: 'DAY'
                        },
                        {
                            name: 'GTT',
                            value: 'GTT'
                        }
                    ],
                    customUI: {
                        showOrderDialog: (order)=>{
                            console.log('[TVChartContainer] showOrderDialog called:', order);
                            // Bypass modal for preview order
                            if (order.id === 'PREVIEW_ORDER_ID') {
                                return Promise.resolve(true);
                            }
                            // If order has an ID, it is an existing order being modified -> Use our modal
                            if (order.id) {
                                return openModifyPositionModal(order);
                            }
                            if (window.CustomDialogs) return window.CustomDialogs.showOrderDialog(customOrderDialog, order);
                            return Promise.resolve(true);
                        },
                        showPositionDialog: (position, brackets)=>{
                            return openModifyPositionModal(position, brackets);
                        },
                        showPositionBracketsDialog: (position, brackets)=>{
                            return openModifyPositionModal(position, brackets);
                        },
                        showIndividualPositionBracketsDialog: (position, brackets)=>{
                            return openModifyPositionModal(position, brackets);
                        },
                        showCancelOrderDialog: (order)=>{
                            // SKIP MODAL: Call broker directly for instant cancel
                            console.log('[TVChartContainer] Direct cancel triggered for order:', order.id);
                            if (brokerRef.current) {
                                brokerRef.current.cancelOrder(order.id).catch((e)=>console.error('Direct cancel failed', e));
                            }
                            return Promise.resolve(true);
                        },
                        showClosePositionDialog: (position)=>{
                            // SKIP MODAL: Call broker directly for instant close
                            console.log('[TVChartContainer] Direct close triggered for:', position.id);
                            if (brokerRef.current) {
                                brokerRef.current.closePosition(position.id).catch((e)=>console.error('Direct close failed', e));
                            }
                            return Promise.resolve(true);
                        },
                        // Disable reverse dialog entirely
                        showReversePositionDialog: ()=>Promise.resolve(false)
                    }
                }
            };
            const tvWidget = new window.TradingView.widget(widgetOptions);
            widgetRef.current = tvWidget;
            window.tvWidget = tvWidget;
            tvWidget.onChartReady(()=>{
                tvWidget.activeChart().onSymbolChanged().subscribe(null, ()=>{
                    const newSymbol = tvWidget.activeChart().symbol();
                    if (setSymbol) setSymbol(newSymbol);
                });
                if (brokerRef.current && typeof brokerRef.current.setWidgetReady === 'function') {
                    brokerRef.current.setWidgetReady(true);
                }
                // Subscribe to real-time dragging for preview sync
                const chart = tvWidget.activeChart();
                // onOrderMove fires when the user release or modifies the line
                // We use a try-catch for robustness across different library builds
                try {
                    if (typeof chart.onOrderMove === 'function') {
                        chart.onOrderMove().subscribe(null, (order)=>{
                            if (!order) return;
                            if (brokerRef.current && order.id.toString().includes('PREVIEW_ORDER_ID')) {
                                // TradingView can put the dragged price on different fields depending on line type
                                const movedPriceRaw = order.price ?? order.limitPrice ?? order.stopPrice;
                                const movedPrice = typeof movedPriceRaw === 'string' ? parseFloat(movedPriceRaw) : movedPriceRaw;
                                if (movedPrice === undefined || Number.isNaN(movedPrice)) return;
                                brokerRef.current.moveOrder(order.id, movedPrice);
                            }
                        });
                    }
                    if (typeof chart.onPositionDrag === 'function') {
                        chart.onPositionDrag().subscribe(null, (pos)=>{
                        // Logic for position drag if needed
                        });
                    }
                } catch (e) {
                    console.error('[TVChartContainer] Error subscribing to chart events:', e);
                }
            });
        };
        const loadScript = (src)=>{
            return new Promise((resolve, reject)=>{
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = ()=>{
                    reject(new Error(`Failed to load script: ${src}`));
                };
                document.head.appendChild(script);
            });
        };
        const loadStyle = (href)=>{
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = href;
            document.head.appendChild(link);
        };
        styles.forEach(loadStyle);
        Promise.all(scripts.map(loadScript)).then(()=>{
            initWidget();
        }).catch((err)=>{
            console.error("Failed to load TradingView scripts", err);
        });
        return ()=>{
            if (brokerRef.current && typeof brokerRef.current.__cleanup__ === 'function') {
                brokerRef.current.__cleanup__();
            }
            if (window.tvWidget) {
                try {
                    window.tvWidget.remove();
                } catch (e) {}
                window.tvWidget = null;
            }
        };
    }, []);
    // Effect to update broker account when it changes in context
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (brokerRef.current && currentAccountId) {
            if (typeof brokerRef.current.setAccountId === 'function') {
                brokerRef.current.setAccountId(currentAccountId);
            }
            // Update token function if it changed
            if (brokerRef.current.setMetaApiTokenFunction && getMetaApiToken) {
                brokerRef.current.setMetaApiTokenFunction(getMetaApiToken);
            }
        }
    }, [
        currentAccountId,
        getMetaApiToken
    ]);
    // Effect to update chart symbol when it changes in context (e.g. clicked in watchlist)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (activeSymbol && window.tvWidget) {
            try {
                const chart = window.tvWidget.activeChart();
                if (chart) {
                    const current = chart.symbol();
                    // Determine if we need to update (ignore casing differences if broker handles them, but usually strict)
                    if (current !== activeSymbol) {
                        console.log('[TVChartContainer] Context symbol changed to', activeSymbol, 'updating chart...');
                        chart.setSymbol(activeSymbol);
                    }
                }
            } catch (e) {
                console.warn('[TVChartContainer] Failed to set symbol', e);
            }
        }
    }, [
        activeSymbol
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "tv-chart-container",
        style: {
            height: '100%',
            width: '100%'
        }
    }, void 0, false, {
        fileName: "[project]/src/components/chart/TVChartContainer.tsx",
        lineNumber: 481,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = TVChartContainer;
}),
"[project]/src/components/layout/ChartSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$chart$2f$TVChartContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/chart/TVChartContainer.tsx [app-ssr] (ecmascript)");
'use client';
;
;
const ChartSection = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 h-full overflow-hidden bg-[#0F0F0F]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$chart$2f$TVChartContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/components/layout/ChartSection.tsx",
            lineNumber: 9,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/layout/ChartSection.tsx",
        lineNumber: 8,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ChartSection;
}),
"[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-full min-w-0 rounded-md border border-white/8 bg-white/3 px-4 py-2 text-sm text-white", "backdrop-blur-sm transition-all duration-200", "placeholder:text-white/40", "focus:outline-none focus:border-white/12 focus:bg-white/5", "disabled:cursor-not-allowed disabled:opacity-50", "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/components/ui/tabs.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs,
    "TabsContent",
    ()=>TabsContent,
    "TabsList",
    ()=>TabsList,
    "TabsTrigger",
    ()=>TabsTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-tabs/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function Tabs({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "tabs",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tabs.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
function TabsList({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["List"], {
        "data-slot": "tabs-list",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-white/5 text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tabs.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
function TabsTrigger({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "tabs-trigger",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50", "text-white/60 data-[state=active]:text-white data-[state=active]:bg-white/10", "hover:text-white/80", "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tabs.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
function TabsContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
        "data-slot": "tabs-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex-1 outline-none", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tabs.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/components/modals/OrderModeModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrderModeModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function OrderModeModal({ isOpen, onClose, onConfirm, mode }) {
    const [dontShowAgain, setDontShowAgain] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    if (!isOpen) return null;
    const isRiskCalculator = mode === 'Risk calculator form';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-background w-[500px] rounded-lg shadow-2xl border border-[#2a2f36] flex flex-col max-h-[90vh]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-6 py-4 border-b border-[#2a2f36]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold text-white",
                            children: isRiskCalculator ? 'Risk Calculator mode' : 'One-click trading mode'
                        }, void 0, false, {
                            fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                            lineNumber: 17,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-gray-400 hover:text-white transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                                lineNumber: 21,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 overflow-y-auto text-[#c0c0c0] text-[14px] leading-relaxed space-y-4 custom-scrollbar",
                    children: isRiskCalculator ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Selecting this option activates the Risk Calculator mode for order placement."
                            }, void 0, false, {
                                fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                                lineNumber: 29,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "In this mode, position size is calculated automatically based on the specified Risk and Stop Loss level."
                            }, void 0, false, {
                                fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                                lineNumber: 32,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "By enabling this mode, you understand that your market or pending orders will be submitted by clicking the Confirm button, using volume, calculated based on entered parameters."
                            }, void 0, false, {
                                fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                                lineNumber: 35,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "You agree to accept all risks associated with the use of the order submission mode you have chosen, including, without limitation, the risk of errors, commissions or mistakes made in submitting any order."
                            }, void 0, false, {
                                fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                                lineNumber: 38,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "To place an order:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                                lineNumber: 41,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "list-disc pl-5 space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Specify preferred Risk value, this is the maximum amount of loss you are willing to tolerate should the order close by Stop Loss"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                                        lineNumber: 43,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Enter Stop Loss level at which you are willing to risk the specified amount"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                                        lineNumber: 44,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Optionally, specify Take Profit"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                                        lineNumber: 45,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Click on Confirm to place the order with specified Stop Loss and Take Profit, and calculated volume"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                                        lineNumber: 46,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                                lineNumber: 42,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Selecting this option activates One-click Trading mode for order placement."
                            }, void 0, false, {
                                fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                                lineNumber: 51,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "By enabling this mode, you understand that your market or limit orders will be submitted by clicking the bid or ask rate button, without any further order confirmation. You agree to accept all risks associated with the use of the order submission mode you have chosen, including, without limitation, the risk of errors, commissions or mistakes made in submitting any order."
                            }, void 0, false, {
                                fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                                lineNumber: 54,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-4 border-t border-[#2a2f36] flex flex-col gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    id: "dont-show",
                                    checked: dontShowAgain,
                                    onChange: (e)=>setDontShowAgain(e.target.checked),
                                    className: "w-4 h-4 rounded border-gray-600 bg-[#2a2f36] text-[#8b5cf6] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "dont-show",
                                    className: "text-[14px] text-gray-400 cursor-pointer select-none",
                                    children: "Don't show again"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-end gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "px-4 py-2 bg-[#2a2f36] hover:bg-[#363c45] text-white text-[14px] font-medium rounded transition-colors",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onConfirm(dontShowAgain),
                                    className: "px-4 py-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-[14px] font-bold rounded transition-colors",
                                    children: "Yes, proceed"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modals/OrderModeModal.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/modals/OrderModeModal.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/modals/OrderModeModal.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/trading/OrderPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-ssr] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-ssr] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/tabs.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Tooltip.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FlagIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/FlagIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TradingContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/TradingContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$WebSocketContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/WebSocketContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AccountContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AccountContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$InstrumentContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/InstrumentContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modals$2f$OrderModeModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modals/OrderModeModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const OrderPanel = ({ onClose, onBuy, onSell, className, ...props })=>{
    // Demo Mode: Disable all interactions
    const disabledOverlay = "pointer-events-none opacity-80 select-none";
    const { symbol } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TradingContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTrading"])();
    const { subscribe, unsubscribe, lastQuotes, normalizeSymbol, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$WebSocketContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWebSocket"])();
    const { currentBalance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AccountContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAccount"])();
    const { instruments } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$InstrumentContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInstruments"])();
    const [marketClosedToast, setMarketClosedToast] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    // Get real-time prices from WebSocket
    const hubSymbol = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const s = (symbol || 'BTCUSD').replace('/', '');
        // Convert trailing uppercase M or R to lowercase to match instrument feed
        return s.replace(/M$/, 'm').replace(/R$/, 'r');
    }, [
        symbol
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (hubSymbol) {
            subscribe([
                hubSymbol
            ]);
            return ()=>unsubscribe([
                    hubSymbol
                ]);
        }
    }, [
        hubSymbol,
        subscribe,
        unsubscribe
    ]);
    const quote = lastQuotes[normalizeSymbol(hubSymbol)] || lastQuotes[hubSymbol] || {};
    const instrument = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const norm = normalizeSymbol(hubSymbol);
        return instruments.find((i)=>normalizeSymbol(i.symbol) === norm || i.symbol === hubSymbol || i.symbol === symbol);
    }, [
        hubSymbol,
        instruments,
        normalizeSymbol,
        symbol
    ]);
    const isCrypto = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const cat = (instrument?.category || '').toLowerCase();
        return cat.includes('crypto');
    }, [
        instrument
    ]);
    const isMarketClosed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (isCrypto) return false;
        const now = new Date();
        const day = now.getUTCDay();
        const minutes = now.getUTCHours() * 60 + now.getUTCMinutes();
        const isWeekendClosed = day === 5 && minutes >= 21 * 60 || day === 6 || day === 0 && minutes < 21 * 60 + 5;
        return isWeekendClosed;
    }, [
        isCrypto
    ]);
    const marketClosedMessage = "Market closed for this instrument. Trading resumes Sunday 21:05 UTC.";
    // Use live prices if available, otherwise fall back to defaults
    const currentSellPrice = quote.bid ?? 0;
    const currentBuyPrice = quote.ask ?? 0;
    const spreadVal = (quote.spread || 0) * 100;
    const currentSpread = `${spreadVal.toFixed(2)} pips`;
    const [formType, setFormType] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("regular");
    const [orderType, setOrderType] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("market");
    const [pendingOrderType, setPendingOrderType] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("limit") // For pending orders: limit or stop
    ;
    const [volume, setVolume] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("0.01");
    const [risk, setRisk] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("");
    const [riskMode, setRiskMode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("usd");
    const [takeProfit, setTakeProfit] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("");
    const [takeProfitMode, setTakeProfitMode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("price");
    const [stopLoss, setStopLoss] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("");
    const [stopLossMode, setStopLossMode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("price");
    const [openPrice, setOpenPrice] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("");
    const [showMoreDetails, setShowMoreDetails] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [showOneClickModal, setShowOneClickModal] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [showRiskCalculatorModal, setShowRiskCalculatorModal] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [pendingFormType, setPendingFormType] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const [pendingOrderSide, setPendingOrderSide] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const [isLoading, setIsLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const isSyncingFromChart = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const lastPreviewData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    // Check if user has dismissed the one-click modal
    const shouldShowOneClickModal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        if ("TURBOPACK compile-time truthy", 1) return false;
        //TURBOPACK unreachable
        ;
        const dismissed = undefined;
    }, []);
    // Check if user has dismissed the risk calculator modal
    const shouldShowRiskCalculatorModal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        if ("TURBOPACK compile-time truthy", 1) return false;
        //TURBOPACK unreachable
        ;
        const dismissed = undefined;
    }, []);
    // Handle form type change - show modal for one-click or risk calculator if needed
    const handleFormTypeChange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((newFormType)=>{
        if (newFormType === "one-click" && shouldShowOneClickModal()) {
            setPendingFormType(newFormType);
            setShowOneClickModal(true);
        } else if (newFormType === "risk-calculator" && shouldShowRiskCalculatorModal()) {
            setPendingFormType(newFormType);
            setShowRiskCalculatorModal(true);
        } else {
            setFormType(newFormType);
        }
    }, [
        shouldShowOneClickModal,
        shouldShowRiskCalculatorModal
    ]);
    // Handle one-click modal confirmation
    const handleOneClickModalConfirm = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((dontShowAgain)=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        if (pendingFormType) {
            setFormType(pendingFormType);
            setPendingFormType(null);
        }
        setShowOneClickModal(false);
    }, [
        pendingFormType
    ]);
    // Ref for orderType to avoid stale usage in event listener
    const orderTypeRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](orderType);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        orderTypeRef.current = orderType;
    }, [
        orderType
    ]);
    // Ref to track the debounce timeout for clearing the sync flag
    const syncTimeoutRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    // Sync TP/SL from chart preview
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const handlePreviewChange = (e)=>{
            const { takeProfit: tp, stopLoss: sl, price, source } = e.detail || {};
            // Prevent loops
            if (source === 'panel') return;
            // Start syncing: Cancel any pending clear
            if (syncTimeoutRef.current) {
                clearTimeout(syncTimeoutRef.current);
                syncTimeoutRef.current = null;
            }
            isSyncingFromChart.current = true;
            console.log('[OrderPanel] Syncing from chart:', e.detail);
            try {
                if (tp !== undefined) {
                    // If 0 or null, set empty
                    const val = tp && tp > 0 ? tp.toFixed(5).replace(/\.?0+$/, "") : "";
                    setTakeProfit(val);
                    if (val) setTakeProfitMode("price");
                }
                if (sl !== undefined) {
                    const val = sl && sl > 0 ? sl.toFixed(5).replace(/\.?0+$/, "") : "";
                    setStopLoss(val);
                    if (val) setStopLossMode("price");
                }
                if (price !== undefined) {
                    setOpenPrice(price.toFixed(5).replace(/\.?0+$/, ""));
                    // Use ref to check current order type
                    if (orderTypeRef.current === 'market') {
                        setOrderType('pending');
                        setPendingOrderType('limit');
                    }
                }
            } finally{
                // Debounce the clearing of the flag
                syncTimeoutRef.current = setTimeout(()=>{
                    isSyncingFromChart.current = false;
                    syncTimeoutRef.current = null;
                }, 300);
            }
        };
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    // TEST FUNCTION - Remove after debugging
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    // Handle one-click modal cancel
    const handleOneClickModalCancel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        setShowOneClickModal(false);
        setPendingFormType(null);
    }, []);
    // Handle risk calculator modal confirmation
    const handleRiskCalculatorModalConfirm = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((dontShowAgain)=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        if (pendingFormType) {
            setFormType(pendingFormType);
            setPendingFormType(null);
        }
        setShowRiskCalculatorModal(false);
    }, [
        pendingFormType
    ]);
    // Handle risk calculator modal cancel
    const handleRiskCalculatorModalCancel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        setShowRiskCalculatorModal(false);
        setPendingFormType(null);
    }, []);
    // Update dropdown modes when form type changes
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (formType === "regular") {
            setTakeProfitMode("price");
            setStopLossMode("price");
        } else if (formType === "risk-calculator") {
            setTakeProfitMode("pips");
            setStopLossMode("pips");
            setRiskMode("usd");
        }
        // Reset pending order side when form type changes
        setPendingOrderSide(null);
    }, [
        formType
    ]);
    // Trigger order preview on chart
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const previewPrice = undefined;
        const tpVal = undefined;
        const slVal = undefined;
        let tpPrice;
        let slPrice;
        const previewPayload = undefined;
        // Dirty check: Only update if anything meaningful changed to avoid chart flicker
        const payloadStr = undefined;
    }, [
        pendingOrderSide,
        orderType,
        openPrice,
        volume,
        currentBuyPrice,
        currentSellPrice,
        symbol,
        pendingOrderType,
        takeProfit,
        stopLoss,
        takeProfitMode,
        stopLossMode
    ]);
    // Get pip size based on symbol type
    const getPipSize = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const symbolUpper = (symbol || '').toUpperCase();
        const cat = (instrument?.category || '').toLowerCase();
        if (symbolUpper.includes('JPY')) {
            return 0.01;
        } else if (cat.includes('crypto') || symbolUpper.includes('BTC') || symbolUpper.includes('ETH')) {
            return 1.00 // 1 point = 1 dollar
            ;
        } else if (cat.includes('index') || cat.includes('indice') || symbolUpper.includes('US30') || symbolUpper.includes('SPX') || symbolUpper.includes('NAS')) {
            return 1.00 // 1 point = 1 unit (4500 -> 4520 is 20 points)
            ;
        } else if (cat.includes('metal') || symbolUpper.includes('XAU') || symbolUpper.includes('XAG')) {
            return 1.00 // 1 point = 1 dollar (2500 -> 2520 is 20 points)
            ;
        } else {
            return 0.0001 // Forex default (0.0001 = 1 pip)
            ;
        }
    }, [
        symbol,
        instrument
    ]);
    // Get default TP/SL offsets in "points/pips" (20 for all instruments as requested)
    const getDefaultOffsets = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        return {
            tp: 20,
            sl: 20
        };
    }, []);
    // Get pip value per lot based on symbol type
    const getPipValuePerLot = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const symbolUpper = (symbol || '').toUpperCase();
        if (symbolUpper.includes('JPY')) {
            return 10;
        } else if (symbolUpper.includes('XAU') || symbolUpper.includes('GOLD')) {
            return 10;
        } else if (symbolUpper.includes('XAG') || symbolUpper.includes('SILVER')) {
            return 10;
        } else if (symbolUpper.includes('BTC') || symbolUpper.includes('BTCUSD')) {
            return getPipSize;
        } else if (symbolUpper.includes('ETH') || symbolUpper.includes('ETHUSD')) {
            return getPipSize;
        } else {
            return 10;
        }
    }, [
        symbol,
        getPipSize
    ]);
    // Calculate SL and TP prices from pips (for risk calculator)
    const calculatePriceFromPips = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((pips, isBuy, isStopLoss = false)=>{
        if (pips === null || pips === undefined || isNaN(pips)) return null;
        const pipSize = getPipSize;
        const priceChange = pips * pipSize;
        if (isBuy) {
            return currentBuyPrice + priceChange;
        } else {
            return currentSellPrice - priceChange;
        }
    }, [
        getPipSize,
        currentBuyPrice,
        currentSellPrice
    ]);
    // Auto-set TP/SL upon preview start OR symbol change
    const lastProcessedSymbol = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](symbol);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        // If pendingOrderSide is active, we should show lines
        if (pendingOrderSide) {
            const offsets = getDefaultOffsets;
            const pipSize = getPipSize;
            // Calculate distances: 
            // For Forex (pipSize 0.0001), 20 * 0.0001 = 0.0020
            // For Crypto (pipSize 1.00), 1000 * 1.00 = 1000
            // For Metals/Indices (pipSize 1.00 or 0.01), 20 units
            const tpDist = offsets.tp * pipSize;
            const slDist = offsets.sl * pipSize;
            let basePrice = 0;
            if (orderType === 'market') {
                basePrice = pendingOrderSide === 'buy' ? currentBuyPrice : currentSellPrice;
            } else {
                basePrice = parseFloat(openPrice) || 0;
            }
            const isSymbolChanged = lastProcessedSymbol.current !== symbol;
            if (isSymbolChanged) {
                lastProcessedSymbol.current = symbol;
            }
            if (basePrice > 0) {
                // Set TP/SL if missing OR if symbol just changed
                if (!takeProfit || isSymbolChanged) {
                    const tp = pendingOrderSide === 'buy' ? basePrice + tpDist : basePrice - tpDist;
                    setTakeProfit(tp.toFixed(instrument?.digits || 2).replace(/\.?0+$/, ""));
                    setTakeProfitMode("price");
                }
                if (!stopLoss || isSymbolChanged) {
                    const sl = pendingOrderSide === 'buy' ? basePrice - slDist : basePrice + slDist;
                    setStopLoss(sl.toFixed(instrument?.digits || 2).replace(/\.?0+$/, ""));
                    setStopLossMode("price");
                }
            }
        } else {
        // If side is cleared (e.g. symbol changed but side not set), we can still prep values if we want
        // but usually wait for side selection ('buy'/'sell')
        }
    }, [
        pendingOrderSide,
        symbol,
        currentBuyPrice,
        currentSellPrice,
        orderType,
        openPrice,
        getDefaultOffsets,
        getPipSize,
        instrument
    ]);
    // Calculate volume for risk calculator based on Risk and Stop Loss
    const calculateRiskBasedVolume = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (formType !== "risk-calculator" || !risk || !stopLoss) {
            return null;
        }
        let riskAmount = parseFloat(risk);
        // Handle risk in percentage
        if (riskMode === "percent") {
            const equity = currentBalance?.equity || 0;
            if (equity <= 0) return null;
            riskAmount = riskAmount / 100 * equity;
        }
        let stopLossPips = 0;
        if (stopLossMode === "pips") {
            stopLossPips = Math.abs(parseFloat(stopLoss));
        } else {
            // stopLossMode === "price"
            const slPrice = parseFloat(stopLoss);
            if (isNaN(slPrice) || slPrice <= 0) return null;
            let entryPrice = 0;
            if (orderType === "pending" || orderType === "limit") {
                entryPrice = openPrice ? parseFloat(openPrice) : 0;
            } else {
                // For market orders, use mid price as estimation
                entryPrice = (currentBuyPrice + currentSellPrice) / 2;
            }
            if (entryPrice <= 0) return null;
            // Use pipSize from hook
            const pipSize = getPipSize;
            stopLossPips = Math.abs(entryPrice - slPrice) / pipSize;
        }
        if (!riskAmount || !stopLossPips || stopLossPips <= 0 || riskAmount <= 0) {
            return null;
        }
        const pipValuePerLot = getPipValuePerLot;
        const calculatedVolume = riskAmount / (stopLossPips * pipValuePerLot);
        const clampedVolume = Math.max(0.01, Math.min(50.00, calculatedVolume));
        return clampedVolume;
    }, [
        formType,
        risk,
        stopLoss,
        stopLossMode,
        riskMode,
        getPipValuePerLot,
        currentBalance,
        orderType,
        openPrice,
        currentBuyPrice,
        currentSellPrice,
        getPipSize
    ]);
    // Calculate SL and TP prices from pips
    const calculatedStopLossPrice = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (formType !== "risk-calculator" || !stopLoss || stopLossMode !== "pips") return null;
        const pips = parseFloat(stopLoss);
        if (isNaN(pips)) return null;
        return calculatePriceFromPips(pips, true, true);
    }, [
        formType,
        stopLoss,
        stopLossMode,
        calculatePriceFromPips
    ]);
    const calculatedTakeProfitPrice = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (formType !== "risk-calculator" || !takeProfit || takeProfitMode !== "pips") return null;
        const pips = parseFloat(takeProfit);
        if (isNaN(pips) || pips <= 0) return null;
        return calculatePriceFromPips(pips, true, false);
    }, [
        formType,
        takeProfit,
        takeProfitMode,
        calculatePriceFromPips
    ]);
    // Update volume when risk calculator values change
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (formType === "risk-calculator" && calculateRiskBasedVolume !== null) {
            setVolume(calculateRiskBasedVolume.toFixed(2));
        }
    }, [
        formType,
        calculateRiskBasedVolume
    ]);
    const handleVolumeChange = (value)=>{
        if (value === '') {
            setVolume('');
            return;
        }
        const trimmedValue = value.trim();
        if (!/^[\d.]*$/.test(trimmedValue) || (trimmedValue.match(/\./g) || []).length > 1) {
            return;
        }
        const decimalIndex = trimmedValue.indexOf('.');
        if (decimalIndex !== -1) {
            const decimalPart = trimmedValue.substring(decimalIndex + 1);
            if (decimalPart.length > 2) {
                const truncated = trimmedValue.substring(0, decimalIndex + 3);
                setVolume(truncated);
                return;
            }
        }
        setVolume(trimmedValue);
    };
    const incrementVolume = ()=>{
        const currentValue = parseFloat(volume) || 0.01;
        const roundedCurrent = Math.round(currentValue * 100) / 100;
        const newValue = Math.min(50.00, roundedCurrent + 0.01);
        setVolume(newValue.toFixed(2));
    };
    const decrementVolume = ()=>{
        const currentValue = parseFloat(volume) || 0.01;
        const roundedCurrent = Math.round(currentValue * 100) / 100;
        const newValue = Math.max(0.01, roundedCurrent - 0.01);
        setVolume(newValue.toFixed(2));
    };
    const incrementField = (value, setter)=>{
        const basePrice = value && !isNaN(parseFloat(value)) ? parseFloat(value) : currentBuyPrice;
        setter((basePrice + 0.001).toFixed(3));
    };
    const decrementField = (value, setter)=>{
        const basePrice = value && !isNaN(parseFloat(value)) ? parseFloat(value) : currentBuyPrice;
        setter(Math.max(0, basePrice - 0.001).toFixed(3));
    };
    // Render buy/sell price buttons with spread overlay - solid backgrounds for one-click
    const renderPriceButtonsSolid = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative grid grid-cols-2 gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: async ()=>{
                        if (isMarketClosed) {
                            setMarketClosedToast(marketClosedMessage);
                            return;
                        }
                        if (isLoading) return;
                        setPendingOrderSide('sell');
                        setIsLoading(true);
                        try {
                            onSell?.({
                                orderType,
                                pendingOrderType: orderType === "pending" ? pendingOrderType : undefined,
                                volume: parseFloat(volume),
                                openPrice: openPrice ? parseFloat(openPrice) : currentSellPrice,
                                stopLoss: undefined,
                                takeProfit: undefined
                            });
                            setTimeout(()=>{
                                setIsLoading(false);
                                setPendingOrderSide(null);
                            }, 1000);
                        } catch (err) {
                            setIsLoading(false);
                            setPendingOrderSide(null);
                        }
                    },
                    disabled: isLoading,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("rounded-md p-3 bg-[#FF5555] hover:bg-[#FF5555]/90 cursor-pointer text-left relative overflow-hidden transition-all text-white", isLoading && "opacity-80"),
                    children: [
                        isLoading && pendingOrderSide === 'sell' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] z-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1",
                                children: [
                                    0,
                                    1,
                                    2
                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 bg-white rounded-full opacity-80"
                                    }, i, false, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 619,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 617,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 616,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-white/80 mb-1",
                            children: "Sell"
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 627,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "price-font text-white font-bold text-sm leading-tight",
                            children: [
                                Math.floor(currentSellPrice).toLocaleString(),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-lg",
                                    children: [
                                        ".",
                                        String(Math.floor(currentSellPrice % 1 * 100)).padStart(2, '0')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 630,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("sup", {
                                    className: "text-sm",
                                    children: String(Math.floor(currentSellPrice % 1 * 1000) % 10)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 631,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 628,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                    lineNumber: 582,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: async ()=>{
                        if (isMarketClosed) {
                            setMarketClosedToast(marketClosedMessage);
                            return;
                        }
                        if (isLoading) return;
                        setPendingOrderSide('buy');
                        setIsLoading(true);
                        try {
                            onBuy?.({
                                orderType,
                                pendingOrderType: orderType === "pending" ? pendingOrderType : undefined,
                                volume: parseFloat(volume),
                                openPrice: openPrice ? parseFloat(openPrice) : currentBuyPrice,
                                stopLoss: undefined,
                                takeProfit: undefined
                            });
                            setTimeout(()=>{
                                setIsLoading(false);
                                setPendingOrderSide(null);
                            }, 1000);
                        } catch (err) {
                            setIsLoading(false);
                            setPendingOrderSide(null);
                        }
                    },
                    disabled: isLoading,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("rounded-md p-3 bg-[#4A9EFF] hover:bg-[#4A9EFF]/90 cursor-pointer text-right relative overflow-hidden transition-all text-white", isLoading && "opacity-80"),
                    children: [
                        isLoading && pendingOrderSide === 'buy' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] z-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1",
                                children: [
                                    0,
                                    1,
                                    2
                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 bg-white rounded-full opacity-80"
                                    }, i, false, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 672,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 670,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 669,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-white/80 mb-1",
                            children: "Buy"
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 680,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "price-font text-white font-bold text-sm leading-tight",
                            children: [
                                Math.floor(currentBuyPrice).toLocaleString(),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-lg",
                                    children: [
                                        ".",
                                        String(Math.floor(currentBuyPrice % 1 * 100)).padStart(2, '0')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 683,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("sup", {
                                    className: "text-sm",
                                    children: String(Math.floor(currentBuyPrice % 1 * 1000) % 10)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 684,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 681,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                    lineNumber: 635,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute left-1/2 bottom-0 -translate-x-1/2 px-2 py-0.5 rounded backdrop-blur-xl bg-white/[0.03] border border-white/10 text-[10px] text-white/80 font-medium whitespace-nowrap z-10",
                    children: [
                        currentSpread,
                        " ",
                        isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-green-500 ml-1",
                            children: "●"
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 689,
                            columnNumber: 41
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                    lineNumber: 688,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/trading/OrderPanel.tsx",
            lineNumber: 581,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0));
    // Render buy/sell price buttons with spread overlay - bordered for regular/risk calculator
    // In regular form, clicking these buttons sets pendingOrderSide to show confirmation
    const renderPriceButtonsBordered = (readOnly = false, showConfirmation = false)=>{
        const finalVolume = formType === "risk-calculator" && calculateRiskBasedVolume !== null ? calculateRiskBasedVolume : parseFloat(volume) || 0.01;
        let finalStopLoss = undefined;
        let finalTakeProfit = undefined;
        if (formType === "risk-calculator") {
            if (stopLossMode === "price") {
                finalStopLoss = stopLoss ? parseFloat(stopLoss) : undefined;
            } else {
                finalStopLoss = calculatedStopLossPrice ?? undefined;
            }
            if (takeProfitMode === "price") {
                finalTakeProfit = takeProfit ? parseFloat(takeProfit) : undefined;
            } else {
                finalTakeProfit = calculatedTakeProfitPrice ?? undefined;
            }
        } else {
            // Regular form: convert pips to price if needed
            if (stopLoss) {
                if (stopLossMode === "price") {
                    finalStopLoss = parseFloat(stopLoss);
                } else if (stopLossMode === "pips") {
                    // Convert pips to price - for buy orders, negative pips means price goes down (SL below entry)
                    // For sell orders, positive pips means price goes up (SL above entry)
                    const pips = parseFloat(stopLoss);
                    if (!isNaN(pips)) {
                        const pipSize = getPipSize;
                        const priceChange = pips * pipSize;
                        // Use buy price as base for calculation (will be adjusted based on order side in API)
                        finalStopLoss = currentBuyPrice + priceChange;
                    }
                }
            }
            if (takeProfit) {
                if (takeProfitMode === "price") {
                    finalTakeProfit = parseFloat(takeProfit);
                } else if (takeProfitMode === "pips") {
                    // Convert pips to price - for buy orders, positive pips means price goes up (TP above entry)
                    // For sell orders, negative pips means price goes down (TP below entry)
                    const pips = parseFloat(takeProfit);
                    if (!isNaN(pips) && pips > 0) {
                        const pipSize = getPipSize;
                        const priceChange = pips * pipSize;
                        // Use buy price as base for calculation
                        finalTakeProfit = currentBuyPrice + priceChange;
                    }
                }
            }
        }
        const finalOpenPrice = orderType !== "market" && openPrice ? parseFloat(openPrice) : undefined;
        // Use violet for risk calculator form buttons, keep red/blue for regular form
        const isRiskCalculator = formType === "risk-calculator";
        const sellButtonBorder = isRiskCalculator ? 'border-[#8b5cf6]' : 'border-[#FF5555]';
        const sellButtonHover = isRiskCalculator ? 'hover:bg-[#8b5cf6]/10' : 'hover:bg-[#FF5555]/10';
        const buyButtonBorder = isRiskCalculator ? 'border-[#8b5cf6]' : 'border-[#4A9EFF]';
        const buyButtonHover = isRiskCalculator ? 'hover:bg-[#8b5cf6]/10' : 'hover:bg-[#4A9EFF]/10';
        const sellButtonTextColor = isRiskCalculator ? 'text-[#8b5cf6]' : 'text-[#FF5555]';
        const buyButtonTextColor = isRiskCalculator ? 'text-[#8b5cf6]' : 'text-[#4A9EFF]';
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative grid grid-cols-2 gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: `rounded-md p-3 border-2 ${sellButtonBorder} bg-transparent ${readOnly ? '' : sellButtonHover} text-left cursor-pointer`,
                    onClick: readOnly ? undefined : ()=>{
                        if (isMarketClosed) {
                            setMarketClosedToast(marketClosedMessage);
                            return;
                        }
                        if (showConfirmation) {
                            // In regular form, set pending order side to show confirmation
                            setPendingOrderSide('sell');
                        } else {
                            // In risk calculator or pending orders, place order directly
                            if (!onSell) return;
                            if (!finalVolume || finalVolume <= 0) {
                                return;
                            }
                            // For pending orders, validate that openPrice is provided
                            if (orderType === 'pending' && !finalOpenPrice) {
                                alert('Please enter an open price for pending orders');
                                return;
                            }
                            // Calculate Sell-specific SL/TP if in Pips mode
                            let sellStopLoss = finalStopLoss;
                            let sellTakeProfit = finalTakeProfit;
                            if (formType === "risk-calculator" && stopLossMode === "pips" && stopLoss) {
                                const pips = parseFloat(stopLoss);
                                if (!isNaN(pips)) {
                                    const pipSize = getPipSize;
                                    // For Sell: SL is ABOVE entry (Entry + Pips)
                                    const entry = orderType === 'market' ? currentSellPrice : finalOpenPrice || 0;
                                    sellStopLoss = entry + pips * pipSize;
                                }
                            }
                            if (formType === "risk-calculator" && takeProfitMode === "pips" && takeProfit) {
                                const pips = parseFloat(takeProfit);
                                if (!isNaN(pips) && pips > 0) {
                                    const pipSize = getPipSize;
                                    // For Sell: TP is BELOW entry (Entry - Pips)
                                    const entry = orderType === 'market' ? currentSellPrice : finalOpenPrice || 0;
                                    sellTakeProfit = entry - pips * pipSize;
                                }
                            }
                            const orderData = {
                                orderType,
                                pendingOrderType: orderType === "pending" ? pendingOrderType : undefined,
                                volume: finalVolume,
                                openPrice: orderType === 'market' ? currentSellPrice : finalOpenPrice,
                                stopLoss: sellStopLoss,
                                takeProfit: sellTakeProfit
                            };
                            onSell(orderData);
                        }
                    },
                    disabled: readOnly,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-white/60 mb-1",
                            children: "Sell"
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 826,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `price-font ${sellButtonTextColor} font-bold text-sm leading-tight`,
                            children: [
                                Math.floor(currentSellPrice).toLocaleString(),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-lg",
                                    children: [
                                        ".",
                                        String(Math.floor(currentSellPrice % 1 * 100)).padStart(2, '0')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 829,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("sup", {
                                    className: "text-sm",
                                    children: String(Math.floor(currentSellPrice % 1 * 1000) % 10)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 830,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 827,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                    lineNumber: 766,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: `rounded-md p-3 border-2 ${buyButtonBorder} bg-transparent ${readOnly ? '' : buyButtonHover} text-right cursor-pointer`,
                    onClick: readOnly ? undefined : ()=>{
                        if (isMarketClosed) {
                            setMarketClosedToast(marketClosedMessage);
                            return;
                        }
                        if (showConfirmation) {
                            // In regular form, set pending order side to show confirmation
                            setPendingOrderSide('buy');
                        } else {
                            // In risk calculator or pending orders, place order directly
                            if (!onBuy) return;
                            if (!finalVolume || finalVolume <= 0) {
                                return;
                            }
                            // For pending orders, validate that openPrice is provided
                            if (orderType === 'pending' && !finalOpenPrice) {
                                alert('Please enter an open price for pending orders');
                                return;
                            }
                            // Calculate Buy-specific SL/TP if in Pips mode
                            let buyStopLoss = finalStopLoss;
                            let buyTakeProfit = finalTakeProfit;
                            if (formType === "risk-calculator" && stopLossMode === "pips" && stopLoss) {
                                const pips = parseFloat(stopLoss);
                                if (!isNaN(pips)) {
                                    const pipSize = getPipSize;
                                    // For Buy: SL is BELOW entry (Entry - Pips)
                                    const entry = orderType === 'market' ? currentBuyPrice : finalOpenPrice || 0;
                                    buyStopLoss = entry - pips * pipSize;
                                }
                            }
                            if (formType === "risk-calculator" && takeProfitMode === "pips" && takeProfit) {
                                const pips = parseFloat(takeProfit);
                                if (!isNaN(pips) && pips > 0) {
                                    const pipSize = getPipSize;
                                    // For Buy: TP is ABOVE entry (Entry + Pips)
                                    const entry = orderType === 'market' ? currentBuyPrice : finalOpenPrice || 0;
                                    buyTakeProfit = entry + pips * pipSize;
                                }
                            }
                            const orderData = {
                                orderType,
                                pendingOrderType: orderType === "pending" ? pendingOrderType : undefined,
                                volume: finalVolume,
                                openPrice: orderType === 'market' ? currentBuyPrice : finalOpenPrice,
                                stopLoss: buyStopLoss,
                                takeProfit: buyTakeProfit
                            };
                            onBuy(orderData);
                        }
                    },
                    disabled: readOnly,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-white/60 mb-1",
                            children: "Buy"
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 894,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `price-font ${buyButtonTextColor} font-bold text-sm leading-tight`,
                            children: [
                                Math.floor(currentBuyPrice).toLocaleString(),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-lg",
                                    children: [
                                        ".",
                                        String(Math.floor(currentBuyPrice % 1 * 100)).padStart(2, '0')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 897,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("sup", {
                                    className: "text-sm",
                                    children: String(Math.floor(currentBuyPrice % 1 * 1000) % 10)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 898,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 895,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                    lineNumber: 834,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute left-1/2 bottom-0 -translate-x-1/2 px-2 py-0.5 rounded backdrop-blur-xl bg-white/[0.03] border border-white/10 text-[10px] text-white/80 font-medium whitespace-nowrap z-10",
                    children: [
                        currentSpread,
                        " ",
                        isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-green-500 ml-1",
                            children: "●"
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 903,
                            columnNumber: 43
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                    lineNumber: 902,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/trading/OrderPanel.tsx",
            lineNumber: 765,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    };
    // Simple toast for market closed
    const renderMarketClosedToast = ()=>{
        if (!marketClosedToast) return null;
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPortal(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed bottom-4 left-4 z-[99999] bg-[#0b0e14] text-[#d1d5db] rounded-md shadow-lg border border-amber-500/60 w-[320px] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setMarketClosedToast(null),
                        className: "absolute top-2 right-2 text-[#9ca3af] hover:text-white transition-colors",
                        children: "×"
                    }, void 0, false, {
                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                        lineNumber: 915,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-0.5 text-amber-400",
                                children: "⚠"
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 922,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white font-medium text-[14px] leading-tight mb-1",
                                        children: "Market closed"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 924,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[13px] text-[#d1d5db]",
                                        children: marketClosedMessage
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 925,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 923,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                        lineNumber: 921,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                lineNumber: 914,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/trading/OrderPanel.tsx",
            lineNumber: 913,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0)), document.body);
    };
    // Calculate financial metrics in real-time
    const calculateFinancialMetrics = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const vol = parseFloat(volume) || 0;
        const price = orderType === "limit" && openPrice ? parseFloat(openPrice) : currentBuyPrice;
        const symbolUpper = (symbol || '').toUpperCase();
        let contractSize = 100000;
        let pipValue = 0.0001;
        if (symbolUpper.includes('XAU') || symbolUpper.includes('XAG')) {
            contractSize = 100;
            pipValue = 0.01;
        } else if (symbolUpper.includes('BTC') || symbolUpper.includes('ETH')) {
            contractSize = 1;
            pipValue = 0.01;
        } else {
            contractSize = 100000;
            pipValue = symbolUpper.includes('JPY') ? 0.01 : 0.0001;
        }
        const leverageStr = String(currentBalance?.leverage || "1:2000");
        // Correctly parse leverage from strings like "1:2000" or "2000"
        const leverageMatch = leverageStr.match(/(\d+)$/);
        const leverage = leverageMatch ? parseInt(leverageMatch[1], 10) : 2000;
        const margin = vol * contractSize * price / leverage;
        const tradeValue = vol * contractSize * price;
        const spread = (quote.spread || 0) * 100;
        const fees = vol * spread * 10;
        const calculatedPipValue = contractSize * pipValue * vol;
        const swapLong = -(tradeValue * 0.0001);
        const swapShort = 0;
        const volumeInUnits = vol * contractSize;
        const volumeInUSD = tradeValue;
        const credit = currentBalance?.credit || 0;
        return {
            fees,
            leverage: `1:${leverage}`,
            margin,
            swapLong,
            swapShort,
            pipValue: calculatedPipValue,
            volumeInUnits,
            volumeInUSD,
            credit
        };
    }, [
        volume,
        currentBuyPrice,
        openPrice,
        orderType,
        symbol,
        currentBalance,
        quote.spread
    ]);
    // Render financial details section
    const renderFinancialDetails = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2 pt-2 border-t border-white/10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between text-xs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-white/60",
                            children: "Fees:"
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 987,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white price-font",
                                    children: [
                                        "≈ ",
                                        calculateFinancialMetrics.fees.toFixed(2),
                                        " USD"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 989,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    text: "Estimated commission and spread costs",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                        className: "h-3 w-3 text-white/40"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 991,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 990,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 988,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                    lineNumber: 986,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between text-xs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-white/60",
                            children: "Leverage:"
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 997,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white price-font",
                                    children: calculateFinancialMetrics.leverage.startsWith('1:') ? calculateFinancialMetrics.leverage : `1:${calculateFinancialMetrics.leverage}`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 999,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    text: "Account leverage ratio",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                        className: "h-3 w-3 text-white/40"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1001,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1000,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 998,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                    lineNumber: 996,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between text-xs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-white/60",
                            children: "Margin:"
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 1007,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-white price-font",
                            children: [
                                calculateFinancialMetrics.margin.toFixed(2),
                                " USD"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 1008,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                    lineNumber: 1006,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                showMoreDetails && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white/60",
                                    children: "Swap Long:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1014,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white price-font",
                                            children: [
                                                calculateFinancialMetrics.swapLong.toFixed(2),
                                                " USD"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                            lineNumber: 1016,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            text: "Overnight swap for long positions",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                                className: "h-3 w-3 text-white/40"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1018,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                            lineNumber: 1017,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1015,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 1013,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white/60",
                                    children: "Swap Short:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1024,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white price-font",
                                            children: [
                                                calculateFinancialMetrics.swapShort.toFixed(2),
                                                " USD"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                            lineNumber: 1026,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            text: "Overnight swap for short positions",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                                className: "h-3 w-3 text-white/40"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1028,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                            lineNumber: 1027,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1025,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 1023,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white/60",
                                    children: "Pip Value:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1034,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white price-font",
                                    children: [
                                        calculateFinancialMetrics.pipValue.toFixed(2),
                                        " USD"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1035,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 1033,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white/60",
                                    children: "Volume in units:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1039,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white price-font",
                                    children: [
                                        calculateFinancialMetrics.volumeInUnits.toFixed(2),
                                        " ",
                                        symbol?.toUpperCase().includes('BTC') ? 'BTC' : symbol?.toUpperCase().includes('ETH') ? 'ETH' : symbol?.toUpperCase().includes('XAU') ? 'oz' : ''
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1040,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 1038,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white/60",
                                    children: "Volume in USD:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1044,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white price-font",
                                    children: [
                                        calculateFinancialMetrics.volumeInUSD.toFixed(2),
                                        " USD"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1045,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 1043,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white/60",
                                    children: "Credit:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1049,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white price-font",
                                    children: [
                                        calculateFinancialMetrics.credit.toFixed(2),
                                        " USD"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1050,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 1048,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setShowMoreDetails(!showMoreDetails),
                    className: "w-full flex items-center justify-center gap-1 text-xs text-white/60 hover:text-white/80 pt-1",
                    children: showMoreDetails ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Less"
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1061,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "h-3 w-3",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M5 15l7-7 7 7"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1063,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1062,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "More"
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1068,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "h-3 w-3",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M19 9l-7 7-7-7"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1070,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1069,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                    lineNumber: 1055,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/trading/OrderPanel.tsx",
            lineNumber: 985,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0));
    // Render input field with dropdown and +/- buttons
    const renderInputField = (label, value, onChange, mode, onModeChange, modeOptions, showTooltip)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs font-medium text-white/80",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 1090,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        showTooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            text: `Set ${label.toLowerCase()}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                className: "h-3.5 w-3.5 text-white/40"
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1093,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 1092,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                    lineNumber: 1089,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-stretch border border-white/10 rounded-md overflow-hidden bg-white/[0.02] focus-within:border-[#8B5CF6]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                            type: "number",
                            value: value,
                            onChange: (e)=>onChange(e.target.value),
                            placeholder: "Not set",
                            className: "flex-1 border-0 bg-transparent text-center price-font text-sm h-9 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-white/40"
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 1098,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: mode,
                            onChange: (e)=>onModeChange(e.target.value),
                            className: "w-[70px] border-0 h-9 bg-transparent text-xs text-white focus:outline-none focus:ring-0",
                            children: modeOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: opt.value,
                                    className: "bg-[#1a1f28]",
                                    children: opt.label
                                }, opt.value, false, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1107,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 1105,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>decrementField(value, onChange),
                            className: "h-9 w-9 flex items-center justify-center hover:bg-white/5 cursor-pointer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                className: "h-3.5 w-3.5 text-white/60"
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1114,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 1110,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>incrementField(value, onChange),
                            className: "h-9 w-9 flex items-center justify-center hover:bg-white/5 cursor-pointer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "h-3.5 w-3.5 text-white/60"
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1120,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 1116,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                    lineNumber: 1097,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/trading/OrderPanel.tsx",
            lineNumber: 1088,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0));
    // Get country code from symbol (simplified - can be enhanced)
    const getCountryCode = ()=>{
        const symbolUpper = (symbol || '').toUpperCase();
        if (symbolUpper.includes('USD')) return 'US';
        if (symbolUpper.includes('EUR')) return 'EU';
        if (symbolUpper.includes('GBP')) return 'GB';
        if (symbolUpper.includes('JPY')) return 'JP';
        return 'US';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col h-full bg-[#181926] border-l border-[#262932] overflow-hidden", className, disabledOverlay),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-5 h-5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FlagIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    symbol: symbol || 'BTCUSD'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1149,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1148,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-semibold text-white",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatSymbolDisplay"])(symbol) || 'Select Symbol'
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1151,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                        lineNumber: 1147,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "h-7 w-7 flex items-center justify-center rounded-md hover:bg-white/10 hover:border border-transparent hover:border-white/20 cursor-pointer group",
                        title: "Close Order Panel",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "h-4 w-4 text-white/60 group-hover:text-white"
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 1159,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                        lineNumber: 1154,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                lineNumber: 1146,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: formType,
                        onChange: (e)=>handleFormTypeChange(e.target.value),
                        className: "w-full bg-white/[0.02] border border-white/10 rounded-md h-9 px-3 text-sm text-white focus:outline-none focus:ring-0 focus:border-[#8B5CF6]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "regular",
                                className: "bg-[#1a1f28]",
                                children: "Regular form"
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1167,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "one-click",
                                className: "bg-[#1a1f28]",
                                children: "One-click form"
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1168,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "risk-calculator",
                                className: "bg-[#1a1f28]",
                                children: "Risk calculator form"
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1169,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                        lineNumber: 1166,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    formType === "one-click" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tabs"], {
                                value: orderType === "pending" ? "limit" : orderType,
                                onValueChange: (value)=>{
                                    setOrderType(value === "limit" ? "pending" : value);
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsList"], {
                                    className: "grid w-full grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                            value: "market",
                                            children: "Market"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                            lineNumber: 1179,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                            value: "limit",
                                            children: "Limit"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                            lineNumber: 1180,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1178,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1175,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            orderType === "pending" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tabs"], {
                                        value: pendingOrderType,
                                        onValueChange: (value)=>setPendingOrderType(value),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsList"], {
                                            className: "grid w-full grid-cols-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                                    value: "limit",
                                                    children: "Limit"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1189,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                                    value: "stop",
                                                    children: "Stop"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1190,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                            lineNumber: 1188,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1187,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs font-medium text-white/80",
                                                        children: "Open price"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1196,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        text: `Set open price for ${pendingOrderType === "limit" ? "limit" : "stop"} order`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                                            className: "h-3.5 w-3.5 text-white/40"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                            lineNumber: 1198,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1197,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1195,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-stretch border border-white/10 rounded-md overflow-hidden bg-white/[0.02] focus-within:border-[#8B5CF6]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                        type: "number",
                                                        value: openPrice,
                                                        onChange: (e)=>setOpenPrice(e.target.value),
                                                        placeholder: currentBuyPrice.toFixed(3),
                                                        className: "flex-1 border-0 bg-transparent text-center price-font text-sm h-9 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-white/40"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1202,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center px-3 text-xs text-white/60 min-w-[50px]",
                                                        children: pendingOrderType === "limit" ? "Limit" : "Stop"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1209,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>decrementField(openPrice, setOpenPrice),
                                                        className: "h-9 w-9 flex items-center justify-center hover:bg-white/5 cursor-pointer",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                            className: "h-3.5 w-3.5 text-white/60"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                            lineNumber: 1216,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1212,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>incrementField(openPrice, setOpenPrice),
                                                        className: "h-9 w-9 flex items-center justify-center hover:bg-white/5 cursor-pointer",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                            className: "h-3.5 w-3.5 text-white/60"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                            lineNumber: 1222,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1218,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1201,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            openPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-white/60",
                                                children: [
                                                    ((parseFloat(openPrice) - currentBuyPrice) * 10000).toFixed(1),
                                                    " pips"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1226,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1194,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-medium text-white/80",
                                        children: "Volume"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1235,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-stretch border border-white/10 rounded-md overflow-hidden bg-white/[0.02] focus-within:border-[#8B5CF6]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "text",
                                                inputMode: "decimal",
                                                value: volume,
                                                onChange: (e)=>handleVolumeChange(e.target.value),
                                                onBlur: (e)=>{
                                                    const numValue = parseFloat(e.target.value) || 0.01;
                                                    const roundedValue = Math.round(numValue * 100) / 100;
                                                    const clampedValue = Math.max(0.01, Math.min(50.00, roundedValue));
                                                    setVolume(clampedValue.toFixed(2));
                                                },
                                                className: "flex-1 border-0 bg-transparent text-center price-font text-sm h-9 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1237,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-center px-3 text-xs text-white/60 min-w-[50px]",
                                                children: "Lots"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1250,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: decrementVolume,
                                                className: "h-9 w-9 flex items-center justify-center hover:bg-white/5 cursor-pointer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                    className: "h-3.5 w-3.5 text-white/60"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1257,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1253,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: incrementVolume,
                                                className: "h-9 w-9 flex items-center justify-center hover:bg-white/5 cursor-pointer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    className: "h-3.5 w-3.5 text-white/60"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1263,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1259,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1236,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1234,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            renderPriceButtonsSolid(),
                            renderFinancialDetails()
                        ]
                    }, void 0, true),
                    formType === "regular" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            renderPriceButtonsBordered(false, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tabs"], {
                                value: orderType,
                                onValueChange: (value)=>setOrderType(value),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsList"], {
                                    className: "grid w-full grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                            value: "market",
                                            children: "Market"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                            lineNumber: 1280,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                            value: "pending",
                                            children: "Pending"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                            lineNumber: 1281,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1279,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1278,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            orderType === "pending" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tabs"], {
                                        value: pendingOrderType,
                                        onValueChange: (value)=>setPendingOrderType(value),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsList"], {
                                            className: "grid w-full grid-cols-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                                    value: "limit",
                                                    children: "Limit"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1290,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                                    value: "stop",
                                                    children: "Stop"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1291,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                            lineNumber: 1289,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1288,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs font-medium text-white/80",
                                                        children: "Open price"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1297,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        text: `Set open price for ${pendingOrderType === "limit" ? "limit" : "stop"} order`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                                            className: "h-3.5 w-3.5 text-white/40"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                            lineNumber: 1299,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1298,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1296,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-stretch border border-white/10 rounded-md overflow-hidden bg-white/[0.02] focus-within:border-[#8B5CF6]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                        type: "number",
                                                        value: openPrice,
                                                        onChange: (e)=>setOpenPrice(e.target.value),
                                                        placeholder: currentBuyPrice.toFixed(3),
                                                        className: "flex-1 border-0 bg-transparent text-center price-font text-sm h-9 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-white/40"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1303,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center px-3 text-xs text-white/60 min-w-[50px]",
                                                        children: pendingOrderType === "limit" ? "Limit" : "Stop"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1310,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>decrementField(openPrice, setOpenPrice),
                                                        className: "h-9 w-9 flex items-center justify-center hover:bg-white/5 cursor-pointer",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                            className: "h-3.5 w-3.5 text-white/60"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                            lineNumber: 1317,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1313,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>incrementField(openPrice, setOpenPrice),
                                                        className: "h-9 w-9 flex items-center justify-center hover:bg-white/5 cursor-pointer",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                            className: "h-3.5 w-3.5 text-white/60"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                            lineNumber: 1323,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1319,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1302,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            openPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-white/60",
                                                children: [
                                                    ((parseFloat(openPrice) - currentBuyPrice) * 10000).toFixed(1),
                                                    " pips",
                                                    pendingOrderType === "limit" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-white/40",
                                                        children: "(Buy Limit: below current, Sell Limit: above current)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1330,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    pendingOrderType === "stop" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-white/40",
                                                        children: "(Buy Stop: above current, Sell Stop: below current)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1335,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1327,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1295,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-medium text-white/80",
                                        children: "Volume"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1346,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-stretch border border-white/10 rounded-md overflow-hidden bg-white/[0.02] focus-within:border-[#8B5CF6]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "text",
                                                inputMode: "decimal",
                                                value: volume,
                                                onChange: (e)=>handleVolumeChange(e.target.value),
                                                onBlur: (e)=>{
                                                    const numValue = parseFloat(e.target.value) || 0.01;
                                                    const roundedValue = Math.round(numValue * 100) / 100;
                                                    const clampedValue = Math.max(0.01, Math.min(50.00, roundedValue));
                                                    setVolume(clampedValue.toFixed(2));
                                                },
                                                className: "flex-1 border-0 bg-transparent text-center price-font text-sm h-9 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1348,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-center px-3 text-xs text-white/60 min-w-[50px]",
                                                children: "Lots"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1361,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: decrementVolume,
                                                className: "h-9 w-9 flex items-center justify-center hover:bg-white/5 cursor-pointer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                    className: "h-3.5 w-3.5 text-white/60"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1368,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1364,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: incrementVolume,
                                                className: "h-9 w-9 flex items-center justify-center hover:bg-white/5 cursor-pointer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    className: "h-3.5 w-3.5 text-white/60"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1374,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1370,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1347,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1345,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            renderInputField("Take Profit", takeProfit, setTakeProfit, takeProfitMode, (value)=>setTakeProfitMode(value), [
                                {
                                    value: "price",
                                    label: "Price"
                                },
                                {
                                    value: "pips",
                                    label: "Pips"
                                }
                            ], true),
                            renderInputField("Stop Loss", stopLoss, setStopLoss, stopLossMode, (value)=>setStopLossMode(value), [
                                {
                                    value: "price",
                                    label: "Price"
                                },
                                {
                                    value: "pips",
                                    label: "Pips"
                                }
                            ], true),
                            pendingOrderSide && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    stopLoss && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center gap-4 pt-2 pb-1 text-xs text-white/60",
                                        children: stopLossMode === "pips" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        stopLoss.startsWith('-') ? stopLoss : `-${stopLoss}`,
                                                        " pips"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1413,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white/40",
                                                    children: "|"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1414,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: (()=>{
                                                        const pips = Math.abs(parseFloat(stopLoss) || 0);
                                                        const isBuy = pendingOrderSide === 'buy';
                                                        const calculatedPrice = calculatePriceFromPips(pips, isBuy, true);
                                                        if (calculatedPrice !== null) {
                                                            const priceDiff = isBuy ? currentBuyPrice - calculatedPrice : calculatedPrice - currentSellPrice;
                                                            const pipValue = pips * getPipValuePerLot * (parseFloat(volume) || 0.01);
                                                            return `-${Math.abs(pipValue).toFixed(2)} USD`;
                                                        }
                                                        return '-0.00 USD';
                                                    })()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1415,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white/40",
                                                    children: "|"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1430,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: (()=>{
                                                        const pips = Math.abs(parseFloat(stopLoss) || 0);
                                                        const pipValue = pips * getPipValuePerLot * (parseFloat(volume) || 0.01);
                                                        const balance = currentBalance?.equity || 1;
                                                        const percent = Math.abs(pipValue) / balance * 100;
                                                        return `-${percent.toFixed(2)} %`;
                                                    })()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1431,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: (()=>{
                                                        const slPrice = parseFloat(stopLoss) || 0;
                                                        const isBuy = pendingOrderSide === 'buy';
                                                        const entryPrice = isBuy ? currentBuyPrice : currentSellPrice;
                                                        const priceDiff = isBuy ? entryPrice - slPrice : slPrice - entryPrice;
                                                        const pipSize = getPipSize;
                                                        const pips = priceDiff / pipSize;
                                                        return `${pips.toFixed(1)} pips`;
                                                    })()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1443,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white/40",
                                                    children: "|"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1454,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: (()=>{
                                                        const slPrice = parseFloat(stopLoss) || 0;
                                                        const isBuy = pendingOrderSide === 'buy';
                                                        const entryPrice = isBuy ? currentBuyPrice : currentSellPrice;
                                                        const priceDiff = Math.abs(entryPrice - slPrice);
                                                        const pipSize = getPipSize;
                                                        const pips = priceDiff / pipSize;
                                                        const pipValue = pips * getPipValuePerLot * (parseFloat(volume) || 0.01);
                                                        return `-${pipValue.toFixed(2)} USD`;
                                                    })()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1455,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white/40",
                                                    children: "|"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1467,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: (()=>{
                                                        const slPrice = parseFloat(stopLoss) || 0;
                                                        const isBuy = pendingOrderSide === 'buy';
                                                        const entryPrice = isBuy ? currentBuyPrice : currentSellPrice;
                                                        const priceDiff = Math.abs(entryPrice - slPrice);
                                                        const pipSize = getPipSize;
                                                        const pips = priceDiff / pipSize;
                                                        const pipValue = pips * getPipValuePerLot * (parseFloat(volume) || 0.01);
                                                        const balance = currentBalance?.equity || 1;
                                                        const percent = pipValue / balance * 100;
                                                        return `-${percent.toFixed(2)} %`;
                                                    })()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1468,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1410,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-2 pt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                disabled: isLoading,
                                                onClick: async ()=>{
                                                    if (isMarketClosed) {
                                                        setMarketClosedToast(marketClosedMessage);
                                                        return;
                                                    }
                                                    if (isLoading) return;
                                                    const handler = pendingOrderSide === 'buy' ? onBuy : onSell;
                                                    if (!handler) return;
                                                    const finalVolume = parseFloat(volume) || 0.01;
                                                    if (finalVolume <= 0) {
                                                        return;
                                                    }
                                                    let finalStopLoss = undefined;
                                                    let finalTakeProfit = undefined;
                                                    const isBuy = pendingOrderSide === 'buy';
                                                    if (stopLossMode === "price") {
                                                        finalStopLoss = stopLoss ? parseFloat(stopLoss) : undefined;
                                                    } else if (stopLossMode === "pips" && stopLoss) {
                                                        const pips = parseFloat(stopLoss);
                                                        if (!isNaN(pips)) {
                                                            const calculatedPrice = calculatePriceFromPips(pips, isBuy, true);
                                                            if (calculatedPrice !== null) {
                                                                finalStopLoss = calculatedPrice;
                                                            }
                                                        }
                                                    }
                                                    if (takeProfitMode === "price") {
                                                        finalTakeProfit = takeProfit ? parseFloat(takeProfit) : undefined;
                                                    } else if (takeProfitMode === "pips" && takeProfit) {
                                                        const pips = parseFloat(takeProfit);
                                                        if (!isNaN(pips) && pips > 0) {
                                                            const calculatedPrice = calculatePriceFromPips(pips, isBuy, false);
                                                            if (calculatedPrice !== null) {
                                                                finalTakeProfit = calculatedPrice;
                                                            }
                                                        }
                                                    }
                                                    // For pending orders, validate that openPrice is provided
                                                    if (orderType === 'pending' && !openPrice) {
                                                        alert('Please enter an open price for pending orders');
                                                        return;
                                                    }
                                                    const orderData = {
                                                        orderType,
                                                        pendingOrderType: orderType === "pending" ? pendingOrderType : undefined,
                                                        volume: finalVolume,
                                                        openPrice: orderType === 'market' ? pendingOrderSide === 'buy' ? currentBuyPrice : currentSellPrice : openPrice ? parseFloat(openPrice) : undefined,
                                                        stopLoss: finalStopLoss,
                                                        takeProfit: finalTakeProfit
                                                    };
                                                    setIsLoading(true);
                                                    try {
                                                        handler(orderData);
                                                        setTimeout(()=>{
                                                            setIsLoading(false);
                                                            setPendingOrderSide(null);
                                                        }, 1000);
                                                    } catch (err) {
                                                        setIsLoading(false);
                                                        setPendingOrderSide(null);
                                                    }
                                                },
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-full font-semibold py-3 px-4 rounded-md transition-all flex flex-col items-center justify-center relative overflow-hidden text-white", pendingOrderSide === 'buy' ? 'bg-[#4A9EFF] hover:bg-[#4A9EFF]/90' : 'bg-[#FF5555] hover:bg-[#FF5555]/90', isLoading && "opacity-80"),
                                                children: [
                                                    isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] z-10 focus:outline-none",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-1",
                                                            children: [
                                                                0,
                                                                1,
                                                                2
                                                            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-1.5 h-1.5 bg-white rounded-full opacity-80"
                                                                }, i, false, {
                                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                                    lineNumber: 1570,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                            lineNumber: 1568,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1567,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm",
                                                        children: [
                                                            "Confirm ",
                                                            pendingOrderSide === 'buy' ? 'Buy' : 'Sell'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1578,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs opacity-90",
                                                        children: [
                                                            volume,
                                                            " lots"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1579,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1488,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setPendingOrderSide(null),
                                                disabled: isLoading,
                                                className: "w-full bg-[#2a2f36] hover:bg-[#363c45] text-white font-medium py-2.5 px-4 rounded-md text-sm transition-colors disabled:opacity-50",
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1581,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1487,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    renderFinancialDetails()
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true),
                    formType === "risk-calculator" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            renderPriceButtonsBordered(false),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tabs"], {
                                value: orderType,
                                onValueChange: (value)=>setOrderType(value),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsList"], {
                                    className: "grid w-full grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                            value: "market",
                                            children: "Market"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                            lineNumber: 1604,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                            value: "pending",
                                            children: "Pending"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                            lineNumber: 1605,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1603,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1602,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs font-medium text-white/80",
                                                children: "Risk"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1611,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                text: "Maximum amount you're willing to risk on this trade",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                                    className: "h-3.5 w-3.5 text-white/40"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1613,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1612,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1610,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-stretch border border-white/10 rounded-md overflow-hidden bg-white/[0.02] focus-within:border-[#8B5CF6]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "number",
                                                value: risk,
                                                onChange: (e)=>setRisk(e.target.value),
                                                placeholder: "Not set",
                                                className: "flex-1 border-0 bg-transparent text-center price-font text-sm h-9 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-white/40"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1617,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: riskMode,
                                                onChange: (e)=>setRiskMode(e.target.value),
                                                className: "w-[70px] border-0 h-9 bg-transparent text-xs text-white focus:outline-none focus:ring-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "usd",
                                                        className: "bg-[#1a1f28]",
                                                        children: "USD"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1625,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "percent",
                                                        className: "bg-[#1a1f28]",
                                                        children: "%"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1626,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1624,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    const currentValue = parseFloat(risk) || 0;
                                                    setRisk(Math.max(0, currentValue - 1).toString());
                                                },
                                                className: "h-9 w-9 flex items-center justify-center hover:bg-white/5 cursor-pointer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                    className: "h-3.5 w-3.5 text-white/60"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1635,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1628,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    const currentValue = parseFloat(risk) || 0;
                                                    setRisk((currentValue + 1).toString());
                                                },
                                                className: "h-9 w-9 flex items-center justify-center hover:bg-white/5 cursor-pointer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    className: "h-3.5 w-3.5 text-white/60"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1644,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1637,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1616,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    riskMode === "percent" && risk && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-white/60 text-center",
                                        children: [
                                            ((parseFloat(risk) || 0) * (currentBalance?.equity || 0) / 100).toFixed(2),
                                            " USD"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1648,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    riskMode === "usd" && calculateRiskBasedVolume !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-white/80 text-center font-medium",
                                        children: [
                                            calculateRiskBasedVolume.toFixed(2),
                                            " lots"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1653,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1609,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs font-medium text-white/80",
                                                children: "Stop Loss"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1661,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                text: "Stop loss distance in pips (negative for Buy, positive for Sell)",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                                    className: "h-3.5 w-3.5 text-white/40"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1663,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1662,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1660,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-stretch border border-white/10 rounded-md overflow-hidden bg-white/[0.02] focus-within:border-[#8B5CF6]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "number",
                                                value: stopLoss,
                                                onChange: (e)=>setStopLoss(e.target.value),
                                                placeholder: "Not set",
                                                className: "flex-1 border-0 bg-transparent text-center price-font text-sm h-9 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-white/40"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1667,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: stopLossMode,
                                                onChange: (e)=>setStopLossMode(e.target.value),
                                                className: "w-[70px] border-0 h-9 bg-transparent text-xs text-white focus:outline-none focus:ring-0 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "pips",
                                                        className: "bg-[#1a1f28]",
                                                        children: "Pips"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1679,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "price",
                                                        className: "bg-[#1a1f28]",
                                                        children: "Price"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1680,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1674,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    const currentValue = parseFloat(stopLoss) || 0;
                                                    setStopLoss((currentValue - 1).toString());
                                                },
                                                className: "h-9 w-9 flex items-center justify-center hover:bg-white/5 cursor-pointer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                    className: "h-3.5 w-3.5 text-white/60"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1689,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1682,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    const currentValue = parseFloat(stopLoss) || 0;
                                                    setStopLoss((currentValue + 1).toString());
                                                },
                                                className: "h-9 w-9 flex items-center justify-center hover:bg-white/5 cursor-pointer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    className: "h-3.5 w-3.5 text-white/60"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1698,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1691,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1666,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    (calculatedStopLossPrice !== null || stopLossMode === "price" && stopLoss) && calculateRiskBasedVolume !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-0.5",
                                        children: [
                                            stopLossMode === "pips" && stopLoss && !isNaN(parseFloat(stopLoss)) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-white/60 text-center flex justify-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "B: ",
                                                            (currentBuyPrice - parseFloat(stopLoss) * getPipSize).toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1705,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "S: ",
                                                            (currentSellPrice + parseFloat(stopLoss) * getPipSize).toFixed(2)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1706,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1704,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-red-400/80 text-center font-medium",
                                                children: (()=>{
                                                    let riskVal = parseFloat(risk) || 0;
                                                    if (riskMode === "percent") {
                                                        const equity = currentBalance?.equity || 0;
                                                        riskVal = riskVal / 100 * equity;
                                                    }
                                                    return riskVal.toFixed(2) + " USD loss";
                                                })()
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1709,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1702,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1659,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs font-medium text-white/80",
                                                children: "Take Profit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1725,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                text: "Take profit distance in pips",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                                    className: "h-3.5 w-3.5 text-white/40"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1727,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1726,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1724,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-stretch border border-white/10 rounded-md overflow-hidden bg-white/[0.02] focus-within:border-[#8B5CF6]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "number",
                                                value: takeProfit,
                                                onChange: (e)=>setTakeProfit(e.target.value),
                                                placeholder: "Not set",
                                                className: "flex-1 border-0 bg-transparent text-center price-font text-sm h-9 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-white/40"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1731,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: takeProfitMode,
                                                onChange: (e)=>setTakeProfitMode(e.target.value),
                                                className: "w-[70px] border-0 h-9 bg-transparent text-xs text-white focus:outline-none focus:ring-0 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "pips",
                                                        className: "bg-[#1a1f28]",
                                                        children: "Pips"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1743,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "price",
                                                        className: "bg-[#1a1f28]",
                                                        children: "Price"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                        lineNumber: 1744,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1738,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    const currentValue = parseFloat(takeProfit) || 0;
                                                    setTakeProfit(Math.max(0, currentValue - 1).toString());
                                                },
                                                className: "h-9 w-9 flex items-center justify-center hover:bg-white/5 cursor-pointer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                    className: "h-3.5 w-3.5 text-white/60"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1753,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1746,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    const currentValue = parseFloat(takeProfit) || 0;
                                                    setTakeProfit((currentValue + 1).toString());
                                                },
                                                className: "h-9 w-9 flex items-center justify-center hover:bg-white/5 cursor-pointer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                    className: "h-3.5 w-3.5 text-white/60"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                    lineNumber: 1762,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1755,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1730,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    (calculatedTakeProfitPrice !== null || takeProfitMode === "price" && takeProfit) && calculateRiskBasedVolume !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-0.5",
                                        children: [
                                            takeProfitMode === "pips" && calculatedTakeProfitPrice !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-white/60 text-center",
                                                children: calculatedTakeProfitPrice.toFixed(2)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1768,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-green-400/80 text-center font-medium",
                                                children: (()=>{
                                                    let pips = 0;
                                                    if (takeProfitMode === "pips") {
                                                        pips = parseFloat(takeProfit);
                                                    } else {
                                                        // Price mode
                                                        const tpPrice = parseFloat(takeProfit);
                                                        if (!isNaN(tpPrice)) {
                                                            let entryPrice = 0;
                                                            if (orderType === "pending" || orderType === "limit") {
                                                                entryPrice = openPrice ? parseFloat(openPrice) : 0;
                                                            } else {
                                                                entryPrice = (currentBuyPrice + currentSellPrice) / 2;
                                                            }
                                                            if (entryPrice > 0) {
                                                                const pipSize = getPipSize;
                                                                pips = Math.abs(tpPrice - entryPrice) / pipSize;
                                                            }
                                                        }
                                                    }
                                                    const profit = pips * getPipValuePerLot * calculateRiskBasedVolume;
                                                    return profit.toFixed(2) + " USD profit";
                                                })()
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                                lineNumber: 1772,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                        lineNumber: 1766,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                lineNumber: 1723,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            renderFinancialDetails()
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                lineNumber: 1164,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modals$2f$OrderModeModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showOneClickModal,
                onClose: handleOneClickModalCancel,
                onConfirm: handleOneClickModalConfirm,
                mode: "One-click form"
            }, void 0, false, {
                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                lineNumber: 1808,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modals$2f$OrderModeModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showRiskCalculatorModal,
                onClose: handleRiskCalculatorModalCancel,
                onConfirm: handleRiskCalculatorModalConfirm,
                mode: "Risk calculator form"
            }, void 0, false, {
                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                lineNumber: 1816,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            marketClosedToast && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPortal(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-4 left-4 z-[99999] bg-[#0b0e14] text-[#d1d5db] rounded-md shadow-lg border border-amber-500/60 w-[320px] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setMarketClosedToast(null),
                            className: "absolute top-2 right-2 text-[#9ca3af] hover:text-white transition-colors",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 1826,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-0.5 text-amber-400",
                                    children: "⚠"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1833,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-white font-medium text-[14px] leading-tight mb-1",
                                            children: "Market closed"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                            lineNumber: 1835,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[13px] text-[#d1d5db]",
                                            children: marketClosedMessage
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                            lineNumber: 1836,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                                    lineNumber: 1834,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trading/OrderPanel.tsx",
                            lineNumber: 1832,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trading/OrderPanel.tsx",
                    lineNumber: 1825,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/trading/OrderPanel.tsx",
                lineNumber: 1824,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)), document.body)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/trading/OrderPanel.tsx",
        lineNumber: 1137,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = OrderPanel;
}),
"[project]/src/components/ui/resizable.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResizableHandle",
    ()=>ResizableHandle,
    "ResizablePanel",
    ()=>ResizablePanel,
    "ResizablePanelGroup",
    ()=>ResizablePanelGroup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$pi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/pi/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$development$2e$edge$2d$light$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-resizable-panels/dist/react-resizable-panels.development.edge-light.js [app-ssr] (ecmascript)");
;
;
;
function ResizablePanelGroup({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$development$2e$edge$2d$light$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PanelGroup"], {
        className: `flex h-full w-full data-[panel-group-direction=vertical]:flex-col ${className || ''}`,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/resizable.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
function ResizablePanel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$development$2e$edge$2d$light$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Panel"], {
        className: className,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/resizable.tsx",
        lineNumber: 15,
        columnNumber: 10
    }, this);
}
function ResizableHandle({ withHandle, className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$development$2e$edge$2d$light$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PanelResizeHandle"], {
        className: `relative flex w-1 items-center justify-center bg-transparent after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90 hover:bg-gray-700/50 transition-colors ${className || ''}`,
        ...props,
        children: withHandle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "z-10 flex h-4 w-0 items-center justify-center rounded-sm border border-gray-600 bg-gray-700",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$pi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PiDotsThreeOutlineVerticalFill"], {
                className: "text-gray-400"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/resizable.tsx",
                lineNumber: 26,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/resizable.tsx",
            lineNumber: 25,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/resizable.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/components/modals/CloseAllPositionsDropdown.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CloseAllPositionsDropdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function CloseAllPositionsDropdown({ isOpen, onClose, onConfirm, positions, anchorRef }) {
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [selectedOption, setSelectedOption] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    // Calculate stats
    const stats = positions.reduce((acc, pos)=>{
        const pl = parseFloat(pos.pl.replace('+', ''));
        // All
        acc.all.count++;
        acc.all.pl += pl;
        // Profitable
        if (pl > 0) {
            acc.profitable.count++;
            acc.profitable.pl += pl;
        }
        // Losing
        if (pl < 0) {
            acc.losing.count++;
            acc.losing.pl += pl;
        }
        // Buy
        if (pos.type === 'Buy') {
            acc.buy.count++;
            acc.buy.pl += pl;
        }
        // Sell
        if (pos.type === 'Sell') {
            acc.sell.count++;
            acc.sell.pl += pl;
        }
        return acc;
    }, {
        all: {
            count: 0,
            pl: 0
        },
        profitable: {
            count: 0,
            pl: 0
        },
        losing: {
            count: 0,
            pl: 0
        },
        buy: {
            count: 0,
            pl: 0
        },
        sell: {
            count: 0,
            pl: 0
        }
    });
    const formatPL = (val)=>{
        if (val === 0) return '--';
        const sign = val > 0 ? '+' : '';
        return `${sign}${val.toFixed(2)}`;
    };
    const getColor = (val)=>{
        if (val === 0) return 'text-[#8b9096]';
        return val > 0 ? 'text-[#2ebd85]' : 'text-[#f6465d]';
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            const target = event.target;
            if (dropdownRef.current && !dropdownRef.current.contains(target) && anchorRef.current && !anchorRef.current.contains(target)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, [
        isOpen,
        onClose,
        anchorRef
    ]);
    if (!isOpen) return null;
    // Calculate position
    const style = {};
    if (anchorRef?.current) {
        const rect = anchorRef.current.getBoundingClientRect();
        style.bottom = `${window.innerHeight - rect.top + 8}px`;
        style.right = `${window.innerWidth - rect.right}px`;
    }
    const options = [
        {
            id: 'all',
            label: 'Close all'
        },
        {
            id: 'profitable',
            label: 'Close all profitable'
        },
        {
            id: 'losing',
            label: 'Close all losing'
        },
        {
            id: 'buy',
            label: 'Close all Buy'
        },
        {
            id: 'sell',
            label: 'Close all Sell'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: dropdownRef,
        style: style,
        className: "fixed z-[100] bg-[#02040d] rounded-lg shadow-2xl w-[320px] border border-[#363c47] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-white font-medium text-[14px] mb-3",
                    children: "Close all positions at the market prices?"
                }, void 0, false, {
                    fileName: "[project]/src/components/modals/CloseAllPositionsDropdown.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: options.map((opt)=>{
                        const stat = stats[opt.id];
                        const isDisabled = stat.count === 0;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: `flex items-center justify-between cursor-pointer group p-2 rounded hover:bg-[#363c47] transition-colors ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative flex items-center justify-center w-4 h-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                name: "closeOption",
                                                value: opt.id,
                                                checked: selectedOption === opt.id,
                                                onChange: (e)=>setSelectedOption(e.target.value),
                                                disabled: isDisabled,
                                                className: "peer appearance-none w-4 h-4 border border-[#565c66] rounded-full checked:border-[#8b5cf6] checked:bg-[#8b5cf6] transition-colors"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modals/CloseAllPositionsDropdown.tsx",
                                                lineNumber: 117,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modals/CloseAllPositionsDropdown.tsx",
                                            lineNumber: 116,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#e1e3e6] text-[13px]",
                                                    children: opt.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modals/CloseAllPositionsDropdown.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 21
                                                }, this),
                                                stat.count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "bg-[#141d22] text-[#b2b5be] text-[10px] px-1.5 py-0.5 rounded",
                                                    children: stat.count
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modals/CloseAllPositionsDropdown.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modals/CloseAllPositionsDropdown.tsx",
                                            lineNumber: 127,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modals/CloseAllPositionsDropdown.tsx",
                                    lineNumber: 115,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `text-[13px] font-mono ${getColor(stat.pl)}`,
                                    children: formatPL(stat.pl)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modals/CloseAllPositionsDropdown.tsx",
                                    lineNumber: 136,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, opt.id, true, {
                            fileName: "[project]/src/components/modals/CloseAllPositionsDropdown.tsx",
                            lineNumber: 111,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/modals/CloseAllPositionsDropdown.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 mt-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "flex-1 py-2 text-[13px] font-medium text-[#e1e3e6] bg-[#363c47] hover:bg-[#404652] transition-colors rounded",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modals/CloseAllPositionsDropdown.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                onConfirm(selectedOption);
                                onClose();
                            },
                            className: "flex-1 py-2 text-[13px] font-medium text-[#141d22] bg-[#8b5cf6] hover:bg-[#ffe54f] transition-colors rounded",
                            children: "Confirm"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modals/CloseAllPositionsDropdown.tsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modals/CloseAllPositionsDropdown.tsx",
                    lineNumber: 144,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/modals/CloseAllPositionsDropdown.tsx",
            lineNumber: 100,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/modals/CloseAllPositionsDropdown.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/StatusBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StatusBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$gi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/gi/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modals$2f$CloseAllPositionsDropdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modals/CloseAllPositionsDropdown.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$PrivacyContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/PrivacyContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$WebSocketContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/WebSocketContext.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function StatusBar({ openPositions = [], onCloseAll }) {
    const { hideBalance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$PrivacyContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePrivacy"])();
    const { ping } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$WebSocketContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWebSocket"])();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showDropdown, setShowDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fetchBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            // Get account ID directly from localStorage to be independent
            let accountId = localStorage.getItem('defaultMt5Account') || localStorage.getItem('accountId');
            const token = localStorage.getItem('token');
            // Force demo mock if we are in demo mode (which we are)
            // or if the accountId looks like a demo ID
            // Error handling: If accountId is missing, use a default demo ID
            if (!accountId) accountId = 'demo-10001';
            // Always mock for this demo terminal to avoid connection errors
            // The user wants a purely frontend demo
            setData({
                Balance: 10000.00,
                Equity: 10000.00,
                Margin: 0,
                MarginLevel: 0,
                success: true
            });
            return;
        /* 
      // Original Logic - Commented out for Demo Terminal
      if (!accountId) return;

      const baseURL = apiClient.getBaseURL();
      const response = await fetch(`${baseURL}/api/accounts/${accountId}/profile`, {
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();

      if (result.success && result.data) {
        setData(result.data);
      }
      */ } catch (err) {
            // Silently fail - balance fetch errors are not critical
            // console.error('[StatusBar] Direct Fetch Error:', err);
            // Fallback to demo data on error
            setData({
                Balance: 10000.00,
                Equity: 10000.00,
                Margin: 0,
                MarginLevel: 0,
                success: true
            });
        }
    }, []);
    // Standalone polling loop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchBalance(); // Initial fetch
        // Poll less aggressively to prevent connection exhaustion
        const interval = setInterval(fetchBalance, 5000);
        return ()=>clearInterval(interval);
    }, [
        fetchBalance
    ]);
    // Map values
    const equity = data?.Equity ?? data?.equity ?? 0;
    const balance = data?.Balance ?? data?.balance ?? 0;
    const margin = data?.Margin ?? data?.margin ?? data?.MarginUsed ?? data?.marginUsed ?? 0;
    // Calculate Free Margin: Always calculate as Equity - Margin (standard MT5 formula)
    const freeMargin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const eq = Number(equity) || 0;
        const mg = Number(margin) || 0;
        return parseFloat((eq - mg).toFixed(2));
    }, [
        equity,
        margin
    ]);
    const marginLevel = data?.MarginLevel ?? data?.marginLevel ?? 0;
    // Calculate P/L from open positions (same as CloseAllPositionsDropdown)
    // Sum up all position P/L values
    const totalPL = openPositions.reduce((sum, pos)=>{
        const pl = parseFloat(String(pos.pl || '0').replace('+', ''));
        return sum + (isNaN(pl) ? 0 : pl);
    }, 0);
    const renderValue = (value, suffix = 'USD')=>{
        if (hideBalance) return '****';
        return `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(value, 2)} ${suffix}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-background flex items-center justify-between px-4 py-2 text-xs text-gray-400 font-medium rounded-tl-md relative border-t border-gray-800",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Equity: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-200 font-mono",
                                children: renderValue(equity)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/StatusBar.tsx",
                                lineNumber: 109,
                                columnNumber: 23
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/StatusBar.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Free Margin: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-200 font-mono",
                                children: renderValue(freeMargin)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/StatusBar.tsx",
                                lineNumber: 110,
                                columnNumber: 28
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/StatusBar.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Balance: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-200 font-mono",
                                children: renderValue(balance)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/StatusBar.tsx",
                                lineNumber: 111,
                                columnNumber: 24
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/StatusBar.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Margin: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-200 font-mono",
                                children: renderValue(margin)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/StatusBar.tsx",
                                lineNumber: 112,
                                columnNumber: 23
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/StatusBar.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Margin level: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-200 font-mono",
                                children: hideBalance ? '****' : `${marginLevel.toFixed(2)}%`
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/StatusBar.tsx",
                                lineNumber: 113,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/StatusBar.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/StatusBar.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gray-400",
                        children: [
                            "Total P/L, USD: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `font-mono ${totalPL >= 0 ? 'text-[#2ebd85]' : 'text-[#f6465d]'}`,
                                children: hideBalance ? '****' : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        totalPL >= 0 ? '+' : '',
                                        totalPL.toFixed(2)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/StatusBar.tsx",
                                lineNumber: 120,
                                columnNumber: 57
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/StatusBar.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        ref: buttonRef,
                        onClick: ()=>setShowDropdown(!showDropdown),
                        disabled: openPositions.length === 0,
                        className: `px-3 mr-20 py-1 rounded text-sm flex items-center gap-2 transition-colors ${openPositions.length === 0 ? 'bg-background text-[#565c66] cursor-not-allowed' : 'bg-background hover:bg-[#363c45] text-gray-200 cursor-pointer'}`,
                        children: [
                            "Close all",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: `w-3 h-3 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`,
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M19 9l-7 7-7-7"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/StatusBar.tsx",
                                    lineNumber: 135,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/StatusBar.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/StatusBar.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-end gap-1 ml-2",
                        title: `Network Latency: ${ping}ms`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$gi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GiNetworkBars"], {
                                size: 14,
                                className: ping < 100 ? "text-emerald-500" : ping < 300 ? "text-yellow-500" : "text-red-500 animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/StatusBar.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-[10px] font-mono leading-none mb-0 ${ping === 0 ? "text-gray-500" : ping < 100 ? "text-gray-500" : ping < 300 ? "text-yellow-500/80" : "text-red-500/80"}`,
                                children: [
                                    ping > 0 ? ping : '--',
                                    " ms"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/StatusBar.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/StatusBar.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/StatusBar.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modals$2f$CloseAllPositionsDropdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showDropdown,
                onClose: ()=>setShowDropdown(false),
                onConfirm: onCloseAll,
                positions: openPositions,
                anchorRef: buttonRef
            }, void 0, false, {
                fileName: "[project]/src/components/layout/StatusBar.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/StatusBar.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/modals/ModifyPositionModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FlagIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/FlagIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Tooltip.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TradingContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/TradingContext.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const ModifyPositionModal = ()=>{
    const { modifyModalState, setModifyModalState, requestModifyPosition } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TradingContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTrading"])();
    const { isOpen, position } = modifyModalState;
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('modify');
    const [tpValue, setTpValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [slValue, setSlValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [partialVolume, setPartialVolume] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [estimatedPL, setEstimatedPL] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const onClose = ()=>{
        setModifyModalState({
            ...modifyModalState,
            isOpen: false
        });
    };
    // Reset state when position changes or modal opens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen && position) {
            // Parse TP value, removing commas if present
            // Only set value if it's already set, otherwise leave empty
            let tpValueStr = '';
            if (position?.tp && position?.tp !== 'Add' && position?.tp !== 'Not Set') {
                // Remove commas from existing TP value
                tpValueStr = String(position.tp).replace(/,/g, '');
            }
            // Parse SL value, removing commas if present
            // Only set value if it's already set, otherwise leave empty
            let slValueStr = '';
            if (position?.sl && position?.sl !== 'Add' && position?.sl !== 'Not Set') {
                // Remove commas from existing SL value
                slValueStr = String(position.sl).replace(/,/g, '');
            }
            setTpValue(tpValueStr);
            setSlValue(slValueStr);
            setPartialVolume(position?.volume || '');
        }
    }, [
        isOpen,
        position
    ]);
    // Calculate estimated P/L when TP/SL changes (only for open positions, not pending orders)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!position) return;
        // Check if this is a pending order
        const isPendingOrder = position.type === 'Buy Limit' || position.type === 'Sell Limit' || position.type === 'Buy Stop' || position.type === 'Sell Stop';
        // Don't calculate P/L for pending orders
        if (isPendingOrder) {
            setEstimatedPL(null);
            return;
        }
        // Parse prices, removing commas and formatting
        const currentPriceStr = String(position.currentPrice || position.price || '0').replace(/,/g, '');
        const openPriceStr = String(position.openPrice || position.avg_price || position.price || '0').replace(/,/g, '');
        const currentPrice = parseFloat(currentPriceStr) || 0;
        const openPrice = parseFloat(openPriceStr) || 0;
        const volume = parseFloat(position.volume || position.qty || 0);
        const isBuy = position.type === 'Buy' || position.side === 1;
        const symbol = (position.symbol || '').toUpperCase();
        // Get contract size based on symbol type
        let contractSize;
        if (symbol.includes('XAU') || symbol.includes('XAG')) {
            contractSize = 100; // Metals: 1 lot = 100 oz
        } else if (symbol.includes('BTC') || symbol.includes('ETH')) {
            contractSize = 1; // Crypto: 1 lot = 1 unit
        } else {
            contractSize = 100000; // Forex: 1 lot = 100,000 units
        }
        // Calculate current P/L
        let priceDiff = isBuy ? currentPrice - openPrice : openPrice - currentPrice;
        let currentPL = priceDiff * volume * contractSize;
        // If TP is set and would be hit, calculate P/L at TP
        // Remove commas from tpValue before parsing
        const tpValueClean = String(tpValue || '').replace(/,/g, '');
        const tp = parseFloat(tpValueClean);
        if (tp && !isNaN(tp) && tp > 0) {
            const tpDiff = isBuy ? tp - openPrice : openPrice - tp;
            const tpPL = tpDiff * volume * contractSize;
            setEstimatedPL(tpPL);
            return;
        }
        // If SL is set and would be hit, calculate P/L at SL
        // Remove commas from slValue before parsing
        const slValueClean = String(slValue || '').replace(/,/g, '');
        const sl = parseFloat(slValueClean);
        if (sl && !isNaN(sl) && sl > 0) {
            const slDiff = isBuy ? sl - openPrice : openPrice - sl;
            const slPL = slDiff * volume * contractSize;
            setEstimatedPL(slPL);
            return;
        }
        // Otherwise show current P/L
        setEstimatedPL(currentPL);
    }, [
        tpValue,
        slValue,
        position
    ]);
    if (!isOpen || !position) return null;
    const handleBackdropClick = (e)=>{
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    const adjustValue = (setter, currentValue, delta, decimals = 2)=>{
        // Get current price from position, removing commas
        const currentPriceStr = String(position.currentPrice || position.price || '0').replace(/,/g, '');
        const currentPrice = parseFloat(currentPriceStr) || 0;
        // If currentValue is empty, "Not set", "Add", or 0, use current price as base
        // Also remove commas from currentValue before parsing
        const isEmpty = !currentValue || currentValue === '' || currentValue === 'Not set' || currentValue === 'Add' || currentValue === '0';
        const currentValueClean = String(currentValue || '').replace(/,/g, '');
        const baseVal = isEmpty ? currentPrice : parseFloat(currentValueClean) || currentPrice;
        // Calculate appropriate delta based on price magnitude
        // For prices around 88,000, we need a delta of 100, not 0.1
        let adjustedDelta;
        if (baseVal >= 10000) {
            adjustedDelta = 100; // For prices >= 10,000 (e.g., BTCUSD)
        } else if (baseVal >= 1000) {
            adjustedDelta = 10; // For prices >= 1,000
        } else if (baseVal >= 100) {
            adjustedDelta = 1; // For prices >= 100
        } else if (baseVal >= 10) {
            adjustedDelta = 0.1; // For prices >= 10
        } else {
            adjustedDelta = 0.01; // For prices < 10
        }
        // Apply the sign from the original delta
        adjustedDelta = adjustedDelta * (delta > 0 ? 1 : -1);
        // Apply delta and format
        const newVal = (baseVal + adjustedDelta).toFixed(decimals);
        setter(newVal);
    };
    const handleAction = async ()=>{
        if (activeTab === 'modify') {
            try {
                // Use ticket for pending orders, id for open positions
                const orderId = position.ticket || position.id;
                console.log('[ModifyPositionModal] handleAction', {
                    position,
                    orderId,
                    tpValue,
                    slValue
                });
                if (!orderId) {
                    console.error('[ModifyPositionModal] No orderId found');
                    return;
                }
                // Clean and parse TP/SL values, removing commas
                let tp = undefined;
                let sl = undefined;
                if (tpValue && tpValue !== '' && tpValue !== 'Not set' && tpValue !== 'Add') {
                    const tpClean = String(tpValue).replace(/,/g, '').trim();
                    const tpParsed = parseFloat(tpClean);
                    if (!isNaN(tpParsed) && tpParsed > 0 && isFinite(tpParsed)) {
                        tp = tpParsed;
                    }
                }
                if (slValue && slValue !== '' && slValue !== 'Not set' && slValue !== 'Add') {
                    const slClean = String(slValue).replace(/,/g, '').trim();
                    const slParsed = parseFloat(slClean);
                    if (!isNaN(slParsed) && slParsed > 0 && isFinite(slParsed)) {
                        sl = slParsed;
                    }
                }
                // Only proceed if at least one value is being modified
                if (tp === undefined && sl === undefined) {
                    console.log('[ModifyPositionModal] No changes detected');
                    onClose();
                    return;
                }
                console.log('[ModifyPositionModal] Requesting modify:', {
                    id: orderId,
                    tp,
                    sl
                });
                requestModifyPosition({
                    id: orderId,
                    tp: tp,
                    sl: sl
                });
            } catch (error) {}
        }
        // Add logic for partial close / close by if needed
        onClose();
    };
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPortal(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/10",
        onClick: handleBackdropClick,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#02040d] border border-gray-800 rounded-lg w-[400px] shadow-2xl overflow-hidden font-sans text-gray-200",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 pt-4 pb-2 flex justify-between items-start",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-0.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-6 h-6 relative",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FlagIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                type: position.flag || 'xauusd'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                lineNumber: 218,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                            lineNumber: 217,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-baseline gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[16px] font-bold text-gray-100 tracking-wide",
                                                    children: position.symbol
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                    lineNumber: 221,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[13px] text-[#8b9096] font-normal",
                                                    children: [
                                                        position.volume,
                                                        " lots"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                            lineNumber: 220,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                    lineNumber: 216,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-1 pl-9 text-[13px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `font-medium ${position.type === 'Buy' || position.side === 1 ? 'text-[#0099ff]' : 'text-[#f6465d]'}`,
                                            children: position.type || (position.side === 1 ? 'Buy' : 'Sell')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                            lineNumber: 226,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[#8b9096]",
                                            children: [
                                                "at ",
                                                position.openPrice || position.price
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                            lineNumber: 229,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                    lineNumber: 225,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                            lineNumber: 215,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-right",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `flex items-baseline justify-end gap-1 ${parseFloat(position.pl) >= 0 ? 'text-[#00ffaa]' : 'text-[#ff444f]'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[15px] font-medium",
                                                    children: position.pl || '0.00'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] text-[#8b9096]",
                                                    children: "USD"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                            lineNumber: 236,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-[#e1e1e1] font-medium text-[13px]",
                                            children: position.currentPrice || position.price
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                            lineNumber: 240,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "text-[#8b9096] hover:text-white transition-colors cursor-pointer mt-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M6 18L18 6M6 6l12 12"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                            lineNumber: 249,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                        lineNumber: 248,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                    lineNumber: 244,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                            lineNumber: 234,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                    lineNumber: 213,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex bg-[#02040d] p-[3px] rounded border border-[#2a3038]",
                        children: [
                            'Modify',
                            'Partial close'
                        ].map((tab)=>{
                            const id = tab.toLowerCase().replace(' ', '');
                            const isActive = activeTab === id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab(id),
                                className: `flex-1 py-1.5 text-[13px] font-medium rounded-[4px] transition-all ${isActive ? 'bg-[#8b5cf6] text-black shadow-sm' : 'text-[#8b9096] hover:text-white'}`,
                                children: tab
                            }, id, false, {
                                fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                lineNumber: 262,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                        lineNumber: 257,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                    lineNumber: 256,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 pb-4 space-y-4",
                    children: [
                        activeTab === 'modify' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[12px] text-[#8b9096] font-medium",
                                                    children: "Take Profit"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    text: "Set a Take Profit if you want your order to close automatically at the price level you have specified. Setting a Take Profit allows you to lock in profits.",
                                                    placement: "top",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[#8b9096] cursor-help hover:text-white transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-3.5 h-3.5",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                lineNumber: 288,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                            lineNumber: 287,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                        lineNumber: 286,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                            lineNumber: 283,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-[38px] border border-[#2a3038] rounded hover:border-[#8b9096] transition-colors group focus-within:border-[#0099ff] bg-[#1e222d]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "Not set",
                                                    value: tpValue,
                                                    onChange: (e)=>setTpValue(e.target.value),
                                                    className: "flex-1 bg-transparent px-3 text-[14px] text-white placeholder-[#585c63] outline-none"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center border-l border-[#2a3038]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "px-3 h-full text-[12px] text-[#8b9096] hover:text-white flex items-center gap-1 transition-colors hover:bg-[#2a3038]",
                                                            children: [
                                                                "Price",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "w-2.5 h-2.5",
                                                                    fill: "currentColor",
                                                                    viewBox: "0 0 24 24",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M7 10l5 5 5-5z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                        lineNumber: 305,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                    lineNumber: 304,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                            lineNumber: 302,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex h-full border-l border-[#2a3038]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>adjustValue(setTpValue, tpValue, -0.1),
                                                                    className: "w-[32px] h-full flex items-center justify-center text-[#8b9096] hover:bg-[#2a3038] hover:text-white transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        className: "w-3 h-3",
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        viewBox: "0 0 24 24",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: 2,
                                                                            d: "M20 12H4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                            lineNumber: 314,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                        lineNumber: 313,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                    lineNumber: 309,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-[1px] h-full bg-[#2a3038]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                    lineNumber: 317,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>adjustValue(setTpValue, tpValue, 0.1),
                                                                    className: "w-[32px] h-full flex items-center justify-center text-[#8b9096] hover:bg-[#2a3038] hover:text-white transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        className: "w-3 h-3",
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        viewBox: "0 0 24 24",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: 2,
                                                                            d: "M12 4v16m8-8H4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                            lineNumber: 323,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                        lineNumber: 322,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                    lineNumber: 318,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                            lineNumber: 308,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                    lineNumber: 301,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                            lineNumber: 293,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                    lineNumber: 282,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[12px] text-[#8b9096] font-medium",
                                                    children: "Stop Loss"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                    lineNumber: 334,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    text: "Set a Stop Loss if you want your order to close automatically at the price level you have specified. Setting a Stop Loss enables you to limit losses.",
                                                    placement: "top",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[#8b9096] cursor-help hover:text-white transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-3.5 h-3.5",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                lineNumber: 338,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                            lineNumber: 337,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                        lineNumber: 336,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                    lineNumber: 335,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                            lineNumber: 333,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-[38px] border border-[#2a3038] rounded hover:border-[#8b9096] transition-colors group focus-within:border-[#0099ff] bg-[#1e222d]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "Not set",
                                                    value: slValue,
                                                    onChange: (e)=>setSlValue(e.target.value),
                                                    className: "flex-1 bg-transparent px-3 text-[14px] text-white placeholder-[#585c63] outline-none"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center border-l border-[#2a3038]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "px-3 h-full text-[12px] text-[#8b9096] hover:text-white flex items-center gap-1 transition-colors hover:bg-[#2a3038]",
                                                            children: [
                                                                "Price",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "w-2.5 h-2.5",
                                                                    fill: "currentColor",
                                                                    viewBox: "0 0 24 24",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M7 10l5 5 5-5z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                        lineNumber: 355,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                    lineNumber: 354,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                            lineNumber: 352,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex h-full border-l border-[#2a3038]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>adjustValue(setSlValue, slValue, -0.1),
                                                                    className: "w-[32px] h-full flex items-center justify-center text-[#8b9096] hover:bg-[#2a3038] hover:text-white transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        className: "w-3 h-3",
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        viewBox: "0 0 24 24",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: 2,
                                                                            d: "M20 12H4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                            lineNumber: 364,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                        lineNumber: 363,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                    lineNumber: 359,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-[1px] h-full bg-[#2a3038]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                    lineNumber: 367,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>adjustValue(setSlValue, slValue, 0.1),
                                                                    className: "w-[32px] h-full flex items-center justify-center text-[#8b9096] hover:bg-[#2a3038] hover:text-white transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        className: "w-3 h-3",
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        viewBox: "0 0 24 24",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: 2,
                                                                            d: "M12 4v16m8-8H4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                            lineNumber: 373,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                        lineNumber: 372,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                    lineNumber: 368,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                            lineNumber: 358,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                    lineNumber: 351,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                            lineNumber: 343,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                    lineNumber: 332,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true) : activeTab === 'partialclose' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-1.5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[12px] text-[#e1e1e1] font-medium",
                                            children: "Volume to close"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                            lineNumber: 386,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                        lineNumber: 385,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-[38px] border border-[#2a3038] rounded hover:border-[#8b9096] transition-colors group focus-within:border-[#0099ff] bg-[#1e222d]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 flex items-center px-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: partialVolume,
                                                        onChange: (e)=>setPartialVolume(e.target.value),
                                                        className: "w-full bg-transparent text-[14px] text-white placeholder-[#585c63] outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                        lineNumber: 390,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[14px] text-[#8b9096] ml-2",
                                                        children: "Lots"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                        lineNumber: 396,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                lineNumber: 389,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex h-full border-l border-[#2a3038]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>adjustValue(setPartialVolume, partialVolume, -0.01),
                                                        className: "w-[32px] h-full flex items-center justify-center text-[#8b9096] hover:bg-[#2a3038] hover:text-white transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-3 h-3",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M20 12H4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                lineNumber: 404,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                            lineNumber: 403,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                        lineNumber: 399,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-[1px] h-full bg-[#2a3038]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                        lineNumber: 407,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>adjustValue(setPartialVolume, partialVolume, 0.01),
                                                        className: "w-[32px] h-full flex items-center justify-center text-[#8b9096] hover:bg-[#2a3038] hover:text-white transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-3 h-3",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M12 4v16m8-8H4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                                lineNumber: 413,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                            lineNumber: 412,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                        lineNumber: 408,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                                lineNumber: 398,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                        lineNumber: 388,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1 text-[12px] text-[#8b9096]",
                                        children: [
                                            "0.01 - ",
                                            position.volume
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                        lineNumber: 418,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                lineNumber: 384,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false) : null,
                        activeTab === 'modify' && estimatedPL !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center text-[13px] text-[#8b9096] mb-2",
                            children: [
                                "Estimated P/L: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: estimatedPL >= 0 ? 'text-[#00ffaa]' : 'text-[#ff444f]',
                                    children: [
                                        estimatedPL >= 0 ? '+' : '',
                                        estimatedPL.toFixed(2),
                                        " USD"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                    lineNumber: 428,
                                    columnNumber: 30
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                            lineNumber: 427,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleAction,
                            className: "w-full h-[40px] bg-[#8b5cf6] hover:bg-[#8b5cf6] text-black text-[14px] font-medium rounded transition-colors mt-2",
                            children: activeTab === 'modify' ? 'Modify position' : 'Close position'
                        }, void 0, false, {
                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                            lineNumber: 435,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        activeTab === 'partialclose' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center text-[13px] text-[#8b9096]",
                            children: [
                                "Estimated profit: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: position.plColor,
                                    children: [
                                        position.pl,
                                        " USD"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                                    lineNumber: 444,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                            lineNumber: 443,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
                    lineNumber: 278,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
            lineNumber: 211,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/modals/ModifyPositionModal.tsx",
        lineNumber: 207,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)), document.body);
};
const __TURBOPACK__default__export__ = ModifyPositionModal;
}),
"[project]/src/components/ui/OrderPlacedToast.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrderPlacedToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function OrderPlacedToast({ order, onClose }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!order) return;
        const timer = setTimeout(()=>{
            onClose();
        }, 5000);
        return ()=>clearTimeout(timer);
    }, [
        order
    ]); // Remove onClose from dependencies to prevent timer reset
    if (!order) return null;
    // Format the order type display
    const getOrderTypeLabel = ()=>{
        if (order.orderType === 'market') {
            return order.side === 'buy' ? 'Buy' : 'Sell';
        } else if (order.orderType === 'limit') {
            return order.side === 'buy' ? 'Buy Limit' : 'Sell Limit';
        } else if (order.orderType === 'stop') {
            return order.side === 'buy' ? 'Buy Stop' : 'Sell Stop';
        }
        return order.side === 'buy' ? 'Buy' : 'Sell';
    };
    // Format price display
    const priceDisplay = order.price && !isNaN(parseFloat(order.price)) ? parseFloat(order.price).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
    }) : null;
    // Format volume display
    const volumeDisplay = parseFloat(order.volume).toFixed(2);
    // If there's an error, show error toast
    if (order.error) {
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPortal(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed bottom-4 left-4 z-[99999] bg-[#02040d] text-[#b2b5be] rounded-md shadow-lg border border-red-500/50 w-[320px] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "absolute top-2 right-2 text-[#6e757c] hover:text-white transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "18",
                                    y1: "6",
                                    x2: "6",
                                    y2: "18"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                    lineNumber: 47,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "6",
                                    y1: "6",
                                    x2: "18",
                                    y2: "18"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                    lineNumber: 48,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-0.5 text-[#f6465d]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "20",
                                    height: "20",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "12",
                                            cy: "12",
                                            r: "10"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                            lineNumber: 55,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "12",
                                            y1: "8",
                                            x2: "12",
                                            y2: "12"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                            lineNumber: 56,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "12",
                                            y1: "16",
                                            x2: "12.01",
                                            y2: "16"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                            lineNumber: 57,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-white font-medium text-[14px] leading-tight mb-1",
                                        children: "Not enough money"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                        lineNumber: 62,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[13px] text-[#b2b5be]",
                                        children: order.error
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                        lineNumber: 63,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                lineNumber: 41,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this), document.body);
    }
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPortal(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-4 left-4 z-[99999] bg-[#02040d] text-[#b2b5be] rounded-md shadow-lg border border-gray-800 w-[320px] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "absolute top-2 right-2 text-[#6e757c] hover:text-white transition-colors",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "16",
                        height: "16",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                x1: "18",
                                y1: "6",
                                x2: "6",
                                y2: "18"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                x1: "6",
                                y1: "6",
                                x2: "18",
                                y2: "18"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-0.5 text-[#2ebd85]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "20",
                                height: "20",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "12",
                                        cy: "12",
                                        r: "10"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                        points: "9 11 12 14 22 4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-white font-medium text-[14px] leading-tight mb-1",
                                    children: order.isModified ? 'Order Modified' : 'Order placed'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[13px] text-[#b2b5be] mb-3",
                                    children: [
                                        getOrderTypeLabel(),
                                        " ",
                                        volumeDisplay,
                                        " lot ",
                                        order.symbol,
                                        " ",
                                        priceDisplay ? `at ${priceDisplay}` : ''
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this),
                                order.profit !== undefined && order.profit !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between text-[13px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[#b2b5be]",
                                            children: "Profit"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                            lineNumber: 105,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `font-medium font-mono ${order.profit >= 0 ? 'text-[#2ebd85]' : 'text-[#f6465d]'}`,
                                            children: [
                                                order.profit >= 0 ? '+' : '',
                                                order.profit.toFixed(2),
                                                " USD"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                            lineNumber: 106,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                                    lineNumber: 104,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
            lineNumber: 76,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/OrderPlacedToast.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this), document.body);
}
}),
"[project]/src/components/trading/TradingTerminal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TradingTerminal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$LeftSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/LeftSidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$ChartSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/ChartSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$trading$2f$OrderPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/trading/OrderPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$resizable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/resizable.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$StatusBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/StatusBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$SidebarContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/SidebarContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TradingContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/TradingContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$InstrumentContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/InstrumentContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modals$2f$ModifyPositionModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modals/ModifyPositionModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OrderPlacedToast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/OrderPlacedToast.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function TradingTerminal() {
    const { isSidebarExpanded, setIsSidebarExpanded } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$SidebarContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSidebar"])();
    const { symbol } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$TradingContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTrading"])();
    const { instruments } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$InstrumentContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInstruments"])();
    const [marketClosedToast, setMarketClosedToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const leftPanelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [orderToast, setOrderToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Read-only demo: Close-all is disabled, but we keep the prop for StatusBar API.
    const handleCloseAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((_option)=>{
    // no-op in demo mode
    }, []);
    // Memoize toast close handlers to prevent timer resets
    const handleOrderToastClose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setOrderToast(null);
    }, []);
    // Read-only demo: no positions or history
    const openPositions = [];
    // Order placement handlers
    const handleBuyOrder = async (orderData)=>{
        setOrderToast({
            side: 'buy',
            symbol: symbol || 'BTCUSD',
            volume: orderData.volume || 0,
            price: null,
            orderType: orderData.orderType || 'market',
            profit: null,
            error: 'Trading is disabled in Demo Mode.'
        });
    };
    const handleSellOrder = async (orderData)=>{
        setOrderToast({
            side: 'sell',
            symbol: symbol || 'BTCUSD',
            volume: orderData.volume || 0,
            price: null,
            orderType: orderData.orderType || 'market',
            profit: null,
            error: 'Trading is disabled in Demo Mode.'
        });
    };
    // Demo mode: position modification is fully disabled; chart brackets are visual-only
    // Resize the left panel when it expands or collapses
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (leftPanelRef.current) {
            if (isSidebarExpanded) {
                leftPanelRef.current.resize(23); // 15% ≈ 290px on 1920px screen
            } else {
                leftPanelRef.current.resize(0);
            }
        }
    }, [
        isSidebarExpanded
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$resizable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResizablePanelGroup"], {
                direction: "horizontal",
                className: "flex-1 overflow-hidden min-h-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$resizable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResizablePanel"], {
                        ref: leftPanelRef,
                        defaultSize: 20,
                        minSize: 8,
                        maxSize: 40,
                        className: `min-h-0 h-full ${!isSidebarExpanded ? "!min-w-[48px] !max-w-[48px] !flex-none" : ""}`,
                        collapsedSize: 0,
                        collapsible: true,
                        onCollapse: ()=>setIsSidebarExpanded(false),
                        onExpand: ()=>setIsSidebarExpanded(true),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$LeftSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onPanelStateChange: setIsSidebarExpanded,
                            isExpanded: isSidebarExpanded
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$resizable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResizableHandle"], {
                        withHandle: false,
                        disabled: !isSidebarExpanded,
                        className: !isSidebarExpanded ? "pointer-events-none w-0" : ""
                    }, void 0, false, {
                        fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$resizable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResizablePanel"], {
                        defaultSize: 80,
                        className: "flex flex-col h-full gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex flex-1 overflow-hidden gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col flex-1 min-w-0 overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-h-0 overflow-hidden",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$ChartSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                                                lineNumber: 112,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                                            lineNumber: 111,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this),
                                    isRightSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-[280px] border-l border-[#2a2f36] bg-background flex-shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$trading$2f$OrderPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            onClose: ()=>setIsRightSidebarOpen(false),
                                            onBuy: handleBuyOrder,
                                            onSell: handleSellOrder
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                                            lineNumber: 119,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this),
                                    !isRightSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsRightSidebarOpen(true),
                                        className: "absolute right-0 top-2 z-50 bg-background border border-[#2a2f36] border-r-0 text-gray-400 hover:text-white transition-colors p-1.5 rounded-l-md shadow-lg cursor-pointer",
                                        title: "Open Order Panel",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                                            lineNumber: 134,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$StatusBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                openPositions: openPositions,
                                onCloseAll: handleCloseAll
                            }, void 0, false, {
                                fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modals$2f$ModifyPositionModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OrderPlacedToast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                order: orderToast,
                onClose: handleOrderToastClose
            }, void 0, false, {
                fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            marketClosedToast && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPortal(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-4 left-4 z-[99999] bg-[#0b0e14] text-[#d1d5db] rounded-md shadow-lg border border-amber-500/60 w-[320px] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setMarketClosedToast(null),
                            className: "absolute top-2 right-2 text-[#9ca3af] hover:text-white transition-colors",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                            lineNumber: 154,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-0.5 text-amber-400",
                                    children: "⚠"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                                    lineNumber: 161,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-white font-medium text-[14px] leading-tight mb-1",
                                            children: "Market closed"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                                            lineNumber: 163,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[13px] text-[#d1d5db]",
                                            children: marketClosedToast
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                                            lineNumber: 164,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                                    lineNumber: 162,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                            lineNumber: 160,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                    lineNumber: 153,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/trading/TradingTerminal.tsx",
                lineNumber: 152,
                columnNumber: 9
            }, this), document.body)
        ]
    }, void 0, true);
}
}),
"[project]/src/app/terminal/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TerminalPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$trading$2f$TradingTerminal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/trading/TradingTerminal.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function TerminalPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$trading$2f$TradingTerminal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/src/app/terminal/page.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=_3c06bae3._.js.map