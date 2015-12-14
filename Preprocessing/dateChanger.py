import json
from collections import OrderedDict
from operator import itemgetter

jsonList = []

#Read in the json
with open('updatedJSONV3.json') as f:
    lines = [line.rstrip('\n') for line in open('updatedJSONV2.json')]
    for line in lines:
        jsonData = json.loads(line, object_pairs_hook=OrderedDict)
        jsonList.append(jsonData)

def changeMonth(month):
    if month == "Jan":
        return 1
    if month == "Feb":
        return 2
    if month == "Mar":
        return 3
    if month == "Apr":
        return 4
    if month == "May":
        return 5
    if month == "Jun":
        return 6
    if month == "Jul":
        return 7
    if month == "Aug":
        return 8
    if month == "Sep":
        return 9
    if month == "Oct":
        return 10
    if month == "Nov":
        return 11
    if month == "Dec":
        return 12

for elements in jsonList:
    date = elements.get("dateTaken")
    dateArray = date.split()
    year = dateArray[3]
    month = str(changeMonth(dateArray[2]))
    day = dateArray[1]
    newdate = year + "-" + month + "-" + day
    elements['dateTaken'] = newdate

file = open('updatedJSONV4.json', 'w')
#file.write("[")

for i in range (0, len(jsonList)):
    tempVar = json.dumps(jsonList[i])
    if i != (len(jsonList)-1):
        file.write(tempVar + "\n")
    else:
        file.write(tempVar)
#file.write("]")
file.close()