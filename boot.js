(function(){
  'use strict';
  var sdkUrls=[
    'https://unpkg.com/@supabase/supabase-js@2',
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
  ];
  function loadSdk(i){
    if(window.supabase&&typeof window.supabase.createClient==='function') return loadApp();
    if(i>=sdkUrls.length) return fail('تعذر تحميل محرك التطبيق. تحقق من اتصال الإنترنت ثم أعد المحاولة.');
    var s=document.createElement('script');
    s.src=sdkUrls[i];
    s.async=false;
    s.onload=function(){
      if(window.supabase&&typeof window.supabase.createClient==='function') loadApp();
      else loadSdk(i+1);
    };
    s.onerror=function(){loadSdk(i+1)};
    document.head.appendChild(s);
  }
  function loadApp(){
    fetch('/app.html?boot='+Date.now(),{cache:'no-store',credentials:'same-origin'})
      .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()})
      .then(function(html){
        html=html.replace(/<script[^>]+src=["']https:\/\/cdn\.jsdelivr\.net\/npm\/@supabase\/supabase-js@2["'][^>]*><\/script>/i,'');
        document.open();
        document.write(html);
        document.close();
      })
      .catch(function(e){console.error(e);fail('تعذر فتح التطبيق. أعد تحميل الصفحة.');});
  }
  function fail(msg){
    document.body.innerHTML='<main style="min-height:100vh;display:grid;place-items:center;background:#f5f6f4;font-family:Tahoma,Arial;text-align:center;padding:24px"><div><div style="font-size:42px">🏠</div><h2 style="color:#123f38">KriDari</h2><p>'+msg+'</p><button onclick="location.reload()" style="padding:13px 22px;border:0;border-radius:10px;background:#176b5b;color:white;font-weight:700">إعادة المحاولة</button></div></main>';
  }
  loadSdk(0);
})();
