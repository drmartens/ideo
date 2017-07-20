from keras.models import Sequential
from keras.layers import Dense
import numpy
# fix random seed for reproducibility
numpy.random.seed(7)

#load dataset
dataset = numpy.loadtxt("trialSocks.csv", delimiter=",")
#Split data set into input (X) and output (Y) variables
X = dataset[:,0:5]
Y = dataset[:,6:10]

#DEFINE THE MODEL - SEQUENCE OF LAYERS
#Create a sequential model and add layer one at a time
#Until we are happy with network topology

#Create a Model
model = Sequential()
model.add(Dense(12,input_dim=10, activation='relu'))
model.add(Dense(10, activation='relu'))
model.add(Dense(1, activation = 'sigmoid'))

#Compile the Model
model.compile(loss='binary_crossentropy', optimizer="adam", metrics=['accuracy'])


#Fit the Model
#we can train or fit the model on loaded data by calling the fit() function on the model
#Training process runs for fixed # iterations throu ght data called
#epochs. We need to specify this  in nepochs

model.fit(X,Y, epochs=150,batch_size=10)

#EVALUATE THE MODEL
#now that we have trained it on training data, evaluate performance on same dataset
#Lets us know how well we modeled the dataset, but not
#How it will perform on new data

scores = model.evaluate(X,Y)
print("\n%s: %.2f%%" % (model.metrics_names[1], scores[1]*100))


#TIE IT ALL TOGETHER - PREDICT SOMETHING!!!!

predictions=model.predict(X)
print (predictions)

#round the predictions
rounded = [round(x[1]) for x in predictions]
print (rounded)