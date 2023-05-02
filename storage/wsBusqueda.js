let plantilla;

let submit = async (url) => {
    try {
        let respuesta = await fetch(url);
        let resultado = await respuesta.json();

        let meals = await Promise.all(resultado.meals.map(async (index) => {
            plantilla = `
                <div class="meal-item" data-id="${index.idMeal}">
                    <div class="meal-image">
                        <img src=${index.strMealThumb}>
                    </div>
                    <div class="meal-name">
                        <h3>${index.strMeal}</h3>
                        <button class="buttons">Get Details</button>
                    </div>
                </div>
            `
            return plantilla;
        }));

        let data = meals.join('');
        postMessage({ message: "submit", data: data });

    } catch (error) {
        postMessage({ message: "error" })
    }
}

let getDetails = async (url) => {
    try {
        let respuesta = await fetch(url);
        let resultado = await respuesta.json();
        meal = resultado.meals["0"];
        let ingredientes = await getIngredients(meal.idMeal);
        console.log(ingredientes);

        let modal = `
            <div class="modal">
                <h2 class="modal-title">${meal.strMeal}</h2>
                <p class="modal-category">Category: ${meal.strCategory}</p>
                <div class="modal-instructions">
                    <h3>Instructions:</h3>
                    <p>${meal.strInstructions}</p>
                </div>
                <div class="modal-image">
                    <img src=${meal.strMealThumb}>
                </div>
                <div class="modal-link">
                    <a href="${meal.strYoutube}" target = "_blank">
                        Click here to watch the Video
                    </a>
                </div>
                <div class="modal-link">
                    <button class="buttonsI">
                            Click here to get the ingredients list
                     </button>
                </div>
                <div class="modal-button">
                    <button class="cerrar-modal">Cerrar</button>
                </div>
            </div>
            <div class="modalI-C">
            <div class="modalI">
                <h3>Ingredients:</h3>
                <ul>${ingredientes}</ul>
                <button class="cerrar-modalI">Cerrar</button>
            </div>
            </div>
        `
        postMessage({ message: "getDetails", data: modal });

    } catch (error) {
        console.log(error);
    }
}

let getIngredients = async (id) => {
    try {
        let respuesta = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        let resultado = await respuesta.json();

        let ingredientes = resultado.meals[0];

        let ingredientesArray = [];

        for (let i = 1; i <= 20; i++) {
            if (ingredientes[`strIngredient${i}`]) {
                ingredientesArray.push(`<li>${ingredientes[`strIngredient${i}`]} - ${ingredientes[`strMeasure${i}`]}</li>`);
            } else {
                break;
            }
        }

        return ingredientesArray.join('');

    } catch (error) {
        console.log(error);
    }
}


onmessage = (e) => {
    let { message, url } = e.data;

    if (message === "submit") {
        submit(url);
    } else if (message === "getDetails") {
        getDetails(url);
    }
}