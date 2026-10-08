/* Editorial reading emphasis. Explicit card/field selections; no quiz or storage changes. */
(function(L){
  'use strict';
  var lecture='Repeated lecture emphasis · October 1 and 6 · textbook §8.1–8.2';
  function field(selector,terms,gold){return {selector:selector,terms:terms||[],gold:gold||[]};}
  function paragraphs(rows){return rows.map(function(terms,i){return field('p:nth-of-type('+(i+1)+')',terms);});}
  var plans={
    'g7-intro':paragraphs([
      ['Fraser River','branching and rejoining channels illustrate a braided river','slowing flow disperses sediment and builds a delta'],
      ['weathering produces it, erosion removes it, a stream transports it, and decreasing flow allows deposition'],
      ['pore spaces hold groundwater']
    ]),
    'g8-intro':paragraphs([
      ['Folded sedimentary layers and thrust faults record shortening','Cleavage may cut the older bedding'],
      ['burial and heating promoted metamorphism','erosion removed weaker layers more rapidly'],
      ['deposition first creates layers; deformation changes their geometry','A ridge is not automatically an anticline']
    ]),
    'g7-1a':paragraphs([
      ['Fluvial means stream or river processes','Floodplains accumulate mud and sand during floods'],
      ['delta grows where a stream enters standing water and slows','dunes commonly contain well-sorted sand','Glaciers carry a wide size range'],
      ['grain size, sorting, sedimentary structures, and plant or shell remains','A single sandstone does not uniquely identify a desert']
    ]),
    'g7-2a':paragraphs([
      ['lagoon is sheltered water behind a reef or barrier island','reef is constructed by organisms'],
      ['turbidity current, a sediment-laden water flow','fine dust and the remains of small marine organisms'],
      ['Ocean depth alone does not determine the sediment']
    ]),
    'g7-3a':paragraphs([
      ['Physical weathering breaks rock without requiring a chemical change','Expansion on unloading and roots growing in cracks'],
      ['Chemical weathering changes minerals','hydrolysis commonly turns silicate minerals into clay and dissolved products'],
      ['Weathering produces material; erosion removes it, and transport carries it elsewhere']
    ]),
    'g7-4a':paragraphs([
      ['size, roundness, and sorting independently','Clay can refer to a particle size or a mineral group'],
      ['Well-sorted sediment has a narrow range; poorly sorted sediment mixes sizes','do not infer a unique travel distance from either alone'],
      ['Strong water currents can move larger clasts than weak currents']
    ]),
    'g7-5a':paragraphs([
      ['Rounded gravel forms conglomerate; angular gravel forms breccia','Sand forms sandstone; silt forms siltstone','shale, whose aligned grains allow thin sheets to split apart'],
      ['Compaction moves grains closer together and expels pore fluids','Cementation precipitates mineral material in the pores and binds grains'],
      ['Sandstone is a size-based name; feldspar content adds a compositional distinction']
    ]),
    'g7-6a':paragraphs([
      ['Evaporation concentrates dissolved ions and can precipitate evaporites'],
      ['Accumulation of carbonate remains can form limestone','Plant material accumulates in waterlogged environments'],
      ['Halite is a mineral; rock salt is a rock composed mostly of halite','Coal records organic accumulation and preservation']
    ]),
    'g7-7a':paragraphs([
      ['not every layer represents an equal amount of time'],
      ['Graded bedding commonly places coarse grains at the bottom and successively finer grains above','Cross beds are inclined layers within a larger bed, formed as dunes or ripples migrate'],
      ['One event can produce a graded bed; a succession of environments can produce a longer fining- or coarsening-upward sequence']
    ]),
    'g7-8a':paragraphs([
      ['Breccia has angular fragments and commonly poor sorting','Angular fragments alone do not prove one specific origin'],
      ['Conglomerate contains rounded coarse clasts and finer matrix'],
      ['Grain rounding supports abrasion','coarse grain size supports transport or accumulation capable of handling large pieces']
    ]),
    'g7-9a':paragraphs([
      ['sand-sized particles but can form in many environments','Wind dunes tend to be well sorted and can preserve large cross beds'],
      ['Sand-sized particles alone do not identify a beach or desert'],
      ['the environment remains an interpretation that needs several supporting attributes']
    ]),
    'g7-10a':paragraphs([
      ['shale commonly splits into thin sheets because its minerals are aligned','Mud includes silt and clay'],
      ['Fine sediment settles where energetic transport subsides'],
      ['mudcracks indicate drying and exposure']
    ]),
    'g7-11a':paragraphs([
      ['Limestone consists mainly of calcite; dolostone consists mainly of dolomite'],
      ['limestone alone is not proof of a tropical ocean'],
      ['marble records later metamorphism of carbonate rock']
    ]),
    'g7-12a':paragraphs([
      ['facies is a body of sediment or rock with characteristics representing an environment','vertical succession at a fixed location'],
      ['transgression, the sea advances over land','regression, the sea retreats','changing water level or vertical land movement'],
      ['do not memorize sandstone–shale–limestone as a universal rule']
    ]),
    'g7-13a':paragraphs([
      ['observation such as “large cross beds” distinct from an interpretation such as “wind dunes.”'],
      ['older at the bottom toward younger at the top','Neither color alone proves a unique setting'],
      ['marine unit above land deposits can support transgression; land deposits above marine material can support regression']
    ]),
    'g7-14a':paragraphs([
      ['Connected pore spaces allow water to move','pore volume and connectivity are different properties'],
      ['Reservoir rock stores fluids, while less permeable layers can help trap them'],
      ['Fossils, sedimentary structures, and sequences help reconstruct Earth history']
    ]),
    'g7-15a':paragraphs([
      ['map, cross section, and photographs show the relations'],
      ['sandstone, conglomerate, and breccia deposited by streams and debris flows','present steep dips also record deformation after deposition'],
      ['Separate deposition from later tilting and erosion']
    ]),
    'g7-16a':paragraphs([
      ['Coal and plant remains support vegetation-rich land settings','mudcracks support exposure and drying','marine fossils support marine deposition'],
      ['Large cross beds in well-sorted sand support dunes','composition and fossils, not merely cliff color'],
      ['observation-to-interpretation table']
    ]),
    'g8-1a':[
      field('p:nth-of-type(1)',['Confining pressure acts approximately equally in all directions; differential stress varies with direction'],['Stress is force applied over an area','Strain is the resulting change in shape or size']),
      field('p:nth-of-type(2)',['it does not imply rock melts there'],['strength generally increases downward','temperature permits ductile deformation and strength decreases']),
      field('p:nth-of-type(3)',['depth increases downward and strength increases rightward'],['deform or fracture when imposed stress exceeds it'])
    ],
    'g8-2a':[
      field('p:nth-of-type(1)',[],['brittle failure and faults','distributed deformation while remaining solid']),
      field('p:nth-of-type(2)',['Temperature, pressure, rock type, fluids, and the conditions of deformation','A shear zone distributes deformation through a broader volume; a brittle fault concentrates movement along a fracture']),
      field('p:nth-of-type(3)',['Do not infer a unique stress type solely from the fact that a rock is brittle or ductile'])
    ],
    'g8-3a':paragraphs([
      ['joint is a fracture with little or no shear displacement','A fault records relative displacement across a fracture'],
      ['solidified igneous rock cools and contracts'],
      ['Strike is the compass orientation of a horizontal line on a plane','Dip is the inclination of the plane, measured downward from horizontal and perpendicular to strike']
    ]),
    'g8-4a':paragraphs([
      ['hanging wall is above the plane and the footwall is below it'],
      ['normal fault, the hanging wall moves down','reverse fault, the hanging wall moves up','low-angle reverse fault is a thrust','strike-slip fault, relative movement is predominantly horizontal'],
      ['uplifted horsts and downdropped grabens','matching offset layers, arrows, or other markers']
    ]),
    'g8-5a':paragraphs([
      ['in a simple upright sequence','an anticline arches upward and a syncline forms a trough','dome dips outward in several directions; a basin dips inward'],
      ['hinge is the region of greatest curvature','axial surface connects hinges through successive layers','An inclined or overturned axial surface is different from a plunging fold axis'],
      ['Compression commonly shortens layered rock through folding']
    ]),
    'g8-6a':paragraphs([
      ['Foliation is a planar metamorphic fabric','Schistosity reflects aligned visible platy minerals','Gneissic foliation is expressed as alternating mineral-rich bands'],
      ['Lineation is a linear feature','Bedding is an inherited sedimentary layer; cleavage can cut across it'],
      ['Relict features are preserved from the parent rock']
    ]),
    'g8-7a':paragraphs([
      ['slate → phyllite → schist → gneiss','not a universal path followed by every rock'],
      ['Quartz sandstone can become quartzite','Limestone can become marble','partial melting can form migmatite'],
      ['Marble and quartzite often lack strong foliation, even though both are metamorphic']
    ]),
    'g8-8a':paragraphs([
      ['while the rock remains predominantly solid','heat, pressure, stress, and fluids'],
      ['Recrystallization changes crystal size and texture','Neocrystallization grows new minerals as old minerals become unstable','Pressure solution dissolves material where stress is greatest'],
      ['do not describe solid-state recrystallization as simply melting and freezing again']
    ]),
    'g8-9a':paragraphs([
      ['High-temperature/low-pressure conditions occur near shallow magma bodies','high-pressure/low-temperature conditions occur where relatively cold material is subducted'],
      ['Contact metamorphism surrounds heat sources; regional metamorphism affects broader buried or thickened regions'],
      ['not automatically a geographic depth with a single universal temperature']
    ]),
    'g8-10a':paragraphs([
      ['Extension can form continental rifts, normal faults, tilted blocks, and grabens','seawater circulates through hot rock at mid-ocean ridges'],
      ['Strike-slip faults accommodate predominantly horizontal motion','local uplift or subsidence even though the main motion is lateral'],
      ['Keep plate-scale setting separate from the smaller local stress field']
    ]),
    'g8-11a':paragraphs([
      ['Thrust belts combine shortening, stacked sheets, and related fabrics'],
      ['Cleavage commonly lies approximately parallel to the axial surfaces of folds formed in the same event','not proof that all fabrics everywhere formed simultaneously'],
      ['cross-cutting and overprinting to distinguish separate events']
    ]),
    'g8-12a':paragraphs([
      ['Weathering and erosion exploit joints, faults, and cleavage','Striations on a fault surface record slip direction'],
      ['A ridge is not automatically an anticline'],
      ['Distinguish the modern erosional surface from the original rock structure']
    ]),
    'g8-13a':paragraphs([
      ['Measurements of strike and dip help project structures below the surface'],
      ['A fault is younger than units it cuts','seals a fault constrains the fault to be older than that feature','an interval rather than one exact date'],
      ['Minerals can grow before, during, or after deformation']
    ]),
    'g8-14a':paragraphs([
      ['younger Mesozoic rocks occur in rift-related fault blocks'],
      ['collision history associated with assembly of the Appalachians','later rifting between North America and Africa'],
      ['Do not equate every fault on the map with the same episode']
    ]),
    'g8-15a':paragraphs([
      ['fine dull cleavage supports slate','quartz-rich interlocking sand grains support quartzite','recrystallized calcite supports marble','coarse mineral bands support gneiss'],
      ['fault type requires movement or an independently verified geometric relation'],
      ['observation → rock or structure → parent material or process → integrated sequence']
    ]),
    'brittle-graph':[
      field('ol li:nth-of-type(1)',['Right means greater strength or imposed stress; down means greater depth']),
      field('ol li:nth-of-type(2)',['fracture in the upper region, solid-state flow in the lower region'],['Left of the curve is below failure strength. Right of it exceeds the strength']),
      field('ol li:nth-of-type(3)',[],['Confinement first strengthens the brittle crust','thermal effects dominate and make ductile flow easier']),
      field('p',['It is gradual and shallower in unusually hot regions; it is not a universal boundary'])
    ],
    'brittle-response':[
      field('.bd-example-grid > div:nth-of-type(1) p',['Matching layers become offset across a fault']),
      field('.bd-example-grid > div:nth-of-type(2) p',['changes shape while solid','Continuous bent layers']),
      field('tbody tr:nth-of-type(1) td:nth-of-type(2)',[],['Force per unit area']),
      field('tbody tr:nth-of-type(2) td:nth-of-type(2)',[],['A change in size or shape']),
      field('tbody tr:nth-of-type(3) td:nth-of-type(3)',['Original shape returns after unloading']),
      field(':scope > p',['stress direction','how rock responds'])
    ],
    'brittle-model':[
      field('p',['breaks rock or permits slip along a fracture','changes shape while rock remains solid','flow does not require melting'])
    ]
  };
  // Table targets are selected cells and relationships, never an automatic first-column rule.
  var comparisons={
    E2T1:[[1,1,'Channel sand or gravel; overbank mud'],[2,2,'A river slows in standing water'],[3,1,'Well-sorted wind-moved sand'],[4,2,'Barrier or reef reduces wave energy']],
    E2T2:[[1,1,'Rock breaks into fragments'],[2,1,'Minerals react or dissolve'],[4,1,'Grains pack, pore space shrinks'],[5,1,'New minerals bind grains']],
    E2T3:[[1,1,'Angular gravel-sized clasts'],[2,1,'Rounded gravel-sized clasts'],[3,1,'Sand-sized grains'],[4,1,'shale is fissile']],
    E2T4:[[1,2,'Carbonate accumulation or precipitation'],[2,2,'replacement by magnesium-bearing fluids'],[4,1,'Microcrystalline silica'],[5,2,'Evaporation / plant preservation and burial']],
    E2T5:[[2,1,'Coarse base becomes finer upward'],[2,2,'Settling during waning flow'],[3,1,'Inclined laminae within bounding surfaces'],[3,2,'Migrating dunes or ripples']],
    E2T6:[[1,1,'Marine settings migrate landward'],[2,1,'Marine settings migrate seaward'],[3,1,'An interval is missing'],[4,1,'Porous storage capped by low permeability']],
    E2T7:[[1,1,'Force per unit area'],[2,1,'Shape or volume change'],[3,1,'Recoverable strain'],[4,1,'Fracturing'],[5,1,'Solid-state distributed deformation']],
    E2T8:[[1,1,'No appreciable slip along fracture'],[2,1,'Hanging wall down'],[3,1,'Hanging wall up'],[4,1,'Low-angle reverse fault'],[5,1,'Mainly horizontal relative slip']],
    E2T9:[[1,1,'Older layers in core'],[2,1,'Younger layers in core'],[3,1,'Step-like bend'],[4,1,'Layers dip outward/inward in all directions'],[5,1,'Surface through hinges / axis inclination']],
    E2T10:[[1,1,'Fine dull cleavage'],[2,1,'silky sheen'],[3,1,'Visible aligned mica'],[4,1,'Coarse compositional bands'],[5,1,'Interlocking calcite/quartz']],
    E2T11:[[1,1,'Grains reorganize or grow'],[2,1,'Minerals change stability'],[3,1,'Components enter or leave'],[4,1,'Strong local heating near intrusion'],[5,1,'high pressure at relative coolness']],
    E2T12:[[1,1,'Extension, horsts/grabens'],[2,1,'Shortening'],[3,1,'Later fabric differs from original layering'],[4,1,'Observed slip predates the sealing unit'],[5,1,'Collision, metamorphism, later rifting']]
  };
  Object.keys(comparisons).forEach(function(id){plans['compare-'+id]=comparisons[id].map(function(x){return field('tbody tr:nth-of-type('+x[0]+') td:nth-of-type('+(x[1]+1)+')',[x[2]]);});});
  function attr(s){return Uesc(s).replace(/'/g,'&#39;');}
  function Uesc(s){return L.util.esc(String(s));}
  function richHTML(html,spec,used){
    used=used||new Set();
    var tokens=html.split(/(<[^>]+>)/g),text='',runs=[];
    tokens.forEach(function(t,i){if(i%2===0){runs.push({i:i,start:text.length,end:text.length+t.length});text+=t;}});
    var ranges=[],low=text.toLowerCase();
    (spec.gold.concat(spec.terms)).slice().sort(function(a,b){return b.length-a.length;}).forEach(function(phrase){
      var key=phrase.toLowerCase();if(used.has(key))return;
      var at=low.indexOf(key);
      while(at>=0){
        var end=at+phrase.length,preceding=text[at-1]||'',following=text[end]||'';
        if(!/[a-z0-9]/i.test(preceding)&&!/[a-z0-9]/i.test(following)&&!ranges.some(function(r){return at<r.end&&end>r.start;})){
          ranges.push({start:at,end:end,gold:spec.gold.some(function(p){return p.toLowerCase()===key;})});used.add(key);break;
        }
        at=low.indexOf(key,at+1);
      }
    });
    ranges.sort(function(a,b){return a.start-b.start;});
    runs.forEach(function(run){var t=tokens[run.i],parts=[],pos=0;ranges.forEach(function(r){var start=Math.max(r.start,run.start)-run.start,end=Math.min(r.end,run.end)-run.start;if(start>=end)return;parts.push(t.slice(pos,start),'<mark class="'+(r.gold?'e2-study-emphasis':'e2-study-term')+'"'+(r.gold?' title="'+attr(lecture)+'"':'')+'>'+t.slice(start,end)+'</mark>');pos=end;});parts.push(t.slice(pos));tokens[run.i]=parts.join('');});
    return tokens.join('');
  }
  function wrap(id,html){return '<div class="e2-reading-prose" data-e2-reading="'+attr(id)+'">'+html+'</div>';}
  function cardHTML(card,first){var html=first?((card.html.match(/<p>[\s\S]*?<\/p>/)||[])[0]||card.html):card.html;return wrap(card.id,html);}
  function apply(main){
    if(!L.examScope||L.examScope.current()!=='exam2')return;
    var roots=Array.from(main.querySelectorAll('[data-e2-reading]')).filter(function(root){return !root.closest('.item,.feedback,.opts,.casebox');});
    roots.forEach(function(root){var plan=plans[root.dataset.e2Reading];if(!plan||root.dataset.e2Colored)return;var used=new Set();plan.forEach(function(spec){root.querySelectorAll(spec.selector).forEach(function(el){el.innerHTML=richHTML(el.innerHTML,spec,used);});});root.dataset.e2Colored='true';});
    if(!roots.length||main.querySelector('.e2-reading-key'))return;
    var key=document.createElement('aside');key.className='e2-reading-key';key.setAttribute('aria-label','Reading color key');key.innerHTML='<span><i class="e2-key-dot gold" aria-hidden="true"></i>Gold: documented lecture emphasis</span><span><i class="e2-key-dot term" aria-hidden="true"></i>Lavender: key terms and distinctions</span><small>Colors guide study; they do not predict exam questions.</small>'+(main.querySelector('mark.e2-study-emphasis')?'<small>Gold here: repeated in the October 1 and 6 lectures · textbook §8.1–8.2.</small>':'');
    var anchor=main.querySelector('.sechead')||roots[0].closest('.card')||roots[0];if(anchor.classList.contains('sechead'))anchor.after(key);else anchor.before(key);
  }
  L.exam2Reading={plans:plans,cardHTML:cardHTML,wrap:wrap,richHTML:richHTML,apply:apply};
})(window.L);
