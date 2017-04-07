# -*- coding: utf-8 -*-
"""
Created on Wed Feb 15 15:17:33 2017

A class to be used on gen_data_2017-02-15.py
to generate test data for WETnet site

Data vectors hold a week of test data

To change duration of data change duration of data
edit temperature_sig.make_wave(duration=#days,framerate=144)

Updated 2017/02/19 to include UV index for all nodes

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
        
        self.temp_vect = self.get_temp()
      
        self.humidity = self.get_humidity()
        
        self.UV = self.get_UV()
        
        if self.node_type == 'sub':
            pass
        elif self.node_type == 'super':
            self.winddirect = random.random()*360
            self.windspeed = self.get_windspeed()            
            self.pressure = random.randint(96400000,96500000)/1000
            
#            with open('test_api_decode.jpg',"rb") as imageFile:
#                im_str = base64.b64encode(imageFile.read())
#            self.pic = 'pic_str' #str(im_str)[1:] to display actual picture
    
    def get_temp(self):
        '''
        A function that returns an array with data points that model
        Temperature
        '''
        temperature_sig = td.SinSignal(freq=1,amp=6,offset=(math.pi))
        # add noise
        temperature_sig += td.UncorrelatedUniformNoise()
        # evaluate function for a week(duration=7) ever 10 min (framerate=144)
        temp_wave = temperature_sig.make_wave(duration=7,framerate=144)
        # set ave temp of a node to be between 60 and 75 degrees
        temp_wave.ys += random.randint(60,75)
        return temp_wave.ys

    def get_humidity(self):
        # Model humidity as inverted hamming window with a dc offset 
        # between 50 and 60, for one day
        humidity = np.hamming(len(self.temp_vect)/7) + random.randint(50,60)
        # periodically repeat humidity function for entire week
        humidity = np.tile(humidity,7)
        return humidity
        
    def get_UV(self):
        '''
        A function that returns a week of UV index data as a vector
        '''
        n_points = len(self.temp_vect)//7
        # mean occurs at noon or in the middle of vector
        mean = 144/2
        # model UV index as normal distrobution with mean at 12:00 and var of 3.5 hrs
        sigma = math.sqrt(35*6)
        PI = math.pi
        UV = np.zeros(144)
        #time_vect = []
        for n in range(n_points):
            UV[n]= (1/(sigma*math.sqrt(2*PI)))*math.exp(-((n-mean)**2)/(2*(sigma**2)))
        #    time_vect.append(str(get_hr(n))+ ':' + str(get_min(n)))

        # normalize UV function to have a peak of 1
        UV /= max(UV)
        # Guive vector a peak on UV index
        UV *= random.uniform(4,7)
        # Gen data for a week
        return np.tile(UV,7)
        
    def get_windspeed(self):
        '''
        A function that returns a week of windspeed data as a vector
        ''' 
        # Model windspeed as Pink Noise with beta = 2
        windspeed_sig = td.PinkNoise(amp=6,beta=2)
        windspeed_wav = windspeed_sig.make_wave(duration=7,framerate=144)
        windspeed_wav.ys += 6
        return windspeed_wav.ys
        
    def get_wind_gust(self,n):
        windgust = self.windspeed[n] + random.randint(0,10)
        windgust += random.random()
        return windgust
        
    def get_wind_direction(self,n):
        # randomly change wind direction 
        rand = random.randint(1,11)
        if n % rand == 0:
            self.winddirect = random.random()*360
        return self.winddirect
        
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
        timestamp = '4/' + str(self.get_day(n,start_day))+'/2017' 
        if self.get_min(n) < 10:
            minute = str(self.get_min(n))
            timestamp += ' ' + str(self.get_hr(n)) + ':' + minute
        else:
            timestamp += ' ' + str(self.get_hr(n)) + ':' + str(self.get_min(n))
        return timestamp
        
    def return_dict(self,start_day):
        sensor_data_dict = {}
        
        for n in range(len(self.temp_vect)):
            if self.node_type == 'sub':
                data_vect=[self.temp_vect[n],self.humidity[n],self.UV[n]]
            else:
                data_vect=[self.temp_vect[n],self.humidity[n],self.UV[n],
                           self.pressure, self.windspeed[n],
                            self.get_wind_direction(n),
                            self.get_wind_gust(n),'low']

            sensor_data_dict[self.get_time_stamp(n,start_day)] = data_vect
        
        
        return sensor_data_dict
