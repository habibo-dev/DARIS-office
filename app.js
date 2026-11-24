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

  /* ---------- stars ---------- */
  function stars(el, n, blur, a0, a1) {
    var s = [], i;
    for (i = 0; i < n; i++) {
      s.push((Math.random() * 100).toFixed(2) + 'vw ' + (Math.random() * 100).toFixed(2) + 'vh ' + blur + 'px 0 rgba(255,255,255,' + (a0 + Math.random() * (a1 - a0)).toFixed(2) + ')');
    }
    el.style.boxShadow = s.join(',');
  }
  stars($('#stA'), 150, 0, .05, .3);
  stars($('#stB'), 18, 1.2, .35, .7);

  /* ---------- catalog ---------- */
  var grid = $('#grid');
  grid.innerHTML = PRODUCTS.map(function (p, i) {
    var d = pct(p);
    return '<article class="card" data-cat="' + p.cat + '" data-i="' + i + '" data-in style="--d:' + ((i % 4) * .06) + 's">' +
      '<button class="card__img" type="button" aria-label="تكبير: ' + p.name + '">' +
      (d ? '<span class="tag">-' + d + '%</span>' : '') +
      '<img src="' + img(p, 's') + '" srcset="' + img(p, 's') + ' 480w, ' + img(p, 'l') + ' 900w" sizes="(max-width:520px) 50vw, 280px" alt="' + p.name + '" loading="lazy" decoding="async"></button>' +
      '<div class="card__body"><h3>' + p.name + '</h3><p>' + p.desc + '</p>' + priceHTML(p) +
      '<a class="order" href="' + wa(p) + '" target="_blank" rel="noopener">' + WA_ICON + 'اطلب عبر واتساب</a></div></article>';
  }).join('');
  $('#countOffers').textContent = PRODUCTS.length;

  var chips = $$('.chip');
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      chips.forEach(function (x) { x.classList.toggle('is-on', x === c); x.setAttribute('aria-selected', x === c); });
      var f = c.dataset.f;
      $$('.card', grid).forEach(function (card) { card.classList.toggle('out', f !== 'all' && card.dataset.cat !== f); });
    });
  });

  /* ---------- lightbox ---------- */
  var lb = $('#lb'), cur = 0;
  function visibleIdx() { return $$('.card:not(.out)', grid).map(function (c) { return +c.dataset.i; }); }
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
  grid.addEventListener('click', function (e) {
    var b = e.target.closest('.card__img'); if (b) open(+b.parentNode.dataset.i);
  });
  $('#lbX').addEventListener('click', function () { lb.close(); });
  $('#lbP').addEventListener('click', function () { step(-1); });
  $('#lbN').addEventListener('click', function () { step(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') step(1); else if (e.key === 'ArrowRight') step(-1);
  });

  /* ---------- 3D ring ---------- */
  var wrap = $('#ringWrap'), ring = $('#ring'), N = PRODUCTS.length, ry = 0, vel = 0, drag = false, sx = 0, moved = 0, hover = false;
  ring.innerHTML = PRODUCTS.map(function (p, i) {
    return '<div class="rc" style="--i:' + i + '" data-i="' + i + '"><img src="' + img(p, 's') + '" alt="' + p.name + '" draggable="false"></div>';
  }).join('');
  ring.style.setProperty('--n', N);
  function size() {
    var cw = parseFloat(getComputedStyle(wrap).getPropertyValue('--cw')) || 210;
    ring.style.setProperty('--cw', cw + 'px');
    ring.style.setProperty('--rad', Math.round(cw / 2 / Math.tan(Math.PI / N) + 70) + 'px');
  }
  size(); addEventListener('resize', size);
  function paint() { ring.style.transform = 'translateY(14px) rotateX(-7deg) rotateY(' + ry.toFixed(2) + 'deg)'; }
  paint();
  var raf;
  function tick() {
    if (!drag) {
      ry += vel; vel *= .94;
      if (!reduce && !hover) ry -= .12;
    }
    paint(); raf = requestAnimationFrame(tick);
  }
  var heroEl = $('.hero');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { if (!raf) tick(); } else { cancelAnimationFrame(raf); raf = 0; }
    }).observe(heroEl);
  } else tick();

  wrap.addEventListener('pointerdown', function (e) { drag = true; sx = e.clientX; moved = 0; wrap.setPointerCapture(e.pointerId); });
  wrap.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var dx = e.clientX - sx; sx = e.clientX; moved += Math.abs(dx);
    ry += dx * .35; vel = dx * .35;
  });
  function end(e) {
    if (!drag) return; drag = false;
    if (moved < 6) {
      var t = document.elementFromPoint(e.clientX, e.clientY), c = t && t.closest && t.closest('.rc');
      if (c) open(+c.dataset.i);
    }
  }
  wrap.addEventListener('pointerup', end);
  wrap.addEventListener('pointercancel', function () { drag = false; });
  wrap.addEventListener('mouseenter', function () { hover = true; });
  wrap.addEventListener('mouseleave', function () { hover = false; });

  /* ---------- nav ---------- */
  var nav = $('#nav'), burger = $('#burger'), menu = $('#menu');
  addEventListener('scroll', function () { nav.classList.toggle('solid', scrollY > 30); }, { passive: true });
  burger.addEventListener('click', function () {
    var o = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'إغلاق القائمة' : 'فتح القائمة');
  });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); }); });

  /* active link on scroll */
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
