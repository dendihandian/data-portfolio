import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormNumber from '../../components/forms/FormNumber';
import FormSelect from '../../components/forms/FormSelect'
import BeatLoader from 'react-spinners/BeatLoader'
import PacmanLoader from 'react-spinners/PacmanLoader'
import Head from 'next/head'
import Link from 'next/link'

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export default function BankMarketingPage() {

    const [fields, setFields] = useState({});
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessagePredict, setErrorMessagePredict] = useState('');

    useEffect(() => {
        axios.get(baseUrl + '/bank-marketing/params').then(response => {
            setFields(response.data)
        }).catch(error => {
            setErrorMessage(error.message)
        });
    }, []);

    const predict = () => {

        const formData = new FormData(document.getElementById("bank-marketing-predict-form"))
        let requestBody = {}
        for (var pair of formData.entries()) {
            requestBody[pair[0]] = pair[1]
        }

        setLoading(true)
        setResponse('')
        axios.post(baseUrl + '/bank-marketing/predict', requestBody).then(response => {
            setResponse(response.data.response)
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

    if (fields.numerical && fields.categorical) {

        let responseDisplay = <span className="text-4xl">{response}</span>

        if (loading) {
            responseDisplay = <BeatLoader color='teal'/>
        } else if (errorMessagePredict) {
            responseDisplay = <span>{errorMessagePredict}</span>
        }

        res = (
            <form id="bank-marketing-predict-form">
                <div className="flex flex-wrap w-full content">
                    <Head>
                        <title>Bank Marketing - Customer Response Predictor</title>
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
                        <h2 className="text-2xl">Bank Marketing - Customer Response Predictor</h2>
                    </div>
                    <div className="flex flex-wrap w-full p-2 border-2 border-gray-500 rounded md:w-2/4 min-h-96">
                        <FormNumber name="age" key="age" label="Age" minmax={fields.numerical.age} />
                        <FormNumber name="age_group" key="age_group" label="Age Group" minmax={fields.numerical.age_group} />
                        <FormSelect name="default" key="default" label="Default" options={fields.categorical.default} />
                        <FormSelect name="marital" key="marital" label="Marital" options={fields.categorical.marital} />
                        <FormSelect name="education" key="education" label="Education" options={fields.categorical.education} />
                        <FormSelect name="marital_education" key="marital_education" label="Marital-Education" options={fields.categorical.marital_education} />
                        <FormSelect name="job" key="job" label="Job" options={fields.categorical.job} />
                        <FormNumber name="salary" key="salary" label="Salary" minmax={fields.numerical.salary} />
                        <FormNumber name="balance" key="balance" label="Balance" minmax={fields.numerical.balance} />
                        <FormSelect name="targeted" key="targeted" label="Targeted" options={fields.categorical.targeted} />
                        <FormSelect name="housing" key="housing" label="Housing" options={fields.categorical.housing} />
                        <FormSelect name="loan" key="loan" label="Loan" options={fields.categorical.loan} />
                        <FormNumber name="day" key="day" label="Day" minmax={fields.numerical.day} />
                        <FormSelect name="month" key="month" label="Month" options={fields.categorical.month} />
                        <FormSelect name="campaign" key="campaign" label="Campaign" options={fields.numerical.campaign} />
                        <FormSelect name="contact" key="contact" label="Contact" options={fields.categorical.contact} />
                        <FormNumber name="duration" key="duration" label="Duration" minmax={fields.numerical.duration} />
                    </div>
                    <div className="relative flex items-center justify-center w-full py-16 md:w-1/4 min-h-96">
                        <div className="hidden w-full border border-gray-500 md:block"></div>
                        <button className="absolute p-4 px-8 font-bold text-white bg-transparent border-2 border-teal-500 rounded hover:border-teal-600 hover:text-teal-500 bg-true-gray-800" onClick={predict} disabled={loading ? 'disabled' : ''} type={'button'}>
                            <span className={loading ? 'opacity-25' : `opacity-100`}>Predict!</span>
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full md:w-1/4">
                        <div className={`border-2 w-full h-32 text-center p-12 rounded ${response == 'Yes' ? "border-green-500 text-green-500" : (response == 'No' ? "border-red-500 text-red-500" : "border-gray-500 text-gray-500")}`}>
                            {responseDisplay}
                        </div>
                        <span className="mt-2 text-xl text-gray-300">Response</span>
                    </div>
                </div>
            </form>
        )
    }

    return res
}
