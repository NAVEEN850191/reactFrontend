interface StatusIndicatorProps {
  status?: string
}

export default function StatusIndicator({
  status
}: StatusIndicatorProps) {
  if(!status){
    return null;
  }
  return(
    <span
      data-status={status}
      style={{
        marginLeft:"8px",
        fontWeight:"bold",
      }}
    >
      {status}
    </span>
  );
}
