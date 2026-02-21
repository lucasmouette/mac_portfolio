export interface FinderWindowProps {
    title: string
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}