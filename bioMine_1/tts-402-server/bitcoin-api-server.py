#!/usr/bin/env python3

from subprocess import call
from uuid import uuid4

from flask import Flask
from flask import request
from flask import send_from_directory

from two1.wallet import Wallet
from two1.bitserv.flask import Payment

#Configure the App and Wallet
app = Flask(__name__)
wallet = Wallet()
payment = Payment(app, wallet)

#Charge a fixed fee of 3000 satoshis per request to the
# /tts endpoint

@app.route('/tts')
@payment.required(0)
def tts():
	#the text the client sends us
	text = str(request.args.get('text'))

	# a file to sore the rendered audio file
	file = str(uuid4()) + '.wav'

	# Run TTS engine
	call(['espeak','-w','/tmp/' + file, text])

	#send the rendered audio back to the client
	return send_from_directory(
		'/tmp',
		file,
		as_attachment=True
	)

#Initialize and run the server
if __name__ == '__main__':
	app.run(host='::')