import badgen from 'badgen';
import { writeFileSync } from 'fs';
import { ensureFileSync } from 'fs-extra';
import {
  IOptions,
  IReporter,
  IStatistic
} from 'jscpd';
import { join } from 'path';

interface IBadgeOptions {
  color?: string,
  status?: string,
  subject?: string,
  style?: string,
  icon?: string,
  iconWidth?: number,
  path?: string,
}

export default class implements IReporter {

  constructor(private options: IOptions) {
  }

  public report(...args: [any, IStatistic]): void {
    const [, statistic]: [any, IStatistic] = args;
    const badgeOptions: IBadgeOptions = this.options.reportersOptions ? this.options.reportersOptions.badge || {} : {};
    const badge = badgen({
      color: this.getColor(statistic),
      status: statistic.total.percentage + '%',
      subject: 'Copy/Paste',
      ...badgeOptions
    });
    ensureFileSync(this.options.output);
    writeFileSync(badgeOptions.path ? badgeOptions.path : join(this.options.output, 'jscpd-badge.svg'), badge);
  }

  public attach(): void {
  }

  public getColor(statistic: IStatistic): string {
    if (!statistic.hasOwnProperty('threshold')) {
      return 'grey';
    }
    return statistic.total.percentage < statistic.threshold ? 'green' : 'red';
  }
}
