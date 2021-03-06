import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const extensions = [ '.cjs', '.js' ]

export default {
	input: 'src/index.js',
	output: [{
		format: 'esm',
		dir: path.dirname(pkg.module),
		preserveModules: true,
		sourcemap: false
	}, {
		format: 'cjs',
		file: pkg.main,
		sourcemap: false
	}, {
		name: pkg['umd:name'] || pkg.name,
		format: 'umd',
		file: pkg.unpkg,
		sourcemap: false,
		plugins: [
			terser()
		]
	}],
	external: [
		...require('module').builtinModules,
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {})
	],
	plugins: [
		resolve({ extensions })
	]
}
