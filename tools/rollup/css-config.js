import postcss from 'rollup-plugin-postcss';

export const plugins = [
  postcss({
    extract: false,
    modules: false,
    minimize: true,
    extensions: ['scss']
  })
];
