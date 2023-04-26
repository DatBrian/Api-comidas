export default {
    all() {
        let ws = new Worker("./storage/wsBusqueda.js");
        let form = document.querySelector("#form");
        let input = document.querySelector("#input");
        let list = document.querySelector("#list");
        let modal = document.querySelector(".modalC");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let dato = input.value.trim().toLowerCase();
            if (!dato) return;

            let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${dato}`

            ws.postMessage({ message: "submit", url: url });
        });


        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("buttons")) {
                let item = e.target.parentElement.parentElement;

                let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.dataset.id}`

                ws.postMessage({ message: "getDetails", url: url });
            } else if (e.target.classList.contains("cerrar-modal")) {
                modal.style.display = "none";
            }
        })

        ws.onmessage = (e) => {
            let { message, data } = e.data;

            if (message === "submit") {
                list.innerHTML = data;
            } else if (message === "getDetails") {
                modal.innerHTML = data;
                modal.style.display = "flex";
            }
        }
    }
}