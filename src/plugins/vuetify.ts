/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import DateFnsAdapter from '@date-io/date-fns'
import { ko } from 'date-fns/locale'

const dateFnsAdapter = new DateFnsAdapter({ locale: ko })

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  date: {
    adapter: dateFnsAdapter
  },
})
