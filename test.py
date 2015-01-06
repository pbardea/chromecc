def majorityElement(num):
        count = {}
        for x in num:
            if x in count:
                count[x] += 1
            else:
                count[x] = 1
        print count
        for key in count:
            if count[key] > len(num)/2:
                return key

print majorityElement([1,1,1,2,3])
