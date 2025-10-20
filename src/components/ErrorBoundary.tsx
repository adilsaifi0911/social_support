import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Alert, Container } from '@mui/material';
import { RefreshOutlined, HomeOutlined } from '@mui/icons-material';

type Props = {
  children: ReactNode;
}

type State = {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              p: 4,
            }}
          >
            <Alert severity="error" sx={{ width: '100%', textAlign: 'left' }}>
              <Typography variant="h6" gutterBottom>
                Something went wrong
              </Typography>
              <Typography variant="body2" color="text.secondary">
                An unexpected error occurred in the application. Please try refreshing the page.
              </Typography>
            </Alert>

            {this.state.error && (
              <Box
                sx={{
                  width: '100%',
                  textAlign: 'left',
                  backgroundColor: '#f5f5f5',
                  p: 2,
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  maxHeight: '200px',
                  overflow: 'auto',
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  Error Details:
                </Typography>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                  {this.state.error.toString()}
                </pre>
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleReload}
                startIcon={<RefreshOutlined />}
              >
                Reload Page
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.handleGoHome}
                startIcon={<HomeOutlined />}
              >
                Go Home
              </Button>
              <Button
                variant="text"
                color="primary"
                onClick={this.handleReset}
              >
                Try Again
              </Button>
            </Box>

            {import.meta.env.DEV && this.state.errorInfo && (
              <Box
                sx={{
                  width: '100%',
                  textAlign: 'left',
                  backgroundColor: '#f5f5f5',
                  p: 2,
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  maxHeight: '300px',
                  overflow: 'auto',
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  Component Stack (Development Only):
                </Typography>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                  {this.state.errorInfo.componentStack}
                </pre>
              </Box>
            )}
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;