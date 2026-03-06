document.addEventListener("DOMContentLoaded", function () {

    const inicio = document.getElementById("inicio");
    const filmes = document.getElementById("filmes");
    const series = document.getElementById("series");

    inicio.addEventListener("click", function (e) {
        window.location.href = "/index.html";
    });

    filmes.addEventListener("click", function (e) {
        window.location.href = "/index.html?tipo=filme";
    });

    series.addEventListener("click", function (e) {
        window.location.href = "/index.html?tipo=series";
    });

    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "escuro") {
        document.body.classList.add("tema-escuro");
    }

});

const botaoTema = document.getElementById("botaoTema");

const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "escuro") {
    document.body.classList.add("tema-escuro");
}

botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("tema-escuro");

    if (document.body.classList.contains("tema-escuro")) {
        localStorage.setItem("tema", "escuro");
    } else {
        localStorage.setItem("tema", "claro");
    }
});