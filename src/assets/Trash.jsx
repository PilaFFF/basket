function Trash(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width={20}
      height={20}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="none" d="M0 0H24V24H0z" />
      <path d="M5 7.5h14L18 21H6L5 7.5z" stroke="red" strokeLinejoin="round" />
      <path
        d="M15.5 9.5L15 19M12 9.5V19M8.5 9.5L9 19"
        stroke="red"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 5h3a2 2 0 012 2v.5H3V7a2 2 0 012-2h3m8 0l-1-2H9L8 5m8 0H8"
        stroke="red"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Trash
