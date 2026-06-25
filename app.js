
const API="https://script.google.com/macros/s/AKfycbx6LX36ybpO6T_7pEWc-YuLI0y1fZCNKrd41X6Tt5HGe1mCHP7ENMRfjDK8RqK49SyD/exec";
let allData=[];

function render(items){
 let html="";
 items.forEach(item=>{
  html+=`<div class="card">
  <h2>${item.title}</h2>
  <small>${item.date||''}</small>
  <p>${item.summary||''}</p>`;

  if(item.type==="image"){
    const imgs=(item.media||"").split("|");
    html+=`<img class="thumb" src="${imgs[0]}">`;
  }

  if(item.type==="mp3"){
    html+=`<audio controls src="${item.media}"></audio>`;
  }

  html+=`<p><a href="detail.html?id=${item.id}">Xem chi tiết</a></p></div>`;
 });
 document.getElementById("app").innerHTML=html;
}

fetch(API).then(r=>r.json()).then(data=>{
 const config=data.config||{};
 allData=data.contents||[];

 document.getElementById("header").innerHTML=`
 <div class="header">
 <img class="logo" src="${config.Logo||''}">
 <h1>${config.SiteName||''}</h1>
 <p>${config.HeroText||''}</p>
 </div>`;

 document.getElementById("footer").innerHTML=`
 <div class="footer">${config.Footer||''}</div>`;

 const cats=["All",...new Set(allData.map(x=>x.category).filter(Boolean))];
 document.getElementById("categories").innerHTML=
 cats.map(c=>`<button onclick="filterCat('${c}')">${c}</button>`).join("");

 render(allData);
});

document.addEventListener("input",e=>{
 if(e.target.id==="searchBox"){
   const k=e.target.value.toLowerCase();
   render(allData.filter(x=>
    (x.title||"").toLowerCase().includes(k) ||
    (x.content||"").toLowerCase().includes(k)
   ));
 }
});

function filterCat(cat){
 if(cat==="All") render(allData);
 else render(allData.filter(x=>x.category===cat));
}
