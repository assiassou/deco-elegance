/* ==========================================================================
   DECO ELEGANCE - SIMPLIFIED SCRIPT
   ========================================================================== */

const PACKS = {
  solo: {
    name: 'Pack Solo Élégance (4 Crochets)',
    price: 199
  },
  duo: {
    name: 'Duo Offre (8 Crochets)',
    price: 299
  },
  maison: {
    name: 'Pack Maison Complète (12 Crochets)',
    price: 399
  }
};

let currentPack = 'duo';

function selectPack(packId) {
  if (!PACKS[packId]) return;
  currentPack = packId;
  const pack = PACKS[packId];

  // Update pack cards styling
  ['solo', 'duo', 'maison'].forEach(id => {
    const card = document.getElementById(`pack-${id}`);
    const btn = document.getElementById(`btn-${id}`);
    const radio = document.getElementById(`radio-${id}`);
    
    if (card) card.classList.remove('active-pack');
    if (radio) radio.classList.remove('active-radio');
    if (btn) {
      btn.className = 'btn btn-outline btn-block';
      btn.innerText = 'Sélectionner';
    }
  });

  const activeCard = document.getElementById(`pack-${packId}`);
  const activeBtn = document.getElementById(`btn-${packId}`);
  const activeRadio = document.getElementById(`radio-${packId}`);
  const radioInput = document.querySelector(`input[name="packChoice"][value="${packId}"]`);

  if (activeCard) activeCard.classList.add('active-pack');
  if (activeRadio) activeRadio.classList.add('active-radio');
  if (radioInput) radioInput.checked = true;

  if (activeBtn) {
    activeBtn.className = 'btn btn-gold btn-block';
    activeBtn.innerText = `Sélectionné (${pack.price} DH)`;
  }

  // Update Form Summary
  document.getElementById('summaryPack').innerText = pack.name;
  document.getElementById('summaryTotal').innerText = `${pack.price} DH`;
}

function playVideo() {
  const vid = document.getElementById('productVideo');
  const hint = document.getElementById('videoHint');
  if (vid) {
    vid.muted = false;
    vid.play();
    if (hint) hint.style.display = 'none';
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const fullName = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const city = document.getElementById('city').value;
  const address = document.getElementById('address').value.trim();
  const pack = PACKS[currentPack];

  if (!fullName || !phone || !city || !address) {
    alert('Veuillez remplir tous les champs obligatoires.');
    return;
  }

  // Populate Modal
  document.getElementById('mName').innerText = fullName;
  document.getElementById('mPack').innerText = pack.name;
  document.getElementById('mTotal').innerText = pack.price + ' DH';
  document.getElementById('mCity').innerText = city;
  document.getElementById('mPhone').innerText = phone;

  // WhatsApp Link
  const waNumber = '212600000000'; // Replace with your phone number
  const waMsg = encodeURIComponent(
    `Bonjour DECO ELEGANCE,\n` +
    `Je confirme ma commande :\n` +
    `- Pack : ${pack.name}\n` +
    `- Total : ${pack.price} DH (Paiement à la livraison)\n` +
    `- Nom : ${fullName}\n` +
    `- Tél : ${phone}\n` +
    `- Ville : ${city}\n` +
    `- Adresse : ${address}`
  );

  document.getElementById('waBtn').href = `https://wa.me/${waNumber}?text=${waMsg}`;
  document.getElementById('modal').classList.add('active');
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.getElementById('codForm').reset();
  selectPack('duo');
}
