(() => {
 const sections = {
  naming:{title:'Üst branda & isim hakkı',short:'Branda & isim hakkı',label:'Sahnenin imzası',package:'Altın sponsor',area:'Sahne brandası ve isim hakkı',description:'Festivalin buluşma noktasına markanızın adını verin. Sahne üstü branda, festival kimliğiyle markanızı aynı çerçevede buluşturur.',features:['Konser sahnesine isim verme hakkı','Sahne üstü branda giydirme','Sahne iletişiminde marka görünürlüğü'],color:'#9e59e8'},
  led:{title:'Ana LED ekran',short:'Ana LED ekran',label:'Büyük ekranda büyük etki',package:'Özel iş birliği',area:'Ana sahne LED ekranı',description:'Konser aralarında videolarınız, görselleriniz ve kampanya mesajlarınız sahnenin büyük ekranında yer alsın.',features:['Markaya özel video ve animasyon','Konser arası görsel gösterimler','İçerik ve yayın akışının birlikte planlanması'],color:'#f163b4'},
  wings:{title:'Yan marka panoları',short:'Yan panolar',label:'Sahnenin iki yanında',package:'Özel iş birliği',area:'Sahne yan marka panoları',description:'Sahnenin iki yanındaki panolarda markanızı görünür kılın. Logo ve kampanya görselleriniz konser boyunca sahneyle birlikte kadrajda kalsın.',features:['Sağ ve sol marka yüzeyleri','Logo ve kampanya görseli kullanımı','Sahne tasarımıyla bütünleşen uygulama'],color:'#46a9cf'}

 };
 const hotspotAttrs=(id,label)=>`class="stage-zone" data-stage-zone="${id}" tabindex="0" role="button" aria-label="${label}" aria-pressed="${id==='naming'}"`;
 const html=`<section id="sahne-sponsorlugu" class="stage-sponsors section"><div class="wrap"><div class="section-heading"><div><span class="section-label">Sahne sponsorluğu</span><h2>Sahneye adını yaz.<br>Herkes görsün.</h2></div><p>Sahnenin üzerindeki bir yüzeyi seç.<br>Markanın nerede, nasıl görüneceğini keşfet.</p></div>
 <div class="stage-explorer"><div class="stage-bar"><span><b>TEDÜ Fest</b> / Çim Alan · A–B–K</span><span>Üzerine gel veya tıkla</span></div><div class="stage-frame" id="stage-frame">
 <svg class="stage-elevation" viewBox="0 0 1200 690" xmlns="http://www.w3.org/2000/svg" aria-label="TEDÜ çim alan sahnesinin üçgen çatılı, metal taşıyıcılı iki boyutlu çizimi; branda, LED ekran ve yan panoları seçebilirsiniz">
 <defs>
 <linearGradient id="sky" x2="0" y2="1"><stop stop-color="#eef3f6"/><stop offset="1" stop-color="#fffdf8"/></linearGradient>
 <linearGradient id="canopy" x2="0" y2="1"><stop stop-color="#565f65"/><stop offset="1" stop-color="#20282d"/></linearGradient>
 <linearGradient id="metal"><stop stop-color="#717e83"/><stop offset=".3" stop-color="#e4ebed"/><stop offset=".5" stop-color="#9ca9af"/><stop offset=".8" stop-color="#e8eff0"/><stop offset="1" stop-color="#68767d"/></linearGradient>
 <linearGradient id="led" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#361a7a"/><stop offset=".55" stop-color="#8244c8"/><stop offset="1" stop-color="#f79863"/></linearGradient>
 <linearGradient id="beam" x2="0" y2="1"><stop stop-color="#f4b8ff" stop-opacity=".32"/><stop offset="1" stop-color="#f4b8ff" stop-opacity="0"/></linearGradient>
 <pattern id="led-dots" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".7" fill="#fff" opacity=".17"/></pattern>
 <pattern id="speaker-mesh" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".65" fill="#899499" opacity=".34"/></pattern>
 <g id="tower"><path d="M0 0V348M26 0V348" stroke="url(#metal)" stroke-width="7"/><g stroke="#a4b0b5" stroke-width="2.5" fill="none">${Array.from({length:9},(_,i)=>`<path d="M0 ${i*38}l26 38m-26 0 26-38"/>`).join('')}</g><rect x="-9" y="344" width="44" height="8" rx="1" fill="#69747a"/></g>
 <g id="array">${Array.from({length:6},(_,i)=>`<g transform="translate(${i>3?(i-3)*-2:0} ${i*22}) rotate(${i>3?(i-3)*3:0})"><rect width="45" height="20" rx="2" fill="#151d23" stroke="#475257"/><rect x="3" y="3" width="39" height="14" fill="url(#speaker-mesh)"/><path d="M6 17H37" stroke="#3d464c"/></g>`).join('')}</g>
 </defs>
 <rect width="1200" height="690" fill="url(#sky)"/>
 <g fill="none" stroke="#c8d6d1" stroke-width="2" opacity=".5"><path d="M28 577V286H158V577M1050 577V250H1185V577M33 332H153M33 402H153M33 472H153M1090 250V577M1143 250V577M1050 310H1185M1050 390H1185M1050 470H1185"/><path d="M77 286V577M115 286V577"/></g>
 <path d="M0 600Q300 578 600 601T1200 594V690H0Z" fill="#e3ebd6"/><ellipse cx="600" cy="626" rx="457" ry="26" fill="#67755a" opacity=".16"/>
 <g stroke="#91a57c" opacity=".28"><path d="M80 623l-4-13m4 13 7-10M1040 647l-4-13m4 13 7-10M159 654l-4-13m4 13 7-10M1010 626l-4-13m4 13 7-10"/></g>
 <path d="M240 245H960V584H240Z" fill="#202a30"/>
 <path d="M270 245H930V583H270Z" fill="#111c23"/>
 <path d="M260 252V580M278 252V580M910 252V580M930 252V580" stroke="#4c5457" stroke-width="2"/>
 <use href="#tower" x="242" y="237"/><use href="#tower" x="932" y="237"/>
 <g ${hotspotAttrs('naming','Üçgen çatı brandası ve isim hakkı alanını seç')}>
 <path class="zone-face" d="M207 231 600 67 993 231Z" fill="url(#canopy)" stroke="#77858c" stroke-width="2"/>
 <path d="M221 226 600 80 979 226M300 218 600 80 900 218M440 219 600 80 760 219" fill="none" stroke="#a6b0b2" stroke-width="1" opacity=".25"/>
 <text x="600" y="172" text-anchor="middle" fill="#fff5dc" font-family="Barlow Condensed,Arial,sans-serif" font-size="33" font-weight="800" letter-spacing="7">TEDÜ FEST</text>
 <text x="600" y="204" text-anchor="middle" fill="#e4dceb" font-family="Manrope,Arial,sans-serif" font-size="11" font-weight="700" letter-spacing="3">MARKANIN ADIYLA, AYNI SAHNEDE.</text><circle class="stage-pin" cx="783" cy="188" r="7" fill="#b585ef"/>
 </g>
 <g fill="none" stroke="url(#metal)" stroke-linejoin="round"><path d="M207 231 600 67 993 231M235 239 600 96 965 239M236 233H965M236 257H965" stroke-width="6"/>${Array.from({length:16},(_,i)=>`<path d="M${240+i*45} 234l45 23m-45 0 45-23" stroke-width="2"/>`).join('')}<path d="M281 202l23 12 18-30 26 11 22-31 25 11 24-31 25 11 25-30 24 12 26-32 24 12 25-32M919 202l-23 12-18-30-26 11-22-31-25 11-24-31-25 11-25-30-24 12-26-32-24 12-25-32" stroke-width="2"/></g>
 <g ${hotspotAttrs('led','Ana LED ekran alanını seç')}><rect class="zone-face" x="332" y="276" width="536" height="285" rx="2" fill="url(#led)" stroke="#8c7bba" stroke-width="2"/><rect x="332" y="276" width="536" height="285" fill="url(#led-dots)"/>
 <g fill="none" stroke="#ffd0ec" stroke-width="2" opacity=".2">${[95,125,155,185].map(r=>`<ellipse cx="600" cy="413" rx="${r*1.4}" ry="${r}"/>`).join('')}</g><image href="assets/logos/tedu-fest-color.svg" x="450" y="280" width="300" height="230"/><circle class="stage-pin" cx="844" cy="294" r="7" fill="#ff9dcc"/></g>
 <g pointer-events="none">${[368,465,560,655,750,840].map((x,i)=>`<path d="M${x} 270 ${x-80} 575 ${x+65} 575Z" fill="url(#beam)"/><g transform="translate(${x} 262)"><path d="M-12-5v10h24v-10" fill="none" stroke="#899297" stroke-width="3"/><rect x="-8" y="-2" width="16" height="16" rx="4" fill="#1c2028"/><ellipse cy="12" rx="6" ry="3" fill="${i%2?'#ffcc7f':'#d4b7ff'}"/></g>`).join('')}</g>
 <path d="M285 239v24M915 239v24" stroke="#31393f" stroke-width="4"/><use href="#array" x="284" y="260"/><use href="#array" x="872" y="260"/>
 <g ${hotspotAttrs('wings','Sol yan marka panosu alanını seç')}><path class="zone-face" d="M147 306H227V530H147Z" fill="#e9e3f1" stroke="#b7a6c9" stroke-width="2"/><path d="M154 313H220V523H154Z" fill="none" stroke="#cfc2de"/><text x="187" y="413" text-anchor="middle" fill="#755990" font-family="Manrope,Arial,sans-serif" font-size="15" font-weight="800">LOGO</text><text x="187" y="439" text-anchor="middle" fill="#897396" font-family="Manrope,Arial,sans-serif" font-size="8" letter-spacing="1">YAN PANO</text><circle class="stage-pin" cx="214" cy="320" r="6" fill="#65b6d1"/></g>
 <g ${hotspotAttrs('wings','Sağ yan marka panosu alanını seç')}><path class="zone-face" d="M973 306H1053V530H973Z" fill="#e9e3f1" stroke="#b7a6c9" stroke-width="2"/><path d="M980 313H1046V523H980Z" fill="none" stroke="#cfc2de"/><text x="1013" y="413" text-anchor="middle" fill="#755990" font-family="Manrope,Arial,sans-serif" font-size="15" font-weight="800">LOGO</text><text x="1013" y="439" text-anchor="middle" fill="#897396" font-family="Manrope,Arial,sans-serif" font-size="8" letter-spacing="1">YAN PANO</text><circle class="stage-pin" cx="1040" cy="320" r="6" fill="#65b6d1"/></g>
 <g stroke="#919c9f" stroke-width="3"><path d="M187 530V591M1013 530V591"/></g>
 <path d="M240 563H960L992 590H208Z" fill="#4d565b"/><path d="M208 590H992V625H208Z" fill="#232a30"/><path d="M208 590H992" stroke="#92999d" stroke-width="4"/>
 <g pointer-events="none">
 <path d="M528 554H668L684 567H512Z" fill="#252b32"/><path d="M512 567H684V579H512Z" fill="#131d24"/>
 <g stroke="#bec5c7" stroke-width="2" fill="none"><path d="M544 489V555l-10 8m10-8 12 8M660 485V555l-12 8m12-8 11 8M579 499V544M620 499V544"/></g>
 <ellipse cx="544" cy="487" rx="23" ry="4" fill="#ceac6d"/><ellipse cx="660" cy="483" rx="24" ry="4" fill="#ceac6d"/>
 <g fill="#934845" stroke="#c3c6c7" stroke-width="2"><circle cx="600" cy="538" r="27"/><rect x="565" y="500" width="29" height="23" rx="3"/><rect x="608" y="500" width="29" height="23" rx="3"/></g><circle cx="600" cy="538" r="22" fill="#202632"/><circle cx="610" cy="549" r="5" fill="#101821"/>
 <g stroke="#b4bdc1" fill="none" stroke-width="2"><path d="M432 486V578m0-7-15 9m15-9 16 9M730 480V578m0-7-15 9m15-9 16 9M432 486l24-13M730 480l-26-10"/></g><path d="M454 473l10-5M706 471l-11-5" stroke="#171e24" stroke-width="5" stroke-linecap="round"/>
 ${[330,455,710,831].map(x=>`<path d="M${x} 568h48l10 18h-64Z" fill="#1a232a" stroke="#657078"/><path d="M${x} 569h48l-2 10h-49Z" fill="url(#speaker-mesh)"/>`).join('')}
 <path d="M460 580q15 8 38 2t24 2M720 580q-30 8-46 2t-18 3" fill="none" stroke="#171d24" stroke-width="2"/>
 </g>
 <text x="600" y="667" text-anchor="middle" fill="#75816e" font-family="Manrope,Arial,sans-serif" font-size="11" letter-spacing="3">ÇİM ALAN · A / B / K BLOKLARI</text>
 </svg>
 <div id="stage-popover" class="stage-popover" hidden><div><span id="stage-popover-label"></span><button type="button" aria-label="Sahne açıklamasını kapat" id="stage-close">×</button></div><h3 id="stage-popover-title"></h3><p id="stage-popover-description"></p><a href="mailto:sca@tedu.edu.tr" class="stage-popover-cta">Bu yüzey için görüşelim</a></div>
 </div><div class="stage-zone-tabs" role="group" aria-label="Sahne üzerindeki sponsorluk alanları">${Object.entries(sections).map(([id,s])=>`<button type="button" data-stage-select="${id}" aria-pressed="${id==='naming'}"><i style="background:${s.color}"></i>${s.short}</button>`).join('')}</div>
 <div class="stage-selection" aria-live="polite"><div class="stage-selection-copy"><span id="stage-detail-label"></span><h3 id="stage-detail-title"></h3><p id="stage-detail-description"></p><ul id="stage-detail-features"></ul></div><div class="stage-selection-action"><span>İlgili sponsorluk</span><strong id="stage-detail-package"></strong><a id="stage-contact" href="mailto:sca@tedu.edu.tr" class="button">Sahne için teklif iste</a></div></div></div>
 </div></section>`;
 document.querySelector('#content').insertAdjacentHTML('beforeend',html);
 let pinned=false;
 const frame=document.querySelector('#stage-frame'),popover=document.querySelector('#stage-popover');
 const setText=(id,text)=>document.getElementById(id).textContent=text;
 function select(id,showPopover=false){const s=sections[id];
  document.querySelectorAll('[data-stage-zone],[data-stage-select]').forEach(el=>{el.setAttribute('aria-pressed',String((el.dataset.stageZone||el.dataset.stageSelect)===id));});
  setText('stage-detail-label',s.label);setText('stage-detail-title',s.title);setText('stage-detail-description',s.description);setText('stage-detail-package',s.package);
  document.querySelector('#stage-detail-features').innerHTML=s.features.map(x=>`<li>${x}</li>`).join('');
  setText('stage-popover-label',s.label);setText('stage-popover-title',s.title);setText('stage-popover-description',s.description);
  popover.dataset.position=id==='wings'?'center':'right';popover.hidden=!showPopover;
 }
 document.querySelectorAll('[data-stage-zone]').forEach(el=>{
  el.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&!pinned)select(el.dataset.stageZone,true)});
  el.addEventListener('focus',()=>{if(!pinned)select(el.dataset.stageZone,true)});
  el.addEventListener('click',()=>{pinned=true;select(el.dataset.stageZone,true)});
  el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pinned=true;select(el.dataset.stageZone,true)}else if(e.key==='Escape'){pinned=false;popover.hidden=true;}});
 });
 document.querySelectorAll('[data-stage-select]').forEach(el=>el.addEventListener('click',()=>{pinned=false;select(el.dataset.stageSelect,false)}));
 frame.addEventListener('pointerleave',()=>{if(!pinned)popover.hidden=true});
 document.querySelector('#stage-close').addEventListener('click',()=>{pinned=false;popover.hidden=true});
 document.querySelector('#sahne-sponsorlugu').addEventListener('keydown',e=>{if(e.key==='Escape'){pinned=false;popover.hidden=true;}});
 select('naming');
})();
