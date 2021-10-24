import rollupConfig from './rollup.config.js'

export default {
	...rollupConfig,
	input: '-',
	output: {
		name: 'tests',
		format: 'iife',
		sourcemap: 'inline'
	},
	treeshake: false
}
