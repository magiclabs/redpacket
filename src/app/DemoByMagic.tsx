'use client'

import { track } from '@vercel/analytics/react'
import { useState } from 'react'

export function DemoByMagic() {
  const [isHover, setIsHover] = useState(false)

  return (
    <div className="bottom-0 z-10 mt-auto flex flex-col px-2">
      <span className="flex flex-row text-xs text-white">
        <span className="-mr-2 select-none pt-3.5 opacity-50">A demo by</span>
        <a
          href="https://magic.link/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF191E] hover:underline"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={() => {
            track(`A demo by Magic Clicked`)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="98"
            height="56"
            viewBox="0 0 98 56"
            fill="none"
          >
            <g filter={isHover ? 'url(#filter0_d_480_3252)' : ''}>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M73.7685 18.1958C73.7685 18.9005 73.2015 19.4718 72.5021 19.4718C71.8027 19.4718 71.2357 18.9005 71.2357 18.1958C71.2357 17.4911 71.8027 16.9199 72.5021 16.9199C73.2015 16.9199 73.7685 17.4911 73.7685 18.1958ZM44.7205 18.0363L42.1087 18.0363L42.1087 27.9122L44.1629 27.9122L44.1629 21.4601L44.246 21.4601L46.8382 27.8639L48.237 27.8639L50.8292 21.4842L50.9123 21.4842L50.9123 27.9122L52.9665 27.9122L52.9665 18.0363L50.3548 18.0363L47.5963 24.6716L47.4789 24.6716L44.7205 18.0363ZM55.1503 27.4975C55.6231 27.8672 56.2181 28.052 56.9354 28.052C57.4897 28.052 57.9479 27.9443 58.3098 27.7289C58.675 27.5103 58.9489 27.229 59.1315 26.885L59.1901 26.885L59.1901 27.9122L61.1661 27.9122L61.1661 22.9164C61.1661 22.328 61.0161 21.8507 60.7161 21.4842C60.4194 21.1145 60.0281 20.8428 59.5423 20.6692C59.0565 20.4956 58.5348 20.4088 57.9772 20.4088C57.0773 20.4088 56.342 20.6065 55.7714 21.0019C55.2041 21.3974 54.8487 21.9326 54.7052 22.6077L56.6322 22.762C56.7039 22.5145 56.8507 22.3104 57.0724 22.1496C57.2941 21.9889 57.5925 21.9085 57.9674 21.9085C58.3228 21.9085 58.5967 21.9921 58.7891 22.1593C58.9847 22.3264 59.0825 22.5627 59.0825 22.8681L59.0825 22.8971C59.0825 23.135 58.9423 23.2893 58.6619 23.36C58.3815 23.4307 57.9153 23.4982 57.2631 23.5625C56.7675 23.6075 56.3045 23.704 55.8741 23.8519C55.447 23.9965 55.1014 24.2264 54.8373 24.5414C54.5732 24.8565 54.4411 25.2905 54.4411 25.8434C54.4411 26.5764 54.6775 27.1278 55.1503 27.4975ZM58.657 26.2437C58.3636 26.5041 57.9886 26.6343 57.5321 26.6343C57.2126 26.6343 56.9485 26.5619 56.7398 26.4173C56.5344 26.2726 56.4317 26.0588 56.4317 25.7759C56.4317 25.4866 56.5425 25.2664 56.7643 25.1153C56.9892 24.9642 57.2843 24.8629 57.6495 24.8115C57.8028 24.789 57.9756 24.7633 58.168 24.7343C58.3636 24.7022 58.5462 24.6652 58.7157 24.6234C58.8885 24.5816 59.0157 24.5334 59.0972 24.4788L59.0972 25.2648C59.0972 25.6538 58.9505 25.9801 58.657 26.2437ZM66.167 30.7958C65.1562 30.7958 64.3623 30.5997 63.7851 30.2075C63.208 29.8153 62.8575 29.3395 62.7336 28.7802L64.6606 28.5246C64.7454 28.7239 64.91 28.9055 65.1546 29.0695C65.4024 29.2367 65.7562 29.3203 66.2159 29.3203C66.6691 29.3203 67.0425 29.2142 67.3359 29.002C67.6326 28.7898 67.781 28.441 67.781 27.9556L67.781 26.6005L67.693 26.6005C67.556 26.9059 67.3147 27.184 66.9691 27.4348C66.6235 27.6823 66.1507 27.8061 65.5507 27.8061C64.9867 27.8061 64.4731 27.6759 64.0101 27.4155C63.5504 27.1551 63.1836 26.7581 62.9097 26.2244C62.639 25.6907 62.5037 25.014 62.5037 24.1942C62.5037 23.352 62.6423 22.6511 62.9195 22.0918C63.1999 21.5324 63.5699 21.1129 64.0297 20.8332C64.4927 20.5503 64.9981 20.4088 65.5459 20.4088C65.9665 20.4088 66.3186 20.4795 66.6023 20.621C66.886 20.7592 67.1158 20.9312 67.2919 21.137C67.468 21.3427 67.6017 21.5469 67.693 21.7494L67.7712 21.7494L67.7712 20.5053L69.84 20.5053L69.84 27.9845C69.84 28.5985 69.6819 29.1145 69.3656 29.5324C69.0526 29.9504 68.6206 30.2654 68.0696 30.4776C67.5185 30.6898 66.8843 30.7958 66.167 30.7958ZM66.211 26.263C66.7131 26.263 67.1012 26.0797 67.375 25.7132C67.6522 25.3468 67.7908 24.8372 67.7908 24.1846C67.7908 23.5352 67.6538 23.016 67.3799 22.627C67.106 22.238 66.7164 22.0435 66.211 22.0435C65.6958 22.0435 65.3029 22.2429 65.0323 22.6415C64.7649 23.0401 64.6313 23.5545 64.6313 24.1846C64.6313 24.8243 64.7666 25.3307 65.0372 25.7036C65.3078 26.0765 65.6991 26.263 66.211 26.263ZM71.498 20.5053L71.498 27.9122L73.5816 27.9122L73.5816 20.5053L71.498 20.5053ZM78.6449 28.0568C77.8754 28.0568 77.2135 27.8961 76.6592 27.5746C76.1081 27.2499 75.6842 26.7998 75.3875 26.2244C75.0941 25.6489 74.9473 24.9867 74.9473 24.2376C74.9473 23.479 75.0957 22.8135 75.3924 22.2412C75.6924 21.6658 76.1179 21.2173 76.6689 20.8959C77.22 20.5712 77.8754 20.4088 78.6351 20.4088C79.2905 20.4088 79.8643 20.5262 80.3567 20.7608C80.8523 20.9955 81.2419 21.325 81.5256 21.7494C81.8125 22.1737 81.9707 22.672 82 23.2443L80.0339 23.2443C79.9784 22.8746 79.8317 22.5772 79.5937 22.3522C79.3589 22.1239 79.0508 22.0098 78.6693 22.0098C78.1867 22.0098 77.7987 22.2011 77.5053 22.5836C77.2118 22.9662 77.0651 23.5079 77.0651 24.2087C77.0651 24.916 77.2102 25.4641 77.5004 25.8531C77.7938 26.2389 78.1835 26.4317 78.6693 26.4317C79.028 26.4317 79.3296 26.3257 79.5741 26.1135C79.8187 25.8981 79.9719 25.5927 80.0339 25.1973L82 25.1973C81.9674 25.7631 81.8109 26.2614 81.5305 26.6921C81.2533 27.1229 80.8702 27.4589 80.3811 27.7C79.892 27.9379 79.3133 28.0568 78.6449 28.0568ZM29.276 14.5302C28.0466 13.4533 26.9097 12.272 25.8789 11C24.848 12.2721 23.711 13.4535 22.4815 14.5304C23.3007 17.2076 23.7417 20.0519 23.7417 23C23.7417 25.9481 23.3007 28.7924 22.4814 31.4696C23.711 32.5465 24.8479 33.7279 25.8788 35C26.9096 33.728 28.0466 32.5466 29.276 31.4698C28.4568 28.7925 28.0157 25.9481 28.0157 23C28.0157 20.0518 28.4568 17.2074 29.276 14.5302ZM16.0004 27.1946C17.4489 27.8874 18.8301 28.6997 20.1316 29.6188C20.6293 27.494 20.8926 25.278 20.8926 23C20.8926 20.722 20.6293 18.506 20.1316 16.3812C18.8301 17.3003 17.4489 18.1126 16.0004 18.8054C16.4021 20.1322 16.6183 21.5407 16.6183 23C16.6183 24.4593 16.4021 25.8678 16.0004 27.1946ZM31.6261 29.6187C31.1285 27.4939 30.8652 25.2779 30.8652 23C30.8652 20.722 31.1285 18.506 31.6261 16.3812C32.9276 17.3003 34.3088 18.1125 35.7572 18.8053C35.3554 20.1321 35.1392 21.5406 35.1392 23C35.1392 24.4593 35.3554 25.8678 35.7572 27.1947C34.3088 27.8874 32.9276 28.6996 31.6261 29.6187Z"
                style={{
                  fill: isHover ? '#FF7777' : 'url(#gentle)',
                }}
              />
            </g>
            <defs>
              <filter
                id="filter0_d_480_3252"
                x="0.000244141"
                y="0"
                width="97.9998"
                height="56"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="5" />
                <feGaussianBlur stdDeviation="8" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 0.440653 0 0 0 0 0.440653 0 0 0 0.57 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_480_3252"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_480_3252"
                  result="shape"
                />
              </filter>
              <linearGradient id="gentle" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="20.06%" stop-color="#FFA9A9" />
                <stop offset="93.04%" stop-color="#FFF" />
              </linearGradient>
            </defs>
          </svg>
        </a>
      </span>
    </div>
  )
}
