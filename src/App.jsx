import { useState, useEffect } from 'react'
import "./custom.css"

function App() {
  const [password, setPassword] = useState("")
  const [valueSlider, changeValue] = useState(10)
  const [isNumberChecked, setIsNumberChecked] = useState(false)
  const [isSpecialChecked, setIsSpecialChecked] = useState(false)

  const passwordCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXTabcdefghijklmnopqrstuvwxyz";
  const passwordNumbers = "0123456789";
  const passwordSpecial = "@#$%&()[]!+=?~"

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function passwordGenerator() {
    let temp = "";
    var numbers = []; // Initialize empty array
    let max = passwordCharacters.length;
    let passString = passwordCharacters;

    if (isNumberChecked) {
      max = max + passwordNumbers.length
      passString += passwordNumbers;
    }

    if (isSpecialChecked) {
      max = max + passwordSpecial.length
      passString += passwordSpecial;
    }

    for (var i = 0; i < max; i++) {
      numbers.push(i); // Add i to the array
    }

    numbers = shuffle(numbers)
    for (var j = 0; j < valueSlider; j++) {
      temp += passString[numbers[j]]
    }

    setPassword(temp)
  }


  const handleCharacterCheck = (e) => {
    setIsNumberChecked(e.target.checked)
  }
  const handleSpecialCheck = (e) => {
    setIsSpecialChecked(e.target.checked)
  }


  useEffect(() => {
    passwordGenerator();
  }, [isNumberChecked, isSpecialChecked, valueSlider]);


  return (
    <div className='flex justify-center'>
      <div className='flex flex-col w-1/2 items-center'>
        <h1 className='text-3xl py-4'>Password Generator</h1>
        {/* <input type='text' readOnly placeholder='password' className='w-1/2' /> */}

        <form className="flex items-center w-full">
          <label htmlFor="simple-search" className="sr-only">Copy</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
              </svg>
            </div>
            <input type="text" id="simple-search" defaultValue={password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Generated password..." required />
          </div>
          <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>

        <label htmlFor="default-range" className="block pt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Length - {valueSlider}</label>
        <input id="default-range" type="range" value={valueSlider} onChange={e => changeValue(e.target.value)} min={2} max={50} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
        {/* <label htmlFor="vol">Volume (between 0 and 50):</label>
        <input type="range" id="vol" name="vol" min="0" max="50" /> */}

        <div className="flex items-center mb-4 pt-5">
          <input onChange={handleCharacterCheck} id="ckNumbers" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="ckNumbers" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Numbers</label>
        </div>
        <div className="flex items-center">
          <input id="checked-checkbox" onChange={handleSpecialCheck} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Special Chahracters</label>
        </div>
      </div>
    </div>
  )
}

export default App
