/* Content registration for the Final Exam Study chapters. */
(function (L) {
  'use strict';
  const A = L.A, topics = [];
  L.EXAMS.final = {id: 'final', label: 'Final Exam', chapters: [], available: [], mocks: false};

  const term = (name, definition, join = 'is') => '<mark class="pilot-term">' + name +
    '</mark> ' + join + ' <mark class="study-definition">' + definition + '</mark>';
  const highlight = phrase => '<mark class="e2-study-emphasis">' + phrase + '</mark>';
  const group = (heading, slides, figures, points, label, check, more = []) =>
    ({heading, slides, figures, points, label, check, more});

  function chapter(ch, details, references) {
    L.CHAPTERS[ch] = details;
    L.EXAMS.final.chapters.push(ch);
    L.EXAMS.final.available.push(ch);

    const img = (file, alt, cap) => ({
      kind: 'img', src: 'assets/figures/chapter' + ch + '/' + file + '.webp', alt, cap
    });

    function section(n, title, concept, groups, author) {
      const number = ch + '.' + n, sec = 'c' + ch + 's' + n, c = sec + '-core', prefix = 'final-c' + ch + '-' + n + '-';
      const sources = (slides, extra = []) =>
        [...references(n, slides), ...extra];
      const cards = groups.map((g, i) => ({
        id: 'g' + ch + '-' + n + '-' + (i + 1), h: g.heading, c: [c], tier: 2,
        html: '<section class="e2-note-group"><h3 class="e2-note-heading">' + g.heading +
          '</h3><ul class="e2-note-points">' + g.points.map(p => '<li>' + p + '</li>').join('') +
          '<li class="pilot-checkpoint"><b class="pilot-check-label">' + g.label + '</b>' + g.check + '</li></ul></section>',
        src: sources(g.slides, g.more),
        media: g.figures.map(m => ({...m, alt: g.heading + ' · ' + m.alt}))
      }));
      A.section({id: sec, n: number, ch, examId: 'final', title, concepts: [[c, concept]], tier: 2});
      A.cards(sec, cards);
      const t = {
        id: 'F' + ch + 'S' + n, sec, ch, title: number + ' · ' + title, sections: [number],
        concepts: [c], sources: [...new Set(cards.flatMap(card => card.src))],
        media: cards.flatMap(card => card.media)
      };
      topics.push(t);
      const owned = {examId: 'final', ch};
      author({
        mc(id, slides, q, choices, why, media, extra) {
          A.mc(prefix + id, c, q, choices, why, sources(slides, extra), {...owned, media});
        },
        fill(id, slides, q, answers, why, extra) {
          A.fill(prefix + id, c, q, answers, why, sources(slides, extra), owned);
        },
        match(id, slides, q, pairs, why, media, extra, distractors) {
          A.match(prefix + id, c, q, pairs, why, sources(slides, extra),
            {...owned, media, wordBank: true, sourceFigure: !!media, extra: distractors});
        },
        write(id, slides, q, model, rubric, media, extra) {
          t.writing = A.teach(prefix + id, c, q, model, rubric, sources(slides, extra), {...owned, media}).id;
        }
      });
    }

    return {img, section};
  }

  L.FINAL_STUDY = {topics, chapter, term, highlight, group};
})(window.L);
