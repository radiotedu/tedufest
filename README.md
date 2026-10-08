# TEDUFEST

TED Üniversitesi festival ve sponsorluk sitesi.

- Site: https://radiotedu.github.io/tedufest/
- Düz HTML, CSS, JavaScript ve etkileşimli SVG. Derleme gerektirmez.
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

## Kontrol

`node --check app.js`, `node --check stage2d.js`, `node --check festival.js`.
Masaüstü ve mobilde gün seçimi, sahne yüzeyleri, büyütme penceresi, video duraklatma ve e-posta bağlantıları tarayıcıdan kontrol edilir.
