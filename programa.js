const params = new URLSearchParams(window.location.search);
const programaId = params.get('id');

function cargarPrograma() {
  const programa = window.getProgramaById(programaId);

  if (!programa) {
    document.getElementById('detalle-titulo').textContent = 'Programa no encontrado';
    return;
  }

  document.getElementById('detalle-titulo').textContent = programa.nombre;
  document.getElementById('detalle-icon').textContent = programa.icon || '✨';

  // Video background
  const videoBg = document.getElementById('detalle-video-bg');
  if (videoBg) {
    if (programa.video) {
      videoBg.innerHTML = `
        <iframe class="video-bg-iframe"
          src="https://www.youtube.com/embed/${programa.video}?autoplay=1&mute=1&controls=0&loop=1&playlist=${programa.video}&rel=0&modestbranding=1&showinfo=0&vq=hd1080"
          allow="autoplay; encrypted-media">
        </iframe>
        <div class="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10"></div>
      `;
    } else {
      videoBg.innerHTML = '<div class="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>';
    }
  }

  document.getElementById('detalle-tagline').textContent = programa.tagline || programa.descripcion;
  document.getElementById('detalle-resumen').textContent = programa.descripcion;
  document.getElementById('detalle-imagen').src = programa.imagen;
  document.getElementById('detalle-imagen').alt = programa.nombre;

  // Chips
  const chipsContainer = document.getElementById('detalle-chips');
  if (chipsContainer) {
    chipsContainer.innerHTML = `
      <span class="inline-block rounded-full bg-[#e8f7e8] text-[#1b5d25] px-3 py-1 text-xs font-bold">${programa.nivel}</span>
      <span class="inline-block rounded-full bg-[#e8f7e8] text-[#1b5d25] px-3 py-1 text-xs font-bold">${programa.modalidad}</span>
      <span class="inline-block rounded-full bg-[#e8f7e8] text-[#1b5d25] px-3 py-1 text-xs font-bold">${programa.duracion}</span>
    `;
  }

  document.getElementById('detalle-descripcion').textContent = programa.descripcion;
  document.getElementById('detalle-lugar').textContent = programa.lugar;
  document.getElementById('detalle-horario').textContent = programa.horario;
  document.getElementById('detalle-inicio').textContent = programa.inicio;
  document.getElementById('detalle-fin').textContent = programa.fin;
  document.getElementById('detalle-homologa').textContent = programa.homologa;

  // ¿Qué aprenderás?
  const aprendeList = document.getElementById('detalle-aprende');
  if (aprendeList) {
    aprendeList.innerHTML = programa.aprende.map((item) =>
      `<li class="flex items-start gap-2 text-sm text-gray-600"><span class="text-sena mt-0.5 shrink-0">✓</span>${item}</li>`
    ).join('');
  }

  // Beneficios
  const beneficiosList = document.getElementById('detalle-beneficios');
  if (beneficiosList) {
    beneficiosList.innerHTML = (programa.beneficios || []).map((item) =>
      `<li class="flex items-start gap-2 text-sm text-gray-600"><span class="text-sena mt-0.5 shrink-0">★</span>${item}</li>`
    ).join('');
  }

  // Datos curiosos
  const curiosidadesList = document.getElementById('detalle-curiosidades');
  if (curiosidadesList) {
    curiosidadesList.innerHTML = (window.getDatosCuriosos(programa) || []).map((item) =>
      `<li class="flex items-start gap-2 text-sm text-gray-600"><span class="text-sena mt-0.5 shrink-0">💡</span>${item}</li>`
    ).join('');
  }

  // Inscripción link
  const inscripcionLink = document.getElementById('detalle-inscripcion');
  if (inscripcionLink) {
    inscripcionLink.href = programa.inscripcion;
  }

  // Video del programa
  const videoBox = document.getElementById('detalle-video');
  if (videoBox) {
    if (programa.video) {
      videoBox.innerHTML = `<iframe class="w-full h-full absolute inset-0" src="https://www.youtube.com/embed/${programa.video}" title="${programa.nombre}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      videoBox.classList.add('relative');
    } else {
      videoBox.innerHTML = '<p class="text-gray-400 text-sm">Video próximamente disponible.</p>';
    }
  }
}

cargarPrograma();
