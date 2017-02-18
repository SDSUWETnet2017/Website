# -*- coding: utf-8 -*-
"""
Created on Wed Feb 15 15:17:33 2017

A class to be used on gen_data_2017-02-15.py
to generate test data for WETnet site

Data vectors hold a week of test data

To change duration of data change duration of data
edit temperature_sig.make_wave(duration=#days,framerate=144)


@author: Stephen West
"""

import thinkdsp as td
import random
import numpy as np
import math
import base64

        
class Node():
    
    def __init__(self, number,node_type='sub'):
        
        self.number = number

        self.node_type = node_type
        
        # Model Temperature
        
        # model temp as sin wave with dc offset
        temperature_sig = td.SinSignal(freq=1,amp=6,offset=(math.pi))
        # add noise
        temperature_sig += td.UncorrelatedUniformNoise()
        # evaluate function for a week(duration=7) ever 10 min (framerate=144)
        temp_wave = temperature_sig.make_wave(duration=7,framerate=144)
        # set ave temp of a node to be between 60 and 75 degrees
        temp_wave.ys += random.randint(60,75)
        self.temp_vect = temp_wave.ys
        
        # Model humidity
        
        # Model humidity as inverted hamming window with a dc offset 
        # between 50 and 60, for one day
        humidity = np.hamming(len(temp_wave.ys)/7) + random.randint(50,60)
        # periodically repeat humidity function for entire week
        self.humidity = np.tile(humidity,7)
        
        if self.node_type == 'sub':
            pass
        elif self.node_type == 'super':
            self.winddirect = random.choice(["N","BE","E","SE","S","SW","W","NW"])
            
            # Model windspeed as Pink Noise with beta = 2
            windspeed_sig = td.PinkNoise(amp=6,beta=2)
            windspeed_wav = windspeed_sig.make_wave(duration=7,framerate=144)
            windspeed_wav.ys += 6
            self.windspeed = windspeed_wav.ys
            
            self.pressure = random.randint(96400000,96500000)/1000,
            
            with open('test_api_decode.jpg',"rb") as imageFile:
                im_str = base64.b64encode(imageFile.read())
            self.pic = str(im_str)[1:]
               
    def get_min(self,n):
        minute = (n*10)%60
        return minute
        
    def get_hr(self,n):
        hr = (n*10//60)%24
        return hr
            
    def get_day(self,n,start_day):
        current_day = start_day + (n*10//60)//24
        return current_day
    
    def get_time_stamp(self,n,start_day):
        timestamp = '2017-02-' + str(self.get_day(n,start_day))
        timestamp += ' ' + str(self.get_hr(n)) + ':' + str(self.get_min(n))
        return timestamp
        
    def return_dict(self,start_day):
        sensor_data_dict = {}
        
        for n in range(len(self.temp_vect)):
            if self.node_type == 'sub':
                data_vect=[self.temp_vect[n],self.humidity[n]]
            else:
                data_vect=[self.temp_vect[n],self.humidity[n],self.pressure,
                           self.windspeed[n],self.winddirect,self.pic]
                

            sensor_data_dict[self.get_time_stamp(n,start_day)] = data_vect
        
        
        return sensor_data_dict
