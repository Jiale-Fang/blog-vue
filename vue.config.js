module.exports = {
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'http://39.108.136.207:9001',
    //     changeOrigin: true,
    //     // secure: false,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   },
    //   '/extension': {
    //     target: 'http://1.117.157.53:9003',
    //     changeOrigin: true,
    //     // secure: false,
    //     pathRewrite: {
    //       '^/extension': ''
    //     }
    //   },
    //   '/music': {
    //     target: 'http://39.108.136.207:3000',
    //     changeOrigin: true,
    //     // secure: false,
    //     pathRewrite: {
    //       '^/music': ''
    //     }
    //   },
    //   '/dl': {
    //     target: 'http://1.117.157.53:9005',
    //     changeOrigin: true,
    //     // secure: false,
    //     pathRewrite: {
    //       '^/dl': ''
    //     }
    //   },
    //   '/ai': {
    //     target: 'http://1.117.157.53:9007',
    //     changeOrigin: true,
    //     // secure: false,
    //     pathRewrite: {
    //       '^/ai': ''
    //     }
    //   },
    //   '/serverApi': {
    //     target: 'http://39.108.136.207:9002/',
    //     changeOrigin: true,
    //     // secure: false,
    //     pathRewrite: {
    //       '^/serverApi': ''
    //     }
    //   }
    // },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9001',
        changeOrigin: true,
        // secure: false,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/serverApi': {
        target: 'http://127.0.0.1:9002/',
        changeOrigin: true,
        // secure: false,
        pathRewrite: {
          '^/serverApi': ''
        }
      },
      '/extension': {
        target: 'http://127.0.0.1:9003',
        changeOrigin: true,
        // secure: false,
        pathRewrite: {
          '^/extension': ''
        }
      },
      '/music': {
        target: 'http://39.108.136.207:3000',
        changeOrigin: true,
        // secure: false,
        pathRewrite: {
          '^/music': ''
        }
      },
      '/dl': {
        target: 'http://127.0.0.1:9005',
        changeOrigin: true,
        // secure: false,
        pathRewrite: {
          '^/dl': ''
        }
      },
      '/ai': {
        target: 'http://127.0.0.1:9007',
        changeOrigin: true,
        // secure: false,
        pathRewrite: {
          '^/ai': ''
        }
      }
    },
    before: app => {}
  },
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      // 默认是main.js要清空换成自己的
      config.entry('app').clear().add('./src/main-prod.js')

      config.set('externals', {
        // vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        echarts: 'echarts',
        nprogress: 'NProgress'
        // 'mavon-editor': 'mavon-editor' // 配置有问题，不知道如何修改
      })

      config.plugin('html').tap(args => {
        args[0].isProd = true
        args[0].title = 'Tcefrep的博客'
        return args
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      // 默认是main.js要清空换成自己的
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        args[0].title = 'Tcefrep的博客'
        return args
      })
    })
  }
}
