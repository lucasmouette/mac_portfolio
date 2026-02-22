"use client"

import { useState } from "react"
import Image from "next/image"
import Dock from "./Dock"
import MenuBar from "./MenuBar"
import WallpaperPicker from "./WallpaperPicker"
import StickyNote from "./StickyNote"

const locations: Record<string, { image: string; country: string; city: string }> = {
    paris: {
        image: "/paris.png",
        country: "France",
        city: "Paris",
    },
    thoiry: {
        image: "/montBlanc.png",
        country: "France",
        city: "Thoiry",
    },
    munich: {
        image: "/munich.png",
        country: "Germany",
        city: "Munich",
    },
}

export default function Desktop() {
    const [currentLocation, setCurrentLocation] = useState("paris")
    const [isLeaving, setIsLeaving] = useState(false)

    const location = locations[currentLocation]
    if (!location) return null

    const handleLocationChange = (location: string) => {
        if (currentLocation === "thoiry") {
            setIsLeaving(true)
            setTimeout(() => {
                setIsLeaving(false)
                setCurrentLocation(location)
            }, 200)
        } else {
            setCurrentLocation(location)
        }
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden">

            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{ backgroundImage: `url(${location.image})` }}
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute top-18 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 pointer-events-none">
                <span
                    key={currentLocation}
                    className="text-white text-4xl font-semibold tracking-wide"
                    style={{ 
                        animation: "fadeIn 0.7s ease forwards", 
                        fontFamily: "'BurnedPancakes', 'sans-serif'"
                    }}
                >
                    {location.city}, {location.country}
                </span>
            </div>

                {(currentLocation === "thoiry" || isLeaving) && (
                <>
                    <div
                        className="fixed z-40"
                        style={{
                            bottom: "280px",
                            right: "220px",
                            animation: isLeaving
                                ? "slideDown 0.5s ease forwards"
                                : "fadeIn 0.4s ease 0.4s both",
                            opacity: 0
                        }}
                    >
                        <div className="relative max-w-48 shadow-md">
                            <div className="bg-[#0B93F6] text-white text-sm px-4 py-3 rounded-[20px]">
                                Psst... it&apos;s actually<br />near Geneva,<br />Switzerland 🇨🇭
                            </div>
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: "0px",
                                    right: "-12px",
                                    width: "14px",
                                    height: "20px",
                                    background: "transparent",
                                    borderBottomLeftRadius: "10px",
                                    boxShadow: "-4px 0 0 0 #0B93F6",
                                    zIndex: -1,
                                }}
                            />
                        </div>
                    </div>
                            
                    <div
                        className="fixed z-40"
                        style={{
                            bottom: "0px",
                            right: "0px",
                            animation: isLeaving
                                ? "slideDown 0.5s ease forwards"
                                : "slideUp 0.5s ease forwards",
                            opacity: 0
                        }}
                    >
                        <div className="w-80 h-80 relative" style={{ imageRendering: "pixelated" }}>
                            <Image
                                src="/lucasAnimated.gif"
                                alt="Lucas"
                                fill
                                unoptimized
                                className="object-contain"
                            />
                        </div>
                    </div>
                </>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(80px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideDown {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(80px); }
                }
            `}</style>

            <MenuBar />
            <WallpaperPicker
                currentLocation={currentLocation}
                onLocationChange={handleLocationChange}
            />
            <Dock />
            <StickyNote />
        </div>
    )
}