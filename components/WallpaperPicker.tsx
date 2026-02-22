"use client"

import { WallpaperPickerProps } from "@/types/WallpaperPickerProps"

const locations = [
    { id: "paris", label: "Where I was born 🗼", country: "Paris, France" },
    { id: "thoiry", label: "Where I grew up 🏔️", country: "Pays de Gex, France" },
    { id: "munich", label: "Where I live 🍺", country: "Munich, Germany" },
]

export default function WallpaperPicker({ currentLocation, onLocationChange }: WallpaperPickerProps) {
    return (
        <div className="fixed bottom-24 left-6 z-40 flex flex-col gap-2">
            {locations.map((loc) => (
                <button
                    key={loc.id}
                    onClick={() => onLocationChange(loc.id)}
                    className={`
                        px-4 py-2 rounded-full text-sm font-medium text-left
                        backdrop-blur-md border transition-all duration-200
                        ${currentLocation === loc.id
                            ? "bg-white/30 border-white/50 text-white shadow-lg"
                            : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20 hover:text-white"
                        }
                    `}
                >
                    {loc.label}
                </button>
            ))}
        </div>
    )
}