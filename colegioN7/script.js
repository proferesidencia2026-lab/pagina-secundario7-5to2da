// ===== Carrusel de fotos automático =====
(function () {
    const track = document.getElementById('carrusel-track');
    const slides = track ? Array.from(track.children) : [];
    const dotsContainer = document.getElementById('carrusel-dots');
    const btnPrev = document.getElementById('carrusel-prev');
    const btnNext = document.getElementById('carrusel-next');
    const carrusel = document.getElementById('carrusel');

    if (!track || slides.length === 0) return;

    let indiceActual = 0;
    let intervalo;
    const TIEMPO_AUTO = 4500;

    // Crear los puntos (dots) según la cantidad de fotos
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('activo');
        dot.addEventListener('click', () => irASlide(i));
        dotsContainer.appendChild(dot);
    });
    const dots = Array.from(dotsContainer.children);

    function actualizarCarrusel() {
        track.style.transform = `translateX(-${indiceActual * 100}%)`;
        dots.forEach(d => d.classList.remove('activo'));
        dots[indiceActual].classList.add('activo');
    }

    function irASlide(i) {
        indiceActual = i;
        actualizarCarrusel();
        reiniciarAuto();
    }

    function siguienteSlide() {
        indiceActual = (indiceActual + 1) % slides.length;
        actualizarCarrusel();
    }

    function anteriorSlide() {
        indiceActual = (indiceActual - 1 + slides.length) % slides.length;
        actualizarCarrusel();
    }

    function iniciarAuto() {
        intervalo = setInterval(siguienteSlide, TIEMPO_AUTO);
    }

    function reiniciarAuto() {
        clearInterval(intervalo);
        iniciarAuto();
    }

    btnNext.addEventListener('click', () => { siguienteSlide(); reiniciarAuto(); });
    btnPrev.addEventListener('click', () => { anteriorSlide(); reiniciarAuto(); });

    // Pausar el auto-avance mientras el mouse está sobre el carrusel
    carrusel.addEventListener('mouseenter', () => clearInterval(intervalo));
    carrusel.addEventListener('mouseleave', iniciarAuto);

    iniciarAuto();
})();

// ===== Navegación entre secciones =====
(function () {
    const secciones = Array.from(document.querySelectorAll('main > section'));
    const checkMenu = document.getElementById('check');

    function mostrarSeccion(id) {
        const destino = document.getElementById(id);
        if (!destino || destino.tagName !== 'SECTION') return;
        secciones.forEach(s => s.style.display = 'none');
        destino.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const id = this.getAttribute('href').substring(1);
            const destino = document.getElementById(id);
            if (destino && destino.tagName === 'SECTION') {
                e.preventDefault();
                mostrarSeccion(id);
                history.pushState(null, '', '#' + id);
            }
            // Cierra el menú hamburguesa en celular al elegir una opción
            if (checkMenu) checkMenu.checked = false;
        });
    });

    // Si la URL ya trae un hash al cargar la página, mostrar esa sección
    window.addEventListener('DOMContentLoaded', () => {
        const hash = window.location.hash.replace('#', '');
        if (hash && document.getElementById(hash)) {
            mostrarSeccion(hash);
        }
    });
})();

// ===== Pestañas de Cursos (año por año, con sus divisiones) =====
(function () {
    const links = document.querySelectorAll('.anio-link');
    const contenidos = document.querySelectorAll('.anio-contenido');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const anio = this.getAttribute('data-anio');

            links.forEach(l => l.classList.remove('activo'));
            this.classList.add('activo');

            contenidos.forEach(c => c.classList.remove('activo'));
            const destino = document.getElementById('anio-' + anio);
            if (destino) destino.classList.add('activo');
        });
    });
})();
