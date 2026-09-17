Object.assign(window.GEOL_VISUALS, {
  'ch4-silicates': {
    label: 'Silicate structures: follow the strong and weak bonds',
    intro: 'Original textbook figures from the supplied section 4.7. Open to zoom; compare chains, sheets, and frameworks.',
    visuals: [
      {id:'ch45-chains-source',title:'Single versus double chains',src:'assets/course-figure.svg',alt:'Textbook diagrams of single-chain pyroxene and double-chain amphibole, with cleavage descriptions.',caption:'Single chains: pyroxene, near 90°. Double chains: amphibole, near 60°/120°.',notice:'Count the chains in the atomic model, then connect them to the cleavage directions. Do not infer cleavage from color.',source:'Textbook 4.7, p. 91, figures 04.07.b2–b3; supplied PDF page 6',status:'verified-deck'},
      {id:'ch45-framework-source',title:'Sheets and frameworks',src:'assets/course-figure.svg',alt:'Textbook diagrams of sheet and framework silicates.',caption:'Mica sheets have one cleavage direction. Quartz frameworks fracture; feldspar frameworks can cleave.',notice:'The feldspar exception matters: framework does not automatically mean no cleavage.',source:'Textbook 4.7, p. 91, figures 04.07.b4–b5; supplied PDF page 7',status:'verified-deck'}
    ]
  },
  'ch5-chart': {
    label: 'The actual classroom classification chart',
    intro: 'Your classroom photograph is the source. Use the readable interactive table below to practice the two axes without squinting.',
    visuals: [{id:'ch45-classroom-chart',title:'Classification of Igneous Rocks',src:'assets/course-figure.svg',alt:'Classroom chart comparing felsic, intermediate, mafic and ultramafic rocks; coarse and fine textures; mineral associations; silica and color trends.',caption:'The chart your professor repeatedly reviewed. Composition runs across; texture runs down.',notice:'Read the rock pairs in both directions, then follow mineral bands into each composition category. Color is a tendency, not the sole classification rule.',source:'User-supplied classroom photograph IMG_5737.JPG; textbook figure 05.03.b1',status:'verified'}]
  }
});
