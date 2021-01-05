def outerFun(a,b):
    def innerFun(c,d):
        return c+d

    return innerFun(a,b)
res = outerFun(5,10)
print(res)
