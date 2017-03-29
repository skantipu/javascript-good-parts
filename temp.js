/* From Sandeep Renu */

//Finding triplets of a given array..
var x = [2,1,8,33,5]
sum = 8;
function findtriplet(x,sum){
  x.sort(function(a,b){
    return a-b;
  }); // onlogn

  //[1,2,5,8,33]

  for(var i=0;i<x.length;i++){
    var pointer1index = i+1;
    var pointer2index = x.length - 1;

    // 1+2+33 < 8
    while(pointer1index < pointer2index){

      if(x[i] + x[pointer1index] + x[pointer2index] > sum){
        pointer2index--;
      }else if(x[i] + x[pointer1index] + x[pointer2index] < sum){
        pointer1index++;
      }else{
        console.log(x[i] +" + " + x[pointer1index] +" + "+ x[pointer2index] +" = " + sum);
        pointer1index++;
        pointer2index--;
      }

    }

  }

}
findtriplet(x,sum);


//https://www.interviewcake.com/question/javascript/stock-price

 // bruteforce approach
function getmaxprofit(x){
  var profit = 0;
  for(var i =0;i<x.length;i++){
    var buy = x[i];
    for(var j = i+1;j<x.length;j++){
      var sell = x[j];
      if(profit <= (sell - buy)){
        profit = (sell-buy);
      }
    }
  }
  console.log(profit);
}

getmaxprofit([10, 7, 5, 8, 11, 9]);
// single iteration in O(n)
function getmaxprofit(x){
  var maxprofit = x[1] - x[0];
  var min = x[0];
  for(var i =1;i<x.length;i++){
    if(x[i] < min){
      min = x[i];
    }
    if((x[i] - min) > maxprofit){
      maxprofit = (x[i] - min);
    }

  }
  console.log(maxprofit);

}

getmaxprofit([10, 7, 5, 8, 11, 9]);
//https://www.interviewcake.com/question/javascript/product-of-other-numbers
  function productofremaining(x){
    var pa = [];
    var producttillnow = 1;
    for(var i=0;i<x.length;i++){
      producttillnow *= x[i-1] || 1;
      pa.push(producttillnow);
    }
    // console.log(pa);

    producttillnow = 1;
    for(var i=x.length-1;i>=0;i--){
      producttillnow *= x[i+1] || 1;
      pa[i]=producttillnow * pa[i];
    }
    console.log(pa);
  }

productofremaining([1,2,3,4]);

//https://www.interviewcake.com/question/javascript/reverse-linked-list
 // reverse a linkedlist

function reverseLinkedList(x){
  var nextpointer = null;
  for(var i=0;i<x.length;i++){
    x[i].next =  nextpointer;
    nextpointer = x[i].val;
  }
  console.log(x)
}


//a->b , b->c ,c->null

//a->null , b->a , c->b

reverseLinkedList([
  {val:"a",next:"b"},
  {val:"b",next:"c"},
  {val:"c",next:null}
]);

var arr1= [-5,40,45,90]
var arr2= [-100,25,30,100]
var mergedarr = [];

function merge(){
  while(arr1.length>0 && arr2.length>0){
    if(arr1[0] < arr2[0]){
      mergedarr.push(arr1.shift());
    }else{
      mergedarr.push(arr2.shift());
    }
  }

  if(arr1.length > 0){
    mergedarr.concat(arr1.slice(0,arr1.length));
  }
  if(arr2.length > 0){
    mergedarr.concat(arr2.slice(0,arr2.length));
  }

  return mergedarr
}

console.log(merge())

//eventhandling….
function async(clbcks){
  setTimeout(function(){
    var resp = "response"
    clbcks.forEach(function(val,indx){
      val.call(this,resp+indx);
    });
  },0);
}


function defer(){
  this.calbacks=[];
  async(this.calbacks);
}

defer.prototype.done = function(arg){
  this.calbacks.push(arg);
}


var x = new defer();

x.done(function(resp){
  console.log("calback-1" + resp)
})

x.done(function(resp){
  console.log("calback-2" + resp)
})
//---a cube + b cube = c 3;
function ram(num){
  var hash = {};
  var maxlimit = Math.pow(num,1/3);
  for(var i=1;i<maxlimit;i++){
    hash[Math.pow(i,3)] = i;
  }

  //console.log(hash);

  for(var val in hash){
    if(hash.hasOwnProperty(num - val)){
      console.log(hash[val],hash[num-val]);
      delete hash[num - val];
    }
  }
}

ram(327763000);
