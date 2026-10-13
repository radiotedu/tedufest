(() => {
  const concerts = window.TEDUFEST_CONCERTS;
  const years = [...new Set(concerts.map(concert => concert.date.slice(0, 4)))];
  const formatDate = value => new Intl.DateTimeFormat('tr-TR', {day:'numeric', month:'long', year:'numeric', timeZone:'UTC'}).format(new Date(`${value}T12:00:00Z`));
  document.querySelector('#program').insertAdjacentHTML('afterend', `<section class="archive section" id="arsiv"><div class="wrap"><div class="section-heading"><div><span class="section-label">Afişler kalır. Şarkılar da.</span><h2>Birlikte söyledik.<br>Birlikte hatırlıyoruz.</h2></div><p>2013’ten 2026’ya konser anıları.<br>Bahar şenlikleri, açılış geceleri ve kampüsün sesleri.</p></div><div class="archive-controls"><div class="archive-years" role="group" aria-label="Konser yılını seç"><button type="button" data-year="all" aria-pressed="true" aria-controls="archive-results">Tüm yıllar</button>${years.map(year => `<button type="button" data-year="${year}" aria-pressed="false" aria-controls="archive-results">${year}</button>`).join('')}</div><p class="archive-count" role="status" aria-live="polite"></p></div><div id="archive-results"></div></div></section>`);
  const renderArchive = year => {
    const selected = concerts.filter(concert => year === 'all' || concert.date.startsWith(year));
    const posters = selected.filter(concert => concert.image);
    const performances = selected.filter(concert => !concert.image);
    document.querySelector('.archive-count').textContent = `${year === 'all' ? '2013–2026' : year} · ${selected.length} konser kaydı`;
    document.querySelector('#archive-results').innerHTML = `${posters.length ? `<div class="poster-grid">${posters.map(p => `<article class="poster-card"><button class="poster-image" data-image="assets/archive/${p.image}" data-caption="${p.name} · ${formatDate(p.date)}${p.time ? ` · ${p.time}` : ''}" aria-label="${p.name} konser afişini büyüt"><img src="assets/archive/${p.image}" loading="lazy" alt="${p.name} konser afişi, ${formatDate(p.date)}"><span aria-hidden="true">↗</span></button><div class="poster-meta"><time datetime="${p.date}">${formatDate(p.date)}${p.time ? ` · ${p.time}` : ''}</time><h3>${p.name}</h3><p>${p.event}</p></div></article>`).join('')}</div>` : ''}${performances.length ? `<div class="concert-history"><h3>Arşivden diğer sahneler</h3>${[...new Set(performances.map(p => p.date.slice(0,4)))].map(y => `<div class="concert-year"><h4>${y}</h4><ul>${performances.filter(p => p.date.startsWith(y)).map(p => `<li><time datetime="${p.date}">${formatDate(p.date)}</time><div><h5>${p.name}</h5><p>${p.event}${p.time ? ` · ${p.time}` : ''}</p></div><a href="${p.source}" target="_blank" rel="noopener" aria-label="${p.name}, ${formatDate(p.date)} etkinlik kaydını aç">Etkinlik ↗</a></li>`).join('')}</ul></div>`).join('')}</div>` : ''}`;
  };
  renderArchive('all');
  document.querySelector('.archive-years').addEventListener('click', event => {
    const button = event.target.closest('[data-year]');
    if (!button) return;
    document.querySelectorAll('[data-year]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    renderArchive(button.dataset.year);
  });

  document.querySelector('#content').insertAdjacentHTML('beforeend', `<section class="campus section" id="kampus"><div class="wrap"><div class="section-heading"><div><span class="section-label">İki yaka. Tek festival.</span><h2>Buluşma noktamız:<br>kampüsün tamamı.</h2></div><p>Çim alanda müzik, karşı kampüste yeni keşifler.<br>TEDÜ’nün her köşesinde başka bir karşılaşma.</p></div><div class="campus-layout"><div class="campus-map"><div class="map-topline"><span>TED ÜNİVERSİTESİ · KOLEJ / ANKARA</span><button data-image="assets/campus-festival.webp" data-caption="TEDUFEST · İki yaka, tek festival" aria-label="Kampüs haritasını büyüt">Haritayı büyüt ↗</button></div><div class="festival-map-art"><button data-image="assets/campus-festival.webp" data-caption="TEDUFEST · İki yaka, tek festival" aria-label="Festival kampüs illüstrasyonunu büyüt"><img src="assets/campus-festival.webp" width="1776" height="888" loading="lazy" alt="TEDÜ festival kampüsü illüstrasyonu: sağda A–B–K çim alanında ana sahne ve duvar boyunca yemek stantları; caddenin karşısındaki Aksu avlusunda topluluk etkinlikleri."></button><a href="#alan" class="festival-map-pin stage-map-pin" aria-label="1 · Çim alan ve ana sahneyi 3D haritada keşfet"><b>1</b><span>Çim alan & sahne</span></a><a href="#aksu-etkinlikleri" class="festival-map-pin societies-map-pin" aria-label="2 · Aksu topluluklar ve etkinlikler"><b>2</b><span>Topluluklar</span></a></div><div class="map-bottomline"><span><i aria-hidden="true"></i>İki yaka. Tek festival.</span><a href="https://www.tedu.edu.tr/yer-yon-bulma-ve-surdurulebilirlik-haritalari" target="_blank" rel="noopener">TEDÜ ulaşım ve kampüs krokisi ↗</a></div></div><div class="campus-places"><article><span class="place-number">01</span><div><span class="place-kicker">İNCESU · A / B / K BLOKLARI</span><h3>Çim Alan & Ana Sahne</h3><p>Konserin başladığı, aynı şarkıya eşlik ettiğimiz yer. Ana sahne, A–B–K bloklarının arasındaki çim alanda.</p><a href="#sahne-sponsorlugu" class="text-link">Sahneyi keşfet ↗</a></div></article><article id="aksu-etkinlikleri"><span class="place-number">02</span><div><span class="place-kicker">AKSU · KARŞI KAMPÜS</span><h3>Topluluklar & Etkinlikler</h3><p>Ziya Gökalp Caddesi’nin karşı tarafında topluluk buluşmaları, atölyeler ve kampüsün gündüz enerjisi.</p><a href="#program" class="text-link">2025’ten anlara dön ↗</a></div></article></div></div></div></section>`);

  const dialog = document.createElement('dialog');
  dialog.className = 'image-dialog';
  dialog.setAttribute('aria-label', 'Arşiv görseli');
  dialog.innerHTML = '<form method="dialog"><button aria-label="Görseli kapat">×</button></form><img alt=""><p></p>';
  document.body.append(dialog);
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-image]');
    if (!button) return;
    const image = dialog.querySelector('img');
    image.src = button.dataset.image;
    image.alt = button.dataset.caption;
    dialog.querySelector('p').textContent = button.dataset.caption;
    dialog.showModal();
  });
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
