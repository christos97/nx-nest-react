import Typography from '@mui/material/Typography';
export interface ToastMessageProps {
  title: string;
  message?: string;
}

export function ToastMessage({ title, message }: ToastMessageProps) {
  return (
    <div>
      <Typography variant="body1">{title}</Typography>
      {message && <Typography variant="body2">{message}</Typography>}
    </div>
  );
}

export default ToastMessage;
