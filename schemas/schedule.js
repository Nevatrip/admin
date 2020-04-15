import Schedule from '../components/Schedule/Schedule'

export default {
  name: 'schedule',
  title: 'Расписание',
  type: 'array',
  of: [
    { type: 'event' }
  ],
  inputComponent: Schedule
}
