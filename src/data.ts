/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Doctor, Treatment, Review, Appointment } from './types';

export const TREATMENTS: Treatment[] = [
  {
    id: 'implant',
    name: 'İmplant Tedavisi',
    description: 'Eksik dişlerin yerine modern titanyum vidalar kullanılarak yapılan kalıcı ve estetik diş restorasyonları.',
    priceRange: '15.000 TL - 28.000 TL',
    duration: '30 - 60 Dakika',
    iconName: 'ShieldAlert', // Will map to Lucide icons
    fullDetails: 'İmplant tedavisi, doğal diş köklerini taklit eden titanyum vida yapısı ile en konforlu ve en uzun ömürlü protez yöntemidir. Lokal anestezi altında ağrısız uygulanır, çene kemiğine bütünüyle entegre olarak hayat boyu rahatça yemek yemenizi ve özgürce gülmenizi sağlar.'
  },
  {
    id: 'kanal',
    name: 'Kanal Tedavisi',
    description: 'İltihaplı veya hasar görmüş diş sinirlerinin temizlenerek dişin kurtarılmasını sağlayan hassas tedavi.',
    priceRange: '2.500 TL - 4.500 TL',
    duration: '45 - 90 Dakika',
    iconName: 'Activity',
    fullDetails: 'Derin çürük veya travma gibi sebeplerle canlılığını yitiren, enfekte olan pulpa (sinir) dokusunun titizlikle temizlenip kanalların dezenfekte edilerek özel dolgu maddeleriyle doldurulması işlemidir. Diş çekimini önleyen en önemli kurtarma uygulamasıdır.'
  },
  {
    id: 'beyazlatma',
    name: 'Diş Beyazlatma',
    description: 'Klinik ortamında özel jeller ve lazer teknolojisiyle diş tonunun 3-4 kata kadar açılması işlemi.',
    priceRange: '3.500 TL - 6.000 TL',
    duration: '45 - 60 Dakika',
    iconName: 'Sparkles',
    fullDetails: 'Yeme içmeye veya yaşlanmaya bağlı olarak renk değiştirmiş dişlerin minesine zarar vermeden, hidrojen peroksit bazlı jeller ve özel klinik aktivasyon ışıkları kullanılarak sadece tek bir seansta göz alıcı bir beyazlığa kavuşturulması işlemidir.'
  },
  {
    id: 'ortodonti',
    name: 'Ortodonti (Tel Tedavisi)',
    description: 'Çapraşık dişlerin, diş arası boşluklarının ve çene uyumsuzluklarının modern şeffaf plaklar veya tellerle düzeltilmesi.',
    priceRange: '35.000 TL - 65.000 TL',
    duration: '30 - 45 Dakika (Seans)',
    iconName: 'Layers',
    fullDetails: 'Dişlerin çene kemiği üzerinde düzgün dizilmesini sağlayan, estetik olduğu kadar doğru çiğneme fonksiyonunu da geri kazandıran tedavidir. Geleneksel metal tellerin yanı sıra en yeni teknoloji olan telsiz "Telsiz Ortodonti/Şeffaf Plak" (Invisalign) seçeneklerimiz mevcuttur.'
  },
  {
    id: 'cocuk',
    name: 'Çocuk Diş Hekimliği',
    description: '0-13 yaş arası çocukların süt ve kalıcı diş gelişimlerinin takibi, koruyucu tedaviler ve pedodontist yaklaşımı.',
    priceRange: '1.200 TL - 2.800 TL',
    duration: '30 - 45 Dakika',
    iconName: 'Baby',
    fullDetails: 'Pedodonti uzmanlarımız tarafından çocukların diş hekimi korkusunu yenmelerini sağlayan eğlenceli ve şefkatli bir yaklaşımla yürütülür. Koruyucu flor uygulamaları, fissür örtücüler, süt dişi tedavileri ve erken çocukluk dönemi çene gelişim kontrollerini içerir.'
  },
  {
    id: 'temizlik',
    name: 'Diş Taşı Temizliği',
    description: 'Diş eti sağlığını korumak için tartar, plak ve yüzeysel lekelerin ultrasonik aletlerle derinlemesine arındırılması.',
    priceRange: '1.500 TL - 2.500 TL',
    duration: '30 Dakika',
    iconName: 'Flame',
    fullDetails: 'Detartraj olarak da bilinen bu işlem, diş fırçasının ulaşamadığı bölgelerde biriken ve diş eti hastalıklarına, kemik erimelerine ve ağız kokusuna neden olan sert diş taşlarının (tartarların) ultrasonik cihazlarla saniyeler içinde temizlenmesi rutinidir. 6 ayda bir önerilir.'
  },
  {
    id: 'estetik',
    name: 'Estetik Diş Hekimliği',
    description: 'Gülüş tasarımı, porselen lamine, zirkonyum kaplama ve estetik dolgularla hayal ettiğiniz mükemmel gülüşü tasarlama.',
    priceRange: '6.000 TL - 12.000 TL (Diş Başı)',
    duration: '45 - 90 Dakika',
    iconName: 'Smile',
    fullDetails: 'Kişinin yüz hatları, dudak yapısı, ten rengi ve cinsiyetiyle tam uyumlu, doğal ve estetik açıdan kusursuz bir gülümseme oluşturma sürecidir. Zirkonyum porselenler, ultra ince lamine yapraklar (lumineers) ve bonding dolgu sistemleriyle kombine edilir.'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr_mehmet',
    name: 'Dr. Dt. Mehmet Selim Katre',
    title: 'Kurucu / Protez & Estetik Diş Hekimliği Uzmanı',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    specialty: 'Estetik Gülüş Tasarımı, Zirkonyum Kaplama, Lamine Diş Uygulamaları',
    experience: '16 Yıl Deneyim',
    education: 'Hacettepe Üniversitesi Diş Hekimliği Fakültesi (Lisans) & Selçuk Üniversitesi (Uzmanlık)',
    about: 'Katre Diş Polikliniği\'nin kurucusu olan Mehmet Selim Katre, dijital gülüş tasarımı alanında ulusal ve uluslararası kongrelerde konuşmacı olarak yer almıştır. Estetik restorasyonlarda hastanın doğal güzelliğini ortaya çıkarmayı ilke edinmiştir.',
    rating: 4.9
  },
  {
    id: 'dr_selin',
    name: 'Uzm. Dt. Selin Yılmaz',
    title: 'Ortodonti Uzmanı',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=600',
    specialty: 'Şeffaf Plak Tedavileri (Invisalign), Metal ve Estetik Braketler',
    experience: '11 Yıl Deneyim',
    education: 'İstanbul Üniversitesi Diş Hekimliği Fakültesi & Marmara Üniversitesi Ortodonti Anabilim Dalı',
    about: 'Uzm. Dt. Selin Yılmaz, diş ve çene anomalilerinin modern tedavi metotları ile düzeltilmesinde uzmandır. Özellikle çocuklarda koruyucu ortodonti ve yetişkinlerde Invisalign (şeffaf plaklar) tedavilerinde zengin bir vaka tecrübesine sahiptir.',
    rating: 4.8
  },
  {
    id: 'dr_canan',
    name: 'Dt. Canan Kaya',
    title: 'Pedodonti (Çocuk Diş Hekimliği) Direktörü',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    specialty: 'Çocuk Diş Sağlığı, Florür/Fissür Koruması, Davranış Yönlendirmeli Tedavi',
    experience: '8 Yıl Deneyim',
    education: 'Ege Üniversitesi Diş Hekimliği Fakültesi',
    about: 'Çocukların klinikten güler yüzle ayrılmasını sağlama konusunda eşsiz bir yeteneğe sahip olan Dt. Canan Kaya, minik hastalarının diş hekimi korkusunu yenmelerine odaklanır. Koruyucu tedavilere büyük önem vermektedir.',
    rating: 4.9
  },
  {
    id: 'dr_ahmet',
    name: 'Uzm. Dt. Ahmet Aslan',
    title: 'Ağız, Diş ve Çene Cerrahisi Uzmanı',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600',
    specialty: 'İleri İmplantoloji, Gömülü 20\'lik Diş Çekimleri, Sinüs Lifting, Çene Kemik Greftleri',
    experience: '13 Yıl Deneyim',
    education: 'Ankara Üniversitesi Diş Hekimliği Fakültesi & Gazi Üniversitesi Ağız, Diş ve Çene Cerrahisi AD',
    about: 'İleri cerrahi ve kemik ogmentasyonu gerektiren zorlu vakalarda referans hekim olan Dr. Ahmet Aslan, implant operasyonlarını en yüksek sterilizasyon ve teknoloji ortamında, ağrısız ve yüksek konforla gerçekleştirmektedir.',
    rating: 4.9
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev_1',
    name: 'Fatih Erdem',
    rating: 5,
    comment: 'Ömrüm boyunca diş hekiminden korkmuş biri olarak Katre Diş Polikliniği bu fobiye son verdi. Mehmet Hoca ve cerrah Ahmet Bey implant operasyonumu o kadar profesyonel yönettiler ki ne bir şişlik ne de bir ağrı yaşadım. Sancaktepe bölgesindeki en elit ve temiz klinik.',
    date: '10 Haziran 2026',
    service: 'İmplant Tedavisi'
  },
  {
    id: 'rev_2',
    name: 'Esra Yıldız Pekşen',
    rating: 5,
    comment: 'Kızım Elif\'in süt dişi çürükleri için Canan Hanım\'a geldik. Oyunlar oynayarak, hiç ürküp korkutmadan kanal ve dolgularını yaptı. Kızım şimdi her gün dişlerini fırçalıyor ve Canan Abla\'sına gitmek istiyor. İlginiz, nezaketiniz ve klinik hijyeni için çok teşekkür ederiz.',
    date: '28 Mayıs 2026',
    service: 'Çocuk Diş Hekimliği'
  },
  {
    id: 'rev_3',
    name: 'Murat Karaoğlu',
    rating: 4,
    comment: 'Selin Yılmaz Hanım ile şeffaf plak tedavisine başladık. 8. aydayız ve dişlerimdeki hizalanma şimdiden muazzam görünüyor. Randevulardaki ilgi alaka çok iyi, her bütçeye uygun taksit imkanları da sunuyorlar. Tavsiye ederim.',
    date: '15 Mayıs 2026',
    service: 'Ortodonti (Tel Tedavisi)'
  },
  {
    id: 'rev_4',
    name: 'Buse Demirel',
    rating: 5,
    comment: 'Evlilik öncesi diş beyazlatma ve estetik gülüş tasarımı için Mehmet Hoca\'ya başvurdum. Sonuç kelimenin tam anlamıyla harika! Fotoğraflarda mükemmel görünüyorum. Ekip güler yüzlü, klinik pırıl pırıl.',
    date: '5 Mayıs 2026',
    service: 'Estetik Diş Hekimliği'
  },
  {
    id: 'rev_5',
    name: 'Arda Yılmaz',
    rating: 5,
    comment: 'Yıllık rutin olarak diş taşı temizliğine geliyorum. İşlerini inanılmaz özenle yapıyorlar ve diğer çürük başlangıçlarını zamanında fark edip erkenden müdahale ettiler. Ticari değil, tamamen sağlık ve insan odaklılar.',
    date: '22 Nisan 2026',
    service: 'Diş Taşı Temizliği'
  }
];

export const CLINIC_INFO = {
  name: 'Katre Ağız ve Diş Sağlığı Polikliniği',
  address: 'Yunus Emre Mahallesi, Veysel Karani Caddesi No:37, 34791 Sancaktepe / İstanbul',
  phone: '0530 663 52 89',
  phoneFormatted: '+905306635289',
  whatsappNumber: '905306635289',
  location: 'Sancaktepe, İstanbul',
  rating: 4.4,
  workingHours: 'Pazartesi - Cumartesi: 09:00 - 19:30, Pazar: Kapalı'
};

export const WORK_HOURS = [
  '09:00', '09:45', '10:30', '11:15', '12:00',
  '13:30', '14:15', '15:00', '15:45', '16:30', '17:15', '18:00', '18:45'
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt_1',
    name: 'Ahmet Hamdi Yılmaz',
    phone: '0532 111 22 33',
    email: 'ahmetyilmaz@gmail.com',
    treatmentId: 'implant',
    doctorId: 'dr_ahmet',
    date: '2026-06-18',
    time: '10:30',
    note: 'Sağ alt çene için implant kontrol muayenesi ve dikiş alımı yapılacak.',
    status: 'APPROVED',
    createdAt: '2026-06-15T09:12:00.000Z'
  },
  {
    id: 'apt_2',
    name: 'Zeynep Solmaz',
    phone: '0544 555 44 22',
    email: 'zeynep.solmaz@outlook.com',
    treatmentId: 'beyazlatma',
    doctorId: 'dr_mehmet',
    date: '2026-06-18',
    time: '13:30',
    note: 'Lazerle diş beyazlatma seansı yapılacak. Kahve lekeleri yoğun.',
    status: 'APPROVED',
    createdAt: '2026-06-16T11:40:00.000Z'
  },
  {
    id: 'apt_3',
    name: 'Kaan Demirci',
    phone: '0555 987 65 43',
    email: 'kaandemirci@gmail.com',
    treatmentId: 'ortodonti',
    doctorId: 'dr_selin',
    date: '2026-06-19',
    time: '09:00',
    note: 'Ortodonti plak yenileme ve tel aktivasyonu seansı.',
    status: 'APPROVED',
    createdAt: '2026-06-16T15:20:00.000Z'
  },
  {
    id: 'apt_4',
    name: 'Defne Ela Bilgin',
    phone: '0535 222 33 44',
    email: 'bilginparent@gmail.com',
    treatmentId: 'cocuk',
    doctorId: 'dr_canan',
    date: '2026-06-19',
    time: '15:00',
    note: 'Süt dişi ağrısı sızısı şikayetiyle ilk defa muayene olmaya gelecek.',
    status: 'PENDING',
    createdAt: '2026-06-17T08:15:00.000Z'
  },
  {
    id: 'apt_5',
    name: 'Mustafa Topçu',
    phone: '0553 444 88 99',
    email: 'topcumustafa@gmail.com',
    treatmentId: 'temizlik',
    doctorId: 'dr_mehmet',
    date: '2026-06-20',
    time: '11:15',
    note: 'Detartraj (diş taşı temizliği) ve genel ağız kokusu şikayeti.',
    status: 'PENDING',
    createdAt: '2026-06-17T10:05:00.000Z'
  },
  {
    id: 'apt_6',
    name: 'Selin Akarsu',
    phone: '0542 333 44 55',
    email: 'selinakarsu@gmail.com',
    treatmentId: 'kanal',
    doctorId: 'dr_mehmet',
    date: '2026-06-16',
    time: '14:15',
    note: 'Arka azı dişi derin çürük tedavisi tamamlandı.',
    status: 'PENDING',
    createdAt: '2026-06-14T14:00:00.000Z'
  },
  {
    id: 'apt_7',
    name: 'Cemil Taşçı',
    phone: '0531 999 00 11',
    email: 'cemiltas@yahoo.com',
    treatmentId: 'implant',
    doctorId: 'dr_ahmet',
    date: '2026-06-15',
    time: '16:30',
    note: 'Yurt dışından geliyor, implant randevusuna katılamadığı için kendisi iptal etti.',
    status: 'CANCELLED',
    createdAt: '2026-06-14T10:30:00.000Z'
  }
];
