"use client"

import Image from "next/image"
import FinderWindow from "./FinderWindow"
import { TrashWindowProps } from "@/types/TrashWindowProps"

export default function TrashWindow({ isOpen, onClose }: TrashWindowProps) {
    return (
        <FinderWindow title="Bin" isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-2">
                <p className="text-xs text-gray-400 mb-2">1 item</p>

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
            </div>
        </FinderWindow>
    )
}