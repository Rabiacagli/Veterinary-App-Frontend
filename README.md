
# Veteriner Yönetim Sistemi

Bu proje, Patika+ FullStack Web Developer Programı'nın son aşaması olan capstone proje kapsamında geliştirilmiştir. Proje, bir veteriner yönetim sisteminin backend ve frontend bileşenlerini içermektedir.

### Canlı Demo
Tüm isterlerin karşılandığı ve kullanıcı dostu bir arayüze sahip olan bu projeyi canlı olarak deneyebilirsiniz.
Projenin canlı versiyonuna [Live Demo](https://veterinarymanagementapp.netlify.app) ulaşabilirsiniz.
`Render ile deploy edilmiştir. İlk açılışta yavaş açılabilir.`

- Tüm Crud, Search ve filtreleme işlemleri yapılabilmektedir.
- Müşteri, Hayvan, Randevu, Aşı da aramalar veritabanında yapıldığı için isimlerin `tamamını yazmanıza gerek vardır.`
- Doktor, Rapor aramalarında ise isimlerin `bir kısmını yazarak` arama yapabilirsiniz.
- Randevular sadece `saat başı alınmaktadır`. Örneğin 14:00, 15:00 gibi saatlerde randevu alabilirsiniz.
- Aynı kayıtları tekrar ekleyemezsiniz. `Conflict` hatası alırsınız.
## Proje Açıklaması

Bu proje, veteriner hekimlerin, müşterilerin ve onların hayvanlarının yönetimini sağlar. Aynı zamanda randevu ve raporlama özelliklerini de içerir. Proje, aşağıdaki özellikleri içermektedir:

### Backend Geliştirme

- **Veteriner doktorların kaydedilmesi**
- **Doktorların çalışma günlerinin (müsait günlerin) kaydedilmesi**
- **Müşterilerin kaydedilmesi**
- **Müşterilere ait hayvanların kaydedilmesi**
- **Hayvanlar için veteriner hekimlere randevu oluşturulması**
- **Randevu oluştururken tarih ve saat girilmesi**
- **Hayvanlara uygulanmış aşıların tarihleriyle birlikte kaydedilmesi**
- **Rapor düzenleme ve raporlara aşı kaydı yapabilme**

### Frontend Geliştirme

- **Giriş Sayfası**
- **Müşteri İşlemleri (CRUD)**
- **Veteriner Doktor İşlemleri (CRUD)**
- **Hayvan İşlemleri (CRUD)**
- **Randevu İşlemleri (CRUD)**
- **Aşı İşlemleri (CRUD)**
- **Her sayfanın CRUD operasyonları**
- **Kullanıcı bilgilendirme (Modal)**
- **Tasarım (CSS, Material)**

## Başlangıç

Projenizi yerel ortamda çalıştırmak için aşağıdaki adımları takip edebilirsiniz.

### Gereksinimler

- Java 17+
- Node.js 14+
- PostgreSQL veya MySQL
- Spring Boot
- React

### Kurulum

#### Backend

1. Depoyu klonlayın:
   ```sh
   git clone https://github.com/PehlivanMert/Veterinary-Api.git
   cd veteriner-yonetim-sistemi/backend
   ```

2. Bağımlılıkları yükleyin ve uygulamayı çalıştırın:
   ```sh
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

3. Veritabanı yapılandırmasını `application.properties` dosyasında yapın.

4. Örnek veri eklemek için `.sql` dosyasını içe aktarın:
   ```sh
   psql -U kullanıcı_adı -d veritabani_adi -f src/main/resources/data.sql
   ```
5. Alternatif olarak, docker-compose up --build komutu ile veritabanını ve uygulamayı ayağa kaldırabilirsiniz.
6. Uygulama başarıyla çalıştığında, `http://localhost:8080` veya `http://localhost:8080/swagger-ui/index.html#/` adresine giderek API'yi test edebilirsiniz.
#### Frontend

1. Depoyu klonlayın:
   ```sh
   git clone https://github.com/kullanici_adi/veteriner-yonetim-sistemi.git
   cd veteriner-yonetim-sistemi/frontend
   ```

2. Bağımlılıkları yükleyin:
   ```sh
   npm install
   ```

3. Uygulamayı çalıştırın:
   ```sh
   npm start
   ```
4. Uygulama başarıyla çalıştığında, `http://localhost:5173` adresine giderek uygulamayı kullanabilirsiniz.


## Kullanım

### Müşteri İşlemleri

1. **Müşteri Ekleme**: Müşteri bilgilerini girin ve kaydedin.
2. **Müşteriye Ait Hayvan Ekleme**: Müşteri seçerek hayvan bilgilerini girin ve kaydedin.
3. **Müşteri Güncelleme ve Silme**: Müşteri bilgilerini güncelleyebilir veya silebilirsiniz.

### Veteriner Doktor İşlemleri

1. **Doktor Ekleme**: Doktor bilgilerini girin ve kaydedin.
2. **Doktorun Müsait Günlerini Ekleme**: Doktorun müsait günlerini girin ve kaydedin.
3. **Doktor Güncelleme ve Silme**: Doktor bilgilerini güncelleyebilir veya silebilirsiniz.

### Randevu İşlemleri

1. **Randevu Oluşturma**: Hayvan ve doktor seçerek randevu oluşturun.
2. **Randevu Güncelleme ve Silme**: Randevu bilgilerini güncelleyebilir veya silebilirsiniz.

### Aşı ve Rapor İşlemleri

1. **Rapor Oluşturma**: Randevuya ait rapor oluşturun.
2. **Rapora Aşı Ekleme**: Rapora aşı bilgilerini ekleyin.

## UML Diyagramı

Projenin UML diyagramını [buradan](img/VeterinerUml.png) görüntüleyebilirsiniz.

## Katkıda Bulunma

1. Bu depoyu (`fork`) edin.
2. Yeni bir özellik (`feature`) dalı oluşturun: `git checkout -b feature/fooBar`
3. Değişikliklerinizi kaydedin: `git commit
4. Dalınıza (`branch`) itme yapın: `git push origin feature/fooBar`
5. Bir birleştirme isteği (`pull request`) gönderin.
6. İsteğiniz incelendikten sonra birleştirilir.
7. Birleştirme işlemi sonrasında dalınızı silebilirsiniz: `git branch -d feature/fooBar`
8. Projeye katkıda bulunduğunuz için teşekkür ederim!

## İletişim

Herhangi bir sorunuz veya geri bildiriminiz için lütfen benimle iletişime geçin:
- **Email**: [pehlivanmert@outlook.com.tr](mailto:pehlivanmert@outlook.com.tr)
- **GitHub**: [Mert Pehlivan Github](https://github.com/PehlivanMert)

