import json
import time
from urllib.request import urlopen
from collections import OrderedDict


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
        jsonList.remove(elements)


    #tag parsing
    tags = []
    mtags = elements.get('machineTags')
    for tag in mtags:
        tags.append(tag.get('tag'))
    tags = tags + elements.get('userTags')
    if len(tags) == 0:
        jsonList.remove(elements)

    #title parsing
    title = elements.get('title')
    if title == '':
        jsonList.remove(elements)

    #get user name
    user = elements.get('user').get('nickname')
    if user == '':
        jsonList.remove(elements)

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

file = open('updatedJSON.json', 'w')
file.write("[")

for i in range (0, len(jsonList)):
    temp = json.dumps(jsonList[i])
    if i != (len(jsonList)-1):
        file.write(temp + ",")
    else:
        file.write(temp)
file.write("]")
file.close()
print(len(jsonList))