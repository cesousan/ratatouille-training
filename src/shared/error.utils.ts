export const extractErrorMsg = (err: unknown): string => {
  if (err instanceof Error) {
    return err.message
  }
  return 'Unknown error'
}
