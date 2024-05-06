import { createAnimations } from '@tamagui/animations-css'

export const animations = createAnimations({
  lazy: 'ease-in 500ms',
  quick: 'ease-in 100ms',
  bouncy: 'cubic-bezier(0.175, 0.885, 0.32, 1.275) 500ms',
})
//
// import { createAnimations } from '@tamagui/animations-react-native'
// export const animations = createAnimations({
//   bouncy: {
//     damping: 9,
//     mass: 0.9,
//     stiffness: 150,
//   },
//   lazy: {
//     damping: 18,
//     stiffness: 50,
//   },
// })
