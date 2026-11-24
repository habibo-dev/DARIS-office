# داريس موبيليا — Daris Mobilier

موقع عرض وبيع كراسي ومكاتب (عربي RTL) — HTML/CSS/JS ثابت بدون أي مكتبات أو build.

## التشغيل
افتح المجلد في طرفية ثم: `python3 -m http.server 8080` وافتح http://localhost:8080
(أو انشره على GitHub Pages / Netlify / Vercel كما هو).

## التعديل
- **المنتجات والأسعار**: مصفوفة `PRODUCTS` في أعلى `app.js` (الاسم، الوصف، `price`, `old`).
- **الصور**: `assets/img/pNN-l.webp` (900px) و `pNN-s.webp` (480px).
- **رقم الهاتف/واتساب**: ابحث عن `0561764977` و `213561764977`.
- **الألوان**: متغيرات `:root` في `styles.css`.
