"use client"

import FinderWindow from "@/components/FinderWindow"

interface TrashWindowProps {
    isOpen: boolean
    onClose: () => void
}

export default function TrashWindow({ isOpen, onClose }: TrashWindowProps) {
    return (
        <FinderWindow title="Bin" isOpen={isOpen} onClose={onClose}>
            <p>Easter egg coming soon...</p>
        </FinderWindow>
    )
}