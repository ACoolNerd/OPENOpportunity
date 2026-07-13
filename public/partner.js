const esc = value => String(value ?? '').replace(/[&<>"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char]));
const dollars = value => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(value) || 0);
const csv = rows => rows.map(row => row.map(value => `"${String(value ?? '').replaceAll('"','""')}"`).join(',')).join('\n');
const download = (name, content) => { const anchor=document.createElement('a'); anchor.href=URL.createObjectURL(new Blob([content],{type:'text/csv'})); anchor.download=name; anchor.click(); URL.revokeObjectURL(anchor.href); };
let token = ''; let dashboard = null; let qrGenerator = null;

document.querySelector('#adminLogin')?.addEventListener('submit', async event => {
  event.preventDefault(); token = new FormData(event.target).get('token');
  const response = await fetch('/api/admin/dashboard',{headers:{'x-admin-token':token}}); const data=await response.json();
  const message=document.querySelector('#adminMessage');
  if(!response.ok){message.innerHTML=`<div class="notice">${esc(data.error)}</div>`;return;}
  dashboard=data; sessionStorage.setItem('openAdminToken',token); event.target.hidden=true; message.textContent='';
  document.querySelector('#portalWorkspace').hidden=false; renderOverview(); renderInventory(); setupIntegration();
});

function renderOverview(){
  document.querySelector('#overviewData').innerHTML=`<p class="eyebrow">Signed in as ${esc(dashboard.user.name)} · ${esc(dashboard.user.role)}</p><div class="dashboard-grid">${Object.entries(dashboard.kpis).map(([key,value])=>`<div class="kpi"><small>${esc(key.replace(/([A-Z])/g,' $1'))}</small><strong>${typeof value==='number'?value.toLocaleString():esc(value)}</strong></div>`).join('')}</div><h2>Monthly OPEN allocation</h2><table><thead><tr><th>Units</th><th>Base allocation</th></tr></thead><tbody>${dashboard.monthlyAllocationExamples.map(row=>`<tr><td>${row.units}</td><td>${dollars(row.openAllocation)}</td></tr>`).join('')}</tbody></table>`;
  document.querySelector('#exportBtn').onclick=async()=>{const response=await fetch('/api/admin/export/catalog.csv',{headers:{'x-admin-token':token}});download('open-opportunity-catalog-mapping.csv',await response.text());};
}

document.querySelectorAll('.portal-nav button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.portal-nav button').forEach(item=>item.classList.toggle('active',item===button));document.querySelectorAll('[data-panel]').forEach(panel=>panel.hidden=panel.dataset.panel!==button.dataset.view);}));

function setupIntegration(){
  const fixed=dashboard.catalog.filter(item=>item.price!=null); document.querySelector('#integrationSku').innerHTML=fixed.map(item=>`<option value="${esc(item.sku)}">${esc(item.name)} · ${dollars(item.price)}</option>`).join('');
  document.querySelector('#integrationForm').addEventListener('submit',async event=>{event.preventDefault();const body=Object.fromEntries(new FormData(event.target));const response=await fetch('/api/admin/integrations/simulate',{method:'POST',headers:{'content-type':'application/json','x-admin-token':token},body:JSON.stringify(body)});const data=await response.json();renderIntegration(data,response.ok);});
}

function renderIntegration(data,ok){
  const out=document.querySelector('#integrationResult'); if(!ok){out.innerHTML=`<div class="notice">${esc(data.error)}</div>`;return;}
  const transactionHeaders=Object.keys(data.transaction); const squareHeaders=Object.keys(data.square); const qbHeaders=Object.keys(data.quickbooks);
  out.innerHTML=`<div class="mapping-summary"><div><small>Gross sale</small><strong>${dollars(data.transaction.gross)}</strong></div><div><small>Square fee</small><strong>${dollars(data.transaction.processorFee)}</strong></div><div><small>OPEN payable</small><strong>${dollars(data.transaction.openPayable)}</strong></div><div><small>ACool proceeds</small><strong>${dollars(data.transaction.acoolProceeds)}</strong></div></div><p class="micro">${esc(data.notice)}</p><div class="mapping-grid"><article><p class="eyebrow">Square mapping</p><table>${Object.entries(data.square).map(([key,value])=>`<tr><th>${esc(key)}</th><td>${esc(value)}</td></tr>`).join('')}</table><button id="squareCsv" class="button secondary">Download Square CSV</button></article><article><p class="eyebrow">QuickBooks mapping</p><table>${Object.entries(data.quickbooks).map(([key,value])=>`<tr><th>${esc(key)}</th><td>${esc(value)}</td></tr>`).join('')}</table><button id="qbCsv" class="button secondary">Download QuickBooks CSV</button></article></div>`;
  document.querySelector('#squareCsv').onclick=()=>download('square-transaction-preview.csv',csv([squareHeaders,squareHeaders.map(key=>data.square[key])]));
  document.querySelector('#qbCsv').onclick=()=>download('quickbooks-sales-receipt-preview.csv',csv([qbHeaders,qbHeaders.map(key=>data.quickbooks[key])]));
}

function renderInventory(){
  const body=document.querySelector('#inventoryTable tbody'); const labels=document.querySelector('#inventoryLabels'); qrGenerator=new window.QRGenerator({token,container:labels});
  dashboard.catalog.forEach(item=>{const row=document.createElement('tr');row.innerHTML=`<td>${esc(item.sku)}</td><td>${esc(item.name)}</td><td>${esc(item.type)}</td><td>${item.price==null?'Market':dollars(item.price)}</td><td>${esc(item.squareItemId||'Unmapped')}</td><td>${esc(item.quickbooksItemId||'Unmapped')}</td><td><button class="mini-button make-label" type="button">Create</button></td>`;body.append(row);row.querySelector('.make-label').onclick=()=>qrGenerator.generate({sku:item.sku,name:item.name,price:item.price||0}).catch(error=>alert(error.message));
    qrGenerator.render({id:`OPEN-${item.sku}-SAMPLE`,sku:item.sku,name:item.name,price:item.price||0,qrImageUrl:`/api/qr?to=${encodeURIComponent(`/passport.html?id=OPEN-${item.sku}-SAMPLE`)}`});
  });
  document.querySelector('#qrGeneratorForm').addEventListener('submit',async event=>{event.preventDefault();const button=event.submitter;button.disabled=true;try{await qrGenerator.generate(Object.fromEntries(new FormData(event.target)));}catch(error){alert(error.message);}finally{button.disabled=false;}});
  document.querySelector('#printLabels').onclick=()=>window.print();
}
