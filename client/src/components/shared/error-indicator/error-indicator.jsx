import * as React from "react";
import { Link } from "react-router-dom";

const ErrorIndicator = () => {
  return (
    <div>
      <p>Oops!</p>
      <p>Something went wrong!</p>
      <Link to='/'>
        Go Back
      </Link>
    </div>
  );
};

export default ErrorIndicator;
