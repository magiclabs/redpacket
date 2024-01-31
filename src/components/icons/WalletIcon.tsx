import { forwardRef, type Ref, type SVGProps } from 'react'

export const WalletIcon = forwardRef(
  (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <g fill="#fff">
        <path d="M15.445 12h1.778v3.556h-1.778V12Z" />
        <path d="M19 7.556V5.778A1.78 1.78 0 0 0 17.222 4H5.667A2.67 2.67 0 0 0 3 6.667v10.666C3 19.29 4.595 20 5.667 20H19a1.78 1.78 0 0 0 1.778-1.778V9.333A1.78 1.78 0 0 0 19 7.556ZM5.667 5.778h11.555v1.778H5.667a.89.89 0 0 1 0-1.778ZM19 18.222H5.677c-.41-.01-.9-.173-.9-.889V9.17c.28.1.576.164.89.164H19v8.89Z" />
      </g>
    </svg>
  ),
)
