import json
import time
from urllib.request import urlopen


#lookup country by latitude and longitude utilizes google api
def lookup(lat, lon):
        url = "http://maps.googleapis.com/maps/api/geocode/json?"
        url += "latlng=%s,%s&sensor=false" % (lat, lon)
        geturl = urlopen(url).read()
        data = json.loads(geturl.decode())

        for result in data['results']:
                for component in result['address_components']:
                        if 'country' in component['types']:
                                return component['long_name']

        return None

jsonList = []


with open('flickr1k-photos.txt') as f:
    lines = [line.rstrip('\n') for line in open('flickr1k-photos.txt')]
    for line in lines:
        jsonData = json.loads(line)
        jsonList.append(jsonData)
print(len(jsonList))
numNone = 0
for elements in jsonList:

    #location parsing
    latitude = elements.get('geo').get('latitude')
    longitude = elements.get('geo').get('longtitude')
    country = lookup(latitude, longitude)
    print(country)
    if country == None:
        jsonList.remove(elements)
        numNone = numNone + 1

    #tag parsing
    tags = []
    mtags = elements.get('machineTags')
    for tag in mtags:
        tags.append(tag.get('tag'))
    tags = tags + elements.get('userTags')
    if tags == None:
        jsonList.remove(elements)

    #


print(len(jsonList))
print(numNone)
