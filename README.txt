DERS TAKİP V16.1.1 BETA 2

Önceki konuşmalarda belirtilen Premium prototipleri:
- Ücretsiz haftalık 3, Premium sınırsız hatırlatıcı
- Haftalık ders programı düzenleme ve şablonlar
- Haftalık çalışma planı
- Erken bitirme
- Karne / gelişim raporu
- Takvim .ics dışa aktarma
- Aero / Liquid Glass, animasyon ve ses
- Gelişmiş sayaç ayarları
- Görev gruplama, gecikenler ve arşiv
- Tekrarlanan görevler
- Çalışma süresi, görev yüzdesi, sınav ortalaması ve çalışma serisi
- Akıllı öneriler ve sınav-plan görünümü

SINIRLAMALAR:
- Premium etkinleştirme yerel prototip kilididir; gerçek ödeme/lisans doğrulaması değildir ve istemci kodu incelenebilir.
- Hatırlatıcılar uygulama açıkken listelenir; uygulama kapalıyken garantili push bildirim göndermez.
- Gelişmiş sayaç süreleri kaydedilir; mevcut sayaç motoruna otomatik mola döngüsü bağlanmış değildir.
- Haftalık ders çizelgesi düzenleme/şablon işlemleri Premium kilidindedir; mevcut kayıtlar korunur.
- Apple ile giriş için Firebase ve Apple Developer ayarları gerekir.
- Firebase Storage, Functions ve Hosting kullanılmaz.
- Firestore belge boyutu 1 MiB sınırına tabidir.
- Beta; gerçek tarayıcı/Firebase uçtan uca testleri yapılmamıştır.

Kurulum: ZIP içindeki dosyaları aynı GitHub Pages klasörüne yükle. HTTPS veya localhost kullan. Önce JSON yedeği al.


V16.1.1 Beta 2 yenilikleri:
- İlk açılışta giriş / hesap oluşturma ekranı.
- Oturumsuz devam seçeneği: veriler bu cihazda kalır, bulut senkronizasyonu için giriş gerekir.
- Oturumum açık kalsın seçeneği: açıkken LOCAL, kapalıyken SESSION Firebase Auth kalıcılığı kullanılır.
- Firebase Authentication file:// ortamında çalışmaz; giriş için HTTPS veya localhost gerekir. Oturumsuz kullanım file:// ortamında da tarayıcı depolaması izin veriyorsa kullanılabilir.
- Bu paket statik kod kontrollerinden geçirilmiştir; gerçek Firebase hesabı ve tarayıcı testleri kullanıcı ortamında ayrıca yapılmalıdır.
