import { format, getTime, formatDistanceToNow } from 'date-fns'

type InputValue = Date | string | number | null

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd/MM/yyyy'

  return date ? format(new Date(date), fm) : ''
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd/MM/yyyy p'

  return date ? format(new Date(date), fm) : ''
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : ''
}

export function fToNow(date: InputValue) {
  return date ? formatDistanceToNow(new Date(date), { addSuffix: true, }) : ''
}

export function fUnixToDate(unixTimestamp: number) {
  return new Date(unixTimestamp).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
}

export function fUnixToDateMilisecond(unixTimestamp: number) {
  return new Date(unixTimestamp * 1000).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
}