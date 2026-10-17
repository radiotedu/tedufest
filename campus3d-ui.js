const areas={
 food:{title:'Duvar boyunca lezzet molası',label:'Yeme & içme · İncesu',text:'İncesu çim alanında, sahnenin solundaki duvar boyunca kahve, içecek ve yemek stantları. Ortadaki konser alanı ve sahne çevresi açık kalır.',items:['Duvar boyunca yan yana stantlar','Önlerinde servis ve oturma alanı','Kahve, sokak lezzetleri ve tatlılar'],color:'#f7d417'},
 stand:{title:'Markanla kampüsün içinde',label:'Marka stantları',text:'İncesu çim alanının yürüyüş bandında ürünlerini tanıt, yeni karşılaşmalara alan aç. Festivalin gündüz enerjisine markan da katılsın.',items:['Ürün deneyimi ve tanıtım','Yürüyüş bandında görünürlük','Markaya özel stant uygulaması'],color:'#d42e12'},
 flags:{title:'Festivalin rengini taşı',label:'Bayraklar',text:'İncesu çim alanının giriş ve dolaşım noktalarında yer alan bayraklarla markanı festivalin görsel kimliğine dahil et.',items:['Yürüyüş güzergâhında yerleşim','Markaya özel bayrak tasarımı','Gün boyu görünürlük'],color:'#00237e'},
 societies:{title:'Aksu’da birlikte keşfet',label:'Topluluklar · Aksu',text:'Aksu bloklarının iç avlusunda topluluklar, atölyeler ve birlikte üretilen deneyimler. Gurmefest ve Tasarım Pazarı ile aynı avluda buluşuyoruz.',items:['Topluluk buluşmaları','Atölyeler ve kampüs etkinlikleri','Birlikte keşif ve paylaşım'],color:'#00a49c'},
 gurmefest:{title:'Gurmefest’te lezzet keşfi',label:'Gurmefest · Aksu',text:'Aksu avlusunda yeni tatlar, sokak lezzetleri ve keyifli molalar. Gurmefest stantlarını keşfet, festivalin lezzet duraklarında buluş.',items:['Yiyecek ve içecek stantları','Tadım ve lezzet deneyimleri','Avluda buluşma ve mola alanı'],color:'#d42e12'},
 design:{title:'Tasarım Pazarı’nda yeni keşifler',label:'Tasarım Pazarı · Aksu',text:'Aksu avlusunda tasarımcılar ve özgün işler bir arada. Tasarım Pazarı’nda üreticilerle tanış, el emeği ürünleri ve yaratıcı fikirleri keşfet.',items:['Tasarımcı ve üretici stantları','El emeği ve özgün ürünler','Yaratıcı karşılaşmalar'],color:'#00237e'}
};
document.querySelector('#sahne-sponsorlugu').insertAdjacentHTML('beforebegin',`
<section id="alan" class="campus3d section" aria-labelledby="campus-map-title"><div class="wrap">
 <div class="section-heading"><div><span class="section-label">İki kampüs. Tek harita.</span><h2 id="campus-map-title">Kampüsün içinde.<br>Festivalin tam ortasında.</h2></div><p>İncesu’da müzik, Aksu’da lezzet ve tasarım.<br>Haritayı döndür, kampüse odaklan, alanını keşfet.</p></div>
 <div id="festival-world" class="festival-world">
  <div class="world-topbar"><div><b>TEDÜ kampüsü</b><span>İncesu & Aksu</span></div><div class="view-controls" role="group" aria-label="Harita bakış açısı"><button type="button" data-camera="campus" aria-pressed="true">İki kampüs</button><button type="button" data-camera="incesu" aria-pressed="false">İncesu</button><button type="button" data-camera="aksu" aria-pressed="false">Aksu</button><button type="button" data-camera="aerial" aria-pressed="false">Üstten</button><button type="button" data-camera="food" aria-pressed="false">Yemek alanı</button></div></div>
  <div class="world-layout"><div class="world-viewport"><div id="world-canvas"></div><div id="world-hotspots" class="world-hotspots"></div><div id="world-loading" role="status"><span></span>Festival alanı açılıyor…</div><div id="world-fallback" hidden><p>3D harita bu cihazda görüntülenemiyor. Festival alanlarını aşağıdaki düğmelerden keşfedebilir veya <a href="https://www.tedu.edu.tr/yer-yon-bulma-ve-surdurulebilirlik-haritalari" target="_blank" rel="noopener">resmî kampüs krokisine bakabilirsin ↗</a>.</p></div><div id="world-hint" class="world-hint">Sürükle ve döndür · Bir alana dokun</div><div class="world-tools" role="group" aria-label="3D görüntü kontrolleri"><button type="button" id="world-zoom-in" aria-label="Haritayı yakınlaştır">+</button><button type="button" id="world-zoom-out" aria-label="Haritayı uzaklaştır">−</button><button type="button" id="world-motion" aria-label="Sahne hareketini duraklat" aria-pressed="false">Ⅱ</button><button type="button" id="world-reset" aria-label="İki kampüs görünümüne dön">↺</button></div></div>
   <aside class="world-detail" aria-live="polite"><span id="world-detail-label"></span><h3 id="world-detail-title"></h3><p id="world-detail-text"></p><ul id="world-detail-list"></ul><a href="mailto:sca@tedu.edu.tr" class="button">Bu alanda yer al</a><a href="#sahne-sponsorlugu" class="world-stage-link">Sahne sponsorluğunu keşfet ↗</a></aside>
  </div>
  <div class="world-zones" role="group" aria-label="Festival alanı seç">${Object.entries(areas).map(([id,a])=>`<button type="button" data-map-zone="${id}" aria-pressed="${id==='food'}"><i style="background:${a.color}"></i>${a.label}</button>`).join('')}</div>
 </div>
 <p class="world-map-note">Alan yerleşimleri öneridir; kesin konumlar organizasyonla netleştirilir. <a href="https://www.tedu.edu.tr/yer-yon-bulma-ve-surdurulebilirlik-haritalari" target="_blank" rel="noopener">TEDÜ ulaşım ve kampüs krokisi ↗</a></p>
</div></section>`);
function selectArea(key,focus=false){
 const area=areas[key];if(!area)return;
 document.querySelector('#world-detail-label').textContent=area.label;
 document.querySelector('#world-detail-title').textContent=area.title;
 document.querySelector('#world-detail-text').textContent=area.text;
 document.querySelector('#world-detail-list').innerHTML=area.items.map(t=>`<li>${t}</li>`).join('');
document.querySelectorAll('[data-map-zone]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mapZone===key)));
 document.dispatchEvent(new CustomEvent('festival-zone-selected',{detail:{key,focus}}));
}
document.querySelectorAll('[data-map-zone]').forEach(b=>b.addEventListener('click',()=>selectArea(b.dataset.mapZone,true)));
document.addEventListener('festival-scene-pick',e=>selectArea(e.detail.key,e.detail.focus!==false));
// Keep old campus links and direct area links pointing at the single 3D map.
function followMapLink(){
 const hash=location.hash;
 const zone={'#aksu-etkinlikleri':'societies','#gurmefest':'gurmefest','#tasarim-pazari':'design'}[hash];
 if(zone)selectArea(zone,true);
 const camera={'#kampus':'campus','#incesu':'incesu','#aksu':'aksu'}[hash];
 if(camera)document.dispatchEvent(new CustomEvent('festival-camera-requested',{detail:{name:camera}}));
 if(zone||camera||hash==='#alan')document.querySelector('#alan').scrollIntoView({block:'start'});
}
window.addEventListener('hashchange',followMapLink);
document.addEventListener('festival-scene-ready',followMapLink);
selectArea('food');
followMapLink();
