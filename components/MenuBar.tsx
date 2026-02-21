"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { BsWifi, BsBatteryFull } from "react-icons/bs"

const menuLeftItems = [
    { label: "Lucas Mouette", action: "home" },
    { label: "Finder", action: "finder" },
    { label: "Resume", action: "resume" },
    { label: "Portfolio", action: "portfolio" },
    { label: "Hobbies", action: "hobbies" },
    { label: "About Me", action: "about" },
]

export default function MenuBar(){

    const [time, setTime] = useState<Date | null>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed z-50 w-full h-8 bg-white/10 backdrop-blur-md border-b border-white/20 flex justify-between px-4 items-center">
            <div className="flex items-center gap-4">
                <Image src="/seagull.png" alt="CrzySeagull's Logo" width={20} height={20} className="rounded-full object-cover"/>
                {menuLeftItems.map((item) => (
                    <span className="text-sm text-black" key={item.label}>{item.label}</span>
                ))}
            </div>
            <div className="flex items-center gap-3">
                <BsBatteryFull size={16} className="text-black" />
                <BsWifi size={16} className="text-black" />
                <span className="text-sm text-black">{time?.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}</span>
                <span className="text-sm text-black">{time?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
        </div>
    )
}