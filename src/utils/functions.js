export const twoDigits = input => {
  return input.toString().length === 1 ? '0' + input : input
}
export const formatNumber = (value, after = '') => {
  let nStr = String(Math.round(value, 2))
  nStr += ''
  let x = nStr.split('.')
  let x1 = x[0]
  let x2 = x.length > 1 ? '.' + x[1] : ''
  var rgx = /(\d+)(\d{3})/
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ' ' + '$2')
  }
  return x1 + x2 + after
}
export const shorten = (str, maxLenChars, maxLenWords = 0, separator = ' ') => {
  //first reduce to amout of words
  if (str !== null) {
    if (maxLenWords > 0) {
      str = str
        .split(/\s+/)
        .slice(0, maxLenWords)
        .join(separator)
    }
    //then cut to max length in charactes
    if (str.length <= maxLenChars) {
      return str
    } else {
      return str.substr(0, str.lastIndexOf(separator, maxLenChars)) + '...'
    }
  }
}

export const replaceStrings = (str, findArray, replaceArray) => {
  var i,
    regex = [],
    map = {}
  for (i = 0; i < findArray.length; i++) {
    regex.push(findArray[i].replace('[-[]{}()*+?.\\^$|#,]', '\\$0'))
    map[findArray[i]] = replaceArray[i]
  }
  regex = regex.join('|')
  str = str.replace(new RegExp(regex, 'g'), function(matched) {
    return map[matched]
  })
  return str
}
export const myDateFormat = inputDate => {
  const finishDate = new Date(inputDate)
  return (
    finishDate.getDate() +
    '.' +
    (finishDate.getMonth() + 1) +
    '.' +
    finishDate.getFullYear() +
    '  ' +
    finishDate.getHours() +
    ':' +
    twoDigits(finishDate.getMinutes())
  )
}
