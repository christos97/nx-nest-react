export const styles = {
  appBar: {
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '1rem',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    textDecoration: 'none',
    color: 'primary',
    marginRight: '1rem',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  typography: {
    flexGrow: 1,
    textAlign: 'center',
    '&span': {
      color: '#fff',
    },
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
} as const;
