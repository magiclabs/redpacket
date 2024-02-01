import { forwardRef, type Ref, type SVGProps } from 'react'

export const CheckIcon = forwardRef(
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
        d="M17.912 7.341a1.25 1.25 0 0 1 .05 1.767l-7.084 7.501a1.25 1.25 0 0 1-1.792.025l-3.75-3.75a1.25 1.25 0 0 1 1.766-1.767l2.842 2.84 6.201-6.566a1.25 1.25 0 0 1 1.767-.05Z"
        fill="#fff"
      />
    </svg>
  ),
)
