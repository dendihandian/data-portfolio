import React from 'react'
import Link from 'next/link'

export default function AppHeader() {
    return (
        <div>
            <header className="text-gray-600 body-font">
                <div className="container flex flex-col flex-wrap items-center px-10 py-8 md:flex-row">
                    <Link href="/">
                        <a className="flex items-center mb-4 font-medium text-white title-font md:mb-0">
                            <span className="text-3xl text-transparent bg-gradient-to-r bg-clip-text from-teal-300 to-teal-800">DataPortfolio API</span>
                        </a>
                    </Link>
                </div>
            </header>
        </div>
    )
}
