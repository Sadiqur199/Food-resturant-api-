
// call the dayanamic api
const locatedFood = (searchText, datalimit)=>{
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
  console.log(url)
  fetch(url)
  .then(res=>res.json())
  .then(data=>dispalyFood(data.meals,datalimit))
}

// work the food card 
const dispalyFood = (meals,datalimit) =>{
  const cardContainer = document.getElementById('card-container')
  cardContainer.innerText = '';
  
  // slice data
  //  show all button 
  const showAll = document.getElementById('show-all')
  if(datalimit&& meals.length >5)
  {
    meals = meals.slice(0,5);
    showAll.classList.remove('d-none')
  }
  else{
    showAll.classList.add('d-none')
  }
  //  no result found
  //  const showEmptyResult = document.getElementById('show-empty-result');
  //  if(meals.length === 0)
  //  {
  //   showEmptyResult.classList.remove('d-none');
  //  }
  //  else {
  //   showEmptyResult.classList.add('d-none');

  //  }

  //  card creat
  meals.forEach(meal => {
    console.log(meal)
    const creatDiv = document.createElement('div')
    creatDiv.classList.add('col', 'para')
     
    creatDiv.innerHTML = `

    <div class="card h-auto w-100">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body ">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text  para">${meal.strInstructions}</p>

      <button onclick = "loadMealDetails(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal">
        MealDetails
      </button>

    </div>
  </div> 
 `
    cardContainer.appendChild(creatDiv)
  });
  // stop spinner
  loder(false);
}


// async use to food details
const loadMealDetails =async (idMeal) =>{
  const Url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
   try{
    const collectUrl = await fetch(Url)
    const Data = await collectUrl.json()
    displayModal(Data.meals[0]) 
   }
   catch(error){
    console.log(error)
   }
}

// arrow function use to food detials

// const loadMealDetails = idMeal =>{
//   const Url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
//   fetch(Url)
//   .then(Response=>Response.json())
//   .then(Data => displayModal(Data.meals[0]) )
// }

// display the food details
const displayModal = meal =>
{
  document.getElementById('detailsModalLabel').innerText = meal.strMeal;
  const mealDetails =  document.getElementById('mealDetails')
  mealDetails.innerHTML = `
  <img class = "img-fluid mb-" src="${meal.strMealThumb}"  alt="...">
   <p>${meal.strInstructions}</p>
  `;
}

// process Search function
const processSearch = (datalimit) =>
{
  loder(true)
  const  searchText = document.getElementById('search-input').value;
   console.log(searchText)
   locatedFood(searchText,datalimit)

}

// input enter field
document.getElementById('search-input').addEventListener('keypress',function(event){
  console.log(event.key)
  if(event.key === 'Enter')
  {
    processSearch(10);
  }
})

// working the search button
function searchbtn() {
   processSearch(10);
}

function showAll(){
  processSearch();
}

// spinner working

const loder = islodding =>{
  const spinner = document.getElementById('spinner');
  if(islodding)
  {
    spinner.classList.remove('d-none');
  }
  else{
    spinner.classList.add('d-none');
  }
}

locatedFood('');