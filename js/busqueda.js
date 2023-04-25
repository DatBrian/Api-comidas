export default {
    all() {
        let ws = new Worker("./storage/wsBusqueda.js");
        let form = document.querySelector("#form");
        let input = document.querySelector("#input");
        let list = document.querySelector("#list");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let dato = input.value.trim().toLowerCase();
            if (!dato) return;

            let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${dato}`

            ws.postMessage({ message: "submit", url: url });
        })

        ws.onmessage = (e) => {
            let { message, data } = e.data;

            if (message === "submit") {
                list.innerHTML = data;
            }
        }
    }
}