const galeria = document.getElementById("galeria");

const modal = document.getElementById("modal-redes");
const redesContainer = document.getElementById("redes");
const cerrarModal = document.getElementById("cerrar-modal");

const modalNsfw = document.getElementById("modal-nsfw");
const aceptarNsfw = document.getElementById("aceptar-nsfw");
const cancelarNsfw = document.getElementById("cancelar-nsfw");

const nombreArtistaModal =
    document.getElementById("nombre-artista-modal");

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
            e.target.closest(".btn-redes") ||
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
    const fanartsRandom = [...fanarts].sort(() => Math.random() - 0.5);
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
        cuadro.addEventListener("click", (e) => {

            if (e.target.classList.contains("btn-redes")) {
                return;
            }

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
        { key: "twitch", label: "Twitch", icono: "icons/twitch.png", clase: "twitch" },
        { key: "instagram", label: "Instagram", icono: "icons/instagram.png", clase: "instagram" },
        { key: "reddit", label: "Reddit", icono: "icons/reddit.png", clase: "reddit" },
        { key: "x", label: "X", icono: "icons/x.png", clase: "x" },
        { key: "youtube", label: "YouTube", icono: "icons/youtube.png", clase: "youtube" },
        { key: "vgen", label: "VGen", icono: "icons/vgen.png", clase: "vgen" },
        { key: "tiktok", label: "TikTok", icono: "icons/tiktok.png", clase: "tiktok" },
        { key: "artstation", label: "ArtStation", icono: "icons/artstation.png", clase: "artstation" },
        { key: "deviantart", label: "Deviantart", icono: "icons/deviantart.png", clase: "deviantart" },
        { key: "furaffinity", label: "furaffinity", icono: "icons/furaffinity.png", clase: "furaffinity" },
        { key: "discord", label: "Discord", icono: "icons/discord.png", clase: "discord" }
    ];

    let tieneRedes = false;

    redes.forEach(red => {

        if (
            datosArtista &&
            datosArtista.redes &&
            datosArtista.redes[red.key] === 1 &&
            datosArtista.links &&
            datosArtista.links[red.key]
        ) {

            const enlace = document.createElement("a");

            enlace.classList.add("btn-red", red.clase);
            enlace.href = datosArtista.links[red.key];
            enlace.target = "_blank";
            enlace.rel = "noopener noreferrer";

            enlace.innerHTML = `
                <img src="${red.icono}" alt="${red.label}">
                <span>${red.label}</span>
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
if (cerrarModal) {
    cerrarModal.addEventListener("click", () => {
        modal.classList.add("oculto");
    });
}

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

        if (modal) modal.classList.add("oculto");
        if (modalNsfw) modalNsfw.classList.add("oculto");

        fanartPendiente = null;
    }
});

// =========================
// INICIAR
// =========================
cargarFanarts();