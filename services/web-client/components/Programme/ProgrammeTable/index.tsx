import React from 'react';
import { Box, Grid, Typography, Card } from '@material-ui/core';
import bemHelper from 'lib/bem';

import { Props } from './ProgrammeTable';

import styles from './ProgrammeTable.module.scss';

const bem = bemHelper(styles, 'ProgrammeTable');

const ProgrammeTable: React.FC<Props> = ({ dates, schedule }) => (
  <Box py={5} className={bem.b()}>
    <Grid
      container
      justify="center"
      alignItems="center"
      className={bem.el('header')}
      spacing={2}
    >
      {dates.map((date, i, arr) => (
        <>
          <Grid item key={date.location.toLowerCase()}>
            <Typography variant="body2">
              {`${date.location} - ${date.date}`}
            </Typography>
          </Grid>
          {i < arr.length - 1 ? <Grid item>•</Grid> : ''}
        </>
      ))}
    </Grid>
    <Grid container direction="column">
      {schedule.map((item) => (
        <Grid item xs={12} key={item.startTime} className={bem.el('row')}>
          <Box py={2} px={1}>
            <Grid container>
              <Grid item xs={12} lg={2} container alignItems="center">
                <Typography variant="subtitle2">
                  {`${item.startTime}${
                    item.endTime ? ` - ${item.endTime}` : ''
                  }`}
                </Typography>
              </Grid>
              {Array.isArray(item.description) ? (
                <Grid
                  item
                  xs={12}
                  lg={10}
                  container
                  direction="column"
                  spacing={2}
                >
                  {item.description.map((desc) => (
                    <Grid item key={desc.description.toLowerCase()}>
                      <Typography variant="caption" color="primary">
                        {desc.location}
                      </Typography>
                      <Typography variant="h6">{desc.description}</Typography>
                      <Typography variant="subtitle2">
                        {desc.speaker}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Grid item>
                  <Typography variant="h6">{item.description}</Typography>
                  <Typography variant="subtitle2">{item.speaker}</Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default ProgrammeTable;
