"use client"

import Image from "next/image"
import { useState } from "react"
import TrashWindow from "./TrashWindow"

const dockItems = [
    { label: "Finder", icon: "/finderIcon.png", action: "finder", size: 64 },
    { label: "Hobbies", icon: "/hobbies.png", action: "hobbies", size: 53 },
    { label: "Contact me!", icon: "/contactIcon.png", action: "contact", size: 64 },
    { label: "LinkedIn", icon: "/linkedinIcon.png", action: "linkedin", size: 64 },
]

const dockRightItems = [
    { label: "Files", icon: "/folderIcon.png", action: "files", size: 64 },
    { label: "Trash", icon: "/trashIcon.png", action: "trash", size: 64 },
]

export default function Dock() {
    const [openWindow, setOpenWindow] = useState<string | null>(null)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [hoveredRightIndex, setHoveredRightIndex] = useState<number | null>(null)

    const getScale = (index: number, hovered: number | null) => {
        if (hovered === null) return 1
        if (index === hovered) return 1.2
        return 1
    }

    const renderItems = (
        items: typeof dockItems,
        hovered: number | null,
        setHovered: (i: number | null) => void
    ) => items.map((item, index) => (
        <div
            key={item.label}
            className="relative flex flex-col items-center cursor-pointer"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setOpenWindow(item.action)}
            style={{
                transform: `scale(${getScale(index, hovered)})`,
                transition: "transform 0.15s ease-out",
                transformOrigin: "bottom center"
            }}
        >
            <span className={`
                absolute -top-8 text-xs text-white bg-black/50 px-2 py-0.5 rounded-md whitespace-nowrap
                transition-opacity duration-150
                ${hovered === index ? "opacity-100" : "opacity-0"}
            `}>
                {item.label}
            </span>

            <div style={{ width: item.size, height: item.size }} className="relative">
                <Image
                    src={item.icon}
                    alt={item.label}
                    fill
                    unoptimized
                    className="object-contain"
                />
            </div>
        </div>
    ))

    return (
        <>
            <div className="fixed flex items-center gap-3 bottom-2 z-50 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-4xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] left-1/2 -translate-x-1/2">

                {renderItems(dockItems, hoveredIndex, setHoveredIndex)}

                <div className="w-px h-10 bg-white/30 mx-1" />

                {renderItems(dockRightItems, hoveredRightIndex, setHoveredRightIndex)}

            </div>

            <TrashWindow
                isOpen={openWindow === "trash"}
                onClose={() => setOpenWindow(null)}
            />
        </>
    )
}