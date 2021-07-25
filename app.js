'use strict';
let leftImage = document.getElementById('left-image');
let midImage = document.getElementById('mid-image');
let rightImage = document.getElementById('right-image');
let imagesDiv = document.getElementById('images-div');

function Product(name,src){
  this.name= name;
  this.src=src;
  this.votes=0;
  this.shown=0;
  Product.all.push(this);
}
Product.all=[];

new Product('bag','assets/bag.jpg');
new Product('banana','assets/banana.jpg');
new Product('bathroom','assets/bathroom.jpg');
new Product('boots','assets/boots.jpg');
new Product('breakfast','assets/breakfast.jpg');
new Product('bubblegum','assets/bubblegum.jpg');
new Product('chair','assets/chair.jpg');
new Product('cthulhu','assets/cthulhu.jpg');
new Product('dog-duck','assets/dog-duck.jpg');
new Product('dragon','assets/dragon.jpg');
new Product('pen','assets/pen.jpg');
new Product('pet-sweep','assets/pet-sweep.jpg');
new Product('scissors','assets/scissors.jpg');
new Product('shark','assets/shark.jpg');
new Product('sweep','assets/sweep.png');
new Product('tauntaun','assets/tauntaun.jpg');
new Product('unicorn','assets/unicorn.jpg');
new Product('water-can','assets/water-can.jpg');
new Product('wine-glass','assets/wine-glass.jpg');

console.log(Product.all);
// from class repo
function getRandomIndex() {
  return Math.floor(Math.random() * Product.all.length);
}

let leftImageIndex;
let midImageIndex;
let rightImageIndex;

function render(){
  leftImageIndex = getRandomIndex();
  midImageIndex = getRandomIndex();
  rightImageIndex = getRandomIndex();
  while(leftImageIndex===midImageIndex || leftImageIndex===rightImageIndex ||midImageIndex===rightImageIndex){
    if(leftImageIndex===midImageIndex || leftImageIndex===rightImageIndex){
      leftImageIndex=getRandomIndex();
    }else if(midImageIndex===rightImageIndex){
      midImageIndex=getRandomIndex();
    }
  }
  leftImage.src=Product.all[leftImageIndex].src;
  midImage.src=Product.all[midImageIndex].src;
  rightImage.src=Product.all[rightImageIndex].src;
  Product.all[leftImageIndex].shown++;
  Product.all[midImageIndex].shown++;
  Product.all[rightImageIndex].shown++;
}
render();
let allowedAttempts = 25;
let attemptsCounter = 0;
imagesDiv.addEventListener('click',handleDivClick);

function handleDivClick(event){
  if(attemptsCounter<allowedAttempts){
    if(event.target.id==='left-image'){
      Product.all[leftImageIndex].votes++;
      console.log(Product.all[leftImageIndex]);
    }else if(event.target.id==='mid-image'){
      Product.all[midImageIndex].votes++;
      console.log(Product.all[midImageIndex]);
    }else if(event.target.id==='right-image'){
      Product.all[rightImageIndex].votes++;
      console.log(Product.all[rightImageIndex]);
    }else{
      attemptsCounter--;
    }
    attemptsCounter++;
    render();
  }else{
    imagesDiv.removeEventListener('click',handleDivClick);
    let button = document.getElementById('show-result');
    button.addEventListener('click',showResult);
  }
}
function showResult(){
  let list = document.getElementById('results-list');
  for(let i =0;i<Product.all.length;i++){
    let listItem = document.createElement('li');
    list.appendChild(listItem);
    listItem.textContent=`${Product.all[i].name} had votes ${Product.all[i].votes}, and was seen ${Product.all[i].shown} times.`;
  }
}

