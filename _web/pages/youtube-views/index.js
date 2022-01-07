import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormNumber from '../../components/forms/FormNumber';
import BeatLoader from 'react-spinners/BeatLoader'
import PacmanLoader from 'react-spinners/PacmanLoader'
import Head from 'next/head'
import Link from 'next/link'

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

function minmaxToCategories(minmax) {

    let categories = []

    for (let index = minmax[0]; index <= minmax[1]; index++) {
        categories.push(index)
    }

    return categories
}

export default function BankMarketingPage() {

    const [fields, setFields] = useState({});
    const [views, setViews] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessagePredict, setErrorMessagePredict] = useState('');

    useEffect(() => {
        axios.get(baseUrl + '/youtube-views/params').then(response => {
            setFields(response.data)
        }).catch(error => {
            setErrorMessage(error.message)
        });
    }, []);

    const predict = () => {

        const formData = new FormData(document.getElementById("youtube-views-predict-form"))
        let requestBody = {}
        for (var pair of formData.entries()) {
            requestBody[pair[0]] = pair[1]
        }

        setLoading(true)
        setViews('')
        axios.post(baseUrl + '/youtube-views/predict', requestBody).then(response => {
            setViews(response.data.views)
            setLoading(false)
        }).catch(error => {
            setErrorMessagePredict(error.message)
            setLoading(false)
        });
    } 

    let res = (
        <div className="flex items-center justify-center w-full text-white">
            <PacmanLoader color="teal"/>
        </div>
    )

    if (errorMessage) {
        res = (
            <div className="flex items-center justify-center w-full text-white">
                <span className="text-xs">{errorMessage}</span>
            </div>
        )
    }

    if (fields.numerical) {

        let responseDisplay = <span className="text-4xl">{Math.round(views, 3)}</span>

        if (loading) {
            responseDisplay = <BeatLoader color='teal'/>
        } else if (errorMessagePredict) {
            responseDisplay = <span>{errorMessagePredict}</span>
        }

        res = (
            <form className="w-full" id="youtube-views-predict-form">
                <div className="flex flex-wrap w-full content">
                    <Head>
                        <title>Trending Youtube Video Statistics - Views Predictor</title>
                        <meta name="description" content="Predicting the bank customer response whether they will buy the campaign product or not." />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <Link href="/">
                            <a className="flex text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                </svg>
                                <span className="ml-2">
                                    Back to List
                                </span>
                            </a>
                    </Link>
                    <div className="w-full py-4 text-gray-300">
                        <h2 className="text-2xl">Trending Youtube Video Statistics - Views Predictor</h2>
                    </div>
                    <div className="flex flex-wrap items-center w-full p-2 border-2 border-gray-500 rounded md:w-2/4 min-h-96">
                        <FormNumber name="likes" key="likes" label="likes" minmax={fields.numerical.likes} />
                        <FormNumber name="dislikes" key="dislikes" label="dislikes" minmax={fields.numerical.dislikes} />
                        <FormNumber name="comment_count" key="comment_count" label="comment count" minmax={fields.numerical.comment_count} />
                    </div>
                    <div className="relative flex items-center justify-center w-full py-16 md:w-1/4 min-h-96">
                        <div className="hidden w-full border border-gray-500 md:block"></div>
                        <button className="absolute p-4 px-8 font-bold text-white border-2 border-teal-500 rounded hover:border-teal-600 hover:text-teal-500 bg-neutral-800" onClick={predict} disabled={loading ? 'disabled' : ''} type={'button'}>
                            <span className={loading ? 'opacity-25' : `opacity-100`}>Predict!</span>
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full md:w-1/4">
                        <div className={`border-2 w-full h-32 text-center p-12 rounded border-green-500 text-green-500`}>
                            {responseDisplay}
                        </div>
                        <span className="mt-2 text-xl text-gray-300">Views</span>
                    </div>
                </div>
            </form>
        )
    }

    return res
}
