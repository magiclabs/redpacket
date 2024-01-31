import { forwardRef, type Ref, type SVGProps } from 'react'

export const CopyIcon = forwardRef(
  (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <g
        stroke="#fff"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.2 5.6v9.6a1.6 1.6 0 0 0 1.6 1.6h6.4a1.6 1.6 0 0 0 1.6-1.6V8.194a1.6 1.6 0 0 0-.481-1.144l-2.652-2.594A1.6 1.6 0 0 0 14.549 4H10.8a1.6 1.6 0 0 0-1.6 1.6Z" />
        <path d="M15.6 16.8v1.6A1.6 1.6 0 0 1 14 20H7.6A1.6 1.6 0 0 1 6 18.4V9.6A1.6 1.6 0 0 1 7.6 8h1.6" />
      </g>
    </svg>
  ),
)
