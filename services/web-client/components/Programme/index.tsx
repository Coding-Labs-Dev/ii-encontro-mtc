import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { withPrefix } from 'lib/i18n';
import { programme } from 'lib/data.json';

import Title from 'components/Title';

import DayButton from './DayButton';
import ProgrammeTable from './ProgrammeTable';
import { Schedule, Dates } from './ProgrammeTable/ProgrammeTable';

const t = withPrefix('Programme');

const Programme: React.FC = () => {
  const [selectedDay, setSelectedDay] = React.useState(0);

  const {
    dates,
    schedule,
  }: { dates: Dates[]; schedule: Schedule[] } = programme;

  return (
    <Box py={5}>
      <Container>
        <Grid container justify="center" alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            <Title title={t('Title')} />
          </Grid>
          <Grid item xs={12} container justify="center" spacing={5}>
            {programme.days.map((day, i) => (
              <Grid item key={day.toLowerCase()}>
                <DayButton
                  title={day}
                  active={selectedDay === i}
                  onClick={() => setSelectedDay(i)}
                />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <ProgrammeTable
              schedule={schedule[selectedDay]}
              dates={dates[selectedDay]}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Programme;