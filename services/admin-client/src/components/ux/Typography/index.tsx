/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  Typography as MUITypography,
  TypographyProps,
} from '@material-ui/core';

import { t } from 'utils/i18n';

interface Props extends TypographyProps {
  text?: string;
}

const Typography: React.FC<Props> = ({ text, children, ...props }) => {
  return (
    <MUITypography {...props}>
      {text && t(text)}
      {children}
    </MUITypography>
  );
};

export const withPrefix = (prefix: string) => (props: Props) => (
  // eslint-disable-next-line react/destructuring-assignment
  <Typography {...props} text={`${prefix}.${props.text}`} />
);

export default Typography;
