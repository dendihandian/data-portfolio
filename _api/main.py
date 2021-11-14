from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import pickle

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://data-portfolio.netlify.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BankMarketingPredict(BaseModel):
    age: int
    # age_group: Optional[int] = None
    age_group: int
    job: str
    salary: int
    marital: str
    education: str
    # marital_education: Optional[str] = None
    marital_education: str
    targeted: str
    default: str
    balance: int
    housing: str
    loan: str
    contact: str
    day: int
    month: str
    duration: int
    campaign: int


bm_model = pickle.load(open('../bank-marketing/model.pickle', 'rb'))
categorical_encoder = pickle.load(open('../bank-marketing/categorical.pickle', 'rb'))
numerical_limit = pickle.load(open('../bank-marketing/numerical.pickle', 'rb'))
response_decoder = {v: k for k, v in categorical_encoder['response'].items()}

@app.get("/")
def read_root():
    return {
        "github": "https://github.com/dendihandian/data-portfolio"
    }

@app.get("/bank-marketing/params")
def bank_marketing_params():

    categorical = {}
    for key in categorical_encoder.keys():
        categorical[key] = list(categorical_encoder[key].keys())

    return {
        'categorical': categorical,
        'numerical': numerical_limit,
    }

@app.post("/bank-marketing/predict")
def bank_marketing_predict(param: BankMarketingPredict):

    encoded_param = {}
    for key in categorical_encoder.keys():
        if key != 'response':
            encoded_param[key] = [categorical_encoder[key][param.__getattribute__(key)]]

    for key in numerical_limit.keys():
        encoded_param[key] = [param.__getattribute__(key)]

    inputs = pd.DataFrame(encoded_param)
    prediction = bm_model.predict(inputs)

    return {
        'response': response_decoder[prediction[0]]
    }
