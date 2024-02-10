const ErrorMessage = ({ message }) => {
    return (
      <div className={`error-message ${message ? 'show' : ''}`}>
        {message}
      </div>
    );
  };
  
export default ErrorMessage;