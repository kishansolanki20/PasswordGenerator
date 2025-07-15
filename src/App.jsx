import { useState, useCallback, useEffect, useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberallowed, setNumber] = useState(false)
  const [charallowed, setChar] = useState(false)
  const [Password, setpassword] = useState("")

  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  const passwordgen = useCallback(() => {
    let pass=""
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberallowed) str+= "0123456789"
    if(charallowed) str+= "!@#$%^&*()_+{}"

    for (let i = 1; i <=length; i++){
      let char=Math.floor(Math.random() * str.length + 1)
      pass+=str.charAt(char)   
    }
    setpassword(pass)

  }, [length,numberallowed,charallowed,setpassword])

  useEffect(()=> {passwordgen()},[length, numberallowed, charallowed, passwordgen])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-white my-4">
          <input type="text" value={Password} className='outline-none w-full py-1 px-3' placeholder="Password" readOnly ref={passwordRef}/>
          <button className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={100} value={length} className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gpa-x-1'>
            <input type="checkbox" id="numberInput" 
            onChange={() => {
              setNumber((prev) => !prev);
            }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gpa-x-1'>
            <input type="checkbox" id="charInput" 
            onChange={() => {
              setChar((prev) => !prev);
            }} />
            <label htmlFor="charInput">Chars</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
