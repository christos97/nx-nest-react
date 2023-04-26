export const styles = {
  appBar: {
    backgroundColor: 'white',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  link: {
    textDecoration: 'none',
    color: 'primary',
    marginRight: '1rem',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  typography: {
    flexGrow: 1,
    textAlign: 'center',
    '&span': {
      color: '#fff',
    },
  },
} as const;
