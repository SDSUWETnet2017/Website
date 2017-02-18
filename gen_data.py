# -*- coding: utf-8 -*-
"""
Created on Fri Feb 17 16:46:55 2017

A progam to generate data and store it in a 
.json data for use in testing WETnet site

Generates Data for 7 days in month of Febuary before feb 21

@author: Stephen West
"""

from node import Node
import json
# from matplotlib import pyplot as plt

latitudes = [32.775660,32.776315,32.776075,32.775567,32.775881,32.776689,
                 32.776804,32.776898,32.775683,32.774507]
                 
longitudes = [-117.071543, -117.071475,-117.071910,-117.071914,
                  -117.071002,-117.071394,-117.071858,-117.072355,-117.072382,
                  -117.071407]

N_nodes = 10
data_dict = {}
nodes = []

for i in range(N_nodes):
    if i % 5 == 0:
        node = Node(i+1,node_type='super')
    else:
        node = Node(i+1,node_type='sub')

    data_dict['node '+str(i+1)] = [node.return_dict(start_day=16),
                                  latitudes[i],longitudes[i]]
    
with open('test_data.json','w') as f_obj:
    json.dump(data_dict,f_obj)
