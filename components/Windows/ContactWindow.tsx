"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { TrashWindowProps } from "@/types/TrashWindowProps"
import { Mail, ContactRound, Phone, Copy, Check, Download } from "lucide-react"

const contactItems = [
    {
        icon: Mail,
        label: "Email Address",
        value: "mouettelucas@gmail.com",
        copyValue: "mouettelucas@gmail.com",
        href: "mailto:mouettelucas@gmail.com",
    },
    {
        icon: ContactRound,
        label: "LinkedIn",
        value: "lucas-mouette",
        copyValue: "https://www.linkedin.com/in/lucas-mouette-65b7b6b3/",
        href: "https://www.linkedin.com/in/lucas-mouette-65b7b6b3/",
    },
    {
        icon: Phone,
        label: "Phone Number",
        value: "+49 15 77 06 28 982",
        copyValue: "+4915770628982",
        href: "tel:+4915770628982",
    },
]

export default function ContactWindow({ isOpen, onClose, zIndex }: TrashWindowProps & { zIndex?: number}) {
    const [isFlipped, setIsFlipped] = useState(false)
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
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

    /* Copy value to clipboard, show checkmark for 2s */
    const handleCopy = (value: string, index: number) => {
        navigator.clipboard.writeText(value)
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
    }

    /* Download contact info as .txt file */
    const handleDownloadPDF = () => {
        const content = `
            LUCAS MOUETTE
            Frontend Developer | UI/UX
            Munich, Germany

            CONTACT
            Email: mouettelucas@gmail.com
            LinkedIn: https://www.linkedin.com/in/lucas-mouette-65b7b6b3/
            Phone: +49 15 77 06 28 982
        `.trim()

        const blob = new Blob([content], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "lucas-mouette-contact.txt"
        a.click()
        URL.revokeObjectURL(url)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none"
            style={{ zIndex: zIndex || 30 }}
        >
            <div
                className="pointer-events-auto bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
                style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            >
                {/* Title bar */}
                <div
                    className="relative h-10 bg-white border-b border-gray-200 flex items-center px-4 gap-2 cursor-grab active:cursor-grabbing select-none"
                    onMouseDown={onTitleBarMouseDown}
                >
                    <div className="flex items-center gap-2" onMouseDown={e => e.stopPropagation()}>
                        <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
                        <button className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors" />
                        <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
                    </div>
                    <span className="absolute left-1/2 -translate-x-1/2 text-xs text-gray-800 font-medium">
                        Contact
                    </span>
                </div>

                {/* Card flip container — click anywhere to flip */}
                <div className="p-6">
                    <div
                        className="relative cursor-pointer"
                        style={{
                            width: "280px",
                            height: "420px",
                            perspective: "1000px",
                        }}
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                transformStyle: "preserve-3d",
                                transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                            }}
                        >

                            {/* Front — photo + name */}
                            <div
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden",
                                }}
                            >
                                <div className="w-full h-full bg-white rounded-3xl overflow-hidden flex flex-col shadow-xl">

                                    {/* Photo area with geometric pattern */}
                                    <div className="relative flex-1 bg-gray-50 overflow-hidden">
                                        <svg className="absolute top-0 right-0 w-32 h-32 opacity-20" viewBox="0 0 120 120">
                                            <rect x="60" y="0" width="20" height="20" fill="#6366f1" />
                                            <rect x="80" y="0" width="20" height="20" fill="#6366f1" />
                                            <rect x="100" y="0" width="20" height="20" fill="#a5b4fc" />
                                            <rect x="60" y="20" width="20" height="20" fill="#a5b4fc" />
                                            <rect x="100" y="20" width="20" height="20" fill="#6366f1" />
                                            <rect x="60" y="40" width="20" height="20" fill="#6366f1" />
                                            <rect x="80" y="40" width="20" height="20" fill="#c7d2fe" />
                                            <rect x="60" y="60" width="20" height="20" fill="#a5b4fc" />
                                            <rect x="80" y="60" width="20" height="20" fill="#6366f1" />
                                            <rect x="100" y="60" width="20" height="20" fill="#6366f1" />
                                        </svg>

                                        <svg className="absolute bottom-0 left-0 w-24 h-24 opacity-20" viewBox="0 0 80 80">
                                            <rect x="0" y="40" width="20" height="20" fill="#6366f1" />
                                            <rect x="20" y="40" width="20" height="20" fill="#a5b4fc" />
                                            <rect x="0" y="60" width="20" height="20" fill="#a5b4fc" />
                                            <rect x="20" y="60" width="20" height="20" fill="#6366f1" />
                                            <rect x="40" y="60" width="20" height="20" fill="#c7d2fe" />
                                        </svg>

                                        {/* Logo badge */}
                                        <div className="absolute top-4 left-4 flex items-center gap-1.5">
                                            <div className="w-5 h-5 bg-indigo-500 rounded-sm flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">L</span>
                                            </div>
                                            <span className="text-indigo-500 text-xs font-semibold">Contact</span>
                                        </div>

                                        {/* Profile photo */}
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-52">
                                            <Image
                                                src="/lucas.png"
                                                alt="Lucas Mouette"
                                                fill
                                                className="object-cover object-top"
                                                unoptimized
                                            />
                                        </div>
                                    </div>

                                    {/* Name + email preview */}
                                    <div className="px-5 py-4 border-t border-gray-100">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h2 className="text-gray-900 font-bold text-lg leading-tight">Lucas Mouette</h2>
                                                <p className="text-gray-500 text-xs mt-0.5">B.Sc Student</p>
                                            </div>
                                        </div>

                                        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                                            <div>
                                                <p className="text-gray-500 text-xs uppercase tracking-widest">Email Address</p>
                                                <p className="text-gray-600 text-xs">mouettelucas@gmail.com</p>
                                            </div>
                                        </div>

                                        <p className="text-gray-400 text-xs text-center mt-3">Tap to flip →</p>
                                    </div>
                                </div>
                            </div>

                            {/* Back — contact details + download */}
                            <div
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden",
                                    transform: "rotateY(180deg)",
                                }}
                            >
                                <div className="w-full h-full bg-white rounded-3xl overflow-hidden flex flex-col shadow-xl">

                                    {/* Header with geometric pattern */}
                                    <div className="relative flex-none h-40 bg-gray-50 overflow-hidden flex items-center justify-center">
                                        <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 280 160">
                                            {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(col =>
                                                [0,1,2,3,4,5,6,7].map(row => (
                                                    (col + row) % 3 !== 0 ? null :
                                                    <rect
                                                        key={`${col}-${row}`}
                                                        x={col * 22}
                                                        y={row * 22}
                                                        width="18"
                                                        height="18"
                                                        fill={row % 2 === 0 ? "#6366f1" : "#a5b4fc"}
                                                    />
                                                ))
                                            )}
                                        </svg>

                                        {/* Logo + name */}
                                        <div className="relative flex flex-col items-center gap-2">
                                            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                                                <span className="text-white text-lg font-bold">L</span>
                                            </div>
                                            <span className="text-indigo-500 text-sm font-semibold">Lucas Mouette</span>
                                        </div>
                                    </div>

                                    <div className="mx-5 border-t border-gray-200" />

                                    {/* Contact items — email, LinkedIn, phone */}
                                    <div className="flex flex-col gap-4 px-5 py-5 flex-1 justify-center">
                                        {contactItems.map((item, index) => (
                                            <div key={item.label} className="flex items-center gap-3">
                                                <div className="flex flex-col flex-1 min-w-0">
                                                    <span className="text-gray-500 text-xs uppercase tracking-widest">
                                                        {item.label}
                                                    </span>
                                                    <a
                                                        href={item.href}
                                                        target="_blank"
                                                        className="text-gray-900 text-sm font-medium truncate hover:text-indigo-500 transition-colors"
                                                        onClick={e => e.stopPropagation()}
                                                    >
                                                        {item.value}
                                                    </a>
                                                </div>
                                                {/* Copy to clipboard button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleCopy(item.copyValue, index)
                                                    }}
                                                    className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-indigo-100 transition-colors shrink-0"
                                                >
                                                    {copiedIndex === index
                                                        ? <Check size={12} className="text-green-500" />
                                                        : <Copy size={12} className="text-gray-600" />
                                                    }
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer — download + flip back */}
                                    <div className="px-5 py-4 border-t border-gray-200 flex items-center justify-between">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDownloadPDF()
                                            }}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs rounded-full transition-colors"
                                        >
                                            <Download size={11} />
                                            Download
                                        </button>
                                        <p className="text-gray-500 text-xs">← Tap to flip back</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}