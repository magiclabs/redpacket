'use client'

import { RedLantern } from 'app/claim/[key]/over/RedLantern'
import { Container } from 'components/ui/container'
import { MotionHeadline } from 'components/ui/typography'
import { motion } from 'framer-motion'
import { ANIMATION_INTERVAL } from 'lib/constants'

export default function Dead() {
  return (
    <>
      <Container>
        <RedLantern />

        <MotionHeadline
          className="mt-2.5 sm:-mt-[14px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: ANIMATION_INTERVAL * 1 }}
        >
          The festivities are over
        </MotionHeadline>

        <motion.div
          className="mt-5 text-balance text-center text-lg font-normal leading-normal tracking-[-0.408px] text-[#ffffffcc]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: ANIMATION_INTERVAL * 2 }}
        >
          Magic’s Lunar New Year celebration has ended.
        </motion.div>

        <motion.div
          className="mt-5 text-balance text-center text-lg font-normal leading-normal tracking-[-0.408px] text-[#ffffffcc]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: ANIMATION_INTERVAL * 2 }}
        >
          Head to the{' '}
          <a
            href="https://magic.link/blogs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white hover:underline"
          >
            Magic blog
          </a>{' '}
          for a full recap of the Lunar New Year experience.
        </motion.div>
      </Container>
    </>
  )
}
