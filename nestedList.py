mylist=[1,2,['x','y','z']]
print("If we wanted to get y only",mylist[2][1])

#list comprehension

matrixVariable=[[1,2,3],[4,5,6],[7,8,9]]

first_col=[row[0] for row in matrixVariable]

print("Find only 0th indexed element in all the 3 list element:",first_col)
