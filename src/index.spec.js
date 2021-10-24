import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import * as cookie from './index.js'

const test = suite('cookie')

const cookies = [
  `lang=en; path=/; expires=Saturday, 07-Mar-2020 16:54:52 GMT; domain=.profabelectronics.com`,
  `RadPCBMfr=Profab; secure; path=/`,
]

test(`cookie.parse`, () => {
  assert.equal(
    cookies.map(cookie.parse),
    [
      {
        name: `lang`,
        value: `en`,
        path: `/`,
        expires: `Saturday, 07-Mar-2020 16:54:52 GMT`,
        domain: `.profabelectronics.com`,
      },
      { name: `RadPCBMfr`, value: `Profab`, secure: true, path: `/` },
    ]
  )
  assert.equal(
    cookie.parse(`foo=bar`),
    { name: `foo`, value: `bar` }
  )
})

test(`cookie.split`, () => {
  assert.equal(
    cookie.split(`lang=en; RadPCBMfr=Profab`),
    [ `lang=en`, `RadPCBMfr=Profab` ]
  )
})

test(`cookie.join`, () => {
  assert.equal(
    cookie.join([  `lang=en`, `RadPCBMfr=Profab` ]),
    `lang=en; RadPCBMfr=Profab`
  )
})

test(`cookie.stringify`, () => {
  assert.equal(
    [
      {
        name: `lang`,
        value: `en`,
        path: `/`,
        expires: `Saturday, 07-Mar-2020 16:54:52 GMT`,
        domain: `.profabelectronics.com`,
      },
      { name: `RadPCBMfr`, value: `Profab`, secure: true, path: `/` },
    ].map(cookie.stringify),
    cookies
  )
})

test(`cookie.header`, () => {
  ;[
    {
      input: [
        `lang=en; path=/; expires=Saturday, 07-Mar-2020 16:54:52 GMT; domain=.profabelectronics.com`,
        `RadPCBMfr=Profab; secure; path=/`,
      ],
      output: `lang=en; RadPCBMfr=Profab`,
    },
    {
      input: [ `lang=en`, `RadPCBMfr=Profab` ],
      output: `lang=en; RadPCBMfr=Profab`,
    }
  ].forEach(({ input, output }) => assert.equal(cookie.header(input), output))
})

test(`split and parse string of cookies`, () => {
  assert.equal(
    cookie.split(`foo=bar; baz=qux`).map(cookie.parse),
    [
      { name: `foo`, value: `bar` },
      { name: `baz`, value: `qux` },
    ]
  )
})

test(`parse/stringify isomorphism`, () => {
  assert.equal(
    cookies.map((string) => cookie.stringify(cookie.parse(string))),
    cookies
  )
})

test(`split/join isomorphism`, () => {
  const cookies = `foo=bar; baz=qux`
  assert.equal(
    cookie.join(cookie.split(cookies)),
    cookies
  )
})

test(`split/parse/stringify/join isomorphism`, () => {
  const cookies = `foo=bar; baz=qux`
  assert.equal(
    cookie.join(
      cookie
        .split(cookies)
        .map(cookie.parse)
        .map(cookie.stringify)
    ),
    cookies
  )
})

test.run()
