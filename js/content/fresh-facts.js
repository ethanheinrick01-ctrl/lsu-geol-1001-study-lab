/* Source-grounded observations for original mock questions. Each row has one independently checked interpretation. */
(function(L){
'use strict';
var sets=[];
function add(id,topic,concept,target,rows,extra){sets.push(Object.assign({id:id,topic:topic,c:concept,target:target,rows:rows.map(function(r,i){return {id:id+'-'+i,label:r[0],observation:r[1],why:r[2]};})},extra||{}));}
add('cycle','T1','c1-cycle','rock-forming process',[
 ['Weathering','Rainwater reacts with minerals in an exposed outcrop, weakening the rock in place.','Weathering breaks down or alters rock where it is exposed.'],
 ['Weathering','Roots widen cracks until pieces detach from a cliff, before those pieces are carried away.','Physical breakdown in place is weathering.'],
 ['Transport','A stream carries grains downstream without turning them into a solid rock.','Transport moves sediment from one place to another.'],
 ['Transport','Wind lifts sand from a dry channel and carries it across the valley.','Moving existing sediment is transport.'],
 ['Deposition','A river slows on entering a lake and leaves its sand on the lake floor.','Deposition occurs when transported sediment is laid down.'],
 ['Deposition','Sand carried by wind comes to rest behind a large boulder.','Settling sediment is deposition.'],
 ['Lithification','Loose sand becomes sandstone as grains compact and mineral cement binds them.','Compaction and cementation turn sediment into sedimentary rock.'],
 ['Lithification','Buried mud is compressed and cemented into a coherent sedimentary layer.','Lithification turns deposited sediment into rock.'],
 ['Metamorphism','A solid shale develops new minerals during burial; no liquid rock forms.','Heat and pressure can change rock while it remains solid.'],
 ['Metamorphism','A limestone is altered next to hot magma but remains solid throughout.','Solid-state change is metamorphism even when nearby magma supplies the heat.'],
 ['Solidification','A molten basaltic flow loses heat and becomes a solid rock.','Cooling a melt produces igneous rock by solidification.'],
 ['Solidification','Magma trapped below ground crystallizes into a solid pluton.','Crystallization of magma produces igneous rock.']
],{figure:['T1',0]});
add('time','T2','c2-time','broad time block',[
 ['Precambrian','A display highlights the enormous span before the Paleozoic, including the earliest part of Earth history.','Precambrian covers most of Earth history and precedes the three named eras in the course overview.'],
 ['Precambrian','A four-block history exhibit assigns most of its total timeline length to the oldest block.','The Precambrian is far longer than the later three blocks combined.'],
 ['Paleozoic','A timeline card belongs between the Precambrian and the dinosaur-dominated Mesozoic.','The course sequence is Precambrian, Paleozoic, Mesozoic, Cenozoic.'],
 ['Paleozoic','A museum groups early diverse marine life and the spread of life onto land before the Mesozoic.','Those broad landmarks belong to the Paleozoic in the course overview.'],
 ['Mesozoic','A display focuses on the interval after the Paleozoic and before the Cenozoic.','The Mesozoic lies between those two eras.'],
 ['Mesozoic','A broad Earth-history exhibit gives dinosaurs their principal era before the recent mammal-rich interval.','The Mesozoic is the dinosaur-associated era in the course overview.'],
 ['Cenozoic','A timeline card covers the most recent of the four broad blocks and includes the present day.','The Cenozoic follows the Mesozoic and continues today.'],
 ['Cenozoic','A museum emphasizes the recent mammal-rich interval after the Mesozoic.','The Cenozoic is the youngest broad block in this review.']
],{figure:['T2',0]});
add('ocean','T3','c3-seafloorage','position relative to an undisturbed spreading ridge',[
 ['Nearer the ridge','A core reaches relatively young basalt beneath a thin sediment cover.','New crust forms at ridges; younger crust has had less time to accumulate sediment.'],
 ['Nearer the ridge','An ocean-floor segment is relatively hot and elevated, with thin mantle lithosphere.','Hot, young lithosphere near a ridge is relatively buoyant and thin.'],
 ['Nearer the ridge','Of two sites on the same spreading flank, this site has the younger basalt.','On an undisturbed flank, crust generally becomes older away from the ridge.'],
 ['Nearer the ridge','A survey encounters recently formed crust and little accumulated sediment.','Recent crust formation identifies proximity to the spreading center.'],
 ['Farther from the ridge','A core finds older basalt beneath a thicker pile of sediment.','Older crust farther from a ridge usually carries more accumulated sediment.'],
 ['Farther from the ridge','The plate is colder and lower, with thicker mantle lithosphere than at the spreading center.','Cooling makes oceanic lithosphere denser, thicker, and lower as it ages.'],
 ['Farther from the ridge','Of two sites on the same spreading flank, this site has the older basalt.','Older oceanic crust has normally traveled farther from its spreading center.'],
 ['Farther from the ridge','A site has cooled for longer and subsided relative to the ridge crest.','Cooling and subsidence accompany movement away from a ridge.']
],{figure:['T3',1],distractors:['At the same distance from the ridge','Relative distance cannot be inferred here'],term:false});
add('evidence','T3','c3-drift-evidence','interpretation of the evidence',[
 ['Continental drift evidence','Matching fossils occur on continents now separated by an ocean, in rocks of comparable age.','The fossil distributions support past connection of the continents.'],
 ['Continental drift evidence','Rock belts continue from one continental margin to another when the continents are fitted together.','Matching rock belts support a former connection.'],
 ['Continental drift evidence','Ancient glacial markings make a more coherent pattern when southern continents are reconstructed together.','Reconstructed paleoclimate patterns were evidence for continental drift.'],
 ['Seafloor spreading evidence','Magnetic reversal patterns match on opposite sides of an oceanic ridge.','New crust records magnetic polarity and is carried away on both sides.'],
 ['Seafloor spreading evidence','Drilled basalt becomes progressively older away from a ridge.','Ages support crust formation at the ridge followed by outward movement.'],
 ['Seafloor spreading evidence','The youngest seafloor occurs along the spreading center rather than along the bordering continents.','Young ridge crust supports ongoing creation of oceanic crust.']
],{figure:['T3',0],distractors:['Evidence against a past continental connection','Evidence that oceanic crust is equally old everywhere'],term:false});
add('boundaries','T4','c3-boundtypes','plate boundary',[
 ['Divergent','Two sides of a continental rift pull apart while the crust between them stretches.','Separation of plates defines divergence.'],
 ['Divergent','Basalt is added along a ridge as plates move away on either side.','Spreading creates crust at a divergent boundary.'],
 ['Divergent','A narrow ocean basin widens as new crust forms along its center.','An opening basin with spreading is divergent.'],
 ['Transform','Crust on opposite sides of a fault slides horizontally past, with no net crust creation.','Side-by-side sliding defines a transform boundary.'],
 ['Transform','Two neighboring plates shear past one another; neither moves beneath the other.','Transform motion is lateral rather than converging or separating.'],
 ['Transform','Earthquakes mark a boundary where displacement is parallel to the boundary.','Relative motion parallel to a boundary is transform motion.'],
 ['Convergent','An oceanic plate bends into a trench beneath another plate.','Subduction occurs at a convergent boundary.'],
 ['Convergent','Two continental blocks approach and thicken a mountain belt.','Continental collision is convergence even without sustained deep continental subduction.'],
 ['Convergent','Oceanic lithosphere is consumed where plates move together.','Consumption at a subduction zone is convergent plate motion.']
],{figure:['T4',0],distractors:['Hot spot in a plate interior']});
add('layers','T5','c1-lithos','mechanical layer',[
 ['Lithosphere','A plate includes continental crust and the rigid uppermost mantle beneath it.','The lithosphere consists of crust plus rigid uppermost mantle.'],
 ['Lithosphere','Oceanic crust and its attached rigid mantle move together as one tectonic plate.','A tectonic plate is a piece of lithosphere.'],
 ['Lithosphere','A rigid outer shell lies above the LAB and participates in plate motion.','The LAB is the base of the lithosphere.'],
 ['Asthenosphere','Mantle material below the rigid plates remains mostly solid but deforms over long times.','The asthenosphere is a mechanically weak, mostly solid layer.'],
 ['Asthenosphere','Rock beneath the LAB flows slowly rather than behaving as a rigid plate.','Weakness below the LAB identifies the asthenosphere.'],
 ['Asthenosphere','A hot, weak part of the upper mantle permits deformation beneath moving plates.','The asthenosphere can flow over geologic time without being a global liquid layer.']
],{figure:['T5',1],distractors:['Outer core','Inner core']});
add('floating','T5','c1-isostasy','change in surface elevation after buoyant adjustment',[
 ['Higher surface','One equally dense crustal column becomes thicker than its neighbor.','At equal density, a thicker floating column has a higher top and a deeper root.'],
 ['Higher surface','One column becomes less dense while its thickness is held equal to its neighbor.','At equal thickness, lower density allows a greater fraction to stand high.'],
 ['Higher surface','Of two floating blocks made of the same wood, one is thicker.','The thicker same-density block stands higher while extending deeper.'],
 ['Lower surface','One equally thick column becomes denser than the neighboring column.','A denser column of equal thickness floats lower.'],
 ['Lower surface','Of two equally dense floating columns, one is thinner.','The thinner column has a lower top and a shallower base.'],
 ['Lower surface','Two wood blocks are equally thick, but one is made of denser wood.','The denser block must displace a greater fraction of its volume to float.']
],{figure:['T5',0],distractors:['The same surface elevation','Elevation cannot be compared from these conditions'],term:false});
add('hotspot','T6','c3-hotspot','plate-motion direction over a stationary hot spot',[
 ['Northward','An active center lies south of progressively older extinct volcanoes.','The plate carries older volcanoes northward away from the active hot spot.'],
 ['Southward','The active volcano is at the northern end; volcanoes get older toward the south.','The plate has carried the older volcanoes southward.'],
 ['Eastward','A new eruption occurs at the western end of a chain that becomes older eastward.','The plate moves eastward over the stationary heat source.'],
 ['Westward','The youngest volcano is in the east and extinct volcanoes become older to the west.','The plate carries the older volcanoes westward.'],
 ['Northeastward','A currently active center lies southwest of a chain that becomes progressively older to the northeast.','The older chain lies in the direction of plate motion.'],
 ['Southwestward','A hot spot is currently active at the northeast end of a chain with older centers to the southwest.','Southwestward plate motion moves the older centers away from the hot spot.'],
 ['Northwestward','Volcanoes become older northwest of a southeastern active center.','The age progression points northwest, the direction of plate motion.'],
 ['Southeastward','Older volcanic centers lie southeast of the currently active center.','The plate has moved southeastward relative to the stationary hot spot.']
],{term:false});
add('pt','T7','c5-ptread','path on the course pressure–temperature axes (temperature rightward; pressure downward)',[
 ['Rightward','A rock heats while pressure changes very little.','Temperature increases to the right while constant pressure keeps the vertical coordinate fixed.'],
 ['Leftward','A rock cools while pressure stays nearly constant.','Cooling moves left on the temperature axis.'],
 ['Upward','A rock rises and pressure falls, with little change in temperature.','Lower pressure is upward on these particular axes.'],
 ['Downward','A rock is compressed at nearly constant temperature.','Increasing pressure is downward on the course diagram.'],
 ['Up and right','A rock is both heated and decompressed.','Heating moves right; decreasing pressure moves up.'],
 ['Down and right','Both the temperature and pressure of a buried rock increase.','Temperature rises rightward and pressure increases downward.'],
 ['Up and left','A rock is uplifted while it also cools.','Cooling moves left while decompression moves up.'],
 ['Down and left','A rock cools while its pressure increases.','Cooling moves left and increasing pressure moves down.']
],{figure:['T7',3],term:false});
add('textures','T8','c5-grain','igneous texture',[
 ['Coarse-grained','Crystals throughout a rock are easily visible; its melt remained at depth while cooling.','Slow cooling allows crystals to grow large enough to see.'],
 ['Coarse-grained','A melt solidifies slowly underground, producing interlocking visible crystals.','Longer crystal-growth time produces a coarse texture.'],
 ['Fine-grained','A lava flow solidifies at the surface; most crystals are too small to see unaided.','Rapid surface cooling produces small crystals.'],
 ['Fine-grained','A rock has crystals throughout, but individual grains generally need magnification.','Very small crystals define a fine-grained texture.'],
 ['Glassy','A melt loses heat so rapidly that an ordered crystalline arrangement does not develop.','Extremely rapid cooling can prevent crystal growth.'],
 ['Glassy','A solidified melt has no crystalline grains because atoms lacked time to organize.','A noncrystalline igneous material has a glassy texture.'],
 ['Porphyritic','Large crystals lie inside a much finer crystalline matrix.','Two crystal-size populations commonly record slower growth followed by faster cooling.'],
 ['Porphyritic','Crystals grow below ground; the remaining melt erupts and freezes rapidly around them.','Earlier large crystals surrounded by a finer groundmass make a porphyritic texture.'],
 ['Pegmatitic','Exceptionally large crystals grow in a water-rich melt near a magma body.','Water helps atoms move, supporting unusually large crystal growth.'],
 ['Pegmatitic','A water-rich pocket of magma produces crystals far larger than ordinary coarse grains.','Pegmatitic growth reflects efficient atom transport in water-rich magma.']
],{figure:['T8',0]});
add('vesicles','T9','c5-special','rock name',[
 ['Pumice','A pale, frothy volcanic glass has so much pore space that a fresh dry piece can float.','Highly vesicular light volcanic glass is commonly pumice.'],
 ['Pumice','A light-colored glassy eruption product contains abundant tiny gas cavities and very thin walls.','The highly frothy light material fits pumice.'],
 ['Pumice','A silica-rich eruption leaves lightweight glassy fragments with extensive bubble space.','This combination is characteristic of pumice.'],
 ['Scoria','A dark lava fragment contains gas holes separated by comparatively thick solid walls.','Dark vesicular fragments with thicker walls fit scoria.'],
 ['Scoria','A mafic eruption produces dark, bubble-rich fragments that accumulate around a vent.','Such dark vesicular pyroclasts are scoria.'],
 ['Scoria','A dark volcanic fragment has visible gas cavities but is less frothy than typical pumice.','This contrast favors scoria.']
],{distractors:['Granite','Diorite']});
add('classification','T10','c5-classify','rock name from composition and texture',[
 ['Granite','A felsic specimen has easily visible interlocking quartz and feldspar crystals.','Felsic composition plus coarse texture places the rock in the granite cell.'],
 ['Granite','Slowly cooled intrusive material contains abundant quartz and potassium feldspar.','Coarse felsic intrusive rock is granite.'],
 ['Rhyolite','A felsic lava cools at the surface into a fine-grained rock.','Fine texture in the felsic column gives rhyolite.'],
 ['Rhyolite','A fine-grained rock has the composition of granite rather than basalt.','Granite and rhyolite share felsic composition but differ in texture.'],
 ['Diorite','An intermediate-composition rock contains crystals visible without magnification.','Coarse intermediate rock is diorite.'],
 ['Diorite','Intermediate magma crystallizes slowly below ground into an interlocking coarse rock.','Slow cooling and intermediate composition identify diorite.'],
 ['Andesite','Intermediate lava solidifies quickly into a fine-grained rock.','Fine intermediate rock is andesite.'],
 ['Andesite','A fine-grained rock occupies the same composition column as diorite.','Andesite is the fine-grained counterpart of diorite.'],
 ['Gabbro','A mafic magma cools slowly, forming visible pyroxene and plagioclase grains.','Coarse mafic rock is gabbro.'],
 ['Gabbro','A coarse rock has broadly the same bulk composition as basalt.','Gabbro is the coarse-grained counterpart of basalt.'],
 ['Basalt','Mafic lava cools into a rock with very small crystals.','Fine mafic rock is basalt.'],
 ['Basalt','A fine-grained specimen occupies the same composition column as gabbro.','Basalt and gabbro share mafic composition but have different textures.'],
 ['Peridotite','An ultramafic coarse rock is dominated by olivine and pyroxene.','The coarse ultramafic rock in the chart is peridotite.'],
 ['Peridotite','A coarse crystalline rock lies beyond the mafic column toward the most silica-poor composition.','That coarse ultramafic classification is peridotite.']
],{figure:['T10',0]});
add('structures','T11','c4-silstruct','silicate structure',[
 ['Isolated tetrahedra','A model shows separate silicon–oxygen tetrahedra without oxygen links to neighboring tetrahedra.','Independent tetrahedra characterize the isolated structure.'],
 ['Isolated tetrahedra','The tetrahedra in a simplified olivine model remain independent units.','Olivine is the review example of isolated tetrahedra.'],
 ['Single chains','Each tetrahedron links along one chain rather than forming a broad sheet.','Linked one-dimensional chains describe the pyroxene-type single-chain structure.'],
 ['Single chains','A pyroxene model extends as individual linked chains.','Pyroxene has a single-chain silicate structure.'],
 ['Double chains','A model joins two chains alongside one another into paired strips.','Paired linked chains form a double-chain structure.'],
 ['Double chains','The linking pattern follows the amphibole example in the textbook.','Amphibole is the double-chain silicate example.'],
 ['Sheets','Tetrahedra link across two dimensions; weaker connections separate the layers.','A two-dimensional network is a sheet silicate.'],
 ['Sheets','A mica model has broad linked layers that separate along weaker bonds.','Mica has a sheet structure associated with cleavage into flakes.'],
 ['Framework','Tetrahedra connect into a continuous network in three dimensions.','A three-dimensional linked network is a framework.'],
 ['Framework','A quartz model links tetrahedra throughout the crystal rather than along isolated strips or sheets.','Quartz is a framework silicate.']
],{figure:['T11',1]});
add('anions','T11','c4-nonsil','non-silicate mineral group',[
 ['Carbonate','The diagnostic anion group is CO₃²⁻.','Carbonate minerals contain the carbonate anion group.'],
 ['Carbonate','A mineral contains a carbon–oxygen anion group, as calcite does.','Calcite is a carbonate, identified by CO₃²⁻.'],
 ['Sulfate','The diagnostic group contains one sulfur atom linked with four oxygen atoms.','The SO₄²⁻ group defines sulfates.'],
 ['Sulfate','A specimen belongs with gypsum because its key anion is SO₄²⁻.','Gypsum is a sulfate mineral.'],
 ['Sulfide','The diagnostic anion is sulfur without the oxygen group found in sulfate.','Sulfides contain sulfur anions rather than sulfate groups.'],
 ['Sulfide','A mineral is grouped with pyrite by its sulfur anion chemistry.','Pyrite belongs to the sulfide group.'],
 ['Oxide','The principal anion is oxygen alone, rather than carbonate or sulfate.','O²⁻ defines the oxide group.'],
 ['Oxide','A mineral belongs with hematite and magnetite by its oxygen anion chemistry.','Hematite and magnetite are oxides.']
]);
add('bonds','T11','c4-bonds','bonding description',[
 ['Ionic bonding','Oppositely charged ions attract after electrons have been transferred.','Electrostatic attraction between ions is ionic bonding.'],
 ['Ionic bonding','Positive and negative ions are held together by their unlike charges.','Attraction of charged ions identifies ionic bonds.'],
 ['Covalent bonding','Neighboring atoms share pairs of electrons.','Shared electron pairs define covalent bonding.'],
 ['Covalent bonding','A bond is explained by electron sharing rather than complete electron transfer.','Electron sharing is the covalent model.'],
 ['Metallic bonding','Mobile shared electrons help hold a collection of metal atoms together.','Delocalized mobile electrons are characteristic of metallic bonding.'],
 ['Metallic bonding','The bonding model includes electrons that move among many neighboring metal atoms.','A mobile electron population is the metallic bonding model.'],
 ['Weak attractions between layers','Strongly bonded sheets are separated by relatively weak molecular attractions.','Weak attractions between structural units provide planes of easier separation.'],
 ['Weak attractions between layers','A layered mineral separates most readily at the weak links between its sheets.','The weakest interlayer links control this easy separation.']
],{term:false});
add('bowen','T12','c5-bowen','earlier mineral to crystallize while cooling (simplified discontinuous branch)',[
 ['Olivine','The candidate pair is olivine and pyroxene.','Olivine crystallizes at higher temperature than pyroxene in this branch.'],
 ['Olivine','The candidate pair is olivine and amphibole.','Olivine precedes amphibole during cooling.'],
 ['Olivine','The candidate pair is biotite and olivine.','Olivine is the highest-temperature member of this four-mineral sequence.'],
 ['Pyroxene','The candidate pair is amphibole and pyroxene.','Pyroxene crystallizes before amphibole as temperature falls.'],
 ['Pyroxene','The candidate pair is pyroxene and biotite.','Pyroxene precedes biotite in the discontinuous branch.'],
 ['Amphibole','The candidate pair is biotite and amphibole.','Amphibole precedes biotite during cooling.']
],{figure:['T12',0],distractors:['Biotite']});
add('bowen-heating','T12','c5-partial','earlier component to melt on heating (the simplified reverse-order model)',[
 ['Pyroxene','Compare olivine and pyroxene while heating their source rock.','The lower-temperature crystallizing component, pyroxene, enters melt earlier in the simplified reverse sequence.'],
 ['Amphibole','Compare olivine and amphibole as heating begins to produce a partial melt.','Amphibole lies below olivine in the cooling sequence, so the simplified heating order favors amphibole first.'],
 ['Biotite','Compare biotite and olivine as the rock is heated.','Biotite is lower in the cooling sequence and is the earlier-melting component of this pair in the course model.'],
 ['Amphibole','Compare amphibole and pyroxene during partial melting.','Heating reverses the simplified cooling order: amphibole enters melt before pyroxene.'],
 ['Biotite','Compare pyroxene and biotite while temperature rises.','Biotite is the lower-temperature member of this pair and enters the partial melt first in this model.'],
 ['Biotite','Compare biotite and amphibole during the onset of melting.','Biotite lies below amphibole in the cooling sequence; the course reverse-order model puts it into melt earlier.']
],{figure:['T12',0],distractors:['Olivine']});
add('melting','T13','c5-melt3','change that promotes melting',[
 ['Decrease pressure','Mantle rises beneath a spreading ridge while its temperature changes comparatively little.','Decompression can move hot mantle into the melting field.'],
 ['Decrease pressure','An ascending hot mantle plume approaches shallower levels.','Rising material experiences lower pressure, permitting decompression melting.'],
 ['Decrease pressure','Hot mantle upwells into space created by plate separation.','Upwelling reduces pressure and can initiate melting.'],
 ['Add water','Water released from minerals in a descending slab enters the overlying mantle.','Water lowers the temperature at which mantle melting begins.'],
 ['Add water','A hot rock starts to melt after receiving slab-derived volatiles without further heating.','Water can lower the melting threshold at the existing temperature.'],
 ['Add water','The wet melting boundary is crossed while temperature remains below the dry melting threshold.','The presence of water allows melting at lower temperature.'],
 ['Add heat','Hot magma transfers thermal energy into adjacent crust until some crust melts.','Heat transfer can raise surrounding rock above its melting threshold.'],
 ['Add heat','A crustal rock is heated at nearly constant pressure until melting begins.','Increasing temperature is the heating mechanism.'],
 ['Add heat','A hot intrusion supplies energy until adjacent, cooler country rock begins to melt.','Sufficient added heat can cause partial melting of the country rock.']
],{figure:['T13',1],distractors:['Remove heat']});
add('volcanoes','T14','c6-types','volcano type',[
 ['Shield volcano','Repeated fluid lava flows spread far from a vent, building a wide edifice with gentle slopes.','Mobile lava spreads broadly and constructs a shield.'],
 ['Shield volcano','The main construction process is accumulation of thin, far-traveling basaltic flows.','Repeated fluid basaltic flows favor a shield volcano.'],
 ['Shield volcano','A volcano grows much wider than it is steep because its lava flows readily.','Low-viscosity flows build the broad shield form.'],
 ['Composite volcano','A large steep edifice contains alternating lava flows and fragmental deposits.','Mixed layered eruption products characterize a composite volcano.'],
 ['Composite volcano','Viscous magma and repeated fragmental eruptions build a steep, layered mountain.','A composite volcano combines layers of lava and erupted fragments.'],
 ['Composite volcano','A cutaway shows a major volcanic mountain built from both lava and pyroclastic layers.','Those alternating construction materials identify a composite volcano.'],
 ['Scoria cone','A small steep cone accumulates loose dark volcanic fragments close to its vent.','Scoria cones are piles of loose vesicular fragments.'],
 ['Scoria cone','A vent is surrounded by a relatively small heap of cinders with a summit crater.','A heap of cinders is a scoria or cinder cone.'],
 ['Scoria cone','Steep slopes are maintained by piled fragments even though the magma is basaltic.','Fragment piling can build a steep scoria cone from mafic magma.']
],{distractors:['All three volcano types are equally supported']});
add('heat','T15','c5-heat','heat-transfer mechanism',[
 ['Conduction','A stationary wall rock warms where it touches a hot intrusion.','Heat crosses contact without bulk movement of the rock.'],
 ['Conduction','Heat passes through the metal wall of a pot without the metal circulating.','Energy transfer through stationary material is conduction.'],
 ['Conduction','Heat moves through solid rock surrounding a magma chamber without the rock being transported.','The material stays in place while energy moves by conduction.'],
 ['Convection','Warm material rises while cooler material sinks in a circulating system.','Convection transports heat with moving material.'],
 ['Convection','A mantle plume carries heat upward as the mantle material itself rises.','Bulk movement carrying heat is convection.'],
 ['Convection','Water circulates through a heated pot, moving warmer material upward.','The moving water transports thermal energy by convection.'],
 ['Radiation','Electromagnetic waves carry thermal energy from glowing lava to a nearby person.','Thermal radiation carries energy as electromagnetic waves.'],
 ['Radiation','A hot surface emits energy as electromagnetic waves.','Emission and transfer by electromagnetic waves is radiation.'],
 ['Radiation','Heat reaches a remote surface from a hot object without direct contact or a moving fluid carrying it.','Radiation does not require direct contact or bulk transport of material.']
],{figure:['T15',0],distractors:['Conduction and convection are indistinguishable here']});
add('convergence','T16','c3-subduction','convergent setting',[
 ['Ocean–ocean','One oceanic plate descends beneath another and a volcanic island arc forms.','Subduction between oceanic plates produces an island-arc setting.'],
 ['Ocean–ocean','The older, colder plate in a pair of approaching oceanic plates bends into a trench.','The commonly denser older oceanic plate subducts beneath the other.'],
 ['Ocean–ocean','A trench lies next to volcanic islands, with oceanic lithosphere on both sides of the original boundary.','An oceanic island arc and trench are consistent with ocean–ocean convergence.'],
 ['Ocean–continent','A dense oceanic plate sinks beneath buoyant continental crust.','Oceanic lithosphere generally subducts beneath continental lithosphere.'],
 ['Ocean–continent','A trench offshore parallels a volcanic belt on a continent.','Subduction beneath a continent can form a continental volcanic arc.'],
 ['Ocean–continent','The two approaching plates contain oceanic and continental crust, and the oceanic side descends.','The contrast in crust types and density fits ocean–continent convergence.'],
 ['Continent–continent','Two buoyant continental blocks meet and thicken into a major mountain belt.','Continental collision thickens crust rather than sustaining ordinary oceanic subduction.'],
 ['Continent–continent','An ocean has closed and the approaching continental masses collide.','After closure, continental collision can build a high mountain belt.'],
 ['Continent–continent','Crust is shortened and thickened as in the India–Asia collision.','India–Asia is the course example of continent–continent convergence.']
],{figure:['T16',0],distractors:['Oceanic spreading ridge']});
add('mineral-bands','T10','c5-classify','composition column in the lower mineral bands of the course chart',[
 ['Felsic','One column contains abundant quartz and potassium feldspar, with relatively few dark minerals.','Quartz and potassium feldspar are prominent toward the felsic side of the chart.'],
 ['Felsic','A mineral inventory is rich in light silicates, including quartz and potassium feldspar, rather than olivine and pyroxene.','That mineral association places the inventory in the felsic part of the chart.'],
 ['Intermediate','A column between the felsic and mafic fields contains abundant plagioclase with amphibole and much less quartz than the felsic field.','The intermediate field sits between felsic and mafic mineral associations.'],
 ['Intermediate','The mineral bands below the diorite/andesite pair emphasize plagioclase with amphibole rather than a rock dominated by olivine.','Diorite and andesite occupy the intermediate column; their mineral bands reinforce that classification.'],
 ['Mafic','A column combines calcium-rich plagioclase and pyroxene, with little or no quartz.','Pyroxene and calcium-rich plagioclase are characteristic of the mafic field.'],
 ['Mafic','The bands below basalt and gabbro emphasize dark silicates plus calcium-rich plagioclase.','Basalt and gabbro lie in the mafic composition column.'],
 ['Ultramafic','A column is dominated by olivine and pyroxene, with little or no feldspar or quartz.','Abundant olivine and pyroxene with little feldspar identify the ultramafic field.'],
 ['Ultramafic','The minerals below peridotite are mainly olivine and pyroxene at the silica-poor end of the chart.','Peridotite and this mineral association occupy the ultramafic column.']
],{figure:['T10',0],inlineFigure:true});
add('pt-state','T7','c5-ptread','effect on melting tendency in the simplified dry-rock model (same composition)',[
 ['Favors melting','Two equal-temperature samples differ only in pressure; consider the sample at lower pressure.','At equal temperature, lower pressure favors melting in this course model; it does not guarantee complete melting.'],
 ['Favors melting','At fixed pressure, a sample moves to a higher temperature.','Heating at constant pressure moves toward the melt-present field.'],
 ['Favors melting','A hot sample is decompressed without appreciable cooling.','Reducing pressure can permit melting without adding heat.'],
 ['Favors remaining solid','Two equal-temperature samples differ only in pressure; consider the sample at higher pressure.','Higher pressure favors the solid side at the same temperature in this simplified diagram.'],
 ['Favors remaining solid','At fixed pressure, a sample moves to a lower temperature.','Cooling moves away from the melt-present side.'],
 ['Favors remaining solid','A sample is compressed while temperature stays fixed.','Raising pressure favors the solid side of the dry melting boundary in this course model.']
],{figure:['T7',3],inlineFigure:true,direct:false,term:false});
add('viscosity','T14','c5-visc','relative resistance to flow when other conditions are equal',[
 ['Greater resistance','One magma is more silica-rich than the comparison magma.','More silica supports interconnected silicate structures and raises viscosity.'],
 ['Greater resistance','One otherwise identical magma has cooled but remains molten.','Lower temperature generally increases magma viscosity.'],
 ['Greater resistance','One magma contains a larger fraction of suspended crystals than another melt of the same composition.','More suspended crystals generally hinder flow.'],
 ['Lower resistance','One otherwise identical magma is hotter.','Higher temperature generally lowers viscosity.'],
 ['Lower resistance','One melt is more mafic and less silica-rich than the comparison melt.','Fewer interconnected silica structures generally allow easier flow.'],
 ['Lower resistance','One otherwise identical magma contains fewer suspended crystals.','Fewer crystals reduce obstruction to flow.']
],{direct:false,term:false,sources:['TB5:5.7']});
L.FRESH_FACTS=sets;
})(window.L);
