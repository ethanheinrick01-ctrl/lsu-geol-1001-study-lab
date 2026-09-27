/* Additive September 27 refinements. Existing question IDs and saved run groups stay intact. */
(function(L){
'use strict';
var X=L.EXAM1,A=L.A;
function topic(id){return X.topics.find(function(t){return t.id===id;});}
function img(file,cap,alt){return {kind:'img',src:'assets/img/exam1/'+file,cap:cap,alt:alt||cap};}
var chart=topic('T10').media[0],pt=img('pt-comparison.png','McGraw-Hill section 5.5 · original pressure–temperature comparison','Temperature increases rightward; pressure increases downward. A and B share pressure; B and C share temperature.');
var sheets=img('silicate-sheets.png','McGraw-Hill figure 04.07.b4 · original silicate structure','Linked silicon–oxygen tetrahedra form a continuous two-dimensional arrangement.');
var settings=img('texture-settings.png','McGraw-Hill section 5.1B · original texture and formation-setting overview','Numbered volcano and subsurface magma diagram from the textbook.');
topic('T7').media.push(pt);topic('T11').media.push(sheets);topic('T8').media.unshift(settings);
topic('T10').html+='<h3>Read the mineral bands</h3><p>The lower panel shows which minerals occur across the composition groups. Quartz and potassium feldspar favor the felsic side; olivine favors the mafic/ultramafic side. Plagioclase spans a broad range, from sodium-rich toward the felsic side to calcium-rich toward the mafic side. Use the bands to support a classification, then use texture to choose the rock name. Exact percentages are not the goal.</p>';
topic('T11').html+='<h3>Structure explains what you can see</h3><p>Silicon–oxygen tetrahedra can share oxygen atoms to form chains, sheets, and frameworks. Mica has strong bonding within sheets and weaker bonds between sheets, so it cleaves into thin layers. Quartz has a well-bonded three-dimensional framework and no preferred cleavage planes. One isolated SiO₄ tetrahedron has a net charge of −4: +4 from silicon and −8 from four oxygen atoms.</p>';
topic('T7').html+='<h3>Compare one variable at a time</h3><p>In the A–D figure, A and B share pressure: higher temperature puts B on the liquid side. B and C share temperature: higher pressure keeps C on the solid side. A and C are both solid even though C is hotter, because pressure also increases. Heating does not guarantee melting when pressure changes too.</p>';
topic('T8').html+='<h3>Use the setting to explain the texture</h3><p>In the original section 5.1B overview, point 5 represents slow cooling at depth and coarse crystals. The path associated with point 8 allows crystals to grow below ground before the remaining melt cools rapidly, producing a porphyritic texture. At point 9, water-rich magma helps atoms move and large pegmatite crystals grow. Name the texture, then give its cause.</p>';
['T7','T8','T10','T11'].forEach(function(id){var t=topic(id);t.sources=L.util.uniq(t.sources.concat(id==='T11'?['T0908','T0910']:['T0910','T0915']));});
function mc(id,c,tid,q,options,x,media){return A.mc(id,c,q,options,x,topic(tid).sources,{pool:'exam1',mock:false,topics:[tid],media:media});}
mc('e1v2-chart-plagioclase','c5-silica','T10','Follow the plagioclase band across the lower panel. Which reading fits this chart?',[
 '*Plagioclase spans several composition groups; its composition changes across the band.|The band extends from the felsic side toward the mafic side and is labeled Na-rich to Ca-rich.',
 'Plagioclase appears only in ultramafic rocks and has a constant composition.|The band spans a broader range and changes composition.',
 'Plagioclase becomes quartz as the grain size changes from coarse to fine.|Different grain sizes do not turn one mineral into another.',
 'Plagioclase marks cooling rate, while the upper rows show mineral percentages.|The lower panel shows minerals; the upper rows distinguish rock textures.'
 ],'Read the mineral band together with the composition columns. Texture is the separate axis used to choose granite/rhyolite or gabbro/basalt.',chart);
mc('e1v2-chart-association','c5-silica','T10','A coarse-grained sample contains abundant quartz and potassium feldspar. Which part of the chart supports its classification?',[
 'The olivine band and the fine-grained ultramafic cell.|That mineral association and texture do not match the sample.',
 '*The quartz/K-feldspar bands and the coarse-grained felsic cell.|The bands support felsic composition and the row supplies the granite name.',
 'The plagioclase band alone, with no need to inspect grain size.|One broad mineral band does not determine both classification axes.',
 'The scoria texture row, because all coarse rocks contain bubbles.|Coarse crystals are not gas-bubble vesicles.'
 ],'The chart connects observed minerals to composition and observed grain size to the rock name. This combination indicates granite.',chart);
mc('e1v2-pt-same-temperature','c5-ptread','T7','B and C have the same temperature. Why is C on the solid side of this simplified diagram?',[
 'C contains colder rock, despite sharing the temperature coordinate.|Equal horizontal coordinates mean equal temperature.',
 'C has lower pressure, which always prevents melting.|Pressure increases downward here; lower pressure favors melting.',
 '*C has higher pressure, which favors the solid state.|C is lower on the pressure axis and lies left of the melting boundary.',
 'C must contain less silica; the pressure axis does not matter.|The figure compares pressure and temperature, not changing composition.'
 ],'Read both axes. At this temperature, greater pressure can keep rock solid; reducing pressure from C toward B allows melting.',pt);
mc('e1v2-pt-burial','c5-ptread','T7','Compare A with C. Temperature and pressure both increase. What does this figure show?',[
 '*Both remain solid; heating alone does not decide the result when pressure also rises.|Both points remain on the solid side of the boundary.',
 'Both become liquid, because deeper rock must always be molten.|Depth increases pressure as well as temperature.',
 'A must be liquid because it has the lower pressure.|A is on the solid side at its low temperature.',
 'C must be liquid because it is hotter than A.|Its higher pressure helps it remain solid at that temperature.'
 ],'Evaluate the final position relative to the boundary. Increased temperature may be offset by increased pressure.',pt);
function caseItem(it,id,c){it.id=id;it.c=c;it.pool='exam1';it.mock=false;return it;}
var mineralId='e1v2-case-mineral-structure';
var mineralItems=[
 caseItem({t:'fill',q:'What type of silicate arrangement does the supplied figure show?',acc:['sheet','sheets','sheet silicate','sheet structure'],x:'Tetrahedra are linked across a two-dimensional sheet.'},mineralId+'-a','c4-silstruct'),
 caseItem({t:'match',q:'Connect each silicate arrangement with a representative mineral.',pairs:[['Isolated tetrahedra','Olivine'],['Single chains','Pyroxene'],['Sheets','Mica'],['Framework','Quartz']],x:'Different ways of linking tetrahedra produce distinct mineral structures and properties.'},mineralId+'-b','c4-commonsil'),
 caseItem({t:'teach',q:'Mica can peel into thin flakes. Use bonding and structure to explain this in one or two sentences.',model:'Mica has a sheet structure. Bonds within each sheet are stronger than the bonds between sheets, so it cleaves along the weaker connections between layers.',rubric:['Identifies the sheet structure','Explains weaker bonds between sheets and cleavage along them']},mineralId+'-c','c4-bonds')
];
mineralItems.forEach(function(it){it.s=['TB4:4.7','TB4:4.8','T0910'];it.topics=['T11'];});
A.kase({id:mineralId,ch:4,title:'From mineral structure to visible behavior',stem:'Observe the actual McGraw-Hill structure. Identify the arrangement, match examples, then explain a visible property.',media:sheets,items:mineralItems,inv:false,exam1:true,topics:['T11']});
var settingsId='e1v2-case-texture-settings';
var settingsItems=[
 caseItem({t:'match',q:'Match the formation condition to the texture it helps produce.',pairs:[['Slow cooling at depth','Coarse-grained'],['Very rapid cooling that prevents crystal growth','Glassy'],['Slow cooling followed by rapid cooling','Porphyritic']],x:'Cooling conditions control how much time crystals have to grow.'},settingsId+'-a','c5-grain'),
 caseItem({t:'fill',q:'Very large crystals can grow where water-rich magma helps atoms move. What rock texture/name fits point 9?',acc:['pegmatite','pegmatitic'],x:'Dissolved water helps atoms migrate and large pegmatite crystals grow.'},settingsId+'-b','c5-grain'),
 caseItem({t:'teach',q:'Explain how large crystals surrounded by a fine-grained matrix record two stages of cooling.',model:'Large crystals grew during an initial slower cooling stage below the surface. The remaining melt then cooled faster at a shallower level or after eruption, forming the fine-grained matrix.',rubric:['Large crystals formed during earlier slow cooling','The remaining melt cooled faster to produce the fine matrix']},settingsId+'-c','c5-voltex')
];
settingsItems.forEach(function(it){it.s=['TB5:5.1','T0910'];it.topics=['T8'];});
A.kase({id:settingsId,ch:5,title:'Connect setting, cooling, and texture',stem:'Use the original McGraw-Hill volcano/magma diagram to connect a visible texture with its formation process.',media:settings,items:settingsItems,inv:false,exam1:true,topics:['T8']});
// Future forms use the refinements; saved runs retain their original IDs and group order.
X.forms.A.mc[X.forms.A.mc.indexOf('e1v1-A-T10-mc2')]='e1v2-chart-plagioclase';
X.forms.B.mc[X.forms.B.mc.indexOf('e1v1-B-T7-mc1')]='e1v2-pt-same-temperature';
X.forms.C.mc[X.forms.C.mc.indexOf('e1v1-C-T10-mc2')]='e1v2-chart-association';
X.forms.B.cases[4]=settingsId;X.forms.C.cases[3]=mineralId;X.version=2;
// Text-only foundation items already taught in the lab; never attach an unrelated figure to them.
X.foundationIds=['c4-bonds-m2','c4-tetra-m1','c4-tetra-m2','c5-visc-m3','c3-transform-m1'];
L.CONFIG.version='3.1.0 · cohesive update 2026-09-27';
})(window.L);
