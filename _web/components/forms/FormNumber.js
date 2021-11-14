import React from 'react'

export default function FormNumber(props) {
    return (
        <div className="w-full md:w-1/3 p-2 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-blue-500 text-xs font-bold mb-2" htmlFor="grid-state">{props.label}</label>
            <div className="relative">
                <input className="w-full h-12 p-2 rounded bg-transparent border border-blue-500 text-white" type="number" min={props.minmax[0]} max={props.minmax[1]} defaultValue={props.minmax[0]}/>
            </div>
        </div>
    )
}
