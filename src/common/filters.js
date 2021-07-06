let date = (params) => {
  let year = params.slice(0, 4)
  let mouth = params.slice(4, 6)
  let day = params.slice(6, 8)
  let hour = params.slice(8, 10)
  let minute = params.slice(10, 12)
  return `${year}-${mouth}-${day} ${hour}:${minute}`
}


export {
  date
}