"use client"

import { useState, useRef, useCallback } from "react"

export default function StickyNote() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const isDragging = useRef(false)
    const dragStart = useRef({ x: 0, y: 0 })

    const onMouseDown = useCallback((e: React.MouseEvent) => {
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

    return (
        <div
            className="fixed z-20 w-56"
            style={{
                top: "60px",
                right: "20px",
                transform: `translate(${position.x}px, ${position.y}px)`,
            }}
        >
            {/* Sticky note wrapper */}
            <div
                className="bg-[#FFEF6B] shadow-lg"
                style={{
                    boxShadow: "2px 3px 8px rgba(0,0,0,0.2), inset 0 -1px 0 rgba(0,0,0,0.05)",
                    fontFamily: "'Helvetica Neue', sans-serif",
                }}
            >
                {/* Title bar — draggable */}
                <div
                    className="bg-[#F5E050] px-3 py-2 cursor-grab active:cursor-grabbing select-none flex items-center"
                    onMouseDown={onMouseDown}
                >
                    <span className="text-[#8B7500] text-xs font-semibold tracking-wide">
                        Jobs I&apos;m looking for
                    </span>
                </div>

                {/* Job list */}
                <div className="px-3 py-3 flex flex-col gap-2">
                    {[
                        { emoji: "🎯", label: "UI / UX Developer" },
                        { emoji: "🎯", label: "Product Management" },
                        { emoji: "🎯", label: "Frontend Developer" },
                        { emoji: "🎯", label: "Junior Developer" },
                    ].map((item) => (
                        <div key={item.label} className="flex items-center gap-2">
                            <span className="text-sm">{item.emoji}</span>
                            <span className="text-sm text-[#5C4A00]">{item.label}</span>
                        </div>
                    ))}

                    {/* Footer note */}
                    <div className="border-t border-[#E8D84A] mt-1 pt-2">
                        <p className="text-xs text-[#8B7500] italic">
                            Based in Munich, Germany 🇩🇪<br />Open to remote too!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}