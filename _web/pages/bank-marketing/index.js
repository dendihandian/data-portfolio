import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormNumber from '../../components/forms/FormNumber';
import FormSelect from '../../components/forms/FormSelect'
import BeatLoader from 'react-spinners/BeatLoader'

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export default function BankMarketingPage() {

    const [fields, setFields] = useState({});
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(baseUrl + '/bank-marketing/params').then(response => {
            setFields(response.data)
        });
    }, []);

    const predict = () => {

        const formData = new FormData(document.getElementById("bank-marketing-predict-form"))
        let requestBody = {}
        for (var pair of formData.entries()) {
            requestBody[pair[0]] = pair[1]
        }

        setLoading(true)
        axios.post(baseUrl + '/bank-marketing/predict', requestBody).then(response => {
            setResponse(response.data.response)
            setLoading(false)
        });
    } 

    let res = (
        <div className="text-white">Page Not Ready. Please Reload and Try Again</div>
    )

    if (fields.numerical && fields.categorical) {

        let responseDisplay = response
        if (loading) {
            responseDisplay = <BeatLoader color='teal'/>
        }

        res = (
            <form id="bank-marketing-predict-form">
                <div className="content w-full flex flex-wrap">
                    <div className="w-full py-4 text-gray-300">
                        <h2 className="text-2xl">Bank Marketing - Customer Response Predictor</h2>
                    </div>
                    <div className="w-full md:w-2/4 min-h-96 flex flex-wrap p-2 border-2 border-gray-500 rounded">
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
                    <div className="w-full md:w-1/4 min-h-96 flex justify-center items-center relative py-16">
                        <div className="w-full border border-gray-500 hidden md:block"></div>
                        <button className="absolute bg-transparent border-2 hover:border-teal-600 border-teal-500 rounded p-4 px-8 font-bold text-white hover:text-teal-500 bg-true-gray-800" onClick={predict} disabled={loading ? 'disabled' : ''} type={'button'}>
                            <span className={loading ? 'opacity-25' : `opacity-100`}>Predict!</span>
                        </button>
                    </div>
                    <div className="w-full md:w-1/4 flex flex-col justify-center items-center">
                        <div className={`border-2 w-full h-32 text-center p-12 rounded text-4xl ${response == 'Yes' ? "border-green-500 text-green-500" : (response == 'No' ? "border-red-500 text-red-500" : "border-gray-500 text-gray-500")}`}>
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
