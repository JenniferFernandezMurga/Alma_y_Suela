// Botones consistentes
export const PrimaryButton = ({ children, onClick, disabled, ...props }) => (
  <button
    style={{
      background: 'linear-gradient(135deg, #8fbc8f, #2e8b57)',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      padding: '12px 25px',
      fontWeight: '600',
      boxShadow: '0 4px 15px rgba(143, 188, 143, 0.3)',
      transition: 'all 0.3s ease',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1
    }}
    onMouseOver={(e) => !disabled && (e.target.style.transform = 'translateY(-2px)')}
    onMouseOut={(e) => !disabled && (e.target.style.transform = 'translateY(0)')}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
)

export default PrimaryButton