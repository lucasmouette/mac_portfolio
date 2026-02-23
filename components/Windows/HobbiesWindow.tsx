"use client"

import { useState, useEffect, useCallback } from "react"
import { RotateCcw } from "lucide-react"

const WORDS = [
    { word: "VINYL", hint: "🎵 Digging for new vinyls — Lucas's favourite weekend activity!" },
    { word: "PHOTO", hint: "📸 Photography — both analog and digital, capturing every moment." },
    { word: "SLOPE", hint: "🎿 Skiing — Lucas's go-to winter escape in the Alps!" },
    { word: "FRAME", hint: "🎞️ Analog photography — the art of getting the perfect shot on film." },
    { word: "SKIING", hint: "🎿 Skiing — carving down slopes is Lucas's happy place in winter!" },
    { word: "GAMING", hint: "🎮 Gaming — unwinding after a long day with a good game." },
    { word: "TRAVEL", hint: "✈️ Travel — Paris, Munich, Switzerland... always on the move!" },
    { word: "ANALOG", hint: "📷 Analog photography — because some moments deserve film." },
    { word: "CARDIO", hint: "🏃 Fitness — keeping active and pushing limits." },
]

const KEYBOARD_ROWS = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["ENTER","Z","X","C","V","B","N","M","⌫"],
]

type TileState = "empty" | "filled" | "correct" | "present" | "absent"

function getRandomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)]
}

export default function HobbiesWindow() {
    const [wordData, setWordData] = useState(() => getRandomWord())
    const target = wordData.word
    const wordLength = target.length

    const [guesses, setGuesses] = useState<string[]>([])
    const [currentGuess, setCurrentGuess] = useState("")
    const [gameOver, setGameOver] = useState(false)
    const [won, setWon] = useState(false)
    const [shake, setShake] = useState(false)
    const [message, setMessage] = useState("")

    /* ── Letter color tracking for keyboard ──────────────────── */
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

    /* ── Tile colors ──────────────────────────────────────────── */
    const tileColors: Record<TileState, string> = {
        empty: "bg-white border-2 border-gray-200",
        filled: "bg-white border-2 border-gray-400",
        correct: "bg-green-500 border-2 border-green-500 text-white",
        present: "bg-yellow-400 border-2 border-yellow-400 text-white",
        absent: "bg-gray-400 border-2 border-gray-400 text-white",
    }

    const keyColors: Record<TileState, string> = {
        empty: "bg-gray-200 text-gray-800",
        filled: "bg-gray-200 text-gray-800",
        correct: "bg-green-500 text-white",
        present: "bg-yellow-400 text-white",
        absent: "bg-gray-400 text-white",
    }

    /* ── Tile state for each cell ─────────────────────────────── */
    const getTileState = (row: string, rowIndex: number, letterIndex: number): TileState => {
        const letter = row[letterIndex]?.trim() || ""
        if (!letter) return "empty"
        if (rowIndex >= guesses.length) return "filled"
        if (letter === target[letterIndex]) return "correct"
        if (target.includes(letter)) return "present"
        return "absent"
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

    /* ── Physical keyboard input ──────────────────────────────── */
    const handleKey = useCallback((key: string) => {
        if (gameOver) return
        if (key === "ENTER") {
            submitGuess()
        } else if (key === "⌫" || key === "BACKSPACE") {
            setCurrentGuess(g => g.slice(0, -1))
        } else if (/^[A-Z]$/.test(key) && currentGuess.length < wordLength) {
            setCurrentGuess(g => g + key)
        }
    }, [gameOver, submitGuess, currentGuess, wordLength])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => handleKey(e.key.toUpperCase())
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [handleKey])

    /* ── Reset game with new word ─────────────────────────────── */
    const resetGame = () => {
        setWordData(getRandomWord())
        setGuesses([])
        setCurrentGuess("")
        setGameOver(false)
        setWon(false)
        setMessage("")
    }

    /* ── Build grid rows ──────────────────────────────────────── */
    const rows = Array.from({ length: 6 }, (_, i) => {
        if (i < guesses.length) return guesses[i]
        if (i === guesses.length) return currentGuess.padEnd(wordLength, " ")
        return " ".repeat(wordLength)
    })

    return (
        <div className="flex flex-col items-center justify-start h-full py-6 gap-4 overflow-auto">

            {/* Header */}
            <div className="flex items-center justify-between w-full max-w-sm px-2">
                <div>
                    <h1 className="text-lg font-bold text-gray-800">Guess my hobby 🎮</h1>
                    <p className="text-xs text-gray-400">{wordLength}-letter word · 6 guesses</p>
                </div>
                <button
                    onClick={resetGame}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    title="New word"
                >
                    <RotateCcw size={16} />
                </button>
            </div>

            {/* Shake message */}
            {message && (
                <div className="px-4 py-2 bg-gray-800 text-white text-xs rounded-full">
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
                                    className={`w-11 h-11 flex items-center justify-center rounded-lg text-sm font-bold uppercase transition-all ${tileColors[state]}`}
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
                <div className={`px-4 py-3 rounded-2xl text-center max-w-sm ${won ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                    {won ? (
                        <>
                            <p className="text-green-700 font-bold text-sm mb-1">🎉 You got it!</p>
                            <p className="text-green-600 text-xs">{wordData.hint}</p>
                        </>
                    ) : (
                        <>
                            <p className="text-red-700 font-bold text-sm mb-1">The word was <span className="font-black">{target}</span></p>
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
            <div className="flex flex-col gap-1.5 mt-1">
                {KEYBOARD_ROWS.map((row, i) => (
                    <div key={i} className="flex gap-1 justify-center">
                        {row.map(key => (
                            <button
                                key={key}
                                onClick={() => handleKey(key)}
                                className={`
                                    ${key === "ENTER" || key === "⌫" ? "px-2 text-xs" : "w-9"}
                                    h-10 rounded-lg text-sm font-semibold transition-colors
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
    )
}