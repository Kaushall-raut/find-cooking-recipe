// ?variables
let dishName = document.getElementById("name");
let btn = document.querySelector(".btn");
let mainDiv = document.querySelector("#mainCard");
let temp = document.getElementsByTagName("template")[0];

//* function defination
const apiCall = async (s) => {
  try {
    let apiLink = `https://www.themealdb.com/api/json/v1/1/search.php?s=${s}`;
    let data = await fetch(apiLink);
    let res = await data.json();
    let { meals } = res;
    mainDiv.innerHTML = "";

    meals.forEach((element) => {
      bindData(element);
    });

    console.log(meals);
  } catch (error) {
    Swal.fire("Sorry! Recipe Not Found");
  }
};

const bindData = (element) => {
  //   meals.forEach((element) => {
  let clone = temp.content.cloneNode(true);
  let image = clone.querySelector("#foodImage");
  image.src = element.strMealThumb;
  let name = clone.querySelector("#foodName");
  name.innerText = element.strMeal;
  let watch = clone.querySelector(".btn");
  watch.href = element.strYoutube;
  let ingredients = clone.querySelector(".card-text");
  ingredients.innerText = `${element.strIngredient1},
    ${element.strIngredient2},
    ${element.strIngredient3},
    ${element.strIngredient4}
  ....`;
  mainDiv.appendChild(clone);
};

// apiCall();
// !function calling
btn.addEventListener("click", (e) => {
  e.preventDefault();
  let store = dishName.value;
  //   let s = store.trim();
  apiCall(store);
  //   console.log(dishName.value);
});
