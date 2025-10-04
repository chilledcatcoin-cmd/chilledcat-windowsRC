// Whitepaper progress bar animation (defensive)
(function(){
  function start(){
    const bar = document.getElementById('barfill');
    if(!bar) return; // exit if markup missing
    let w=33, dir=1;
    setInterval(()=>{
      w += dir * (Math.random()*3+1);
      if(w>92){w=92;dir=-1}
      if(w<18){w=18;dir=1}
      bar.style.width = w + '%';
    }, 800);
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();