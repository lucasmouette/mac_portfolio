"use client"

import Image from "next/image"
import { useState, useRef, useCallback } from "react"
import { TrashWindowProps } from "@/types/TrashWindowProps"

export default function HireMeWindow({ isOpen, onClose, zIndex }: TrashWindowProps & { zIndex?: number }) {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const isDragging = useRef(false)
    const dragStart = useRef({ x: 0, y: 0 })

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

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: zIndex || 50 }}
        >
            <div
                className="w-auto h-auto bg-white/80 backdrop-blur-xl border border-white/30 rounded-xl shadow-2xl overflow-hidden pointer-events-auto"
                style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            >
                {/* Title bar */}
                <div
                    className="relative h-10 bg-gray-100/90 border-b border-gray-200/50 flex items-center px-4 gap-2 cursor-grab active:cursor-grabbing select-none"
                    onMouseDown={onTitleBarMouseDown}
                >
                    <div className="flex items-center gap-2" onMouseDown={e => e.stopPropagation()}>
                        <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
                        <button className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors" />
                        <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
                    </div>
                    <span className="absolute left-1/2 -translate-x-1/2 text-xs text-gray-500">
                        open_me.gif
                    </span>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col items-center gap-6 text-center">
                    <Image
                        src="/dog.gif"
                        alt="Hire me dog"
                        width={300}
                        height={300}
                        unoptimized
                        className="rounded-xl"
                    />
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Hire Lucas. You won&apos;t regret it. 🐾
                        </h2>
                        <p className="text-gray-500 text-sm max-w-sm">
                            He believes in him. Do you believe in Lucas?
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <a
                            href="mailto:mouettelucas@gmail.com"
                            className="px-5 py-2 bg-blue-400/30 hover:bg-blue-400/50 backdrop-blur-md border border-blue-300/40 text-gray-700 font-medium text-sm rounded-full shadow-sm transition-all duration-200"
                        >
                            🐾 Hire me!
                        </a>
                        <a
                            href="https://www.linkedin.com/in/lucas-mouette-65b7b6b3/"
                            target="_blank"
                            className="px-5 py-2 bg-gray-400/20 hover:bg-gray-400/30 backdrop-blur-md border border-gray-300/40 text-gray-700 font-medium text-sm rounded-full shadow-sm transition-all duration-200"
                        >
                            View LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}