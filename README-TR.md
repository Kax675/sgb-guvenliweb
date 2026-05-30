# SGB Güvenli Web

[Click for the English version](README.md)

[![License](https://img.shields.io/badge/License-Apache_2.0-blue?style=flat&logo=apache&logoColor=white)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Preact](https://img.shields.io/badge/Preact-673AB7?style=flat&logo=preact&logoColor=white)](https://preactjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

Türkiye Siber Güvenlik Başkanlığı'nın (SGB) resmi API'sini kullanarak kullanıcıları kötü amaçlı web sitelerinden korumak için tasarlanmış bir tarayıcı uzantısı.

## Özellikler

- **Gerçek Zamanlı Koruma**: Tarayıcı gezintisini izler ve alan adlarını yüklenmeden önce SGB veritabanına karşı otomatik olarak kontrol eder.
- **Kritiklik Filtreleme**: Kullanıcıların web sitelerini engellemek için minimum bir kritiklik eşiği tanımlamasına olanak tanır.
- **Performans Optimizasyonlu Önbelleğe Alma**: Tarama hızı üzerindeki etkiyi en aza indirmek için API yanıtları için akıllı bir yerel önbellek uygular.
- **Alan Adı Beyaz Listesi**: Belirli alan adlarını koruma motorunun dışında tutma desteği.
- **Ayrıntılı Engelleme Bilgileri**: Tehdidin nedenini, kaynağını ve şiddetini gösteren özel bir engellenmiş sayfası sunar.
- **Otomatik Meta Veri Senkronizasyonu**: SGB API'lerinden tehdit meta verilerini (kaynaklar, açıklamalar, bağlantı türleri) periyodik olarak alır ve günceller.

## Teknoloji Yığını

- **Core**: TypeScript ile Preact
- **Styling**: Tailwind CSS v4
- **Build Sistemi**: Vite
- **API Entegrasyonu**: SGB (Siber Güvenlik Başkanlığı) Kamu API'si
- **Uzantı Formatı**: Manifest V3

## Kurulum

### Uzantıyı İndirme
1. [Sürümler (releases)](https://github.com/Kax675/sgb-guvenliweb/releases) sayfasına gidin ve uzantının en son sürümünü indirin (örneğin: `sgb-guvenliweb-v1.0.0.zip`).
   *Not: Sürümler, yeni bir sürüm etiketi (tag) yüklendiğinde otomatik olarak oluşturulur.*
2. İndirilen ZIP dosyasını istediğiniz bir konuma çıkartın.

### Tarayıcıya Yükleme

1. Tarayıcınızı açın ve uzantı yönetimi sayfasına gidin:
   - Chrome/Edge: `chrome://extensions`
   - Brave: `brave://extensions`
2. **Geliştirici modu**nu etkinleştirin.
3. **Paketlenmemiş öğe yükle** butonuna tıklayın.
4. Bir önceki adımda oluşturulan `dist` klasörünü seçin.

## Yapılandırma

Uzantı simgesine tıklayıp **Seçenekler** veya **Ayarlar**'ı seçerek uzantı seçenekleri sayfasına erişin. Buradan şunları yapabilirsiniz:
- Korumayı açıp kapatın.
- Engelleme için minimum kritiklik seviyesini ayarlayın.
- Hariç tutulan alan adları listesini yönetin.
- Önbellek süresini ve boyutunu yapılandırın.
- Meta veri güncelleme durumunu görüntüleyin.

## Geliştirme

HMR (Hot Module Replacement) ile bir geliştirme sunucusu başlatmak için:

```bash
npm run dev
```

## Lisans

Bu proje Apache Lisansı 2.0 ile lisanslanmıştır.