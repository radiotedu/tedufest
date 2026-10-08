(() => {
  const posters = [
    {image:'dktt-2025.jpeg', name:'Dolu Kadehi Ters Tut', date:'22 Mayıs 2025', label:'Bir ağızdan, aynı şarkı.'},
    {image:'dktt-poster.jpeg', name:'Arem & Arman', date:'22 Mayıs 2025', label:'Gecenin ritmi yükselir.'},
    {image:'ikilem-2024.jpg', name:'İkilem', date:'24 Mayıs 2024', label:'Hâlâ dilimizde.'}
  ];
  document.querySelector('#program').insertAdjacentHTML('afterend', `<section class="archive section" id="arsiv"><div class="wrap"><div class="section-heading"><div><span class="section-label">Afişler kalır. Şarkılar da.</span><h2>Birlikte söyledik.<br>Birlikte hatırlıyoruz.</h2></div><p>Geçmiş festivallerden, duvarımızda<br>saklamak istediğimiz birkaç anı.</p></div><div class="poster-grid">${posters.map(p=>`<article class="poster-card"><button class="poster-image" data-image="assets/archive/${p.image}" data-caption="${p.name} · ${p.date}" aria-label="${p.name} konser afişini büyüt"><img src="assets/archive/${p.image}" loading="lazy" alt="${p.name} TEDÜ Spring Fest konser afişi, ${p.date}"><span aria-hidden="true">↗</span></button><div class="poster-meta"><span>${p.date}</span><h3>${p.name}</h3><p>${p.label}</p></div></article>`).join('')}</div></div></section>`);

  document.querySelector('#content').insertAdjacentHTML('beforeend', `<section class="campus section" id="kampus"><div class="wrap"><div class="section-heading"><div><span class="section-label">İki yaka. Tek festival.</span><h2>Buluşma noktamız:<br>kampüsün tamamı.</h2></div><p>Çim alanda müzik, karşı kampüste yeni keşifler.<br>TEDÜ’nün her köşesinde başka bir karşılaşma.</p></div><div class="campus-layout"><div class="campus-map"><div class="map-topline"><span>TED ÜNİVERSİTESİ · KOLEJ / ANKARA</span><button data-image="assets/archive/campus-map.png" data-caption="TED Üniversitesi kampüs haritası" aria-label="Kampüs haritasını büyüt">Haritayı büyüt ↗</button></div><svg viewBox="0 120 1200 435" role="img" aria-label="TED Üniversitesi kampüs haritası: Ziya Gökalp Caddesi'nin iki tarafında İncesu ve Aksu blokları"><image href="assets/archive/campus-map.png" width="1200" height="1028"/><g class="map-spot"><circle cx="947" cy="217" r="27"/><text x="947" y="226">1</text></g><g class="map-spot second"><circle cx="440" cy="422" r="27"/><text x="440" y="431">2</text></g></svg></div><div class="campus-places"><article><span class="place-number">01</span><div><span class="place-kicker">İNCESU · A / B / K BLOKLARI</span><h3>Çim Alan & Ana Sahne</h3><p>Konserin başladığı, aynı şarkıya eşlik ettiğimiz yer. Ana sahne, A–B–K bloklarının arasındaki çim alanda.</p><a href="#sahne-sponsorlugu" class="text-link">Sahneyi keşfet ↗</a></div></article><article><span class="place-number">02</span><div><span class="place-kicker">AKSU · KARŞI KAMPÜS</span><h3>Topluluklar & Etkinlikler</h3><p>Ziya Gökalp Caddesi’nin karşı tarafında topluluk buluşmaları, atölyeler ve kampüsün gündüz enerjisi.</p><a href="#program" class="text-link">2025’ten anlara dön ↗</a></div></article></div></div></div></section>`);

  const dialog = document.createElement('dialog');
  dialog.className = 'image-dialog';
  dialog.setAttribute('aria-label', 'Arşiv görseli');
  dialog.innerHTML = '<form method="dialog"><button aria-label="Görseli kapat">×</button></form><img alt=""><p></p>';
  document.body.append(dialog);
  document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
    const image = dialog.querySelector('img');
    image.src = button.dataset.image;
    image.alt = button.dataset.caption;
    dialog.querySelector('p').textContent = button.dataset.caption;
    dialog.showModal();
  }));
  dialog.addEventListener('click', event => {if (event.target === dialog) dialog.close();});

  const video = document.querySelector('#festival-video');
  const toggle = document.querySelector('#film-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = reduced.matches;
  const updateButton = () => {
    toggle.textContent = video.paused ? '▶' : 'Ⅱ';
    toggle.setAttribute('aria-label', video.paused ? 'Festival videosunu oynat' : 'Festival videosunu duraklat');
  };
  const play = () => video.play().catch(updateButton);
  toggle.addEventListener('click', () => {
    userPaused = !video.paused;
    if (video.paused) play(); else video.pause();
  });
  video.addEventListener('playing', () => {video.classList.add('ready'); updateButton();});
  video.addEventListener('pause', updateButton);
  video.addEventListener('error', () => {video.classList.remove('ready'); toggle.hidden = true;});
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !userPaused && !document.hidden) play();
    else video.pause();
  }, {threshold:.1}).observe(video);
  document.addEventListener('visibilitychange', () => {if(document.hidden) video.pause();});
  reduced.addEventListener('change', event => {if (event.matches) {userPaused = true; video.pause();}});
})();
