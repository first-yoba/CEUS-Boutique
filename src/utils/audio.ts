// Luxury editorial ambient audio synthesizer using Web Audio API

class LuxuryAmbienceEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  private start() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 3);
      this.masterGain.connect(this.ctx.destination);

      // Warm low drone for luxury atmosphere
      const droneOsc = this.ctx.createOscillator();
      const droneGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, this.ctx.currentTime);

      droneOsc.type = 'sine';
      droneOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A

      droneGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

      droneOsc.connect(filter);
      filter.connect(this.masterGain);
      droneOsc.start();

      // Subtle atmospheric harmonic chords every few seconds
      const chordFrequencies = [
        [220, 277.18, 329.63], // A major
        [196, 246.94, 293.66], // G major
        [164.81, 207.65, 246.94], // E major
        [220, 261.63, 329.63], // A minor
      ];

      let chordIdx = 0;
      const playChime = () => {
        if (!this.ctx || !this.masterGain || !this.isPlaying) return;
        const notes = chordFrequencies[chordIdx % chordFrequencies.length];
        chordIdx++;

        notes.forEach((freq, i) => {
          if (!this.ctx || !this.masterGain) return;
          const osc = this.ctx.createOscillator();
          const noteGain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          const startTime = this.ctx.currentTime + i * 0.15;
          noteGain.gain.setValueAtTime(0.001, startTime);
          noteGain.gain.exponentialRampToValueAtTime(0.04, startTime + 1.2);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 4.5);

          osc.connect(noteGain);
          noteGain.connect(this.masterGain);

          osc.start(startTime);
          osc.stop(startTime + 4.6);
        });
      };

      playChime();
      this.intervalId = window.setInterval(playChime, 6000);
      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  private stop() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      setTimeout(() => {
        if (this.ctx && this.ctx.state !== 'closed') {
          this.ctx.suspend();
        }
      }, 1000);
    }
    this.isPlaying = false;
  }
}

export const luxuryAudio = new LuxuryAmbienceEngine();
