import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container text-center mt-5">
          <h1 className="display-4">500</h1>
          <p className="lead">Something went wrong 💥</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary