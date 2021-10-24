export const header = cookies =>
  join(cookies.map(cookie => split(cookie)[0]))

export const join = cookies => cookies.join('; ')

export const parse = cookie_string => {
  const [ name_value_pair, ...attribute_value_pairs ] = split(cookie_string)
  const [ name, value ] = name_value_pair.split('=')
  return attribute_value_pairs
    .reduce(
      (acc, pair) => {
        const [ key, value ] = pair.split('=')
        acc[key.toLowerCase()] = value === undefined ? true : value
        return acc
      },
      { name, value }
    )
}

export const split = cookie_string => cookie_string.split('; ')

export const stringify = ({ name, value, ...properties }) =>
  join(
    [
      [ name, value ],
      ...Object.entries(properties)
    ]
      .map(([ key, value ]) => value === true ? key : `${key}=${value}`)
  )
