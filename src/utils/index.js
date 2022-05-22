const convertHourinUtcTime = (hour) => {
  const timeStamp = new Date()
  return Math.floor(new Date(Date.UTC(timeStamp.getFullYear(), timeStamp.getMonth(), timeStamp.getDate(), hour)).getTime() / 1000)
}

module.exports = { convertHourinUtcTime }
