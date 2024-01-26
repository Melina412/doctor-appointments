import { generateMonthOverviewFromDate } from './appointments.generator.js';

export async function getDaysPerMonth(req, res) {
  const month = req.query.month;
  const year = req.query.year;
  const today = new Date();
  console.log({ month }, { year });

  const monthOverview = generateMonthOverviewFromDate(today);
  const query = monthOverview[year] ? monthOverview[year][month] || [] : [];
  console.log(query);

  res.json({ year: year, month: month, days: query });
}
