import fs from "node:fs";
const load=(p)=>JSON.parse(fs.readFileSync(p,"utf8"));
const services=load("src/data/orcamento/servicos.json"); const regions=load("src/data/orcamento/regioes.json"); const prices=load("src/data/orcamento/precos.json"); const neighborhoods=load("src/data/orcamento/bairros.json"); const travel=load("src/data/orcamento/deslocamento.json");
const errors=[]; for(const s of services){ if(!prices[s.id]) errors.push(`Serviço sem preço: ${s.id}`); for(const r of regions){ if(!prices[s.id]?.[r.id]) errors.push(`Preço ausente: ${s.id} / ${r.id}`); } }
for(const r of regions){ if(!neighborhoods[r.id]) errors.push(`Bairros ausentes: ${r.id}`); if(!travel.regioes?.[r.id]) errors.push(`Deslocamento ausente: ${r.id}`); }
if(errors.length){ console.error(errors.join("\n")); process.exit(1); } console.log(`Dados OK: ${services.length} serviços, ${regions.length} regiões.`);
