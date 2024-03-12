import pandas as pd

url = "https://data.moenv.gov.tw/api/v2/aqx_p_02?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&sort=datacreationdate%20desc&format=CSV"
df = None
six_counties = ["臺北市", "新北市", "桃園市", "臺中市", "臺南市", "高雄市"]


def get_county_pm25(county):
    global df

    if df is None:
        df = pd.read_csv(url).dropna()

    df1 = df.groupby("county").get_group(county)

    columns = df1.columns.tolist()
    values = df1.values.tolist()

    return columns, values


def get_counties():
    global df

    if df is None:
        df = pd.read_csv(url).dropna()

    counties = df["county"].unique()

    return counties


def get_pm25():
    global df

    if df is None:
        df = pd.read_csv(url).dropna()

    columns = df.columns.tolist()
    values = df.values.tolist()

    return columns, values


def get_six_pm25():
    global df

    if df is None:
        df = pd.read_csv(url).dropna()

    pm25 = []
    for county in six_counties:
        pm25.append(round(df.groupby("county").get_group(county)["pm25"].mean(), 2))

    return pm25


if __name__ == "__main__":
    print(get_six_pm25())
