import typescript from 'rollup-plugin-typescript2';
import { join } from 'path';

export default {
  input: 'src/app.ts',
  output: {
    dir: join(__dirname, '..', 'build', 'server'),
    format: 'cjs',
  },
  plugins: [typescript()],
};
