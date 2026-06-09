const $ = id => document.getElementById(id);

const punteros = [
    "puntero/vf22s.png",
    "puntero/vf19e.png",
    "puntero/vf17s.png",
    "puntero/vf11maxl.png",
    "puntero/vf1.png",
    "puntero/vf25.png",
    "puntero/vf31s.png",
];

const punteroRandom =
    punteros[Math.floor(Math.random() * punteros.length)];

document.documentElement.style.setProperty(
    "--cursor-random",
    `url("${punteroRandom}") 0 0`
);

const galeria = $("galeria"),
      modal = $("modal-redes"),
      redesContainer = $("redes"),
      cerrarModal = $("cerrar-modal"),
      modalNsfw = $("modal-nsfw"),
      aceptarNsfw = $("aceptar-nsfw"),
      cancelarNsfw = $("cancelar-nsfw"),
      nombreArtistaModal = $("nombre-artista-modal");

let cuadroExpandido = null;
let fanartPendiente = null;

// =========================
// ABRIR CUADRO EXPANDIDO
// =========================
function abrirCuadro(cuadro, art, mostrarOriginal = false) {

    if (cuadroExpandido) return;

    const clon = cuadro.cloneNode(true);

    if (mostrarOriginal) {
        const img = clon.querySelector("img");
        if (img) img.src = art.imagen;
    }

    // 🔥 FORZAR COLOR TIPO PLACA
    const titulo = clon.querySelector("h3");
    if (titulo) {
        titulo.style.color = "#2a1a00";
        titulo.style.textShadow = "0 1px 0 rgba(255,255,255,0.4)";
    }

    const boton = clon.querySelector(".btn-redes");
    if (boton) {
        boton.style.color = "#2a1a00";
    }

    clon.classList.add("expandido");
    document.body.appendChild(clon);

    cuadroExpandido = clon;

    // =========================
    // BOTÓN REDES EN CLON
    // =========================
    const btnRedesClon = clon.querySelector(".btn-redes");

    if (btnRedesClon) {
        btnRedesClon.addEventListener("click", (e) => {

            e.stopPropagation();
            abrirModal(art);
            nombreArtistaModal.textContent = art.artista;
        });
    }

    // =========================
    // CERRAR EXPANDIDO
    // =========================
    clon.addEventListener("click", (e) => {

        if (
            e.target.closest(".marco") ||
            e.target.closest(".info")
        ) {
            return;
        }

        clon.remove();
        cuadroExpandido = null;

    });
}

// =========================
// CARGAR GALERÍA
// =========================
function cargarFanarts() {

    galeria.innerHTML = "";

    const fanartsLista = [];

    for (const artista in fanarts) {

        fanarts[artista].forEach(item => {

            if (typeof item === "string") {

                fanartsLista.push({
                    imagen: item,
                    artista,
                    nsfw: 0
                });

            } else {

                fanartsLista.push({
                    imagen: item.imagen,
                    artista,
                    nsfw: item.nsfw || 0
                });

            }

        });

    }

    const fanartsRandom = [...fanartsLista]
        .map(v => ({ v, r: Math.random() }))
        .sort((a, b) => a.r - b.r)
        .map(({ v }) => v);

    fanartsRandom.forEach(art => {

        const cuadro = document.createElement("div");
        cuadro.classList.add("cuadro");

        const imagenMostrar =
            art.nsfw === 1
                ? "img/nsfw.png"
                : art.imagen;

        cuadro.innerHTML = `
            <div class="marco">
                <img src="${imagenMostrar}" alt="${art.artista}">
            </div>

            <div class="info">
                <h3>${art.artista}</h3>
                <button class="btn-redes">Ver redes</button>
            </div>
        `;

        // =========================
        // CLICK CUADRO
        // =========================
        const marco = cuadro.querySelector(".marco");

        marco.addEventListener("click", () => {

            if (art.nsfw === 1) {
                fanartPendiente = art;
                modalNsfw.classList.remove("oculto");
                return;
            }

            abrirCuadro(cuadro, art);
        });

        // =========================
        // BOTÓN REDES ORIGINAL
        // =========================
        const btnRedes = cuadro.querySelector(".btn-redes");

        btnRedes.addEventListener("click", (e) => {

            e.stopPropagation();
            abrirModal(art);
            nombreArtistaModal.textContent = art.artista;
        });

        galeria.appendChild(cuadro);
    });
}

// =========================
// MODAL NSFW
// =========================
if (aceptarNsfw) {

    aceptarNsfw.addEventListener("click", () => {

        if (!fanartPendiente) return;

        const cuadroOriginal =
            [...document.querySelectorAll(".cuadro")]
            .find(c =>
                c.querySelector("h3").textContent ===
                fanartPendiente.artista
            );

        if (cuadroOriginal) {
            abrirCuadro(
                cuadroOriginal,
                fanartPendiente,
                true
            );
        }

        modalNsfw.classList.add("oculto");
        fanartPendiente = null;
    });
}

if (cancelarNsfw) {

    cancelarNsfw.addEventListener("click", () => {

        modalNsfw.classList.add("oculto");
        fanartPendiente = null;
    });
}

// =========================
// ABRIR MODAL REDES
// =========================
function abrirModal(art) {

    const datosArtista = artistas[art.artista];

    redesContainer.innerHTML = "";

    const redes = [
    ["twitch","Twitch"],
    ["instagram","Instagram"],
    ["reddit","Reddit"],
    ["x","X"],
    ["youtube","YouTube"],
    ["vgen","VGen"],
    ["tiktok","TikTok"],
    ["artstation","ArtStation"],
    ["deviantart","DeviantArt"],
    ["furaffinity","FurAffinity"],
    ["discord","Discord"]
    ];

    let tieneRedes = false;

    redes.forEach(([key, label]) => {

        if (
            datosArtista &&
            datosArtista.links &&
            datosArtista.links[key]
        ) {

            const enlace = document.createElement("a");

            enlace.classList.add("btn-red", key);
            enlace.href = datosArtista.links[key];
            enlace.target = "_blank";
            enlace.rel = "noopener noreferrer";

            enlace.innerHTML = `
                <img src="icons/${key}.png" alt="${label}">
                <span>${label}</span>
            `;

            redesContainer.appendChild(enlace);
            tieneRedes = true;
        }
    });

    if (!tieneRedes) {
        redesContainer.innerHTML = `
            <p style="color:#2a1a00;">
                Este artista no tiene redes disponibles.
            </p>
        `;
    }

    modal.classList.remove("oculto");
}

// =========================
// CERRAR MODAL REDES
// =========================
cerrarModal?.addEventListener(
    "click",
    ()=>modal.classList.add("oculto")
);

if (modal) {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("oculto");
        }
    });
}

if (modalNsfw) {
    modalNsfw.addEventListener("click", (e) => {
        if (e.target === modalNsfw) {
            modalNsfw.classList.add("oculto");
            fanartPendiente = null;
        }
    });
}

// =========================
// ESC PARA CERRAR
// =========================
document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        if (cuadroExpandido) {
            cuadroExpandido.remove();
            cuadroExpandido = null;
        }

        [modal,modalNsfw].forEach(
            m=>m?.classList.add("oculto")
        );

        fanartPendiente = null;
    }
});

// =========================
// INICIAR
// =========================
// =========================
// MÚSICA
// =========================

const canciones = [
    "musica/REMEMBER_16.mp3"
];

const audio = document.getElementById("musica");
const btnMusica = document.getElementById("btn-musica");

audio.src =
    canciones[Math.floor(Math.random() * canciones.length)];

audio.volume = 0.4;

// primer click en la página inicia la música
document.addEventListener("click", () => {

    if (audio.paused) {
        audio.play().catch(()=>{});
    }

}, { once: true });

btnMusica?.addEventListener("click", (e) => {

    e.stopPropagation();

    if (audio.paused) {

        audio.play();
        btnMusica.textContent = "🎵";

    } else {

        audio.pause();
        btnMusica.textContent = "🔇";

    }

});

// cuando termine vuelve a reproducirse
audio.addEventListener("ended", () => {

    audio.currentTime = 0;
    audio.play();

});
cargarFanarts();