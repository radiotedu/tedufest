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

## Kontrol

## Konser arşivi — 13 Ekim 2026

`concerts.js` tekil tarih/sanatçı kayıtlarını ve her kaydın kaynak URL’sini tutar. Arşivde 2013–2026 arasında tarihi doğrulanan 26 konser kaydı ve 7 afiş vardır. Aynı gecedeki farklı sanatçılar ayrı performans olarak gösterilebilir; afişi olan performanslar alttaki listede tekrar edilmez. Yıl filtresi ve dinamik afiş büyütme `festival.js`, görünüm `concerts.css` içindedir.

- Kullanıcının sağladığı mor ve ötesi (26 Eylül 2018), Can Bonomo (26 Mayıs 2022), Selin Geçit ve Motive (21 Mayıs 2026) afişleri WebP olarak eklendi. Mevcut DKTT, Arem & Arman ve İkilem afişleri tekrar eklenmedi. Afişler kırpılmadan gösterilir.
- Erken kayıt: TED Ankara Koleji Mezunları Derneği, [114. sayı, Yalın / 5 Ekim 2013](https://www.kolej.org/wp-content/uploads/114.say%C4%B1.pdf).
- 2016–2019 konserleri TEDÜ yıllık gösterge raporları ve Mezunlar Derneği 129. sayısından; sonraki etkinlikler TEDÜ duyurularından doğrulandı. Kaynakların tam bağlantıları kayıtların yanında bulunur.
- Emre Fel & Apartman Diskosu (5 Ekim 2025), TEDÜ Kolej Kampüsü’nde IF Ankara tarafından düzenlenen etkinlik olarak kaydedildi; TEDUFEST organizasyonu olduğu iddia edilmez.
- Bu derleme erişilebilir tarihli kayıtları kapsar; tüm kuruluş yılları için eksiksiz resmî bir konser envanteri bulunamadı. 2019 Simge konserinin gün/ay bilgisi teyit edilemediğinden eklenmedi. Arşiv boşlukları konser yapılmadığı anlamına gelmez. Yeni doğrulanmış kayıtlar aynı veri dosyasına eklenebilir.
- 5000+ kişi kapasitesi organizatörün bu görevde verdiği bilgiyle festival ve sponsorluk metinlerine eklendi; geçmiş katılım sayısı olarak kullanılmadı.

## Kontroller

`node --check app.js`, `node --check stage2d.js`, `node --check festival.js`.
Masaüstü ve mobilde gün seçimi, sahne yüzeyleri, büyütme penceresi, video duraklatma ve e-posta bağlantıları tarayıcıdan kontrol edilir.
