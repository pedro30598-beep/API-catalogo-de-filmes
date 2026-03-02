const API_KEY =  "a3fda9b9d1d0aaee95df37313c16684e";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/t/p/w500";

const detalhesContainer = document.getElementById ("detalhesContainer");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

const botaoTema = document.getElementById("botaoTema");
botaoTema.addEventListener("click", () =>{
    document.body.classList.toggle("tema-claro");
});


async function carregarDetalhes() {
    if (!id || !type){
        detalhesContainer.innerHTML = "<p> Conteúdo inválido</p>";
        return;
    }
    try {
        const response = await fetch(
            `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=pt-BR`
        );
        if (!response.ok) {
            throw new Error("Error na API");
        }
        const data = await response.json();
        renderizarDetalhes(data);
    } catch (error) {
        detalhesContainer.innerHTML = "<p> Error ao carregar detalhes.</p>";
        console.error(error);
    }
}

function renderizarDetalhes(item) {
    const imagem = item.poster_path 
    ? IMAGE_URL + item.poster_path:
    "";
    const titulo = item.title || item.name;
    const dataLancamento = item.release_date || item.first_air_date;
    document.title = titulo;
    detalhesContainer.innerHTML = `
    <div class="detalhes-card">
        <img src="${imagem}" alt="${titulo}">
        <div class="detalhes-info">
            <h2>${titulo}</h2>
            <div class="linha"></div>
            <br>
            <p>Data: ${dataLancamento || "Não disponível"}<br>
            nota: ${item.vote_average}<br>
            ${item.tagline}<br>
            ${item.overview}</p>
        </div>
    </div>
    `;
}
document.addEventListener("DOMContentLoaded",  carregarDetalhes);