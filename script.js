const $ = (selector) => document.querySelector(selector);
const intro = $('#intro');
const experience = $('#experience');
const envelope = $('#envelope');
const envelopeStage = $('#envelopeStage');
const garden = $('#garden');
const bouquet = $('#bouquet');
const soundButton = $('#soundButton');
const messageCopy = $('#messageCopy');
const shareStatus = $('#shareStatus');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const messages = [
  'Que esta primavera llene tus días de luz, calma y momentos bonitos.',
  'Las flores amarillas simbolizan alegría, cariño y la promesa de nuevos comienzos.',
  'Hoy es un buen día para recordar lo especial que eres y todo lo bonito que mereces.'
];

function createStars() {
  const stars = $('#stars');
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 38; i += 1) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;--size:${1 + Math.random() * 2.5}px;--duration:${2.5 + Math.random() * 4}s;--delay:${Math.random() * -6}s`;
    fragment.appendChild(star);
  }
  stars.appendChild(fragment);
}

function makeFlower(index, total) {
  const flower = document.createElement('div');
  const positions = [50, 38, 62, 27, 50, 73, 18, 35, 65, 82, 25, 44, 56, 75, 17, 32, 50, 68, 83, 22, 39, 61, 78, 29, 46, 55, 71, 35, 50, 65];
  const depths = [84, 79, 79, 72, 71, 72, 65, 66, 66, 65, 59, 59, 58, 59, 52, 53, 52, 53, 52, 46, 47, 47, 46, 42, 42, 41, 42, 38, 37, 38];
  const scales = [.78, .82, .82, .82, .96, .82, .78, .88, .88, .78, .84, .96, .95, .84, .8, .91, 1.08, .91, .8, .85, .93, .92, .85, .86, .96, .94, .86, .84, .9, .84];
  const x = positions[index];
  const depth = depths[index];
  const lean = (x - 50) * .24;
  const stemLength = 150 + ((depth - 38) * 4.2);
  flower.className = `flower ${scales[index] < .8 ? 'small-flower' : ''}`;
  flower.style.cssText = `--x:${x}%;bottom:${depth}%;--scale:${scales[index]};--rotation:${-11 + Math.random() * 22}deg;--lean:${lean}deg;--stem:${stemLength}px;--delay:${.12 + index * .055}s;z-index:${Math.round(100 - depth)}`;

  const petals = document.createElement('div');
  petals.className = 'petals';
  for (let p = 0; p < 8; p += 1) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.setProperty('--i', p);
    petals.appendChild(petal);
  }
  flower.innerHTML = '<span class="stem"></span>';
  flower.append(petals, Object.assign(document.createElement('span'), { className: 'flower-core' }));
  return flower;
}

function growBouquet() {
  if (bouquet.children.length) return;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 30; i += 1) fragment.appendChild(makeFlower(i, 30));
  bouquet.appendChild(fragment);
}

function rainPetals(count = 34) {
  if (reduceMotion) return;
  const layer = $('#falling');
  for (let i = 0; i < count; i += 1) {
    setTimeout(() => {
      const piece = document.createElement('i');
      piece.className = 'falling-piece';
      piece.style.cssText = `--left:${Math.random() * 100}%;--size:${8 + Math.random() * 12}px;--duration:${5 + Math.random() * 5}s;--delay:0s;--drift:${-90 + Math.random() * 180}px;--spin:${180 + Math.random() * 720}deg`;
      layer.appendChild(piece);
      setTimeout(() => piece.remove(), 10500);
    }, i * 110);
  }
}

function beginExperience() {
  intro.classList.add('leaving');
  setTimeout(() => {
    intro.hidden = true;
    experience.classList.add('active');
    experience.setAttribute('aria-hidden', 'false');
    setTimeout(() => envelope.classList.add('open'), reduceMotion ? 50 : 1050);
    setTimeout(revealGarden, reduceMotion ? 100 : 3650);
  }, reduceMotion ? 10 : 700);
}

function revealGarden() {
  growBouquet();
  envelopeStage.classList.add('finished');
  envelopeStage.hidden = true;
  experience.classList.add('bloomed');
  garden.setAttribute('aria-hidden', 'false');
  rainPetals();
  setInterval(() => rainPetals(7), 8500);
}

document.querySelectorAll('.dot').forEach((dot, index) => {
  dot.addEventListener('click', () => {
    document.querySelectorAll('.dot').forEach((item) => item.classList.remove('active'));
    dot.classList.add('active');
    messageCopy.classList.add('changing');
    setTimeout(() => {
      messageCopy.textContent = messages[index];
      messageCopy.classList.remove('changing');
    }, 220);
  });
});

let audioContext;
let musicTimer;
let noteIndex = 0;
const melody = [261.63, 329.63, 392, 523.25, 440, 392, 329.63, 293.66];

function playNote(frequency) {
  if (!audioContext) return;
  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = noteIndex % 3 === 0 ? 'sine' : 'triangle';
  oscillator.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(.0001, now);
  gain.gain.exponentialRampToValueAtTime(.035, now + .08);
  gain.gain.exponentialRampToValueAtTime(.0001, now + 1.35);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 1.4);
}

async function toggleMusic() {
  const isPlaying = soundButton.getAttribute('aria-pressed') === 'true';
  if (isPlaying) {
    clearInterval(musicTimer);
    if (audioContext) await audioContext.close();
    audioContext = null;
    soundButton.setAttribute('aria-pressed', 'false');
    soundButton.setAttribute('aria-label', 'Reproducir música ambiental');
    $('.sound-label').textContent = 'Música';
    return;
  }
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    $('.sound-label').textContent = 'No disponible';
    return;
  }
  audioContext = new AudioContext();
  await audioContext.resume();
  noteIndex = 0;
  playNote(melody[noteIndex]);
  musicTimer = setInterval(() => {
    noteIndex = (noteIndex + 1) % melody.length;
    playNote(melody[noteIndex]);
  }, 760);
  soundButton.setAttribute('aria-pressed', 'true');
  soundButton.setAttribute('aria-label', 'Pausar música ambiental');
  $('.sound-label').textContent = 'Pausar';
}

async function sharePage() {
  const shareData = {
    title: 'Flores amarillas para ti',
    text: 'Tengo un detalle de primavera para ti 💛',
    url: window.location.href
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      shareStatus.textContent = '¡Listo para compartir!';
    } else {
      await navigator.clipboard.writeText(window.location.href);
      shareStatus.textContent = 'Enlace copiado al portapapeles.';
    }
  } catch (error) {
    if (error.name !== 'AbortError') shareStatus.textContent = 'Copia el enlace del navegador para compartirlo.';
  }
}

$('#startButton').addEventListener('click', beginExperience, { once: true });
soundButton.addEventListener('click', toggleMusic);
$('#shareButton').addEventListener('click', sharePage);
createStars();
