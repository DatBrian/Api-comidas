// let button = document.querySelectorAll(".buttonsI");

// button.forEach((btn) => {
//     btn.addEventListener("click", () => {
//         let modal = document.querySelector(".modalI");
//         console.log("click")
//         modal.style.display = "block";
//     });
// });

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("buttonsI")) {
        let modal = document.querySelector(".modalI");
        console.log("click")
        modal.style.display = "flex";
    }
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("cerrar-modalI")) {
        let modal = document.querySelector(".modalI");
        modal.style.display = "none";
    }
});