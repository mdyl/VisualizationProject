import json
import time
from urllib.request import urlopen
from collections import OrderedDict
from pygeocoder import Geocoder


key = 'AIzaSyBoE88Q3q-ddna-0bm7GKqH_dcw6NDF'

#lookup country by latitude and longitude utilizes google api
def lookup(lat, lon):
        results = Geocoder(key).reverse_geocode(lat,lon)
        return results.country

lastkey = input('Enter in the last part of the key:')
key = key + lastkey


jsonList = []


with open('flickr1k-photos.txt') as f:
    lines = [line.rstrip('\n') for line in open('flickr1k-photos.txt')]
    for line in lines:
        jsonData = json.loads(line, object_pairs_hook=OrderedDict)
        jsonList.append(jsonData)
print(len(jsonList))

for element in jsonList:
    del element['comments']
    del element['user']['id']
    del element['captureDevice']
    del element['dateUploaded']
    del element['extension']
    del element['pageUrl']

i = 0

for elements in jsonList:
    i = i + 1
    print(i)
    #location parsing
    latitude = elements.get('geo').get('latitude')
    longitude = elements.get('geo').get('longtitude')
    country = lookup(latitude, longitude)
    elements['country'] = country
    print(country)

    if latitude == "" or longitude == "" or country == None:
         try:
            jsonList.remove(elements)
         except ValueError:
            pass


    #tag parsing
    tags = []
    mtags = elements.get('machineTags')
    for tag in mtags:
        tags.append(tag.get('tag'))
    tags = tags + elements.get('userTags')
    if len(tags) == 0:
         try:
            jsonList.remove(elements)
         except ValueError:
            pass

    #title parsing
    title = elements.get('title')
    if title == '':
         try:
            jsonList.remove(elements)
         except ValueError:
            pass

    #get user name
    user = elements.get('user').get('nickname')
    if user == '':
         try:
            jsonList.remove(elements)
         except ValueError:
            pass

    #get favorites
    favorites = elements.get('favorites')
    if len(favorites) == 0:
        try:
            jsonList.remove(elements)
        except ValueError:
            pass

    #get description
    description = elements.get('description')
    if description == '':
        try:
            jsonList.remove(elements)
        except ValueError:
            pass

    #make time readable
    datetaken = elements.get('dateTaken')
    datetaken = datetaken/1000
    temp = time.strftime("%a, %d %b %Y %H:%M:%S +0000", time.localtime(datetaken))
    elements['dateTaken'] = temp

file = open('updatedJSONV2.json', 'w')
file.write("[")

for i in range (0, len(jsonList)):
    temp = json.dumps(jsonList[i])
    if i != (len(jsonList)-1):
        file.write(temp + "\n")
    else:
        file.write(temp)
file.write("]")
file.close()
print(len(jsonList))