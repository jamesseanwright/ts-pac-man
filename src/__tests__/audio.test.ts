import { audioPlayerCreator, Context } from '../audio';

describe('createAudioPlayer', () => {
  const createResponse = () => ({
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
  } as unknown as Response);

  const createBufferSource = () => ({
    buffer: null,
    loop: null,
    start: jest.fn(),
    stop: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
  });

  const createAudioContext = () => ({
    createBufferSource: jest.fn(),
    decodeAudioData: jest.fn(),
    destination: {} as AudioDestinationNode,
  });

  const fetch = () => Promise.resolve(createResponse());

  it('should create an audio player function that fetches the specified tracks and allows them to be played', async () => {
    const bufferSource = createBufferSource();
    const audioBuffer = {} as unknown as AudioBuffer;
    const audioContext = createAudioContext();
    const createAudioPlayer = audioPlayerCreator(fetch);

    audioContext.createBufferSource.mockReturnValue(bufferSource);
    audioContext.decodeAudioData.mockResolvedValue(audioBuffer);

    const play = await createAudioPlayer(audioContext, '/chase.mp3');

    play('/chase.mp3');

    expect(bufferSource.stop).not.toHaveBeenCalled();
    expect(bufferSource.disconnect).not.toHaveBeenCalled();
    expect(bufferSource.connect).toHaveBeenCalledTimes(1);
    expect(bufferSource.connect).toHaveBeenCalledWith(audioContext.destination);
    expect(bufferSource.start).toHaveBeenCalledTimes(1);
    expect(bufferSource.loop).toBe(true);
  });

  it('should stop and disconnect an existing source node when the track is changed', async () => {
    const chase = createBufferSource();
    const death = createBufferSource();
    const chaseBuffer = {} as unknown as AudioBuffer;
    const deathBuffer = {} as unknown as AudioBuffer;
    const audioContext = createAudioContext();
    const createAudioPlayer = audioPlayerCreator(fetch);

    audioContext.createBufferSource.mockReturnValueOnce(chase);
    audioContext.decodeAudioData.mockResolvedValueOnce(chaseBuffer);

    audioContext.createBufferSource.mockReturnValueOnce(death);
    audioContext.decodeAudioData.mockResolvedValueOnce(deathBuffer);

    const play = await createAudioPlayer(audioContext, '/chase.mp3', '/death.mp3');

    play('/chase.mp3');
    play('/death.mp3');

    expect(chase.stop).toHaveBeenCalled();
    expect(chase.disconnect).toHaveBeenCalled();
    expect(death.connect).toHaveBeenCalledTimes(1);
    expect(death.start).toHaveBeenCalledTimes(1);
  });

  it('should not loop when the optional loop param is false', async () => {
    const bufferSource = createBufferSource();
    const audioBuffer = {} as unknown as AudioBuffer;
    const audioContext = createAudioContext();
    const createAudioPlayer = audioPlayerCreator(fetch);

    audioContext.createBufferSource.mockReturnValue(bufferSource);
    audioContext.decodeAudioData.mockResolvedValue(audioBuffer);

    const play = await createAudioPlayer(audioContext, '/chase.mp3');

    play('/chase.mp3', false);

    expect(bufferSource.loop).toBe(false);
  });
});
