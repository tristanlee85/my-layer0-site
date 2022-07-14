import { Router } from '@layer0/core/router'
import { starterRoutes } from '@layer0/starter'
import { CACHE_ASSETS } from './cache'
import routeHandler from './route-handler'

export default new Router()
  .use(starterRoutes)
  .match(
    {
      response: { statusCode: /30/ },
    },
    ({ cache }) => {
      cache({ edge: false })
    }
  )
  // // Homepage
  .match('/', routeHandler)
  // Blog Page
  .match('/blog/:path*', routeHandler)
  // // WP Assets link
  // .match('/wp-json/:path*', ({ cache, proxy, setResponseHeader, removeUpstreamResponseHeader }) => {
  //   setResponseHeader('cache-control', 'public, max-age=86400')
  //   removeUpstreamResponseHeader('set-cookie')
  //   cache(CACHE_ASSETS)
  //   proxy('origin')
  // })
  // .match('/wp-includes/:path*', ({ cache, proxy, setResponseHeader, removeUpstreamResponseHeader }) => {
  //   setResponseHeader('cache-control', 'public, max-age=86400')
  //   removeUpstreamResponseHeader('set-cookie')
  //   cache(CACHE_ASSETS)
  //   proxy('origin')
  // })
  // .match('/wp-content/:path*', ({ cache, proxy, setResponseHeader, removeUpstreamResponseHeader }) => {
  //   setResponseHeader('cache-control', 'public, max-age=86400')
  //   removeUpstreamResponseHeader('set-cookie')
  //   cache(CACHE_ASSETS)
  //   proxy('origin')
  // })

  // example route for cacheable assets:
  // .match('/wp-content/uploads/:path*', ({ cache, proxy }) => {
  //   cache(CACHE_ASSETS)
  //   return proxy('origin')
  // })

  // useful configs for generated outputs
  .get('/service-worker.js', ({ cache, serviceWorker }) => {
    cache(CACHE_ASSETS)
    serviceWorker('dist/service-worker.js')
  })
  // .match('/main.js', ({ serveStatic, cache }) => {
  //   cache(CACHE_ASSETS)
  //   return serveStatic('dist/browser.js')
  // })

  // fallback route for all other requests:
  .fallback(({ proxy }) => {
    proxy('origin')
  })

//////////////////////////////////////////////////////////
////////// Static Prerendering examples       ////////////
//////////////////////////////////////////////////////////
//
// More details at:
// https://developer.moovweb.com/guides/static_prerendering
//
// append this to the router call above before .fallback to enable
// .prerender([
//   // HTML pages
//   { path: '/' },
//   { path: '/categories/mens' },
//
//   // API responses
//   { path: '/api/index.json' },
//   { path: '/api/categories/mens.json' },
// ])
