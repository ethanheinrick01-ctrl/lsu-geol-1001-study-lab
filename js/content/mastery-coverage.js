/* Reviewed-topic coverage repair. Keep all earlier IDs, keys and saved answers intact. */
(function(L){
'use strict';
var X=L.EXAM1,A=L.A;
// Promote only these reviewed foundations, rather than widening drills to entire textbook chapters.
var foundations={
 T1:['c1-igintro-s1','c1-igintro-f1'],
 T3:['c3-drift-evidence-s1','c3-drift-evidence-m1','c3-drift-problem-t1','c3-mor-m1'],
 T4:['c3-rifting-x1','c3-geometry-m1'],
 T5:['c1-isostasy-m2'],
 T6:['c5-hotspotmag-m1','c5-hotspotmag-m2'],
 T9:['c5-voltex-m2','c5-voltex-f2'],
 T11:['c4-commonsil-x1'],
 T12:['c5-cool-m1'],
 T13:['c5-subduction-m1','c5-subduction-m2','c5-hotspotmag-m1','c5-hotspotmag-m2'],
 T14:['c6-gasvisc-m1','c6-gasvisc-m2','c6-shield-m1'],
 T16:['c3-collision-s1']
};
X.foundationTopics={};
Object.keys(foundations).forEach(function(t){foundations[t].forEach(function(id){
 if(X.foundationIds.indexOf(id)<0)X.foundationIds.push(id);
 (X.foundationTopics[id]=X.foundationTopics[id]||[]).push(t);
});});
function opt(t){return {pool:'exam1',mock:false,topics:[t]};}
A.mc('e1v3-transform-motion','c3-transform',
 'A line extends beyond two offset ridge segments. The seafloor on both sides of this outer segment moves together in the same direction. How should you classify that segment?',[
 '*An inactive fracture zone|There is no relative sliding across this continuation.',
 'An active transform fault|The active transform lies between the ridge segments, where opposite sides move relative to each other.',
 'A subduction trench|The described motion does not carry one plate beneath another.',
 'A spreading center|The sides are not moving apart across this segment.'
 ],'Relative motion distinguishes the active transform between ridge segments from the inactive fracture-zone continuation.',['L3:31','L3:32','T0908'],opt('T4'));
A.mc('e1v3-cooling-sequence','c5-cool',
 'A cooling magma begins growing high-temperature mafic minerals while lower-temperature components remain liquid. What happens as cooling continues?',[
 'Every component must solidify at the temperature where the first crystal formed.|A magma contains components with different crystallization temperatures.',
 '*Lower-temperature minerals crystallize later from the remaining melt.|Crystallization proceeds through a temperature range, consistent with Bowen’s series.',
 'The later liquid must be hotter than the first crystals.|The whole system is cooling.',
 'The first crystals must melt before any other mineral can crystallize.|Further cooling promotes crystallization rather than requiring the first minerals to melt.'
 ],'High-temperature minerals crystallize earlier; lower-temperature components can remain molten until further cooling.',['TB5:5.8','T0915'],opt('T12'));
A.mc('e1v3-ridge-decompression','c5-divergent',
 'Two oceanic plates separate. Hot, mostly solid mantle rises to replace the material beneath the ridge. Which change allows some of it to melt?',[
 'Its pressure increases as it rises.|Pressure decreases toward the surface.',
 'The entire mantle was already a liquid ocean.|The mantle is mostly solid before partial melting.',
 '*Pressure falls while the rock remains hot.|Decompression allows rising mantle to cross its melting boundary.',
 'A subducting slab must release water beneath every ridge.|Slab-derived water is the subduction setting, not the basic ridge mechanism.'
 ],'Ridge separation permits mantle upwelling. Lower pressure causes partial melting and supplies basaltic magma.',['TB5:5.5','TB5:5.9','L3:23'],opt('T13'));
A.order('e1v3-ridge-process','c5-divergent',
 'Put the ridge processes in causal order, beginning with plate motion.',[
 'Oceanic plates move apart',
 'Hot mantle rises and experiences lower pressure',
 'Some mantle partially melts by decompression',
 'Magma cools to form new oceanic crust'
 ],'Seafloor spreading connects plate separation, mantle upwelling, decompression melting, and solidification. It does not require the entire mantle to be liquid.',['L3:23','TB5:5.9'],opt('T13'));
})(window.L);
