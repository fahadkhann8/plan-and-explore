import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 border border-red-200 flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <h1 className="font-serif text-2xl text-[#0B1F33] mb-3">
              Something went wrong
            </h1>
            <p className="text-sm text-[#4F5E6E] mb-6 leading-relaxed">
              We encountered an unexpected error. Please refresh the page or contact us on WhatsApp for immediate assistance.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#5A5A40] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#4a4a35] transition-colors cursor-pointer"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
