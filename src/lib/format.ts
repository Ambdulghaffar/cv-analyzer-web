const relativeTimeFormatter = new Intl.RelativeTimeFormat("fr", {
  numeric: "auto",
})

export function formatRelativeDate(dateString: string): string {
  const diffMs = new Date(dateString).getTime() - Date.now()
  const diffMinutes = Math.round(diffMs / (1000 * 60))

  if (Math.abs(diffMinutes) < 60) {
    return relativeTimeFormatter.format(diffMinutes, "minute")
  }

  const diffHours = Math.round(diffMinutes / 60)
  if (Math.abs(diffHours) < 24) {
    return relativeTimeFormatter.format(diffHours, "hour")
  }

  const diffDays = Math.round(diffHours / 24)
  return relativeTimeFormatter.format(diffDays, "day")
}
