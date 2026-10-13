# TEDUFEST

TED Üniversitesi festival ve sponsorluk sitesi.

- Site: https://radiotedu.github.io/tedufest/
- Düz HTML, CSS, JavaScript, etkileşimli SVG ve Three.js. Derleme gerektirmez.
- GitHub Pages, `main` dalının kök dizininden yayınlanır.
- Yerel önizleme: bu dizinde `python -m http.server 4173`.
- Sponsorluk bağlantıları `mailto:sca@tedu.edu.tr` adresini açar; e-posta otomatik gönderilmez.

## İçerik ve görseller

Dört günlük bölüm geçmiş **20–23 Mayıs 2025** festivalini anlatır. Açılış filmi ayrı olarak **2026** festival arşividir. Yeni festival tarihi ilan edilmemektedir.

- Açılış filmi: [TED Üniversitesi ve TEDU SCA, 26 Mayıs 2026](https://www.instagram.com/reel/DYzESdDN9Rk/). Sessiz, web için sıkıştırılmış ilk 55 saniye. Kaynak bağlantısı oynatıcının yanında bulunur.
- İkilem 2024 afişi: [TED Üniversitesi, 13 Mayıs 2024](https://www.instagram.com/p/C66MLKMIvRP/).
- 2025 festival haftası fotoğrafı: [TED Üniversitesi, 21 Mayıs 2025](https://www.instagram.com/p/DJ6kgxMtQ4x/). İlk gün kartında haftanın arşiv fotoğrafı olarak kullanılır.
- DKTT ve Arem & Arman afişleri: [TEDÜ konser duyurusu](https://www.tedu.edu.tr/gundemde-neler-var/bahar-senligi-konser-duyurusu).
- Konser ve sahne referansı: [Dolu Kadehi Ters Tut konseri](https://www.tedu.edu.tr/gundemde-neler-var/bahar-senligi-dolu-kadehi-ters-tut-konseri).
- 21 Mayıs fotoğrafı: [Erdal Beşikçioğlu TED Üniversitesinde](https://www.tedu.edu.tr/gundemde-neler-var/erdal-besikcioglu-ted-universitesinde).
- 23 Mayıs fotoğrafı: [TEDU International Day](https://www.tedu.edu.tr/gundemde-neler-var/tedu-international-day).
- Tarih aralığı: [TEDÜ Bahar Şenliği 2025](https://ds.tedu.edu.tr/gundemde-neler-var/tedu-bahar-senligi).
- Günlük atölyeler: [CTL Ocak–Haziran 2025 faaliyet raporu, s.13](https://ctl.tedu.edu.tr/sites/default/files/docs/CTL-Faaliyet-Raporu-2025-Ocak-Haziran.pdf).
- Kampüs krokisi: [TEDÜ yer-yön bulma haritaları](https://www.tedu.edu.tr/yer-yon-bulma-ve-surdurulebilirlik-haritalari). Ana sahnenin A–B–K çim alanında ve topluluk etkinliklerinin karşı kampüste olması organizatörün verdiği konum bilgisiyle işaretlenmiştir.

Fotoğraf, afiş ve videolar ilgili hak sahiplerine aittir. Sahne SVG’si ve TEDUFEST logosu site için hazırlanmıştır. Sahne, arşivde görülen üçgen çatı, metal makaslar ve asılı ses sistemleri temel alınarak çizilmiştir; teknik uygulama projesi değildir.

## Dosyalar

- `app.js`: festival, 2025 günleri ve sponsorluk paketleri.
- `stage2d.js` / `stage2d.css`: erişilebilir, klavye ile de seçilebilir sahne sponsorluk alanları.
- `festival.js` / `festival.css`: video açılışı, afiş arşivi, büyütülebilen görseller ve kampüs krokisi.
- `assets/archive`: yerel arşiv görselleri ve video; Instagram CDN bağlantılarına çalışma zamanı bağımlılığı yoktur.

## Kampüs ve TEDÜ renkleri

- `campus3d.js`, `campus3d-ui.js`, `campus3d.css`: döndürülebilen kampüs modeli; A–B–K çim alanı, Ziya Gökalp Caddesi ve karşıdaki Aksu blokları. Yeme içme stantları sahnenin iki yanına değil, çim alanın uzun kenarındaki duvar boyunca yerleştirilmiştir. Alan seçimi, yakınlaştırma, dört kamera açısı, hareketi duraklatma ve WebGL bulunmadığında görsel yedek desteklenir.
- `vendor/`: yerel Three.js modülleri ve MIT lisansı.
- `assets/campus-festival.png`: resmî kroki referans alınarak built-in Imagegen ile üretilen festival illüstrasyonu. Web sürümü `assets/campus-festival.webp`; kaynak çözünürlüğü korunarak sıkıştırılmıştır. Görsel teknik bir yer-yön planı değildir; sitede resmî krokiye ayrı bağlantı vardır.
- Üretim istemleri: `assets/campus-illustration-prompt.txt` ve `assets/campus-illustration-correction.txt`.
- `tedu-theme.css`: [TEDÜ Kurumsal Kimlik Kılavuzu](https://www.tedu.edu.tr/sites/default/files/docs/teduniversitekurumsali.pdf), bölüm 2.1–2.2, PDF sayfaları 16–17. Dijital RGB değerleri: lacivert `0,35,126` / `#00237E`, sarı `247,212,23` / `#F7D417`, kırmızı `212,46,18` / `#D42E12`; yardımcı turkuaz `0,164,156` / `#00A49C`. Kurumsal amblem değiştirilmemiştir; renkler site arayüzünde ve festival illüstrasyonunda kullanılır.

## Konser arşivi — 13 Ekim 2026

`concerts.js` tekil tarih/sanatçı kayıtlarını ve her kaydın kaynak URL’sini tutar. Arşivde 2013–2026 arasında 26 kayıt, 7 özgün afiş ve 4 fotoğraflı sanatçı kartı vardır. TEDU Voice All Star `kind: 'event'` olarak ayrıca gösterilir; konser sayılmaz. Yalın, Pamela ve Yüzyüzeyken Konuşuruz öne çıkarılır. Diğer performanslar duraklatılabilen kayan şeritte, bütün kayıtlar kapalı başlayan yıl arşivinde yer alır. Hareket azaltma tercihi desteklenir. Yıl filtresi ve dinamik görsel büyütme `festival.js`, görünüm `concerts.css` içindedir.

- Kullanıcının sağladığı mor ve ötesi (26 Eylül 2018), Can Bonomo (26 Mayıs 2022), Selin Geçit ve Motive (21 Mayıs 2026) afişleri WebP olarak eklendi. Mevcut DKTT, Arem & Arman ve İkilem afişleri tekrar eklenmedi. Afişler kırpılmadan gösterilir.
- Erken kayıt: TED Ankara Koleji Mezunları Derneği, [114. sayı, Yalın / 5 Ekim 2013](https://www.kolej.org/wp-content/uploads/114.say%C4%B1.pdf).
- 2016–2019 konserleri TEDÜ yıllık gösterge raporları ve Mezunlar Derneği 129. sayısından; sonraki etkinlikler TEDÜ duyurularından doğrulandı. Kaynakların tam bağlantıları kayıtların yanında bulunur.
- Emre Fel & Apartman Diskosu (5 Ekim 2025), TEDÜ Kolej Kampüsü’nde IF Ankara tarafından düzenlenen etkinlik olarak kaydedildi; TEDUFEST organizasyonu olduğu iddia edilmez.
- Bu derleme erişilebilir tarihli kayıtları kapsar; tüm kuruluş yılları için eksiksiz resmî bir konser envanteri bulunamadı. 2019 Simge konserinin gün/ay bilgisi teyit edilemediğinden eklenmedi. Arşiv boşlukları konser yapılmadığı anlamına gelmez. Yeni doğrulanmış kayıtlar aynı veri dosyasına eklenebilir.
- 5000+ kişi kapasitesi organizatörün bu görevde verdiği bilgiyle festival ve sponsorluk metinlerine eklendi; geçmiş katılım sayısı olarak kullanılmadı.

### Eski konserlerin görselleri

Özgün afişler bulunamadığında kullanıcı gerçek fotoğraflı kart kullanılmasını seçti. Yeni tasarlanan kartlar özgün konser afişi olarak sunulmaz.

- `yalin-2013.jpg`: Kolejliler dergisi 114. sayı, PDF s.18'deki TEDÜFest konser fotoğrafı; gömülü görsel aynen çıkarıldı (247×144). Düşük çözünürlüklü arşiv fotoğrafıdır.
- `pamela-2017.jpg`: Kolejliler dergisi [129. sayı](https://www.kolej.org/wp-content/uploads/129.say%C4%B1.pdf), PDF s.68, TEDÜ Bahar Şenliği haberinin sanatçı ve ekip hatıra fotoğrafı (342×171); kartta “Festival hatırası” olarak gösterilir.
- `yyk-live-2018.jpg`: [Onur, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Y%C3%BCzy%C3%BCzeyken_Konu%C5%9Furuz_-_17.7.18.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Orijinal dosya değişmeden kullanıldı. Fotoğraf **17 Temmuz 2018 Olimpos** konserindendir, TEDÜ'nün 2017 konserinden değildir; bu ayrım kartta görünür kredi ve büyütme açıklamasında belirtilir. TEDÜ konserinin tarihi yıllık rapordan gelir.
- `emre-fel-2025.jpg`: [Biletino etkinlik duyurusu](https://biletino.com/tr/e-15io/emre-fel-apartman-diskosu/) üzerindeki Emre Fel tanıtım fotoğrafı; afiş veya canlı konser fotoğrafı olarak adlandırılmaz.

## Kontroller

`node --check app.js`, `node --check stage2d.js`, `node --check festival.js`.
Masaüstü ve mobilde gün seçimi, sahne yüzeyleri, büyütme penceresi, video duraklatma ve e-posta bağlantıları tarayıcıdan kontrol edilir.
