const PACKS = [
  {
    kind: "sticker",
    title: "Official Sticker Pack",
    cover: "files/images/chilledcat_official.webp",
    preview: "files/images/chilledcat_official_preview.png",
    tags: ["official","blue"],
    telegram: "https://t.me/addstickers/CatCatCat"
  },
  {
    kind: "sticker",
    title: "OG Community Made Sticker Pack",
    cover: "files/images/chilledcat_og_community.png",
    preview: "files/images/chilledcat_og_community_preview.png",
    tags: ["community","classic"],
    telegram: "https://t.me/addstickers/adventuresofchilledcat"
  },
  {
    kind: "sticker",
    title: "Chilled Cat by Dall-E",
    cover: "files/images/chilledcat_dalle.png",
    preview: "files/images/chilledcat_dalle_preview.png",
    tags: ["ai","fun"],
    telegram: "https://t.me/addstickers/gakchilledcatdalle"
  },
  {
    kind: "emoji",
    title: "Chilled Cat Emojis",
    cover: "files/images/emoji.png",
    preview: "files/images/emoji_preview.png",
    tags: ["emoji","blue"],
    telegram: "https://t.me/addemoji/Chilled_Cat_by_EmojicBot"
  }
];

const gallery = document.getElementById('gallery');
const tabs = document.getElementById('tabs');
let currentFilter = 'all';

function badge(text){
  const b=document.createElement('span');
  b.className='badge';
  b.textContent=text;
  return b;
}

function cardTemplate(p){
  const el=document.createElement('article');el.className='card';el.dataset.kind=p.kind;
  el.innerHTML=`
    <div class="thumb"><img src="${p.cover}" alt="${p.title} cover"></div>
    <div class="meta">
      <p class="title">${p.title}</p>
      <div class="badges">
        ${p.kind==='emoji' ? '<span class="badge">Emoji Pack</span>' : '<span class="badge">Sticker Pack</span>'}
      </div>
      <div class="cta-row">
        <a class="btn" href="${p.telegram}" target="_blank">➕ Add on Telegram</a>
        <button class="btn btn-preview" data-preview="${p.preview}" data-title="${p.title}" data-kind="${p.kind}" data-tags="${(p.tags||[]).join(', ')}" data-telegram="${p.telegram}">👁️ Preview</button>
      </div>
    </div>`;return el;
}

function render(){
  gallery.innerHTML='';
  PACKS.filter(p=>currentFilter==='all'?true:p.kind===currentFilter).forEach(p=>gallery.appendChild(cardTemplate(p)));
  document.querySelectorAll('.btn-preview').forEach(btn=>{
    btn.addEventListener('click',()=>openLightbox({
      src:btn.dataset.preview,title:btn.dataset.title,kind:btn.dataset.kind,tags:btn.dataset.tags,telegram:btn.dataset.telegram
    }));
  });
}

tabs.querySelectorAll('.tab').forEach(t=>{
  t.addEventListener('click',()=>{
    tabs.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    currentFilter=t.dataset.filter;
    render();
  });
});

const lb=document.getElementById('lightbox');
const lbImg=document.getElementById('lbImg');
const lbTitle=document.getElementById('lbTitle');
const lbBadges=document.getElementById('lbBadges');
const lbCtas=document.getElementById('lbCtas');

document.getElementById('lbClose').onclick=()=>lb.classList.remove('show');
lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('show');});

function openLightbox({src,title,kind,tags,telegram}){
  lbImg.src=src;
  lbTitle.textContent=title;
  lbBadges.innerHTML='';
  lbBadges.appendChild(badge(kind==='emoji'?'Emoji Pack':'Sticker Pack'));
  if(tags)tags.split(',').forEach(t=>lbBadges.appendChild(badge(t.trim())));
  lbCtas.innerHTML=`<a class="btn" href="${telegram}" target="_blank">➕ Add on Telegram</a>`;
  lb.classList.add('show');
}

render();
