const genKey = (array: any[]) =>
    array.length + 1 + (Math.random() + 1).toString(36).substring(7)

const genId = (string: string) =>
    string + (Math.random() + 1).toString(36).substring(7)

export { genId }
export default genKey
