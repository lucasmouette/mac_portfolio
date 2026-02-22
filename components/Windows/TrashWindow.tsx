"use client"

import Image from "next/image"
import FinderWindow from "@/components/Windows/FinderWindow"
import { TrashWindowProps } from "@/types/TrashWindowProps"

export default function TrashWindow({ isOpen, onClose, zIndex, onHireMeOpen }: TrashWindowProps & { zIndex?: number, onHireMeOpen: () => void }) {

    return (
        <FinderWindow title="Bin" isOpen={isOpen} onClose={onClose} simple zIndex={zIndex}>
            <div className="flex flex-col gap-2">
                <p className="text-xs text-gray-400 mb-2">2 items</p>

                {/* Old portfolio — opens in new tab */}
                <div
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200/50 cursor-pointer transition-colors group"
                    onClick={() => window.open("https://lucasmouette.netlify.app/", "_blank")}
                >
                    <div className="w-12 h-12 relative shrink-0">
                        <Image
                            src="/pdfIcon.png"
                            alt="Old Portfolio Website"
                            fill
                            unoptimized
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-700 group-hover:text-black transition-colors">
                            Old Portfolio Website
                        </span>
                        <span className="text-xs text-gray-400">
                            Still live... for now
                        </span>
                    </div>
                </div>

                {/* open_me.gif — opens HireMe easter egg */}
                <div
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200/50 cursor-pointer transition-colors group"
                    onClick={() => onHireMeOpen()}
                >
                    <div className="w-12 h-12 relative shrink-0">
                        <Image
                            src="/photosIcon.png"
                            alt="Why you should hire me"
                            fill
                            unoptimized
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-700 group-hover:text-black transition-colors">
                            open_me.gif
                        </span>
                        <span className="text-xs text-gray-400">
                            Deleted by mistake 🐕
                        </span>
                    </div>
                </div>
            </div>
        </FinderWindow>
    )
}