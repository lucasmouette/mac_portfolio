"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { BsWifi, BsBatteryFull } from "react-icons/bs"

interface MenuBarProps {
    onItemClick: (action: string) => void
}

const menuLeftItems = [
    { label: "Lucas Mouette", action: "home" },
    { label: "Resume", action: "resume" },
    { label: "Projects", action: "portfolio" },
    { label: "Hobbies", action: "hobbies" },
    { label: "Imprint", action: "imprint" },
]

export default function MenuBar({ onItemClick }: MenuBarProps){

    const [time, setTime] = useState<Date | null>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed z-50 w-full h-8 bg-white/10 backdrop-blur-md border-b border-white/20 flex justify-between px-4 items-center">

            {/* Left — Logo + nav items */}
            <div className="flex items-center gap-4">
                <Image src="/seagull.png" alt="CrzySeagull's Logo" width={20} height={20} className="rounded-full object-cover"/>
                {menuLeftItems.map((item) => (
                    <span
                        key={item.label}
                        className="text-sm text-black cursor-pointer hover:opacity-70 transition-opacity"
                        onClick={() => onItemClick(item.action)}
                    >
                        {item.label}
                    </span>
                ))}
            </div>

            {/* Right — Battery, WiFi, Date & Time */}
            <div className="flex items-center gap-3">
                <BsBatteryFull size={16} className="text-black" />
                <BsWifi size={16} className="text-black" />
                <span className="text-sm text-black">{time?.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}</span>
                <span className="text-sm text-black">{time?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            </div>

        </div>
    )
}