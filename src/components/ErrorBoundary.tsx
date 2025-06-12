import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '@/services/logger.service';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Uncaught error:', error, { componentStack: errorInfo.componentStack });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Что-то пошло не так.</h1>
          <p className="text-lg text-gray-700 mb-6">
            Мы уже получили уведомление об ошибке и работаем над ее исправлением.
          </p>
          <Button onClick={() => window.location.reload()}>
            Перезагрузить страницу
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
} 