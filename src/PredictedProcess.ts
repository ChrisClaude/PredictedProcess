import type { ChildProcess } from 'child_process';

export class PredictedProcess {
  private _childProcess: ChildProcess | null = null;

  public constructor(
    public readonly id: number,
    public readonly command: string,
  ) {}

  /**
   * Spawns and manages a child process to execute a given command, with handling for an optional AbortSignal.
   */
  public async run(signal?: AbortSignal): Promise<void> {
    // TODO: Implement this.
  }

  /**
   * Returns a memoized version of `PredictedProcess`.
   */
  public memoize(): PredictedProcess {
    // TODO: Implement this.
    return this;
  }
}
