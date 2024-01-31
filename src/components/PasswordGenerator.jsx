import { useState, useEffect } from 'react'
import { IconContext } from "react-icons";
// import { TbPasswordFingerprint } from "react-icons/tb";
import { MdOutlinePassword } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

export default function PasswordGenerator() {

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
        <>
            <div className="flex flex-row justify-center items-center h-screen shadow-xl">
                <div className="basis-1/2 s:basis-1/2 shadow-2xl" style={{ "backgroundColor": "white", "borderTop": "4px solid green", "borderRadius": "5px" }}>
                    <div className="flex justify-center flex-col items-center">
                        <div className="py-5 flex flex-row items-center gap-4">
                            <IconContext.Provider value={{ color: 'red', size: 50 }}>
                                <MdOutlinePassword />
                            </IconContext.Provider>
                            <h1 className="text-3xl font-bold">Generate your password</h1>
                        </div>
                        <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-4 dark:bg-gray-700" />
                        <form className="flex items-center w-4/5">
                            {/* <form className="flex items-center w-full"> */}
                            <label htmlFor="simple-search" className="sr-only">Copy</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <RiLockPasswordLine />
                                </div>
                                <input type="text" id="simple-search" defaultValue={password} className="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Generated password..." required />
                            </div>
                            <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                            {/* </form> */}
                        </form>
                        <div className="px-2 pb-5 text-center w-4/5">
                            <label htmlFor="default-range" className="block pt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Length - {valueSlider}</label>
                            <input id="default-range" type="range" value={valueSlider} onChange={e => changeValue(e.target.value)} min={2} max={50} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                        </div>
                        <div className="px-2 pb-5 text-center">
                            <input onChange={handleCharacterCheck} id="ckNumbers" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="ckNumbers" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Numbers</label>
                        </div>
                        <div className="pb-5">
                            <input id="checked-checkbox" onChange={handleSpecialCheck} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Special Chahracters</label>
                        </div>
                        <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-7 dark:bg-gray-700" />
                        <div>
                            <img src="https://maxinov.com/wp-content/uploads/2023/04/maxinov_logo.webp" className="w-32 opacity-75" />
                        </div>
                        <div className="flex flex-row py-5">
                            <a href="https://maxinov.com/"><i className="fa-solid fa-house pr-4 text-slate-500" title="Home"></i></a>
                            <a href="https://twitter.com/maxinovs"><i className="fa-brands fa-x-twitter text-slate-500"></i></a>
                            <a href="https://www.linkedin.com/company/maxinov-solutions"><i className="fa-brands fa-linkedin-in pl-4 text-slate-500"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}