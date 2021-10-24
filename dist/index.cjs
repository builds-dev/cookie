'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const header = cookies =>
  join(cookies.map(cookie => split(cookie)[0]));

const join = cookies => cookies.join(`; `);

const parse = cookie_string => {
  const [ name_value_pair, ...attribute_value_pairs ] = split(cookie_string);
  const [ name, value ] = name_value_pair.split(`=`);
  return attribute_value_pairs
    .reduce(
      (acc, pair) => {
        const [ key, value ] = pair.split(`=`);
        acc[key.toLowerCase()] = value === undefined ? true : value;
        return acc
      },
      { name, value }
    )
};

const serialize = ({ name, value }) => `${name}=${value}`;

const split = cookie_string => cookie_string.split(`; `);

const stringify = ({ name, value, ...properties }) =>
  join(
    [
      [ name, value ],
      ...Object.entries(properties)
    ]
      .map(([ k, v ]) => v === true ? k : `${k}=${v}`)
  );

exports.header = header;
exports.join = join;
exports.parse = parse;
exports.serialize = serialize;
exports.split = split;
exports.stringify = stringify;
