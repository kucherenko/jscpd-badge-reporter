import badgen from 'badgen';
import { writeFileSync } from 'fs';
import {
  IOptions,
  IReporter, IStatistic
} from 'jscpd';
import { join } from 'path';

export default class implements IReporter {

  constructor(private options: IOptions) {
  }

  public report(...args: [any, IStatistic]): void {
    const [, statistic]: [any, IStatistic] = args;
    const badge = badgen({
      color: statistic.total.percentage < statistic.threshold ? 'green' : 'red',
      status: statistic.total.percentage + '%',
      subject: 'Copy/Paste'
    });
    writeFileSync(join(this.options.output, 'jscpd-badge.svg'), badge);
  }

  public attach(): void {
  }
}
