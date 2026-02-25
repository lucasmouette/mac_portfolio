"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Linkedin } from "lucide-react"

interface HelpWindowProps {
    onClose: () => void
    zIndex?: number
}

const steps = [
    { icon: "🖱️", title: "Navigate like on a Mac", text: "Click any icon on the dock at the bottom to open a window. You can drag windows around by holding the title bar." },
    { icon: "📁", title: "Browse my projects", text: "Click the Finder icon or the Projects folder on the desktop to see all my work. Click a project to open a preview." },
    { icon: "🗑️", title: "Check the Trash", text: "There might be something worth finding in the trash... give it a click 👀" },
    { icon: "🎮", title: "Play a game", text: "Click the Hobbies icon in the dock to launch a Wordle-style game — guess my hobbies letter by letter!" },
    { icon: "🌍", title: "Change the wallpaper", text: "See the location pills at the bottom right?. Explore mylife through these wallpapers." },
    { icon: "📄", title: "Download my resume", text: "The PDF icon on the top left of the desktop opens my resume directly. Double-click the file to download it." },
]

export default function HelpWindow({ onClose, zIndex }: HelpWindowProps) {

    const [position, setPosition] = useState({ x: 1000, y: 50 })

    useEffect(() => {
        setTimeout(() => {
            setPosition({ x: window.innerWidth - 380, y: 50 })
        }, 0)
    }, [])

    const isDragging = useRef(false)
    const dragStart = useRef({ x: 0, y: 0 })

    const onTitleBarMouseDown = useCallback((e: React.MouseEvent) => {
        isDragging.current = true
        dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y }
        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return
            setPosition({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y })
        }
        const onMouseUp = () => {
            isDragging.current = false
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseup", onMouseUp)
        }
        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseup", onMouseUp)
    }, [position])

    return (
        <div
            className="fixed pointer-events-none inset-0"
            style={{ zIndex: zIndex || 35 }}
        >
            <div
                className="pointer-events-auto absolute bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                style={{
                    width: 340,
                    transform: `translate(${position.x}px, ${position.y}px)`,
                }}
            >
                {/* Title bar */}
                <div
                    className="relative h-10 bg-white border-b border-gray-100 flex items-center px-4 gap-2 cursor-grab active:cursor-grabbing select-none shrink-0"
                    onMouseDown={onTitleBarMouseDown}
                >
                    <div className="flex items-center gap-2" onMouseDown={e => e.stopPropagation()}>
                        <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
                        <button className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors" />
                        <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
                    </div>
                    <span className="absolute left-1/2 -translate-x-1/2 text-xs text-gray-600 font-medium pointer-events-none">
                        👋 How to use this portfolio
                    </span>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-3 max-h-[70vh] overflow-y-auto">

                    <p className="text-xs text-black leading-relaxed">
                        Welcome! This portfolio works like a real macOS desktop. Here&apos;s everything you can do:
                    </p>

                    {/* Steps */}
                    {steps.map((step, i) => (
                        <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                            <span className="text-xl shrink-0">{step.icon}</span>
                            <div>
                                <p className="text-xs font-bold text-gray-800 mb-0.5">{step.title}</p>
                                <p className="text-xs text-gray-500 leading-relaxed">{step.text}</p>
                            </div>
                        </div>
                    ))}

                    {/* Divider */}
                    <div className="border-t border-gray-100 pt-3">
                        <p className="text-xs text-black text-center mb-3">
                            No time to explore? No worries! 😊
                        </p>
                        <a
                            href="https://www.linkedin.com/in/lucas-mouette-65b7b6b3/"
                            target="_blank"
                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#0A66C2] hover:bg-[#0958a8] text-white text-xs font-bold rounded-xl transition-colors"
                        >
                            <Linkedin size={13} />
                            Connect on LinkedIn
                        </a>
                    </div>

                </div>
            </div>
        </div>
    )
}
