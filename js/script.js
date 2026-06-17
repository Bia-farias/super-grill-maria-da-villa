/* =============================================
   SUPER GRILL EXPRESS & MARIA DA VILLA
   Lógica JavaScript — script.js
   ============================================= */

// -----------------------------------------------
// 1. MENU MOBILE TOGGLE
// -----------------------------------------------
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// -----------------------------------------------
// 2. EFEITO HEADER AO SCROLL
// -----------------------------------------------
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('bg-black', 'shadow-xl');
    } else {
        header.classList.remove('bg-black', 'shadow-xl');
    }
});

// -----------------------------------------------
// 3. CARROSSEL DE ESPECIALIDADES
// -----------------------------------------------
const specSlides = document.querySelectorAll('.spec-slide');
const prevSpecBtn = document.getElementById('prev-spec');
const nextSpecBtn = document.getElementById('next-spec');
const specDotsContainer = document.getElementById('spec-dots');
let specIndex = 0;
let specInterval;

// Criar dots indicadores
specSlides.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = `w-3 h-3 rounded-full transition-colors ${idx === 0 ? 'bg-brandPrimary' : 'bg-brandMedium'}`;
    dot.setAttribute('aria-label', `Ir para slide ${idx + 1}`);
    dot.addEventListener('click', () => showSpecSlide(idx));
    specDotsContainer.appendChild(dot);
});

const specDots = specDotsContainer.querySelectorAll('button');

function showSpecSlide(index) {
    specSlides[specIndex].classList.add('hidden');
    specSlides[specIndex].classList.remove('active', 'grid');
    specDots[specIndex].classList.replace('bg-brandPrimary', 'bg-brandMedium');

    specIndex = (index + specSlides.length) % specSlides.length;

    specSlides[specIndex].classList.remove('hidden');
    specSlides[specIndex].classList.add('active', 'grid');
    specDots[specIndex].classList.replace('bg-brandMedium', 'bg-brandPrimary');
    resetSpecTimer();
}

function nextSpecSlide() { showSpecSlide(specIndex + 1); }
function prevSpecSlide() { showSpecSlide(specIndex - 1); }

function resetSpecTimer() {
    clearInterval(specInterval);
    specInterval = setInterval(nextSpecSlide, 5000);
}

nextSpecBtn.addEventListener('click', nextSpecSlide);
prevSpecBtn.addEventListener('click', prevSpecSlide);
resetSpecTimer();

// -----------------------------------------------
// 4. GALERIA DE UNIDADES — PREMIUM SLIDER
// -----------------------------------------------
const galeriaData = [
    { title: "Shopping Pátio Paulista", desc: "Modernidade e praticidade para o seu dia.", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" },
    { title: "Mooca Plaza Shopping", desc: "Uma experiência gastronômica completa.", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80" },
    { title: "Shopping Cidade São Paulo", desc: "Sabor e conveniência em localização privilegiada.", img: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80" },
    { title: "Santana Parque Shopping", desc: "Qualidade para toda a família.", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80" },
    { title: "Shopping Grand Plaza", desc: "Refeições preparadas com excelência.", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80" },
    { title: "Shopping Internacional", desc: "Atendimento rápido e sabor marcante.", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80" },
    { title: "Morumbi Shopping", desc: "Experiência premium em um dos principais shoppings da cidade.", img: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80" },
    { title: "Shopping Aricanduva", desc: "Tradição e sabor da Maria da Villa.", img: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&w=1200&q=80" },
    { title: "Shopping Interlagos", desc: "Culinária inspirada na tradição italiana.", img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1200&q=80" },
    { title: "Shopping Metrô Itaquera", desc: "Praticidade sem abrir mão da qualidade.", img: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1200&q=80" },
    { title: "Shopping Eldorado", desc: "Receitas especiais para todos os momentos.", img: "https://images.unsplash.com/photo-1592861956120-e524c4b0697b?auto=format&fit=crop&w=1200&q=80" }
];

const galContainer = document.getElementById('galeria-container');
galContainer.innerHTML = '';

galeriaData.forEach((slide, idx) => {
    const slideEl = document.createElement('div');
    slideEl.className = `galeria-slide absolute inset-0 transition-all duration-1000 flex items-center justify-center bg-cover bg-center transform ${idx === 0 ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0 pointer-events-none'}`;
    slideEl.style.backgroundImage = `url('${slide.img}')`;
    slideEl.innerHTML = `
        <div class="absolute inset-0 bg-black/60"></div>
        <div class="relative z-10 text-center px-4 max-w-2xl transition-all duration-700 transform ${idx === 0 ? 'translate-y-0' : 'translate-y-8'}">
            <h3 class="text-2xl sm:text-4xl font-bold uppercase mb-2 tracking-wide">${slide.title}</h3>
            <p class="text-brandMedium text-sm sm:text-base font-light">${slide.desc}</p>
        </div>
    `;
    galContainer.appendChild(slideEl);
});

let galIndex = 0;
const galSlides = document.querySelectorAll('.galeria-slide');
let galInterval;

function showGalSlide(index) {
    galSlides[galIndex].classList.replace('opacity-100', 'opacity-0');
    galSlides[galIndex].classList.replace('scale-100', 'scale-95');
    galSlides[galIndex].classList.add('pointer-events-none');
    galSlides[galIndex].querySelector('div.relative').classList.replace('translate-y-0', 'translate-y-8');

    galIndex = (index + galSlides.length) % galSlides.length;

    galSlides[galIndex].classList.replace('opacity-0', 'opacity-100');
    galSlides[galIndex].classList.replace('scale-95', 'scale-100');
    galSlides[galIndex].classList.remove('pointer-events-none');
    galSlides[galIndex].querySelector('div.relative').classList.replace('translate-y-8', 'translate-y-0');
    resetGalTimer();
}

function nextGalSlide() { showGalSlide(galIndex + 1); }
function prevGalSlide() { showGalSlide(galIndex - 1); }

function resetGalTimer() {
    clearInterval(galInterval);
    galInterval = setInterval(nextGalSlide, 6000);
}

document.getElementById('next-gal').addEventListener('click', nextGalSlide);
document.getElementById('prev-gal').addEventListener('click', prevGalSlide);
resetGalTimer();

// -----------------------------------------------
// 5. SCROLL REVEAL
// -----------------------------------------------
const reveals = document.querySelectorAll('.reveal');

function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < triggerBottom) {
            reveal.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);

// -----------------------------------------------
// 6. FORMULÁRIO DE CONTATO
// -----------------------------------------------
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Obrigado pelo seu contato! Nossa equipe corporativa responderá em breve.');
    this.reset();
});
// Seleção dos elementos
const hamburger = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Função para alternar o menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar o menu quando o usuário clicar em qualquer link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});