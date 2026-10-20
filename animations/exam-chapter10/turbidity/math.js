export function spring(t,{omega=12,zeta=.6}={}) {
  if(t<=0)return 0;
  if(zeta>=1)return 1-Math.exp(-omega*t)*(1+omega*t);
  const wd=omega*Math.sqrt(1-zeta*zeta);
  return 1-Math.exp(-zeta*omega*t)*(Math.cos(wd*t)+(zeta*omega/wd)*Math.sin(wd*t));
}
export const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
export const rad=d=>d*Math.PI/180;
export const seeded=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
