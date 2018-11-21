import test from 'ava';
import { spy, stub } from 'sinon';

const proxyquire = require('proxyquire').noCallThru();

const badgeDependencies = {
  'badgen': stub().returns('badge'),
  'fs': {
    writeFileSync: spy()
  },
  'fs-extra': {
    ensureDirSync: stub().returns(true)
  },
  path: {
    join: stub().returns('path')
  }
};

const BadgeReporter = proxyquire('../', badgeDependencies).default;

test('should use grey color if threshold does not provided', t => {
  const reporter: any = new BadgeReporter({});
  t.is(reporter.getColor({}), 'grey');
});

test('should use N/A status if statistic does not provided', t => {
  const reporter: any = new BadgeReporter({});
  t.is(reporter.getStatus(), 'N/A');
});

test('should use red color if threshold less then total percentage', t => {
  const reporter: any = new BadgeReporter({});
  t.is(reporter.getColor({ threshold: 10, total: { percentage: 11 } }), 'red');
});

test('should use green color if threshold bigger then total percentage', t => {
  const reporter: any = new BadgeReporter({});
  t.is(reporter.getColor({ threshold: 10, total: { percentage: 1 } }), 'green');
});

test('should render badge', t => {
  const reporter: any = new BadgeReporter({
    reportersOptions: {}
  });
  reporter.report([], { threshold: 10, total: { percentage: 1 } });
  t.truthy(badgeDependencies.fs.writeFileSync.calledWith('path', 'badge'));
});

test('should render with default options', t => {
  const reporter: any = new BadgeReporter({});
  reporter.report([], { threshold: 10, total: { percentage: 1 } });
  t.truthy(badgeDependencies.fs.writeFileSync.calledWith('path', 'badge'));
});

test('should render badge to path', t => {
  const reporter: any = new BadgeReporter({
    reportersOptions: {
      badge: {
        path: 'path1'
      }
    }
  });
  reporter.attach();
  reporter.report([], { threshold: 10, total: { percentage: 1 } });
  t.truthy(badgeDependencies.fs.writeFileSync.calledWith('path1', 'badge'));
});
