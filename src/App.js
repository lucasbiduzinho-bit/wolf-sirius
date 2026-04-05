import { useState, useEffect, useRef } from "react";

const ADMIN = "lurochasirius@gmail.com";
const BG="#07090E",CARD="#0E1219",CARD2="#141A27",BDR="#1C2235";
const GOLD="#D4A843",GOLD2="#F2C75C",WHT="#EEF2FF",GRY="#5A6480",GRN="#22C55E",RED="#EF4444";

const EXDB=[
  {en:"Bench Press",pt:"Supino Reto",m:"Peito"},
  {en:"Incline Bench Press",pt:"Supino Inclinado",m:"Peito"},
  {en:"Decline Bench Press",pt:"Supino Declinado",m:"Peito"},
  {en:"Dumbbell Fly",pt:"Crucifixo",m:"Peito"},
  {en:"Cable Fly",pt:"Crossover",m:"Peito"},
  {en:"Push Up",pt:"Flexão de Braço",m:"Peito"},
  {en:"Dips",pt:"Paralelas",m:"Peito/Tríceps"},
  {en:"Pec Deck",pt:"Fly na Máquina",m:"Peito"},
  {en:"Pull Up",pt:"Barra Fixa",m:"Costas"},
  {en:"Chin Up",pt:"Barra Supinada",m:"Costas"},
  {en:"Lat Pulldown",pt:"Puxada Alta",m:"Costas"},
  {en:"Barbell Row",pt:"Remada Curvada",m:"Costas"},
  {en:"Dumbbell Row",pt:"Remada Unilateral",m:"Costas"},
  {en:"Seated Cable Row",pt:"Remada Sentada",m:"Costas"},
  {en:"T-Bar Row",pt:"Remada T",m:"Costas"},
  {en:"Deadlift",pt:"Levantamento Terra",m:"Costas/Pernas"},
  {en:"Pullover",pt:"Pullover",m:"Costas"},
  {en:"Straight Arm Pulldown",pt:"Puxada Braço Estendido",m:"Costas"},
  {en:"Overhead Press",pt:"Desenvolvimento",m:"Ombros"},
  {en:"Dumbbell Shoulder Press",pt:"Desenvolvimento com Halter",m:"Ombros"},
  {en:"Lateral Raise",pt:"Elevação Lateral",m:"Ombros"},
  {en:"Front Raise",pt:"Elevação Frontal",m:"Ombros"},
  {en:"Rear Delt Fly",pt:"Crucifixo Inverso",m:"Ombros"},
  {en:"Arnold Press",pt:"Press Arnold",m:"Ombros"},
  {en:"Face Pull",pt:"Face Pull",m:"Ombros"},
  {en:"Upright Row",pt:"Remada Alta",m:"Ombros"},
  {en:"Barbell Curl",pt:"Rosca Direta",m:"Bíceps"},
  {en:"Dumbbell Curl",pt:"Rosca Alternada",m:"Bíceps"},
  {en:"Hammer Curl",pt:"Rosca Martelo",m:"Bíceps"},
  {en:"Preacher Curl",pt:"Rosca Scott",m:"Bíceps"},
  {en:"Concentration Curl",pt:"Rosca Concentrada",m:"Bíceps"},
  {en:"Cable Curl",pt:"Rosca na Polia",m:"Bíceps"},
  {en:"Incline Dumbbell Curl",pt:"Rosca Inclinada",m:"Bíceps"},
  {en:"Tricep Pushdown",pt:"Tríceps Pulley",m:"Tríceps"},
  {en:"Skull Crusher",pt:"Tríceps Testa",m:"Tríceps"},
  {en:"Overhead Tricep Extension",pt:"Tríceps Francês",m:"Tríceps"},
  {en:"Close Grip Bench Press",pt:"Supino Fechado",m:"Tríceps"},
  {en:"Tricep Dips",pt:"Mergulho para Tríceps",m:"Tríceps"},
  {en:"Kickback",pt:"Coice de Tríceps",m:"Tríceps"},
  {en:"Squat",pt:"Agachamento",m:"Pernas"},
  {en:"Leg Press",pt:"Leg Press",m:"Pernas"},
  {en:"Leg Extension",pt:"Extensora",m:"Quadríceps"},
  {en:"Leg Curl",pt:"Flexora",m:"Isquiotibiais"},
  {en:"Romanian Deadlift",pt:"Stiff",m:"Isquiotibiais"},
  {en:"Lunges",pt:"Avanço",m:"Pernas"},
  {en:"Calf Raise",pt:"Panturrilha em Pé",m:"Panturrilha"},
  {en:"Seated Calf Raise",pt:"Panturrilha Sentado",m:"Panturrilha"},
  {en:"Hip Thrust",pt:"Elevação de Quadril",m:"Glúteos"},
  {en:"Glute Bridge",pt:"Ponte de Glúteo",m:"Glúteos"},
  {en:"Bulgarian Split Squat",pt:"Agachamento Búlgaro",m:"Pernas"},
  {en:"Hack Squat",pt:"Agachamento Hack",m:"Pernas"},
  {en:"Sumo Squat",pt:"Agachamento Sumô",m:"Pernas/Glúteos"},
  {en:"Adductor Machine",pt:"Adutora",m:"Adutores"},
  {en:"Abductor Machine",pt:"Abdutora",m:"Abdutores"},
  {en:"Crunch",pt:"Abdominal",m:"Abdômen"},
  {en:"Plank",pt:"Prancha",m:"Abdômen"},
  {en:"Russian Twist",pt:"Rotação Russa",m:"Abdômen"},
  {en:"Leg Raise",pt:"Elevação de Pernas",m:"Abdômen"},
  {en:"Cable Crunch",pt:"Abdominal na Polia",m:"Abdômen"},
  {en:"Mountain Climber",pt:"Escalador",m:"Abdômen"},
  {en:"Ab Wheel",pt:"Roda Abdominal",m:"Abdômen"},
];

// ── LOCAL STORAGE (sem Anthropic storage) ─────────────────────────
const store = {
  get: (k) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) { console.error(e); } },
};

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,5);
const inp = { width:'100%', boxSizing:'border-box', background:CARD2, border:`1px solid ${BDR}`, color:WHT, padding:'12px 14px', borderRadius:10, fontSize:14, outline:'none' };

// ── WOLF ICON ─────────────────────────────────────────────────────
function Wolf({ size=70 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">
      <path d="M50,4 L94,20 L94,58 Q94,90 50,108 Q6,90 6,58 L6,20 Z" fill="white"/>
      <path d="M50,12 L86,26 L86,58 Q86,84 50,100 Q14,84 14,58 L14,26 Z" fill={BG}/>
      <polygon points="27,40 34,18 44,36" fill="white"/>
      <polygon points="73,40 66,18 56,36" fill="white"/>
      <polygon points="30,37 35,22 41,35" fill={BG}/>
      <polygon points="70,37 65,22 59,35" fill={BG}/>
      <path d="M27,40 Q22,54 25,66 Q34,80 50,81 Q66,80 75,66 Q78,54 73,40 Q62,30 50,29 Q38,30 27,40Z" fill="white"/>
      <ellipse cx="39" cy="50" rx="7" ry="6" fill={BG}/>
      <ellipse cx="61" cy="50" rx="7" ry="6" fill={BG}/>
      <ellipse cx="37" cy="48" rx="2" ry="1.5" fill="white" opacity="0.2"/>
      <ellipse cx="59" cy="48" rx="2" ry="1.5" fill="white" opacity="0.2"/>
      <path d="M28,44 L37,40" stroke={BG} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M72,44 L63,40" stroke={BG} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M42,64 Q50,60 58,64 L56,72 Q50,75 44,72Z" fill={BG}/>
      <path d="M50,75 Q43,81 39,78" fill="none" stroke={BG} strokeWidth="2" strokeLinecap="round"/>
      <path d="M50,75 Q57,81 61,78" fill="none" stroke={BG} strokeWidth="2" strokeLinecap="round"/>
      <polygon points="44,32 50,24 56,32 50,40" fill={BG} opacity="0.45"/>
    </svg>
  );
}

// ── EXERCISE CARD ─────────────────────────────────────────────────
function ExCard({ ex, onAdd, onView }) {
  return (
    <div style={{background:CARD,border:`1px solid ${BDR}`,borderRadius:12,padding:'12px 14px',marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}>
      <div style={{flex:1,cursor:'pointer',minWidth:0}} onClick={()=>onView&&onView(ex)}>
        <div style={{fontWeight:700,fontSize:14,color:WHT}}>{ex.pt}</div>
        <div style={{color:GRY,fontSize:12,marginTop:1}}>{ex.en}</div>
        <div style={{color:GOLD,fontSize:11,marginTop:3}}>💪 {ex.muscle||ex.m}</div>
        {onView&&<div style={{color:GRY,fontSize:10,marginTop:4}}>Toque para ver detalhes →</div>}
      </div>
      {onAdd&&(
        <button onClick={e=>{e.stopPropagation();onAdd(ex);}}
          style={{background:GOLD,border:'none',color:'#100A00',padding:'9px 16px',borderRadius:9,fontWeight:800,cursor:'pointer',fontSize:13,whiteSpace:'nowrap',flexShrink:0}}>
          + Add
        </button>
      )}
    </div>
  );
}

// ── SEARCH PANEL ──────────────────────────────────────────────────
function SearchPanel({ q, setQ, searchRes, setSearchRes, onAdd, onView }) {
  const inputRef = useRef(null);
  const list = searchRes || EXDB.map(x=>({pt:x.pt,en:x.en,muscle:x.m}));

  const doSearch = (sq) => {
    if (!sq.trim()) { setSearchRes(null); return; }
    const lq = sq.toLowerCase();
    const res = EXDB.filter(x =>
      x.en.toLowerCase().includes(lq) ||
      x.pt.toLowerCase().includes(lq) ||
      x.m.toLowerCase().includes(lq)
    ).map(x=>({pt:x.pt,en:x.en,muscle:x.m}));
    setSearchRes(res.length ? res : []);
  };

  return (
    <div>
      <div style={{display:'flex',gap:8,marginBottom:14}}>
        <input ref={inputRef} value={q} onChange={e=>{ setQ(e.target.value); doSearch(e.target.value); }}
          onKeyDown={e=>e.key==='Enter'&&doSearch(q)}
          placeholder="Supino, T-Bar Row, Squat, Bíceps..."
          autoFocus
          style={{...inp,flex:1,background:CARD,border:`1px solid ${BDR}`}}/>
        <button onClick={()=>doSearch(q)}
          style={{background:GOLD,border:'none',color:'#100A00',padding:'0 16px',borderRadius:10,fontWeight:800,cursor:'pointer',fontSize:16,flexShrink:0}}>
          🔍
        </button>
      </div>
      {searchRes && searchRes.length === 0 && (
        <div style={{color:GRY,textAlign:'center',padding:24}}>Nenhum exercício encontrado.</div>
      )}
      {list.map((ex,i)=><ExCard key={i} ex={ex} onAdd={onAdd} onView={onView}/>)}
      {searchRes&&(
        <button onClick={()=>{setSearchRes(null);setQ('');}}
          style={{width:'100%',background:'transparent',border:`1px solid ${BDR}`,color:GRY,padding:9,borderRadius:8,cursor:'pointer',fontSize:13,marginTop:4}}>
          ✕ Limpar busca
        </button>
      )}
    </div>
  );
}

// ── EXERCISE DETAIL MODAL ─────────────────────────────────────────
function ExModal({ ex, onClose, onAdd }) {
  const variants = EXDB
    .filter(x => x.m === (ex.muscle||ex.m) && x.en !== ex.en)
    .slice(0,4)
    .map(x=>({pt:x.pt,en:x.en,muscle:x.m}));

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:100,display:'flex',flexDirection:'column',overflow:'hidden'}} onClick={onClose}>
      <div style={{background:CARD,maxWidth:480,width:'100%',margin:'auto',borderRadius:16,maxHeight:'90vh',overflowY:'auto',border:`1px solid ${BDR}`}} onClick={e=>e.stopPropagation()}>
        <div style={{background:CARD2,padding:'14px 16px',display:'flex',justifyContent:'space-between',alignItems:'flex-start',borderRadius:'16px 16px 0 0',position:'sticky',top:0,zIndex:5}}>
          <div>
            <div style={{fontWeight:800,fontSize:17,color:WHT}}>{ex.pt}</div>
            <div style={{color:GRY,fontSize:12,marginTop:2}}>{ex.en}</div>
            <div style={{color:GOLD,fontSize:12,marginTop:4}}>💪 {ex.muscle||ex.m}</div>
          </div>
          <button onClick={onClose} style={{background:'none',border:'none',color:GRY,fontSize:24,cursor:'pointer',lineHeight:1,padding:'0 0 0 12px'}}>✕</button>
        </div>
        <div style={{padding:16}}>
          {variants.length>0&&(
            <div>
              <div style={{color:GOLD,fontWeight:700,fontSize:12,letterSpacing:2,marginBottom:10}}>🔄 VARIANTES DO MESMO MÚSCULO</div>
              {variants.map((v,i)=>(
                <div key={i} style={{background:CARD2,border:`1px solid ${BDR}`,borderRadius:10,padding:'10px 14px',marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:WHT}}>{v.pt}</div>
                    <div style={{color:GRY,fontSize:12}}>{v.en}</div>
                    <div style={{color:GOLD,fontSize:11,marginTop:2}}>💪 {v.muscle}</div>
                  </div>
                  {onAdd&&(
                    <button onClick={()=>onAdd(v)}
                      style={{background:GOLD,border:'none',color:'#100A00',padding:'8px 14px',borderRadius:8,fontWeight:800,cursor:'pointer',fontSize:13,flexShrink:0}}>
                      + Add
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
          {onAdd&&(
            <button onClick={()=>onAdd(ex)}
              style={{width:'100%',background:`linear-gradient(135deg,${GOLD},${GOLD2})`,border:'none',color:'#100A00',padding:14,borderRadius:12,fontSize:15,fontWeight:800,cursor:'pointer',marginTop:12,letterSpacing:1}}>
              + ADICIONAR AO TREINO
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SET CARD WITH TABS ────────────────────────────────────────────
function ExSetCard({ ex, onRemove, onSetVal, onAddSet, onRmSet }) {
  const [activeSet, setActiveSet] = useState(0);
  useEffect(()=>{ if(activeSet>=ex.sets.length) setActiveSet(ex.sets.length-1); },[ex.sets.length]);
  const si = Math.min(activeSet, ex.sets.length-1);
  const s = ex.sets[si];
  return (
    <div style={{background:CARD,border:`1px solid ${BDR}`,borderRadius:14,marginBottom:14,overflow:'hidden'}}>
      <div style={{background:CARD2,padding:'12px 14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div style={{fontWeight:700,fontSize:13,color:WHT}}>{ex.name}</div>
          {ex.muscle&&<div style={{color:GOLD,fontSize:11,marginTop:2}}>💪 {ex.muscle}</div>}
        </div>
        <button onClick={onRemove} style={{background:'none',border:'none',color:RED,fontSize:20,cursor:'pointer',lineHeight:1}}>✕</button>
      </div>
      <div style={{display:'flex',borderBottom:`1px solid ${BDR}`,overflowX:'auto'}}>
        {ex.sets.map((_,i)=>(
          <button key={i} onClick={()=>setActiveSet(i)}
            style={{flex:'0 0 auto',padding:'9px 18px',border:'none',cursor:'pointer',fontWeight:700,fontSize:13,letterSpacing:1,background:i===si?BG:'transparent',color:i===si?GOLD:GRY,borderBottom:i===si?`2px solid ${GOLD}`:'2px solid transparent'}}>
            S{i+1}
          </button>
        ))}
        <button onClick={()=>{onAddSet(ex.id);setActiveSet(ex.sets.length);}} style={{flex:'0 0 auto',padding:'9px 14px',border:'none',background:'transparent',color:GOLD,fontSize:18,cursor:'pointer',lineHeight:1}}>+</button>
        {ex.sets.length>1&&<button onClick={()=>onRmSet(ex.id,ex.sets[si].id)} style={{flex:'0 0 auto',padding:'9px 12px',border:'none',background:'transparent',color:GRY,fontSize:14,cursor:'pointer',marginLeft:'auto'}}>🗑️</button>}
      </div>
      <div style={{padding:'16px 14px',display:'flex',flexDirection:'column',gap:12}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <div>
            <div style={{color:GRY,fontSize:10,fontWeight:700,letterSpacing:2,marginBottom:6}}>REPETIÇÕES</div>
            <input value={s.reps} type="text" inputMode="text" placeholder="ex: 4[6]" onChange={e=>onSetVal(ex.id,s.id,'reps',e.target.value)}
              style={{width:'100%',boxSizing:'border-box',background:CARD2,border:`1px solid ${BDR}`,color:WHT,padding:'14px 10px',borderRadius:10,fontSize:22,fontWeight:700,textAlign:'center',outline:'none'}}/>
          </div>
          <div>
            <div style={{color:GRY,fontSize:10,fontWeight:700,letterSpacing:2,marginBottom:6}}>CARGA (kg)</div>
            <input value={s.weight} type="text" inputMode="text" placeholder="ex: 45" onChange={e=>onSetVal(ex.id,s.id,'weight',e.target.value)}
              style={{width:'100%',boxSizing:'border-box',background:CARD2,border:`1px solid ${BDR}`,color:WHT,padding:'14px 10px',borderRadius:10,fontSize:22,fontWeight:700,textAlign:'center',outline:'none'}}/>
          </div>
        </div>
        <div>
          <div style={{color:GRY,fontSize:10,fontWeight:700,letterSpacing:2,marginBottom:6}}>NOTAS</div>
          <input value={s.notes} placeholder="ex: Drop set, falha, pausa..." onChange={e=>onSetVal(ex.id,s.id,'notes',e.target.value)}
            style={{width:'100%',boxSizing:'border-box',background:CARD2,border:`1px solid ${BDR}`,color:WHT,fontWeight:700,padding:'11px 12px',borderRadius:10,fontSize:13,outline:'none'}}/>
        </div>
        <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:2}}>
          {ex.sets.map((st,i)=>(
            <div key={i} onClick={()=>setActiveSet(i)} style={{background:i===si?CARD2:'transparent',border:`1px solid ${i===si?GOLD:BDR}`,borderRadius:8,padding:'4px 10px',cursor:'pointer',fontSize:11,color:i===si?GOLD:GRY,fontWeight:600}}>
              S{i+1}: {st.weight||'–'}kg × {st.reps||'–'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// MAIN APP
// ═════════════════════════════════════════════════════════════════
export default function App() {
  const [screen,setScreen]=useState('login');
  const [user,setUser]=useState(null);
  const [tab,setTab]=useState('home');
  const [workouts,setWorkouts]=useState([]);
  const [editWk,setEditWk]=useState(null);
  const [searchMode,setSearchMode]=useState(false);
  const [users,setUsers]=useState({});
  const [q,setQ]=useState('');
  const [searchRes,setSearchRes]=useState(null);
  const [email,setEmail]=useState('');
  const [loginErr,setLoginErr]=useState('');
  const [ll,setLl]=useState(false);
  const [pinStep,setPinStep]=useState('');
  const [pinInput,setPinInput]=useState('');
  const [pinInput2,setPinInput2]=useState('');
  const [pinErr,setPinErr]=useState('');
  const [modalEx,setModalEx]=useState(null);

  useEffect(()=>{
    if(!user)return;
    setWorkouts(store.get(`wst:w:${user.email}`)||[]);
    if(user.isAdmin)setUsers(store.get('wst:users')||{});
  },[user]);

  const saveWks=(wks)=>{ setWorkouts(wks); store.set(`wst:w:${user.email}`,wks); };

  const handleLogin=async()=>{
    const e=email.trim().toLowerCase();
    if(!e.includes('@')){setLoginErr('E-mail inválido');return;}
    setLl(true);setLoginErr('');
    if(e===ADMIN){
      const saved=store.get('wst:admin:pin');
      setUser({email:e,isAdmin:true});
      setPinStep(saved?'verify':'set');
      setLl(false);return;
    }
    let usr=store.get('wst:users')||{};
    if(!usr[e])usr[e]={status:'pending',at:new Date().toISOString()};
    store.set('wst:users',usr);
    setUser({email:e,isAdmin:false});
    if(usr[e].status==='approved')setScreen('app');
    else setScreen('pending');
    setLl(false);
  };

  const handleSetPin=()=>{
    if(pinInput.length<4){setPinErr('Mínimo 4 dígitos');return;}
    if(pinInput!==pinInput2){setPinErr('PINs não coincidem');return;}
    store.set('wst:admin:pin',pinInput);
    setPinStep('');setScreen('app');
  };

  const handleVerifyPin=()=>{
    const saved=store.get('wst:admin:pin');
    if(pinInput===saved){setPinStep('');setScreen('app');}
    else setPinErr('PIN incorreto.');
  };

  const approveUser=(e)=>{ const upd={...users,[e]:{...users[e],status:'approved'}}; setUsers(upd); store.set('wst:users',upd); };
  const removeUser=(e)=>{ const upd={...users}; delete upd[e]; setUsers(upd); store.set('wst:users',upd); };

  const addToWorkout=(ex)=>{
    if(!editWk)return;
    setEditWk(w=>({...w,exercises:[...w.exercises,{id:uid(),name:`${ex.pt} / ${ex.en}`,muscle:ex.muscle||ex.m,sets:[{id:uid(),reps:'',weight:'',notes:''}]}]}));
    setModalEx(null);setSearchMode(false);setQ('');setSearchRes(null);
  };

  const exportTXT=(wk)=>{
    let t=`🐺 WOLF SIRIUS TRAINING WORKOUT\n${'='.repeat(40)}\nTreino: ${wk.name}\nData: ${wk.date}\nAluno: ${user.email}\n`;
    if(wk.notes)t+=`Obs: ${wk.notes}\n`;t+='\n';
    wk.exercises.forEach((ex,i)=>{
      t+=`${i+1}. ${ex.name}\nMúsculo: ${ex.muscle||''}\n${'─'.repeat(36)}\nSérie | Reps | Carga (kg) | Notas\n`;
      ex.sets.forEach((s,j)=>t+=`  ${j+1}    |  ${(s.reps||'-').toString().padEnd(3)} |   ${(s.weight||'-').toString().padEnd(6)} | ${s.notes||''}\n`);
      t+='\n';
    });
    const blob=new Blob([t],{type:'text/plain'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download=`treino_${wk.name.replace(/\s+/g,'_')}.txt`;a.click();URL.revokeObjectURL(url);
  };

  const exportPDF=(wk)=>{
    const win=window.open('','_blank');if(!win)return;
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Wolf Sirius</title><style>body{font-family:Arial;max-width:800px;margin:32px auto;color:#111;padding:0 16px}.brand{border-bottom:3px solid #D4A843;padding-bottom:12px;margin-bottom:20px}.meta{background:#f8f5ee;border-left:4px solid #D4A843;padding:10px 16px;margin-bottom:24px;font-size:13px;color:#444}.ex{margin-bottom:24px}table{border-collapse:collapse;width:100%}th{background:#D4A843;color:#fff;padding:8px 12px;text-align:left}td{border:1px solid #ddd;padding:8px 12px}tr:nth-child(even) td{background:#fafafa}.btn{background:#D4A843;color:#fff;border:none;padding:12px 28px;font-size:15px;border-radius:8px;cursor:pointer;margin-top:16px;font-weight:700}@media print{.btn{display:none}}</style></head><body><div class="brand"><h1>🐺 Wolf Sirius Training Workout</h1><h2>${wk.name} — ${wk.date}</h2></div><div class="meta"><b>Aluno:</b> ${user.email}<br><b>Data:</b> ${wk.date}${wk.notes?`<br><b>Obs:</b> ${wk.notes}`:''}</div>${wk.exercises.map((ex,i)=>`<div class="ex"><h3>${i+1}. ${ex.name}</h3><p>💪 ${ex.muscle||''}</p><table><tr><th>Série</th><th>Reps</th><th>Carga (kg)</th><th>Notas</th></tr>${ex.sets.map((s,j)=>`<tr><td>${j+1}</td><td>${s.reps||'–'}</td><td>${s.weight||'–'}</td><td>${s.notes||''}</td></tr>`).join('')}</table></div>`).join('')}<button class="btn" onclick="window.print()">🖨️ Salvar como PDF</button></body></html>`);
    win.document.close();
  };

  const pinScreen=(mode)=>(
    <div style={{minHeight:'100vh',background:BG,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24,gap:20,fontFamily:'system-ui,sans-serif'}}>
      <Wolf size={80}/>
      <div style={{textAlign:'center'}}>
        <div style={{color:GOLD,fontWeight:800,fontSize:20}}>{mode==='set'?'Criar PIN de Admin':'Verificação de Admin'}</div>
        <div style={{color:GRY,fontSize:13,marginTop:6,maxWidth:280,lineHeight:1.6,margin:'6px auto 0'}}>{mode==='set'?'Defina um PIN secreto para proteger seu acesso.':'Digite seu PIN secreto para continuar.'}</div>
      </div>
      <div style={{width:'100%',maxWidth:360,background:CARD,borderRadius:16,padding:24,border:`1px solid ${BDR}`}}>
        {mode==='set'&&<div style={{color:GRY,fontSize:11,fontWeight:700,letterSpacing:2,marginBottom:10}}>NOVO PIN (mín. 4 dígitos)</div>}
        <input value={pinInput} type="password" placeholder="••••••" onChange={e=>setPinInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&(mode==='set'?handleSetPin():handleVerifyPin())} style={{...inp,marginBottom:10,letterSpacing:6,fontSize:22,textAlign:'center'}}/>
        {mode==='set'&&<input value={pinInput2} type="password" placeholder="Confirmar PIN" onChange={e=>setPinInput2(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSetPin()} style={{...inp,marginBottom:12,letterSpacing:6,fontSize:22,textAlign:'center'}}/>}
        {pinErr&&<div style={{color:RED,fontSize:12,marginBottom:8}}>{pinErr}</div>}
        <button onClick={mode==='set'?handleSetPin:handleVerifyPin} style={{width:'100%',background:`linear-gradient(135deg,${GOLD},${GOLD2})`,color:'#100A00',border:'none',padding:14,borderRadius:10,fontSize:15,fontWeight:800,cursor:'pointer'}}>
          {mode==='set'?'🔐 DEFINIR PIN':'🔓 ENTRAR'}
        </button>
      </div>
      <button onClick={()=>{setPinStep('');setPinInput('');setPinInput2('');setPinErr('');setUser(null);setEmail('');}} style={{background:'transparent',border:`1px solid ${BDR}`,color:GRY,padding:'10px 24px',borderRadius:8,cursor:'pointer',fontSize:13}}>← Voltar</button>
    </div>
  );

  if(pinStep==='set')return pinScreen('set');
  if(pinStep==='verify')return pinScreen('verify');

  if(screen==='login')return(
    <div style={{minHeight:'100vh',background:BG,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24,gap:20,fontFamily:'system-ui,sans-serif'}}>
      <Wolf size={100}/>
      <div style={{textAlign:'center'}}>
        <div style={{color:GOLD,fontWeight:900,fontSize:26,letterSpacing:3}}>Wolf Sirius</div>
        <div style={{color:WHT,fontWeight:600,fontSize:13,letterSpacing:2,opacity:0.6}}>TRAINING WORKOUT</div>
      </div>
      <div style={{width:'100%',maxWidth:360,background:CARD,borderRadius:16,padding:24,border:`1px solid ${BDR}`}}>
        <div style={{color:GRY,fontSize:11,fontWeight:700,letterSpacing:2,marginBottom:10}}>ACESSO AO APLICATIVO</div>
        <input value={email} type="email" placeholder="Seu e-mail" onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} style={{...inp,marginBottom:12}}/>
        {loginErr&&<div style={{color:RED,fontSize:12,marginBottom:8}}>{loginErr}</div>}
        <button onClick={handleLogin} disabled={ll} style={{width:'100%',background:`linear-gradient(135deg,${GOLD},${GOLD2})`,color:'#100A00',border:'none',padding:14,borderRadius:10,fontSize:15,fontWeight:800,cursor:'pointer',letterSpacing:1}}>{ll?'Verificando...':'ENTRAR'}</button>
      </div>
      <div style={{color:GRY,fontSize:12,textAlign:'center',maxWidth:280,lineHeight:1.6}}>Acesso restrito. Solicite liberação ao administrador.</div>
    </div>
  );

  if(screen==='pending')return(
    <div style={{minHeight:'100vh',background:BG,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24,gap:20,textAlign:'center',fontFamily:'system-ui,sans-serif',color:WHT}}>
      <Wolf size={80}/>
      <div style={{color:GOLD,fontWeight:800,fontSize:22}}>Aguardando Aprovação</div>
      <div style={{color:GRY,maxWidth:300,lineHeight:1.7}}>Solicitação enviada ao administrador.<br/>Aguarde a liberação do seu acesso.</div>
      <div style={{background:CARD,border:`1px solid ${BDR}`,borderRadius:10,padding:'10px 20px',color:GRY,fontSize:13}}>{user?.email}</div>
      <button onClick={()=>{setScreen('login');setUser(null);setEmail('');}} style={{background:'transparent',border:`1px solid ${BDR}`,color:GRY,padding:'10px 24px',borderRadius:8,cursor:'pointer',fontSize:13}}>← Usar outro e-mail</button>
    </div>
  );

  const TABS=[
    {id:'home',icon:'🏋️',label:'Treinos'},
    {id:'search',icon:'🔍',label:'Buscar'},
    {id:'history',icon:'📋',label:'Histórico'},
    {id:'export',icon:'📤',label:'Exportar'},
    ...(user.isAdmin?[{id:'admin',icon:'⚙️',label:'Admin'}]:[]),
  ];

  return(
    <div style={{background:BG,minHeight:'100vh',maxWidth:480,margin:'0 auto',display:'flex',flexDirection:'column',fontFamily:'system-ui,sans-serif',color:WHT}}>
      {modalEx&&<ExModal ex={modalEx} onClose={()=>setModalEx(null)} onAdd={editWk?addToWorkout:null}/>}

      <div style={{background:CARD,borderBottom:`1px solid ${BDR}`,padding:'10px 16px',display:'flex',alignItems:'center',gap:10,position:'sticky',top:0,zIndex:20}}>
        <Wolf size={38}/>
        <div style={{flex:1}}>
          <div style={{color:GOLD,fontWeight:900,fontSize:13,letterSpacing:2}}>WOLF SIRIUS</div>
          <div style={{color:GRY,fontSize:11,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:220}}>{user.email}</div>
        </div>
        {editWk
          ? searchMode
            ? <button onClick={()=>setSearchMode(false)} style={{background:'none',border:'none',color:GRY,fontSize:13,cursor:'pointer',fontWeight:700}}>← Voltar</button>
            : <button onClick={()=>{setEditWk(null);setSearchMode(false);}} style={{background:'none',border:'none',color:GRY,fontSize:24,cursor:'pointer'}}>✕</button>
          : <button onClick={()=>{setScreen('login');setUser(null);setEmail('');}} style={{background:'none',border:'none',color:GRY,fontSize:12,cursor:'pointer'}}>Sair</button>
        }
      </div>

      <div style={{flex:1,overflowY:'auto',paddingBottom:84}}>
        {editWk&&searchMode&&(
          <div style={{padding:16}}>
            <div style={{color:GOLD,fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:14}}>🔍 ADICIONAR EXERCÍCIO</div>
            <SearchPanel q={q} setQ={setQ} searchRes={searchRes} setSearchRes={setSearchRes} onAdd={addToWorkout} onView={setModalEx}/>
          </div>
        )}

        {editWk&&!searchMode&&(()=>{
          const wk=editWk;
          const upd=(f,v)=>setEditWk({...wk,[f]:v});
          const addSet=(exId)=>setEditWk(w=>({...w,exercises:w.exercises.map(ex=>ex.id===exId?{...ex,sets:[...ex.sets,{id:uid(),reps:'',weight:'',notes:''}]}:ex)}));
          const rmSet=(exId,sId)=>setEditWk(w=>({...w,exercises:w.exercises.map(ex=>ex.id===exId?{...ex,sets:ex.sets.filter(s=>s.id!==sId)}:ex)}));
          const setVal=(exId,sId,f,v)=>setEditWk(w=>({...w,exercises:w.exercises.map(ex=>ex.id===exId?{...ex,sets:ex.sets.map(s=>s.id===sId?{...s,[f]:v}:s)}:ex)}));
          const rmEx=(exId)=>setEditWk(w=>({...w,exercises:w.exercises.filter(e=>e.id!==exId)}));
          const save=async()=>{if(!wk.name.trim()){alert('Dê um nome ao treino!');return;}const without=workouts.filter(w=>w.id!==wk.id);const{isNew,...clean}=wk;saveWks([...without,clean]);setEditWk(null);};
          return(
            <div style={{padding:16}}>
              <input value={wk.name} onChange={e=>upd('name',e.target.value)} placeholder="Nome do treino (ex: Upper A)" style={{...inp,fontSize:16,fontWeight:700,marginBottom:10,background:CARD,border:`1px solid ${BDR}`}}/>
              <input value={wk.date} onChange={e=>upd('date',e.target.value)} type="date" style={{...inp,marginBottom:10,background:CARD,border:`1px solid ${BDR}`}}/>
              <textarea value={wk.notes} onChange={e=>upd('notes',e.target.value)} placeholder="Observações (opcional)" rows={2} style={{...inp,resize:'none',color:WHT,marginBottom:18,background:CARD,border:`1px solid ${BDR}`}}/>
              {wk.exercises.map(ex=>(
                <ExSetCard key={ex.id} ex={ex} onRemove={()=>rmEx(ex.id)} onSetVal={setVal} onAddSet={addSet} onRmSet={rmSet}/>
              ))}
              <button onClick={()=>setSearchMode(true)} style={{width:'100%',background:CARD,border:`1px solid ${GOLD}`,color:GOLD,padding:13,borderRadius:12,fontSize:14,fontWeight:800,cursor:'pointer',marginBottom:10,letterSpacing:1}}>🔍 BUSCAR EXERCÍCIO</button>
              <button onClick={save} style={{width:'100%',background:`linear-gradient(135deg,${GOLD},${GOLD2})`,color:'#100A00',border:'none',padding:14,borderRadius:12,fontSize:15,fontWeight:800,cursor:'pointer',letterSpacing:1}}>💾 SALVAR TREINO</button>
            </div>
          );
        })()}

        {!editWk&&tab==='home'&&(
          <div style={{padding:16}}>
            <button onClick={()=>{setEditWk({id:uid(),name:'',date:new Date().toISOString().split('T')[0],notes:'',exercises:[],isNew:true});setSearchMode(false);}} style={{width:'100%',background:`linear-gradient(135deg,${GOLD},${GOLD2})`,color:'#100A00',border:'none',padding:15,borderRadius:12,fontSize:15,fontWeight:800,cursor:'pointer',letterSpacing:2}}>+ NOVO TREINO</button>
            <div style={{color:GRY,fontSize:11,fontWeight:700,letterSpacing:2,margin:'20px 0 12px'}}>TREINOS RECENTES</div>
            {workouts.length===0&&<div style={{textAlign:'center',color:GRY,padding:48}}><div style={{fontSize:40,marginBottom:12}}>🐺</div>Nenhum treino ainda.</div>}
            {[...workouts].reverse().map(wk=>(
              <div key={wk.id} onClick={()=>{setEditWk({...wk,isNew:false});setSearchMode(false);}} style={{background:CARD,border:`1px solid ${BDR}`,borderRadius:12,padding:14,marginBottom:10,cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.borderColor=GOLD} onMouseLeave={e=>e.currentTarget.style.borderColor=BDR}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                  <div style={{fontWeight:700,fontSize:15}}>{wk.name||'Treino sem nome'}</div>
                  <div style={{color:GRY,fontSize:12,whiteSpace:'nowrap',marginLeft:8}}>{wk.date}</div>
                </div>
                <div style={{color:GRY,fontSize:12,marginTop:4}}>{wk.exercises.length} exercício(s)</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:4,marginTop:8}}>
                  {wk.exercises.slice(0,4).map(e=><span key={e.id} style={{background:CARD2,color:GOLD,fontSize:11,padding:'3px 10px',borderRadius:20}}>{e.muscle||e.name.split('/')[0].trim()}</span>)}
                  {wk.exercises.length>4&&<span style={{color:GRY,fontSize:11,padding:'3px 0'}}>+{wk.exercises.length-4}</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {!editWk&&tab==='search'&&(
          <div style={{padding:16}}>
            <div style={{color:GRY,fontSize:11,fontWeight:700,letterSpacing:2,marginBottom:4}}>BUSCAR EXERCÍCIOS (PT / EN)</div>
            <div style={{color:GRY,fontSize:12,marginBottom:12}}>Toque no card para ver variantes</div>
            <SearchPanel q={q} setQ={setQ} searchRes={searchRes} setSearchRes={setSearchRes} onAdd={null} onView={setModalEx}/>
          </div>
        )}

        {!editWk&&tab==='history'&&(
          <div style={{padding:16}}>
            <div style={{color:GRY,fontSize:11,fontWeight:700,letterSpacing:2,marginBottom:12}}>HISTÓRICO COMPLETO</div>
            {workouts.length===0&&<div style={{color:GRY,textAlign:'center',padding:48}}>Sem treinos no histórico.</div>}
            {[...workouts].reverse().map(wk=>(
              <div key={wk.id} style={{background:CARD,border:`1px solid ${BDR}`,borderRadius:12,marginBottom:12,overflow:'hidden'}}>
                <div style={{background:CARD2,padding:'12px 14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div><div style={{fontWeight:700,fontSize:14}}>{wk.name}</div><div style={{color:GRY,fontSize:12}}>{wk.date}</div></div>
                  <button onClick={()=>{if(window.confirm('Excluir?'))saveWks(workouts.filter(w=>w.id!==wk.id));}} style={{background:'none',border:'none',color:RED,fontSize:18,cursor:'pointer'}}>🗑️</button>
                </div>
                <div style={{padding:'10px 14px'}}>
                  {wk.exercises.map(ex=>(
                    <div key={ex.id} style={{marginBottom:10,paddingBottom:10,borderBottom:`1px solid ${BDR}`}}>
                      <div style={{fontWeight:600,fontSize:13}}>{ex.name}</div>
                      <div style={{color:GRY,fontSize:12,marginTop:4}}>{ex.sets.length} série(s) · {ex.sets.map(s=>`${s.weight||'?'}kg×${s.reps||'?'}`).join(' | ')}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {!editWk&&tab==='export'&&(
          <div style={{padding:16}}>
            <div style={{color:GRY,fontSize:11,fontWeight:700,letterSpacing:2,marginBottom:16}}>EXPORTAR ANOTAÇÕES</div>
            {workouts.length===0&&<div style={{color:GRY,textAlign:'center',padding:48}}>Sem treinos para exportar.</div>}
            {[...workouts].reverse().map(wk=>(
              <div key={wk.id} style={{background:CARD,border:`1px solid ${BDR}`,borderRadius:12,padding:14,marginBottom:10}}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:2}}>{wk.name}</div>
                <div style={{color:GRY,fontSize:12,marginBottom:12}}>{wk.date} · {wk.exercises.length} exercício(s)</div>
                <div style={{display:'flex',gap:8}}>
                  <button onClick={()=>exportTXT(wk)} style={{flex:1,background:CARD2,border:`1px solid ${BDR}`,color:WHT,padding:11,borderRadius:8,fontSize:13,fontWeight:600,cursor:'pointer'}}>📄 TXT</button>
                  <button onClick={()=>exportPDF(wk)} style={{flex:1,background:`linear-gradient(135deg,${GOLD},${GOLD2})`,border:'none',color:'#100A00',padding:11,borderRadius:8,fontSize:13,fontWeight:800,cursor:'pointer'}}>📑 PDF</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!editWk&&tab==='admin'&&(()=>{
          const pending=Object.entries(users).filter(([,u])=>u.status==='pending');
          const approved=Object.entries(users).filter(([,u])=>u.status==='approved');
          return(
            <div style={{padding:16}}>
              <div style={{color:GRY,fontSize:11,fontWeight:700,letterSpacing:2,marginBottom:16}}>PAINEL ADMINISTRATIVO</div>
              <div style={{background:CARD,border:`2px solid ${GOLD}`,borderRadius:12,padding:14,marginBottom:20}}>
                <div style={{color:GOLD,fontWeight:800,fontSize:13}}>👑 Administrador</div>
                <div style={{color:GRY,fontSize:12}}>{user.email}</div>
                <div style={{color:GRN,fontSize:11,marginTop:4}}>● PIN de segurança ativo</div>
              </div>
              <div style={{color:GRY,fontSize:11,fontWeight:700,letterSpacing:2,marginBottom:10}}>PENDENTES ({pending.length})</div>
              {pending.length===0&&<div style={{color:GRY,fontSize:13,marginBottom:20}}>Nenhuma solicitação. ✓</div>}
              {pending.map(([e,u])=>(
                <div key={e} style={{background:CARD,border:`1px solid ${BDR}`,borderRadius:12,padding:14,marginBottom:8}}>
                  <div style={{fontWeight:600,fontSize:14,marginBottom:2}}>{e}</div>
                  <div style={{color:GRY,fontSize:12,marginBottom:10}}>{new Date(u.at).toLocaleDateString('pt-BR')}</div>
                  <div style={{display:'flex',gap:8}}>
                    <button onClick={()=>approveUser(e)} style={{flex:1,background:GRN,border:'none',color:'#fff',padding:10,borderRadius:8,fontWeight:700,cursor:'pointer'}}>✅ Aprovar</button>
                    <button onClick={()=>removeUser(e)} style={{flex:1,background:RED,border:'none',color:'#fff',padding:10,borderRadius:8,fontWeight:700,cursor:'pointer'}}>❌ Rejeitar</button>
                  </div>
                </div>
              ))}
              <div style={{color:GRY,fontSize:11,fontWeight:700,letterSpacing:2,marginBottom:10,marginTop:8}}>ATIVOS ({approved.length})</div>
              {approved.length===0&&<div style={{color:GRY,fontSize:13}}>Nenhum usuário ativo.</div>}
              {approved.map(([e])=>(
                <div key={e} style={{background:CARD,border:`1px solid ${BDR}`,borderRadius:12,padding:14,marginBottom:8,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div><div style={{fontWeight:600,fontSize:13}}>{e}</div><div style={{color:GRN,fontSize:11,marginTop:2}}>● Ativo</div></div>
                  <button onClick={()=>removeUser(e)} style={{background:'transparent',border:`1px solid ${RED}`,color:RED,padding:'7px 12px',borderRadius:8,cursor:'pointer',fontSize:12,fontWeight:700}}>Revogar</button>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {!editWk&&(
        <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:480,background:CARD,borderTop:`1px solid ${BDR}`,display:'flex',zIndex:20}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,background:'none',border:'none',padding:'10px 0 8px',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:2,color:tab===t.id?GOLD:GRY}}>
              <span style={{fontSize:20}}>{t.icon}</span>
              <span style={{fontSize:9,fontWeight:700,letterSpacing:0.5}}>{t.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
