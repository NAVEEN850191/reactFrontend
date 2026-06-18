interface ButtonProps {
  children?: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  id?: string
}

export default function Button({
  children,
  onClick,
  type="button",
  id,
}: ButtonProps) {
  return(
    <button
      id={id}
      type={type}
      onClick={onClick}
    >
      {children}  
    </button>
  )
}
