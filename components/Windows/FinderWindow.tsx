"use client"

import { useState, useRef, useCallback } from "react"
import { FinderWindowProps } from "@/types/FinderWindowProps"
import {
    LayoutGrid, List, Columns2, SquareStack,
    Share, Tag, MoreHorizontal, Search,
    ChevronLeft, ChevronRight, FileText, Image, 
    Cloud, HardDrive, User, FolderOpen, Heart
} from "lucide-react"
import ImprintWindow from "./ImprintWindow"
import { downloadResume } from "@/utils/downloadResume"
import NextImage from "next/image"
import { projects } from "@/data/projects"
import ProjectPreviewWindow from "./ProjectPreviewWindow"
import HobbiesWindow from "./HobbiesWindow"

const sidebarSections = [
    {
        title: "Portfolio",
        items: [
            { label: "Projects", icon: FolderOpen },
            { label: "Resume", icon: FileText },
            { label: "Hobbies", icon: Heart },
            { label: "Imprint", icon: User },
        ]
    },
    {
        title: "Favourites",
        items: [
            { label: "Pictures", icon: Image },
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

export default function FinderWindow({ title, isOpen, onClose, children, simple, initialSection, zIndex }: FinderWindowProps & { simple?: boolean, initialSection?: string, zIndex?: number }) {
    const [searchValue, setSearchValue] = useState("")
    const [activeSection, setActiveSection] = useState(initialSection || "imprint")
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [size, setSize] = useState({ width: 900, height: 600 })
    const [selectedProject, setSelectedProject] = useState<string | null>(null)
    const selectedProjectData = projects.find(p => p.id === selectedProject) || null

    const isDragging = useRef(false)
    const isResizing = useRef(false)
    const dragStart = useRef({ x: 0, y: 0 })
    const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 })

    const onTitleBarMouseDown = useCallback((e: React.MouseEvent) => {
        isDragging.current = true
        dragStart.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        }
        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return
            setPosition({
                x: e.clientX - dragStart.current.x,
                y: e.clientY - dragStart.current.y
            })
        }
        const onMouseUp = () => {
            isDragging.current = false
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseup", onMouseUp)
        }
        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseup", onMouseUp)
    }, [position])

    const onResizeMouseDown = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        isResizing.current = true
        resizeStart.current = {
            x: e.clientX,
            y: e.clientY,
            width: size.width,
            height: size.height
        }
        const onMouseMove = (e: MouseEvent) => {
            if (!isResizing.current) return
            const newWidth = Math.max(600, resizeStart.current.width + e.clientX - resizeStart.current.x)
            const newHeight = Math.max(400, resizeStart.current.height + e.clientY - resizeStart.current.y)
            setSize({ width: newWidth, height: newHeight })
        }
        const onMouseUp = () => {
            isResizing.current = false
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseup", onMouseUp)
        }
        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseup", onMouseUp)
    }, [size])

    const renderContent = () => {
        switch (activeSection) {
            case "imprint": return <ImprintWindow />

            /* Projects — folder grid + preview window on click */
            case "projects": return (
                <>
                    <div className="p-4">
                        <p className="text-xs text-gray-400 mb-4">{projects.length} items</p>
                        <div className="grid grid-cols-4 gap-4">
                            {projects.map(project => (
                                <div
                                    key={project.id}
                                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors group"
                                    onClick={() => setSelectedProject(project.id)}
                                >
                                    <div className="w-14 h-14 relative">
                                        <NextImage
                                            src="/folderIcon.png"
                                            alt={project.name}
                                            fill
                                            unoptimized
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-xs text-gray-700 text-center leading-tight group-hover:text-gray-900">
                                        {project.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Project preview popup */}
                    <ProjectPreviewWindow
                        project={selectedProjectData}
                        onClose={() => setSelectedProject(null)}
                        zIndex={(zIndex || 30) + 1}
                    />
                </>
            )

            /* Resume — single PDF file, double-click to download */
            case "resume": return (
                <div className="p-4">
                    <p className="text-xs text-gray-400 mb-4">1 item</p>
                    <div
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors group"
                        onDoubleClick={downloadResume}
                    >
                        <div className="w-12 h-12 relative shrink-0">
                            <NextImage
                                src="/pdfIcon.png"
                                alt="Resume"
                                fill
                                unoptimized
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                                Lucas_Mouette_Resume.pdf
                            </span>
                            <span className="text-xs text-gray-400">Double-click to download</span>
                        </div>
                    </div>
                </div>
            )

            case "hobbies": return (
                <div className="p-4 flex flex-col items-center justify-center h-full gap-3">
                    <span className="text-4xl">🎮</span>
                    <p className="text-sm text-gray-500">Click Hobbies in the sidebar to launch the game</p>
                </div>
            )
            default: return <div className="p-4 text-gray-400 text-sm">Select a section</div>
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: zIndex || 30 }}
        >
            <div
                className="bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
                style={{
                    width: size.width,
                    height: size.height,
                    transform: `translate(${position.x}px, ${position.y}px)`,
                }}
            >
                {/* Title bar */}
                <div
                    className="h-12 bg-white border-b border-gray-200 flex items-center px-4 gap-3 cursor-grab active:cursor-grabbing select-none shrink-0"
                    onMouseDown={onTitleBarMouseDown}
                >
                    {/* Traffic lights */}
                    <div className="flex items-center gap-2" onMouseDown={e => e.stopPropagation()}>
                        <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
                        <button className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors" />
                        <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
                    </div>

                    {/* Back / forward */}
                    <div className="flex items-center gap-1 ml-2">
                        <button className="p-1 rounded hover:bg-gray-100 text-gray-400 transition-colors">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-100 text-gray-400 transition-colors">
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* View mode toggles */}
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden ml-2">
                        {[LayoutGrid, List, Columns2, SquareStack].map((Icon, i) => (
                            <button key={i} className="p-1.5 hover:bg-gray-100 text-gray-500 transition-colors border-r border-gray-200 last:border-r-0">
                                <Icon size={14} />
                            </button>
                        ))}
                    </div>

                    {/* Centered title */}
                    <span className="absolute left-1/2 -translate-x-1/2 text-xs text-gray-800 font-medium pointer-events-none">
                        {title}
                    </span>

                    {/* Right — actions + search */}
                    <div className="flex items-center gap-2 ml-auto">
                        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500 transition-colors">
                            <Share size={14} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500 transition-colors">
                            <Tag size={14} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500 transition-colors">
                            <MoreHorizontal size={14} />
                        </button>
                        <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1">
                            <Search size={12} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="bg-transparent text-xs text-gray-700 outline-none w-24 placeholder-gray-400"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden">

                    {/* Sidebar — only shown when not simple */}
                    {!simple && (
                        <div className="w-52 bg-gray-50 border-r border-gray-200 overflow-y-auto py-2 shrink-0">
                            {sidebarSections.map((section, i) => (
                                <div key={i} className="mb-3">
                                    {section.title && (
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-4 mb-1">
                                            {section.title}
                                        </p>
                                    )}
                                    {section.items.map((item) => (
                                        <div
                                            key={item.label}
                                            onClick={() => setActiveSection(item.label.toLowerCase())}
                                            className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer rounded-lg mx-1 transition-colors
                                                ${activeSection === item.label.toLowerCase()
                                                    ? "bg-indigo-50 text-indigo-600"
                                                    : "hover:bg-gray-200/60 text-gray-700"
                                                }`}
                                        >
                                            {'color' in item ? (
                                                item.color
                                                    ? <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                                    : <div className="w-3 h-3 rounded-full border border-gray-300" />
                                            ) : item.icon ? (
                                                <item.icon size={14} className={activeSection === item.label.toLowerCase() ? "text-indigo-500" : "text-gray-500"} />
                                            ) : null}
                                            <span className="text-sm">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Content — switches based on active sidebar section */}
                    <div className="flex-1 overflow-auto bg-white p-4">
                        {simple ? children : renderContent()}
                    </div>

                </div>

                {/* Resize handle */}
                <div
                    className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
                    onMouseDown={onResizeMouseDown}
                />
            </div>
        </div>
    )
}