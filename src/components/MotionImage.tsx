'use client'

import { motion, type MotionProps } from 'framer-motion'
import Image, { type ImageProps } from 'next/image'

export const MotionImage = motion(Image)

export type MotionImageProps = Omit<ImageProps, 'src' | 'alt'> & MotionProps
