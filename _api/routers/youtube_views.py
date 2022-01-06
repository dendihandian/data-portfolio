from fastapi import APIRouter
from pydantic import BaseModel
import pickle
import numpy as np
import pandas as pd


model = pickle.load(open('../youtube-views/model.pickle', 'rb'))
scaler_views = pickle.load(open('../youtube-views/scaler_views.pickle', 'rb'))
scaler_likes = pickle.load(open('../youtube-views/scaler_likes.pickle', 'rb'))
scaler_dislikes = pickle.load(open('../youtube-views/scaler_dislikes.pickle', 'rb'))
scaler_comment_count = pickle.load(open('../youtube-views/scaler_comment_count.pickle', 'rb'))
numerical_limits = pickle.load(open('../youtube-views/numerical_limits.pickle', 'rb'))

class YoutubeViewsPredict(BaseModel):
    likes: int
    dislikes: int
    comment_count: int

router = APIRouter()

@router.get("/youtube-views/params", tags=["youtube-views"])
async def yv_params():
    return {
        'numerical': numerical_limits,
    }

@router.post("/youtube-views/predict", tags=["youtube-views"])
async def yv_predict(param: YoutubeViewsPredict):

    param.__setattr__('likes', scaler_likes.transform(np.array([param.__getattribute__('likes')]).reshape(1, -1))[0][0])
    param.__setattr__('dislikes', scaler_dislikes.transform(np.array([param.__getattribute__('dislikes')]).reshape(1, -1))[0][0])
    param.__setattr__('comment_count', scaler_comment_count.transform(np.array([param.__getattribute__('comment_count')]).reshape(1, -1))[0][0])

    encoded_params = {}
    for key in numerical_limits.keys():
        if key != 'views':
            encoded_params[key] = [param.__getattribute__(key)]

    inputs = pd.DataFrame(encoded_params)
    prediction = model.predict(inputs)
    views = scaler_views.inverse_transform([[prediction[0]]])[0][0]

    return {
        'views': views,
    }