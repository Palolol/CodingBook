document.addEventListener('DOMContentLoaded',function(){
  // Smooth nav
  document.querySelectorAll('header nav a').forEach(a=>{
    a.addEventListener('click',e=>{
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth'});
    });
  });

  // Quiz handling
  const form = document.getElementById('quiz-form');
  const result = document.getElementById('quiz-result');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const data = new FormData(form);
      let score=0;
      if(data.get('q1')==='b') score++;
      if(data.get('q2')==='c') score++;
      result.textContent = `You scored ${score}/2.`;
      if(score===2) result.style.color='green'; else result.style.color='#b45309';
    });
  }
});
