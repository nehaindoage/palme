import { useState, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Raleway:wght@200;300;400;500&display=swap');`;

const SERVICES = [
  { id:1, name:"Swedish Harmony", category:"Massage", duration:"60 min", price:120, desc:"Full-body relaxation with long, flowing strokes to melt tension and restore deep calm.", image:"https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=700&q=80", tag:"Most Loved" },
  { id:2, name:"Deep Tissue Release", category:"Massage", duration:"75 min", price:155, desc:"Targeted therapeutic pressure on chronic muscle tension and deep-seated knots.", image:"https://images.unsplash.com/photo-1591343395082-e120087004b4?w=700&q=80", tag:null },
  { id:3, name:"Hot Stone Ritual", category:"Massage", duration:"90 min", price:190, desc:"Heated basalt stones melt tension as skilled hands guide warmth through every muscle.", image:"https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=700&q=80", tag:"Signature" },
  { id:4, name:"Aromatherapy Journey", category:"Massage", duration:"60 min", price:135, desc:"Curated essential oil blends paired with a deeply nurturing therapeutic touch.", image:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=700&q=80", tag:null },
  { id:5, name:"Luminous Glow Facial", category:"Facial", duration:"60 min", price:110, desc:"Vitamin C brightening, lymphatic drainage, and a radiant complexion revealed.", image:"https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700&q=80", tag:null },
  { id:6, name:"Couples Sanctuary", category:"Couples", duration:"90 min", price:290, desc:"Side-by-side Swedish massage for two, in the intimacy of your own suite.", image:"https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=700&q=80", tag:"For Two" },
];

const PACKAGES = [
  { id:1, title:"Wellness 5-Pack", sub:"Buy 5 sessions, get 1 free", sessions:5, bonus:1, price:550, tag:"Save $120" },
  { id:2, title:"Indulgence 10-Pack", sub:"Buy 10 sessions, get 3 free", sessions:10, bonus:3, price:1050, tag:"Best Value" },
  { id:3, title:"Monthly Ritual", sub:"4 sessions per month, recurring", sessions:4, bonus:0, price:380, tag:"Members" },
];

const SLOTS = ["9:00 AM","10:00 AM","11:30 AM","1:00 PM","2:30 PM","4:00 PM","5:30 PM","7:00 PM"];
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const DATES = [21,22,23,24,25,26,27];
const UNAVAIL = {"Mon-9:00 AM":1,"Wed-2:30 PM":1,"Fri-11:30 AM":1};
const GIFT_AMOUNTS = [50,100,150,200,250,500];

const css = `
${FONTS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --ink:#0D0B09;--warm:#FAF7F2;--gold:#C49A3C;--gold2:#E8C97A;--gold3:#8B6914;
  --stone:#3A3328;--taupe:#7A7060;--muted:#A89F8C;--border:#E5DDD0;--card:#FFFDF8;
}
html{scroll-behavior:smooth}
body{font-family:'Raleway',sans-serif;background:var(--warm);color:var(--ink);overflow-x:hidden}

/* NAV */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:200;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 64px;height:74px;
  background:rgba(250,247,242,0.94);backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(229,221,208,0.7);transition:all .3s;
}
.nav.scrolled{box-shadow:0 2px 40px rgba(0,0,0,.07)}
.logo{font-family:'Playfair Display',serif;font-size:1.45rem;font-weight:300;letter-spacing:.1em;color:var(--ink);cursor:pointer;border:none;background:none}
.logo em{font-style:italic;color:var(--gold3)}
.nav-links{display:flex;align-items:center;gap:38px}
.nl{
  font-size:.68rem;letter-spacing:.22em;text-transform:uppercase;color:var(--taupe);
  border:none;background:none;cursor:pointer;padding-bottom:2px;position:relative;transition:color .2s;
}
.nl::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--gold);transition:width .3s}
.nl:hover,.nl.on{color:var(--ink)}
.nl:hover::after,.nl.on::after{width:100%}
.nav-right{display:flex;gap:12px}
.btn-ghost{
  background:none;color:var(--taupe);border:1px solid var(--border);padding:9px 22px;
  font-family:'Raleway',sans-serif;font-size:.68rem;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:all .2s;
}
.btn-ghost:hover{border-color:var(--gold);color:var(--gold3)}
.btn-ink{
  background:var(--ink);color:var(--gold2);border:none;padding:10px 26px;
  font-family:'Raleway',sans-serif;font-size:.68rem;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:all .25s;
}
.btn-ink:hover{background:var(--gold3);color:#fff;transform:translateY(-1px)}

/* HERO */
.hero{position:relative;width:100%;height:100vh;min-height:580px;overflow:hidden;margin-top:74px}
.hero-img{width:100%;height:100%;object-fit:cover;object-position:center 30%;filter:brightness(.68);transform:scale(1.05);animation:hzoom 14s ease-out forwards}
@keyframes hzoom{to{transform:scale(1)}}
.hero-ov{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(13,11,9,.05) 0%,rgba(13,11,9,.22) 55%,rgba(13,11,9,.75) 100%)}
.hero-body{
  position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;padding:0 24px;animation:fup .9s .25s both;
}
@keyframes fup{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.hero-eyebrow{
  font-size:.62rem;letter-spacing:.42em;text-transform:uppercase;color:var(--gold2);
  margin-bottom:24px;display:flex;align-items:center;gap:18px;
}
.hero-eyebrow::before,.hero-eyebrow::after{content:'';width:44px;height:1px;background:rgba(232,201,122,.5)}
.hero-h1{
  font-family:'Playfair Display',serif;font-size:clamp(3rem,7.5vw,7.5rem);
  font-weight:300;line-height:1.04;color:#fff;margin-bottom:20px;letter-spacing:.01em;
}
.hero-h1 em{font-style:italic;color:var(--gold2)}
.hero-p{
  font-size:.9rem;font-weight:300;color:rgba(255,255,255,.68);letter-spacing:.06em;
  line-height:1.85;max-width:500px;margin-bottom:46px;
}
.hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.hero-btn-a{
  background:var(--gold);color:var(--ink);border:none;padding:15px 42px;
  font-family:'Raleway',sans-serif;font-size:.7rem;letter-spacing:.24em;text-transform:uppercase;
  cursor:pointer;font-weight:500;transition:all .28s;
}
.hero-btn-a:hover{background:var(--gold2);transform:translateY(-2px);box-shadow:0 12px 32px rgba(196,154,60,.45)}
.hero-btn-b{
  background:transparent;color:#fff;border:1px solid rgba(255,255,255,.4);padding:14px 38px;
  font-family:'Raleway',sans-serif;font-size:.7rem;letter-spacing:.24em;text-transform:uppercase;cursor:pointer;transition:all .25s;
}
.hero-btn-b:hover{border-color:var(--gold2);color:var(--gold2)}
.hero-stats{
  position:absolute;bottom:48px;left:0;right:0;
  display:flex;justify-content:center;gap:64px;
  animation:fup .9s .55s both;
}
.hst{display:flex;flex-direction:column;align-items:center;gap:4px}
.hst-n{font-family:'Playfair Display',serif;font-size:1.9rem;font-weight:300;color:var(--gold2)}
.hst-l{font-size:.58rem;letter-spacing:.25em;text-transform:uppercase;color:rgba(255,255,255,.45)}
.hero-scroll-hint{
  position:absolute;bottom:48px;right:64px;
  display:flex;flex-direction:column;align-items:center;gap:8px;
  color:rgba(255,255,255,.35);font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;
}
.scroll-ln{width:1px;height:48px;background:linear-gradient(to bottom,rgba(255,255,255,.4),transparent);animation:sp 2s infinite}
@keyframes sp{0%,100%{opacity:.4}50%{opacity:1}}

/* SECTION */
.sec{padding:96px 64px}
.sec-dark{background:var(--ink)}
.sec-hd{text-align:center;margin-bottom:60px}
.eyebrow{
  display:inline-flex;align-items:center;gap:14px;
  font-size:.6rem;letter-spacing:.38em;text-transform:uppercase;color:var(--gold);margin-bottom:16px;
}
.eyebrow::before,.eyebrow::after{content:'';width:26px;height:1px;background:rgba(196,154,60,.45)}
.sec-title{font-family:'Playfair Display',serif;font-size:clamp(2.1rem,4vw,3.4rem);font-weight:300;line-height:1.1;color:var(--ink)}
.sec-dark .sec-title{color:#fff}
.sec-title em{font-style:italic;color:var(--gold3)}
.sec-dark .sec-title em{color:var(--gold2)}
.sec-sub{margin-top:13px;font-size:.86rem;font-weight:300;color:var(--taupe);line-height:1.8;max-width:480px;margin-left:auto;margin-right:auto}
.sec-dark .sec-sub{color:rgba(255,255,255,.4)}

/* FILTER */
.filter-bar{display:flex;justify-content:center;gap:8px;margin-bottom:50px;flex-wrap:wrap}
.fb{
  padding:9px 24px;border:1px solid var(--border);background:none;
  font-family:'Raleway',sans-serif;font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;
  color:var(--taupe);cursor:pointer;transition:all .2s;
}
.fb.on{background:var(--ink);border-color:var(--ink);color:var(--gold2)}
.fb:hover:not(.on){border-color:var(--gold);color:var(--gold3)}

/* SERVICE CARDS — premium dark hover */
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:3px}
.svc-card{position:relative;overflow:hidden;cursor:pointer;aspect-ratio:.78;background:#0a0806}
.svc-img{
  width:100%;height:100%;object-fit:cover;display:block;
  filter:brightness(.6) saturate(1.1);
  transition:transform .8s cubic-bezier(.22,.61,.36,1),filter .5s;
}
.svc-card:hover .svc-img{transform:scale(1.09);filter:brightness(.28) saturate(.9)}
.svc-gradient{
  position:absolute;inset:0;
  background:linear-gradient(to top,rgba(0,0,0,.88) 0%,rgba(0,0,0,.18) 55%,transparent 100%);
  transition:opacity .4s;
}
.svc-card:hover .svc-gradient{opacity:.6}
.svc-body{position:absolute;inset:0;padding:28px 28px 32px;display:flex;flex-direction:column;justify-content:flex-end}
.svc-tag-badge{
  position:absolute;top:22px;left:22px;
  background:var(--gold);color:var(--ink);
  font-size:.56rem;letter-spacing:.18em;text-transform:uppercase;
  padding:5px 14px;font-weight:600;
}
.svc-cat{font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:7px}
.svc-name{
  font-family:'Playfair Display',serif;font-size:1.55rem;font-weight:300;
  color:#fff;line-height:1.12;margin-bottom:0;
}
.svc-desc{
  font-size:.76rem;font-weight:300;color:rgba(255,255,255,0);line-height:1.72;
  max-height:0;overflow:hidden;
  transition:color .5s,max-height .5s cubic-bezier(.25,.46,.45,.94),margin .4s;
}
.svc-card:hover .svc-desc{color:rgba(255,255,255,.68);max-height:100px;margin-top:10px}
.svc-meta{
  display:flex;justify-content:space-between;align-items:center;
  padding-top:16px;border-top:1px solid rgba(255,255,255,.14);margin-top:16px;
  transition:opacity .35s;
}
.svc-card:hover .svc-meta{opacity:0}
.svc-dur{font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.38)}
.svc-price{font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:300;color:var(--gold2)}
.svc-price sup{font-size:.8rem;font-family:'Raleway',sans-serif;color:rgba(255,255,255,.3)}
.svc-book{
  position:absolute;bottom:32px;left:28px;right:28px;
  background:var(--gold);color:var(--ink);border:none;
  padding:13px;font-family:'Raleway',sans-serif;
  font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;
  cursor:pointer;font-weight:600;
  opacity:0;transform:translateY(12px);
  transition:opacity .4s .05s,transform .4s .05s;
}
.svc-card:hover .svc-book{opacity:1;transform:translateY(0)}
.svc-book:hover{background:var(--gold2)}

/* TRUST STRIP */
.trust-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:48px;max-width:840px;margin:0 auto}
.trust-item{display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center}
.trust-icon{font-size:1.3rem;color:var(--gold);opacity:.75}
.trust-name{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:300;color:#fff}
.trust-desc{font-size:.76rem;font-weight:300;color:rgba(255,255,255,.38);line-height:1.7}

/* BOOKING */
.bk-wrap{display:grid;grid-template-columns:1fr 360px;gap:28px;align-items:start}
.panel{background:var(--card);border:1px solid var(--border);padding:34px;margin-bottom:18px}
.p-lbl{
  font-size:.62rem;letter-spacing:.26em;text-transform:uppercase;color:var(--muted);margin-bottom:18px;
  display:flex;align-items:center;gap:10px;
}
.p-lbl::after{content:'';flex:1;height:1px;background:var(--border)}
.req-pill{background:#FFF3E0;color:#BF360C;font-size:.56rem;padding:3px 10px;letter-spacing:.1em}

/* chips */
.chips{display:flex;gap:8px;flex-wrap:wrap}
.chip{
  padding:8px 18px;border:1px solid var(--border);background:none;
  font-family:'Raleway',sans-serif;font-size:.7rem;color:var(--taupe);
  cursor:pointer;transition:all .2s;letter-spacing:.06em;
}
.chip.on{background:var(--ink);border-color:var(--ink);color:var(--gold2)}
.chip:hover:not(.on){border-color:var(--gold);color:var(--gold3)}

/* calendar */
.cal-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}
.cal-month{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:400;color:var(--ink)}
.cal-nav{display:flex;gap:8px}
.cal-n{
  width:30px;height:30px;border:1px solid var(--border);background:none;
  cursor:pointer;color:var(--taupe);font-size:.9rem;transition:all .2s;display:flex;align-items:center;justify-content:center;
}
.cal-n:hover{background:var(--ink);color:var(--gold2);border-color:var(--ink)}
.cal-g{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
.cal-dl{font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-align:center;padding-bottom:8px}
.cal-d{aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:.8rem;cursor:pointer;transition:all .2s;color:var(--stone);position:relative}
.cal-d:hover{background:var(--border)}
.cal-d.on{background:var(--ink);color:var(--gold2)}
.cal-d.today::after{content:'';position:absolute;bottom:4px;width:3px;height:3px;border-radius:50%;background:var(--gold)}

/* slots */
.slots{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.slot{
  padding:10px;border:1px solid var(--border);background:none;
  font-family:'Raleway',sans-serif;font-size:.7rem;color:var(--stone);
  cursor:pointer;transition:all .2s;text-align:center;letter-spacing:.04em;
}
.slot:hover:not(.off){border-color:var(--gold);color:var(--gold3)}
.slot.on{background:var(--ink);border-color:var(--ink);color:var(--gold2)}
.slot.off{background:var(--warm);color:var(--border);cursor:not-allowed;text-decoration:line-through}

/* gender */
.gen-g{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.gen-btn{
  padding:20px;border:1.5px solid var(--border);background:none;
  cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:7px;transition:all .25s;
}
.gen-btn.on{border-color:var(--ink);background:var(--ink)}
.gen-btn:not(.on):hover{border-color:var(--gold)}
.gen-icon{font-size:1.5rem}
.gen-txt{font-family:'Raleway',sans-serif;font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;color:var(--taupe)}
.gen-btn.on .gen-txt{color:var(--gold2)}

/* location */
.loc-pills{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}
.loc-pill{
  display:flex;align-items:center;gap:6px;padding:8px 16px;
  border:1px solid var(--border);background:none;
  font-family:'Raleway',sans-serif;font-size:.66rem;color:var(--taupe);
  cursor:pointer;transition:all .2s;letter-spacing:.08em;
}
.loc-pill.on{background:var(--ink);border-color:var(--ink);color:var(--gold2)}
.loc-row{display:flex;gap:8px}
.loc-inp{
  flex:1;padding:12px 16px;border:1px solid var(--border);background:var(--warm);
  font-family:'Raleway',sans-serif;font-size:.82rem;color:var(--ink);outline:none;transition:border-color .2s;
}
.loc-inp:focus{border-color:var(--gold)}
.pin-btn{padding:12px 16px;background:var(--warm);border:1px solid var(--border);cursor:pointer;font-size:1.1rem;transition:all .2s}
.pin-btn:hover{background:var(--gold2);border-color:var(--gold)}

/* summary */
.sum{background:var(--ink);padding:36px 28px;position:sticky;top:94px}
.sum-ttl{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:300;color:var(--gold2);letter-spacing:.06em;margin-bottom:26px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,.07)}
.sum-row{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:11px;font-size:.78rem}
.sl{color:rgba(255,255,255,.38);font-weight:300}
.sv{color:rgba(255,255,255,.82);text-align:right;max-width:56%}
.sum-div{height:1px;background:rgba(255,255,255,.07);margin:16px 0}
.sum-tot{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:20px}
.sum-tl{font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.3)}
.sum-tv{font-family:'Playfair Display',serif;font-size:2rem;font-weight:300;color:var(--gold2)}
.v-row{display:flex;gap:8px;margin-bottom:14px}
.v-inp{
  flex:1;padding:10px 14px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);
  color:#fff;font-family:'Raleway',sans-serif;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;outline:none;
}
.v-inp::placeholder{color:rgba(255,255,255,.18)}
.v-btn{
  padding:10px 16px;background:rgba(196,154,60,.14);border:1px solid var(--gold);
  color:var(--gold2);font-family:'Raleway',sans-serif;font-size:.62rem;letter-spacing:.15em;text-transform:uppercase;cursor:pointer;transition:all .2s;
}
.v-btn:hover{background:rgba(196,154,60,.3)}
.v-ok{background:rgba(196,154,60,.09);border:1px solid rgba(196,154,60,.22);padding:10px 14px;margin-bottom:14px;display:flex;justify-content:space-between;font-size:.74rem;color:var(--gold2)}
.cfm-btn{
  width:100%;padding:15px;background:linear-gradient(135deg,var(--gold3),var(--gold));
  border:none;color:#fff;font-family:'Raleway',sans-serif;font-size:.7rem;letter-spacing:.22em;text-transform:uppercase;cursor:pointer;transition:all .28s;font-weight:500;
}
.cfm-btn:hover{transform:translateY(-1px);box-shadow:0 8px 26px rgba(196,154,60,.45)}
.sum-note{text-align:center;margin-top:14px;font-size:.6rem;color:rgba(255,255,255,.18);letter-spacing:.08em}

/* PACKAGES */
.pkg-g{display:grid;grid-template-columns:repeat(3,1fr);gap:3px}
.pkg{background:var(--card);border:1px solid var(--border);padding:44px 34px;position:relative;cursor:pointer;transition:all .3s}
.pkg:hover{transform:translateY(-4px);box-shadow:0 22px 60px rgba(0,0,0,.11)}
.pkg.feat{background:var(--ink);border-color:var(--gold)}
.pkg-bdg{position:absolute;top:22px;right:22px;background:var(--gold);color:var(--ink);font-size:.56rem;letter-spacing:.16em;text-transform:uppercase;padding:5px 14px;font-weight:600}
.pkg-name{font-family:'Playfair Display',serif;font-size:1.45rem;font-weight:300;margin-bottom:6px}
.pkg.feat .pkg-name{color:#fff}
.pkg-sub{font-size:.76rem;color:var(--taupe);font-weight:300;margin-bottom:30px}
.pkg.feat .pkg-sub{color:rgba(255,255,255,.38)}
.pkg-num{font-family:'Playfair Display',serif;font-size:3.8rem;font-weight:300;line-height:1;color:var(--gold)}
.pkg-sw{display:flex;align-items:baseline;gap:7px;margin-bottom:7px}
.pkg-sl{font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--taupe)}
.pkg.feat .pkg-sl{color:rgba(255,255,255,.38)}
.pkg-bonus{font-size:.76rem;color:var(--gold);margin-bottom:30px}
.pkg-ft{display:flex;justify-content:space-between;align-items:center;padding-top:22px;border-top:1px solid var(--border)}
.pkg.feat .pkg-ft{border-color:rgba(255,255,255,.07)}
.pkg-price{font-family:'Playfair Display',serif;font-size:1.9rem;font-weight:300}
.pkg.feat .pkg-price{color:var(--gold2)}
.pkg-cta{padding:10px 20px;border:1px solid var(--border);background:none;font-family:'Raleway',sans-serif;font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:all .2s;color:var(--stone)}
.pkg.feat .pkg-cta{background:var(--gold);border-color:var(--gold);color:var(--ink);font-weight:600}
.pkg-cta:hover{opacity:.8}
.cred-strip{margin-top:38px;background:var(--warm);border:1px solid var(--border);padding:34px 46px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:22px}
.cred-ey{font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:var(--gold);margin-bottom:7px}
.cred-num{font-family:'Playfair Display',serif;font-size:2.3rem;font-weight:300;color:var(--ink)}
.cred-num span{font-size:.82rem;font-family:'Raleway',sans-serif;color:var(--taupe);margin-left:7px}
.cred-pills{display:flex;gap:12px;flex-wrap:wrap}
.cred-p{background:#fff;border:1px solid var(--border);padding:14px 20px;display:flex;flex-direction:column;gap:4px}
.cred-pl{font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
.cred-pv{font-family:'Playfair Display',serif;font-size:.98rem;color:var(--ink)}

/* GIFT */
.gift-wrap{display:grid;grid-template-columns:1fr 390px;gap:44px;align-items:start}
.gc-card{
  background:linear-gradient(135deg,#0D0B09 0%,#1E1A12 50%,#0D0B09 100%);
  padding:46px 42px;aspect-ratio:1.62;display:flex;flex-direction:column;
  justify-content:space-between;position:relative;overflow:hidden;margin-bottom:24px;
}
.gc-card::before{content:'';position:absolute;top:-80px;right:-80px;width:250px;height:250px;border-radius:50%;border:1px solid rgba(196,154,60,.15)}
.gc-card::after{content:'';position:absolute;bottom:-60px;left:-60px;width:190px;height:190px;border-radius:50%;border:1px solid rgba(196,154,60,.1)}
.gc-brand{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:300;letter-spacing:.2em;color:var(--gold2)}
.gc-amt{font-family:'Playfair Display',serif;font-size:4.2rem;font-weight:300;color:var(--gold);text-align:center}
.gc-ft{display:flex;justify-content:space-between;align-items:flex-end}
.gc-code{font-size:.62rem;letter-spacing:.28em;color:rgba(255,255,255,.22);text-transform:uppercase}
.gc-valid{font-size:.66rem;color:rgba(255,255,255,.3)}
.gf-lbl{display:block;font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:11px}
.amt-g{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:22px}
.amt-btn{padding:13px;border:1px solid var(--border);background:none;font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:300;color:var(--ink);cursor:pointer;transition:all .2s;text-align:center}
.amt-btn.on{border-color:var(--gold);background:#FFFBF2;color:var(--gold3)}
.g-inp{width:100%;padding:12px 16px;border:1px solid var(--border);background:var(--warm);font-family:'Raleway',sans-serif;font-size:.82rem;color:var(--ink);outline:none;transition:border-color .2s;margin-bottom:11px}
.g-inp:focus{border-color:var(--gold)}
.g-ta{width:100%;padding:12px 16px;border:1px solid var(--border);background:var(--warm);font-family:'Raleway',sans-serif;font-size:.82rem;color:var(--ink);outline:none;transition:border-color .2s;margin-bottom:11px;resize:none;line-height:1.6}
.g-ta:focus{border-color:var(--gold)}
.g-sum{background:var(--warm);border:1px solid var(--border);padding:20px 22px;margin:16px 0;display:flex;justify-content:space-between;align-items:center}
.g-sum-l{font-size:.74rem;color:var(--taupe);font-weight:300}
.g-sum-v{font-family:'Playfair Display',serif;font-size:1.55rem;font-weight:300;color:var(--ink)}
.g-buy{width:100%;padding:15px;background:var(--ink);color:var(--gold2);border:none;font-family:'Raleway',sans-serif;font-size:.7rem;letter-spacing:.22em;text-transform:uppercase;cursor:pointer;transition:all .28s;margin-bottom:12px;font-weight:500}
.g-buy:hover{background:var(--gold3);color:#fff;transform:translateY(-1px)}
.g-share{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.g-sh{padding:12px;border:1px solid var(--border);background:none;font-family:'Raleway',sans-serif;font-size:.66rem;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .2s;color:var(--taupe)}
.g-sh:hover{border-color:var(--gold);color:var(--gold3)}
.redeem{background:var(--warm);border:1px solid var(--border);padding:22px;margin-top:18px}
.redeem-l{display:block;font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:13px}
.redeem-row{display:flex;gap:8px}
.redeem-inp{flex:1;padding:12px 16px;border:1px solid var(--border);background:#fff;font-family:'Raleway',sans-serif;font-size:.78rem;color:var(--ink);outline:none;transition:border-color .2s}
.redeem-inp:focus{border-color:var(--gold)}
.redeem-btn{padding:12px 20px;background:var(--ink);color:var(--gold2);border:none;font-family:'Raleway',sans-serif;font-size:.62rem;letter-spacing:.15em;text-transform:uppercase;cursor:pointer;transition:all .2s}
.redeem-btn:hover{background:var(--gold3);color:#fff}

/* TOAST */
.toast{position:fixed;bottom:30px;right:30px;z-index:999;background:var(--ink);color:var(--gold2);padding:15px 22px;font-size:.78rem;letter-spacing:.06em;box-shadow:0 18px 50px rgba(0,0,0,.35);border-left:3px solid var(--gold);animation:tin .3s ease}
@keyframes tin{from{transform:translateX(80px);opacity:0}to{transform:translateX(0);opacity:1}}

footer{background:var(--ink);color:rgba(255,255,255,.22);text-align:center;padding:28px 64px;font-size:.62rem;letter-spacing:.16em;text-transform:uppercase}
footer em{color:var(--gold);font-style:normal}

@media(max-width:960px){
  .nav{padding:0 24px}
  .nav-links{display:none}
  .sec{padding:72px 24px}
  .svc-grid{grid-template-columns:1fr 1fr}
  .bk-wrap{grid-template-columns:1fr}
  .pkg-g{grid-template-columns:1fr}
  .gift-wrap{grid-template-columns:1fr}
  .hero-stats{gap:30px}
}
@media(max-width:600px){
  .svc-grid{grid-template-columns:1fr}
  .slots{grid-template-columns:repeat(2,1fr)}
}
`;

export default function App() {
  const [tab, setTab] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [svcFilter, setSvcFilter] = useState("All");
  const [selSvc, setSelSvc] = useState(null);
  const [selDay, setSelDay] = useState(null);
  const [selSlot, setSelSlot] = useState(null);
  const [gender, setGender] = useState(null);
  const [loc, setLoc] = useState("Home");
  const [addr, setAddr] = useState("23 Palm Garden Residences, Dubai");
  const [voucher, setVoucher] = useState("");
  const [vApplied, setVApplied] = useState(false);
  const [giftAmt, setGiftAmt] = useState(100);
  const [rName, setRName] = useState("");
  const [rEmail, setREmail] = useState("");
  const [toast, setToast] = useState(null);
  const [giftCode] = useState("SRN-" + Math.random().toString(36).slice(2,8).toUpperCase());

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3200); };
  const cats = ["All", ...Array.from(new Set(SERVICES.map(s => s.category)))];
  const filtered = svcFilter === "All" ? SERVICES : SERVICES.filter(s => s.category === svcFilter);
  const price = selSvc?.price || 0;
  const total = price - (vApplied ? 25 : 0);

  const go = (t) => { setTab(t); window.scrollTo({ top:0, behavior:"smooth" }); };

  return (
    <>
      <style>{css}</style>

      {/* ── NAV ── */}
      <nav className={`nav${scrolled?" scrolled":""}`}>
        <button className="logo" onClick={() => go("home")}>Séréni<em>té</em></button>
        <div className="nav-links">
          {[["home","Home"],["booking","Book"],["packages","Packages"],["gift","Gift Cards"]].map(([k,l]) => (
            <button key={k} className={`nl${tab===k?" on":""}`} onClick={() => go(k)}>{l}</button>
          ))}
        </div>
        <div className="nav-right">
          <button className="btn-ghost">Sign In</button>
          <button className="btn-ink" onClick={() => go("booking")}>Book Now</button>
        </div>
      </nav>

      {/* ══ HOME ══ */}
      {tab === "home" && <>
        {/* HERO — full-width spa image */}
        <div className="hero">
          <img className="hero-img"
            src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920&q=90"
            alt="Luxury spa treatment room" />
          <div className="hero-ov" />
          <div className="hero-body">
            <div className="hero-eyebrow">Premium Mobile Wellness</div>
            <h1 className="hero-h1">Where <em>Serenity</em><br />Finds You</h1>
            <p className="hero-p">Premium therapists arrive at your villa, hotel, or residence.<br />Handpicked specialists. Curated rituals. Effortless luxury.</p>
            <div className="hero-btns">
              <button className="hero-btn-a" onClick={() => go("booking")}>Reserve a Session</button>
              <button className="hero-btn-b" onClick={() => document.getElementById("svc-sec")?.scrollIntoView({behavior:"smooth"})}>
                Explore Treatments
              </button>
            </div>
          </div>
          <div className="hero-stats">
            <div className="hst"><span className="hst-n">4.9★</span><span className="hst-l">Client Rating</span></div>
            <div className="hst"><span className="hst-n">120+</span><span className="hst-l">Therapists</span></div>
            <div className="hst"><span className="hst-n">8K+</span><span className="hst-l">Sessions</span></div>
          </div>
          {/* <div className="hero-scroll-hint">
            <div className="scroll-ln" />
            <span>Scroll</span>
          </div> */}
        </div>

        {/* SERVICES */}
        <section className="sec" id="svc-sec">
          <div className="sec-hd">
            <div className="eyebrow">Our Treatments</div>
            <h2 className="sec-title">Curated <em>Rituals</em></h2>
            <p className="sec-sub">Each session is performed by vetted specialists who arrive fully equipped to your chosen location.</p>
          </div>
          {/* <div className="filter-bar">
            {cats.map(c => (
              <button key={c} className={`fb${svcFilter===c?" on":""}`} onClick={() => setSvcFilter(c)}>{c}</button>
            ))}
          </div> */}
          <div className="svc-grid">
            {filtered.map(s => (
              <div key={s.id} className="svc-card" onClick={() => { setSelSvc(s); go("booking"); }}>
                <img className="svc-img" src={s.image} alt={s.name} />
                <div className="svc-gradient" />
                {s.tag && <div className="svc-tag-badge">{s.tag}</div>}
                <div className="svc-body">
                  <div className="svc-cat">{s.category}</div>
                  <div className="svc-name">{s.name}</div>
                  <div className="svc-desc">{s.desc}</div>
                  <div className="svc-meta">
                    <span className="svc-dur">⏱ {s.duration}</span>
                    <span className="svc-price">${s.price}<sup>/session</sup></span>
                  </div>
                  <button className="svc-book">Book This Treatment</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST */}
        <section className="sec sec-dark" style={{padding:"80px 64px",textAlign:"center"}}>
          <div className="eyebrow">The Sérénité Promise</div>
          <h2 className="sec-title" style={{marginBottom:"52px"}}>Luxury <em>Delivered</em></h2>
          <div className="trust-grid">
            {[["✦","Vetted Therapists","Every specialist undergoes rigorous background checks and skill assessments before joining our roster."],
              ["◈","Your Space","We arrive fully equipped. Your environment, your comfort, your sanctuary — always."],
              ["❧","Guaranteed Bliss","Not completely satisfied? We return or refund — no questions asked, every time."]].map(([ic,n,d]) => (
              <div key={n} className="trust-item">
                <div className="trust-icon">{ic}</div>
                <div className="trust-name">{n}</div>
                <div className="trust-desc">{d}</div>
              </div>
            ))}
          </div>
        </section>
      </>}

      {/* ══ BOOKING ══ */}
      {tab === "booking" && (
        <div className="sec" style={{paddingTop:"118px"}}>
          <div className="sec-hd">
            <div className="eyebrow">Reserve Your Session</div>
            <h2 className="sec-title">Book a <em>Treatment</em></h2>
          </div>
          <div className="bk-wrap">
            <div>
              <div className="panel">
                <div className="p-lbl">Select Treatment</div>
                <div className="chips">
                  {SERVICES.map(s => (
                    <button key={s.id} className={`chip${selSvc?.id===s.id?" on":""}`} onClick={() => setSelSvc(s)}>{s.name}</button>
                  ))}
                </div>
              </div>

              <div className="panel">
                <div className="p-lbl">Choose Date</div>
                <div className="cal-hd">
                  <div className="cal-month">April 2026</div>
                  <div className="cal-nav">
                    <button className="cal-n">‹</button>
                    <button className="cal-n">›</button>
                  </div>
                </div>
                <div className="cal-g">
                  {DAYS.map(d => <div key={d} className="cal-dl">{d}</div>)}
                  {[...Array(6)].map((_,i) => <div key={`e${i}`}/>)}
                  {DATES.map((d,i) => (
                    <div key={d} className={`cal-d${selDay===i?" on":""}${i===0?" today":""}`} onClick={() => setSelDay(i)}>{d}</div>
                  ))}
                </div>
              </div>

              {selDay !== null && (
                <div className="panel">
                  <div className="p-lbl">Available Times — {DAYS[selDay]}, Apr {DATES[selDay]}</div>
                  <div className="slots">
                    {SLOTS.map(s => {
                      const unavail = UNAVAIL[`${DAYS[selDay]}-${s}`];
                      return <button key={s} className={`slot${unavail?" off":""}${selSlot===s&&!unavail?" on":""}`} onClick={() => !unavail && setSelSlot(s)}>{s}</button>;
                    })}
                  </div>
                </div>
              )}

              <div className="panel">
                <div className="p-lbl">Therapist Preference <span className="req-pill">Required</span></div>
                <div className="gen-g">
                  {[["♂","Male","male"],["♀","Female","female"]].map(([ic,l,v]) => (
                    <button key={v} className={`gen-btn${gender===v?" on":""}`} onClick={() => setGender(v)}>
                      <span className="gen-icon">{ic}</span>
                      <span className="gen-txt">{l} Therapist</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="panel">
                <div className="p-lbl">Service Location</div>
                <div className="loc-pills">
                  {[["🏠","Home"],["🏢","Office"],["💪","Gym"],["🏨","Hotel"]].map(([ic,l]) => (
                    <button key={l} className={`loc-pill${loc===l?" on":""}`} onClick={() => setLoc(l)}>{ic} {l}</button>
                  ))}
                </div>
                <div className="loc-row">
                  <input className="loc-inp" value={addr} onChange={e=>setAddr(e.target.value)} placeholder="Enter your address..." />
                  <button className="pin-btn" onClick={() => showToast("📍 Map opened — drop your pin")}>📍</button>
                </div>
              </div>
            </div>

            <div className="sum">
              <div className="sum-ttl">Booking Summary</div>
              <div className="sum-row"><span className="sl">Treatment</span><span className="sv">{selSvc?.name||"—"}</span></div>
              <div className="sum-row"><span className="sl">Duration</span><span className="sv">{selSvc?.duration||"—"}</span></div>
              <div className="sum-row"><span className="sl">Date</span><span className="sv">{selDay!==null?`${DAYS[selDay]}, Apr ${DATES[selDay]}`:"—"}</span></div>
              <div className="sum-row"><span className="sl">Time</span><span className="sv">{selSlot||"—"}</span></div>
              <div className="sum-row"><span className="sl">Therapist</span><span className="sv">{gender?`${gender[0].toUpperCase()+gender.slice(1)} Preferred`:"—"}</span></div>
              <div className="sum-row"><span className="sl">Location</span><span className="sv">{loc}</span></div>
              <div className="sum-div"/>
              <div className="sum-row"><span className="sl">Subtotal</span><span className="sv">${price}</span></div>
              {vApplied && <div className="sum-row"><span className="sl">Gift Card (SEREN25)</span><span style={{color:"var(--gold2)"}}>−$25</span></div>}
              <div className="sum-div"/>
              <div className="sum-tot">
                <span className="sum-tl">Total</span>
                <span className="sum-tv">${total}</span>
              </div>
              {!vApplied ? (
                <div className="v-row">
                  <input className="v-inp" placeholder="Voucher / gift code" value={voucher} onChange={e=>setVoucher(e.target.value.toUpperCase())}/>
                  <button className="v-btn" onClick={() => {
                    if(voucher==="SEREN25"){setVApplied(true);showToast("✓ Voucher applied — $25 off")}
                    else showToast("Invalid voucher code");
                  }}>Apply</button>
                </div>
              ) : (
                <div className="v-ok">
                  <span>✓ SEREN25 applied</span>
                  <button onClick={()=>setVApplied(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,.3)",cursor:"pointer",fontSize:"1.1rem"}}>×</button>
                </div>
              )}
              <button className="cfm-btn" onClick={() => {
                if(!selSvc) return showToast("Please select a treatment");
                if(selDay===null||!selSlot) return showToast("Please choose date & time");
                if(!gender) return showToast("Therapist gender preference is required");
                showToast("🎉 Booking confirmed! Check your email.");
              }}>Confirm Booking</button>
              <div className="sum-note">Free cancellation up to 4 hours before session</div>
            </div>
          </div>
        </div>
      )}

      {/* ══ PACKAGES ══ */}
      {tab === "packages" && (
        <div className="sec" style={{paddingTop:"118px"}}>
          <div className="sec-hd">
            <div className="eyebrow">Wellness Programs</div>
            <h2 className="sec-title">Session <em>Packages</em></h2>
            <p className="sec-sub">Commit to your wellbeing and save. Credits auto-apply at checkout and never expire.</p>
          </div>
          <div className="pkg-g">
            {PACKAGES.map((p,i) => (
              <div key={p.id} className={`pkg${i===1?" feat":""}`}>
                <div className="pkg-bdg">{p.tag}</div>
                <div className="pkg-name">{p.title}</div>
                <div className="pkg-sub">{p.sub}</div>
                <div className="pkg-sw">
                  <span className="pkg-num">{p.sessions}</span>
                  <span className="pkg-sl">Sessions</span>
                  {p.bonus>0 && <span style={{color:"var(--gold)",fontSize:".95rem",marginLeft:"4px"}}>+{p.bonus} free</span>}
                </div>
                <div className="pkg-bonus">{p.bonus>0?`✦ ${p.bonus} complimentary session${p.bonus>1?"s":""} included`:"Renews monthly automatically"}</div>
                <div className="pkg-ft">
                  <span className="pkg-price">${p.price}</span>
                  <button className="pkg-cta" onClick={() => showToast(`✓ ${p.title} added to your account`)}>Buy Now</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cred-strip">
            <div>
              <div className="cred-ey">Your Account Credits</div>
              <div className="cred-num">3 <span>sessions remaining</span></div>
            </div>
            <div className="cred-pills">
              <div className="cred-p"><span className="cred-pl">Package</span><span className="cred-pv">Wellness 5-Pack</span></div>
              <div className="cred-p"><span className="cred-pl">Valid Until</span><span className="cred-pv">Dec 31, 2026</span></div>
            </div>
          </div>
        </div>
      )}

      {/* ══ GIFT ══ */}
      {tab === "gift" && (
        <div className="sec" style={{paddingTop:"118px"}}>
          <div className="sec-hd">
            <div className="eyebrow">Share Wellness</div>
            <h2 className="sec-title">Digital <em>Gift Cards</em></h2>
            <p className="sec-sub">Give the gift of serenity. Instantly delivered, beautifully presented, endlessly appreciated.</p>
          </div>
          <div className="gift-wrap">
            <div>
              <div className="gc-card">
                <div className="gc-brand">Sérénité Wellness</div>
                <div style={{textAlign:"center"}}><div className="gc-amt">${giftAmt}</div></div>
                <div className="gc-ft">
                  <div className="gc-code">{giftCode}</div>
                  <div className="gc-valid">Valid 12 months</div>
                </div>
              </div>
              <label className="gf-lbl">Select Amount</label>
              <div className="amt-g">
                {GIFT_AMOUNTS.map(a => (
                  <button key={a} className={`amt-btn${giftAmt===a?" on":""}`} onClick={() => setGiftAmt(a)}>${a}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="gf-lbl">Recipient Name</label>
              <input className="g-inp" placeholder="e.g. Sarah Johnson" value={rName} onChange={e=>setRName(e.target.value)}/>
              <label className="gf-lbl">Recipient Email</label>
              <input className="g-inp" type="email" placeholder="sarah@example.com" value={rEmail} onChange={e=>setREmail(e.target.value)}/>
              <label className="gf-lbl">Personal Message</label>
              <textarea className="g-ta" rows={3} placeholder="A little note to make it special..."/>
              <div className="g-sum">
                <span className="g-sum-l">Gift Card Value</span>
                <span className="g-sum-v">${giftAmt}</span>
              </div>
              <button className="g-buy" onClick={() => showToast("✓ Gift card purchased! Sending now...")}>Purchase Gift Card</button>
              <label className="gf-lbl">Send Directly Via</label>
              <div className="g-share">
                <button className="g-sh" onClick={() => showToast("📱 Opening WhatsApp...")}>💬 WhatsApp</button>
                <button className="g-sh" onClick={() => showToast("📧 Gift card sent!")}>✉️ Email</button>
              </div>
              <div className="redeem">
                <span className="redeem-l">Redeem a Gift Card</span>
                <div className="redeem-row">
                  <input className="redeem-inp" placeholder="Enter code e.g. SRN-XXXXXX"/>
                  <button className="redeem-btn" onClick={() => showToast("✓ $100 credit applied to account")}>Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer>© 2026 <em>Sérénité Wellness</em> · Premium Mobile Spa · Dubai, UAE</footer>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}