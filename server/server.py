import pandas as pd
import math
import quandl as Quandl
import numpy as np
from sklearn import preprocessing, cross_validation, svm
from sklearn.linear_model import LinearRegression
import datetime
from matplotlib import style
import sys
from flask import Flask, jsonify, Response
import json

style.use('ggplot')

Quandl.ApiConfig.api_key = 'TAbgCywTAa7v2XdmgM12'

def getPredictions(Name):
	df = Quandl.get('WIKI/' + Name)
	df = df[['Adj. Open', 'Adj. High', 'Adj. Low', 'Adj. Close', 'Adj. Volume']]
	df['HL_PCT'] = (df['Adj. High'] - df['Adj. Close']) / df['Adj. Close'] * 100.00
	df['PCT_change'] = (df['Adj. Close'] - df['Adj. Open']) / df['Adj. Open'] * 100.00

	df = df[['Adj. Close', 'HL_PCT', 'PCT_change', 'Adj. Volume']]

	forecast_col = 'Adj. Close'
	df.fillna(-99999, inplace=True)

	forecast_out = int(math.ceil(0.01 * len(df)))

	df['label'] = df[forecast_col].shift(-forecast_out)

	x = np.array(df.drop(['label'], 1))

	x = preprocessing.scale(x)
	x = x[:-forecast_out]
	x_lately = x[-forecast_out:]

	df.dropna(inplace=True)
	y = np.array(df['label'])
	y = np.array(df['label'])

	x_train, x_test, y_train, y_test = cross_validation.train_test_split(x, y, test_size=0.2)

	clf = LinearRegression()
	clf.fit(x_train, y_train)
	accuracy = clf.score(x_test, y_test)

	# print (accuracy)
	#x is features
	#y is label

	forecast_set = clf.predict(x_lately)

	df['Forecast'] = np.nan

	return {'forecast': forecast_set, 'previous': df['Adj. Close']}

#what we just did is we were interating through the forecast set, taking each forecast AND day
#and then setting those as the values in the dataframe, basically making the future features not a number
#the last line of that just takes all of the first columns, sets them to not a number, and the final column is whatever i is
#which is the forecast in this case


#df['Adj. Close'].plot()
#df['Forecast'].plot()
#plt.legend(loc=4)
#plt.xlabel('Date')
#plt.ylabel('Price')
#plt.show()	

app = Flask('Hi')

@app.route("/getinfo/<name>", methods=['GET', 'POST'])
@crossdomain(origin='*')
def getinfo(name):
	data =  getPredictions(name)
	res = {'Predictions': data['forecast'].tolist(), 'Previous': data['previous'].tolist()}

	return Response(json.dumps(res), mimetype='application/json')

app.run()