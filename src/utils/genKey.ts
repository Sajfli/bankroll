const genKey = (array: any[]) =>
    array.length + 1 + (Math.random() + 1).toString(36).substring(7)

export default genKey
