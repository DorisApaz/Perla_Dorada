// Navegación adaptable a celulares
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
menuButton.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(opened));
  menuButton.textContent = opened ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}));

// Año actualizado automáticamente
document.querySelector('#year').textContent = new Date().getFullYear();

// Animaciones de entrada
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

// Campos adicionales para transporte de carga
const serviceSelect = document.querySelector('[name="servicio"]');
const transportFields = document.querySelector('.transport-fields');
function toggleTransport() {
  const isTransport = serviceSelect.value === 'Transporte de carga';
  transportFields.hidden = !isTransport;
  transportFields.querySelectorAll('input').forEach(input => {
    input.required = isTransport;
    if (!isTransport) input.value = '';
  });
}
serviceSelect.addEventListener('change', toggleTransport);
toggleTransport();

// Formulario: prepara el mensaje, sin guardar datos
document.querySelector('#quote-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const get = key => String(data.get(key) || '').trim();
  const lines = [
    'Hola, quisiera solicitar información o una cotización a Perla Dorada.',
    '',
    `Servicio: ${get('servicio')}`,
    `Nombre: ${get('nombre')}`,
    `Teléfono: ${get('telefono')}`
  ];
  if (get('empresa')) lines.push(`Empresa: ${get('empresa')}`);
  if (get('ruc')) lines.push(`RUC: ${get('ruc')}`);
  if (get('correo')) lines.push(`Correo: ${get('correo')}`);
  if (get('servicio') === 'Transporte de carga') {
    lines.push(`Origen: ${get('origen')}`, `Destino: ${get('destino')}`);
  }
  if (get('ubicacion')) lines.push(`Ubicación del proyecto: ${get('ubicacion')}`);
  lines.push(`Detalles: ${get('detalle')}`);
  const url = `https://wa.me/51954575756?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});
