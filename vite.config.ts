import { defineConfig, loadEnv } from 'vite';
import { createViteProxy, getRootPath, getSrcPath, setupVitePlugins, viteDefine } from './build';
import { getServiceEnvConfig } from './.env-config';
const Timestamp = new Date().getTime();//随机时间戳
export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as ImportMetaEnv;

  const rootPath = getRootPath();
  const srcPath = getSrcPath();

  const isOpenProxy = viteEnv.VITE_HTTP_PROXY === 'Y';
  const envConfig = getServiceEnvConfig(viteEnv);

  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath,
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    define: viteDefine,
    plugins: setupVitePlugins(viteEnv),
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scss/global.scss" as *;`
        }
      }
    },
    server: {
      host: '0.0.0.0',
      open: true,
      proxy: createViteProxy(isOpenProxy, envConfig)
    },
    optimizeDeps: {
      include: [
        '@antv/data-set',
        '@antv/g2',
        '@better-scroll/core',
        'echarts',
        'swiper',
        'swiper/vue',
        'vditor',
				'wangeditor',
        'xgplayer'
      ]
    },
    build: {
      reportCompressedSize: false,
      sourcemap: false,
      commonjsOptions: {
        ignoreTryCatch: false
      },
			target:['edge90','chrome90','firefox90','safari15'],
			rollupOptions: {
				output: {
					chunkFileNames: `static/js/[name].[hash]${Timestamp}.js`,
					entryFileNames: `static/js/[name].[hash]${Timestamp}.js`,
					assetFileNames: `static/[ext]/[name].[hash]${Timestamp}.[ext]`,
					compact:true,
					manualChunks(id) {
						if (id.includes('node_modules')) {
							return id.toString().split('node_modules/')[1].split('/')[0].toString();
						}
					}
				},
			},
			// 打包后取消console
			minify: "terser",
			terserOptions: {
					 compress: {
							drop_console: true,
							drop_debugger: true
					 }
			}
		// 打包后取消console

    }
  };
});
