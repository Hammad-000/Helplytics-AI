export const Card = ({ children, className = '', hover = false }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${hover ? 'card-hover' : ''} ${className}`}>
      {children}
    </div>
  );
};