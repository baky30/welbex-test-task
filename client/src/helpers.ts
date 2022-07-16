export const modifyDate = (date: string) => {
  return new Date(+date).toLocaleDateString('en-GB')
}
