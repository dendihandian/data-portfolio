import React from 'react'

export default function FormNumber(props) {
    return (
        <div className="w-full p-2 mb-6 md:w-1/3 md:mb-0">
            <label className="block mb-2 text-xs font-bold tracking-wide text-blue-500 uppercase" htmlFor={props.label}>{props.label}</label>
            <div className="relative">
                <input className="w-full h-12 p-2 text-white bg-transparent border border-blue-500 rounded" type="number" min={props.minmax[0]} max={props.minmax[1]} defaultValue={props.minmax[0]} id={props.label} name={props.name}/>
            </div>
        </div>
    )
}
