class QRGenerator {
  constructor({ token, container }) { this.token = token; this.container = container; }

  async generate({ sku, name, price }) {
    const response = await fetch('/api/admin/qr-label', { method: 'POST', headers: { 'content-type': 'application/json', 'x-admin-token': this.token }, body: JSON.stringify({ sku, name, price }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Unable to generate label.');
    return this.render(data, true);
  }

  render(data, prepend = false) {
    const label = document.createElement('article');
    label.className = 'inventory-label';
    label.dataset.labelId = data.id;
    const mark = document.createElement('img'); mark.className = 'label-mark'; mark.src = '/assets/brand/open-mark-256.jpg'; mark.alt = 'OPEN';
    const heading = document.createElement('h2'); heading.textContent = data.name;
    const sku = document.createElement('p'); sku.className = 'label-sku'; sku.textContent = data.sku;
    const qr = document.createElement('img'); qr.className = 'label-qr'; qr.src = data.qrImageUrl; qr.alt = `QR passport for ${data.name}`;
    const price = document.createElement('strong'); price.className = 'label-price'; price.textContent = data.price ? new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(data.price) : 'Market price';
    const id = document.createElement('p'); id.className = 'label-id'; id.textContent = data.id;
    const disclosure = document.createElement('p'); disclosure.className = 'label-disclosure'; disclosure.textContent = 'Scan for product passport and disclosures. Values vary. Not an investment, lottery, or wager.';
    const print = document.createElement('button'); print.className = 'button label-print no-print'; print.type = 'button'; print.textContent = 'Print this label'; print.addEventListener('click', () => this.print(label));
    label.append(mark, heading, sku, qr, price, id, disclosure, print);
    prepend ? this.container.prepend(label) : this.container.append(label);
    return label;
  }

  print(label) {
    document.querySelectorAll('.inventory-label').forEach(item => item.classList.toggle('print-target', item === label));
    document.body.classList.add('print-single-label');
    window.print();
    setTimeout(() => { document.body.classList.remove('print-single-label'); document.querySelectorAll('.inventory-label').forEach(item => item.classList.remove('print-target')); }, 250);
  }
}
window.QRGenerator = QRGenerator;
