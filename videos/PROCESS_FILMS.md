# Exam 1 process films

Production renderer: `python3 videos/render_process_films.py --all --workers 3`.
Requires Python, Pillow, NumPy, and FFmpeg. No network or paid runtime service is involved. Use `--topic T4 T14 --stills` for a local QA contact sheet, or `--topic T14 --workers 1` for one film. QA output under `videos/qa-process/` is local and is not deployed.

Source scope is the sixteen topic groups in `js/content/exam1.js`, grounded in the September 24 exam review and the course figures retained on each Learn page. `process-films.json` records the duration, chapter times, summary, and figure references. The film captions are also exported as WebVTT tracks.

The animated object must be the changing geological material. A timer, title change, moving marker or new file format does not establish adequate motion. Review early, middle, late and transition frames of each physical process. Inspect scientific invariants as well as image quality: paired stripes keep their original polarity, oceanic crust and mantle lithosphere are distinct layers, partial melting leaves solid grains, and water from a slab promotes mantle-wedge melting.

Material atlas provenance is in `artwork/PROVENANCE.md`. The original course figures are reference material, not rendered video frames. The new geometric cutaways and sequences are teaching reconstructions; motion, distance, grain size, and time are schematic.

For browser checks, use a server with HTTP byte-range support to test seeking. The basic Python HTTP server may play a film while rejecting time jumps; the deployed GitHub Pages server supports byte ranges. No autoplay is used. Native controls, stage buttons and speed changes work without writing study progress.

## Review-focused narration

`narration.json` contains original spoken scripts, review-transcript line references, voice choice and source-stage boundaries. The scripts emphasize the instructor's identify → classify → explain pattern, using the existing course explanations to correct speech-recognition errors. These are original paraphrases narrated with the user-approved AI Voice Generator Clear voice, not recordings or impersonations of the professor.

Run `python3 videos/add_narration.py` to embed the bundled Clear narration. `--topic T4 T14` rebuilds selected films. The builder reads the pinned silent Git revision and the original MP3 exports under `narration-clear/`, splits speech at the `audioStart`/`audioEnd` boundaries in `narration.json`, slows a visual stage when its explanation needs more time, updates chapter timestamps and captions, and embeds normalized mono AAC audio. Speech is never sped up. No cloud call is needed for rebuilding or playback. Word timestamp JSON files preserve the local Whisper alignment evidence; recognition spelling is diagnostic only, and the authoritative spoken script remains `narration.json`. Stage boundaries were inspected between the last word of one script segment and the first word of the next.

The original silent renderer remains the visual source. To regenerate a finished narrated release, run the narration builder after any visual-source update and update the pinned silent revision deliberately. Do not run the old silent renderer over a narrated release by accident.
