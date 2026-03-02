const API_KEY = "a3fda9b9d1d0aaee95df37313c16684e";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/t/p/w500";

const campoPesquisa = document.getElementById("campoPesquisa");
const botaoPesquisa = document.getElementById("botaoPesquisa");
const filmesGrid = document.getElementById("filmesGrid");
const inicio = document.getElementById("inicio");
const filmes = document.getElementById("filmes");
const series = document.getElementById("series");


const botaoTema = document.getElementById("botaoTema");
botaoTema.addEventListener("click", () =>{
    document.body.classList.toggle("tema-claro");
});

async function requisicaoURL(url) {
    try {
        filmesGrid.classList.add("fade-out");

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Erro na requisição");
        }

        const data = await response.json();

        setTimeout(() => {
            renderizarMidia(data.results);
            filmesGrid.classList.remove("fade-out");
            filmesGrid.classList.add("fade-in");

            setTimeout(() => {
                filmesGrid.classList.remove("fade-in");
            }, 300);

        }, 200);

    } catch (error) {
        console.error("Erro", error);
        filmesGrid.innerHTML = '<p>Erro ao carregar filmes</p>';
    }
}

function renderizarMidia(listaMidia) {
    filmesGrid.innerHTML = "";

    if (!listaMidia || listaMidia.length === 0) {
        filmesGrid.innerHTML = '<p>Nenhum filme encontrado</p>';
        return;
    }

    listaMidia.forEach(filme => {
        const card = document.createElement("div");
        card.classList.add("card");

        const imagem = filme.poster_path
            ? `${IMAGE_URL}${filme.poster_path}`
            : "";

        if (filme.title) {
            card.innerHTML = `
                <img src="${imagem}" alt="${filme.title}">
                <h3>${filme.title}</h3>
                <p>
                    Nota: ${filme.vote_average}<br>
                    ${filme.overview}<br>
                    Data: ${filme.release_date || "Não disponível"}
                </p>
            `;
        } else {
            card.innerHTML = `
                <img src="${imagem}" alt="${filme.name}">
                <h3>${filme.name}</h3>
                <p>
                    Nota: ${filme.vote_average}<br>
                    ${filme.overview}<br>
                    Data: ${filme.first_air_date || "Não disponível"}
                </p>
            `;
        }

        card.addEventListener("click", () => {
            const tipo = filme.media_type || (filme.title ? "movie" : "tv");
            window.location.href = `pages/detalhe.html?id=${filme.id}&type=${tipo}`;
        });

        filmesGrid.appendChild(card);
    });
}

function pesquisaGeral() {
    const informacao = campoPesquisa.value.trim();

    if (informacao === "") {
        carregarTendenciasGeral();
        return;
    }

    const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(informacao)}`;
    requisicaoURL(url);

    campoPesquisa.value = "";
}

function carregarTendenciasGeral() {
    const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=pt-BR`;
    requisicaoURL(url);
}

function buscarFilme() {
    const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=pt-BR`;
    requisicaoURL(url);
}

function buscarSerie() {
    const url = `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=pt-BR`;
    requisicaoURL(url);
}

/* EVENTOS */

botaoPesquisa.addEventListener("click", pesquisaGeral);

campoPesquisa.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        pesquisaGeral();
    }
});

document.addEventListener("DOMContentLoaded", carregarTendenciasGeral);
inicio.addEventListener("click", carregarTendenciasGeral);
filmes.addEventListener("click", buscarFilme);
series.addEventListener("click", buscarSerie);

/* LOADER */

document.addEventListener("DOMContentLoaded", () =>{
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo");
    if (tipo === "filme"){
        buscarFilme();
    } else if (tipo === "series"){
        buscarSerie();
    } else {
        carregarTendenciasGeral();
    }
});

window.addEventListener("load", function () {
    const loader = document.getElementById("loader");

    if (loader) {
        loader.style.transition = "opacity 0.5s ease";
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }
});