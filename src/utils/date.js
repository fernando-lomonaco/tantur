import { format, parseISO, isAfter, isEqual } from 'date-fns'

const formatDateAndHour = 'dd/MM/yyyy HH:mm:ss'

export function formatBrlDate (value) {
  const dateFormatter = parseToDateTime(value)
  return format(dateFormatter, formatDateAndHour)
}

export function compareDate (firstValue, lastValue) {
  const firstDate = parseToDateTime(firstValue)
  const secondDate = parseToDateTime(lastValue)

  if (isAfter(secondDate, firstDate)) {
    return format(secondDate, formatDateAndHour)
  } else if (isEqual(secondDate, firstDate)) {
    return format(firstDate, formatDateAndHour)
  }
  return format(secondDate, formatDateAndHour)
}

function parseToDateTime (date) {
  return parseISO(date)
}
