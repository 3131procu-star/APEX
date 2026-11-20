APEX CLIENT — GITHUB PAGES SITE
================================

Bu paket 3131procu-star/APEX deposunun ana dizinine yüklenmek için hazırdır. ZIP'i açınca index.html, app.js, styles.css ve downloads.json doğrudan en üst seviyede görünür.

SİTEYİ PUBLIC YAYINLAMA
-----------------------
1. https://github.com/3131procu-star/APEX adresini açın.
2. Add file > Upload files seçin.
3. Bu ZIP'i bilgisayarınıza çıkarın. İçindeki TÜM dosya ve klasörleri (index.html, app.js, styles.css, downloads.json, assets, downloads ve .nojekyll) yükleme alanına sürükleyin. apex-public-site gibi ek bir üst klasör oluşturmayın.
4. Commit changes ile main dalına kaydedin.
5. Repository > Settings > Pages bölümünü açın.
6. Build and deployment altında Source: Deploy from a branch seçin.
7. Branch: main, Folder: /(root) seçip Save'e basın.
8. Birkaç dakika sonra aşağıdaki adresi açın.

PUBLIC SİTE ADRESİ
------------------
https://3131procu-star.github.io/APEX/

SÜRÜM VE JAR DURUMU
-------------------
Site 1.21.1–1.21.11 ve 26.1–26.3 sürümlerini listeler. Şimdilik JAR dosyaları pakete dahil değildir; bu nedenle indirme düğmeleri kapalı görünür. Sürüm seçme, durum ekranı ve katalog hazırdır.

JAR DOSYASI EKLEME
------------------
1. İlgili Minecraft sürümünde derlenip test edilmiş JAR dosyasını downloads/ klasörüne koyun.
2. downloads.json içindeki o sürüm kaydında clientVersion, available:true, downloadUrl ve filename alanlarını güncelleyin.
3. Değişiklikleri yeniden main dalına yükleyin. GitHub Pages siteyi otomatik yeniler.

ÖNEMLİ
------
Bu site statik HTML/CSS/JavaScript'tir; backend veya veritabanı gerektirmez. Site JAR derlemez. Katalogda görünmek, bir Minecraft sürümünün halihazırda desteklendiği anlamına gelmez; sadece test edilmiş JAR'ları yayınlayın.
