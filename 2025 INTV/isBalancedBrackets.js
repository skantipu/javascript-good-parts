function isBalancedBrackets(str) {
  const closingTagMap = {
   '[': ']',
   '(': ')',
   '{': '}'
  };
  const stack = [];
  for (let i=0; i<str.length; i++) {
     if(str[i] in closingTagMap) {
       //push to stack
       stack.push(str[i]);
     } else {
       const item = stack.pop();
       if(closingTagMap[item] !== str[i]) return false;
     }
  }
  return stack.length === 0;
}

console.log(isBalancedBrackets('([{}]()({})){}({})'));

//-----------------------------------------------------
/* basic version of debounce
//Debouncing is a technique that prevents a function from being called too often, or at least delays the execution of that function until a certain amount of time has passed.
const debounce = (callback, wait) => {
  let id;
  return () => {
      clearTimeout(id);
      id=setTimeout(callback, wait);
  }
}


const myfun = debounce(()=>console.log('hi'), 100); 
myfun(); //debounce returns a function as it is invoked here. Uses closure as even after the fn is returned, id is still held on to. 
myfun();
myfun();
myfun();
*/
function debounce(func, wait) {
  let id;
  return (...args) => {
    if (id) clearTimeout(id);
    id = setTimeout(() => {
      func.apply(null, args);
    }, wait);
  }
}

const myfun = debounce((a)=>console.log('debounce',a), 100);
myfun(10);
myfun(10);
myfun(10);
myfun(10);
setTimeout(() => {
  // Code to execute after the delay
 myfun(20)
}, 200);

//The callback is invoked immediately and cannot be invoked again for the rest of the wait duration.
const throttle = (callback, wait) => {
  let shouldThrottle = false; //clearTimeout(id) will not make id as undefined, id is still an object 
  return () => {
      if(!shouldThrottle) {
        callback(); 
        shouldThrottle = true;
        setTimeout(() => {
          shouldThrottle = false;
        }, wait);
      } 
  }
}


const myfun1 = throttle(()=>console.log('hi'), 500);
myfun1();
myfun1();
myfun1(); 
//-----------------------------------------------------
// 'this' in an arrow function does not refer to the calling object (in this case, the array). Instead, 'this' in an arrow function is lexically bound to the parent scope.
//[1, 2, 3].myReduce((prev, curr) => prev + curr, 0);

Array.prototype.myReduce = function(callback, initialValue) {
  let result = initialValue, index = 0; //result = accumulator
  if (typeof initialValue === 'undefined') { //matching native reduce behavior. If initVal is omitted, acc will be arr[0] and curr will be arr[1] of the array. Otherwise, acc=initVal, curr=arr[0]
      result = this[0];
      index = 1;
  }
  for (; index < this.length; index++) {
      result = callback(result, this[index]);
  }
  return result;
}

console.log([1, 2, 3].myReduce((prev, curr) => prev * curr, 4));
//-----------------------------------------------------

const flattenClassNames = (...args) => {
  const res = [];
  for (const arg of args) {
      if(typeof arg === 'string') {
          res.push(arg);
      } else if (Array.isArray(arg)) { //got to check for Array first as typeof [] = object
          res.push(flattenClassNames(...arg));
      } else if (typeof arg === 'object') {
          for(const key in arg) {
              if(arg[key]) {
                  res.push(key);
              }
          }
      }
  }
  return res.join(' ');
} 

console.log(flattenClassNames('a', ['b', { c: true, d: false }])) // 'a b c'
console.log(flattenClassNames('foo', {bar: true, duck: false}, 'baz', { quux: true })) //'foo bar baz quux'
//-----------------------------------------------------

const flatten = (arr) => {
  const res = [];
  for(const num of arr) {
      if (typeof num === 'number') {
          res.push(num);
      } else if(Array.isArray(num)) {
          res.push(...flatten(num)); //don't forget spreading here
      }
  }
  return res;
} 

console.log(flatten( [[1, 2], [3, 4], [1, [2, [3, [4, [5]]]]]])); //[1, 2, 3, 4, 1, 2, 3, 4, 5]
//-----------------------------------------------------
//before an IIFE, statements should end with ; In our case, console.log should end with ; otherwise this will be treated as an argument to the previous stmt
(function() {
    /*
  Implement a method mergeData, which is used to return a unified view of each user's activities by merging data from each user. It has the interface mergeData(sessions). Sessions from the same user should be merged into one object. 
  When merging:
  Sum up the duration fields.
  Combine all the equipment used, de-duplicating the values and sorting alphabetically.
  */
  const input = [
    { user: 8, duration: 50, equipment: ['bench'] },
    { user: 7, duration: 150, equipment: ['dumbbell'] },
    { user: 1, duration: 10, equipment: ['barbell'] },
    { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
    { user: 7, duration: 200, equipment: ['bike'] },
    { user: 2, duration: 200, equipment: ['treadmill'] },
    { user: 2, duration: 200, equipment: ['bike'] },
  ];
  /*
  [
    { user: 8, duration: 50, equipment: [ 'bench' ] },
    { user: 7, duration: 450, equipment: [ 'bike', 'dumbbell', 'kettlebell' ] },
    { user: 1, duration: 10, equipment: [ 'barbell' ] },
    { user: 2, duration: 400, equipment: [ 'bike', 'treadmill' ] }
  ]
  */
  const input1 = [ 
      { user: 1, duration: 10, equipment: ['barbell'] },
      { user: 1, duration: 30, equipment: [] }
  ];
  //output - [ { user: 1, duration: 40, equipment: [ 'barbell' ] } ]
  const mergedData = (arr) => {
      const userMap = new Map();
      const mergeAndSort = (arr1, arr2) => {
          const result = new Set([...arr1, ...arr2]);
          const sortedResult = [...result].sort((a,b) => a.localeCompare(b)); //note converting set back to array using spread operator
          return sortedResult;
      }
      for(const {user, duration, equipment} of arr) { //iterating Map using for...of
          if (userMap.has(user)){
            const {duration: currDuration, equipment: currEquipment} = userMap.get(user);
            userMap.set(user, {duration: duration + currDuration, equipment: mergeAndSort(equipment, currEquipment)});
          } else {
              userMap.set(user, {duration, equipment: [...equipment]})
          }
      }
      const result = [];
      for(const [key, value] of userMap) {
          result.push({
            user: key,
            ...value
          });
      }
      return result;
  }
  console.log(mergedData(input));
})();


//-----------------------------------------------------
//deep clone - refer greatfrontend answer


//-----------------------------------------------------
/*
const doc = new DOMParser().parseFromString(
  `<div>
    <span style="font-size: 12px">Span</span>
    <p style="font-size: 12px">Paragraph<span>Hello</span></p>
    <blockquote style="font-size: 14px">Blockquote</blockquote>
    <div>
      <p>
        <bold style="font-size: 12px">
          hi
        </bold>
      </p>
    </div>
    Hello
    <!--sadf-->
  </div>`,
  'text/html',
);
*/

//el.children returns HTML collection of child noes exlcuding text and comments
//doc.body.children[0].children // HTMLCollection(4) [span, p, blockquote, div]
//el.childNodes returns NodeList which includes text and comments
//doc.body.children[0].childNodes //NodeList(11) [text, span, text, p, text, blockquote, text, div, text, comment, text]
//both HTML collection and NodeList are iterable using for...of 
function traverse(el, property, value) {
  var matches = [];
  for(const child of el.children) { 
    const style = child.style.fontSize; 
    if (style === value) {
      matches.push(child);
    }
    matches.push(...traverse(child, property, value)); //DFS
  }
  return matches;
}
//console.log(traverse(doc.body, "font-size", '12px')); //[span, p, bold]
//DOMParser does not work in Node env. Run this code in browser console. 
//-----------------------------------------------------

const deepEqual = (item1, item2) => {
  if (typeof item1 !== typeof item2) return false;
  if ((typeof item1 !== 'object' && typeof item2 !== 'object') || item1 === null || item2 === null) {
    return item1 === item2;
  }
  if (Array.isArray(item1) && Array.isArray(item2)) {
    if (item1.length !== item2.length) return false;
    for (let i=0; i<item1.length; i++) {
      if (!deepEqual(item1[i], item2[i])) return false;
    }
    return true;
  }
  if(typeof item1 === 'object' && typeof item2 === 'object') {
    const keys1 = Object.keys(item1);
    const keys2 = Object.keys(item2);
    if (keys1.length !== keys2.length) return false;
    for(const key of keys1) {
      if (!deepEqual(item1[key], item2[key])) {
        return false;
      }
    }
    return true;
  }
}

console.log(deepEqual('foo', 'foo')); // true
console.log(deepEqual({ id: 1 }, { id: 1 })); // true
console.log(deepEqual([1, 2, 3], [1, 2, 3])); // true
console.log(deepEqual([{ id: '1' }], [{ id: '2' }])); // false
//-----------------------------------------------------
