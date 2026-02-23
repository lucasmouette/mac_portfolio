"use client"

import { useState } from "react"
import Image from "next/image"
import Dock from "./Dock"
import MenuBar from "./MenuBar"
import WallpaperPicker from "./WallpaperPicker"
import StickyNote from "./StickyNote"
import AboutWindow from "./Windows/ImprintWindow"
import FinderWindow from "./Windows/FinderWindow"
import TrashWindow from "./Windows/TrashWindow"
import ContactWindow from "./Windows/ContactWindow"
import HireMeWindow from "./Windows/HireMeWindow"
import WordleWindow from "./Windows/WordleWindow"
import ProjectPreviewWindow from "./Windows/ProjectPreviewWindow"
import { projects } from "@/data/projects"

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

    /* ── Wallpaper state ──────────────────────────────────────── */
    const [currentLocation, setCurrentLocation] = useState("paris")
    const [isLeaving, setIsLeaving] = useState(false)

    /* ── Finder state ─────────────────────────────────────────── */
    const [finderOpen, setFinderOpen] = useState(false)
    const [finderSection, setFinderSection] = useState("projects")
    const [finderKey, setFinderKey] = useState(0)

    /* ── Z-index management ───────────────────────────────────── */
    const [topZIndex, setTopZIndex] = useState(30)
    const [windowZIndexes, setWindowZIndexes] = useState<Record<string, number>>({})

    /* ── Open windows — Set allows multiple open at once ─────── */
    const [openWindows, setOpenWindows] = useState<Set<string>>(new Set())

    /* ── HireMe easter egg ────────────────────────────────────── */
    const [hireMeOpen, setHireMeOpen] = useState(false)

    /* ── Desktop icon states ──────────────────────────────────── */
    const [resumeSelected, setResumeSelected] = useState(false)

    const [wordleOpen, setWordleOpen] = useState(false)

    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
    const selectedProject = projects.find(p => p.id === selectedProjectId) || null

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

    const openFinder = (section: string) => {
        setFinderSection(section)
        setFinderKey(k => k + 1)
        setFinderOpen(true)
        bringToFront("finder")
    }

    const bringToFront = (name: string) => {
        setTopZIndex(z => {
            const next = z + 1
            setWindowZIndexes(prev => ({ ...prev, [name]: next }))
            return next
        })
    }

    const openWindow = (name: string) => {
        setOpenWindows(prev => new Set(prev).add(name))
        bringToFront(name)
    }

    const closeWindow = (name: string) => {
        setOpenWindows(prev => {
            const next = new Set(prev)
            next.delete(name)
            return next
        })
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden">

            {/* Wallpaper */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{ backgroundImage: `url(${location.image})` }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Location name */}
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

            {/* Thoiry easter egg — pixel character + iMessage bubble */}
            {(currentLocation === "thoiry" || isLeaving) && (
                <>
                    {/* iMessage bubble */}
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
                            {/* Bubble tail */}
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

                    {/* Pixel character */}
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

            {/* Animations */}
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

            {/* Desktop icon — Resume */}
            <div
                className="fixed flex flex-col items-center gap-1 cursor-pointer group z-20"
                style={{ top: "60px", left: "20px" }}
                onClick={() => {
                    setResumeSelected(true)
                    setTimeout(() => setResumeSelected(false), 300)
                    openFinder("resume")
                }}
            >
                <div className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${resumeSelected ? "bg-white/30" : "hover:bg-white/20"}`}>
                    <div className="w-16 h-16 relative">
                        <Image src="/pdfIcon.png" alt="Resume" fill unoptimized className="object-contain" />
                    </div>
                    <span className="text-white text-xs text-center drop-shadow-md">
                        Resume.pdf
                    </span>
                </div>
            </div>

            {/* Desktop icon — Projects/Files */}
            <div
                className="fixed flex flex-col items-center gap-1 cursor-pointer group z-20"
                style={{ top: "160px", left: "20px" }}
                onClick={() => openFinder("projects")}
            >
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl transition-colors hover:bg-white/20">
                    <div className="w-16 h-16 relative">
                        <Image src="/folderIcon.png" alt="Projects" fill unoptimized className="object-contain" />
                    </div>
                    <span className="text-white text-xs text-center drop-shadow-md">
                        Projects
                    </span>
                </div>
            </div>

            {/* Menu bar */}
            <MenuBar onItemClick={(action) => {
                if (action === "finder") openFinder("projects")
                if (action === "imprint") openFinder("imprint")
                if (action === "resume") openFinder("resume")
                if (action === "portfolio") openFinder("projects")
                if (action === "hobbies") {
                    setWordleOpen(true)
                    bringToFront("wordle")
                }
            }} />

            {/* Wallpaper picker */}
            <WallpaperPicker
                currentLocation={currentLocation}
                onLocationChange={handleLocationChange}
            />

            {/* Dock */}
            <Dock
                onFinderOpen={() => openFinder("projects")}
                onFinderOpenAtSection={(section) => {
                    if (section === "hobbies") {
                        setWordleOpen(true)
                        bringToFront("wordle")
                    } else {
                        openFinder(section)
                    }
                }}
                onBringToFront={bringToFront}
                onOpenWindow={openWindow}
            />

            {/* Sticky note */}
            <StickyNote />

            {/* Finder window */}
            <div onMouseDown={() => bringToFront("finder")}>
                <FinderWindow
                    key={finderKey}
                    title="Finder"
                    isOpen={finderOpen}
                    onClose={() => setFinderOpen(false)}
                    initialSection={finderSection}
                    zIndex={windowZIndexes["finder"] || 30}
                    onProjectSelect={(id) => {
                        setSelectedProjectId(id)
                        if (id) bringToFront("project-preview")
                    }}
                >
                    <AboutWindow />
                </FinderWindow>
            </div>

            {/* Trash window */}
            <div onMouseDown={() => bringToFront("trash")}>
                <TrashWindow
                    isOpen={openWindows.has("trash")}
                    onClose={() => closeWindow("trash")}
                    zIndex={windowZIndexes["trash"] || 30}
                    onHireMeOpen={() => {
                        setHireMeOpen(true)
                        bringToFront("hireme")
                    }}
                />
            </div>

            {/* Contact window */}
            <div onMouseDown={() => bringToFront("contact")}>
                <ContactWindow
                    isOpen={openWindows.has("contact")}
                    onClose={() => closeWindow("contact")}
                    zIndex={windowZIndexes["contact"] || 30}
                />
            </div>

            <div onMouseDown={() => bringToFront("wordle")}>
                <WordleWindow
                    isOpen={wordleOpen}
                    onClose={() => setWordleOpen(false)}
                    zIndex={windowZIndexes["wordle"] || 40}
                />
            </div>

            {/* HireMe easter egg window */}
            <div onMouseDown={() => bringToFront("hireme")}>
                <HireMeWindow
                    isOpen={hireMeOpen}
                    onClose={() => setHireMeOpen(false)}
                    zIndex={windowZIndexes["hireme"] || 30}
                />
            </div>

            <div onMouseDown={() => bringToFront("project-preview")}>
                <ProjectPreviewWindow
                    project={selectedProject}
                    onClose={() => setSelectedProjectId(null)}
                    zIndex={windowZIndexes["project-preview"] || 50}
                />
            </div>

        </div>
    )
}