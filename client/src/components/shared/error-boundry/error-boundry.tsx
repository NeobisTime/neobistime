import React from "react";
import ErrorIndicator from "../error-indicator";

export default class ErrorBoundry extends React.Component {

  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return this.props.children;
  }
}

// export default class ErrorBoundry extends React.Component {
//   constructor(props: any) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     this.setState({ hasError: true });
//   }

//   render() {
//     if (this.state.hasError) {
//       // Можно отрендерить запасной UI произвольного вида
//       return <ErrorIndicator />;
//     }

//     return this.props.children; 
//   }
// }
