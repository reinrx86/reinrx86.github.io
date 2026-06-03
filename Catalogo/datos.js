const productos = [
{
    id: 1,
    imagenes: [
        "https://picsum.photos/id/101/600/400",
        "https://picsum.photos/id/102/600/400",
        "https://picsum.photos/id/103/600/400"
    ],
    titulo: "Billetera Clásica de Cuero",
    descripcion: "Billetera artesanal confeccionada en cuero genuino.",
    dimensiones: {
        altura: "10 cm",
        ancho: "12 cm",
        fondo: "2 cm"
    },
    categoria: "Billeteras",
    precioAnterior: 45000,
    precioActual: 38990
},
{
    id: 2,
    imagenes: [
        "https://picsum.photos/id/104/600/400",
        "https://picsum.photos/id/105/600/400",
        "https://picsum.photos/id/106/600/400"
    ],
    titulo: "Cinturón Ejecutivo",
    descripcion: "Cinturón de cuero natural para uso formal.",
    dimensiones: {
        altura: "4 cm",
        ancho: "120 cm",
        fondo: "0.5 cm"
    },
    categoria: "Cinturones",
    precioAnterior: 35000,
    precioActual: 29990
},
{
    id: 3,
    imagenes: [
        "https://picsum.photos/id/107/600/400",
        "https://picsum.photos/id/108/600/400",
        "https://picsum.photos/id/109/600/400"
    ],
    titulo: "Bolso Messenger Vintage",
    descripcion: "Bolso de cuero estilo vintage para uso diario.",
    dimensiones: {
        altura: "30 cm",
        ancho: "40 cm",
        fondo: "10 cm"
    },
    categoria: "Bolsos",
    precioAnterior: 99000,
    precioActual: 84990
},
{
    id: 4,
    imagenes: [
        "https://picsum.photos/id/110/600/400",
        "https://picsum.photos/id/111/600/400",
        "https://picsum.photos/id/112/600/400"
    ],
    titulo: "Mochila de Cuero Premium",
    descripcion: "Mochila elegante fabricada con cuero de alta calidad.",
    dimensiones: {
        altura: "45 cm",
        ancho: "32 cm",
        fondo: "15 cm"
    },
    categoria: "Mochilas",
    precioAnterior: 145000,
    precioActual: 129990
},
{
    id: 5,
    imagenes: [
        "https://picsum.photos/id/113/600/400",
        "https://picsum.photos/id/114/600/400",
        "https://picsum.photos/id/115/600/400"
    ],
    titulo: "Porta Pasaporte",
    descripcion: "Protección elegante para documentos de viaje.",
    dimensiones: {
        altura: "14 cm",
        ancho: "10 cm",
        fondo: "1 cm"
    },
    categoria: "Accesorios",
    precioAnterior: 25000,
    precioActual: 19990
},
{
    id: 6,
    imagenes: [
        "https://picsum.photos/id/116/600/400",
        "https://picsum.photos/id/117/600/400",
        "https://picsum.photos/id/118/600/400"
    ],
    titulo: "Maletín Ejecutivo",
    descripcion: "Maletín profesional para documentos y notebook.",
    dimensiones: {
        altura: "30 cm",
        ancho: "42 cm",
        fondo: "12 cm"
    },
    categoria: "Maletines",
    precioAnterior: 160000,
    precioActual: 145000
},
{
    id: 7,
    imagenes: [
        "https://picsum.photos/id/119/600/400",
        "https://picsum.photos/id/120/600/400",
        "https://picsum.photos/id/121/600/400"
    ],
    titulo: "Pulsera de Cuero Trenzado",
    descripcion: "Pulsera artesanal con acabado premium.",
    dimensiones: {
        altura: "1 cm",
        ancho: "22 cm",
        fondo: "0.5 cm"
    },
    categoria: "Accesorios",
    precioAnterior: 15000,
    precioActual: 11990
},
{
    id: 8,
    imagenes: [
        "https://picsum.photos/id/122/600/400",
        "https://picsum.photos/id/123/600/400",
        "https://picsum.photos/id/124/600/400"
    ],
    titulo: "Funda para Notebook",
    descripcion: "Funda acolchada de cuero para portátil.",
    dimensiones: {
        altura: "28 cm",
        ancho: "38 cm",
        fondo: "3 cm"
    },
    categoria: "Fundas",
    precioAnterior: 65000,
    precioActual: 57990
},
{
    id: 9,
    imagenes: [
        "https://picsum.photos/id/125/600/400",
        "https://picsum.photos/id/126/600/400",
        "https://picsum.photos/id/127/600/400"
    ],
    titulo: "Agenda Forrada en Cuero",
    descripcion: "Agenda elegante para uso ejecutivo.",
    dimensiones: {
        altura: "21 cm",
        ancho: "15 cm",
        fondo: "2 cm"
    },
    categoria: "Papelería",
    precioAnterior: 30000,
    precioActual: 24990
},
{
    id: 10,
    imagenes: [
        "https://picsum.photos/id/128/600/400",
        "https://picsum.photos/id/129/600/400",
        "https://picsum.photos/id/130/600/400"
    ],
    titulo: "Llavero de Cuero Artesanal",
    descripcion: "Llavero resistente fabricado a mano.",
    dimensiones: {
        altura: "8 cm",
        ancho: "3 cm",
        fondo: "1 cm"
    },
    categoria: "Accesorios",
    precioAnterior: 10000,
    precioActual: 7990
},
{
    id: 11,
    imagenes: [
        "https://picsum.photos/id/131/600/400",
        "https://picsum.photos/id/132/600/400",
        "https://picsum.photos/id/133/600/400"
    ],
    titulo: "Bandolera Urbana",
    descripcion: "Bandolera compacta para uso diario.",
    dimensiones: {
        altura: "25 cm",
        ancho: "20 cm",
        fondo: "8 cm"
    },
    categoria: "Bolsos",
    precioAnterior: 70000,
    precioActual: 62990
},
{
    id: 12,
    imagenes: [
        "https://picsum.photos/id/134/600/400",
        "https://picsum.photos/id/135/600/400",
        "https://picsum.photos/id/136/600/400"
    ],
    titulo: "Porta Tarjetas Slim",
    descripcion: "Diseño minimalista para tarjetas y documentos.",
    dimensiones: {
        altura: "8 cm",
        ancho: "11 cm",
        fondo: "1 cm"
    },
    categoria: "Billeteras",
    precioAnterior: 15990,
    precioActual: 15990
}
]; 