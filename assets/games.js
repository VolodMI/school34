let total=0,quizAwarded=false,sortAwarded=false,detectiveAwarded=false,matchAwarded=false;
const scoreEls=[...document.querySelectorAll('[data-total-score]')];
function addScore(n){total+=n;scoreEls.forEach(e=>e.textContent=total);window.siteAnnounce?.('Загальний рахунок '+total+' балів')}

// Accessible tabs incl. arrow-key navigation
const tabs=[...document.querySelectorAll('.game-tab')];
tabs.forEach((tab,idx)=>{
 tab.addEventListener('click',()=>activateTab(idx));
 tab.addEventListener('keydown',e=>{
  let n=null;
  if(e.key==='ArrowRight'||e.key==='ArrowDown')n=(idx+1)%tabs.length;
  if(e.key==='ArrowLeft'||e.key==='ArrowUp')n=(idx-1+tabs.length)%tabs.length;
  if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;
  if(n!==null){e.preventDefault();activateTab(n);tabs[n].focus()}
 });
});
function activateTab(idx){tabs.forEach((t,i)=>{const active=i===idx;t.setAttribute('aria-selected',active?'true':'false');t.tabIndex=active?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!active});window.siteAnnounce?.('Відкрито гру '+tabs[idx].textContent.trim())}

const quiz=[
 ['У якому році народився Маркіян Шашкевич?',['1811','1837','1886','1928'],0,'Шашкевич народився 6 листопада 1811 року.'],
 ['Де народився Маркіян Шашкевич?',['Підлисся','Львів','Бережани','Вінніпег'],0,'Місце народження — село Підлисся на Львівщині.'],
 ['З ким Шашкевич творив ядро «Руської трійці»?',['Іван Вагилевич та Яків Головацький','Іван Франко та Леся Українка','Михайло Вербицький та Осип Маковей','Тарас Шевченко та Пантелеймон Куліш'],0,'До ядра «Руської трійці» входили Шашкевич, Іван Вагилевич і Яків Головацький.'],
 ['Коли було надруковано «Русалку Дністровую»?',['1834','1837','1848','1850'],1,'Альманах надруковано в Буді 1837 року.'],
 ['Яку брошуру Шашкевич видав 1835 року?',['«Азбука і abecadło»','«Кобзар»','«Історія Русів»','«Енеїда»'],0,'Енциклопедія історії України згадує брошуру «Азбука і abecadło» 1835 року.'],
 ['Коли засновано школу ім. Маркіяна Шашкевича у Львові?',['1875','1877','1886','1932'],2,'Офіційна історія школи називає 1886 рік роком заснування.'],
 ['Хто, за історією школи, запропонував назвати її іменем Шашкевича?',['Василь Ільницький','Андрей Шептицький','Осип Маковей','Тадеуш Обмінський'],0,'Шкільна історія називає директора Української академічної гімназії отця Василя Ільницького.'],
 ['Яка адреса СЗШ №34?',['вул. Замкнена, 8','вул. Коперника, 40','пл. Ринок, 1','вул. Личаківська, 10'],0,'Школа розташована на вул. Замкненій, 8.'],
 ['Хто проєктував нинішню будівлю школи за архітектурними джерелами?',['Тадеуш Обмінський','Іван Левинський','Юліан Захаревич','Владислав Садловський'],0,'Львівська політехніка та Міський медіаархів називають Тадеуша Обмінського.'],
 ['Коли останки Шашкевича перепоховали на Личаківському цвинтарі?',['1843','1893','1906','1911'],1,'Енциклопедія історії України вказує 1893 рік.'],
 ['Коли відкрили пам’ятник Шашкевичу на вул. Коперника у Львові?',['1911','1962','1990','1993'],2,'Пам’ятник відкрили 15 вересня 1990 року.'],
 ['Коли відкрили музей-заповідник Шашкевича в Підлиссі?',['1959','1986','1990','2011'],1,'Сучасний музей-заповідник відкрили 23 листопада 1986 року до 175-річчя Шашкевича.']
];
let qi=0,qs=0,locked=false;
const qtext=document.getElementById('qtext'),answers=document.getElementById('answers'),qstatus=document.getElementById('qstatus'),qcount=document.getElementById('qcount'),qscore=document.getElementById('qscore'),nextQ=document.getElementById('nextQ');
function renderQ(){locked=false;const q=quiz[qi];qtext.textContent=q[0];qcount.textContent=(qi+1)+' / '+quiz.length;answers.innerHTML='';qstatus.textContent='';qstatus.className='live';q[1].forEach((t,i)=>{const b=document.createElement('button');b.className='answer';b.type='button';b.textContent=t;b.addEventListener('click',()=>choose(i,b));answers.appendChild(b)});nextQ.hidden=true}
function choose(i,b){if(locked)return;locked=true;const q=quiz[qi];[...answers.children].forEach((x,j)=>{x.disabled=true;if(j===q[2])x.classList.add('correct')});if(i===q[2]){qs+=10;qstatus.textContent='Правильно. '+q[3];qstatus.className='live good'}else{b.classList.add('wrong');qstatus.textContent='Неправильно. '+q[3];qstatus.className='live bad'}qscore.textContent=qs;nextQ.hidden=false;nextQ.focus()}
nextQ.addEventListener('click',()=>{if(qi<quiz.length-1){qi++;renderQ()}else{qtext.textContent='Квіз завершено: '+qs+' / '+(quiz.length*10);answers.innerHTML='';qstatus.textContent=qs>=90?'Сильний результат.':'Результат збережено. Можна перейти до наступної гри.';nextQ.hidden=true;if(!quizAwarded){addScore(qs);quizAwarded=true}}});renderQ();

const sortList=document.getElementById('sortList'),sortStatus=document.getElementById('sortStatus');
function moveItem(btn,dir){const item=btn.closest('.sort-item');if(dir<0&&item.previousElementSibling)sortList.insertBefore(item,item.previousElementSibling);if(dir>0&&item.nextElementSibling)sortList.insertBefore(item.nextElementSibling,item);item.focus();window.siteAnnounce?.('Подію переміщено')}
sortList.addEventListener('click',e=>{const b=e.target.closest('button[data-move]');if(b)moveItem(b,b.dataset.move==='up'?-1:1)});
document.getElementById('checkSort').addEventListener('click',()=>{const arr=[...sortList.children].map(x=>+x.dataset.order),ok=arr.every((v,i)=>v===i+1);sortStatus.textContent=ok?'Хронологія правильна. Нараховано 40 балів.':'Порядок ще неправильний. Використовуйте кнопки «вище» та «нижче».';sortStatus.className='live '+(ok?'good':'bad');if(ok&&!sortAwarded){addScore(40);sortAwarded=true}});
document.getElementById('shuffleSort').addEventListener('click',()=>{[...sortList.children].sort(()=>Math.random()-.5).forEach(x=>sortList.appendChild(x));sortStatus.textContent='Події перемішано.'});

const cases=[
 {img:'https://images.gr-assets.com/books/1642439812l/62019613.jpg',alt:'Титульна сторінка альманаху «Русалка Дністровая»: на світлому тлі великим старим кириличним шрифтом написано назву, нижче невелика декоративна гравюра.',q:'Який рік пов’язаний із цим виданням?',opts:['1835','1837','1850'],correct:1,note:'«Русалку Дністровую» надруковано 1837 року.'},
 {img:'https://upload.wikimedia.org/wikipedia/commons/1/1f/School_%E2%84%96_34%2C_Lviv.jpg',alt:'Триповерхова функціоналістична будівля школи з бежевим фасадом, вертикальними червоними вставками та довгими рядами великих вікон.',q:'Який архітектор пов’язаний із нинішньою будівлею школи?',opts:['Тадеуш Обмінський','Іван Левинський','Василь Нагірний'],correct:0,note:'Архітектурні джерела називають Тадеуша Обмінського.'},
 {img:'https://lia.lvivcenter.org/assets/images/ci_object/131/1200/800/fity/8/131.jpg',alt:'Бронзовий пам’ятник Маркіяну Шашкевичу на постаменті; позаду стоїть світло-зелена дзвіниця колишньої церкви Святого Духа.',q:'Коли відкрили цей львівський пам’ятник?',opts:['1911','1990','2011'],correct:1,note:'Пам’ятник відкрили 15 вересня 1990 року.'}
];
let ci=0,caseLocked=false,detScore=0;
const cimg=document.getElementById('caseImg'),cdesc=document.getElementById('caseDesc'),cq=document.getElementById('caseQ'),copts=document.getElementById('caseOpts'),cstatus=document.getElementById('caseStatus'),cnext=document.getElementById('caseNext'),ccount=document.getElementById('caseCount');
function renderCase(){caseLocked=false;const c=cases[ci];cimg.src=c.img;cimg.alt=c.alt;cdesc.textContent=c.alt;cq.textContent=c.q;ccount.textContent=(ci+1)+' / '+cases.length;copts.innerHTML='';cstatus.textContent='';cstatus.className='live';c.opts.forEach((t,i)=>{const b=document.createElement('button');b.className='answer';b.type='button';b.textContent=t;b.addEventListener('click',()=>chooseCase(i,b));copts.appendChild(b)});cnext.hidden=true}
function chooseCase(i,b){if(caseLocked)return;caseLocked=true;const c=cases[ci];[...copts.children].forEach((x,j)=>{x.disabled=true;if(j===c.correct)x.classList.add('correct')});if(i===c.correct){detScore+=15;b.classList.add('correct');cstatus.textContent='Правильно. '+c.note;cstatus.className='live good'}else{b.classList.add('wrong');cstatus.textContent='Неправильно. '+c.note;cstatus.className='live bad'}cnext.hidden=false;cnext.focus()}
cnext.addEventListener('click',()=>{if(ci<cases.length-1){ci++;renderCase()}else{cq.textContent='Архівний детектив завершено: '+detScore+' / 45';copts.innerHTML='';cnext.hidden=true;if(!detectiveAwarded){addScore(detScore);detectiveAwarded=true}}});renderCase();

document.getElementById('checkMatch').addEventListener('click',()=>{let ok=0;document.querySelectorAll('[data-match]').forEach(s=>{if(s.value===s.dataset.match)ok++});const status=document.getElementById('matchStatus');status.textContent='Правильних відповідностей: '+ok+' / 5.'+(ok===5?' Нараховано 30 балів.':'');status.className='live '+(ok===5?'good':'');if(ok===5&&!matchAwarded){addScore(30);matchAwarded=true}});
