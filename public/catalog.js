export const categories = [
 {id:'all',name:'All finds',icon:'✳'},
 {id:'clothing',name:'Clothing',icon:'♧',subs:['Jackets','Tops','Shoes','Bags & accessories']},
 {id:'home',name:'Home items',icon:'⌂',subs:['Lighting','Kitchen','Decor','Electronics']},
 {id:'tools',name:'Tools',icon:'⚒',subs:['Power tools','Hand tools','Garden','Workshop']},
 {id:'vehicles',name:'Vehicles',icon:'▰',subs:['Cars','Motorcycles','Bicycles','Parts'],pro:true},
 {id:'property',name:'Property',icon:'▤',subs:['Apartments','Houses','Land','Commercial'],pro:true},
 {id:'toys',name:'Toys & games',icon:'♜',subs:['Video games','Board games','Collectibles','Kids toys']},
 {id:'furniture',name:'Furniture',icon:'▥',subs:['Chairs','Tables','Storage','Sofas']}
];
const photos={
 chair:'photo-1598300042247-d088f8ab3a91',lamp:'photo-1507473885765-e6ed057f782c',camera:'photo-1516035069371-29a1b244cc32',jacket:'photo-1551028719-00167b16eac5',car:'photo-1503376780353-7e6692767b70',home:'photo-1600585154340-be6161a56a0c',toy:'photo-1612036782180-6f0b6cd846fe',sofa:'photo-1555041469-a586c61ea9bc',table:'photo-1533090161767-e6ffed986c88',sneakers:'photo-1542291026-7eec264c27ff',tools:'photo-1530124566582-a618bc2615dc',bike:'photo-1485965120184-e220f721d03e',watch:'photo-1524805444758-089113d48a6d',vinyl:'photo-1461360228754-6e81c478b882',bag:'photo-1548036328-c9fa89d128fa',plant:'photo-1485955900006-10f4d324d411'};
const templates=[
 ['furniture','Chairs','The perfect bentwood chair','chair',35],['home','Lighting','A little sunshine for your desk','lamp',22],['clothing','Jackets','Your next vintage leather jacket','jacket',45],['home','Electronics','Analog days. Canon AE-1','camera',80],['toys','Collectibles','A box of childhood memories','toy',18],['furniture','Sofas','The Sunday afternoon sofa','sofa',120],['vehicles','Cars','A weekend classic. Porsche 911','car',18500],['property','Houses','A slower life by Lake Ohrid','home',85000],
 ['clothing','Shoes','Classic red trainers','sneakers',28],['tools','Hand tools','A proper workshop starter kit','tools',32],['home','Electronics','Records for a rainy afternoon','vinyl',15],['furniture','Tables','Solid oak coffee table','table',55],['vehicles','Bicycles','Two wheels, endless possibilities','bike',95],['clothing','Bags & accessories','Everyday leather shoulder bag','bag',24],['home','Decor','Terracotta planter collection','plant',12],['clothing','Bags & accessories','A timeless little wristwatch','watch',42],
 ['tools','Power tools','Cordless drill and bit set','tools',65],['tools','Garden','Garden tools, ready for spring','tools',25],['toys','Board games','Sunday board game bundle','toy',20],['toys','Video games','Retro console collectors bundle','toy',95],['toys','Kids toys','Wooden building blocks','toy',14],['furniture','Storage','Mid-century cabinet','table',110],['home','Kitchen','Ceramic coffee set for two','lamp',16],['property','Apartments','Sunny apartment in Skopje','home',68000],['property','Land','Build your own little escape','home',22000],['vehicles','Motorcycles','Weekend roadster motorcycle','bike',1400],['vehicles','Parts','Classic car parts collection','car',120],['clothing','Tops','Vintage cotton sweatshirt','jacket',18],['tools','Workshop','Heavy-duty workshop essentials','tools',85],['property','Commercial','A space for your next chapter','home',92000]
];
export const imageUrl=(key,w=640)=>`https://images.unsplash.com/${photos[key]||photos.chair}?auto=format&fit=crop&w=${w}&q=80`;
export const cities=['Skopje','Bitola','Ohrid','Prilep','Tetovo','Kumanovo','Strumica','Veles'];
export const conditions=['Like new','Good','Fair','New'];
export function seedCatalog(epoch=Date.now()){
 return Array.from({length:1000},(_,i)=>{const t=templates[i%templates.length]; const run=Math.floor(i/templates.length);return {id:`RB-${String(i+1).padStart(4,'0')}`,category:t[0],subcategory:t[1],title:t[2]+(run?` · ${['original','studio','classic','everyday','collector'][run%5]} #${run+1}`:''),image:t[3],price:Math.round(t[4]*(1+(run%7)*.14))*100,city:cities[(i*3+run)%cities.length],condition:conditions[(i+run)%4],bids:(i*7)%24,endsAt:epoch+(i<6?[3.2,8.5,20,2.4,7.1,26][i]:1+(i*17)%167)*3600000,createdAt:epoch-i*120000,delivery:i%3?'Pickup or delivery':'Pickup only',sample:true,confirmed:true,description:'A carefully chosen secondhand find with a little history and plenty of life left. This is a fictional sample listing for exploring RetroBid. Photos are illustrative and do not represent an actual seller or item.',seller:'Sample seller',status:'active'};});
}
