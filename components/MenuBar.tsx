import Image from "next/image"

export default function MenuBar(){
    return (
        <div className="absolute z-50 w-full h-8 bg-white/70 backdrop-blur-md flex justify-between px-4 items-center">
            <div className="flex items-center gap-4">
                <Image src="/seagull.png" alt="CrzySeagull's Logo" width={20} height={20} className="rounded-full object-cover"/>
                <span>
                    Lucas Mouette
                </span>
                <span>
                    Finder
                </span>
                <span>
                    Resume    
                </span>
                <span>
                    Portfolio
                </span>
                <span>
                    Hobbies
                </span>
                <span>
                    About me
                </span>
            </div>
            <div>
                
            </div>
        </div>
    )
}