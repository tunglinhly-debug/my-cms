
const API="https://script.google.com/macros/s/AKfycbx6LX36ybpO6T_7pEWc-YuLI0y1fZCNKrd41X6Tt5HGe1mCHP7ENMRfjDK8RqK49SyD/exec";
const id=new URLSearchParams(location.search).get("id");

fetch(API).then(r=>r.json()).then(data=>{
 const config=data.config||{};
 const item=(data.contents||[]).find(x=>String(x.id)===String(id));

 document.getElementById("header").innerHTML=`
 <div class="header">
 <img class="logo" src="${config.Logo||''}">
 <h1>${config.SiteName||''}</h1>
 </div>`;

 document.getElementById("footer").innerHTML=`
 <div class="footer">${config.Footer||''}</div>`;

 if(!item){
   document.getElementById("detail").innerHTML="Không tìm thấy bài viết";
   return;
 }

 let html=`<div class="card"><h2>${item.title}</h2>`;

 if(item.type==="image"){
   const imgs=(item.media||"").split("|");
   html+=`<div class="gallery">`;
   imgs.forEach(i=>html+=`<img src="${i}">`);
   html+=`</div>`;
 }

 if(item.type==="video"){
   if((item.media||"").includes("youtube")){
      html+=`<iframe src="${item.media}"></iframe>`;
   }else{
      html+=`<video controls src="${item.media}"></video>`;
   }
 }

 if(item.type==="mp3"){
   html+=`<audio controls src="${item.media}"></audio>`;
 }

 if(item.type==="pdf"){
   html+=`<iframe src="${item.media}"></iframe>`;
 }

 html+=`<p>${item.content||''}</p></div>`;
 document.getElementById("detail").innerHTML=html;
});
