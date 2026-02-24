"use client"

import { useState, useEffect } from "react"
import { Mail, Linkedin, FileText, Monitor, Menu, X } from "lucide-react"
import Image from "next/image"

const roles = ["UI/UX Designer", "Frontend Developer", "Service Designer"]

export default function MobileFallback() {
    const [roleIndex, setRoleIndex] = useState(0)
    const [visible, setVisible] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false)
            setTimeout(() => {
                setRoleIndex(i => (i + 1) % roles.length)
                setVisible(true)
            }, 500)
        }, 2500)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="bg-[#f5f5f5] font-sans">

            {/* Fixed header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white px-5 pt-10 pb-3 flex items-center justify-between border-b border-gray-100">
                <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Portfolio</p>
                    <h1 className="text-xl font-black text-black tracking-tight">Pick Me! 🙋</h1>
                </div>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-9 h-9 bg-black flex items-center justify-center"
                >
                    {menuOpen ? <X size={15} className="text-white" /> : <Menu size={15} className="text-white" />}
                </button>
            </div>

            {/* Dropdown menu */}
            {menuOpen && (
                <div className="fixed top-[98px] left-0 right-0 bottom-0 z-40 bg-black flex flex-col">
                    {[
                        { label: "Resume", href: "/documents/resume.pdf" },
                        { label: "LinkedIn", href: "https://www.linkedin.com/in/lucas-mouette-65b7b6b3/" },
                        { label: "Contact", href: "mailto:mouettelucas@gmail.com" },
                    ].map(item => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="px-5 py-4 text-white font-bold text-sm border-b border-white/10 flex items-center justify-between"
                        >
                            {item.label}
                            <span className="text-[#b8ff57]">→</span>
                        </a>
                    ))}
                </div>
            )}


            {/* Role tabs — fixed below header */}
            {!menuOpen && (
                <div
                    className="fixed top-[98px] left-0 right-0 z-30 bg-black flex overflow-x-auto"
                    style={{ scrollbarWidth: "none" }}
                >
                    {roles.map((role, i) => (
                        <button
                            key={role}
                            onClick={() => setRoleIndex(i)}
                            className={`text-xs font-semibold whitespace-nowrap px-4 py-3 border-b-2 transition-colors shrink-0 ${
                                roleIndex === i
                                    ? "text-[#b8ff57] border-[#b8ff57]"
                                    : "text-white/40 border-transparent"
                            }`}
                        >
                            {role}
                        </button>
                    ))}
                </div>
            )}

            {/* Spacer for fixed header + tabs (~72px header + ~40px tabs) */}
            <div className={menuOpen ? "h-[98px]" : "h-[128px]"} />

            {/* Hero image — full width, tall, pulls content up */}
            <div className="relative w-full h-[70vh] bg-gray-200">
                <Image
                    src="/lucas.png"
                    alt="Lucas Mouette"
                    fill
                    unoptimized
                    className="object-cover object-top"
                />
                {/* Gradient that blends into page bg */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#f5f5f5] via-[#f5f5f5]/10 to-transparent" />

                {/* Name + role overlaid at bottom */}
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-6">
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="text-4xl font-black text-black leading-tight">
                                Lucas<br />Mouette
                            </h2>
                            <p
                                key={roleIndex}
                                className="text-gray-600 text-sm font-medium mt-1 animate-fadeIn"
                            >
                                {roles[roleIndex % roles.length]}
                            </p>
                        </div>
                        <div className="bg-[#b8ff57] text-black text-xs font-black px-3 py-1.5 mb-1">
                            OPEN
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable content */}
            <div className="flex flex-col gap-4 px-4 pb-24 -mt-2">

                {/* Desktop nudge */}
                <div className="bg-black p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#b8ff57] flex items-center justify-center shrink-0">
                        <Monitor size={18} className="text-black" />
                    </div>
                    <div className="flex-1">
                        <p className="text-white text-sm font-bold leading-tight">Way more fun on a computer!</p>
                        <p className="text-white/80 text-xs mt-0.5">This portfolio is a full macOS desktop experience 🖥️</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-white p-4 flex gap-4">
                    <div className="flex flex-col flex-1 items-center">
                        <span className="text-2xl font-black text-black">B.Sc</span>
                        <span className="text-xs text-gray-400">Student</span>
                    </div>
                    <div className="w-px bg-gray-100" />
                    <div className="flex flex-col flex-1 items-center">
                        <span className="text-2xl font-black text-black">🇩🇪</span>
                        <span className="text-xs text-gray-400">Munich</span>
                    </div>
                    <div className="w-px bg-gray-100" />
                    <div className="flex flex-col flex-1 items-center">
                        <span className="text-2xl font-black text-black">∞</span>
                        <span className="text-xs text-gray-400">Ideas</span>
                    </div>
                </div>

                {/* Stack */}
                <div className="bg-white p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Stack</p>
                    <div className="flex flex-wrap gap-1.5">
                        {["React", "Next.js", "TypeScript", "Figma", "Adobe CC", "Python", "Storyblok", "JIRA", "Git"].map(tech => (
                            <span key={tech} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Where I fit */}
                <div className="bg-white p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Where I fit in</p>
                    <div className="flex flex-wrap gap-1.5">
                        {["UI/UX Design", "Frontend Dev", "Product Management", "Project Management"].map(role => (
                            <span key={role} className="px-2.5 py-1 bg-[#b8ff57] text-black text-xs font-bold">
                                {role}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Resume + LinkedIn */}
                <div className="flex gap-3">
                    <a
                        href="/documents/resume.pdf"
                        download="Lucas_Mouette_Resume.pdf"
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 text-sm font-bold text-black"
                    >
                        <FileText size={15} />
                        Resume
                    </a>
                    <a
                        href="https://www.linkedin.com/in/lucas-mouette-65b7b6b3/"
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 text-sm font-bold text-black"
                    >
                        <Linkedin size={15} />
                        LinkedIn
                    </a>
                </div>

                {/* Hire me CTA */}
                <div className="flex gap-3">
                    <div className="w-14 h-14 bg-[#b8ff57] flex items-center justify-center shrink-0">
                        <Mail size={20} className="text-black" />
                    </div>
                    <a
                        href="mailto:mouettelucas@gmail.com"
                        className="flex-1 flex items-center justify-center py-3.5 bg-black text-sm font-black text-white"
                    >
                        Hire Me! 😊
                    </a>
                </div>

                <p className="text-center text-gray-400 text-xs pb-2">
                    mouettelucas@gmail.com
                </p>

            </div>
        </div>
    )
}