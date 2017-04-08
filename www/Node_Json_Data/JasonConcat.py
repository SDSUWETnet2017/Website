try:
    import json
except ImportError:
    import simplejson as json
import csv
import os
from os import path
import time
import gc
from ctypes import util, cdll
import ast
import sys
import collections
import re
from io import open



def mergesjson(Finalpath, NodePath):

	FinalNodesNames = []
	AddNodesName = [] 
	FlagFound = 0;
	FlagFinalEmpty = 0
	FlagAddEmpty = 0

	cwd = os.path.realpath(__file__)
	cwd = cwd.rsplit('/',1)[0]

	Finaljsonfile = open((cwd + Finalpath),'r')
	try:
		FinalNodes = json.load(Finaljsonfile)
		for key in FinalNodes.keys():
			FinalNodesNames.append(key) #getting the name of the rows (Node1,Node2,Node3...etc)
	except:
	   	FlagFinalEmpty = 1 #Checks If the Final Path is Empty

	AddingNodejsonfile = open((cwd + NodePath),'r')
	try:
		AddNodes = json.load(AddingNodejsonfile) 
		for key in AddNodes.keys():
			AddNodesName.append(key)
	except:
		FlagAddEmpty = 1 #Checks If Adding Path is Empty or not

	#At this point you have all the names of all of the Keys in both .JSON files

	if FlagFinalEmpty == 0 and FlagAddEmpty == 0:
		FinalNodesNames.sort(key=natural_keys)
		AddNodesName.sort(key=natural_keys)
		if FinalNodesNames[:5] ==  AddNodesName or FinalNodesNames[5:] ==  AddNodesName: 
			FlagFound = 1 #FOUND
		else:
			FlagFound = 2 # Cann Not find


	if FlagFound == 0: # That mean Either FlagAddEmpty = 1 or FlagFinalEmpty = 1 or both
		if FlagFinalEmpty == 0 and FlagAddEmpty == 1:
			FinalNodes = FinalNodes;
		elif FlagFinalEmpty == 1 and FlagAddEmpty == 0:
			FinalNodes = AddNodes;
		else:
			print 'Both Are Empty'
			exit()

	elif FlagFound == 1:
		for NodeVals in AddNodesName:
			Nodetmp = AddNodes[NodeVals][0]
			for tmpkey in Nodetmp.keys():
				FinalNodes[NodeVals][0][tmpkey] = AddNodes[NodeVals][0][tmpkey]
			

	else: #If it doesn't find it it will just Add the entire node in to the dictonary
		for NodeVals in AddNodesName:
			FinalNodes[NodeVals] = AddNodes[NodeVals]

	outfile = open((cwd + Finalpath), 'wb')
	json.dump(FinalNodes, outfile) # Dumping back into the .Json File

def atoi(text):
	if text.isdigit():
		return int(text)
	else:
		text
    #return int(text) if text.isdigit() else text

def natural_keys(text):
    return [ atoi(c) for c in re.split('(\d+)', text) ]



mergesjson('/MasterData.json','/SuperNode1.json')
mergesjson('/MasterData.json','/SuperNode2.json')