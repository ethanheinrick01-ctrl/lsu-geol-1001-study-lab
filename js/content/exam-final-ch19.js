/* GEOL 1001 · Final Exam Learn · Chapter 19 */
(function (L) {
  'use strict';
  const {chapter, group, term} = L.FINAL_STUDY;
  const text = "Textbook 19", connect = "Connect 19";
  L.SOURCES[text] = {t: "Exploring Geology · Chapter 19", f: 'Assigned textbook', tier: 2, unit: 'figure or section'};
  L.SOURCES[connect] = {t: "Chapter 19 Connect practice", f: 'Course exercise figures', tier: 2, unit: 'exercise'};
  L.SOURCES['NASA Triton'] = {t: 'Triton · NASA Science', f: 'https://science.nasa.gov/neptune/moons/triton/', tier: 3, unit: 'section'};
  const {section, img} = chapter(19, {
    name: "Ch 19 · Geology of the Solar System", short: 'Ch 19',
    coverage: 'Introduction and sections 19.1–19.9',
    evidence: "Assigned textbook and Connect exercises. Instructor lecture coverage and slide selections are unconfirmed.",
    sourceNote: "Numbered figures cite the assigned textbook and Connect. This chapter currently uses textbook and Connect evidence."
  }, (n, loc) => [loc.includes(':') ? loc : text + ':' + loc]);

  section(0, "Compare worlds across the solar system", "Compare worlds across the solar system", [
    group("Group the inner planets", "19.00.a1", [img("19.00.a1", "Group the inner planets", "Exploring Geology · Fig. 19.00.a1")], [
      term("Terrestrial planet", "a planet with a solid rocky surface and a largely rocky interior") + ".",
      "Mercury, Venus, Earth, and Mars have rocky surfaces, yet their atmospheres and the ages of their exposed terrains differ widely.",
      "Mercury and Mars both preserve impact scars. On Earth, weathering breaks down exposed rock, rivers carry sediment away, and plate motion recycles crust. A planet can have a long impact history even where few scars survive.",
      "The solar system formed from gas and dust in a nebula. Dust grains accumulated into larger bodies. Gravity concentrated material at the center, where the forming Sun eventually became hot enough for fusion."
    ], "Read the figure", "Find Mercury, Venus, Earth, and Mars in order from the Sun. Compare surfaces at the same scale before drawing conclusions about crater density.", []),
    group("Find rocky and icy surfaces farther out", "19.05.a3", [img("19.05.a3", "Find rocky and icy surfaces farther out", "Exploring Geology · Fig. 19.05.a3")], [
      term("Planetary satellite", "a body that orbits a planet") + ".",
      "Beyond the inner planets, the moons of giant planets provide solid surfaces where impacts, eruptions, and deformation can leave a record.",
      "Io has volcanic plains while Europa has a bright icy shell. Both orbit Jupiter. Distance from the Sun is only one influence on what happens at the surface of a moon."
    ], "Read the figure", "Compare the surfaces of two satellites of the same planet. Identify a feature you could use to investigate their different histories.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "19.0", "A spacecraft detects a fractured icy surface beyond Mars. Which body could have that surface?",
      ["*A moon orbiting a giant planet.", "The visible cloud deck of Jupiter.", "The solar photosphere.", "The dry basalt plains of Mercury."],
      "Europa provides a nearby example in Jupiter’s system. An icy crust can preserve fractures on a solid moon well beyond the rocky inner planets.", undefined);
    mc("figure", "19.05.a3", "The diagram puts several moons beside Jupiter. Which comparison uses the same level of organization?",
      ["*Compare terrain on Io with terrain on Europa.", "Compare one band on Jupiter with the orbit of Mars.", "Compare the Sun’s visible surface with Jupiter’s orbit.", "Compare Saturn’s ring plane with Mercury’s orbital period."],
      "Io and Europa are both satellites of Jupiter, so comparing their surface landforms tests how two neighboring moons evolved differently.", img("19.05.a3", "Find rocky and icy surfaces farther out", "Exploring Geology · Fig. 19.05.a3"));
    fill("recall", "19.0", "What term describes a planet with a solid rocky surface and a largely rocky interior?", ["terrestrial planet", "a terrestrial planet", "an terrestrial planet"], "Mercury, Venus, Earth, and Mars have rocky surfaces, yet their atmospheres and the ages of their exposed terrains differ widely.");
    mc("extend-1-19-00-a2", "19.00.a2", "In the nebular model, which step helps explain how rocky planets grew?",
      ["*Smaller solid bodies collided and accumulated.", "The Sun expelled fully formed rocky planets.", "An existing giant planet froze into four separate worlds.", "A single impact created the entire solar system."],
      "Accretion builds larger bodies from smaller pieces in a young planetary system.");
    write("explain", "19.0", "Explain how two bodies orbiting the same planet can preserve different geological histories.",
      "Io’s rocky surface is renewed by volcanism. Europa’s icy surface preserves fractures and displaced blocks. Comparing landforms reveals differences in how each moon releases energy and how its surface responds.", ["Identify an observable feature on Io", "Identify a contrasting feature on Europa", "Link each observation to a surface process"], img("19.00.a1", "Group the inner planets", "Exploring Geology · Fig. 19.00.a1"));
  });

  section(1, "Radar, infrared, and surface sampling", "Radar, infrared, and surface sampling", [
    group("Send and receive a radar pulse", "19.01.b1", [img("19.01.b1", "Send and receive a radar pulse", "Exploring Geology · Fig. 19.01.b1"), img("thermal-crater", "Thermal infrared crater with contrasting floor and ejecta", "Connect · Chapter 19 · assessment Q3")], [
      term("Radar backscatter", "the portion of transmitted radio energy scattered back toward the instrument") + ".",
      "A radar signal can pass through cloud cover, and the strength of the echo depends on the slope and roughness of the surface.",
      "A radar instrument sends radio waves and measures the echo. A smooth surface facing away from the instrument can send most energy onward. A rough surface can scatter part of the pulse back toward it.",
      "Earth’s atmosphere absorbs some wavelengths and distorts passing light. An orbiting telescope avoids those effects. Different wavelengths can reveal different features on the same planet."
    ], "Read the figure", "Follow the outgoing signal and its return. Ask whether brightness records the echo strength or sunlight reflected from the rock.", []),
    group("Interpret a false-color crater image", "19.01.c1", [img("19.01.c1", "Interpret a false-color crater image", "Exploring Geology · Fig. 19.01.c1")], [
      term("Thermal infrared radiation", "radiation emitted by a surface at wavelengths that carry information about its temperature") + ".",
      "Before interpreting a colored crater, find out which wavelengths were measured and what the colors represent.",
      "Thermal images map emitted radiation. A color assigned to a range of temperatures can make a crater stand out even if the underlying rocks look alike in daylight. A field sample tests what the rocks are made of.",
      "Many rocky remnants of solar system formation occupy the main asteroid belt between Mars and Jupiter. Orbiters can map an asteroid such as Vesta, while a landing mission could investigate material at one site."
    ], "Read the figure", "Locate the blue crater interior. Establish what the instrument measured before explaining why the interior differs from its surroundings.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "19.1", "A crater ejecta blanket appears bright on a radar image. Which observation could account for the strong echo?",
      ["*Rough blocks scatter radio waves toward the spacecraft.", "Dark minerals emit additional visible sunlight.", "An ice-rich floor absorbs all incoming radio waves.", "The instrument assigns bright tones to high air temperature."],
      "A rough blanket scatters part of the radar pulse back toward the instrument. A high return can appear bright even where the exposed rock looks dark in visible light.", undefined);
    mc("figure", "19.01.c1", "What does the contrast between the floor and rim in this thermal infrared image allow you to compare?",
      ["*Surface temperatures mapped by the instrument.", "Rock colors seen by an astronaut in daylight.", "Absolute ages measured from impact debris.", "Wind speeds measured inside the crater."],
      "These are assigned colors in a thermal infrared measurement. Compare the temperature signal of the floor with that from the surrounding material.", img("19.01.c1", "Interpret a false-color crater image", "Exploring Geology · Fig. 19.01.c1"));
    fill("recall", "19.1", "What term describes the portion of transmitted radio energy scattered back toward the instrument?", ["radar backscatter", "a radar backscatter", "an radar backscatter"], "A radar signal can pass through cloud cover, and the strength of the echo depends on the slope and roughness of the surface.");
    mc("thermal-crater", "Connect 19:assessment Q3", "Which measurement would help explain why the floor and ejecta have different mapped colors?",
      ["*Surface temperature at the time of imaging.", "Visible rock color under white light.", "The number of craters per square kilometer.", "The depth of bedrock beneath the floor."],
      "The thermal image maps emitted radiation. The color scale represents temperature differences across the surface.", img("thermal-crater", "Thermal infrared crater with contrasting floor and ejecta", "Connect · Chapter 19 · assessment Q3"));
    mc("extend-1-19-01-a2", "19.01.a2", "Why place an infrared telescope beyond Earth’s atmosphere?",
      ["*To observe wavelengths that air absorbs.", "To remove the need for a detector.", "To turn a reflected signal into a radar pulse.", "To sample planetary rocks directly."],
      "An orbiting detector receives radiation before it traverses Earth’s atmosphere.");
    mc("extend-2-19-01-t1", "19.01.t1", "Where should a mission seeking the main asteroid belt travel?",
      ["*Beyond Mars and inside Jupiter’s orbit.", "Between Venus and Earth.", "Between Jupiter and Saturn.", "Beyond Neptune’s orbit."],
      "The main belt occupies heliocentric orbits between Mars and Jupiter.");
    write("explain", "19.1", "Explain why radar and thermal infrared can show different boundaries on the same planet.",
      "Radar brightness depends on the return of an emitted pulse and varies with roughness and slope. Thermal infrared records energy emitted by the surface and can reveal a temperature boundary. The two images measure different surface properties.", ["Describe the radar measurement", "Describe the thermal measurement", "Connect each measurement to a different surface property"], img("19.01.b1", "Send and receive a radar pulse", "Exploring Geology · Fig. 19.01.b1"));
  });

  section(2, "Why surfaces preserve different histories", "Why surfaces preserve different histories", [
    group("Relate size to cooling", "19.02.c3", [img("19.02.c3", "Relate size to cooling", "Exploring Geology · Fig. 19.02.c3")], [
      term("Surface-area-to-volume ratio", "the surface area available for heat loss per unit of interior volume") + ".",
      "With similar materials and heat sources, a smaller world has more surface area per unit volume and tends to cool more quickly.",
      "For a sphere, surface area grows as radius squared and volume grows as radius cubed. If the radius doubles, the ratio of surface area to volume falls by half. Other things being equal, a larger interior retains heat longer.",
      "A fast impact excavates a cavity, breaks and displaces rock, and throws ejecta beyond the rim. Subsequent lava, erosion, or sediment can obscure the rim and erase evidence of the event."
    ], "Read the figure", "Imagine two spheres of the same material. Double the radius and compare how much the heat-losing exterior and heat-storing interior increase.", []),
    group("Compare Mercury and Io", "19.02.c1", [img("19.02.c1", "Compare Mercury and Io", "Exploring Geology · Fig. 19.02.c1"), img("six-surface-processes", "Numbered locations · six surface processes", "Connect · Chapter 19 · assignment Q1")], [
      term("Tidal heating", "heat produced as repeated gravitational flexing dissipates energy inside a body") + ".",
      "Size is only part of the story, because repeated tidal flexing can keep a small moon like Io volcanically active.",
      "Mercury has a heavily cratered surface. Io is small as well, but its varying gravitational interactions deform its interior. Some of the mechanical energy becomes heat and powers eruptions that can cover old craters."
    ], "Read the figure", "Compare evidence of surface renewal before using a body’s size to estimate how active it is.", ["Connect 19:assignment Q1"])
  ], ({mc, fill, match, write}) => {
    mc("apply", "19.2", "Two rocky spheres have the same initial temperature and composition. The second has twice the radius. How does its surface area per unit volume compare?",
      ["*It has half the first sphere’s ratio.", "It has twice the first sphere’s ratio.", "It has four times the first sphere’s ratio.", "It has the same ratio as the first sphere."],
      "For a sphere the area-to-volume ratio is 3 divided by radius. Doubling the radius reduces the ratio to half its earlier value.", undefined);
    mc("figure", "19.02.c1", "Why can the smaller active world in the comparison continue to erupt?",
      ["*Orbital flexing supplies additional internal heat.", "Its small radius prevents heat escaping to space.", "Its impacts permanently stop the crust from cooling.", "Its reflected sunlight drives deep mantle melting."],
      "Repeated changes in Jupiter’s gravitational pull deform Io. Friction and internal deformation dissipate some of that energy as heat.", img("19.02.c1", "Compare Mercury and Io", "Exploring Geology · Fig. 19.02.c1"));
    fill("recall", "19.2", "What term describes the surface area available for heat loss per unit of interior volume?", ["surface-area-to-volume ratio", "a surface-area-to-volume ratio", "an surface-area-to-volume ratio"], "With similar materials and heat sources, a smaller world has more surface area per unit volume and tends to cool more quickly.");
    match("six-surface-processes", "Connect 19:assignment Q1", "Match each numbered image to the process that shaped the surface.",
      [["Location 1", "Erosion and deposition by running water"], ["Location 2", "Wind"], ["Location 3", "Tectonics"], ["Location 4", "Mass wasting"], ["Location 5", "Volcanism"], ["Location 6", "Impact cratering"]], "Compare channel junctions, repeating dunes, and deformed bands across the top. On the bottom, distinguish a failed slope, a volcanic edifice, and a circular impact rim with ejecta.", img("six-surface-processes", "Numbered locations · six surface processes", "Connect · Chapter 19 · assignment Q1"));
    mc("extend-1-19-02-a3", "19.02.a3", "Which combination most directly indicates an excavated impact site?",
      ["*A circular rim surrounded by outward-thrown debris.", "Parallel ridges separated by windblown sand.", "Branching channels that converge toward a fan.", "A line of scarps offsetting the same lava layer."],
      "Excavation displaces fragments out of the cavity as it forms.");
    write("explain", "19.2", "Explain how size affects cooling and how Io maintains volcanic activity.",
      "A small body has more surface area for heat loss per unit volume. Io also receives energy from gravitational flexing as it orbits Jupiter. This heat can drive volcanism despite Io’s small size.", ["Relate size to surface area per unit volume", "Identify tidal flexing", "Connect the added heat to volcanism"], img("19.02.c3", "Relate size to cooling", "Exploring Geology · Fig. 19.02.c3"));
  });

  section(3, "Compare the rocky inner planets", "Compare the rocky inner planets", [
    group("Count preserved impact scars", "19.03.a2", [img("19.03.a2", "Count preserved impact scars", "Exploring Geology · Fig. 19.03.a2"), img("venus-echo", "Radar view of an impact crater and surrounding ejecta on Venus", "Connect · Chapter 19 · assessment Q4")], [
      term("Resurfacing", "replacement or modification of older terrain by geological processes") + ".",
      "Mercury preserves many impact scars because much of its old surface has escaped later resurfacing.",
      "On equally large areas with a comparable impact history, terrain with more preserved craters generally has been exposed longer. Count craters that survive resurfacing and compare a similar range of diameters."
    ], "Read the figure", "Pick two equal areas before comparing crater counts. Look for younger features that overlap or bury older ones.", []),
    group("Read the surface beneath the clouds", "19.03.b4", [img("19.03.b4", "Read the surface beneath the clouds", "Exploring Geology · Fig. 19.03.b4")], [
      term("Volcanic dome", "a rounded volcanic landform built by eruption and accumulation of lava") + ".",
      "Radar reveals volcanic domes on Venus beneath its cloud cover, showing that a smooth cloud image can hide a geologically varied surface.",
      "A visible-light view of Venus mostly shows its atmosphere. A radar view records echoes from the ground through the clouds. Rounded edifice outlines below the cloud deck can reveal past volcanic construction.",
      "Mars has polar ice, windblown reddish dust colored by iron oxides, basaltic terrain, and layered rocks. Earth’s oceans, active plate boundaries, and rapidly cycling surface water create a different record at the surface."
    ], "Read the figure", "Trace the margins of separate domes. Distinguish their mapped shape from the radar brightness of their surfaces.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "19.3", "Old crust on Earth has fewer visible craters than a comparable patch on Mercury. Which process could explain the difference?",
      ["*Erosion and burial removed or covered old craters on Earth.", "Earth’s atmosphere prevented all impacts from reaching old crust.", "Mercury’s craters grew while Earth’s craters stayed small.", "A rocky surface cannot retain ejecta after an impact."],
      "Erosion degrades rims, lava and sediment bury impact scars, and plate motion recycles crust on Earth. A low count can reflect poor preservation.", undefined);
    mc("figure", "19.03.b4", "Which feature in this radar view supports volcanic construction on Venus?",
      ["*A cluster of broad round domes with distinct margins.", "A network of tributaries joining a central river.", "A line of glaciers advancing down separate valleys.", "A train of wind ripples with evenly spaced crests."],
      "Trace the broad rounded margins of several neighboring edifices. These are volcanic domes mapped through the clouds by radar.", img("19.03.b4", "Read the surface beneath the clouds", "Exploring Geology · Fig. 19.03.b4"));
    fill("recall", "19.3", "What term describes replacement or modification of older terrain by geological processes?", ["resurfacing", "a resurfacing", "an resurfacing"], "Mercury preserves many impact scars because much of its old surface has escaped later resurfacing.");
    mc("venus-echo", "Connect 19:assessment Q4", "The apron around the crater returned a strong radar echo. What should a landing team investigate there?",
      ["*Rough blocks and slopes that scatter the radar pulse.", "Bright pigments that reflected sunlight toward the radar.", "A temperature increase directly measured by the pulse.", "Faint blue ice that emitted the measured radio pulse."],
      "Radar brightness depends on the return signal and viewing geometry. It cannot establish the visible color of the ejecta.", img("venus-echo", "Radar view of an impact crater and surrounding ejecta on Venus", "Connect · Chapter 19 · assessment Q4"));
    mc("extend-2-19-03-d1", "19.03.d1", "Which surface observation on Mars can be explained by oxidation and wind transport?",
      ["*Widespread reddish dust derived from weathered rock.", "The nearly circular plan of a fresh impact crater.", "A basalt flow burying the floor of an older crater.", "Deep fractures that displace a volcanic plateau."],
      "Iron oxides impart the reddish color and wind redistributes the fine material.");
    write("explain", "19.3", "Compare how a geologist would investigate the surface histories of Mercury and Venus.",
      "On Mercury, crater counts and overlapping rims help order surface events. On Venus, radar penetrates the clouds and maps features such as domes. Their shapes and contacts provide evidence of volcanism and resurfacing.", ["Give a Mercury observation", "Explain the choice of radar for Venus", "Connect a Venus landform to a process"], img("19.03.a2", "Count preserved impact scars", "Exploring Geology · Fig. 19.03.a2"));
  });

  section(4, "Lunar highlands, maria, and phases", "Lunar highlands, maria, and phases", [
    group("Read the smooth basalt plain", "19.04.a4", [img("19.04.a4", "Read the smooth basalt plain", "Exploring Geology · Fig. 19.04.a4"), img("lunar-contact", "Boundary between a smoother dark lunar plain and pitted highlands", "Connect · Chapter 19 · assessment Q10")], [
      term("Mare", "a dark basalt plain on the Moon formed by ancient lava flows") + ".",
      "Lava flooded low regions on the Moon and buried older impact scars, leaving smoother dark plains with fewer visible craters.",
      "The lunar highlands expose older, feldspar-rich crust. Later basalt flows filled low basins. Young impacts can cut either unit and throw bright rays over both. Darkness alone cannot establish the order.",
      "In the giant-impact model, material blasted into orbit by a collision with early Earth accumulated to form the Moon. Early melting and separation of materials helped form the Moon’s light highland crust. Later basalt reached the surface and flooded low basins.",
      "The feldspar-rich highlands preserve the oldest of these terrains. Basalt plains filled basins, and later impacts scattered rays over older surfaces."
    ], "Read the figure", "Trace the edge of the dark plain. Compare crater density on each side and look for rays crossing terrain boundaries.", []),
    group("Change the observer’s view", "19.04.c4", [img("19.04.c4", "Change the observer’s view", "Exploring Geology · Fig. 19.04.c4")], [
      term("Lunar phase", "the fraction of the Moon’s illuminated hemisphere visible from Earth") + ".",
      "As the Moon orbits Earth, sunlight still illuminates one hemisphere, but we see a different fraction of that bright half.",
      "At new moon the Moon lies on the sunward side of Earth, so the illuminated half faces mostly away from us. At full moon it lies on the far side of Earth from the Sun. Between these positions, part of the bright half is visible."
    ], "Read the figure", "Find the incoming sunlight on the left and trace the Moon’s orbit. At each position imagine standing on Earth and looking outward.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "19.4", "A bright ray crosses both the highlands and a dark mare. Which sequence fits the contacts, from oldest to youngest?",
      ["*Highland crust, mare lava, ray-forming impact.", "Mare lava, ray-forming impact, highland crust.", "Ray-forming impact, highland crust, mare lava.", "Highland crust, ray-forming impact, mare lava."],
      "The highland crust predates lava that filled low basins. A ray laid across both must have formed in a still later impact.", undefined);
    mc("figure", "19.04.c4", "With sunlight coming from the left in the diagram, where would a person on Earth see a full Moon?",
      ["*On the right side of Earth, opposite the Sun.", "On the left side of Earth, toward the Sun.", "Above Earth in the diagram, a quarter orbit from the Sun.", "Below Earth in the diagram, a quarter orbit from the Sun."],
      "With the Moon opposite the Sun in Earth’s sky, its sunlit hemisphere faces Earth. In this plan view that position is to the right.", img("19.04.c4", "Change the observer’s view", "Exploring Geology · Fig. 19.04.c4"));
    fill("recall", "19.4", "What term describes a dark basalt plain on the Moon formed by ancient lava flows?", ["mare", "a mare", "an mare"], "Lava flooded low regions on the Moon and buried older impact scars, leaving smoother dark plains with fewer visible craters.");
    mc("lunar-contact", "Connect 19:assessment Q10", "Compare similar areas on the two sides. Which observation supports a longer surface exposure time on the right?",
      ["*More preserved craters occupy the highland surface.", "The plain on the left is darker under the same lighting.", "Both units reach the horizon at the top of the image.", "The contact changes direction within the field of view."],
      "A higher density of surviving craters indicates a longer exposed history when impact rates and preservation are comparable.", img("lunar-contact", "Boundary between a smoother dark lunar plain and pitted highlands", "Connect · Chapter 19 · assessment Q10"));
    mc("extend-1-19-04-t1", "19.04.t1", "Which event formed the Moon in the giant-impact model?",
      ["*Accretion of material placed in orbit by a collision.", "Capture of a complete rocky planet passing Earth.", "Freezing of molten basalt already inside lunar basins.", "An impact into the present Moon that formed a rayed crater."],
      "The model distinguishes the early collision and accretion from later impacts onto the formed Moon.");
    match("lunar-feature-history", "Connect 19:assignment Q2", "Match each lunar feature with its material and relative place in this sequence.", [["Cratered highlands", "Feldspar-rich older crust"], ["Mare", "Intermediate-age basin-filling basalt"], ["Rayed crater", "Younger impact and its ejecta"]], "Read the rock type together with the cross-cutting or overlapping relation. The three classes record different events.");
    write("explain", "19.4", "Explain why the familiar dark markings and the changing dark part of the Moon have different causes.",
      "The permanent dark maria are basalt plains. The changing boundary between day and night follows the viewing geometry of the Moon’s orbit. Ordinary lunar phases occur while the Sun continues to illuminate half the Moon.", ["Identify the material in the maria", "Describe illumination of the Moon", "Relate phase to the observer’s changing view"], img("19.04.a4", "Read the smooth basalt plain", "Exploring Geology · Fig. 19.04.a4"));
  });

  section(5, "Jupiter and the Galilean moons", "Jupiter and the Galilean moons", [
    group("Follow an eruption on Io", "19.05.a6", [img("19.05.a6", "Follow an eruption on Io", "Exploring Geology · Fig. 19.05.a6")], [
      term("Tidal flexing", "repeated deformation caused by changing gravitational forces") + ".",
      "Jupiter’s changing pull flexes Io as it orbits, supplying heat that helps drive the eruptions visible on its surface.",
      "Io’s orbit is slightly eccentric. The strength of Jupiter’s tidal pull changes with distance, repeatedly deforming Io. Fresh deposits from eruptions can bury old impact scars.",
      "Jupiter’s bands and Great Red Spot are features of its atmosphere. Its Galilean satellites are separate worlds, in order outward from Jupiter: Io, Europa, Ganymede, and Callisto."
    ], "Read the figure", "Locate the vent rather than the brightest sunlit part of the image. Follow the path that erupted material takes above the ground.", []),
    group("Reassemble the fractured ice", "19.05.a9", [img("19.05.a9", "Reassemble the fractured ice", "Exploring Geology · Fig. 19.05.a9")], [
      term("Ice raft", "a block of icy crust displaced relative to neighboring blocks") + ".",
      "On Europa, disrupted blocks and intersecting bands record movement of the icy shell and support an inference of mobile material beneath it.",
      "Europa’s bands and broken blocks can be compared across cracks. Matching displaced margins suggests motion after the shell broke. The texture gives evidence about the shell even where the material underneath remains hidden.",
      "Ganymede has old cratered areas and lighter grooved terrain, evidence for more than one episode of surface modification. Callisto is densely cratered across much of its surface and preserves a long impact record."
    ], "Read the figure", "Find two ice blocks with boundaries that could fit together. Try reversing their displacement before inferring what was below them.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "19.5", "Which observation best supports recent resurfacing on Io?",
      ["*An active plume deposits material onto nearby terrain.", "Bright sunlight illuminates a round hemisphere.", "Jupiter casts a shadow across the moon’s orbit.", "An old impact rim stands above a distant plain."],
      "An erupting plume in contact with the surface provides direct evidence that material is being emplaced now. New deposits can cover earlier terrain.", undefined);
    mc("figure", "19.05.a9", "Which feature on Europa offers the clearest evidence that surface material moved as blocks?",
      ["*Matching edges on blocks separated by disrupted ice.", "A circular shadow passing over the surface.", "A smoothly changing brightness toward the limb.", "A uniform frost layer without boundaries."],
      "Margins that fit together across a gap allow the motion of the blocks to be reconstructed. Lighting can also cause brightness variations.", img("19.05.a9", "Reassemble the fractured ice", "Exploring Geology · Fig. 19.05.a9"));
    fill("recall", "19.5", "What term describes repeated deformation caused by changing gravitational forces?", ["tidal flexing", "a tidal flexing", "an tidal flexing"], "Jupiter’s changing pull flexes Io as it orbits, supplying heat that helps drive the eruptions visible on its surface.");
    mc("extend-1-19-05-a2", "19.05.a2", "A storm changes shape within Jupiter’s banded disk. Which feature is being monitored?",
      ["*A circulating system in Jupiter’s atmosphere.", "A resurfaced volcanic plain on Io.", "A faulted ice block on Europa.", "An ancient impact basin on Callisto."],
      "The Great Red Spot and surrounding bands belong to the planet’s atmosphere.");
    mc("extend-2-19-05-a11", "19.05.a11", "Which observation points to separate episodes of surface change on Ganymede?",
      ["*Grooved terrain adjoins darker, heavily cratered terrain.", "The whole visible disk has the same shade at noon.", "All craters have identical diameters and ejecta patterns.", "The moon casts a shadow across Jupiter’s clouds."],
      "The contrasting mapped units preserve different histories of impact and resurfacing.");
    write("explain", "19.5", "Compare the surface evidence for present or past internal activity on Io and Europa.",
      "Io’s eruptions carry material from the interior to the surface. Europa’s fractured and displaced blocks record motion of its ice shell. Neither observation requires the two moons to erupt the same material.", ["Describe a feature on Io", "Describe a feature on Europa", "Explain what each feature indicates about activity"], img("19.05.a6", "Follow an eruption on Io", "Exploring Geology · Fig. 19.05.a6"));
  });

  section(6, "Saturn’s rings and active moons", "Saturn’s rings and active moons", [
    group("Follow ring particles", "19.06.a2", [img("19.06.a2", "Follow ring particles", "Exploring Geology · Fig. 19.06.a2")], [
      term("Planetary ring", "a flattened collection of particles orbiting a planet") + ".",
      "Saturn’s rings are made of countless orbiting particles, mostly ice, whose concentrations vary between bright bands and dark gaps.",
      "A ring band contains many small bodies with separate orbits. Nearer particles circle Saturn faster than particles farther out. A dark gap can mark a lower concentration of particles rather than an opaque object in front of the rings."
    ], "Read the figure", "Follow two neighboring rings through the same interval and compare their movement around Saturn.", []),
    group("Trace the plume on Enceladus", "19.06.a7", [img("19.06.a7", "Trace the plume on Enceladus", "Exploring Geology · Fig. 19.06.a7")], [
      term("Plume", "a localized jet of material expelled above a surface") + ".",
      "Jets of ice particles and water vapor rise from fractures near the south pole of Enceladus, linking the surface to water below.",
      "Enceladus has a bright icy surface, fractures near the south pole, and material streaming out into space. The plumes provide a way to sample material from beneath the surface without landing or drilling.",
      "Titan has a thick atmosphere and a landscape with hydrocarbon lakes and drainage features. Mimas has a prominent impact crater. Iapetus has sharply contrasting bright and dark regions. These features identify different satellites of Saturn."
    ], "Read the figure", "Begin at the bright limb and trace the jet away from the moon. Identify which end is the source of the particles.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "19.6", "A spacecraft repeatedly encounters fewer particles while crossing the same dark ring gap. Which explanation fits?",
      ["*The gap contains less orbiting material than neighboring bands.", "The gap is filled by a continuous dark rocky plate.", "The rings are fixed to the planet and turn as a single solid disk.", "Particles in all bands complete an orbit in the same time."],
      "Fewer particle encounters independently support the lower density suggested by the dark band. Neighboring bright bands contain more light-scattering material.", undefined);
    mc("figure", "19.06.a7", "A probe crosses the plume shown above Enceladus. What material is it best positioned to sample?",
      ["*Ice grains and water vapor leaving fractures.", "Silicate grains thrown out by Saturn’s cloud belts.", "Liquid methane flowing across Titan’s surface.", "Dust swept from the surface of a lunar mare."],
      "The jets leave fractures on an icy moon. Passing through the jets can collect the ice grains and water vapor that travel above the surface.", img("19.06.a7", "Trace the plume on Enceladus", "Exploring Geology · Fig. 19.06.a7"));
    fill("recall", "19.6", "What term describes a flattened collection of particles orbiting a planet?", ["planetary ring", "a planetary ring", "an planetary ring"], "Saturn’s rings are made of countless orbiting particles, mostly ice, whose concentrations vary between bright bands and dark gaps.");
    mc("extend-2-19-06-a4", "19.06.a4", "A radar map shows a shoreline and connected drainage beneath thick haze. Which Saturnian moon fits?",
      ["*Titan.", "Enceladus.", "Mimas.", "Iapetus."],
      "Titan’s surface supports hydrocarbon lakes and drainage networks under its atmosphere.");
    write("explain", "19.6", "Explain how ring brightness and the plume on Enceladus each give evidence about particles.",
      "Rings concentrate sunlight-reflecting particles in bands with different populations. On Enceladus, a narrow jet can be traced to fractures that eject ice and vapor. The first observation maps an orbiting population and the second locates a source.", ["Explain a ring brightness difference", "Identify the plume material", "Trace it to a source"], img("19.06.a2", "Follow ring particles", "Exploring Geology · Fig. 19.06.a2"));
  });

  section(7, "Uranus, Neptune, and icy worlds beyond", "Uranus, Neptune, and icy worlds beyond", [
    group("Compare pole, rings, and moons", "19.07.a2", [img("19.07.a2", "Compare pole, rings, and moons", "Exploring Geology · Fig. 19.07.a2")], [
      term("Axial tilt", "the angle between a body’s spin axis and the perpendicular to its orbital plane") + ".",
      "Uranus rotates with a large tilt, so its equator, rings, and regular moons have a striking orientation relative to its orbit.",
      "Uranus’s ring plane follows its equator. Its regular satellites orbit in much the same plane. The orientation of the system gives a clue to the spin axis even when few cloud features are visible.",
      "Uranus and Neptune have hydrogen, helium, and methane in their atmospheres. Around Uranus, ice-rich Ariel has long fractures, while Miranda has contrasting cratered terrain and large angular or oval regions called coronae."
    ], "Read the figure", "Use the ring plane as a reference. Picture an axis perpendicular to it passing through the center of Uranus.", []),
    group("Inspect Triton’s surface", "19.07.b2", [img("19.07.b2", "Inspect Triton’s surface", "Exploring Geology · Fig. 19.07.b2")], [
      term("Retrograde orbit", "an orbit in the opposite direction to the planet’s rotation") + ".",
      "Triton orbits Neptune in the opposite direction to the planet’s spin, evidence that it may have been captured.",
      "An orbital direction requires a series of observations. Monitoring Triton against Neptune’s spin shows that Triton moves the opposite way. A surface image instead shows texture, color differences, and clues to icy geologic activity.",
      "Pluto is an icy dwarf planet with a large companion, Charon. Beyond Neptune, the Kuiper Belt contains other icy bodies. Gas and dust released by a comet near the Sun form tails that point generally away from the Sun."
    ], "Read the figure", "Keep the rotation and orbit arrows in view together. Use the surface photograph for landforms and the arrows for the direction comparison.", ["NASA Triton:Overview"])
  ], ({mc, fill, match, write}) => {
    mc("apply", "19.7", "How can the ring plane help estimate the direction of Uranus’s spin axis?",
      ["*The spin axis is close to perpendicular to the ring plane.", "The spin axis lies along the widest apparent ring arc.", "The spin axis points from Uranus toward its largest moon.", "The spin axis follows the orbit of Uranus around the Sun."],
      "A ring plane is close to the equatorial plane. The axis through the poles is perpendicular to that plane even when the entire system is tilted.", undefined);
    mc("figure", "19.07.b2", "Which additional observation would test the capture interpretation for Triton most directly?",
      ["*Track its orbital direction relative to Neptune’s rotation.", "Measure the color of a single bright ice patch.", "Compare the widths of two nearby surface ridges.", "Count the craters visible inside one photograph."],
      "Measuring Triton’s orbit relative to Neptune’s spin establishes whether it travels retrograde. Surface textures record geological change and cannot measure the direction of the orbit.", img("19.07.b2", "Inspect Triton’s surface", "Exploring Geology · Fig. 19.07.b2"), ["NASA Triton:Overview"]);
    fill("recall", "19.7", "What term describes the angle between a body’s spin axis and the perpendicular to its orbital plane?", ["axial tilt", "a axial tilt", "an axial tilt"], "Uranus rotates with a large tilt, so its equator, rings, and regular moons have a striking orientation relative to its orbit.");
    mc("extend-1-19-07-a4", "19.07.a4", "Which mapped feature belongs to the course description of Miranda?",
      ["*An angular corona disrupting old cratered ice.", "A hydrocarbon lake beneath a thick orange haze.", "A bright sulfur-rich plume over a silicate vent.", "A dark basalt mare within the lunar highlands."],
      "Miranda’s coronae interrupt older terrains and include evidence of deformation.");
    mc("extend-2-19-07-c2", "19.07.c2", "As a comet travels away from the Sun, where does its tail point relative to the Sun?",
      ["*Away from the Sun, even on the outward trip.", "Toward the Sun throughout the outward trip.", "Toward the nearest giant planet.", "Toward the comet’s previous position in every orbit."],
      "Sunlight and the solar wind direct the released material generally away from the Sun.");
    write("explain", "19.7", "Explain how the evidence for Triton’s surface geology differs from the evidence for its orbital history.",
      "A photograph shows surface textures and icy terrains. Repeated position measurements establish that it travels opposite Neptune’s rotation. A retrograde orbit supports capture, while individual landforms record surface events.", ["Identify a property visible in the photograph", "Describe the motion measurements", "Link retrograde motion to the capture inference"], img("19.07.a2", "Compare pole, rings, and moons", "Exploring Geology · Fig. 19.07.a2"), ["NASA Triton:Overview"]);
  });

  section(8, "Reading the water record on Mars", "Reading the water record on Mars", [
    group("Trace an ancient channel", "19.08.a6", [img("19.08.a6", "Trace an ancient channel", "Exploring Geology · Fig. 19.08.a6")], [
      term("Drainage network", "connected channels that gather and route flow across a landscape") + ".",
      "Where small channels join larger ones, their branching geometry can preserve evidence of past flow even after the water is gone.",
      "Orbital images cover large areas. Branching channels can drain into a trunk channel, and fans or deltas can preserve sediment deposited where flow spreads out or enters standing water. Other Martian landforms record wind or volcanism.",
      "Olympus Mons is a broad shield volcano built by lava flows. Parts of Valles Marineris record crustal extension and later wall collapse. Elsewhere, wind forms dunes and running water carved channel networks. Mars preserves evidence of all these processes."
    ], "Read the figure", "Trace two tributaries down to their junction. Follow the common channel before deciding which way the former water traveled.", []),
    group("Sample the material below the surface", "19.08.b6", [img("19.08.b6", "Sample the material below the surface", "Exploring Geology · Fig. 19.08.b6")], [
      term("In situ observation", "a measurement made directly at the site being investigated") + ".",
      "A rover can drill through a weathered surface and examine the rock below, testing ideas suggested by images from orbit.",
      "Rovers can examine grain shapes, rock layers, and minerals at the scale of a hand sample. Drilling exposes material below the surface coating. Together, these observations test whether an orbital feature formed in the presence of water.",
      "A rover found small hematite-rich spheres weathering out of layered rock. Their composition and relationship to their host can help test whether groundwater once altered the sediments. The spheres’ round shape by itself leaves several origins possible."
    ], "Read the figure", "Locate the dark borehole within the pale patch of drill tailings. Distinguish a rock measurement from the regional shape of the channel.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "19.8", "Which pair of observations makes the strongest case for former liquid water at a specific Martian site?",
      ["*A branching channel and water-deposited sediments at its outlet.", "A volcanic summit and a bright streak of airborne dust.", "A circular crater and a field of wind ripples on its floor.", "A normal fault and a scarp that crosses a lava plain."],
      "Converging channels give a regional flow pattern, and sediments at the outlet test what the flow transported. The two observations support the same past process.", undefined);
    mc("figure", "19.08.b6", "What comparison becomes possible after the rover makes the hole shown in the photograph?",
      ["*Compare weathered surface material with newly exposed rock.", "Compare all tributary slopes across an entire hemisphere.", "Compare deep mantle rocks with the Martian atmosphere.", "Compare orbital speeds of two moons around Mars."],
      "The drill passes through the weathered exterior and produces fresh material. The rover can compare this material with the surface coating at the same site.", img("19.08.b6", "Sample the material below the surface", "Exploring Geology · Fig. 19.08.b6"));
    fill("recall", "19.8", "What term describes connected channels that gather and route flow across a landscape?", ["drainage network", "a drainage network", "an drainage network"], "Where small channels join larger ones, their branching geometry can preserve evidence of past flow even after the water is gone.");
    mc("extend-1-19-08-a7", "19.08.a7", "Which interpretation fits a broad mountain with gently sloping lava-covered flanks and a summit depression?",
      ["*Construction of a shield volcano.", "Incision of a branching river network.", "Retreat of a polar ice cap.", "Excavation of a narrow fault-bounded trough."],
      "Successive lava flows build the broad slopes of a shield volcano such as Olympus Mons.");
    mc("extend-2-19-08-b5", "19.08.b5", "Which measurement best tests a proposed groundwater origin for the spheres?",
      ["*Determine their mineralogy and relation to sediment layers.", "Count dunes in an unrelated crater.", "Measure the direction of present surface winds.", "Compare the width of a nearby lava flow."],
      "Mineralogy and the sedimentary setting test a water-related origin more directly than shape or distant landforms.");
    write("explain", "19.8", "Design two linked observations to test a former stream interpretation on Mars.",
      "First trace connected channels and an outlet deposit in orbital images. Then send a rover to examine sediment textures or minerals in the deposit. The map and the sampled rock test the interpretation at different scales.", ["Identify an orbital observation", "Specify an appropriate rover observation", "Explain why the observations complement one another"], img("19.08.a6", "Trace an ancient channel", "Exploring Geology · Fig. 19.08.a6"));
  });

  section(9, "Reconstruct the history of an unfamiliar world", "Reconstruct the history of an unfamiliar world", [
    group("Compare the two terrains", "19.09.a2", [img("19.09.a2", "Compare the two terrains", "Exploring Geology · Fig. 19.09.a2"), img("planet-terrain-map", "Lettered geological regions of the investigation planet", "Connect · Chapter 19 · assignment Q3")], [
      term("Relative age", "the sequence of events from older to younger without assigning a numerical date") + ".",
      "Where dark basalt overlaps heavily cratered terrain and fills some of its craters, the buried surface must be older than the flow.",
      "In the course investigation, the western terrain contains shattered, weathered basalt and many craters. Dark basalt extends across its boundary and fills some crater floors. Younger impacts can pit that dark basalt afterward."
    ], "Read the figure", "Trace the dark unit to a place where it extends into the cratered unit. Use that contact to order the two materials.", []),
    group("Order incision and deposition", "19.09.a6", [img("19.09.a6", "Order incision and deposition", "Exploring Geology · Fig. 19.09.a6")], [
      term("Cross-cutting relationship", "evidence that a feature is younger than the material it cuts") + ".",
      "A channel cut into an existing surface is younger than that surface, even if the two features have no measured numerical ages.",
      "The map also shows channels connecting a sedimentary area to lower terrain. A channel postdates the surface it incises. Sediment filling its floor was deposited after space for the channel existed.",
      "Layered polar ice overlaps an older crater at the cap margin. Few new scars remain on the ice. In another part of the map, normal faults cut dark basalt, so movement on those faults occurred after that basalt solidified."
    ], "Read the figure", "Follow the narrow valley in the close-up. Keep the surrounding terrain, the cutting event, and the later channel fill distinct.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "19.9", "An impact crater interrupts a dark flow, and the flow fills older craters in western terrain. Which event happened last at that site?",
      ["*The impact that cuts the dark flow.", "The impacts buried beneath the dark flow.", "The formation of the western terrain.", "The first accumulation of the dark flow."],
      "The younger crater cuts the solidified flow. The flow in turn buried some preexisting western craters, so those impacts and the western terrain came earlier.", undefined);
    mc("figure", "19.09.a6", "Which relationship in the channel image would support later deposition within the valley?",
      ["*Material on the floor covers the bottom of a channel cut into older terrain.", "Loose material forms a continuous layer beneath the entire landscape.", "Sediment on a hilltop grades downward into intact basement rock.", "A crater is present in a different part of the same hemisphere."],
      "Incision creates the low space. Material that covers the incised floor records a later episode of deposition within it.", img("19.09.a6", "Order incision and deposition", "Exploring Geology · Fig. 19.09.a6"));
    fill("recall", "19.9", "What term describes the sequence of events from older to younger without assigning a numerical date?", ["relative age", "a relative age", "an relative age"], "Where dark basalt overlaps heavily cratered terrain and fills some of its craters, the buried surface must be older than the flow.");
    mc("planet-terrain-map", "Connect 19:assignment Q3", "A sample is weathered basalt from a unit that extends into the western craters. Where should the rover return for another sample of the same unit?",
      ["*The dark strip marked D.", "The polar cap marked P.", "The layered terrain marked S.", "The channel marked V."],
      "D is the younger basalt strip. W also contains basalt, but its heavily shattered, more densely cratered surface is partly buried by D.", img("planet-terrain-map", "Lettered geological regions of the investigation planet", "Connect · Chapter 19 · assignment Q3"));
    mc("extend-2-19-09-a4", "19.09.a4", "A fault offsets the dark basalt strip but stops at a younger unit. Which age relationship follows from the offset?",
      ["*The fault moved after the offset basalt formed.", "The basalt formed after its final displacement.", "The fault and every nearby crater are the same age.", "The basalt predates all western craters."],
      "The rock had to be present before the fault could displace it.");
    write("explain", "19.9", "Reconstruct the minimum sequence needed for a sediment-filled valley in preexisting terrain.",
      "The surrounding surface existed first. A later event cut the valley into it, and sediment accumulated in the available space. Those relations establish order without assigning numerical ages.", ["Identify the original terrain", "Place incision after the terrain", "Place channel fill after incision"], img("19.09.a2", "Compare the two terrains", "Exploring Geology · Fig. 19.09.a2"));
  });

})(window.L);
