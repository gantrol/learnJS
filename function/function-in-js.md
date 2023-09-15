# Function In Js

## Recursion

```js
// simple recursive counting function
const counter = (i, upto) => {
  if(i < upto) {
    console.log("counter", i, upto);
    counter(i+1, upto);
  }
}

// use counter to just print out 1-5
counter(1, 5);

// a more complex counter that can call a callback
const cb_counter = (i, upto, cb) => {
  if(i < upto) {
    cb(i, upto);
    cb_counter(i+1, upto, cb);
  }
}

// do the same thing but with a callback
cb_counter(1, 6, (i, j) => {
   console.log(i, j)
  });
```

## Transforming Data

- `map` -- Apply a calculation on each element.
- `reduce` -- Turn a sequence into a final calculation.
- `find` -- Search for an element in a sequence.
- `filter` -- Filter out selected elements from a sequence.
- `forEach` -- Just loop over a sequence without a result.

alling `.map` on a sequence will produce a new sequence with a change to each value based on the result of a callback:

```
> let x = [1,2,3,4];
> x.map((i) => i + 10);
[ 11, 12, 13, 14 ]
>
```

You can see I passed a callback to `.map` that simply added 10 to the numbers in `x` and produces a new `Array` with `[11, 12, 13, 14]`. Remember that in simple callbacks like this you don't need return since the result will be returned by default.

### reduce

With `reduce` you are building a calculation based on each element of the sequence, and you use an "accumulator" to build the result:

```
> let x = [1,2,3,4];
> x.reduce((acc, i) => acc *= i);
24
>
```

You can see that you receive the accumulator as `acc` and it starts with the first element. You then perform your calculation with `acc`, and return the result, which is carried on to the next iteration. When you're done, `reduce` returns `acc` (which is 24).

### find

The `find` function will go through your `Array` and stop when it finds the first element that returns `true`:

```
> let x = [0, 1,2,3,4];
> x.find((i) => i == 3);
3
> x.find((i) => i);
1
```

Remember that JavaScript's concept of "true" is very loose so I show you how I find 3 using `==`, but also that I find 1 by just returning `i`. Since the first "truthy" value is 1 that's why it works.

### filter

You use `filter` to pull out all the elements that match a `true` return value:

```
> let x = [1,2,3,4];
> x.filter((i) => i % 2 == 0);
[ 2, 4 ]
>
```

In this example I pull out a new `Array` with only the even numbers by using `%` on each element.

### forEach

The final operation you can use is `forEach`, which is like `map` but doesn't produce a new sequence when it's done. You typically use `forEach` to do a final processing on the results, but you can also just use `for-of` like normal.

#### Code

The final code for this exercise is an example of searching through an `Array` of objects to calculate new nonsense.

```js
let pets = [
  {name: 'Yeller', type: 'Dog', age: 12},
  {name: 'Akumano', type: 'Japanese Bobtail Cat', age: 2},
  {name: 'Meaw Peesard', type: 'Siamese Cat', age: 100},
  {name: 'James', type: 'Gecko', age: 2},
]

let ages_only = pets.map(pet => pet.age);

let total_age = ages_only.reduce((acc, age) => acc += age);

let meaw = pets.find(pet => pet.name == 'Meaw Peesard');

let old_animals = pets.filter(pet => pet.age > 10);
let young_animals = pets.filter(pet => pet.age <= 10);

console.log("Animal Ages:", ages_only);

console.log("Total Age:", total_age);

console.log("Meaw is:", meaw.age);

console.log("\nOld Animals:");
old_animals.forEach(pet => {
  console.log(`\t${pet.name} is a ${pet.age} old ${pet.type}.`);
});

console.log("\nYoung Animals:");
for(let pet of young_animals) {
  console.log(`\t${pet.name} is a ${pet.age} old ${pet.type}.`);
}
```

### What You Should See

Running this code shows you the results of the calculations, but you could also try each one in the node shell.

```
$ node code.js
Animal Ages: [ 12, 2, 100, 2 ]
Total Age: 116
Meaw is: 100

Old Animals:
       Yeller is a 12 old Dog.
       Meaw Peesard is a 100 old Siamese Cat.

Young Animals:
      Akumano is a 2 old Japanese Bobtail Cat.
      James is a 2 old Gecko.
```

## Applying Functions

```js
let pets = [
  {name: 'Yeller', type: 'Dog', age: 12},
  {name: 'Akumano', type: 'Japanese Bobtail Cat', age: 2},
  {name: 'Meaw Peesard', type: 'Siamese Cat', age: 100},
  {name: 'James', type: 'Gecko', age: 2},
]

const young_pets = (pet) => {
  return pet.age <= 10;
}

const age_pets = (pet) => {
  return [pet.name, pet.age + 10];
}

const name_age = (pet) => {
  return `${pet[0]} is ${pet[1]}`;
}

const debug = (msg) => {
  console.log(msg);
  // why am I doing this here?
  return msg;
}

let age_young_animals = pets.filter(young_pets)
  .map(age_pets)
  .map(debug) // this is why
  .map(name_age)
  .forEach(debug);
```

## Scope and Closures

### Scope

```js
const var_sucks = () => {
  var var_scope = 10;
  let let_scope = 20;

  console.log(`>>> var_sucks before if: var=${var_scope}, let=${let_scope}`);

  if(true) {
    var var_scope = 100;
    let let_scope = 100;
    console.log(`>>> var_sucks inside if: var=${var_scope}, let=${let_scope}`);
  }

  console.log(`>>> var_sucks after if: var=${var_scope}, let=${let_scope}`);
}

var_sucks();
```

### Closures

```js
// puzzle: how small can you make this?

const build_adder = (left) => {
  // do I really need this variable?
  let left_hand = left;
  return adder = (right) =>  {
    // do I really need the return?
    let result = left_hand + right;
    return result;
  }
}

const build_adder_without_left_hand = (left) => {
  return adder = (right) =>  {
    // do I really need the return?
    let result = left + right;
    return result;
  }
}

const build_adder_without_return = (left) => {
  // do I really need this variable?
  let left_hand = left;
  return adder = (right) =>  {
	left_hand + right;
  }
}

let add10 = build_adder(10);
let add20 = build_adder(20);

console.log(`test builder 3 + 10 == ${add10(3)}`);
console.log(`test builder 3 + 20 == ${add20(3)}`);
console.log(`test builder 13 + 10 == ${add10(13)}`);
console.log(`test builder 3 + 10 + 20 == ${add10(add20(3))}`);

let add10_1 = build_adder_without_left_hand(10);
let add20_1 = build_adder_without_left_hand(20);

console.log(`test builder 3 + 10 == ${add10_1(3)}`);
console.log(`test builder 3 + 20 == ${add20_1(3)}`);
console.log(`test builder 13 + 10 == ${add10_1(13)}`);
console.log(`test builder 3 + 10 + 20 == ${add10_1(add20_1(3))}`);

let add10_2 = build_adder_without_return(10);
let add20_2 = build_adder_without_return(20);

console.log(`test builder 3 + 10 == ${add10_2(3)}`);
console.log(`test builder 3 + 20 == ${add20_2(3)}`);
console.log(`test builder 13 + 10 == ${add10_2(13)}`);
console.log(`test builder 3 + 10 + 20 == ${add10_2(add20_2(3))}`);
```

## Partial Application

```js
let pets = [
     {name: 'Yeller', type: 'Dog', age: 12},
     {name: 'Akumano', type: 'Japanese Bobtail Cat', age: 2},
     {name: 'Meaw Peesard', type: 'Siamese Cat', age: 100},
     {name: 'James', type: 'Gecko', age: 2},
   ]
   
   const young_pets = (pet) => {
     return pet.age <= 10;
   }
   
   const age_pets = (pet) => {
     return [pet.name, pet.age + 10];
   }
   
   const name_age = (pet) => {
     return `${pet[0]} is ${pet[1]}`;
   }
   
   const debug = (msg) => {
     console.log(msg);
     return msg;
   }
   
   const tee = (result, data, cb) => {
     var side = (input) => {
       cb(input, result, data);
       return input;
     }
   
     return side;
   }
   
   let owned_pets = [];
   const add_owner_tee = tee(owned_pets, 'Zed', (i, r, d) => {
     r.push({pet: i, owner: d});
   });
   
   let age_young_animals = pets.filter(young_pets)
     .map(add_owner_tee)
     .map(age_pets)
     .map(name_age);
   
   console.log("-- Pets with Owners:");
   owned_pets.forEach(debug);
   
   console.log("-- Young Animals:");
   age_young_animals.forEach(debug);
```

## ==Promises and Yield==

### Callback Style

```js
const fs = require('fs');
   
const read_file = (fname, cb) => {
    fs.stat(fname, (err, stats) => {
        fs.open(fname, 'r', (err, fd) => {
            let inbuf = Buffer.alloc(stats.size);
            fs.read(fd, inbuf, 0, stats.size, null, (err, bytesRead, buffer) => {
                cb(buffer);
            });
        });
    });
}

read_file('test.txt', (result) => {
    console.log(`Result is ${result.toString()}`);
});
```

