export interface Project {
    id: string
    name: string
    description: string
    role: string
    techStack: string[]
    figmaLink: string
    screenshot: string
}

export const projects: Project[] = [
    {
        id: "project-1",
        name: "Lorem Ipsum App",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        role: "UI/UX Designer & Frontend Developer",
        techStack: ["React", "TypeScript", "Figma", "Tailwind CSS"],
        figmaLink: "https://figma.com",
        screenshot: "/projects/placeholder.png"
    },
    {
        id: "project-2",
        name: "Dolor Sit Dashboard",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        role: "Frontend Developer",
        techStack: ["Next.js", "TypeScript", "Figma"],
        figmaLink: "https://figma.com",
        screenshot: "/projects/placeholder.png"
    },
    {
        id: "project-3",
        name: "Adipiscing Mobile",
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        role: "UI/UX Designer",
        techStack: ["Figma", "Protopie"],
        figmaLink: "https://figma.com",
        screenshot: "/projects/placeholder.png"
    },
    {
        id: "project-4",
        name: "Consectetur Platform",
        description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        role: "Full Stack Developer",
        techStack: ["React", "Node.js", "PostgreSQL", "Figma"],
        figmaLink: "https://figma.com",
        screenshot: "/projects/placeholder.png"
    },
    {
        id: "project-5",
        name: "Tempor Incididunt",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem.",
        role: "UI/UX Designer & Frontend Developer",
        techStack: ["Vue.js", "Figma", "CSS"],
        figmaLink: "https://figma.com",
        screenshot: "/projects/placeholder.png"
    },
    {
        id: "project-6",
        name: "Magna Aliqua Tool",
        description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
        role: "Frontend Developer",
        techStack: ["React", "TypeScript", "Tailwind CSS"],
        figmaLink: "https://figma.com",
        screenshot: "/projects/placeholder.png"
    },
]