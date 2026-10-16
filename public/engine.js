export const money=n=>new Intl.NumberFormat('en-IE',{style:'currency',currency:'EUR',maximumFractionDigits:n%100?2:0}).format(n/100);
export const isProCategory=c=>['vehicles','property'].includes(c);
export function available(account){return account.balance-Object.values(account.holds).reduce((a,b)=>a+b,0);}
export function bid(account,item,amount,now=Date.now()){
 if(item.status!=='active'||item.endsAt<=now)throw Error('This auction has ended.');
 if(!item.confirmed)throw Error('The seller must confirm availability first.');
 if(isProCategory(item.category)&&!(account.proUntil>now))throw Error('Pro is required to bid on Vehicles and Property.');
 const minimum=item.price+Math.max(100,Math.ceil(item.price*.05/100)*100);
 if(!Number.isSafeInteger(amount)||amount<minimum)throw Error(`Your next bid must be at least ${money(minimum)}.`);
 if(amount>available(account)+(account.holds[item.id]||0))throw Error('You need enough available balance to cover your full bid.');
 return {account:{...account,holds:{...account.holds,[item.id]:amount}},item:{...item,price:amount,bids:item.bids+1,leader:account.id}};
}
export function settlement(amount){if(!Number.isSafeInteger(amount)||amount<0)throw Error('Invalid amount');const commission=Math.round(amount*.3);return {total:amount,commission,sellerReceives:amount-commission};}
export function validateImport(row){
 if(!row||typeof row.title!=='string'||row.title.length<3||row.title.length>160)throw Error('Each import needs a title of 3–160 characters.');
 if(!['clothing','home','tools','vehicles','property','toys','furniture'].includes(row.category))throw Error('Unknown import category.');
 const url=new URL(row.sourceUrl);if(url.protocol!=='https:')throw Error('Source URLs must use HTTPS.');
 if(!Number.isSafeInteger(row.price)||row.price<100||row.price>10000000000)throw Error('Price must be a positive integer in euro cents.');
 if(typeof row.permissionReference!=='string'||!row.permissionReference.trim())throw Error('A permission reference is required.');
 return {...row,sourceUrl:url.href,status:'pending',confirmed:false,sample:false,importedAt:Date.now()};
}
