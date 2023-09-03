
////sidebar/////open&close////
let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn=document.getElementById("submitBtn");



$('#openBTN ').click( ()=> {

    $('.side-nav-menu').css('left' , '0');
    $('.header-menu').css('left' , '13%')
$('#closeBTN').removeClass('d-none');
$('#openBTN ').addClass('d-none');

    });

function autoclose(){
    $('.side-nav-menu').delay(600).animate({left:'-260px'},{duration:500});
$('.header-menu').delay(600).animate({left:'0px'},{duration:500});
$('#openBTN').removeClass('d-none');
$(' #closeBTN').addClass('d-none');
}


    $('#closeBTN ').click( ()=> {

        $('.side-nav-menu').css('left' , '-260');
        $('.header-menu').css('left' , '0%')
    $('#openBTN').removeClass('d-none');
    $(' #closeBTN').addClass('d-none');

        });

        function displayMeals(arr) {
            let cartoona = "";

            for (let i = 0; i < arr.length; i++) {
                cartoona += `
                <div class="col-md-3">
                        <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                            <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                                <h3>${arr[i].strMeal}</h3>
                            </div>
                        </div>
                </div>
                `
            }

            rowData.innerHTML = cartoona
        }

        async function getMealDetails(mealID) {
        autoclose()
            rowData.innerHTML = ""
            $(".inner-loading-screen").fadeIn(300)

            searchContainer.innerHTML = "";
            let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
            respone = await respone.json();

            displayMealsdetails(respone)
            $(".inner-loading-screen").fadeOut(300)

        }
        getMealDetails()
        function displayMealsdetails(meal){

let cartoona = `
<div class="col-md-4">
            <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                alt="">
                <h2>${meal.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
            <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredients}
            </ul>

            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${tagsStr}
            </ul>

            <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
        </div>`

rowData.innerHTML = cartoona
        }

        async function getmeals(){
            autoclose()
            $(".loading").css('display','block');
            let response =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=5572`);
             response=await response.json();

            displaymeals(response.meals)
            $(".loading").css('display','none');
        console.log(response.categories)
        }


         function displaymeals(data){
            let cartona="";
            for (let i=0 ; i < data.length; i++){
                cartona +=`
                <div class="col-md-3">
                <div onclick="getCategoryMeals('${data[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${data[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${data[i].strCategory}</h3>

                    </div>
                </div>
        </div>
                `

            }
            rowData.innerHTML = cartona
        }


async function getCategories(){
    autoclose()
    $(".loading").css('display','block');
    let response =await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
     response=await response.json();
    displaycategory(response.categories)
    $(".loading").css('display','none');

}


 function displaycategory(data){
    rowData.innerHTML = ""
    let cartona="";
    for (let i=0 ; i < data.length; i++){
        cartona +=`
        <div class="col-md-3">
        <div onclick="getCategoryMeals('${data[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${data[i].strCategoryThumb}" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>${data[i].strCategory}</h3>
                <p>${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
</div>
        `

    }
    rowData.innerHTML = cartona
}

async function getArea(){
    autoclose()
     $('#searchContainer').css('display','none')
    $(".loading").css('display','block');
    let response =await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
     response=await response.json();
     displayArea(response.meals)
     $(".loading").css('display','none');
}


 function displayArea(data){


    let cartona="";
    for (let i=0 ; i < data.length; i++){
        cartona +=`
        <div class="col-md-3">
                <div onclick="getAreaMeals('${data[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${data[i].strArea}</h3>
                </div>
        </div>
        `

    }
    rowData.innerHTML = cartona
}

async function getingredients(){
    $(".loading").css('display','block');
    $('#searchContainer').css('display','none')
    let response =await fetch('www.themealdb.com/api/json/v1/1/list.php?i=list');
     response=await response.json();
     displayArea(response.meals)
     $(".loading").css('display','none');

}


 function displayingredients(data){
    let cartona="";
    for (let i=0 ; i < data.length; i++){
        cartona +=`
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${data[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `

    }
    rowData.innerHTML = cartona
}

async function getIngredients() {
    autoclose()
    $(".loading").css('display','block');

    $('#searchContainer').css('display','none')

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    $(".loading").css('display','none');

}


function displayIngredients(data) {
    let cartoona = "";

    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${data[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}






searchByName('')
function showSearch() {
    autoclose()

    $(".loading").css('display','block');
    searchContainer.innerHTML = `
    <div class="row py-4 ">
    <div class="col-md-6 ">
        <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
        <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
    </div>
</div>`


    $(".loading").css('display','none');

}


async function searchByName(term) {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

     displayMeals(response.meals)
     console.log(response.meals)


}


function searchbyfmane(){

}




function displaycntacts(){

autoclose();

    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
<div class="container w-75 text-center">
    <div class="row g-4">
        <div class="col-md-6">
            <input id="nameInput" onkeyup="nameValidation()"  type="text" class="form-control" placeholder="Enter Your Name">
            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                Special characters and numbers not allowed
            </div>
        </div>
        <div class="col-md-6">
            <input id="emailInput"  type="email" class="form-control " placeholder="Enter Your Email">
            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                Email not valid *exemple@yyy.zzz
            </div>
        </div>
        <div class="col-md-6">
            <input id="phoneInput"  type="text" class="form-control " placeholder="Enter Your Phone">
            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid Phone Number
            </div>
        </div>
        <div class="col-md-6">
            <input id="ageInput"  type="number" class="form-control " placeholder="Enter Your Age">
            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid age
            </div>
        </div>
        <div class="col-md-6">
            <input  id="passwordInput" type="password" class="form-control " placeholder="Enter Your Password">
            <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid password *Minimum eight characters, at least one letter and one number:*
            </div>
        </div>
        <div class="col-md-6">
            <input  id="repasswordInput"  type="password" class="form-control " placeholder="Repassword">
            <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid repassword
            </div>
        </div>
    </div>
    <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
</div>
</div> `


}


