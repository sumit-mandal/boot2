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

variable3="Insert {} another function here:".format("Insert me!")
print(variable3)

variable4="Item one:{b} Item two:{a}".format(a="dog",b="cat")
print(variable4)

a="dog"
b="cat"
print(f"Item one {a} and item two {b}")


name = 'Peter'
age = 23

print('%s is %d years old' % (name, age))
print('{} is {} years old'.format(name, age))
print(f'{name} is {age} years old')
