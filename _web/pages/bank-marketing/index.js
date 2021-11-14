import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormNumber from '../../components/forms/FormNumber';
import FormSelect from '../../components/forms/FormSelect'

export default function BankMarketingPage() {

    const [fields, setFields] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/bank-marketing/params').then(response => {
            setFields(response.data)
        });
    }, []);

    return (
        <div className="content w-full flex flex-wrap">
            <div className="w-full py-4 text-gray-300">
                <h2 class="text-2xl">Bank Marketing - Customer Response Predictor</h2>
            </div>
            <div className="w-full md:w-2/4 min-h-96 flex flex-wrap p-2 border-2 border-teal-500 rounded">
                <FormNumber key="age" label="Age" minmax={fields.numerical.age} />
                <FormNumber key="age_group" label="Age Group" minmax={fields.numerical.age_group} />
                <FormSelect key="default" label="Default" options={fields.categorical.default} />
                <FormSelect key="marital" label="Marital" options={fields.categorical.marital} />
                <FormSelect key="education" label="Education" options={fields.categorical.education} />
                <FormSelect key="marital_education" label="Marital-Education" options={fields.categorical.marital_education} />
                <FormSelect key="job" label="Job" options={fields.categorical.job} />
                <FormNumber key="salary" label="Salary" minmax={fields.numerical.salary} />
                <FormNumber key="balance" label="Balance" minmax={fields.numerical.balance} />
                <FormSelect key="targeted" label="Targeted" options={fields.categorical.targeted} />
                <FormSelect key="housing" label="Housing" options={fields.categorical.housing} />
                <FormSelect key="loan" label="Loan" options={fields.categorical.loan} />
                <FormNumber key="day" label="Day" minmax={fields.numerical.day} />
                <FormSelect key="month" label="Month" options={fields.categorical.month} />
                <FormSelect key="contact" label="Contact" options={fields.categorical.contact} />
                <FormNumber key="duration" label="duration" minmax={fields.numerical.duration} />
            </div>
            <div className="w-full md:w-1/4 min-h-96 flex justify-center items-center relative py-16">
                <div className="w-full border border-teal-500 hidden md:block"></div>
                <button className="absolute bg-transparent border-2 hover:border-teal-600 border-teal-500 rounded p-4 px-8 font-bold text-white hover:font-extrabold bg-true-gray-800 ">Predict!</button>
            </div>
            <div className="w-full md:w-1/4 flex flex-col justify-center items-center">
                <div className="border-2 border-red-500 text-red-500 w-full text-center p-12 rounded text-4xl ring-purple-500">
                    No
                </div>
                <span className="mt-2 text-xl text-gray-300">Response</span>
            </div>
        </div>
    )
}
