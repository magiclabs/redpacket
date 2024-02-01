import { forwardRef, type Ref, type SVGProps } from 'react'

export const Loader = forwardRef(
  (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      ref={ref}
      {...props}
    >
      <path
        fill="currentColor"
        d="M2 12a10.94 10.94 0 0 1 3-7.35c-.21-.19-.42-.36-.62-.55A11 11 0 0 0 12 23c.34 0 .67 0 1-.05C6 23 2 17.74 2 12Z"
      >
        <animateTransform
          attributeName="transform"
          dur="0.6s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        />
      </path>
    </svg>
  ),
)
