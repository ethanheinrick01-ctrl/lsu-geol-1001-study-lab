/* Investigations use unchanged course images. A/B/C vary the task, not the underlying geology figure. */
(function(L){
'use strict';
var X=L.EXAM1;
function topic(id){return X.topics.find(function(t){return t.id===id;});}
function media(t,n){return topic(t).media[n||0];}
function m(c,q,key,others,x){return {c:c,t:'mc',q:q,o:[key].concat(others).map(function(s,i){return {t:s,ok:i===0,w:x};}),x:x};}
function f(c,q,acc,x){return {c:c,t:'fill',q:q,acc:acc,x:x};}
function pairs(c,q,p,x){return {c:c,t:'match',q:q,pairs:p,x:x};}
function explain(c,q,model,rubric){return {c:c,t:'teach',q:q,model:model,rubric:rubric};}
function add(form,family,tid,title,img,items,src){var id='e1v1-'+form+'-case-'+family,t=topic(tid);items.forEach(function(it,i){it.id=id+'-'+String.fromCharCode(97+i);it.s=src||t.sources;it.topics=[tid];it.pool='exam1';it.mock=false;it.emphasis=['R0924:lines '+t.lines];});if(family==='volcano'){img=L.util.clone(img);img.cap='McGraw-Hill volcano block diagram · section 6.1';img.alt=form==='A'?'Broad gently sloping volcanic edifice with layered flows':form==='B'?'Steep volcanic edifice with layers and a central conduit':'Small volcanic cone with a summit crater and fragment layers';}var cs={id:id,ch:L.SECTIONS.find(function(s){return s.id===L.CONCEPTS[items[0].c].sec;}).ch,title:title,stem:'Use the supplied McGraw-Hill figure. Identify the feature or process, then explain the basic connection.',media:img,items:items,inv:false,exam1:true,topics:[tid]};L.A.kase(cs);X.forms[form].cases.push(id);}
// 1. Rock cycle
add('A','cycle','T1','Follow a surface-to-depth rock path',media('T1'),[
 pairs('c1-cycle','Match each part of the cycle to what it does.',[['Weathering','Breaks rock down'],['Deposition','Leaves sediment in a new location'],['Solidification','Turns melt into solid rock']],'Weathering breaks down; deposition lays down; solidification cools a melt into rock.'),
 f('c1-cycle','After the “melting” arrow, the material is molten rock called what?',['magma'],'Melting produces magma; cooling it produces igneous rock.'),
 explain('c1-cycle','Does a rock have to complete every arrow in this picture? Explain briefly.','No. Rock-cycle routes depend on conditions. An igneous rock can metamorphose directly or weather into sediment, skipping other stages.',['Says that a full fixed loop is unnecessary','Gives one valid alternate path'])
]);
add('B','cycle','T1','Read the rock-cycle processes',media('T1'),[
 pairs('c1-cycle','Match the conditions to the resulting rock category.',[['Solidifying magma','Igneous'],['Compacted and cemented sediment','Sedimentary'],['Changed by heat and pressure without melting','Metamorphic']],'The three rock categories are defined by their formation processes.'),
 f('c1-cycle','Which labeled process brings deeply buried rock toward the surface?',['uplift'],'Uplift can expose buried rocks to weathering.'),
 explain('c1-cycle','Why does the route through melting and solidification end in an igneous rock?','The original rock loses its solid form when it melts. The final rock forms by cooling a melt, the defining igneous process.',['Connects melting with magma','Connects solidification with igneous rock'])
]);
add('C','cycle','T1','Connect weathering to sedimentary rock',media('T1'),[
 m('c1-cycle','An exposed rock is broken into loose grains. Which labeled step fits?','Weathering',['Melting','Solidification','Metamorphism'],'Weathering breaks rock into material that can be eroded and transported.'),
 f('c1-sedenv','Minerals glue deposited grains together. Name this lithification process.',['cementation','cementing'],'Cementation binds grains; compaction packs them more closely.'),
 explain('c1-cycle','Distinguish deformation/metamorphism from the melting step shown below it.','Metamorphism changes rock while it stays solid, under heat, pressure, or fluids. Melting produces a liquid magma.',['Metamorphism remains solid','Melting produces magma'])
]);
// 2. Plate diagrams: direct matches to the simple lecture panels.
add('A','plates','T4','Read the two-plate geometry',media('T4',1),[
 f('c3-geometry','The figure shows how many plates, despite the bend in their shared boundary?',['two','2'],'Two plates share a boundary whose orientation changes; a bend does not create another plate.'),
 pairs('c3-boundtypes','Match motion across the boundary segment to its type.',[['Plates moving apart','Divergent'],['Plates sliding past one another','Transform']],'A single plate boundary can contain different segment types because orientation changes.'),
 explain('c3-geometry','Why can the same two moving plates have both divergent and transform segments?','The boundary changes orientation. Motion separates the plates across one segment but is parallel to another, producing sliding.',['Mentions boundary orientation','Distinguishes separating from parallel sliding'])
],['L3:37']);
add('B','plates','T4','Compare the three relative motions',media('T4'),[
 pairs('c3-boundtypes','Match the boundary to its crustal effect.',[['Divergent ridge','Creates oceanic crust'],['Subduction boundary','Consumes oceanic lithosphere'],['Transform boundary','Neither creates nor consumes crust']],'Constructive, destructive, and conservative describe these contrasting crustal effects.'),
 f('c3-boundtypes','What is the other name used in the review for a crust-creating boundary?',['constructive','constructive boundary'],'A divergent ridge constructs new oceanic crust.'),
 explain('c3-boundtypes','How would arrows differ between convergence and divergence?','Across a convergent boundary, relative motion is toward the boundary/other plate. Across a divergent boundary, plates move apart.',['Convergence points toward','Divergence points apart'])
],['L3:20','L3:22','L3:25']);
add('C','plates','T4','From a rift to an ocean',media('T4',2),[
 pairs('c3-rifting','Connect each example with the stage shown in the figure.',[['East African Rift','Continental stretching and faulting'],['Red Sea','Young ocean basin'],['Modern Atlantic','Widened ocean basin']],'The slide progresses from continental rifting to seafloor spreading and a wider ocean.'),
 f('c3-rifting','At the spreading center, do the plates move toward or away from one another?',['away','apart','away from one another','away from each other'],'Rifting and spreading require divergent motion.'),
 explain('c3-rifting','Why is new oceanic crust able to form as the plates separate?','Mantle rises and partly melts; magma rises into the opening and cools to form new oceanic crust.',['Mentions upwelling/magma','Connects cooling magma with new crust'])
],['L3:23','L3:24']);
// 3. Seafloor evidence
add('A','seafloor','T3','Magnetic reversals through time',media('T3'),[
 m('c3-magnetic','After a reversal, where should the newest polarity band first appear?','At the ridge axis',['At the distant continental margin','Only in the oldest outer bands','Only on one side of the ridge'],'Fresh basalt records the current field near the ridge axis.'),
 f('c3-magnetic','What process moves the older magnetic bands away from the ridge?',['seafloor spreading','sea floor spreading','spreading'],'New crust forms and spreading moves older crust outward.'),
 explain('c3-magnetic','Why do corresponding bands appear on both sides of the ridge?','Both sides receive new basalt during the same magnetic intervals, and spreading carries those matching records away from the axis.',['Records the same magnetic intervals','Crust moves outward on both sides'])
],['L3:40','L3:41']);
add('B','seafloor','T3','Drill cores away from the ridge',media('T3',1),[
 m('c3-seafloorage','Which drill location should reach the youngest volcanic rock?','The location nearest the ridge',['The location farthest from the ridge','Every location has the same age','The location with the thickest sediment'],'Oceanic volcanic crust is newly formed at the ridge and ages outward.'),
 m('c3-seafloorage','Why is sediment generally thicker farther from the ridge?','More time has been available for accumulation',['The basalt has turned completely into sediment','Sediment forms only at trenches','Young crust cannot hold any sediment'],'Older crust has generally had more time to collect sediment.'),
 explain('c3-seafloorage','Does the thicker sediment prove the basaltic crust itself thickened by that amount?','No. Sediment cover is a layer deposited on top of the volcanic crust; the two thicknesses describe different materials.',['Distinguishes sediment from volcanic crust','States that one thickness does not directly establish the other'])
],['L3:42']);
add('C','seafloor','T3','Cooling away from a ridge',media('T3',2),[
 m('c3-seafloorage','The ridge is high and its lithosphere is thin. What happens as the plate cools away from it?','Lithosphere thickens and subsides',['Lithosphere gets hotter and rises','The oceanic crust becomes continental granite','The plate stops recording its age'],'Cooling makes more mantle rigid and increases density, leading to subsidence.'),
 f('c3-mor','What broad rock category forms when the ridge magma solidifies?',['igneous','igneous rock'],'Oceanic basalt and gabbro are igneous products of cooling magma.'),
 explain('c3-seafloorage','Name two differences you expect between old oceanic lithosphere and young lithosphere at this ridge.','Old oceanic lithosphere is generally cooler, denser, thicker, and deeper than young lithosphere at the ridge.',['Gives two correct contrasts','Uses lithosphere rather than claiming basaltic crust thickens equally'])
],['L3:23','L3:42','L3:43']);
// 4. Layers and isostasy
add('A','layers','T5','Floating wooden blocks',media('T5'),[
 m('c1-isostasy','For blocks of the same density, which change raises the top farther above water?','Increasing block thickness',['Decreasing block thickness','Increasing density at unchanged thickness','Changing the label on the block'],'At equal density, thicker blocks have greater absolute height above and below the waterline.'),
 f('c1-isostasy','Name the Earth-science relationship illustrated by the floating-block analogy.',['isostasy'],'Crustal thickness and density help determine equilibrium elevation.'),
 explain('c1-isostasy','Use this analogy to explain why thick continental crust can support a high mountain region.','A thicker, relatively buoyant crustal block projects higher while extending a deeper root below it, like a thicker wooden block.',['Links thicker crust with greater elevation','Mentions a deeper root or the floating-block comparison'])
],['L1B:15','L1B:16']);
add('B','layers','T5','Rigid and weak layers',media('T5',1),[
 pairs('c1-lithos','Match each layer with its mechanical behavior.',[['Lithosphere','Rigid'],['Asthenosphere','Hotter and weaker; mostly solid']],'Mechanical layering separates the rigid plate from the weaker underlying mantle.'),
 f('c1-lithos','What abbreviation did the professor use for the boundary between these layers?',['LAB','lithosphere asthenosphere boundary','lithosphere-asthenosphere boundary'],'LAB stands for lithosphere–asthenosphere boundary.'),
 explain('c1-lithos','Why is “the lithosphere is just the crust” incomplete?','The lithosphere contains both the crust and the rigid uppermost mantle, as the bracket in the figure shows.',['Includes crust','Includes rigid uppermost mantle'])
],['L1B:14','R0924:lines 1716–2090']);
add('C','layers','T5','Composition versus behavior',media('T5',2),[
 pairs('c1-layers','Match the compositional layer with its description.',[['Crust','Thin outer rock layer'],['Mantle','Thick silicate-rock layer'],['Core','Iron–nickel-rich interior']],'These divisions are based mainly on composition.'),
 m('c1-layers','Which pairing of core states is shown?','Liquid outer core; solid inner core',['Solid outer core; liquid inner core','Both entirely gaseous','Both entirely sedimentary'],'The outer core is liquid and the inner core solid.'),
 explain('c1-lithos','How is the lithosphere–asthenosphere division different from crust–mantle–core?','Crust–mantle–core is compositional. Lithosphere–asthenosphere describes mechanical strength and behavior, distinguishing rigid from weaker material.',['Composition versus mechanical behavior','Rigid lithosphere versus weaker asthenosphere'])
],['L1B:12','L1B:14']);
// 5. Classification and texture
add('A','igneous','T10','Use the classroom classification chart',media('T10'),[
 pairs('c5-classify','Match the two felsic rock names to their typical texture.',[['Granite','Coarse-grained'],['Rhyolite','Fine-grained']],'They share a felsic composition but differ in texture.'),
 m('c5-silica','Which listed mineral best supports the felsic side of the chart?','Quartz',['Olivine','Only pyroxene','Only calcium-rich plagioclase'],'Quartz is characteristic of felsic compositions.'),
 explain('c5-classify','How can granite and rhyolite have similar composition but different names?','Their mineral/chemical compositions are similar, but slower versus faster cooling produces coarse versus fine textures, so they occupy different rows.',['Similar composition','Different cooling histories/textures'])
]);
add('B','igneous','T8','Read a porphyritic specimen',media('T8'),[
 m('c5-voltex','Which visible relationship matters most for interpreting this texture?','Large crystals in a finer groundmass',['Holes all exactly the same diameter','Layered sediment with rounded pebbles','A uniform mass with no crystals'],'The contrast in crystal size is the diagnostic feature of a porphyritic texture.'),
 f('c5-voltex','What are the large crystals called?',['phenocrysts','phenocryst'],'Phenocrysts are the larger crystals enclosed in a finer groundmass.'),
 explain('c5-voltex','Describe the simple two-stage cooling history recorded by this rock.','Larger crystals grew during slower cooling at depth; the remaining melt later cooled faster near or at the surface, forming the finer groundmass.',['Early slower crystal growth','Later faster cooling of the remaining melt'])
],['TB5:5.1']);
add('C','igneous','T10','Read composition and cooling together',media('T10'),[
 pairs('c5-classify','Match the chart descriptions to the rock name.',[['Coarse and mafic','Gabbro'],['Fine and mafic','Basalt'],['Coarse and ultramafic','Peridotite']],'Use both axes: composition and texture.'),
 m('c5-classify','If a mafic melt cools much more slowly, what generally changes most directly?','Its crystal size increases',['Its composition must become felsic','Its minerals must become sediment grains','Its silica content must become zero'],'More time for crystal growth generally produces a coarser texture.'),
 explain('c5-classify','Explain why identifying a dark color alone is not enough to name an igneous rock from this chart.','Color can suggest composition but is not sufficient. Mineral composition and texture/crystal size together distinguish chart entries.',['Uses mineral composition rather than color alone','Also considers texture/crystal size'])
]);
// 6. Bowen and melting graphs
add('A','melting','T12','Read Bowen’s reaction series',media('T12'),[
 pairs('c5-bowen','Match the mineral group to its part of the cooling sequence.',[['Olivine and Ca-rich plagioclase','Higher-temperature / earlier'],['Quartz and K-feldspar','Lower-temperature / later']],'Bowen’s diagram orders crystallization from higher to lower temperature.'),
 m('c5-bowen','On the discontinuous branch, which follows olivine during cooling?','Pyroxene',['Quartz','Potassium feldspar','Muscovite'],'The branch goes olivine, pyroxene, amphibole, biotite.'),
 explain('c5-partial','When a source rock is only partly melted, why should you not assume that its melt has the same composition as the whole rock?','Components melt at different temperatures. Lower-melting components enter the liquid first, so the melt can be more silica-rich than the whole source.',['Selective melting of components','Different melt and source composition'])
]);
add('B','melting','T7','Read the decompression graph',media('T7',1),[
 m('c5-ptread','Follow the vertical path from C toward B. Which variable decreases?','Pressure',['Temperature','Silica content shown on the horizontal axis','Time shown on the vertical axis'],'Pressure increases downward in this figure, so moving upward reduces pressure while temperature stays similar.'),
 f('c5-melt3','Name the melting mechanism represented by this upward path.',['decompression','decompression melting'],'Hot rock can begin melting as pressure decreases.'),
 explain('c5-melt3','Connect this path to mantle beneath a mid-ocean ridge.','As plates pull apart, hot mantle rises. Pressure decreases without much temperature change, allowing partial melting.',['Mantle rises beneath separating plates','Pressure decrease allows melting'])
],['TB5:5.5','L3:23']);
add('C','melting','T7','Read the wet and dry melting curves',media('T7',2),[
 m('c5-ptread','Adding water moves the melting boundary in which direction on this graph?','Toward lower temperature',['Toward higher temperature','Only toward greater depth','It leaves the boundary unchanged'],'Water lowers the melting temperature, shifting the boundary leftward.'),
 m('c5-ptread','Point E lies between the dry and wet boundaries. What can happen after water is added?','Melting begins without increasing temperature',['The rock must cool before melting','The rock cannot melt at this pressure','All iron immediately turns into gas'],'The same point moves into the melt field relative to the wet curve.'),
 explain('c5-subduction','Where does the water that promotes mantle melting in a subduction zone commonly come from?','It is released from water-bearing minerals in the descending slab and enters the overlying mantle.',['Released from slab minerals','Enters overlying mantle and lowers its melting temperature'])
],['TB5:5.5','TB5:5.10','L3:26']);
// 7. Volcanoes
add('A','volcano','T14','Recognize the broad volcano',media('T14'),[
 f('c6-shield','Name the broad volcano type shown in the source block diagram.',['shield','shield volcano'],'A shield has broad, gently sloping flanks built largely by fluid flows.'),
 m('c5-visc','Which lava behavior best builds this profile?','Low-viscosity lava travels far from the vent',['Very viscous lava stays only at the vent','Loose pebbles are cemented into flat beds','Continental crust folds without volcanism'],'Fluid lava spreads outward, building a wide, gentle profile.'),
 explain('c6-shield','Link the usual magma composition, viscosity, and resulting volcano shape.','Basaltic/mafic lava is relatively low viscosity and flows far, producing the broad, gently sloping shield.',['Basaltic/mafic composition','Low viscosity and broad spreading shape'])
],['TB6:6.1','TB6:6.4','TB5:5.7']);
add('B','volcano','T14','Recognize a layered steep volcano',media('T14',1),[
 f('c6-composite','Name the volcano type shown, with a steep profile and layers of eruption products.',['composite','composite volcano','stratovolcano','strato volcano'],'Composite volcanoes contain interlayered lava and fragmental products.'),
 m('c6-composite','Which example from the review fits this volcano type?','Mount St. Helens',['A broad Hawaiian shield','A mid-ocean ridge alone','The Himalayan collision belt'],'Mount St. Helens and Mount Fuji are composite volcano examples.'),
 explain('c5-visc','Compared with a typical basaltic shield, why do many composite volcanoes have steeper profiles?','More viscous magma spreads less easily, and repeated eruptions build layers of lava and fragmental material around the vent.',['Higher viscosity reduces spreading','Layered eruption products build the steeper edifice'])
],['TB6:6.1','TB6:6.7','TB6:6.8','TB5:5.7']);
add('C','volcano','T14','Recognize a small fragment-built cone',media('T14',2),[
 f('c6-types','Name the small cone built mainly of loose scoria around a vent.',['scoria cone','cinder cone'],'Scoria/cinder cones accumulate erupted fragments around the vent.'),
 m('c6-types','Which material mainly makes up this cone?','Loose volcanic fragments',['A single coarse-grained granite pluton','Folded continental sedimentary beds','A thick ice sheet with no volcanic material'],'Fragment accumulation distinguishes this cone-building process from widespread fluid lava flows.'),
 explain('c6-types','Why does a steep slope here not prove the magma was silica-rich and highly viscous?','Loose basaltic scoria can accumulate in a steep pile. The cone slope reflects fragment deposition, so a steep cone can form from mafic magma.',['Fragments can pile steeply','Basaltic/mafic magma can supply those fragments'])
],['TB6:6.1','TB6:6.3']);
})(window.L);
