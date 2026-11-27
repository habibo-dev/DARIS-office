# داريس موبيليا — Daris Mobilier

موقع عرض وبيع كراسي ومكاتب (عربي RTL) بتصميم تحريري فاتح — HTML/CSS/JS ثابت بدون مكتبات أو build.

## التشغيل
`python3 -m http.server 8080` ثم افتح http://localhost:8080 (أو انشره على GitHub Pages / Netlify).

## التعديل
- **المنتجات والأسعار**: مصفوفة `PRODUCTS` في أعلى `app.js` (الاسم، الوصف، `price`, `old`).
- **الصور**: `assets/img/pNN-l.webp` (900px) و `pNN-s.webp` (480px)؛ صور الواجهة: `hero`, `room`, `visitors`, `nova`.
- **الهاتف/واتساب**: ابحث عن `0561764977` و `213561764977`.
- **الألوان والخطوط**: متغيرات `:root` في `styles.css`.
