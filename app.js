/* ===== Daris Mobilier — app.js (no libraries) ===== */
(function () {
  'use strict';

  var PHONE_INTL = '213561764977';
  var CATS = { operator: 'كراسي الموظفين', visitor: 'كراسي الزوار', office: 'مكاتب' };

  /* ---- المنتجات: عدّل الأسعار والأسماء من هنا ----
     price = السعر الجديد (دج) | old = السعر القديم | price:null = "اتصل لمعرفة السعر" */
  var PRODUCTS = [
    { id: 1,  cat: 'operator', name: 'كرسي موظف REF5028',        desc: 'ظهر شبكي يسمح بالتهوية، مقعد مريح وهيكل متين. اللون المتوفر: أسود.', price: 7500,  old: null },
    { id: 2,  cat: 'visitor',  name: 'كرسي زوار مبطّن',           desc: 'تبطين مريح بهيكل معدني قوي — كمية محدودة جداً.',                     price: 2000,  old: 2850 },
    { id: 3,  cat: 'visitor',  name: 'طقم كراسي زوار ملوّنة',     desc: 'ألوان متعددة (برتقالي، أسود، عنابي، أزرق) بهيكل أسود أنيق.',         price: 2300,  old: 2800 },
    { id: 4,  cat: 'visitor',  name: 'كراسي زوار جلدية',          desc: 'جلد اصطناعي بخطوط أنيقة، متوفرة بعدة ألوان: أسود، أحمر، أبيض، بني.', price: 2500,  old: 3150 },
    { id: 5,  cat: 'visitor',  name: 'كرسي استقبال جلد بأذرع كروم', desc: 'جلد أسود بتبطين مربعات وأذرع كروم، مثالي للاستقبال وقاعات الانتظار.', price: 8000,  old: 9500 },
    { id: 6,  cat: 'operator', name: 'كرسي موظف نوفا — Nova',     desc: 'ظهر شبكي وقاعدة كروم متحركة، متوفر بالوردي والأخضر.',                 price: 13000, old: 17000 },
    { id: 7,  cat: 'visitor',  name: 'كراسي زوار V01',            desc: 'ألوان زاهية (أخضر، أزرق، رمادي) بهيكل كروم — كمية محدودة.',            price: null,  old: null },
    { id: 8,  cat: 'operator', name: 'كرسي موظف برو — Pro',       desc: 'مسند رأس وظهر شبكي مريح لساعات العمل الطويلة، بالأحمر والأزرق.',      price: 16000, old: 21000 },
    { id: 9,  cat: 'operator', name: 'كرسي موظف d’04',       desc: 'تصميم عصري بظهر شبكي أسود وأذرع كروم وقاعدة متحركة.',                 price: 12000, old: 16500 },
    { id: 10, cat: 'office',   name: 'طقم مكتب كامل',             desc: 'مكتب بشكل L بلون البلوط الفاتح والرمادي + خزانة تخزين + وحدة متحركة + طاولة قهوة.', price: 63000, old: null }
  ];

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fmt = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); };
  var wa = function (p) {
    var t = 'السلام عليكم، أريد الاستفسار/الطلب: ' + p.name + (p.price ? ' (' + fmt(p.price) + ' دج)' : '');
    return 'https://wa.me/' + PHONE_INTL + '?text=' + encodeURIComponent(t);
  };
  var img = function (p, s) { return 'assets/img/p' + (p.id < 10 ? '0' : '') + p.id + '-' + s + '.webp'; };
  var WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 .9-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.3.4-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.6.3.1.2.1.8-.1 1.4Z"/></svg>';

  function priceHTML(p) {
    if (!p.price) return '<div class="price"><b style="font-size:1.05rem">اتصل لمعرفة السعر</b></div>';
    var h = '<div class="price"><b><bdi dir="ltr">' + fmt(p.price) + '</bdi><small>دج</small></b>';
    if (p.old) h += '<s><bdi dir="ltr">' + fmt(p.old) + '</bdi></s>';
    return h + '</div>';
  }
  var pct = function (p) { return p.old ? Math.round((1 - p.price / p.old) * 100) : 0; };

  /* ---------- lightbox ---------- */
  var lb = $('#lb'), cur = 0;
  function visibleIdx() { return $$('.row:not(.out)', acc).map(function (c) { return +c.dataset.i; }); }
  function show(i) {
    var p = PRODUCTS[i]; cur = i;
    $('#lbImg').src = img(p, 'l'); $('#lbImg').alt = p.name;
    $('#lbT').textContent = p.name; $('#lbD').textContent = p.desc + ' — ' + CATS[p.cat];
    $('#lbP2').innerHTML = priceHTML(p).replace(/^<div class="price">|<\/div>$/g, '');
    $('#lbWa').href = wa(p);
  }
  function open(i) { show(i); if (!lb.open) lb.showModal(); }
  function step(dir) {
    var v = visibleIdx(); if (!v.length) return;
    var k = v.indexOf(cur); k = (k + dir + v.length) % v.length; show(v[k]);
  }
    $('#lbX').addEventListener('click', function () { lb.close(); });
  $('#lbP').addEventListener('click', function () { step(-1); });
  $('#lbN').addEventListener('click', function () { step(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') step(1); else if (e.key === 'ArrowRight') step(-1);
  });

  /* ---------- helpers for new layout ---------- */
  var order = ['all'];
  function rowHTML(p, i) {
    var d = pct(p);
    return '<div class="row" data-cat="' + p.cat + '" data-i="' + i + '">' +
      '<button class="row__h" type="button" aria-expanded="false"><span class="row__n"></span><span class="row__t">' + p.name + '</span>' +
      '<span class="row__p">' + (p.price ? '<bdi dir="ltr">' + fmt(p.price) + '</bdi><small>دج</small>' : 'اتصل للسعر') + '</span><span class="row__x" aria-hidden="true"></span></button>' +
      '<div class="row__b"><div class="row__in"><div class="row__c">' +
      '<button class="row__img" type="button" aria-label="تكبير: ' + p.name + '">' + (d ? '<span class="tag">-' + d + '%</span>' : '') +
      '<img src="' + img(p, 's') + '" srcset="' + img(p, 's') + ' 480w, ' + img(p, 'l') + ' 900w" sizes="230px" alt="' + p.name + '" loading="lazy" decoding="async"></button>' +
      '<div class="row__d"><p>' + p.desc + '</p>' + priceHTML(p) +
      '<div class="btns"><a class="pill pill--fill" href="' + wa(p) + '" target="_blank" rel="noopener"><i></i>اطلب عبر واتساب</a></div></div></div></div></div></div>';
  }

  /* ---------- accordion ---------- */
  var acc = $('#acc');
  acc.innerHTML = PRODUCTS.map(rowHTML).join('');
  function renumber() {
    var n = 0;
    $$('.row', acc).forEach(function (r) { if (!r.classList.contains('out')) { n++; $('.row__n', r).textContent = (n < 10 ? '0' : '') + n; } });
  }
  function toggle(r, force) {
    var open = force !== undefined ? force : !r.classList.contains('open');
    $$('.row.open', acc).forEach(function (x) { x.classList.remove('open'); $('.row__h', x).setAttribute('aria-expanded', 'false'); });
    if (open) { r.classList.add('open'); $('.row__h', r).setAttribute('aria-expanded', 'true'); }
  }
  acc.addEventListener('click', function (e) {
    var h = e.target.closest('.row__h'); if (h) { toggle(h.parentNode); return; }
    var b = e.target.closest('.row__img'); if (b) open(+b.closest('.row').dataset.i);
  });
  /* ---------- ranges filter ---------- */
  var tiles = $$('.tile'), cnt = { all: PRODUCTS.length, operator: 0, visitor: 0, office: 0 };
  PRODUCTS.forEach(function (p) { cnt[p.cat]++; });
  Object.keys(cnt).forEach(function (k) { $('#n-' + k).textContent = cnt[k] + ' عروض'; });
  function filter(f) {
    tiles.forEach(function (t) { t.classList.toggle('is-on', t.dataset.f === f && f !== 'all'); });
    $$('.row', acc).forEach(function (r) { r.classList.toggle('out', f !== 'all' && r.dataset.cat !== f); });
    $('#filterName').textContent = f === 'all' ? '' : '— ' + CATS[f];
    renumber();
    var first = $('.row:not(.out)', acc); if (first) toggle(first, true);
  }
  tiles.forEach(function (t) {
    t.addEventListener('click', function () {
      filter(t.dataset.f);
      $('#offers').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    });
  });
  filter('all');

  /* ---------- best deals rail ---------- */
  var best = PRODUCTS.map(function (p, i) { return { p: p, i: i }; }).filter(function (x) { return x.p.old; })
    .sort(function (a, b) { return pct(b.p) - pct(a.p); }).slice(0, 5);
  $('#rail').innerHTML = best.map(function (x) {
    var p = x.p;
    return '<article class="rc" data-i="' + x.i + '"><button class="rc__img" type="button" aria-label="تكبير: ' + p.name + '"><span class="tag">-' + pct(p) + '%</span>' +
      '<img src="' + img(p, 's') + '" alt="' + p.name + '" loading="lazy"></button><div class="rc__b"><h3>' + p.name + '</h3>' + priceHTML(p) +
      '<a class="pill pill--fill" href="' + wa(p) + '" target="_blank" rel="noopener"><i></i>اطلب الآن</a></div></article>';
  }).join('');
  $('#rail').addEventListener('click', function (e) {
    var b = e.target.closest('.rc__img'); if (b) open(+b.closest('.rc').dataset.i);
  });

  /* ---------- hero price + parallax ---------- */
  var min = Math.min.apply(null, PRODUCTS.filter(function (p) { return p.price; }).map(function (p) { return p.price; }));
  $('#fromPrice').textContent = fmt(min);
  var himg = $('#heroImg'), hbox = himg.parentNode;
  if (!reduce) addEventListener('scroll', function () {
    var y = Math.min(scrollY, 700); himg.style.transform = 'translateY(' + (-y * .07).toFixed(1) + 'px) scale(' + (1 + y * .00012).toFixed(4) + ')';
  }, { passive: true });

  /* ---------- story slider ---------- */
  var SL = [['room', 'مكتب مجهّز بأثاث داريس موبيليا'], ['visitors', 'كراسي زوار جلدية'], ['nova', 'كراسي موظفين نوفا']], si = 0;
  function slide(d) {
    si = (si + d + SL.length) % SL.length;
    var a = $('#storyImg'), b = $('#storyImg2'), n = (si + 1) % SL.length;
    a.style.opacity = b.style.opacity = 0;
    setTimeout(function () {
      a.src = 'assets/img/' + SL[si][0] + '.webp'; a.alt = SL[si][1];
      b.src = 'assets/img/' + SL[n][0] + '.webp'; b.alt = SL[n][1];
      a.style.opacity = b.style.opacity = 1; $('#cntS').textContent = (si + 1) + ' / ' + SL.length;
    }, reduce ? 0 : 280);
  }
  $('#prevS').addEventListener('click', function () { slide(-1); });
  $('#nextS').addEventListener('click', function () { slide(1); });

  /* ---------- nav ---------- */
  var nav = $('#nav'), burger = $('#burger'), menu = $('#menu');
  addEventListener('scroll', function () { nav.classList.toggle('solid', scrollY > 30); }, { passive: true });
  burger.addEventListener('click', function () {
    var o = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'إغلاق القائمة' : 'فتح القائمة');
  });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); }); });
  var links = $$('a', menu), secs = links.map(function (a) { return $(a.getAttribute('href')); });
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (x.isIntersecting) { var k = secs.indexOf(x.target); links.forEach(function (l, j) { l.classList.toggle('is-active', j === k); }); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(function (s) { s && so.observe(s); });
  }

  /* ---------- reveal ---------- */
  var items = $$('[data-in]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { threshold: .12 });
    items.forEach(function (el, i) { if (el.closest('.hero__content')) el.style.setProperty('--d', (i * .09) + 's'); io.observe(el); });
  } else items.forEach(function (el) { el.classList.add('in'); });

  $('#yr').textContent = new Date().getFullYear();
})();
