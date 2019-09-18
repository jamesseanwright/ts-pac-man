export type Context = Pick<
  AudioContext,
  | 'createBufferSource'
  | 'decodeAudioData'
  | 'destination'
>;

type PromiseMapCallback<TItem, TResolve> = (item: TItem) => Promise<TResolve>;

const mapToPromises = <TItem, TResolve>(items: TItem[], cb: PromiseMapCallback<TItem, TResolve>) =>
  Promise.all(items.map(cb));

export const audioPlayerCreator = (fetch: typeof window.fetch) =>
  async (audioContext: Context, ...paths: string[]) => {
    const responses = await mapToPromises(paths, path => fetch(path));
    const arrayBuffers = await mapToPromises(responses, res => res.arrayBuffer());
    const audioBuffers = await mapToPromises(arrayBuffers, ab => audioContext.decodeAudioData(ab));
    const tracks = new Map(paths.map((p, i) => [p, audioBuffers[i]]));

    let currentSource: AudioBufferSourceNode;

    const play = (path: string, loop = true) => {
      if (currentSource) {
        currentSource.stop();
        currentSource.disconnect(audioContext.destination);
      }

      currentSource = audioContext.createBufferSource();
      currentSource.buffer = tracks.get(path) || null;
      currentSource.loop = loop;
      currentSource.connect(audioContext.destination);
      currentSource.start();
    };

    return play;
  };

export default audioPlayerCreator(window.fetch);
