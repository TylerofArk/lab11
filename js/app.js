'use strict';

//  *** GLOBAL VARIABLES ***

let totalVotes = 25;
let allProducts = [];

// *** DOM REFERENCES ***

let imgContainer = document.getElementById('img-container');

let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
// let resultsList = document.getElementById('results-list');

// *** LOCAL STORAGE CONTINUES ***

// STEP 3: GET DATA OUT OF LOCAL STORAGE

let retreivedProducts = localStorage.getItem('myProducts');

console.log('retreivedProducts', retreivedProducts);

let parsedProducts = JSON.parse(retreivedProducts);

console.log('parsed Products >>>', parsedProducts);

// *** CONSTRUCTOR FUNCTION ***

function Product(name, photoExtension = 'jpg'){
  this.name = name;
  this.photo = `img/${name}.${photoExtension}`;
  this.votes = 0;
  this.views = 0;

  allProducts.push(this);
}

//  *** OBJECT CREATION ***
if (retreivedProducts){
  allProducts = parsedProducts;
} else {

  // REBUILD PRODUCTS INSTANCES - run parsed data back through the Constructor
  // for (let i = 0; i < parsedProducts.length; i++) {
  //   if (parsedProducts[i].name === 'sweep') {
  //     let reconstructedSweep = new Product(parsedProducts[i].name, 'png');
  //     reconstructedSweep.views = parsedProducts[i].views;
  //     reconstructedSweep.votes = parsedProducts[i].votes;
  //   } else {
  //     let reconstructedProduct = new Product(parsedProduct[i].name);
  //     reconstructedProduct.views = parsedProducts[i].views;
  //     reconstructedProduct.votes = parsedProducts[i].votes;
  //   }
  // }

  new Product('bag');
  new Product('banana');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('sweep', 'png');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('water-can');
  new Product('wine-glass');
}

console.log('allProducts from Constuctor >>>', allProducts);
// *** HELPER FUNCTIONS ***

function randomIndexGenerator(){
  return Math.floor(Math.random() * allProducts.length);
}

let productIndexArray = [];

function renderImgs() {
  while (productIndexArray.length < 6){
    let randomNum = randomIndexGenerator();
    if (!productIndexArray.includes(randomNum)) {
      productIndexArray.push(randomNum);
    }
  }

  let imgOneIndex = productIndexArray.shift();
  let imgTwoIndex = productIndexArray.shift();
  let imgThreeIndex = productIndexArray.shift();
  // console.log([imgOneIndex,imgTwoIndex,imgThreeIndex]);
  // console.log(allProducts);

  console.log(allProducts[imgOneIndex]);

  imgOne.src = allProducts[imgOneIndex].photo;
  imgOne.alt = allProducts[imgOneIndex].name;
  imgOne.name = allProducts[imgOneIndex].name;
  allProducts[imgOneIndex].views++;

  imgTwo.src = allProducts[imgTwoIndex].photo;
  imgTwo.alt = allProducts[imgTwoIndex].name;
  imgTwo.name = allProducts[imgTwoIndex].name;
  allProducts[imgTwoIndex].views++;

  imgThree.src = allProducts[imgThreeIndex].photo;
  imgThree.alt = allProducts[imgThreeIndex].name;
  imgThree.name = allProducts[imgThreeIndex].name;
  allProducts[imgThreeIndex].views++;
}

renderImgs();

// *** EVENT HANDLERS ***

function handleClick(event){
  let imgClicked = event.target.name;

  for(let i = 0; i < allProducts.length; i++){
    if (imgClicked === allProducts[i].name){
      allProducts[i].votes++;
    }
  }
  totalVotes--;

  renderImgs();

  if(totalVotes === 0){
    //  *** LOCAL STORAGE STARTS HERE ***

    // STEP 1: STRINGIFY THE DATA

    let stringifiedProducts = JSON.stringify(allProducts);

    console.log('stringified products >>>', stringifiedProducts);

    // STEP 2: ADD TO LOCAL STORAGE

    localStorage.setItem('myProducts', stringifiedProducts);

    imgContainer.removeEventListener('click', handleClick);

  }
}

function handleShowResults(){
  if(totalVotes === 0){
    renderChart();
    // for(let i = 0; i < allProducts.length; i++){
    //   let liElem = document.createElement('li');
    //   liElem.textContent = `${allProducts[i].name}: views: ${allProducts[i].views}, votes: ${allProducts[i].votes}`;
    //   resultsList.appendChild(liElem);
    // }
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}


// CHART DEMO

// *** CANVAS ELEMENT NEEDED TO RENDER THE CHART ***
let canvasElem = document.getElementById('my-chart');

function renderChart() {

  // *** CREATING EMPTY ARRAYS TO POPULATE WITH THE INFO FOR OUR CHART ***
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  // *** THIS FOR LOOP TAKES ALL THE DATA AFTER THE VOTING ROUNDS ARE COMPLETED AND POPULATES THE ARRAYS CREATED ABOVE ***

  for(let i = 0; i < allProducts.length; i++){
    productNames.push(allProducts[i].name);
    productVotes.push(allProducts[i].votes);
    productViews.push(allProducts[i].views);
  }

  // *** CONFIG OBJECT THAT CHART.JS USES TO RENDER THE CHART ***
  let myObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        backgroundColor: [
          'midnight blue'
        ],
        borderColor: [
          'midnight blue'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: productViews,
        backgroundColor: [
          'grey'
        ],
        borderColor: [
          'midnight blue'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        },
      },
      plugins: {
        legend: {
          labels:{
            color: 'white',
            padding: 30
          },
        }
      }
    }
  };

  new Chart(canvasElem, myObj);
}


// const ctx = document.getElementById('myChart').getContext('2d');



// *** EVENT LISTENERS ***
imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
