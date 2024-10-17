import { FeatureFlagPipe } from './feature-flag.pipe';

describe('FeatureFlagPipe', () => {
  it('create an instance', () => {
    const pipe = new FeatureFlagPipe();
    expect(pipe).toBeTruthy();
  });
});
