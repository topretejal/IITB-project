import pandas as pd
import time

if __name__=="__main__":
    print("Before",time.time())

    df=pd.read_excel('def.xlsx',encoding="utf8",errors='ignore')
    #print(df)

    headings =[]
    for i in range(0,len(df[0])):
        headings.append(df[0][i])
    #for i in range(0,len(df)):
    print(headings)

    print("After",time.time())
    