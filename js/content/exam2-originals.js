/* Authentic source figures supplement the twelve original schematic exercises. */
(function(L){
'use strict';var A=L.A;
function media(name,cap){return {kind:'img',src:(L.EXAM2_SOURCE_MODE==='private'?'assets/img/exam2/figures/':'assets/figures/exam2/')+name+'.png',alt:cap,cap:cap+' · crop only; geometry unchanged'};}
A.match('e2-original-cross-beds','c7-7-core','Read the original figure. Match each observed position or feature to the shuffled word bank.',
 [['Blue arrow','Transport toward the right'],['Inclined internal laminae','Cross beds'],['Steep down-current face','Sediment accumulation on the lee side']],
 'The source arrow points right. Sand travels over the bedform and accumulates on its down-current face, preserving inclined laminae.',
 ['TB7:7.7'],{examId:'exam2',mock:false,topics:['E2T5'],media:media('cross-beds','Textbook 7.7 · PDF page 9 · original figure 07.07.b8'),evidence:'docs/EXAM2_SOURCE_LEDGER.md'});
A.match('e2-original-fault-pair','c8-4-core','Use the original source arrows and offset layers. Identify the two fault types and the stress directions shown.',
 [['Fault A','Normal fault'],['Fault B','Reverse fault'],['Outward blue arrows in A','Extension'],['Inward blue arrows in B','Compression']],
 'In A the hanging wall moves down; the outward arrows show extension. In B it moves up; inward arrows show compression. Both retain the original fault-plane geometry.',
 ['TB8:8.4'],{examId:'exam2',mock:false,topics:['E2T8'],media:[media('normal-fault','A · original figure 08.04.c1 · textbook 8.4, PDF page 7'),media('reverse-fault','B · original figure 08.04.c3 · textbook 8.4, PDF page 8')],evidence:'docs/EXAM2_SOURCE_LEDGER.md'});
A.match('e2-original-fold-pair','c8-5-core','The original upright sequence has older beds in the left arch and younger beds in the right trough. Match the original numbered locations to the word bank.',
 [['Location 5 · left arch','Anticline'],['Location 6 · right trough','Syncline']],
 'In this upright course model, the left arch has older central beds and the right trough has younger central beds. The names are supported by both geometry and the stated age relations.',
 ['TB8:8.5'],{examId:'exam2',mock:false,topics:['E2T9'],media:media('fold-pair','Textbook 8.5 · PDF page 3 · original figure 08.05.a5'),evidence:'docs/EXAM2_SOURCE_LEDGER.md'});
var cards=[
 ['c7s1','g7-intro','Fraser River: connect the whole system','c7-1-core','7.intro',
 '<p>The chapter introduction follows the <b>Fraser River</b> through southwestern British Columbia. Mountain streams, lakes, glaciers, and tributaries supply sediment to the river. Its branching and rejoining channels illustrate a braided river. At the Strait of Georgia, slowing flow disperses sediment and builds a delta near Vancouver.</p><p>Follow one grain through this system: weathering produces it, erosion removes it, a stream transports it, and decreasing flow allows deposition. Coarse and fine material respond differently. The delta can grow seaward as material accumulates. An ancient deposit must be interpreted from textures and structures, because the modern river and coastline may no longer exist.</p><p>Vancouver also illustrates the human importance of sediment. Broad sediment-covered plains provide land for building and agriculture; pore spaces hold groundwater. This supplied example connects environment, process, preserved rock, and resources.</p>',
 'A delta growing seaward is evidence of sediment accumulation; by itself it does not prove a global fall in sea level.'],
 ['c8s12','g8-intro','Valley and Ridge: structure guides erosion','c8-12-core','8.intro',
 '<p>The Chapter 8 introduction shows the <b>Valley and Ridge Province</b> in the Appalachians. Trace the curved ridges on the map, then compare them with the cross section. Folded sedimentary layers and thrust faults record shortening. Cleavage may cut the older bedding because it developed during later deformation.</p><p>The source describes several Paleozoic deformation episodes, culminating in collision between Africa and eastern North America around 300 million years ago. Shortening stacked and folded rocks while burial and heating promoted metamorphism. Subsequent erosion removed weaker layers more rapidly, leaving resistant units as ridges.</p><p>Use this sequence to separate processes: deposition first creates layers; deformation changes their geometry; mineral reactions and fabric development can occur during metamorphism; erosion exposes and reshapes the structure. A ridge is not automatically an anticline. Read bedding, rock resistance, and map geometry together.</p>',
 'The modern ridge-and-valley landscape reflects both rock structure and differential erosion.']
];
cards.forEach(function(a){var book=L.EXAM2_SOURCES[a[4]],p=book.pages[1]||book.pages[0];A.cards(a[0],[{id:a[1],h:a[2],c:[a[3]],src:['TB'+a[4][0]+':'+a[4]],html:a[5],traps:[a[6]],examId:'exam2',media:[{kind:'img',src:p.display,alt:p.authored?'Study diagram for '+a[2]:'Original Chapter '+a[4][0]+' introduction figure, PDF page 2',cap:p.authored?'Original lab schematic · chapter introduction':book.title+' · original PDF page 2'}]}]);});
L.CONFIG.version='4.0.1 · Exam 2 Chapters 7–8 (2026-10-06)';
})(window.L);
