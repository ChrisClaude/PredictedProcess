import type { ChildProcess } from 'child_process';
import { spawn } from 'child_process';

export class PredictedProcess {
  private _childProcess: ChildProcess | null = null;
  private _abortController: AbortController | null = null;

  public constructor(
    public readonly id: number,
    public readonly command: string,
  ) {}

  /**
   * Spawns and manages a child process to execute a given command, with handling for an optional AbortSignal.
   *
   * WRITE UP:
   * (Please provide a detailed explanation of your approach, specifically the reasoning behind your design decisions. This can be done _after_ the 1h30m time limit.)
   *
   * ...
   *
   */
  public async run(signal?: AbortSignal): Promise<void> {
    if (signal?.aborted) {
      throw new Error('Signal already aborted');
    }

    if (this._abortController) {
      this._abortController.abort();
    }

    this._abortController = new AbortController();
    signal?.addEventListener('abort', () => this._abortController?.abort());

    return new Promise<void>((resolve, reject) => {
      if (this._childProcess) {
        this._childProcess.kill();
      }

      this._childProcess = spawn(this.command, { shell: true });

      this._childProcess.on('close', (code, signal) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Child process closed with code ${code} and signal ${signal}`));
        }
      });

      this._childProcess.on('error', (error) => {
        reject(error);
      });
    }).finally(() => {
      this._abortController = null;
    });
  }

  /**
   * Returns a memoized version of `PredictedProcess`.
   *
   * WRITE UP:
   * (Please provide a detailed explanation of your approach, specifically the reasoning behind your design decisions. This can be done _after_ the 1h30m time limit.)
   *
   * ...
   *
   */
  public memoize(): PredictedProcess {
    return new PredictedProcess(this.id, this.command);
  }
}
