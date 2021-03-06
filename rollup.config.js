import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import {terser} from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';

const pkg = require('./package');

export default {
    input: pkg.main || 'lib/index.js',
    output: [
        {
            file: `dist/${pkg.name}.umd.js`,
            name: 'mixme',
            format: 'umd'
        },
        {
            file: `dist/${pkg.name}.cjs.js`,
            format: 'cjs'
        },
        {
            file: `dist/${pkg.name}.esm.js`,
            format: 'esm'
        }
    ],
    plugins: [
        typescript({
            objectHashIgnoreUnknownHack: true
        }),
        commonjs(),
        resolve(),
        terser({
            // verbosity: 3,
            module: true
        }),
        {
            name: 'visualizer',
            ...visualizer({
                filename: "build/build-stats.html",
                title: "Build Stats"
            })
        }
    ]
}
