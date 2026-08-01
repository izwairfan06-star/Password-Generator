import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setcharacterAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  const passwordRef = useRef(null);

  //1. CallBack Hook
  const passwordGenerator = useCallback(() => {
    let pass = ""   //password
    let str = "ABCDEFGHIJKLMNOPQRSTYVWXYZabcdefghijklmnopqrstuvwxyz"   //string
    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!2$#%^&*()~{}[]`"
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)   
    }
    setPassword(pass)
  }, [length, numberAllowed, characterAllowed, setPassword])

  //2. useEffect hook
  useEffect(() => passwordGenerator(), [length, numberAllowed, characterAllowed, passwordGenerator])

  //3. useRef
  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 101)
    window.navigator.clipboard.writeText(Password);          
  }, [Password])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg shadow-2xl rounded-2xl p-6 bg-slate-900 border border-slate-800 text-orange-400">
        <h1 className="text-2xl font-bold text-center text-white mb-6 tracking-wide">
          Password Generator
        </h1>
        
        {/* Input & Copy Button */}
        <div className="flex shadow rounded-xl overflow-hidden mb-6 border border-slate-700 bg-slate-800 focus-within:border-orange-500 transition-all">
          <input 
            type="text" 
            value={Password} 
            className="outline-none w-full py-2.5 px-4 bg-transparent text-white font-mono text-base placeholder-slate-500" 
            placeholder="password" 
            readOnly
            ref={passwordRef}
          />
          <button 
            className="outline-none bg-orange-500 hover:bg-orange-600 active:scale-95 text-slate-950 font-semibold px-5 py-2.5 shrink-0 transition-all cursor-pointer" 
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>

        {/* Controls Container */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-medium text-slate-300 bg-slate-800/50 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center gap-x-2 w-full sm:w-auto">
            <input 
              type="range" 
              min={6} 
              max={100} 
              value={length} 
              className="cursor-pointer accent-orange-500 w-full sm:w-32 h-2 bg-slate-700 rounded-lg appearance-none" 
              onChange={(e) => { setlength(e.target.value) }}
            />
            <label className="min-w-20">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-1.5 cursor-pointer">
              <input 
                type="checkbox" 
                defaultChecked={numberAllowed} 
                id="numberInput" 
                className="w-4 h-4 accent-orange-500 cursor-pointer rounded"
                onChange={() => {
                  setNumberAllowed((prev) => !prev)
                }}
              />
              <label htmlFor="numberInput" className="cursor-pointer hover:text-white transition-colors">Numbers</label>
            </div>

            <div className="flex items-center gap-x-1.5 cursor-pointer">
              <input 
                type="checkbox" 
                defaultChecked={characterAllowed} 
                id="character" 
                className="w-4 h-4 accent-orange-500 cursor-pointer rounded"
                onChange={() => {
                  setcharacterAllowed((prev) => !prev)
                }}
              />
              <label htmlFor="character" className="cursor-pointer hover:text-white transition-colors">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App