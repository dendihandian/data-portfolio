# Data Portfolio

## Notebook Available
- [Bank Marketing](https://github.com/dendihandian/data-portfolio/blob/master/bank-marketing/bank-marketing.ipynb) (classification)
- [Transfermarkt Transfers](https://github.com/dendihandian/data-portfolio/blob/master/transfermarkt-transfers/transfermarkt-transfers.ipynb) (clustering)
- [Youtube Trending Video Statistics](https://github.com/dendihandian/data-portfolio/blob/master/youtube-views/youtube-views.ipynb) (regression)

## API and Web Development

The FastAPI project located in `_api` and the NextJS project located in `_web`.
### Commands for FastAPI
#### Requirements
- Python 3.8+
- Poetry Dependency Manager

#### Installing The Project
```bash
poetry install
```
#### Starting The Server
```bash
poetry run uvicorn main:app --reload
```
#### Exporting The Environment For Deployment
```bash
poetry export -f requirements.txt --without-hashes > ../requirements.txt
```
### Commands for NextJS
#### Requirements

- NodeJS 16 (or latest LTS)

#### Installing The Project
```bash
npm install
```
#### Starting The Server
```bash
npm run dev
```