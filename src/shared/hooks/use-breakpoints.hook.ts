import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true;
    xxxl: true;
  }
}

/**
 * Custom hook to get current used breakpoint.
 * NoSsr option set to true for client-side only rendering.
 * @returns Theme breakpoints with current usage status
 */
export const useBreakpoints = () => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.between('xs', 'md'), {
    noSsr: true,
  });
  const xsUp = useMediaQuery(theme.breakpoints.up('xs'), { noSsr: true });
  const sm = useMediaQuery(theme.breakpoints.between('sm', 'lg'), {
    noSsr: true,
  });
  const smDown = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const md = useMediaQuery(theme.breakpoints.between('md', 'lg'), {
    noSsr: true,
  });
  const mdDown = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const mdUp = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });
  const lg = useMediaQuery(theme.breakpoints.between('lg', 'xl'), {
    noSsr: true,
  });
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'), { noSsr: true });
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'), { noSsr: true });
  const xl = useMediaQuery(theme.breakpoints.between('xl', 'xxl'), {
    noSsr: true,
  });
  const xlDown = useMediaQuery(theme.breakpoints.down('xl'), { noSsr: true });
  const xlUp = useMediaQuery(theme.breakpoints.up('xl'), { noSsr: true });
  const xxl = useMediaQuery(theme.breakpoints.between('xxl', 'xxxl'), {
    noSsr: true,
  });
  const xxlDown = useMediaQuery(theme.breakpoints.down('xxl'), { noSsr: true });
  const xxlUp = useMediaQuery(theme.breakpoints.up('xxl'), { noSsr: true });
  const xxxl = useMediaQuery(theme.breakpoints.up('xxxl'), { noSsr: true });
  const xxxlDown = useMediaQuery(theme.breakpoints.down('xxxl'), {
    noSsr: true,
  });
  const xxxlUp = useMediaQuery(theme.breakpoints.up('xxxl'), { noSsr: true });

  return {
    xs,
    xsUp,
    sm,
    smDown,
    smUp,
    md,
    mdDown,
    mdUp,
    lg,
    lgDown,
    lgUp,
    xl,
    xlDown,
    xlUp,
    xxl,
    xxlDown,
    xxlUp,
    xxxl,
    xxxlDown,
    xxxlUp,
  };
};
