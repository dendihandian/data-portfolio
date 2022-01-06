from fastapi import APIRouter
from pydantic import BaseModel
import pickle
import numpy as np
import pandas as pd

model = pickle.load(open('../bank-marketing/model.pickle', 'rb'))
categorical_encoder = pickle.load(open('../bank-marketing/categorical.pickle', 'rb'))
numerical_limit = pickle.load(open('../bank-marketing/numerical_limits.pickle', 'rb'))
response_decoder = {v: k for k, v in categorical_encoder['response'].items()}
scaler_salary = pickle.load(open('../bank-marketing/scaler_salary.pickle', 'rb'))
scaler_balance = pickle.load(open('../bank-marketing/scaler_balance.pickle', 'rb'))
scaler_duration = pickle.load(open('../bank-marketing/scaler_duration.pickle', 'rb'))

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

router = APIRouter()

@router.get("/bank-marketing/params", tags=["bank-marketing"])
async def bm_params():
    categorical = {}
    for key in categorical_encoder.keys():
        categorical[key] = list(categorical_encoder[key].keys())

    return {
        'categorical': categorical,
        'numerical': numerical_limit,
    }

@router.post("/bank-marketing/predict", tags=["bank-marketing"])
async def bm_predict(param: BankMarketingPredict):

    param.__setattr__('salary', scaler_salary.transform(np.array([param.__getattribute__('salary')]).reshape(1, -1))[0][0])
    param.__setattr__('balance', scaler_balance.transform(np.array([param.__getattribute__('balance')]).reshape(1, -1))[0][0])
    param.__setattr__('duration', scaler_duration.transform(np.array([param.__getattribute__('duration')]).reshape(1, -1))[0][0])

    encoded_param = {}
    for key in categorical_encoder.keys():
        if key != 'response':
            encoded_param[key] = [categorical_encoder[key][param.__getattribute__(key)]]

    for key in numerical_limit.keys():
        encoded_param[key] = [param.__getattribute__(key)]

    inputs = pd.DataFrame(encoded_param)
    prediction = model.predict(inputs)

    return {
        'response': response_decoder[prediction[0]]
    }