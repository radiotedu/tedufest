(() => {
  const concerts = window.TEDUFEST_CONCERTS;
  const years = [...new Set(concerts.map(concert => concert.date.slice(0, 4)))];
  const formatDate = value => new Intl.DateTimeFormat('tr-TR', {day:'numeric', month:'long', year:'numeric', timeZone:'UTC'}).format(new Date(`${value}T12:00:00Z`));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let stripPaused = reducedMotion.matches;
  const row = p => `<li><time datetime="${p.date}">${formatDate(p.date)}</time><div><h5>${p.name}</h5><p>${p.event}${p.time ? ` · ${p.time}` : ''}</p></div><a href="${p.source}" target="_blank" rel="noopener" aria-label="${p.name}, ${formatDate(p.date)} etkinlik kaydını aç">${p.kind === 'event' ? 'Etkinlik' : 'Kayıt'} ↗</a></li>`;
  const card = p => {
    const caption = p.imageCaption || `${p.name} · ${formatDate(p.date)}${p.time ? ` · ${p.time}` : ''}`;
    const photo = p.mediaType === 'photo';
    return `<article class="poster-card ${photo ? 'photo-card' : ''}"><button class="${photo ? 'archive-photo' : 'poster-image'}" data-image="assets/archive/${p.image}" data-caption="${caption}" aria-label="${p.name} ${photo ? 'fotoğrafını' : 'konser afişini'} büyüt">${photo ? `<span class="photo-card-top"><b>${p.date.slice(0,4)}</b><span>${p.photoLabel}</span></span>` : ''}<img src="assets/archive/${p.image}" loading="lazy" alt="${caption}">${photo ? `<strong>${p.name}</strong>` : ''}<span class="media-expand" aria-hidden="true">↗</span></button><div class="poster-meta"><time datetime="${p.date}">${formatDate(p.date)}${p.time ? ` · ${p.time}` : ''}</time><h3>${p.name}</h3><p>${p.event}</p>${p.photoCredit ? `<p class="photo-credit"><a href="${p.photoSource}" target="_blank" rel="noopener">${p.photoCredit}</a>${p.license ? ` · <a href="${p.license}" target="_blank" rel="noopener">CC BY-SA 4.0</a>` : ''}</p>` : ''}</div></article>`;
  };
  document.querySelector('#program').insertAdjacentHTML('afterend', `<section class="archive section" id="arsiv"><div class="wrap"><div class="section-heading"><div><span class="section-label">Afişler, sahneler, unutulmayan geceler.</span><h2>Birlikte söyledik.<br>Birlikte hatırlıyoruz.</h2></div><p>Yalın’dan Pamela’ya, mor ve ötesi’nden<br>Yüzyüzeyken Konuşuruz’a. Aynı heyecan, yıllar boyu.</p></div><div class="archive-controls"><div class="archive-years" role="group" aria-label="Arşiv yılını seç"><button type="button" data-year="all" aria-pressed="true" aria-controls="archive-results">Tüm yıllar</button>${years.map(year => `<button type="button" data-year="${year}" aria-pressed="false" aria-controls="archive-results">${year}</button>`).join('')}</div><p class="archive-count" role="status" aria-live="polite"></p></div><div id="archive-results"></div></div></section>`);
  const renderArchive = year => {
    const selected = concerts.filter(concert => year === 'all' || concert.date.startsWith(year));
    const featured = selected.filter(p => p.image && p.kind !== 'event').sort((a,b) => (a.featuredOrder || 99) - (b.featuredOrder || 99));
    const performances = selected.filter(p => !p.image && p.kind !== 'event');
    const events = selected.filter(p => p.kind === 'event');
    const strip = performances.map(p => `<span class="performance-name"><b>${p.name}</b><span>${formatDate(p.date)}</span><i aria-hidden="true">✳</i></span>`).join('');
    document.querySelector('.archive-count').textContent = `${year === 'all' ? '2013–2026' : year} · ${featured.length ? `${featured.length} sanatçı kartı · ` : ''}Konser ve etkinlik arşivi`;
    document.querySelector('#archive-results').innerHTML = `${featured.length ? `<div class="poster-grid">${featured.map(card).join('')}</div>` : ''}${performances.length ? `<div class="performance-strip ${stripPaused ? 'is-paused' : ''}"><div class="strip-heading"><h3>Kampüsün diğer sesleri</h3><button type="button" class="strip-toggle" aria-pressed="${stripPaused}" aria-label="Kayan yazıyı ${stripPaused ? 'oynat' : 'duraklat'}">${stripPaused ? 'Oynat ▶' : 'Duraklat Ⅱ'}</button></div><div class="strip-window" tabindex="0" aria-label="Diğer performanslar; tüm tarihleri aşağıdaki arşivden inceleyebilirsiniz"><div class="strip-track"><div class="strip-copy">${strip}</div><div class="strip-copy" aria-hidden="true">${strip}</div></div></div></div>` : ''}${events.length ? `<div class="campus-event-note"><span>Kampüsten etkinlikler</span>${events.map(p => `<a href="${p.source}" target="_blank" rel="noopener"><strong>${p.name}</strong><time datetime="${p.date}">${formatDate(p.date)}</time><span aria-hidden="true">↗</span></a>`).join('')}</div>` : ''}<details class="complete-archive"><summary><span>${year === 'all' ? 'Tüm yılların arşivi' : `${year} arşivi`}</span><small>${selected.length} kayıt · tarihleriyle keşfet</small></summary><div class="concert-history">${[...new Set(selected.map(p => p.date.slice(0,4)))].map(y => `<div class="concert-year"><h4>${y}</h4><ul>${selected.filter(p => p.date.startsWith(y)).map(row).join('')}</ul></div>`).join('')}</div></details>`;
  };
  renderArchive('all');
  document.querySelector('.archive-years').addEventListener('click', event => {
    const button = event.target.closest('[data-year]');
    if (!button) return;
    document.querySelectorAll('[data-year]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    renderArchive(button.dataset.year);
  });
  document.querySelector('#archive-results').addEventListener('click', event => {
    const button = event.target.closest('.strip-toggle');
    if (!button) return;
    stripPaused = !stripPaused;
    button.closest('.performance-strip').classList.toggle('is-paused',stripPaused);
    button.setAttribute('aria-pressed',String(stripPaused));
    button.setAttribute('aria-label',`Kayan yazıyı ${stripPaused ? 'oynat' : 'duraklat'}`);
    button.textContent = stripPaused ? 'Oynat ▶' : 'Duraklat Ⅱ';
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) {
      stripPaused = true;
      const button = document.querySelector('.strip-toggle');
      document.querySelector('.performance-strip')?.classList.add('is-paused');
      if (button) {button.setAttribute('aria-pressed','true');button.setAttribute('aria-label','Kayan yazıyı oynat');button.textContent='Oynat ▶';}
    }
  });



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
