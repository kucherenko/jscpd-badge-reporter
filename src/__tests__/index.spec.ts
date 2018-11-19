import test from 'ava';
import BadgeReporter from '../';

test('should use grey color if threshold does not provided', t => {
  const reporter: any = new BadgeReporter({});
  t.is(reporter.getColor({}), 'grey');
});

test('should use red color if threshold less then total percentage', t => {
  const reporter: any = new BadgeReporter({});
  t.is(reporter.getColor({ threshold: 10, total: { percentage: 11 } }), 'red');
});
