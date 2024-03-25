import gulpSass from 'gulp-sass'
import pkg from 'gulp'
import dartSass from 'sass'
import { delPath } from './utils/delPath.js'
import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { pkgPath } from './utils/path.js'

const { src, dest, series, parallel } = pkg

// 组件库根目录

async function cleanDist() {
  // 清空dist目录
  delPath(`${pkgPath}/dist`)
}

async function elpBuildModules() {
  build({
    plugins: [vue(), vueJsx()],
    build: {
      target: 'modules',
      // 打包文件目录
      outDir: 'es',
      // 压缩
      minify: false,
      // css分离
      cssCodeSplit: true,
      rollupOptions: {
        // 忽略打包vue文件
        external: ['vue', /\.scss/, /\.css/],
        output: [
          {
            format: 'es',
            // 不用打包成.es.js,这里我们想把它打包成.js
            entryFileNames: '[name].mjs',
            // 让打包目录和我们目录对应
            preserveModules: true,
            // 配置打包根目录
            dir: `${pkgPath}/dist/es`,
            preserveModulesRoot: 'packages',
          },
          {
            format: 'cjs',
            entryFileNames: '[name].js',
            // 让打包目录和我们目录对应
            preserveModules: true,
            // 配置打包根目录
            dir: `${pkgPath}/dist/lib`,
            preserveModulesRoot: 'packages',
          },
        ],
      },
      lib: {
        entry: `${pkgPath}/packages/components/index.js`,
      },
    },
  })
}

async function sassCompiler() {
  const sass = gulpSass(dartSass)
  return src(`${pkgPath}/packages/theme/*.scss`) // 入口
    .pipe(sass.sync()) // 编译
    .pipe(dest(`${pkgPath}/dist/theme`)) // 输出目录
}

export default series(cleanDist, parallel(elpBuildModules, sassCompiler))
