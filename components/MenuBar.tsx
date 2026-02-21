"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Wifi, BatteryFull } from "lucide-react"

const menuLeftItems = [
    { label: "Lucas Mouette", action: "home" },
    { label: "Finder", action: "finder" },
    { label: "Resume", action: "resume" },
    { label: "Portfolio", action: "portfolio" },
    { label: "Hobbies", action: "hobbies" },
    { label: "About Me", action: "about" },
]

export default function MenuBar(){

    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed z-50 w-full h-8 bg-white/70 backdrop-blur-md flex justify-between px-4 items-center">
            <div className="flex items-center gap-4">
                <Image src="/seagull.png" alt="CrzySeagull's Logo" width={20} height={20} className="rounded-full object-cover"/>
                {menuLeftItems.map((item) => (
                    <span className="text-sm" key={item.label}>{item.label}</span>
                ))}
            </div>
            <div className="flex items-center gap-3">
                <BatteryFull size={14} />
                <Wifi size={14} />
                <span className="text-sm">{time.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}</span>
                <span className="text-sm">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
        </div>
    )
}