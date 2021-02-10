import { performance, PerformanceObserver } from 'perf_hooks';
import { sleep } from './utils';

describe('Delay code execution', () => {
  it('should wait for n milliseconds then execute code', async () => {
    // Arrange
    const duration1 = 1000;
    const duration2 = 2000;
    const measures: number[] = [];
    const obs = new PerformanceObserver((list) => {
      measures.push(list.getEntries()[0].duration);
    });
    obs.observe({ entryTypes: ['measure'] });

    // Act
    performance.mark('StartSleep');
    await sleep(duration1);
    performance.mark('EndSleep');
    performance.measure('Sleep', 'StartSleep', 'EndSleep');

    performance.mark('StartSleep');
    await sleep(duration2);
    performance.mark('EndSleep');
    performance.measure('Sleep', 'StartSleep', 'EndSleep');
    obs.disconnect();
    // Assert
    expect(Math.floor(measures[0] / 1000)).toEqual(Math.floor(duration1 / 1000));
    expect(Math.floor(measures[1] / 1000)).toEqual(Math.floor(duration2 / 1000));
  });
});
