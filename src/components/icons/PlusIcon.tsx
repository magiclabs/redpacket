import { forwardRef, type Ref, type SVGProps } from 'react'

export const PlusIcon = forwardRef(
  (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
      width={20}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2.188a.937.937 0 0 1 .938.937v5.938h5.937a.937.937 0 0 1 0 1.874h-5.938v5.938a.938.938 0 0 1-1.874 0v-5.938H3.125a.938.938 0 0 1 0-1.874h5.938V3.125A.937.937 0 0 1 10 2.187Z"
        fill="#fff"
      />
    </svg>
  ),
)
