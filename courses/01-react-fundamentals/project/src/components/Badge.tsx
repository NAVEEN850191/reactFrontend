interface BadgeProps {
  children?: React.ReactNode
}

export default function Badge({
  children,
}: BadgeProps) {
  return(
    <span
      style={{
        padding:"2px 6px",
        marginRight:"4px",
        border:"1px solid #ccc",
        borderRadius:"10px",
      }}
    > 
     {children}
    </span>
  );
}
