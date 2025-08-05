export interface SnackMessage {
  text: string;
  timeout?: number;
  color?: 'success' | 'error' | 'info' | 'warning';
}
