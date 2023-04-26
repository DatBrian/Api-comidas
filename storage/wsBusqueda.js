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
                <div class="modal-button">
                    <button class="cerrar-modal">Cerrar</button>
                </div>
            </div>
        `
        postMessage({ message: "getDetails", data: modal });

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