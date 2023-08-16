export function escapeClassName(value: string) {
  if (
    value.includes(":") ||
    value.includes("[") ||
    value.includes("]") ||
    value.includes("_") ||
    value.includes("/") ||
    value.includes("$")
  ) {
    return value.replace(/[_:\/\[\]$]/g, "\\$&");
  }
  return value;
}
