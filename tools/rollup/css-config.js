import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

export const plugins = [
  postcss({
    extract: false,
    modules: false,
    minimize: true,
    extensions: ['scss'],
    plugins: [autoprefixer()]
  })
];
