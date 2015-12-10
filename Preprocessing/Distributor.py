import json
from collections import OrderedDict
from operator import itemgetter

def parseNorthAmerica(element):
    if(element.get('continent') == 'North America'):
        return element
    else:
        return None

def parseAsia(element):
    if(element.get('continent') == 'Asia'):
        return element
    else:
        return None

def parseEurope(element):
    if(element.get('continent') == 'Europe'):
        return element
    else:
        return None

def parseAfrica(element):
    if(element.get('continent') == 'Africa'):
        return element
    else:
        return None

def parseOceania(element):
    if(element.get('continent') == 'Oceania'):
        return element
    else:
        return None

def parseSouthAmerica(element):
    if(element.get('continent') == 'South America'):
        return element
    else:
        return None


jsonList = []

#Read in the json
with open('updatedJSONV2.json') as f:
    lines = [line.rstrip('\n') for line in open('updatedJSONV2.json')]
    for line in lines:
        jsonData = json.loads(line, object_pairs_hook=OrderedDict)
        jsonList.append(jsonData)
print(len(jsonList))

listNA = []
listSA =[]
listAsia = []
listAfrica = []
listEurope = []
listOceania = []

for elements in jsonList:

    na = parseNorthAmerica(elements)
    sa = parseSouthAmerica(elements)
    asia = parseAsia(elements)
    europe = parseEurope(elements)
    africa = parseAfrica(elements)
    oceania = parseOceania(elements)

    if na != None:
        listNA.append(na)

    if sa != None:
        listSA.append(sa)

    if asia != None:
        listAsia.append(asia)

    if europe != None:
        listEurope.append(europe)

    if africa != None:
        listAfrica.append(africa)

    if oceania != None:
        listOceania.append(oceania)

#Some Error checking to make sure that the parse is working correctly
print('Number of items in North America: ' + str(len(listNA)))
print('Number of items in South America: ' + str(len(listSA)))
print('Number of items in Asia: ' + str(len(listAsia)))
print('Number of items in Europe: ' + str(len(listEurope)))
print('Number of items in Africa: ' + str(len(listAfrica)))
print('Number of items in Oceania: ' + str(len(listOceania)))
print('Total is: ' + str(len(listNA) + len(listSA) + len(listAsia) + len(listEurope) + len(listAfrica) + len(listOceania)))

#Sort the lists based on favorites count with the highest being first
listNA.sort(key = itemgetter('favorites'), reverse = True)
listEurope.sort(key = itemgetter('favorites'), reverse = True)
listAsia.sort(key = itemgetter('favorites'), reverse = True)
listAfrica.sort(key = itemgetter('favorites'), reverse = True)
listOceania.sort(key = itemgetter('favorites'), reverse = True)
listSA.sort(key = itemgetter('favorites'), reverse = True)



#Create the individual continent json files
file = open('na.json', 'w')
for i in range (0, len(listNA)):
    tempVar = json.dumps(listNA[i])
    if i != (len(listNA)-1):
        file.write(tempVar + "\n")
    else:
        file.write(tempVar)
file.close()

file = open('sa.json', 'w')
for i in range (0, len(listSA)):
    tempVar = json.dumps(listSA[i])
    if i != (len(listSA)-1):
        file.write(tempVar + "\n")
    else:
        file.write(tempVar)
file.close()

file = open('asia.json', 'w')
for i in range (0, len(listAsia)):
    tempVar = json.dumps(listAsia[i])
    if i != (len(listAsia)-1):
        file.write(tempVar + "\n")
    else:
        file.write(tempVar)
file.close()

file = open('africa.json', 'w')
for i in range (0, len(listAfrica)):
    tempVar = json.dumps(listAfrica[i])
    if i != (len(listAfrica)-1):
        file.write(tempVar + "\n")
    else:
        file.write(tempVar)
file.close()

file = open('europe.json', 'w')
for i in range (0, len(listEurope)):
    tempVar = json.dumps(listEurope[i])
    if i != (len(listEurope)-1):
        file.write(tempVar + "\n")
    else:
        file.write(tempVar)
file.close()

file = open('oceania.json', 'w')
for i in range (0, len(listOceania)):
    tempVar = json.dumps(listOceania[i])
    if i != (len(listOceania)-1):
        file.write(tempVar + "\n")
    else:
        file.write(tempVar)
file.close()