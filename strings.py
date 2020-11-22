myString='abcdefg'
print("counting from two uptil 4 :",myString[2:4])

print("Leaving 2 numbers :",myString[::2])


x=myString.upper()
print("changing my string to upper value :",x)

x=myString.lower()
print("changing my string to lower value :",x)


variable2='Hello World!!'

k=variable2.split()

print("Making two variable different:",k)

l=variable2.split('o')
print("Removing letter o ",l)

#print formatting

variable3="Insert another string here:{}".format("Insert me!")
print(variable3)

variable4="Item one:{b} Item two:{a}".format(a="dog",b="cat")
print(variable4)
