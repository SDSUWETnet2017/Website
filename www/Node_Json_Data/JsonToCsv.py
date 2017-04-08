import json
import csv
import os
from os import path
import time
import gc
from ctypes import util, cdll
import ast
import sys

cwd = os.getcwd()
RowName = [] 
NodeData = []
Columnname = [] 
THU = [] # THU Stands for Temperture, Humidity and UV


def NodeDataJsonToCsv (path):

	cwd = os.path.realpath(__file__)
	cwd = cwd.rsplit('/',1)[0]

	jsonfile =  open((cwd + path),'r')
	Nodes = json.load(jsonfile)
	for key in Nodes.keys():
		RowName.append(key) #getting the name of the rows (Node1,Node2,Node3...etc)
	  	NodeData.append(Nodes[key]) #Gets a list of the Data for Node1, Node2 ..etc (2017 :[x,y,z], a , d)

	for key in NodeData[0][0].keys(): #Because each key is the same i am getting the key values for the Date Dictionary
	    Columnname.append(key)
	 

	#Goal is to get a list of list     
	for nodenum in range(0,len(NodeData)):
	    THU.append([])
	    for key in Columnname:
	    	# Essentially this is getting a list of all nodes (size 10) within each list will be a list at a certain times
	    	# Temperture, Humidity, UV creditentials. It can be calle using THU[Nodenum][DateColumn]
	        THU[nodenum].append(NodeData[nodenum][0][key]) 

	#Now that we have, the Node names, the Date names, and the info corresponding tot he date and the column we need to format it
	for nodenum in range(0,len(THU)):
		tmpout = [] # Creating a tmp list for a row
		if (RowName[nodenum] != 'node 1' and RowName[nodenum] != 'node 6'):
			for date in range(0,len(Columnname)):
				outstring = ('Termpeture: '+  str(THU[nodenum][date][0]) + '\nHumidity: '+  str(THU[nodenum][date][1]) + '\nUV Index: '+  str(THU[nodenum][date][2]))
				tmpout.append(outstring) # Concatenating each Dates info into one lsit
			THU[nodenum] = tmpout #Setting the final row list into a List (List of List)
		else:
			# Doing the same thing for the super nodes
			for date in range(0,len(Columnname)):
				outstring = ('Termpeture: '+  str(THU[nodenum][date][0]) + '\nHumidity: '+  str(THU[nodenum][date][1]) + '\nUV Index: '+  str(THU[nodenum][date][2])+	'\nPressure: '+  str(THU[nodenum][date][3])+	'\nWindspeed: '+  str(THU[nodenum][date][4])+	'\nWindDirection: '+  str(THU[nodenum][date][5])+	'\nPicture: '+  str(THU[nodenum][date][6]))
				tmpout.append(outstring)
			THU[nodenum] = tmpout


	CSVfile = open((cwd + '/MasterData.csv'), 'w') # Putting it into the CSV
	NodeDataCSV = csv.writer(CSVfile,lineterminator = '\n')
	NodeDataCSV.writerow([' '] + Columnname)
	for nodenum in range(0,len(RowName)):
	   	NodeDataCSV.writerow([RowName[nodenum]] + THU[nodenum])

NodeDataJsonToCsv('/MasterData.json')


#len(NodeData)) The length is 3 0-2
# NodeData[1][0] Gets the Dictionary Vlaue of first node
# NodeData[1][1] Gets the Longitude FLOAT of first node
# NodeData[1][2] Gets the Latitude FLOAT 