import { forwardRef, type Ref, type SVGProps } from 'react'

export const AlertIcon = forwardRef(
  (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
      width={40}
      height={41}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        d="M16.098 9.32 3.585 32.26c-1.615 2.962.528 6.573 3.902 6.573h25.026c3.374 0 5.517-3.61 3.902-6.572L23.902 9.32c-1.685-3.088-6.12-3.088-7.804 0Z"
        fill="url(#a)"
      />
      <path
        d="M20 18.417v6.666"
        stroke="url(#b)"
        strokeWidth={4.167}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.991 31.125h.016"
        stroke="#FFCDCF"
        strokeWidth={4.167}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="a"
          x1={20}
          y1={2.167}
          x2={20}
          y2={38.833}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF191E" />
          <stop offset={1} stopColor="#8F0003" />
        </linearGradient>
        <linearGradient
          id="b"
          x1={20.5}
          y1={18.417}
          x2={20.5}
          y2={25.083}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#FFCDCF" />
        </linearGradient>
      </defs>
    </svg>
  ),
)
