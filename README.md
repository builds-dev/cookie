# cookie

```node
import * as cookie from '@holographio/cookie'
```

<!--js
import * as cookie from './dist/esm/index.js'
-->

### `header (cookie_strings)`

Takes an array of cookie strings and returns a string suitable to use as the value of the `Cookie` header.

```js
cookie.header([
	'foo=bar; Secure; HttpOnly',
	'baz=qux; Secure'
])
// => 'foo=bar; baz=qux'
```

### `join (cookie_pairs)`

Joins an array of cookie pairs into a string.

```js
cookie.join([
	'foo=bar',
	'Expires=Thu, 21 Oct 2021 07:28:00 GMT',
	'Secure',
	'HttpOnly'
])
// => 'foo=bar; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly'
```

### `parse (cookie)`

Takes a cookie string and parses it into an object.

```js
cookie.parse('foo=bar; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly')
/*
=> {
	name: 'foo',
	value: 'bar',
	expires: 'Thu, 21 Oct 2021 07:28:00 GMT',
	secure: true,
	httponly: true
}
*/
```

### `split (cookie_string)`

Split a cookie string into an array of cookie pairs.

```js
cookie.split('foo=bar; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly')
/*
=> [
	'foo=bar',
	'Expires=Thu, 21 Oct 2021 07:28:00 GMT',
	'Secure',
	'HttpOnly'
]
*/
```

### `stringify (object)`

Takes a parsed cookie object and returns a cookie string.

```js
cookie.stringify({
	name: 'foo',
	value: 'bar',
	expires: 'Thu, 21 Oct 2021 07:28:00 GMT',
	secure: true,
	httponly: true
})
// => 'foo=bar; expires=Thu, 21 Oct 2021 07:28:00 GMT; secure; httponly'
```
