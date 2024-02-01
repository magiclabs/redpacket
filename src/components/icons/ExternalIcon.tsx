import { forwardRef, type Ref, type SVGProps } from 'react'

export const ExternalIcon = forwardRef(
  (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
      width={17}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        d="M4.222 4.333a.611.611 0 0 1 .611-.61h2.445a.611.611 0 1 0 0-1.223H4.833A1.833 1.833 0 0 0 3 4.333v7.334A1.833 1.833 0 0 0 4.833 13.5h7.334A1.833 1.833 0 0 0 14 11.667V9.222a.611.611 0 0 0-1.222 0v2.445a.611.611 0 0 1-.611.61H4.833a.611.611 0 0 1-.61-.61V4.333ZM10.333 2.5a.611.611 0 0 0 0 1.222h1.58L8.069 7.568a.611.611 0 0 0 .864.864l3.846-3.846v1.58a.611.611 0 0 0 1.222 0V3.112a.611.611 0 0 0-.611-.611h-3.056Z"
        fill="#fff"
      />
    </svg>
  ),
)
