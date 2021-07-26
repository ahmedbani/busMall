'use strict';
let leftImage = document.getElementById('left-image');
let midImage = document.getElementById('mid-image');
let rightImage = document.getElementById('right-image');
let imagesDiv = document.getElementById('images-div');
let button = document.getElementById('show-result');
let names = [];
let votesArr = [];
let shownArr=[];

function Product(name,src){
  this.name= name;
  this.src=src;
  this.votes=0;
  this.shown=0;
  Product.all.push(this);
  names.push(this.name);
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
let repeatArr=[];

function render(){
  leftImageIndex = getRandomIndex();
  midImageIndex = getRandomIndex();
  rightImageIndex = getRandomIndex();
  

  while(leftImageIndex===midImageIndex || leftImageIndex===rightImageIndex ||midImageIndex===rightImageIndex || repeatArr.includes(leftImageIndex)|| repeatArr.includes(midImageIndex)|| repeatArr.includes(rightImageIndex)){
    if(leftImageIndex===midImageIndex || leftImageIndex===rightImageIndex){
      leftImageIndex=getRandomIndex();
    }else if(midImageIndex===rightImageIndex){
      midImageIndex=getRandomIndex();
    }else if(repeatArr.includes(leftImageIndex) ){
      leftImageIndex = getRandomIndex();
      console.log(repeatArr.includes(leftImageIndex));
    }else if(repeatArr.includes(midImageIndex)){
      midImageIndex = getRandomIndex();
      console.log(repeatArr.includes(midImageIndex));
    }else if(repeatArr.includes(rightImageIndex)){
      rightImageIndex = getRandomIndex();
      console.log(repeatArr.includes(rightImageIndex));
    }
  }
  repeatArr=[leftImageIndex,midImageIndex,rightImageIndex];
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
    button.hidden=false;
    button.addEventListener('click',showResult);
    for (let i = 0; i < Product.all.length; i++) {
      votesArr.push(Product.all[i].votes);
      shownArr.push(Product.all[i].shown);
    }
  }
}
function showResult(){
  let list = document.getElementById('results-list');
  for(let i =0;i<Product.all.length;i++){
    let listItem = document.createElement('li');
    list.appendChild(listItem);
    listItem.textContent=`${Product.all[i].name} had votes ${Product.all[i].votes}, and was seen ${Product.all[i].shown} times.`;
  }
  showChart();
  showPieChart();
  button.removeEventListener('click',showResult);
}
function showChart() {

  const data = {
    labels: names,
    datasets: [{
      label: 'Votes',
      data: votesArr,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    },
    {
      label: 'Shown',
      data: shownArr,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };


  let myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}
function showPieChart(){
  const data = {
    labels: names,
    datasets: [{
      label: 'shown',
      data: shownArr,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(44,149,200)',
        'rgb(123,249,100)',
        'rgb(230,145,45)',
        '#58508d',
        '#ffa600',
        '#003f5c',
        '#bc5090'
      ],
      hoverOffset: 4
    }]
  };
  const config = {
    type: 'pie',
    data: data,
  };
  let pieChart = new Chart(
    document.getElementById('pieChart'),
    config
  );
}

