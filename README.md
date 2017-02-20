run gen_data.py to generate test_data.json.
temperature in degrees F
pressure in Pa
Humidity in %
wind direction N, NE, E, SE, S, SW, W, or NW
windspeed mph
pic is jpg encoded in base64 string 
time stamp format = YYYY-02-DD HR:MM     military time
data presented in following format
{ 'node 1' : [ <time stamped data dictionaries> , latitude, longitude],
'node 2': .................
}
for subnodes
< time stamped data dictionary > = { <time1>: [temperature, humidity,UV],
                                                          <time2>: [temperature, humidity],    
                                                          ............
                                                          }
for supernodes 
< time stamped data dictionary > = { <time1>: [temperature, humidity, UV, pressure, windspeed, winddirection, pic],
                                     <time2>: [temperature, humidity, UV, pressure, windspeed, winddirection, pic],
                                     ......
                                     }
