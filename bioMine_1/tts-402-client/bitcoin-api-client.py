#!/usr/bin/env python3

from two1.wallet import Wallet
from two1.bitrequests import BitTransferRequests

#Configure your Bitcoin Wallet
wallet = Wallet()
requests = BitTransferRequests(wallet)

SERVER_IP_ADDRESS = '[::1]'


#Send text to the endpoint
def send_text(text):
	#Tell User What Text They are Formatting
	print('You sent {0}'.format(text))

	#402 endpoint URL and request
	tts_url = 'http://' + SERVER_IP_ADDRESS + ':5000/tts?text={0}'
	speech = requests.get(url=tts_url.format(text))

	if speech.status_code != 200:
		raise Exception('Server produced a %d error' % speech.status_code)

	#Save the Received Audio File to Disk
	speech_output = open('speech.wav','wb')
	speech_output.write(speech.content)
	speech_output.close()

# Read the Text to Speechify from the CLI
if __name__ == '__main__':
	from sys import argv
	send_text(argv[1])
