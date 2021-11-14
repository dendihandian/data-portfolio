import React from 'react'

export default function AppHeader() {
    return (
        <div>
            <header className="text-gray-600 body-font">
                <div className="container px-10 flex flex-wrap py-8 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                        <span className="text-3xl bg-gradient-to-r text-transparent bg-clip-text from-teal-300 to-teal-800">DataPortfolio API</span>
                    </a>
                </div>
            </header>
        </div>
    )
}
