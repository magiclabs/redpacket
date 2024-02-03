import Fireworks from '@fireworks-js/react'

export const RedPacketFireworks = () => {
  return (
    <Fireworks
      className="h-full w-full"
      options={{
        hue: {
          min: 0,
          max: 40,
        },
        acceleration: 1.05,
        brightness: {
          min: 50,
          max: 81,
        },
        decay: {
          min: 0.015,
          max: 0.033,
        },
        delay: {
          min: 30.0,
          max: 60.52,
        },
        explosion: 5,
        flickering: 30.05,
        intensity: 47.67,
        friction: 0.97,
        gravity: 1.94,
        opacity: 0.7,
        particles: 126,
        traceLength: 4.48,
        traceSpeed: 73,
        rocketsPoint: {
          min: 50,
          max: 60,
        },
        lineWidth: {
          explosion: {
            min: 1,
            max: 5,
          },
          trace: {
            min: 0,
            max: 0.1,
          },
        },
        lineStyle: 'round',
      }}
    />
  )
}
