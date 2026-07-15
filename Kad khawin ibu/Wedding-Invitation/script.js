const openButton = document.getElementById('openButton');
const introScreen = document.getElementById('introScreen');
const invitation = document.getElementById('invitation');
const envelope = document.getElementById('envelope');
const scrollHint = document.getElementById('scrollHint');
const mainContent = document.getElementById('mainContent');
const feedbackMessage = document.getElementById('feedbackMessage');
const rsvpForm = document.getElementById('rsvpForm');
const shareButton = document.getElementById('shareButton');
const bgMusic = document.getElementById('bgMusic');

const targetDate = new Date('2026-08-08T12:00:00');

function formatNumber(value) {
  return value.toString().padStart(2, '0');
}

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent = formatNumber(days);
  document.getElementById('hours').textContent = formatNumber(hours);
  document.getElementById('minutes').textContent = formatNumber(minutes);
  document.getElementById('seconds').textContent = formatNumber(seconds);
}

function showInvitation() {
  introScreen.classList.add('hidden');
  invitation.classList.remove('hidden');
  setTimeout(() => {
    envelope.classList.add('open');
  }, 120);

  setTimeout(() => {
    scrollHint.classList.remove('hidden');
    mainContent.classList.remove('hidden');
  }, 1600);

  if (bgMusic) {
    bgMusic.play().catch(() => {
      // autoplay may be blocked in some browsers
    });
  }
}

openButton.addEventListener('click', showInvitation);

scrollHint.addEventListener('click', () => {
  mainContent.scrollIntoView({ behavior: 'smooth' });
});

if (shareButton) {
  shareButton.addEventListener('click', () => {
    const pageUrl = window.location.href;
    const message = `Jemputan perkahwinan kami:\nRodzlan bin jamil dan Norazizah binti hamid\n8 ogos 2026\n
Buka jemputan: ${pageUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  });
}

rsvpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  feedbackMessage.classList.remove('hidden');
  rsvpForm.reset();
  setTimeout(() => {
    feedbackMessage.classList.add('hidden');
  }, 6000);
});

updateCountdown();
setInterval(updateCountdown, 1000);
