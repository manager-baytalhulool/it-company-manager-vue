import type { Chart } from 'chart.js'

export type ThemeColors = {
  primary: string
  secondary: string
  success: string
  info: string
  warning: string
  danger: string
  white: string
  'gray-100': string
  'gray-200': string
  'gray-300': string
  'gray-400': string
  'gray-500': string
  'gray-600': string
  'gray-700': string
  'gray-800': string
  'gray-900': string
  black: string
}

declare global {
  interface Window {
    Chart: typeof Chart
    theme: ThemeColors
  }
}

export {}
