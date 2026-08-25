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
  function authUI(){
    return `
<style>
#kr-auth-nav{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-inline-start:auto;padding:4px 0}
#kr-auth-nav button{border:0;border-radius:11px;padding:10px 15px;font:800 14px Tahoma,Arial;cursor:pointer;background:#176b5b;color:#fff}
#kr-auth-nav .light{background:#edf3f0;color:#123f38}
#kr-auth-nav .gold{background:#c99a3d;color:#fff}
.kr-auth-overlay{display:none;position:fixed;inset:0;z-index:99999;background:#0009;align-items:center;justify-content:center;padding:16px;font-family:Tahoma,Arial}
.kr-auth-overlay.show{display:flex}
.kr-auth-box{background:#fff;width:min(520px,100%);border-radius:22px;padding:25px;position:relative;box-shadow:0 25px 80px #0005;direction:rtl}
.kr-auth-box h2{margin:0 0 18px;color:#123f38;font-size:25px}
.kr-auth-box label{display:block;font-weight:800;margin:10px 0 6px;color:#26332f}
.kr-auth-box input{width:100%;padding:13px;border:1px solid #d5ded9;border-radius:11px;box-sizing:border-box;font:inherit}
.kr-auth-actions{display:flex;gap:8px;margin-top:18px}.kr-auth-actions button{flex:1;padding:13px;border:0;border-radius:11px;background:#176b5b;color:#fff;font-weight:800;cursor:pointer}.kr-auth-actions .light{background:#edf3f0;color:#123f38}
.kr-auth-close{position:absolute;left:12px;top:12px;border:0;background:#f0f2f1;color:#333;border-radius:50%;width:40px;height:40px;font-size:23px;cursor:pointer}
.kr-auth-msg{margin-top:12px;padding:11px;border-radius:10px;background:#eef7f4;color:#176b5b;font-size:13px;line-height:1.6}
@media(max-width:650px){#kr-auth-nav{justify-content:center}.kr-auth-box{padding:22px}.kr-auth-actions{flex-direction:column}}
</style>
<div id="kr-auth-nav" dir="rtl">
  <button type="button" data-kr="add">+ أضف عقارك</button>
  <button type="button" class="light" data-kr="login">تسجيل الدخول</button>
  <button type="button" class="light" data-kr="register">إنشاء حساب</button>
</div>
<div id="kr-auth-modal" class="kr-auth-overlay">
 <div class="kr-auth-box">
  <button type="button" class="kr-auth-close" data-kr="close">×</button>
  <div id="kr-auth-content"></div>
 </div>
</div>
<script>
(function(){
 const URL='https://rvhqwpynhlgcscscybse.supabase.co';
 const KEY='sb_publishable_HTJaBpq4c4JSyk5ybSOyNg_QS8tx3WE';
 const sup=window.supabase&&window.supabase.createClient?window.supabase.createClient(URL,KEY):null;
 const nav=document.getElementById('kr-auth-nav'), modal=document.getElementById('kr-auth-modal'), content=document.getElementById('kr-auth-content');
 if(!nav||!modal||!content)return;
 const show=(html)=>{content.innerHTML=html;modal.classList.add('show')};
 const close=()=>modal.classList.remove('show');
 function login(){show('<h2>🔐 تسجيل الدخول</h2><label>البريد الإلكتروني</label><input id="kr-le" type="email" autocomplete="email" placeholder="example@email.com"><label>كلمة المرور</label><input id="kr-lp" type="password" autocomplete="current-password" placeholder="••••••••"><div class="kr-auth-actions"><button type="button" id="kr-login-go">دخول</button><button type="button" class="light" id="kr-to-register">إنشاء حساب</button></div><div id="kr-login-msg"></div>');
  document.getElementById('kr-login-go').onclick=async()=>{if(!sup)return;const email=document.getElementById('kr-le').value.trim(),password=document.getElementById('kr-lp').value;if(!email||!password)return msg('kr-login-msg','أدخل البريد الإلكتروني وكلمة المرور.');const r=await sup.auth.signInWithPassword({email,password});if(r.error)return msg('kr-login-msg',r.error.message);if(r.data.user&&!r.data.user.email_confirmed_at){await sup.auth.signOut();return msg('kr-login-msg','يجب تأكيد البريد الإلكتروني أولًا. أرسلنا لك رسالة تأكيد.');}close();location.reload();};
  document.getElementById('kr-to-register').onclick=register;
 }
 function register(){show('<h2>📝 إنشاء حساب</h2><label>الاسم الكامل</label><input id="kr-rn" autocomplete="name" placeholder="الاسم الكامل"><label>رقم الهاتف</label><input id="kr-rp" type="tel" autocomplete="tel" placeholder="05xxxxxxxx"><label>البريد الإلكتروني</label><input id="kr-re" type="email" autocomplete="email" placeholder="example@email.com"><label>كلمة المرور</label><input id="kr-rpass" type="password" autocomplete="new-password" placeholder="6 أحرف على الأقل"><div class="kr-auth-actions"><button type="button" id="kr-register-go">إنشاء الحساب</button><button type="button" class="light" id="kr-to-login">لدي حساب</button></div><div id="kr-register-msg"></div>');
  document.getElementById('kr-register-go').onclick=async()=>{if(!sup)return;const name=document.getElementById('kr-rn').value.trim(),phone=document.getElementById('kr-rp').value.trim(),email=document.getElementById('kr-re').value.trim(),password=document.getElementById('kr-rpass').value;if(!name||!phone||!email||!password)return msg('kr-register-msg','يرجى ملء جميع المعلومات.');if(password.length<6)return msg('kr-register-msg','كلمة المرور يجب أن تكون 6 أحرف على الأقل.');const r=await sup.auth.signUp({email,password,options:{emailRedirectTo:location.origin+location.pathname,data:{full_name:name,phone}}});if(r.error)return msg('kr-register-msg',r.error.message);if(r.data.user&&!r.data.session)return msg('kr-register-msg','تم إنشاء الحساب. تحقق من بريدك الإلكتروني ثم عد إلى التطبيق.');close();location.reload();};
  document.getElementById('kr-to-login').onclick=login;
 }
 function msg(id,text){const e=document.getElementById(id);if(e)e.innerHTML='<div class="kr-auth-msg">'+String(text).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))+'</div>'}
 nav.addEventListener('click',e=>{const a=e.target.closest('[data-kr]')?.dataset.kr;if(!a)return;if(a==='login')login();if(a==='register')register();if(a==='close')close();if(a==='add'){if(sup){sup.auth.getUser().then(r=>{if(r.data.user){if(typeof window.openAddProperty==='function')window.openAddProperty();else location.hash='add-property';}else login()})}else login();}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 sup&&sup.auth.getUser().then(r=>{if(r.data.user){const name=r.data.user.user_metadata?.full_name||r.data.user.email?.split('@')[0]||'مستخدم';nav.innerHTML='<span style="font:800 13px Tahoma;color:#46524f">مرحبًا '+name+'</span><button type="button" data-kr="add">+ أضف عقارك</button><button type="button" class="light" data-kr="logout">خروج</button>';nav.querySelector('[data-kr="logout"]').onclick=async()=>{await sup.auth.signOut();location.reload()}}});
})();
</script>`;
  }
  function loadApp(){
    fetch('/app.html?boot='+Date.now(),{cache:'no-store',credentials:'same-origin'})
      .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()})
      .then(function(html){
        html=html.replace(/<script[^>]+src=["']https:\/\/cdn\.jsdelivr\.net\/npm\/@supabase\/supabase-js@2["'][^>]*><\/script>/i,'');
        var provinces=['الجزائر','وهران','قسنطينة','غليزان','عنابة','سطيف','مستغانم','تلمسان','الشلف','البليدة','بجاية','تيزي وزو','سيدي بلعباس'];
        var types=['F1','F2','F3','F4','F5','Villa','Studio','Duplex','Local commercial','Terrain'];
        html=html.replace('<div id="nav" class="nav"></div>','<div id="nav" class="nav"></div>'+authUI());
        html=html.replace('<select id="sw"><option value="">كل الولايات</option></select>','<select id="sw"><option value="">كل الولايات</option>'+provinces.map(function(x){return '<option value="'+x+'">'+x+'</option>'}).join('')+'</select>');
        html=html.replace('<select id="st"><option value="">كل الأنواع</option></select>','<select id="st"><option value="">كل الأنواع</option>'+types.map(function(x){return '<option value="'+x+'">'+x+'</option>'}).join('')+'</select>');
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
