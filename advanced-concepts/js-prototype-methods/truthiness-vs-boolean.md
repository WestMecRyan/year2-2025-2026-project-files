## truthiness vs boolean of numbers
number, truthiness, boolean
-1, truthy, true
0, falsy, false
1, truthy, true

## truthiness of arrays
array, toString, number, truthiness, boolean
[], '', 0, truthy, true
[''], '', 0, truthy, true
['one'], 'one', NaN, truthy, true
['1'], '1', 1, truthy, true

## truthiness of Objects
object, toString, number, truthiness, boolean
{}, '[object Object]', NaN, truthy
{'1':'one'}, '[object, Object]', NaN, truthy