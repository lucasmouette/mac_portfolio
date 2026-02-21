"use client"

import { useState } from "react"
import { FinderWindowProps } from "@/types/FinderWindowProps"
import {
    LayoutGrid, List, Columns2, SquareStack,
    Share, Tag, MoreHorizontal, Search,
    ChevronLeft, ChevronRight, Clock, Users,
    FileText, Monitor, AppWindow, Image,
    Download, Cloud, HardDrive
} from "lucide-react"

const sidebarSections = [
    {
        items: [
            { label: "Recents", icon: Clock },
            { label: "Shared", icon: Users },
        ]
    },
    {
        title: "Favourites",
        items: [
            { label: "Documents", icon: FileText },
            { label: "Desktop", icon: Monitor },
            { label: "Applications", icon: AppWindow },
            { label: "Pictures", icon: Image },
            { label: "Downloads", icon: Download },
        ]
    },
    {
        title: "Tags",
        items: [
            { label: "Blue", color: "bg-blue-500" },
            { label: "Purple", color: "bg-purple-500" },
            { label: "Green", color: "bg-green-500" },
            { label: "Red", color: "bg-red-500" },
            { label: "All Tags...", color: null },
        ]
    },
    {
        title: "Locations",
        items: [
            { label: "iCloud Drive", icon: Cloud },
            { label: "Macintosh HD", icon: HardDrive },
        ]
    },
]

export default function FinderWindow({ title, isOpen, onClose, children }: FinderWindowProps) {
    const [searchValue, setSearchValue] = useState("")

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center">
            <div className="w-3/4 h-3/4 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-xl shadow-2xl flex flex-col overflow-hidden">

                {/* Title Bar */}
                <div className="h-12 bg-gray-100/90 border-b border-gray-200/50 flex items-center px-4 gap-3">

                    {/* Traffic lights */}
                    <div className="flex items-center gap-2">
                        <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
                        <button className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors" />
                        <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
                    </div>

                    {/* Back / Forward */}
                    <div className="flex items-center gap-1 ml-2">
                        <button className="p-1 rounded hover:bg-gray-200/70 text-gray-400 transition-colors">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-200/70 text-gray-400 transition-colors">
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* View options */}
                    <div className="flex items-center border border-gray-200 rounded-md overflow-hidden ml-2">
                        {[LayoutGrid, List, Columns2, SquareStack].map((Icon, i) => (
                            <button key={i} className="p-1.5 hover:bg-gray-200/70 text-gray-500 transition-colors border-r border-gray-200 last:border-r-0">
                                <Icon size={14} />
                            </button>
                        ))}
                    </div>

                    {/* Right side toolbar */}
                    <div className="flex items-center gap-2 ml-auto">
                        <button className="p-1.5 hover:bg-gray-200/70 rounded text-gray-500 transition-colors">
                            <Share size={14} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200/70 rounded text-gray-500 transition-colors">
                            <Tag size={14} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200/70 rounded text-gray-500 transition-colors">
                            <MoreHorizontal size={14} />
                        </button>

                        {/* Search */}
                        <div className="flex items-center gap-1 bg-gray-200/70 rounded-md px-2 py-1">
                            <Search size={12} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="bg-transparent text-xs text-gray-600 outline-none w-24 placeholder-gray-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 overflow-hidden">

                    {/* Sidebar */}
                    <div className="w-52 bg-gray-50/80 border-r border-gray-200/50 overflow-y-auto py-2 shrink-0">
                        {sidebarSections.map((section, i) => (
                            <div key={i} className="mb-3">
                                {section.title && (
                                    <p className="text-xs font-semibold text-gray-400 uppercase px-4 mb-1">
                                        {section.title}
                                    </p>
                                )}
                                {section.items.map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex items-center gap-2 px-3 py-1 hover:bg-gray-200/60 cursor-pointer rounded-md mx-1 transition-colors"
                                    >
                                        {'color' in item ? (
                                            item.color
                                                ? <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                                : <div className="w-3 h-3 rounded-full border border-gray-300" />
                                        ) : item.icon ? (
                                            <item.icon size={14} className="text-gray-500" />
                                        ) : null}
                                        <span className="text-sm text-gray-700">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Content area */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex-1 p-4 overflow-auto">
                            {children}
                        </div>

                        {/* Bottom bar */}
                        <div className="h-7 bg-gray-100/80 border-t border-gray-200/50 flex items-center px-4">
                            <span className="text-xs text-gray-500">{title}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}