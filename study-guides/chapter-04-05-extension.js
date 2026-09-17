/* Additive extension: never renames legacy records or accesses browser storage. */
(() => {
  'use strict';
  const modules = [];
  const add = (id, chapter, title, source, body, concepts, secondary = false) => {
    const activities = [{id: `${id}-lesson`, type: 'lesson', title, body,
      keyPoints: concepts.map(c => c.rule), source}];
    for (const c of concepts) {
      c.questions.forEach((q, i) => activities.push({
        id: `${c.id}-q${i + 1}`, type: 'single', concept: c.id, topic: c.label,
        prompt: q[0], choices: q[1], answer: q[2], explanation: q[3],
        hint: c.hint, source: c.source || source, provenance: 'original',
        evidenceStatus: 'verified', priority: secondary ? 'secondary' : 'core'
      }));
    }
    modules.push({id, examId: 'exam-one', number: 22 + modules.length,
      title, kicker: `Chapter ${chapter} · ${secondary ? 'Secondary review' : 'Core mastery'}`,
      description: secondary ? 'Textbook and quiz coverage. Review after the core; exam weighting is unknown.' : body[0],
      source, priority: secondary ? 'secondary' : 'core', chapter,
      concepts: concepts.map(c => ({id: c.id, label: c.label})), activities});
  };
  add('ch4-foundations', 4, 'Minerals, Rocks, and Texture',
    'Textbook 4.1–4.2, pp. 78–81; September 8 transcript, mineral definition and crystalline/clastic discussion; Quiz 4 Q2–5 (concept coverage only)', [
      'A mineral is a naturally occurring inorganic solid with an ordered internal structure and a characteristic chemical composition. A rock is an aggregate of minerals or other geologic material. A mineral is built from elements; a rock can contain several minerals.',
      'Crystalline texture describes crystals grown together, often interlocking. Clastic texture describes fragments of older material that were broken, transported, and deposited. Read texture from grain size, shape, arrangement, and composition. The transcript repeatedly says “plastic”; in this context it means clastic.',
      'Do not confuse a crystal face with cleavage. A face develops during growth; cleavage describes how a crystal breaks. A natural glass can be solid without having the ordered structure required of a mineral.'
    ], [
      {id:'ch4-mineral-definition',label:'Mineral versus rock',rule:'Mineral criteria concern origin, state, structure, and composition.',hint:'A regular-looking exterior is not the same as an ordered interior.',questions:[
        ['A naturally produced volcanic glass is solid but lacks an ordered atomic arrangement. Which mineral criterion is missing?', ['Natural origin','Crystalline internal structure','Solid state','Geologic origin'],1,'The missing property is ordered internal structure. Being natural and solid alone does not make a material a mineral.'],
        ['A hand sample contains quartz, feldspar, and mica. Which description separates the levels correctly?', ['Each mineral is made of smaller rocks','The sample must be a single mineral','The rock contains minerals built from chemical elements','The sample cannot have crystalline texture'],2,'Elements combine into minerals, and multiple minerals can make up one rock. Mineral composition and rock composition are different levels of description.']
      ]},
      {id:'ch4-clastic-crystalline',label:'Crystalline versus clastic',rule:'Interlocking growth differs from accumulated fragments.',hint:'Ask whether grains grew together or existed as fragments first.',questions:[
        ['Sample A has interlocking grown crystals; sample B has rounded pieces of older rock cemented together. How do their textures differ?', ['A clastic; B crystalline','Both crystalline','Both clastic','A crystalline; B clastic'],3,'A records crystal growth; B records an accumulation of pre-existing fragments. Cement does not erase the clastic origin of the grains.'],
        ['A student identifies clastic texture solely because a specimen breaks into pieces when struck. What is the flaw?', ['Clastic describes the original fragment-based texture, not merely present breakage','Every broken rock is clastic','Only minerals can break','Clastic rocks never contain minerals'],0,'Clastic refers to the material and texture of the rock, not the fact that a collected specimen can be broken. Look at the grains within it.']
      ]}
    ]);
  add('ch4-identification',4,'Identify Minerals by Evidence',
    'Textbook 4.3–4.5 and 4.9, pp. 82–87, 94–95; September 8 transcript, properties and cleavage; Quiz 4 Q6–11, Q17–18',[
      'Use several independent properties. Hardness is resistance to scratching; the Mohs scale ranks minerals, not equal numerical steps of hardness. Streak is the color of powdered mineral, which may differ from the outside color. Luster describes reflected light. Magnetism and acid reaction are separate tests.',
      'Cleavage follows recurring planes of weaker bonding. Count directions, not the number of visible parallel surfaces. Mica separates into sheets in one direction; halite has three directions at right angles. Quartz lacks cleavage and fractures, often with curved surfaces.',
      'Calcite effervesces in dilute acid. Magnetite attracts magnetic objects; hematite is recognized by its reddish streak. Color alone is unreliable: impurities can give quartz many colors. No single photograph should be treated as a universal identification key.'
    ],[
      {id:'ch4-properties',label:'Choose the diagnostic test',rule:'Hardness, streak, magnetism, and acid reaction test different properties.',hint:'Name the observation produced by the test, not the tool used.',questions:[
        ['A specimen looks dark gray but leaves a red-brown powder on an unglazed tile. What did the tile reveal?', ['Cleavage angle','Streak','Specific gravity','Crystal growth rate'],1,'The tile reveals streak: the color of powdered mineral. Surface color and powder color need not match.'],
        ['Two pale minerals look similar. One bubbles when dilute acid is applied. Which distinction does this observation support?', ['It establishes which mineral is harder','It measures density','It supports an acid-reactive carbonate such as calcite','It proves both samples are quartz'],2,'Effervescence is a chemical response, not a hardness or density test. Calcite reacts readily with dilute acid, so the observation is useful alongside other properties.']
      ]},
      {id:'ch4-cleavage',label:'Cleavage versus fracture',rule:'Count recurring plane directions; do not count individual steps.',hint:'Many parallel sheets represent one family of planes.',questions:[
        ['A crystal peels into twelve parallel thin sheets. How many cleavage directions are demonstrated?', ['Twelve','Six','Three','One'],3,'The twelve surfaces are parallel examples of one cleavage direction. Cleavage directions describe orientations, not the number of pieces.'],
        ['A quartz crystal has flat external growth faces but its broken end is curved and irregular. Which interpretation fits?', ['Growth faces can coexist with fracture rather than cleavage','Every flat growth face is a cleavage plane','Quartz has perfect cleavage in three directions','Irregular breakage indicates sheet silicate structure'],0,'Growth faces record how a crystal formed. Cleavage records preferred breakage along weak planes. Quartz can have crystal faces but no cleavage.']
      ]}
    ]);
  add('ch4-silicates',4,'Silicate Structure → Mineral → Cleavage',
    'Textbook 4.7–4.8, pp. 90–93; September 8 and 10 transcripts, tetrahedra; Quiz 4 Q14',[
      'The fundamental building block has one silicon surrounded by four oxygens: the silicon–oxygen tetrahedron, SiO4 with net charge 4−. Adjacent tetrahedra can share oxygen atoms. Do not substitute SiO2 for the formula of an isolated tetrahedron; SiO2 is silica, including quartz, where oxygen atoms are shared.',
      'Learn five arrangements: isolated tetrahedra → olivine; single chains → pyroxene; double chains → amphibole; sheets → mica and clay; frameworks → quartz and feldspar. This is a structure map, not a list of color guesses.',
      'Strong chains resist breaking across their length. Pyroxene has two cleavage directions near 90°; amphibole has two near 60° and 120°. Weak bonding between mica sheets gives one cleavage direction. Quartz fractures. Feldspar is also a framework silicate but has cleavage, so “all frameworks lack cleavage” is false.'
    ],[
      {id:'ch4-tetrahedra',label:'The building block and its arrangements',rule:'SiO4 tetrahedra can link into chains, sheets, and frameworks.',hint:'Separate an isolated building block from the shared-oxygen bulk formula.',questions:[
        ['A model shows one small silicon atom surrounded by four oxygen atoms. What does it represent?', ['A carbonate group','A silicon–oxygen tetrahedron','A whole granite rock','A sodium-chloride cube'],1,'The tetrahedron contains one silicon and four oxygens. Its sharing geometry helps control the properties of silicate minerals.'],
        ['Which sequence correctly matches increasing linkage patterns to representative minerals?', ['Olivine sheets; mica isolated; quartz chains','Quartz isolated; olivine framework; mica chain','Olivine isolated; pyroxene single chain; mica sheet','Pyroxene sheet; mica framework; quartz double chain'],2,'Olivine has isolated tetrahedra, pyroxene single chains, and mica sheets. Amphibole is double-chain; quartz is a framework.']
      ]},
      {id:'ch4-structure-cleavage',label:'Predict cleavage from structure',rule:'Cleavage follows weak bonds; geometry determines the pattern.',hint:'Sheets separate between sheets, while chain minerals have two main plane directions.',questions:[
        ['Two silicates have elongated crystals. One cleaves near 90°; the other near 60°/120°. Which pairing fits?', ['First mica; second quartz','First amphibole; second pyroxene','Both quartz','First pyroxene; second amphibole'],3,'Single-chain pyroxene cleaves in two nearly perpendicular directions. Double-chain amphibole has two nonperpendicular cleavage directions near 60°/120°.'],
        ['Why is “framework silicate means no cleavage” an unsafe rule?', ['Feldspar is a framework silicate with cleavage, unlike quartz','Quartz is a sheet silicate','All framework minerals are liquids','Cleavage is unrelated to internal bonding'],0,'Quartz lacks cleavage, but other atoms in feldspar frameworks create planes of weaker bonding. Structure matters, but the complete bonding arrangement matters too.']
      ]}
    ]);
  add('ch4-chemistry',4,'Bonding and Mineral Families',
    'Textbook 4.6, 4.9, 4.11–4.12, pp. 88–89, 94–95, 98–101; September 8–10 transcripts; Quiz 4 Q9, Q12–13, Q19–20',[
      'Covalent bonding shares electrons. Ionic bonding involves attraction between opposite charges after electron transfer. Metallic bonding permits electrons to move through the solid. Weak bonds between structural layers help explain easy cleavage. The transcript phrase “COVID bonds” means covalent bonds.',
      'Silicates contain silicon–oxygen tetrahedra. Carbonates contain the carbonate group: calcite and dolomite are examples. Oxides include magnetite and hematite. Sulfides contain sulfur bonded to metals, such as pyrite and galena; sulfates contain sulfur with oxygen, such as gypsum. Halite is a halide.',
      'Watch the scale: oxygen and silicon dominate the crust; iron is also central when considering the whole Earth. Do not apply a crustal abundance statement to the entire planet. Detailed mineral counts and geographic examples are lower-priority recall here.'
    ],[
      {id:'ch4-bonding',label:'Bond mechanism',rule:'Sharing electrons differs from transferring electrons and attracting opposite charges.',hint:'Focus on what the electrons do.',questions:[
        ['An atomic model emphasizes electrons shared between adjacent atoms. Which bond mechanism is being illustrated?', ['Ionic attraction only','Covalent bonding','Gravity','Cleavage'],1,'Sharing electrons is the defining covalent mechanism. Ionic bonding instead emphasizes oppositely charged ions and electrostatic attraction.'],
        ['Why can a mineral be strongly bonded within a sheet yet split easily into sheets?', ['Strong bonds mean cleavage is impossible','Every bond must be equally weak','Bonds between the sheets are weaker than bonds within them','The mineral must melt before splitting'],2,'Directional differences in bond strength permit cleavage. The weakest recurring plane can separate while stronger bonds within each sheet remain intact.']
      ]},
      {id:'ch4-families',label:'Silicates and nonsilicate families',rule:'Sulfide is not sulfate; carbonate is not silicate.',hint:'Look for the defining chemical group, not a similar-sounding name.',questions:[
        ['A student groups gypsum with pyrite because both contain sulfur. What distinction was missed?', ['Both must be silicates','Pyrite contains no sulfur','Gypsum is a halide','Sulfates contain sulfur with oxygen; sulfides are a different family'],3,'Gypsum is a sulfate, while pyrite is a sulfide. Sharing one element does not make minerals members of the same chemical family.'],
        ['Which set contains only nonsilicate minerals?', ['Calcite, halite, magnetite','Quartz, feldspar, mica','Olivine, pyroxene, amphibole','Quartz, calcite, feldspar'],0,'Calcite is a carbonate, halite a halide, and magnetite an oxide. The other sets include silicon–oxygen tetrahedral minerals.']
      ]}
    ]);
  add('ch5-chart',5,'The Classification Chart: Read It Both Ways',
    'Classroom chart IMG_5737.JPG; textbook 5.2, pp. 114–115; September 10 and 15 transcripts, classification review; Quiz 5 Q4–5, Q13',[
      'Two independent axes name the common igneous rocks: composition and texture. Coarse/fine pairs are granite/rhyolite (felsic), diorite/andesite (intermediate), gabbro/basalt (mafic), and peridotite/komatiite (ultramafic). Learn both directions: properties → name and name → properties.',
      'Across the chart from felsic to ultramafic, silica generally decreases and color generally darkens as iron- and magnesium-rich minerals become more important. Color is a useful tendency, not the definition. Quartz and potassium feldspar favor the felsic end; pyroxene and olivine favor the mafic–ultramafic end.',
      'Plagioclase spans a broad range: sodium-rich toward felsic, calcium-rich toward mafic. A rock name predicts a mineral association, not a requirement that every possible mineral be present. Use the source chart and the readable comparison below before doing closed-notes retrieval.'
    ],[
      {id:'ch5-rock-pairs',label:'Name rocks from both axes',rule:'Granite/rhyolite; diorite/andesite; gabbro/basalt; peridotite/komatiite.',hint:'Pick the composition column first, then the grain-size row.',questions:[
        ['Two magmas have similar felsic composition. One cools into visible interlocking crystals; the other into a fine-grained rock. Which pair fits?', ['Gabbro and basalt','Granite and rhyolite','Diorite and basalt','Peridotite and andesite'],1,'Granite and rhyolite share felsic composition but differ in texture and cooling history. Composition and texture are independent classification axes.'],
        ['A rock is identified as diorite. Which two properties should you expect on the chart?', ['Fine-grained and mafic','Coarse-grained and felsic','Coarse-grained and intermediate','Fine-grained and ultramafic'],2,'Diorite occupies the coarse-grained intermediate cell. Andesite is its fine-grained compositional counterpart.']
      ]},
      {id:'ch5-mineral-associations',label:'Read the mineral bands',rule:'Quartz/K-feldspar favor felsic; pyroxene/olivine favor mafic–ultramafic.',hint:'Follow the mineral band into the composition column.',questions:[
        ['A mineral assemblage is dominated by olivine and pyroxene with little silica-rich material. Which end of the chart does it approach?', ['Felsic','Quartz-rich felsic','Pure potassium feldspar','Mafic to ultramafic'],3,'Olivine and pyroxene are characteristic iron- and magnesium-rich minerals toward the mafic–ultramafic end, unlike quartz-rich felsic assemblages.'],
        ['Moving across the chart from felsic toward mafic, what happens to the plagioclase association?', ['It tends from sodium-rich toward calcium-rich','It becomes increasingly quartz-rich','It disappears from all igneous rocks','It changes into a carbonate'],0,'The chart shows Na-rich plagioclase toward felsic and Ca-rich plagioclase toward mafic. This is a compositional variation within feldspar, not a change into quartz or carbonate.']
      ]}
    ]);
  add('ch5-textures',5,'Texture Records Cooling History',
    'Textbook 5.1–5.3 and 5.8, pp. 112–117, 126–127; September 10–15 transcripts, textures; Quiz 5 Q3, Q6, Q13',[
      'Slow cooling allows crystals time to grow; faster cooling generally produces smaller crystals. Very rapid cooling can produce glass. Large crystals embedded in a fine groundmass make a porphyritic texture: an earlier slower-growth stage followed by a faster-cooling stage.',
      'Vesicles are preserved gas-bubble spaces, not crystals or cleavage planes. Pumice is typically light-colored and felsic; scoria is typically darker and mafic. Obsidian is glassy. Tuff forms from volcanic ash; volcanic breccia contains coarser angular fragments. Pegmatite is exceptionally coarse-grained, commonly granitic, with volatile-rich conditions aiding growth.',
      'Keep texture and composition separate. Large crystals do not automatically mean felsic, and dark color does not automatically mean fast cooling. Fragmental volcanic rocks are igneous even though their pieces can resemble clasts in sedimentary rocks.'
    ],[
      {id:'ch5-cooling-texture',label:'Cooling rate and two-stage cooling',rule:'Slow → coarse; fast → fine; two stages can produce porphyritic texture.',hint:'Ask how much time each population of crystals had to grow.',questions:[
        ['A lava contains large early crystals surrounded by a much finer groundmass. Which history best explains both sizes?', ['Only one very rapid cooling stage','Crystal growth at depth followed by faster cooling near the surface','Only sediment deposition','Pressure alone enlarged every crystal equally'],1,'The larger crystals grew during an earlier slower stage; the remaining melt cooled faster to form the fine groundmass. This is the basic porphyritic interpretation.'],
        ['Two mafic rocks have the same broad composition, but one formed deep underground and is coarser. What explains the grain-size difference?', ['The deep rock must contain more silica','All mafic rocks cool at the same speed','Slower cooling at depth allowed more crystal growth','Coarse grains demonstrate sediment transport'],2,'The coarse texture records more time for crystal growth, not necessarily a different composition. Gabbro and basalt illustrate this contrast.']
      ]},
      {id:'ch5-special-textures',label:'Glass, bubbles, and fragments',rule:'Glassy, vesicular, and fragmental describe different physical clues.',hint:'A hole, a glassy mass, and a fragment tell different stories.',questions:[
        ['A specimen is full of rounded holes left when gas escaped from lava. What do those holes record?', ['A sheet-silicate structure','A Mohs hardness value','Cleavage planes','Vesicular texture'],3,'Vesicles are former gas-bubble spaces. They do not represent crystals, cleavage directions, or a hardness measurement.'],
        ['A deposit consolidates from fine volcanic ash rather than a continuous lava flow. Which rock name fits that origin?', ['Tuff','Pegmatite','Gabbro','Peridotite'],0,'Tuff is a rock made from volcanic ash. The fragmental volcanic origin distinguishes it from a continuous melt crystallizing into gabbro or pegmatite.']
      ]}
    ]);
  add('ch5-melting',5,'Why Rock Melts—and Why Magma Flows',
    'Textbook 5.4–5.5 and 5.7, pp. 118–121, 124–125; September 15 transcript, melting diagrams and syrup analogy; Quiz 5 Q7–9, Q11',[
      'Hot does not automatically mean molten. Much of the mantle remains solid because temperature must be compared with the melting boundary at that pressure. The geothermal gradient describes how temperature varies with depth; it is not itself the melting curve.',
      'Three routes promote melting: add heat, lower pressure while material rises (decompression), or add water/volatiles that lower the melting temperature. Water does not have to heat the rock or reduce its pressure to cause melting. In a diagram, identify which condition changes and how it crosses the solidus.',
      'Viscosity is resistance to flow. Higher temperature generally lowers magma viscosity; more silica generally increases it by promoting linked structures. Dissolved water generally lowers viscosity, whereas a higher crystal load generally raises it. Apply one-variable comparisons rather than treating viscosity as another word for density.'
    ],[
      {id:'ch5-melting-mechanisms',label:'Heat, decompression, and water',rule:'Cross the melting boundary by changing temperature, pressure, or composition.',hint:'Identify what changes; do not assume all melting requires extra heat.',questions:[
        ['Hot mantle rises and begins to melt even without a new heat source. Which change can explain this?', ['Pressure increases sharply','Pressure decreases during ascent','Its temperature must reach zero','Every atom stops vibrating'],1,'Decompression melting occurs when rising hot rock experiences lower pressure and crosses the melting boundary without requiring added heat.'],
        ['At the same temperature and pressure, dry rock stays solid while water-bearing rock begins melting. What changed?', ['Water raised the pressure','Water removed all silica','Water lowered the melting threshold','Water made the rock crystalline for the first time'],2,'Added water lowers the solidus, so melting can begin under conditions where dry rock remains solid. This is different from heating or decompression.']
      ]},
      {id:'ch5-viscosity',label:'Resistance to flow',rule:'Hotter generally flows more easily; more silica or crystals generally resists flow.',hint:'Use the warm-syrup analogy, then distinguish temperature from composition.',questions:[
        ['Two otherwise comparable magma samples differ only in temperature. Which should flow more easily?', ['The cooler one','Both must have identical viscosity','Temperature cannot affect flow','The hotter one'],3,'Increasing temperature generally lowers viscosity. The comparison holds other variables constant, just as warming syrup makes it flow more readily.'],
        ['At comparable temperature and crystal content, why does a silica-rich melt tend to resist flow more?', ['More linked silicon–oxygen structures hinder motion','Silica always makes a melt colder','It must have no atoms','Viscosity is only controlled by pressure'],0,'Linked silicon–oxygen structures increase resistance to flow. Temperature, dissolved water, and crystals also matter, so compare like conditions.']
      ]}
    ]);
  add('ch5-evolution',5,'Bowen and Changing Magma Composition',
    'Textbook 5.6 and 5.8, pp. 122–123, 126–127; September 15 transcript, assimilation and Bowen; Quiz 5 Q10, Q12',[
      'Bowen’s reaction series connects cooling to mineral sequence. On the discontinuous branch: olivine → pyroxene → amphibole → biotite. Plagioclase changes from calcium-rich toward sodium-rich on the continuous branch. Potassium feldspar, muscovite, and quartz are characteristic late, lower-temperature minerals.',
      'The sequence is not a requirement that every magma produce every mineral. Composition and conditions matter. The 1001-level target is early mafic versus late felsic minerals, plus recognition of the two branches—not memorizing a universal exact crystallization temperature.',
      'Partial melting need not produce a melt identical to its source. Crystal separation can remove early mafic minerals, leaving residual melt relatively silica-rich. Assimilation incorporates surrounding rock; magma mixing combines magmas. Keep these mechanisms separate: sorting crystals is not the same as melting wall rock.'
    ],[
      {id:'ch5-bowen',label:'Early and late crystallization',rule:'Early olivine/pyroxene contrasts with late quartz/K-feldspar/muscovite.',hint:'Trace cooling from the high-temperature end toward the low-temperature end.',questions:[
        ['Which pair best contrasts an early mineral with a late mineral in the introductory Bowen model?', ['Quartz then olivine','Olivine then quartz','Muscovite then pyroxene','Potassium feldspar then olivine'],1,'Olivine is characteristic of the early high-temperature end; quartz of the later lower-temperature end. The sequence is conditional on magma composition.'],
        ['What changes along Bowen’s continuous plagioclase branch as cooling proceeds?', ['Quartz becomes calcite','Mica changes into halite','Plagioclase tends from calcium-rich toward sodium-rich','Every mineral crystallizes simultaneously'],2,'The continuous branch tracks changing plagioclase composition. The discontinuous branch instead passes through distinct mineral groups.']
      ]},
      {id:'ch5-magma-evolution',label:'Separate evolution mechanisms',rule:'Crystal separation, assimilation, and mixing are different mechanisms.',hint:'Ask whether crystals leave, wall rock enters, or two magmas meet.',questions:[
        ['Early iron- and magnesium-rich crystals are removed from a magma. What is the general effect on the remaining liquid?', ['It must become identical to the removed crystals','Its composition cannot change','It immediately becomes a sediment','It becomes relatively less mafic and more silica-rich'],3,'Removing early mafic crystals changes the remaining melt in the opposite compositional direction. This is crystal fractionation, not assimilation.'],
        ['A magma melts and incorporates part of the surrounding country rock. Which process is occurring?', ['Assimilation','Crystal settling only','Decompression only','Streak formation'],0,'Assimilation incorporates wall/country rock into magma. Magma mixing joins magmas; crystal separation removes a solid fraction.']
      ]}
    ]);
  add('ch5-settings-review',5,'Secondary: Settings and Intrusive Shapes',
    'Textbook 5.9–5.14, pp. 128–139; Quiz 5 Q13–20. Detailed lecture coverage after 5.8 not established by the reviewed transcripts.',[
      'Secondary review: these topics appear in the supplied quiz and textbook, but their exam weight is unknown. Finish the chart and core cause-and-effect modules first. This section is not a claim that every geographic example will be examined.',
      'Mid-ocean ridges commonly produce basalt at the surface and gabbro at depth. At subduction zones, water released from a descending slab promotes melting in the overlying mantle. Magma interacting with thick continental crust can evolve toward intermediate or felsic composition. Oceanic hot spots commonly produce basalt; continental settings can include more evolved melts.',
      'A dike cuts across existing layering; a sill intrudes parallel to it. A laccolith domes overlying layers. A volcanic neck occupies a former conduit; a batholith is a large intrusive body. Columnar joints form as hot solid rock cools and contracts. Calderas involve collapse associated with magma withdrawal; do not confuse them with intrusive bodies.'
    ],[
      {id:'ch5-settings',label:'Tectonic setting and magma',rule:'Setting helps constrain composition; crustal interaction can modify magma.',hint:'Distinguish oceanic crust generation from continental magma evolution.',questions:[
        ['A ridge cross-section shows volcanic rock above a deeper coarse-grained mafic body. Which pairing fits?', ['Rhyolite over granite in every ridge','Basalt over gabbro','Quartz over calcite','Diorite over pumice'],1,'Basaltic volcanism and deeper gabbro are the surface and intrusive expressions of mafic magma in a typical oceanic ridge system.'],
        ['Why may magma beneath thick continental crust differ from its original mantle-derived composition?', ['Crust prevents all chemical interaction','Pressure forces every magma to become pure quartz','Assimilation and differentiation can modify it toward intermediate/felsic compositions','Only its name changes'],2,'Crustal interaction and magmatic evolution can change the melt composition. A tectonic setting is not a guarantee of one unmodified rock type.']
      ]},
      {id:'ch5-intrusions',label:'Geometry and cooling fractures',rule:'Cross-cutting dike; parallel sill; doming laccolith; contraction joints.',hint:'Use relationships to the host layers, not just vertical versus horizontal on the page.',questions:[
        ['An igneous sheet crosses several sedimentary layers at a steep angle. Which geometric relationship identifies it?', ['It is necessarily a sill because it is thin','It is a clast because layers are present','It must be a caldera','It is a dike because it cuts across layering'],3,'A dike cuts across pre-existing structure. A sill follows layering; its identity is relational, not simply whether it appears horizontal in a picture.'],
        ['A once-hot solid lava develops a polygonal network of cracks as it cools. Which process best explains it?', ['Thermal contraction of solid rock','Expansion of fully liquid lava','Cleavage of one giant crystal','Deposition of separate polygonal clasts'],0,'Cooling solid rock contracts and can fracture into columnar joints. The joint network is not mineral cleavage or a pile of transported polygonal pieces.']
      ]}
    ],true);
  const chart = modules.find(m=>m.id==='ch5-chart');
  chart.activities.push({id:'ch5-chart-full-match',type:'match',concept:'ch5-rock-pairs',
    prompt:'Reconstruct all four composition pairs. Each row lists coarse-grained / fine-grained rocks.',
    rows:[{label:'Granite / rhyolite',answer:'Felsic'},{label:'Diorite / andesite',answer:'Intermediate'},{label:'Gabbro / basalt',answer:'Mafic'},{label:'Peridotite / komatiite',answer:'Ultramafic'}],
    options:['Felsic','Intermediate','Mafic','Ultramafic'],hint:'Separate the composition column from the texture row.',
    explanation:'Each pair has the same broad composition but a different grain size. The four pairs reconstruct the main cells of the classroom chart.',source:chart.source,provenance:'original',evidenceStatus:'verified'});
  chart.activities.push({id:'ch5-chart-teachback',type:'teachback',concept:'ch5-rock-pairs',
    prompt:'Explain the classification chart to a classmate: what changes across it, what changes down it, and why basalt and gabbro are different names.',
    rubric:['Composition changes from felsic through intermediate and mafic to ultramafic across the columns.','Coarse versus fine grain size changes down the main rows.','Gabbro and basalt are both mafic; gabbro is coarse-grained and generally cools more slowly at depth.','Silica generally decreases toward ultramafic; color generally darkens but is not the sole criterion.'],
    hint:'Use both axes and connect texture to cooling.',explanation:'Self-rate against the rubric. The app does not automatically grade your prose.',source:chart.source,provenance:'original',evidenceStatus:'verified'});
  const silicates = modules.find(m=>m.id==='ch4-silicates');
  silicates.activities.push({id:'ch4-structure-match',type:'match',concept:'ch4-tetrahedra',
    prompt:'Match the representative mineral to its tetrahedral arrangement.',
    rows:[{label:'Olivine',answer:'Isolated'},{label:'Pyroxene',answer:'Single chains'},{label:'Amphibole',answer:'Double chains'},{label:'Mica',answer:'Sheets'},{label:'Quartz',answer:'Framework'}],
    options:['Isolated','Single chains','Double chains','Sheets','Framework'],hint:'Think of the five arrangement diagrams, not the mineral colors.',
    explanation:'Olivine is isolated, pyroxene single-chain, amphibole double-chain, mica sheet, and quartz framework. Feldspar also belongs to frameworks but can cleave.',source:silicates.source,provenance:'original',evidenceStatus:'verified'});
  // Collision checks abort before appending anything.
  const oldIds = new Set(window.GEOL_MODULES.flatMap(m => [m.id,...m.concepts.map(c=>c.id),...m.activities.map(a=>a.id)]));
  const incoming = modules.flatMap(m=>[m.id,...m.concepts.map(c=>c.id),...m.activities.map(a=>a.id)]);
  if (new Set(incoming).size !== incoming.length || incoming.some(id=>oldIds.has(id))) throw new Error('Chapter 4–5 ID collision; refusing replacement.');
  window.GEOL_MODULES.push(...modules);
  const coreItems = modules.filter(m=>m.priority==='core').flatMap(m=>m.activities.filter(a=>a.type==='single'));
  const quizzes = [
    {id:'chapter-four-core-drill',title:'Chapter 4 Core Drill',chapters:'Chapter 4',questions:coreItems.filter(q=>q.id.startsWith('ch4-'))},
    {id:'chapter-five-core-drill',title:'Chapter 5 Core Drill',chapters:'Chapter 5',questions:coreItems.filter(q=>q.id.startsWith('ch5-'))},
    {id:'chapters-four-five-boss-drill',title:'Chapters 4–5 Core Boss Drill',chapters:'Chapters 4–5',kind:'boss',questions:coreItems}
  ];
  if(quizzes.some(q=>window.GEOL_QUIZZES.some(old=>old.id===q.id))) throw new Error('Chapter 4–5 quiz collision.');
  window.GEOL_QUIZZES.push(...quizzes.map(q=>({...q,lane:'Exam 1',status:'Ready',description:'Original concept practice, not copied quiz questions. Same item roots as topic Labs; use topic Labs for confidence-based mastery.'})));
})();
