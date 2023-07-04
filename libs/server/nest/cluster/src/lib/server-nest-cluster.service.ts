import cluster from 'cluster';

import { cpus } from 'os';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ClusterModule {
  private static threads: number;

  constructor() {
    if (!ClusterModule.threads) {
      ClusterModule.threads = cpus().length;
    }
  }

  static fork(fn: () => void): void {
    if (cluster.isPrimary) {
      process.stdout.write(`Main Process - PID: ${process.pid} | #Threads: ${this.threads}\n`);
      for (let i = 0; i < this.threads; i++) {
        const envVars = { ...process.env, THREAD_NO: `${i + 1}` };
        cluster.fork(envVars);
      }
      cluster.on('exit', (worker, code, signal) => {
        process.stdout.write(`Killing worker ${worker.process.pid} - ${code} - ${signal}\n`);
        cluster.fork();
      });
    } else fn();
  }
}
