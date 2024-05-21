import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: 'rgba(0, 0, 0, 0.7)', // Transparent black background
    boxShadow: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    // padding: theme.spacing(0, 2), // Add padding to the sides
    boxSizing: 'border-box', // Ensure padding is included in width
  },
  logo: {
    flexGrow: 1,
  },
  menu: {
    display: 'flex',
    justifyContent: 'center',
  },
  contactButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default useStyles;
