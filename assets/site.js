(function(){
  var root=document.documentElement;

  /* Mobil menü */
  var bar=document.querySelector('.topbar'),mb=document.querySelector('.menu-btn');
  if(bar&&mb){
    mb.addEventListener('click',function(){var o=bar.classList.toggle('open');mb.setAttribute('aria-expanded',o?'true':'false');});
    bar.querySelectorAll('.nav a').forEach(function(a){a.addEventListener('click',function(){bar.classList.remove('open');mb.setAttribute('aria-expanded','false');});});
  }

  /* Dil: ?lang=en, sonra kayıtlı seçim, sonra tarayıcı dili */
  var btns=document.querySelectorAll('.lang button');
  function setLang(l,save){
    root.setAttribute('data-lang',l);root.lang=l;
    btns.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.l===l?'true':'false');});
    document.querySelectorAll('video').forEach(function(v){if(!v.closest('[lang="'+l+'"]')&&v.closest('[lang]'))v.pause();});
    var t=document.querySelector('meta[name="title-'+l+'"]');if(t)document.title=t.content;
    if(save){try{localStorage.setItem('dod-lang',l);}catch(e){}}
  }
  if(btns.length){
    var l=null,q=/[?&]lang=(tr|en)/.exec(location.search);
    if(q)l=q[1];
    if(!l){try{l=localStorage.getItem('dod-lang');}catch(e){}}
    if(l!=='tr'&&l!=='en')l=(navigator.language||'tr').toLowerCase().indexOf('tr')===0?'tr':'en';
    setLang(l,false);
    btns.forEach(function(b){b.addEventListener('click',function(){setLang(b.dataset.l,true);});});
  }

  /* Galeri ışık kutusu */
  var lb=document.getElementById('lb');
  if(lb){
    var items=[].slice.call(document.querySelectorAll('[data-lb]')),i=0,img=lb.querySelector('img'),cap=lb.querySelector('.lb-cap'),last=null;
    function show(n){i=(n+items.length)%items.length;var a=items[i];img.src=a.getAttribute('href');img.alt=a.querySelector('img').alt;cap.textContent=(i+1)+' / '+items.length;}
    function open(n){last=document.activeElement;show(n);lb.hidden=false;document.body.style.overflow='hidden';lb.querySelector('.lb-x').focus();}
    function close(){lb.hidden=true;document.body.style.overflow='';if(last)last.focus();}
    items.forEach(function(a,n){a.addEventListener('click',function(e){e.preventDefault();open(n);});});
    lb.querySelector('.lb-x').addEventListener('click',close);
    lb.querySelector('.lb-prev').addEventListener('click',function(){show(i-1);});
    lb.querySelector('.lb-next').addEventListener('click',function(){show(i+1);});
    lb.addEventListener('click',function(e){if(e.target===lb)close();});
    document.addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1);});
  }

  /* Kaydırınca beliren bölümler */
  var rv=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window&&rv.length&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});
    rv.forEach(function(el){el.classList.add('pre');io.observe(el);});
  }

  /* Spoiler bulanıklığı (wiki) */
  document.querySelectorAll('.blur').forEach(function(el){
    function t(){el.classList.toggle('on');}
    el.addEventListener('click',t);
    el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();t();}});
  });
})();
