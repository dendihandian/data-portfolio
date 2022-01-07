import React from 'react'

export default function FormSelect(props) {
    return (
        <div className="w-full p-2 mb-6 md:w-1/3 md:mb-0">
            <label className="block mb-2 text-xs font-bold tracking-wide text-yellow-500 uppercase" htmlFor={props.label}>{props.label}</label>
            <div className="relative">
                <select className="block w-full h-12 p-2 leading-tight text-white bg-transparent border border-yellow-500 rounded appearance-none" id={props.label} name={props.name}>
                    {props.options.map((option, index) => (
                        <option className="bg-neutral-800 focus:bg-red-500" key={index} value={option}>{option}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 text-yellow-500 pointer-events-none">
                    <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
        </div>
    )
}