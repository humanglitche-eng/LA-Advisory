const dialog=document.querySelector('#contact-dialog');
function openContact(topic){const select=dialog.querySelector('select');select.value=[...select.options].some(o=>o.value===topic)?topic:'Primera conversación';dialog.querySelector('output').textContent='';dialog.showModal()}
document.querySelectorAll('[data-contact]').forEach(b=>b.addEventListener('click',()=>openContact(b.dataset.contact)));
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
const problems={cuentas:{label:'FINANZAS Y COSTOS',title:'Que tus números cuenten la historia completa.',copy:'Revisamos ingresos, gastos, costos y criterios de precios para entender qué pasa con el dinero y separar las cuentas del negocio de las personales.',topic:'Finanzas y costos'},organizacion:{label:'ORGANIZACIÓN Y EQUIPO',title:'Delegar empieza por tener claridad.',copy:'Analizamos tareas, responsabilidades y herramientas para ordenar el trabajo, capacitar a tu equipo y acompañarte sin que tengas que ocuparte de todo.',topic:'Organización y equipo'},crecimiento:{label:'CRECIMIENTO Y DECISIONES',title:'Poner una pausa para elegir el próximo paso.',copy:'Revisamos tus procesos y resultados, identificamos prioridades y definimos metas para que el esfuerzo cotidiano tenga una dirección.',topic:'Crecimiento y decisiones'}};
document.querySelectorAll('[data-problem]').forEach(b=>{b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls','problem-detail');b.addEventListener('click',()=>{const wasOpen=b.getAttribute('aria-expanded')==='true';document.querySelectorAll('[data-problem]').forEach(x=>x.setAttribute('aria-expanded','false'));const panel=document.querySelector('#problem-detail');panel.hidden=wasOpen;if(wasOpen)return;b.setAttribute('aria-expanded','true');const data=problems[b.dataset.problem];document.querySelector('#problem-label').textContent=data.label;document.querySelector('#problem-title').textContent=data.title;document.querySelector('#problem-copy').textContent=data.copy;document.querySelector('#problem-contact').dataset.contact=data.topic;});});
/* ── WhatsApp: la consulta se termina de escribir sola ──────────── */
const WA='5492273410027';
function waUrl(texto){ return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(texto); }
function armarConsulta(d){
  const extra=d.get('message').trim();
  return `Hola advisory-la 👋 Soy ${d.get('name').trim()}, de ${d.get('business').trim()}.\n\nMe interesa: ${d.get('topic')}.` + (extra ? `\n\n${extra}` : '');
}
dialog.querySelector('form').addEventListener('submit',e=>{
  e.preventDefault();
  const d=new FormData(e.target);
  if(!d.get('name').trim()||!d.get('business').trim())return;
  const url=waUrl(armarConsulta(d));
  // Se abre dentro del click: si esperáramos algo antes, el navegador lo
  // trataría como emergente y lo bloquearía.
  const w=window.open(url,'_blank','noopener');
  const out=dialog.querySelector('output');
  if(w){ out.innerHTML='Listo: te abrimos WhatsApp con la consulta escrita. Si no la ves, <a href="'+url+'" target="_blank" rel="noopener">tocá acá</a>.'; }
  // Si el navegador bloqueó la ventana, el link de rescate es la única salida.
  else { out.innerHTML='Tu navegador bloqueó la ventana. <a href="'+url+'" target="_blank" rel="noopener">Abrí WhatsApp desde acá</a>.'; }
});
