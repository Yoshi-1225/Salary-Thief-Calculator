import * as Tone from 'tone';

export type SoundType = 'start' | 'cash' | 'pop' | 'notification';

export const playSound = (type: SoundType) => {
  if (Tone.context.state !== 'running') {
    Tone.start().catch(e => console.log("Audio start failed", e));
  }

  try {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();

    if (type === 'start') {
      synth.triggerAttackRelease("C5", "8n", now);
      synth.triggerAttackRelease("E5", "8n", now + 0.1);
      synth.triggerAttackRelease("G5", "8n", now + 0.2);
    } else if (type === 'cash') {
      synth.triggerAttackRelease("C6", "16n", now);
      synth.triggerAttackRelease("E6", "16n", now + 0.1);
      synth.triggerAttackRelease("G6", "4n", now + 0.2);
    } else if (type === 'pop') {
      const membrane = new Tone.MembraneSynth().toDestination();
      membrane.triggerAttackRelease("C2", "32n");
    } else if (type === 'notification') {
      const ping = new Tone.PolySynth(Tone.Synth).toDestination();
      ping.volume.value = -5;
      ping.triggerAttackRelease(["C5", "E5"], "32n");
    }
  } catch (e) {
    console.log("Audio play failed", e);
  }
};