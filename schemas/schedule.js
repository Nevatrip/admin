import Schedule from '../components/Schedule'

export default {
  name: 'schedule',
  title: 'Транспортное средство/площадка',
  type: 'array',
  of: [
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo'
    }
  },
  inputComponent: Schedule
}
