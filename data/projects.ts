export interface Project {
    id: string
    name: string
    shortName: string
    description: string
    role: string
    techStack: string[]
    figmaLink?: string
    screenshot: string
}

export const projects: Project[] = [
    {
        id: "project-1",
        name: "Mira - The Smart Medical Assistant",
        shortName: "Mira",
        description: `Mira is a digital medical assistant that individually accompanies female patients in gynecological practices and supports doctors. 
                        The app aims to provide medical information in a targeted, understandable, and personalized way – both for patients and their medical professionals. Core functions:<br /><br />
                        <ul class="list-disc pl-6">
                            <li><strong>Personalized information feed:</strong> Patients receive only information relevant to them, adapted to their life phase (e.g., pregnancy, first visit, menopause).</li>
                            <li><strong>Relief for the medical practice:</strong> Doctors can have frequently asked questions answered in advance via the app, thus gaining more time for emergencies and personal care.</li>
                        </ul>`, 
        role: "UI/UX Designer & Service Designer",
        techStack: ["Figma", "Miro", "Adobe Creative Cloud"],
        figmaLink: "https://www.figma.com/design/VFUBPWmFfy3QbovJq5EerK/Projects---Work---Lucas-Mouette?node-id=0-1",
        screenshot: "/projects/mira.svg"
    },
    {
        id: "project-2",
        name: "Travel Buddy - Your personal Travel Planning",
        shortName: "TravelBuddy",
        description: `TravelBuddy is a modern web application that allows users to create, plan, and organize trips with the help of a tour guide. 
                        The platform combines intuitive user guidance with a solid technical foundation and demonstrates the practical use of current web technologies. Core functions:<br /><br />
                        <ul class="list-disc pl-6">
                            <li><strong>Travel management:</strong> Users can create, edit, and save new trips.</li>
                            <li><strong>Database connection:</strong> Storage and retrieval of travel data via a MongoDB database.</li>
                        </ul>`,
        role: "Full Stack Developer, UI/UX Designer",
        techStack: ["TailwindCSS", "TypeScript", "React", "Next.js", "MongoDB"],
        screenshot: "/projects/webtech.svg"
    },
    {
        id: "project-3",
        name: "IKEA Redesign - Premium Drop Culture",
        shortName: "IKEA Rebranded",
        description: `A fictional agency pitch reimagining IKEA as a premium, limited-edition furniture brand inspired by streetwear drop culture (Supreme, Palace). 
                        The concept moves away from the "everyone's living room" aesthetic toward exclusive, collectible furniture drops — where scarcity and design identity replace mass-market accessibility.<br /><br />
                        <ul class="list-disc pl-6">
                            <li><strong>Brand repositioning:</strong> Shifting IKEA from affordable & accessible to premium & limited — each collection released as a timed drop with no restocks.</li>
                            <li><strong>New visual identity:</strong> Logo redesign, color system, typography, and photography concept built around a high-end streetwear aesthetic.</li>
                            <li><strong>Digital touchpoints:</strong> Logo animation, website UI redesign, social media campaign — all reflecting the new premium drop culture direction.</li>
                            <li><strong>Slide deck:</strong> Full brand guidelines presentation designed in the spirit of the new identity.</li>
                        </ul>`,
        role: "Brand Designer, UI/UX Designer, Graphic Designer",
        techStack: ["Figma", "Adobe Creative Cloud"],
        figmaLink: "https://www.figma.com/design/VFUBPWmFfy3QbovJq5EerK/Projects---Work---Lucas-Mouette?node-id=4-163307",
        screenshot: "/projects/Ikea.png"
    },
    {
        id: "project-4",
        name: "Cultomato - Your Culture Buddy for Munich",
        shortName: "Cultomato",
        description: `CultoMato is a digital platform that connects culture enthusiasts with the best events in Munich. 
                        Through intelligent, user-friendly navigation and an interactive chatbot, 
                        CULTOMATO facilitates access to art and culture – individually tailored to the interests and availability of users.<br /><br />
                        A project from the first semester, where we developed a <strong>Chatbot</strong> in a three-person team using 
                        <strong>Gradio</strong>, <strong>Huggingface</strong>, <strong>Python</strong> and <strong>LlamaIndex</strong>`,
        role: "UI/UX Designer, Prompt Engineer, Chatbot Developer",
        techStack: ["Figma", "Python", "llama index", "HuggingFace", "Gradio"],
        figmaLink: "https://www.figma.com/design/VFUBPWmFfy3QbovJq5EerK/Projects---Work---Lucas-Mouette?node-id=2-44518",
        screenshot: "/projects/cultomato.svg"
    },
    {
        id: "project-5",
        name: "Water Crisis - Solo Poster Project",
        shortName: "Water Crisis",
        description: `As part of the Fundamentals of Design and Typography course, I created a poster series on the topic of "Water and Crisis," focusing on the water crisis in Detroit in 2014. 
                        The goal was to make a socially relevant issue visually tangible – through typographic design, clear imagery, and emotional impact. Core functions:<br /><br />
                        <ul class="list-disc pl-6">
                            <li><strong>Visual processing of the water crisis:</strong> Design of multiple posters addressing the background, effects, and injustices of the crisis.</li>
                            <li><strong>Typography as a means of expression:</strong> Use of font and layout to emphasize emotional and political statements.</li>
                            <li><strong>Social impact:</strong> The project encourages reflection and shows how design can make social problems visible and initiate discussions.</li>
                        </ul>`,
        role: "Graphic Designer, Data Visualizer",
        techStack: ["Adobe Creative Cloud"],
        figmaLink: "https://www.figma.com/design/VFUBPWmFfy3QbovJq5EerK/Projects---Work---Lucas-Mouette?node-id=3-44522",
        screenshot: "/projects/ggt.svg"
    },
]