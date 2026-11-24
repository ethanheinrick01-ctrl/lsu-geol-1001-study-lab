/* Selected lecture illustrations and their original Final Exam practice questions. */
(function (lab) {
  'use strict';
  lab.FINAL_STUDY.lectureFigure = function (chapter, section, slide, file, description, prompt, options, explanation) {
    const topic = lab.FINAL_STUDY.topics.find(item => item.id === 'F' + chapter + 'S' + section);
    const source = 'Lecture' + chapter;
    lab.SOURCES[source] = {t: 'Chapter ' + chapter + ' lecture PowerPoint', f: 'Ch' + chapter + '_2025R', tier: 2, unit: 'slide'};
    const media = {kind: 'img', src: file, alt: description, cap: 'Lecture PowerPoint · Chapter ' + chapter + ', slide ' + slide + ' · ' + description};
    if (!topic.media.some(item => item.src === file)) topic.media.unshift(media);
    const citation = source + ':' + slide;
    if (!topic.sources.includes(citation)) topic.sources.push(citation);
    const key = file.split('/').pop().replace(/\.webp$/, '');
    lab.A.mc('final-lecture-' + chapter + '-' + section + '-' + slide + '-' + key, topic.concepts[0],
      prompt, options, explanation, [citation], {examId: 'final', ch: chapter, media, sourceFigure: true, lectureFigure: true});
  };
})(window.L);
