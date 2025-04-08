export default function unsupportedValuesMessageFormatter(
  summary: string,
  erroneousItem: [string, unknown],
  failurePosition: number,
  failures: [string, unknown][],
): string {
  const [name] = erroneousItem;
  if (failurePosition === 0) {
    return name;
  }
  if (failurePosition === failures.length - 1) {
    return `${summary} and '${name}' has unsupported value`;
  }
  return `${summary}, '${name}'`;
}
