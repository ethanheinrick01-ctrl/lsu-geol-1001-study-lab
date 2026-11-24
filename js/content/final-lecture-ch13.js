(function (add) {
  'use strict';
  const path = 'assets/figures/chapter13/';
  add(13, 2, 7, path + 'breezes.webp', 'Day and night coastal circulation',
    'Follow the low arrow toward shore in the daylight panel. Where does that air go after crossing the shoreline?',
    ['*It rises over the warmer land.', 'It sinks into a surface high over land.', 'It rises over the cooler offshore water.', 'It stays at the surface and returns offshore.'],
    'The daytime loop rises over heated land. The return branch crosses toward the water aloft.');
  add(13, 11, 35, path + 'image74.webp', 'Grain paths above the ground',
    'Which sediment path repeatedly returns to the bed between short flights?',
    ['*The arcs immediately above the surface', 'The long path high above the surface', 'The short path in contact with the bed', 'The grains sheltered beside the plants'],
    'Saltating sand strikes the bed between hops. Dust remains suspended longer, and rolling grains stay in contact with the bed.');
  add(13, 12, 40, path + 'image94.webp', 'Cross section of a migrating dune',
    'Follow a sand grain from the gentle slope over the crest. Which part preserves the inclined layers in cross section?',
    ['*The downwind face where grains avalanche', 'The upwind foot where the ground is nearly flat', 'The crest where wind speed peaks', 'The surface beyond the dune where silt settles'],
    'Each avalanche deposits sand on the steep lee face. As the crest moves downwind, parts of these inclined layers are buried.');
})(window.L.FINAL_STUDY.lectureFigure);
