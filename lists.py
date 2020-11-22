#lists

mylist=[1,2,3,'string123','skms',[8,9,0]]
print(mylist)

print("Length of my lists is",len(mylist))

print("Indexing is",mylist[:4])

mylistVar=['a','b','c','d']
print("Before reassignment",mylistVar)

mylistVar[0]='add anything','add anything 2'
print("After reassignment",mylistVar)

listTwo=["x","y","z"]


# to add use append
mylistVar.append(listTwo)
print('appending :',mylistVar)
#appending appends another lists it means it will make new list and add it in the end

#now using extend
mylist.extend(listTwo)
print('Extending :',mylistVar)

#Extending adds in the list. lkin yaha ni ho paaya

mylistVar.pop(0)
print("removing index 0 from the list :",mylistVar)


mylistVar.reverse()
print("To reverse the list:",mylistVar)

mylistVar2=[8,4,9,11,88,5]

mylistVar2.sort()
print("To sort the data:",mylistVar2)
