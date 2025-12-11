import * as Tone from 'tone';

export type SoundType = 'start' | 'cash' | 'pop' | 'notification';

// Cache instruments to avoid recreating them (Performance Optimization)
let synth: Tone.Synth | null = null;
let membrane: Tone.MembraneSynth | null = null;
let poly: Tone.PolySynth | null = null;

const initAudio = () => {
  if (!synth) synth = new Tone.Synth().toDestination();
  if (!membrane) membrane = new Tone.MembraneSynth().toDestination();
  if (!poly) {
    poly = new Tone.PolySynth(Tone.Synth).toDestination();
    poly.volume.value = -5;
  }
};

export const playSound = async (type: SoundType) => {
  // Ensure AudioContext is running (Required for browsers)
  if (Tone.context.state !== 'running') {
    try {
      await Tone.start();
    } catch (e) {
      console.warn("Audio start failed", e);
      return;
    }
  }

  try {
    initAudio();
    const now = Tone.now();

    if (type === 'start' && synth) {
      synth.triggerAttackRelease("C5", "8n", now);
      synth.triggerAttackRelease("E5", "8n", now + 0.1);
      synth.triggerAttackRelease("G5", "8n", now + 0.2);
    } else if (type === 'cash' && synth) {
      synth.triggerAttackRelease("C6", "16n", now);
      synth.triggerAttackRelease("E6", "16n", now + 0.1);
      synth.triggerAttackRelease("G6", "4n", now + 0.2);
    } else if (type === 'pop' && membrane) {
      membrane.triggerAttackRelease("C2", "32n", now);
    } else if (type === 'notification' && poly) {
      poly.triggerAttackRelease(["C5", "E5"], "32n", now);
    }
  } catch (e) {
    console.warn("Audio play failed", e);
  }
};