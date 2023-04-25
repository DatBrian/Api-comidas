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
                        <a href="#">ger recipe</a>
                    </div>
                </div>
            `
            return plantilla;
        }));

        let data = meals.join('');
        postMessage({ message: "submit", data: data });

    } catch (error) {
        console.log(error);
    }
}





onmessage = (e) => {
    let { message, url } = e.data;

    if (message === "submit") {
        submit(url);
    }
}