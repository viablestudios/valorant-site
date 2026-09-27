const fs=require('fs');const vm=require('vm');const assert=require('assert/strict');
const root=require('path').resolve(__dirname,'..')+'/';const ts=require(root+'node_modules/typescript');
function load(p){const code=ts.transpileModule(fs.readFileSync(root+p,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;const ctx={exports:{},Intl};vm.runInNewContext(code,ctx);return ctx.exports}
const {products}=load('src/lib/data/products.ts');const {reviews}=load('src/lib/data/reviews.ts');const {gallery}=load('src/lib/data/gallery.ts');const currency=load('src/lib/currency.ts');
assert.equal(products.length,4);assert.deepEqual(Array.from(products,p=>p.price),[4999,2499,1499,1099]);assert.equal(reviews.length,120);assert.equal(reviews.reduce((n,r)=>n+r.rating,0)/120,4.8);
for(const p of products){const list=reviews.filter(r=>r.productSlug===p.slug);assert.equal(list.length,30);assert.equal(list.reduce((n,r)=>n+r.rating,0)/30,4.8)}
assert.ok(reviews.every(r=>r.placeholder&&!r.verified));assert.equal(gallery.length,32);assert.ok(gallery.every(g=>fs.existsSync(root+'public'+g.src)));
assert.equal(currency.currencyForCountry('US'),'USD');assert.equal(currency.currencyForCountry('FR'),'EUR');assert.equal(currency.currencyForCountry('GB'),'GBP');assert.equal(currency.currencyForCountry(currency.countryFromLocale('fr-FR')),'EUR');assert.equal(currency.currencyForCountry(currency.countryFromLocale('en-US')),'USD');assert.equal(currency.convertedPrice(2499,'USD',1.3254,'en-US'),'$33.12');assert.equal(currency.convertedPrice(1599,'EUR',1.1628,'en-GB'),'€18.59');
console.log('PASS: four GBP prices; 120 samples; 30 per product; 4.8 overall and per product; all 32 gallery files; US/France/UK and locale detection; USD/EUR conversion rounding.');

assert.equal(new Set(reviews.map(r=>r.title)).size,120);assert.equal(new Set(reviews.map(r=>r.body)).size,120);console.log('PASS: all review titles and bodies unique.');