// =============================================
// ANIMACIONES Y EFECTOS PARA EL PROYECTO
// Mantenimiento de Equipos de Cómputo - SENA
// =============================================

// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
         // =============================================
    // 0. PRELOADER
    // =============================================
    
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        let progreso = 0;
        
        function actualizarPreloader() {
            if (progreso < 100) {
                progreso += Math.random() * 30;
                if (progreso > 100) progreso = 100;
                
                const preloaderProgreso = document.getElementById('preloader-progreso');
                const preloaderPorcentaje = document.getElementById('preloader-porcentaje');
                
                if (preloaderProgreso) {
                    preloaderProgreso.style.width = progreso + '%';
                }
                if (preloaderPorcentaje) {
                    preloaderPorcentaje.textContent = Math.floor(progreso) + '%';
                }
                
                setTimeout(actualizarPreloader, 150);
            } else {
                // Ocultar preloader
                setTimeout(function() {
                    preloader.classList.add('oculto');
                    preloader.style.display = 'none'; // Ocultar completamente
                }, 300);
            }
        }
        
        actualizarPreloader();
        
        // Timeout de seguridad (por si algo falla)
        setTimeout(function() {
            preloader.classList.add('oculto');
            preloader.style.display = 'none';
        }, 3000);
    }
    
    // =============================================
    // 1. SCROLL REVEAL MEJORADO
    // =============================================
    
    const configuracionAnimaciones = {
        '.inicio-texto': { animacion: 'reveal-izquierda', velocidad: 'reveal-medio' },
        '.inicio-visual': { animacion: 'reveal-derecha', velocidad: 'reveal-medio' },
        '.tarjeta-servicio': { animacion: 'reveal-abajo', velocidad: 'reveal-medio' },
        '.seccion-encabezado': { animacion: 'reveal-abajo', velocidad: 'reveal-medio' },
        '.bloque-analisis:nth-child(odd)': { animacion: 'reveal-izquierda', velocidad: 'reveal-medio' },
        '.bloque-analisis:nth-child(even)': { animacion: 'reveal-derecha', velocidad: 'reveal-medio' },
    };
    
    Object.keys(configuracionAnimaciones).forEach(function(selector) {
        const elementos = document.querySelectorAll(selector);
        const config = configuracionAnimaciones[selector];
        
        elementos.forEach(function(elemento, index) {
            elemento.classList.add('reveal', config.animacion, config.velocidad);
            
            if (elementos.length > 1) {
                if (index === 0) elemento.classList.add('reveal-retraso-1');
                if (index === 1) elemento.classList.add('reveal-retraso-2');
                if (index === 2) elemento.classList.add('reveal-retraso-3');
                if (index === 3) elemento.classList.add('reveal-retraso-4');
            }
        });
    });
    
    const observador = new IntersectionObserver(function(entradas) {
        entradas.forEach(function(entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('reveal-visible');
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.reveal').forEach(function(elemento) {
        observador.observe(elemento);
    });
    
    // =============================================
    // 2. EFECTO EN LA BARRA DE NAVEGACIÓN
    // =============================================
    
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('header-scroll');
            } else {
                header.classList.remove('header-scroll');
            }
        });
    }
    
    // =============================================
    // 3. EFECTO DE TIPEO PARA EL TÍTULO
    // =============================================
    
    const titulo = document.querySelector('.inicio-texto h1');
    
    if (titulo) {
        const textoOriginal = titulo.textContent;
        titulo.textContent = '';
        
        let indice = 0;
        
        function escribirTexto() {
            if (indice < textoOriginal.length) {
                titulo.textContent += textoOriginal.charAt(indice);
                indice++;
                setTimeout(escribirTexto, 80);
            } else {
                titulo.classList.add('tipeo-completo');
            }
        }
        
        setTimeout(escribirTexto, 1000);
    }
    
    // =============================================
    // 4. SCROLL SUAVE MEJORADO
    // =============================================
    
    function irASeccion(destino) {
        const encabezado = document.querySelector('header');
        const alturaEncabezado = encabezado ? encabezado.offsetHeight : 0;
        
        // Posición real respecto al documento (no al contenedor posicionado más cercano)
        const posicion = destino.getBoundingClientRect().top + window.scrollY - alturaEncabezado - 20;
        
        window.scrollTo({
            top: Math.max(posicion, 0),
            behavior: 'smooth'
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(function(enlace) {
        enlace.addEventListener('click', function(e) {
            const ancla = this.getAttribute('href');
            
            // Un "#" solo (sin nombre) no es un selector válido
            if (ancla.length < 2) return;
            
            const destino = document.querySelector(ancla);
            
            if (destino) {
                e.preventDefault();
                irASeccion(destino);
            }
        });
    });
    
    // =============================================
    // 5. BOTÓN VOLVER ARRIBA
    // =============================================
    
    const btnArriba = document.getElementById('btn-arriba');
    
    if (btnArriba) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                btnArriba.classList.add('visible');
            } else {
                btnArriba.classList.remove('visible');
            }
        });
        
        btnArriba.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // =============================================
    // 6. BARRA DE PROGRESO DE LECTURA
    // =============================================
    
    const barraProgreso = document.getElementById('barra-progreso');
    
    if (barraProgreso) {
        window.addEventListener('scroll', function() {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const scrollActual = window.scrollY;
            
            const porcentaje = scrollTotal > 0 ? (scrollActual / scrollTotal) * 100 : 0;
            
            barraProgreso.style.width = porcentaje + '%';
        });
    }
    
    // =============================================
    // 7. CURSOR PERSONALIZADO
    // =============================================
    
    const cursorPunto = document.getElementById('cursor-punto');
    const cursorAnillo = document.getElementById('cursor-anillo');
    
    if (cursorPunto && cursorAnillo && window.innerWidth > 768) {
        let mouseX = 0;
        let mouseY = 0;
        let anilloX = 0;
        let anilloY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!document.body.classList.contains('cursor-listo')) {
                // Primer movimiento: el anillo arranca en el mouse y no en la esquina
                anilloX = mouseX;
                anilloY = mouseY;
                document.body.classList.add('cursor-listo');
            }
            
            cursorPunto.style.left = mouseX + 'px';
            cursorPunto.style.top = mouseY + 'px';
        });
        
        function animarCursor() {
            anilloX += (mouseX - anilloX) * 0.2;
            anilloY += (mouseY - anilloY) * 0.2;
            
            cursorAnillo.style.left = anilloX + 'px';
            cursorAnillo.style.top = anilloY + 'px';
            
            requestAnimationFrame(animarCursor);
        }
        
        animarCursor();
    }
    
    // =============================================
    // 8. ANIMACIÓN DEL LOGO
    // =============================================
    
    const logo = document.querySelector('.marca img');
    
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(360deg) scale(1.1)';
            this.style.transition = 'transform 0.5s ease-in-out';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    }
               // =============================================
    // 9. RUEDA DE NAVEGACIÓN (resalta la sección actual)
    // =============================================
    
    const rueda = document.getElementById('rueda-navegacion');
    const ruedaPuntos = document.querySelectorAll('.rueda-punto');
    
    if (rueda && ruedaPuntos.length > 0) {
        const bloquesRueda = Array.from(ruedaPuntos).map(function(punto) {
            return document.querySelector(punto.getAttribute('href'));
        });
        
        function actualizarRueda() {
            const encabezado = document.querySelector('header');
            const alturaEncabezado = encabezado ? encabezado.offsetHeight : 0;
            const linea = alturaEncabezado + window.innerHeight * 0.25;
            
            let actual = null;
            
            bloquesRueda.forEach(function(bloque) {
                if (bloque && bloque.getBoundingClientRect().top <= linea) {
                    actual = bloque.id;
                }
            });
            
            ruedaPuntos.forEach(function(punto) {
                punto.classList.toggle('activo', punto.getAttribute('href') === '#' + actual);
            });
            
            // Solo se muestra cuando ya se entró a las secciones numeradas
            rueda.classList.toggle('visible', actual !== null);
        }
        
        window.addEventListener('scroll', actualizarRueda);
        window.addEventListener('resize', actualizarRueda);
        actualizarRueda();
    }
    
}); // Cierre correcto del DOMContentLoaded
