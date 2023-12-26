'use client';
import {
  Card,
  Metric,
  Text,
  AreaChart,
  BadgeDelta,
  Flex,
  DeltaType,
  Grid,
} from '@tremor/react';

const data = [
  {
    Month: 'Jan 21',
    Habits: 2890,
    'Focus Time': 2400,
    'Journal Entries': 4938,
  },
  {
    Month: 'Feb 21',
    Habits: 1890,
    'Focus Time': 1398,
    'Journal Entries': 2938,
  },
  // ...
  {
    Month: 'Jul 21',
    Habits: 3490,
    'Focus Time': 4300,
    'Journal Entries': 143,
  },
];

const categories = [
  {
    title: 'Habits',
    metric: '33x',
    metricPrev: '25x',
    delta: '34.3%',
    deltaType: 'moderateIncrease',
  },
  {
    title: 'Focus Time',
    metric: '49h 32m',
    metricPrev: '28h 12m',
    delta: '18.1%',
    deltaType: 'moderateIncrease',
  },
  {
    title: 'Journal Entries',
    metric: '143',
    metricPrev: '169',
    delta: '12.3%',
    deltaType: 'moderateDecrease',
  },
];

const valueFormatter = (number: number | bigint) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

export default function HabitJournalTimerCharts() {
  return (
    <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
      {categories.map(item => (
        <Card key={item.title}>
          <Flex alignItems="start">
            <Text>{item.title}</Text>
            <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
          </Flex>
          <Flex
            className="space-x-3 truncate"
            justifyContent="start"
            alignItems="baseline"
          >
            <Metric>{item.metric}</Metric>
            <Text>from {item.metricPrev}</Text>
          </Flex>
          <AreaChart
            className="mt-6 h-28"
            data={data}
            index="Month"
            valueFormatter={valueFormatter}
            categories={[item.title]}
            colors={['blue']}
            showXAxis={true}
            showGridLines={false}
            startEndOnly={true}
            showYAxis={false}
            showLegend={false}
          />
        </Card>
      ))}
    </Grid>
  );
}
