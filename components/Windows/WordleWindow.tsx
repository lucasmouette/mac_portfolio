"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"

const WORDS = [
    { word: "VINYL", hint: "🎵 Digging for new vinyls — A nice weekend activity!" },
    { word: "PHOTO", hint: "📸 Photography — Both analog and digital, capturing every moment." },
    { word: "SLOPE", hint: "🎿 Skiing — My go-to winter escape in the Alps!" },
    { word: "FRAME", hint: "🎞️ Analog photography — The art of getting the perfect shot on film." },
    { word: "SKIING", hint: "🎿 Skiing — Carving down slopes is Lucas's happy place in winter!" },
    { word: "GAMING", hint: "🎮 Gaming — Unwinding after a long day with a good game." },
    { word: "TRAVEL", hint: "✈️ Travel — Paris, Munich, Switzerland... always on the move!" },
    { word: "ANALOG", hint: "📷 Analog photography — because some moments deserve film." },
    { word: "CARDIO", hint: "🏃 Fitness — Keeping active and pushing limits every day." },
]

const KEYBOARD_ROWS = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["ENTER","Z","X","C","V","B","N","M","⌫"],
]

type TileState = "empty" | "filled" | "correct" | "present" | "absent"
type BootStage = "logo" | "loading" | "ready" | "playing"

function getRandomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)]
}

interface WordleWindowProps {
    isOpen: boolean
    onClose: () => void
    zIndex?: number
}

export default function WordleWindow({ isOpen, onClose, zIndex }: WordleWindowProps) {
    const [bootStage, setBootStage] = useState<BootStage>("logo")
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [wordData, setWordData] = useState(() => getRandomWord())
    const [guesses, setGuesses] = useState<string[]>([])
    const [currentGuess, setCurrentGuess] = useState("")
    const [gameOver, setGameOver] = useState(false)
    const [won, setWon] = useState(false)
    const [shake, setShake] = useState(false)
    const [message, setMessage] = useState("")
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const isDragging = useRef(false)
    const dragStart = useRef({ x: 0, y: 0 })

    const target = wordData.word
    const wordLength = target.length

    /* ── Boot animation sequence ──────────────────────────────── */
    useEffect(() => {
        if (!isOpen) return
        setTimeout(() => setBootStage("logo"), 0)
        setTimeout(() => setLoadingProgress(0), 0)

        const t1 = setTimeout(() => setBootStage("loading"), 1000)
        const t2 = setTimeout(() => setBootStage("ready"), 2800)
        const t3 = setTimeout(() => setBootStage("playing"), 3400)

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }, [isOpen])

    /* ── Loading bar animation ────────────────────────────────── */
    useEffect(() => {
        if (bootStage !== "loading") return
        const interval = setInterval(() => {
            setLoadingProgress(p => {
                if (p >= 100) { clearInterval(interval); return 100 }
                return p + Math.random() * 15
            })
        }, 120)
        return () => clearInterval(interval)
    }, [bootStage])

    /* ── Reset when window re-opens ───────────────────────────── */
    useEffect(() => {
        if (!isOpen) return
        setTimeout(() => {
            setGuesses([])
            setCurrentGuess("")
            setGameOver(false)
            setWon(false)
            setMessage("")
            setWordData(getRandomWord())
        }, 0)
    }, [isOpen])

    /* ── Dragging ─────────────────────────────────────────────── */
    const onTitleBarMouseDown = useCallback((e: React.MouseEvent) => {
        isDragging.current = true
        dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y }
        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return
            setPosition({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y })
        }
        const onMouseUp = () => {
            isDragging.current = false
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseup", onMouseUp)
        }
        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseup", onMouseUp)
    }, [position])

    /* ── Letter states for keyboard coloring ──────────────────── */
    const letterStates: Record<string, TileState> = {}
    guesses.forEach(guess => {
        guess.split("").forEach((letter, i) => {
            const current = letterStates[letter]
            if (current === "correct") return
            if (letter === target[i]) {
                letterStates[letter] = "correct"
            } else if (target.includes(letter)) {
                letterStates[letter] = "present"
            } else {
                if (!current) letterStates[letter] = "absent"
            }
        })
    })

    /* ── Tile state ───────────────────────────────────────────── */
    const getTileState = (row: string, rowIndex: number, j: number): TileState => {
        const letter = row[j]?.trim() || ""
        if (!letter) return "empty"
        if (rowIndex >= guesses.length) return "filled"
        if (letter === target[j]) return "correct"
        if (target.includes(letter)) return "present"
        return "absent"
    }

    /* ── Dark mode tile + key colors ──────────────────────────── */
    const tileColors: Record<TileState, string> = {
        empty: "bg-gray-900 border-2 border-gray-700",
        filled: "bg-gray-900 border-2 border-gray-400 text-white",
        correct: "bg-green-500 border-2 border-green-500 text-white",
        present: "bg-yellow-400 border-2 border-yellow-400 text-gray-900",
        absent: "bg-gray-600 border-2 border-gray-600 text-white",
    }

    const keyColors: Record<TileState, string> = {
        empty: "bg-gray-700 text-white hover:bg-gray-600",
        filled: "bg-gray-700 text-white hover:bg-gray-600",
        correct: "bg-green-500 text-white",
        present: "bg-yellow-400 text-gray-900",
        absent: "bg-gray-600 text-white",
    }

    /* ── Submit guess ─────────────────────────────────────────── */
    const submitGuess = useCallback(() => {
        if (currentGuess.length !== wordLength) {
            setMessage(`Word must be ${wordLength} letters!`)
            setShake(true)
            setTimeout(() => { setShake(false); setMessage("") }, 600)
            return
        }
        const newGuesses = [...guesses, currentGuess]
        setGuesses(newGuesses)
        setCurrentGuess("")
        if (currentGuess === target) {
            setWon(true)
            setGameOver(true)
        } else if (newGuesses.length >= 6) {
            setGameOver(true)
        }
    }, [currentGuess, guesses, target, wordLength])

    /* ── Handle key input ─────────────────────────────────────── */
    const handleKey = useCallback((key: string) => {
        if (gameOver || bootStage !== "playing") return
        if (key === "ENTER") {
            submitGuess()
        } else if (key === "⌫" || key === "BACKSPACE") {
            setCurrentGuess(g => g.slice(0, -1))
        } else if (/^[A-Z]$/.test(key) && currentGuess.length < wordLength) {
            setCurrentGuess(g => g + key)
        }
    }, [gameOver, submitGuess, currentGuess, wordLength, bootStage])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => handleKey(e.key.toUpperCase())
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [handleKey])

    /* ── Reset game ───────────────────────────────────────────── */
    const resetGame = () => {
        setWordData(getRandomWord())
        setGuesses([])
        setCurrentGuess("")
        setGameOver(false)
        setWon(false)
        setMessage("")
    }

    /* ── Grid rows ────────────────────────────────────────────── */
    const rows = Array.from({ length: 6 }, (_, i) => {
        if (i < guesses.length) return guesses[i]
        if (i === guesses.length) return currentGuess.padEnd(wordLength, " ")
        return " ".repeat(wordLength)
    })

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: zIndex || 40 }}
        >
            <div
                className="pointer-events-auto bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                style={{
                    width: 480,
                    height: 680,
                    transform: `translate(${position.x}px, ${position.y}px)`,
                }}
            >
                {/* Title bar */}
                <div
                    className="relative h-10 bg-gray-900 border-b border-gray-800 flex items-center px-4 gap-2 cursor-grab active:cursor-grabbing select-none shrink-0"
                    onMouseDown={onTitleBarMouseDown}
                >
                    <div className="flex items-center gap-2" onMouseDown={e => e.stopPropagation()}>
                        <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
                        <button className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors" />
                        <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
                    </div>

                    {/* Nav arrows */}
                    <div className="flex items-center gap-1 ml-2">
                        <button className="p-1 rounded hover:bg-gray-800 text-gray-600">
                            <ChevronLeft size={14} />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-800 text-gray-600">
                            <ChevronRight size={14} />
                        </button>
                    </div>

                    <span className="absolute left-1/2 -translate-x-1/2 text-xs text-gray-300 font-medium pointer-events-none">
                        Hobbies — Guess the Word
                    </span>

                    {/* Reset button */}
                    {bootStage === "playing" && (
                        <button
                            onMouseDown={e => e.stopPropagation()}
                            onClick={resetGame}
                            className="ml-auto p-1.5 rounded hover:bg-gray-800 text-gray-600 hover:text-gray-400 transition-colors"
                        >
                            <RotateCcw size={14} />
                        </button>
                    )}
                </div>

                {/* Boot screen */}
                {bootStage !== "playing" && (
                    <div className="flex-1 flex flex-col items-center justify-center bg-gray-950 gap-6">

                        {/* Loading bar */}
                        {(bootStage === "loading" || bootStage === "ready") && (
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-48 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-white rounded-full transition-all duration-150"
                                        style={{ width: `${Math.min(loadingProgress, 100)}%` }}
                                    />
                                </div>
                                <span className="text-gray-500 text-xs">
                                    {bootStage === "ready" ? "Ready!" : "Loading hobbies..."}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Game content */}
                {bootStage === "playing" && (
                    <div className="flex-1 flex flex-col items-center justify-start py-5 gap-4 overflow-auto bg-gray-950">

                        {/* Header */}
                        <div className="flex items-center justify-between w-full max-w-sm px-2">
                            <div>
                                <h1 className="text-base font-bold text-white">Guess my hobby</h1>
                                <p className="text-xs text-gray-400">{wordLength}-letter word · 6 guesses</p>
                            </div>
                        </div>

                        {/* Error message */}
                        {message && (
                            <div className="px-4 py-2 bg-gray-700 text-white text-xs rounded-full font-medium">
                                {message}
                            </div>
                        )}

                        {/* Grid */}
                        <div className="flex flex-col gap-1.5">
                            {rows.map((row, i) => (
                                <div
                                    key={i}
                                    className={`flex gap-1.5 ${shake && i === guesses.length ? "animate-bounce" : ""}`}
                                >
                                    {Array.from({ length: wordLength }, (_, j) => {
                                        const state = getTileState(row, i, j)
                                        return (
                                            <div
                                                key={j}
                                                className={`w-11 h-11 flex items-center justify-center rounded-lg text-sm font-black uppercase transition-all ${tileColors[state]}`}
                                            >
                                                {row[j]?.trim() || ""}
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>

                        {/* Win / lose banner */}
                        {gameOver && (
                            <div className={`px-4 py-3 rounded-2xl text-center max-w-xs ${won ? "bg-green-950 border border-green-800" : "bg-red-950 border border-red-800"}`}>
                                {won ? (
                                    <>
                                        <p className="text-green-400 font-bold text-sm mb-1">🎉 You got it!</p>
                                        <p className="text-green-500 text-xs">{wordData.hint}</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-red-400 font-bold text-sm mb-1">The word was <span className="font-black">{target}</span></p>
                                        <p className="text-red-500 text-xs">{wordData.hint}</p>
                                    </>
                                )}
                                <button
                                    onClick={resetGame}
                                    className="mt-3 px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs rounded-full transition-colors"
                                >
                                    Try another hobby →
                                </button>
                            </div>
                        )}

                        {/* On-screen keyboard */}
                        <div className="flex flex-col gap-1.5">
                            {KEYBOARD_ROWS.map((row, i) => (
                                <div key={i} className="flex gap-1 justify-center">
                                    {row.map(key => (
                                        <button
                                            key={key}
                                            onClick={() => handleKey(key)}
                                            className={`
                                                ${key === "ENTER" || key === "⌫" ? "px-2 text-xs" : "w-9"}
                                                h-10 rounded-lg text-sm font-bold transition-colors
                                                ${keyColors[letterStates[key] || "empty"]}
                                            `}
                                        >
                                            {key}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}