import { forwardRef, type Ref, type SVGProps } from 'react'

export const LogoutIcon = forwardRef(
  (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        d="M8.333 8.111 9.43 9.208l-2.007 2.014h7.91v1.556h-7.91l2.007 2.006-1.097 1.105L4.444 12m14-5.444h-6.222V5h6.222C19.3 5 20 5.7 20 6.556v10.888C20 18.3 19.3 19 18.444 19h-6.222v-1.556h6.222V6.556Z"
        fill="#fff"
      />
    </svg>
  ),
)
