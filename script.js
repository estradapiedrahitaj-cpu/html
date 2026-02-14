/* ========================================
   JAVASCRIPT ACTUALIZADO - ROSAS INTERACTIVAS
   ======================================== */

// ========================================
// 1. CREAR LAS ESTRELLAS
// ========================================
function crearEstrellas() {
    const contenedorEstrellas = document.querySelector('.estrellas');
    const numeroEstrellas = 200;
    
    for (let i = 0; i < numeroEstrellas; i++) {
        const estrella = document.createElement('div');
        estrella.className = 'estrella';
        
        estrella.style.left = Math.random() * 100 + '%';
        estrella.style.top = Math.random() * 100 + '%';
        
        const tamaño = Math.random() * 2 + 1;
        estrella.style.width = tamaño + 'px';
        estrella.style.height = tamaño + 'px';
        
        estrella.style.animationDelay = Math.random() * 3 + 's';
        
        contenedorEstrellas.appendChild(estrella);
    }
}

window.addEventListener('load', crearEstrellas);

// ========================================
// 2. VARIABLES GLOBALES
// ========================================
let paginaActual = 1;
const totalPaginas = 6; // 1 inicio + 5 rosas
let rosasActivadas = false;

// Referencias a elementos
const corazon = document.getElementById('corazon');
const jardinRosas = document.getElementById('jardinRosas');
const rosasContenedores = document.querySelectorAll('.rosa-contenedor');
const botones = document.getElementById('botones');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const contenidoTexto = document.getElementById('contenido');

// ========================================
// 3. CLICK EN EL CORAZÓN
// ========================================
corazon.addEventListener('click', function() {
    if (!rosasActivadas) {
        // Mostrar el jardín de rosas con animación
        jardinRosas.classList.add('mostrar');
        rosasActivadas = true;
        
        // Ocultar el corazón gradualmente
        setTimeout(() => {
            corazon.style.transition = 'all 0.8s ease';
            corazon.style.opacity = '0';
            corazon.style.transform = 'scale(0.5)';
            corazon.style.pointerEvents = 'none';
        }, 100);
        
        // Ocultar TODO el contenido de texto (incluyendo "Para Ti")
        contenidoTexto.style.transition = 'all 0.8s ease';
        contenidoTexto.style.opacity = '0';
        contenidoTexto.style.pointerEvents = 'none';
        
        console.log('🌹 Jardín de rosas activado');
    }
});

// ========================================
// 4. CLICK EN CADA ROSA
// ========================================
rosasContenedores.forEach(rosaContenedor => {
    rosaContenedor.addEventListener('click', function() {
        // Obtener el número de página de esta rosa
        const numeroPagina = parseInt(this.getAttribute('data-pagina'));
        
        console.log('🌹 Rosa seleccionada - Página:', numeroPagina);
        
        // Ocultar las rosas
        jardinRosas.classList.remove('mostrar');
        
        // Ir a la página correspondiente
        irAPagina(numeroPagina);
        
        // Mostrar botones de navegación
        botones.classList.add('mostrar');
        
        // Restaurar opacidad del contenido y hacerlo interactivo
        contenidoTexto.style.opacity = '1';
        contenidoTexto.style.pointerEvents = 'auto';
        
        // Reproducir sonido (opcional)
        reproducirSonidoRosa();
    });
});

// ========================================
// 5. FUNCIÓN: IR A UNA PÁGINA ESPECÍFICA
// ========================================
function irAPagina(numero) {
    // Ocultar página actual
    const paginaActiva = document.getElementById('pagina' + paginaActual);
    if (paginaActiva) {
        paginaActiva.classList.remove('activa');
    }
    
    // Actualizar número de página
    paginaActual = numero;
    
    // Mostrar nueva página
    const nuevaPagina = document.getElementById('pagina' + paginaActual);
    if (nuevaPagina) {
        nuevaPagina.classList.add('activa');
    }
    
    // Actualizar estado de botones
    actualizarBotones();
    
    console.log('📄 Página actual:', paginaActual);
}

// ========================================
// 6. FUNCIÓN: MOSTRAR ROSAS DE NUEVO
// ========================================
function mostrarRosas() {
    console.log('🌹 Mostrando rosas de nuevo...');
    
    // Ocultar la página actual (si no es página 1)
    if (paginaActual > 1) {
        const paginaActiva = document.getElementById('pagina' + paginaActual);
        if (paginaActiva) {
            paginaActiva.classList.remove('activa');
        }
    }
    
    // Mostrar el jardín de rosas
    jardinRosas.classList.add('mostrar');
    
    // Ocultar botones de navegación
    botones.classList.remove('mostrar');
    
    // Ocultar el contenido de texto
    contenidoTexto.style.opacity = '0';
    contenidoTexto.style.pointerEvents = 'none';
    
    console.log('🌹 Rosas visibles - Click en una rosa para ver su página');
}

// ========================================
// 7. NAVEGACIÓN: PÁGINA SIGUIENTE
// ========================================
function paginaSiguiente() {
    if (paginaActual < totalPaginas) {
        const paginaActiva = document.getElementById('pagina' + paginaActual);
        paginaActiva.classList.remove('activa');
        
        paginaActual++;
        
        const nuevaPagina = document.getElementById('pagina' + paginaActual);
        nuevaPagina.classList.add('activa');
        
        actualizarBotones();
        console.log('➡️ Siguiente página:', paginaActual);
    }
}

// ========================================
// 8. NAVEGACIÓN: PÁGINA ANTERIOR
// ========================================
function paginaAnterior() {
    if (paginaActual > 2) { // No permitir volver a página 1 (inicio)
        const paginaActiva = document.getElementById('pagina' + paginaActual);
        paginaActiva.classList.remove('activa');
        
        paginaActual--;
        
        const nuevaPagina = document.getElementById('pagina' + paginaActual);
        nuevaPagina.classList.add('activa');
        
        actualizarBotones();
        console.log('⬅️ Página anterior:', paginaActual);
    }
}

// ========================================
// 9. ACTUALIZAR BOTONES
// ========================================
function actualizarBotones() {
    // Deshabilitar "Anterior" si estamos en página 2 (primera rosa)
    if (paginaActual <= 2) {
        btnAnterior.disabled = true;
    } else {
        btnAnterior.disabled = false;
    }
    
    // Deshabilitar "Siguiente" si estamos en la última página
    if (paginaActual >= totalPaginas) {
        btnSiguiente.disabled = true;
    } else {
        btnSiguiente.disabled = false;
    }
}

// ========================================
// 10. SONIDO DE ROSA (OPCIONAL)
// ========================================
function reproducirSonidoRosa() {
    // Si tienes un archivo de sonido, descomenta estas líneas:
 
    console.log('🔊 Sonido de rosa (opcional)');
}

// ========================================
// 11. NAVEGACIÓN CON TECLADO
// ========================================
document.addEventListener('keydown', function(evento) {
    // Solo permitir navegación si ya se seleccionó una rosa
    if (rosasActivadas && paginaActual > 1) {
        if (evento.key === 'ArrowRight') {
            paginaSiguiente();
        } else if (evento.key === 'ArrowLeft') {
            paginaAnterior();
        } else if (evento.key === 'Escape') {
            mostrarRosas();
        }
    }
});

// ========================================
// NUEVO: CLICK FUERA DE LAS ROSAS
// ========================================
document.addEventListener('click', function(evento) {
    // Solo si estamos en una página de rosa (no en inicio)
    if (rosasActivadas && paginaActual > 1) {
        // Verificar que el click NO fue en:
        // - Una rosa
        // - Un botón de navegación
        // - Una imagen
        const clickEnRosa = evento.target.closest('.rosa-contenedor');
        const clickEnBoton = evento.target.closest('button');
        const clickEnImagen = evento.target.tagName === 'IMG';
        
        if (!clickEnRosa && !clickEnBoton && !clickEnImagen) {
            console.log('👆 Click fuera de rosas - Mostrando rosas');
            mostrarRosas();
        }
    }
});

// ========================================
// 12. CONTROL DE MÚSICA
// ========================================
const musica = document.getElementById('musica');

if (musica) {
    musica.volume = 1.0;
    
    // Intentar reproducir
    musica.play().catch(function(error) {
        console.log('⚠️ Autoplay bloqueado - Click para activar música');
    });
    
    // Activar música con primer click
    document.addEventListener('click', function activarMusica() {
        musica.play();
        console.log('🎵 Música activada');
    }, { once: true });
}

// ========================================
// 13. INICIALIZACIÓN
// ========================================
actualizarBotones();

// Animación de entrada
window.addEventListener('load', function() {
    const contenedor = document.querySelector('.contenedor');
    contenedor.style.opacity = '0';
    contenedor.style.transform = 'scale(0.8)';
    
    setTimeout(function() {
        contenedor.style.transition = 'all 1s ease';
        contenedor.style.opacity = '1';
        contenedor.style.transform = 'scale(1)';
    }, 100);
    
    console.log('✨ Presentación cargada - Total de páginas:', totalPaginas);
});

/* ========================================
   📝 GUÍA RÁPIDA PARA PERSONALIZAR:
   
   ✏️ Cambiar número de rosas:
   1. Añade/quita <div class="rosa-contenedor"> en HTML
   2. Actualiza "const totalPaginas" aquí
   3. Añade/quita <div class="pagina"> en HTML
   
   🎨 Cambiar etiquetas de rosas:
   - Edita el texto en <div class="etiqueta">
   
   🖼️ Cambiar fotos:
   - Reemplaza foto1.jpg, foto2.jpg, etc.
   
   🎵 Añadir música:
   - Coloca tu archivo musica.mp3 en la carpeta
   - Ajusta volumen: musica.volume = 0.3 (0.0 a 1.0)
   
   ⭐ Cambiar cantidad de estrellas:
   - Modifica "const numeroEstrellas = 200"
   
   🌹 Volver a ver las rosas:
   - Haz click en cualquier parte fuera de las rosas
   - O presiona la tecla ESC
   ======================================== */