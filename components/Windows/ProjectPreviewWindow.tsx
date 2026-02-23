"use client"

import { useRef, useCallback, useState } from "react"
import NextImage from "next/image"
import { X, ExternalLink } from "lucide-react"
import { Project } from "@/data/projects"

interface ProjectPreviewWindowProps {
    project: Project | null
    onClose: () => void
    zIndex?: number
}

export default function ProjectPreviewWindow({ project, onClose, zIndex }: ProjectPreviewWindowProps) {
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

    if (!project) return null

    return (
        <div
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: zIndex || 50 }}
        >
            <div
                className="pointer-events-auto bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden w-[560px]"
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
                        {project.name}
                    </span>
                </div>

                {/* Screenshot */}
                <div className="relative w-full h-52 bg-gray-100 overflow-hidden">
                    <NextImage
                        src={project.screenshot}
                        alt={project.name}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-4">

                    {/* Name + role */}
                    <div>
                        <h2 className="text-gray-900 font-bold text-lg">{project.name}</h2>
                        <p className="text-indigo-500 text-xs font-medium mt-0.5">{project.role}</p>
                    </div>

                    {/* Description */}
                    <div
                        className="text-gray-600 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: project.description }}
                    />

                    {/* Tech stack */}
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map(tech => (
                                <span
                                    key={tech}
                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* View project button */}
                    {project.figmaLink && (
                        <div className="pt-2 border-t border-gray-100">
                            <a
                                href={project.figmaLink}
                                target="_blank"
                                className="flex items-center justify-center gap-2 w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-xl transition-colors"
                            >
                                <ExternalLink size={14} />
                                View in Figma
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}