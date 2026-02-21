import Dock from "./Dock";
import MenuBar from "./MenuBar";

export default function Desktop() {

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-blue-300">
            <MenuBar />
            <Dock />
        </div>
    )
}