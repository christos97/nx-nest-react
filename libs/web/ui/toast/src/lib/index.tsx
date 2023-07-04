import Typography from '@mui/material/Typography';
export interface ToastMessageProps {
  title: string;
  message: string;
}

export function ToastMessage(props: ToastMessageProps) {
  return (
    <div>
      <Typography variant="body1">{props.title}</Typography>
      <Typography variant="body2">{props.message}</Typography>
    </div>
  );
}

export default ToastMessage;
