
        import { ImageProvider } from '@nuxt/image'
        declare module '@nuxt/image' {
          interface ProviderDefaults {
            provider: "ipx"
          }
          interface ConfiguredImageProviders {
            "ipx": ImageProviders["ipx"]
          }
          interface ImageProviders {
            "aliyun": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/aliyun').default> extends ImageProvider<infer Options> ? Options : unknown 
            "awsAmplify": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/awsAmplify').default> extends ImageProvider<infer Options> ? Options : unknown 
            "bunny": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/bunny').default> extends ImageProvider<infer Options> ? Options : unknown 
            "caisy": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/caisy').default> extends ImageProvider<infer Options> ? Options : unknown 
            "cloudflare": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/cloudflare').default> extends ImageProvider<infer Options> ? Options : unknown 
            "cloudimage": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/cloudimage').default> extends ImageProvider<infer Options> ? Options : unknown 
            "cloudinary": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/cloudinary').default> extends ImageProvider<infer Options> ? Options : unknown 
            "contentful": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/contentful').default> extends ImageProvider<infer Options> ? Options : unknown 
            "directus": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/directus').default> extends ImageProvider<infer Options> ? Options : unknown 
            "fastly": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/fastly').default> extends ImageProvider<infer Options> ? Options : unknown 
            "filerobot": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/filerobot').default> extends ImageProvider<infer Options> ? Options : unknown 
            "github": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/github').default> extends ImageProvider<infer Options> ? Options : unknown 
            "glide": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/glide').default> extends ImageProvider<infer Options> ? Options : unknown 
            "gumlet": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/gumlet').default> extends ImageProvider<infer Options> ? Options : unknown 
            "hygraph": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/hygraph').default> extends ImageProvider<infer Options> ? Options : unknown 
            "imageengine": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/imageengine').default> extends ImageProvider<infer Options> ? Options : unknown 
            "imagekit": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/imagekit').default> extends ImageProvider<infer Options> ? Options : unknown 
            "imgix": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/imgix').default> extends ImageProvider<infer Options> ? Options : unknown 
            "ipx": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/ipx').default> extends ImageProvider<infer Options> ? Options : unknown 
            "ipxStatic": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/ipxStatic').default> extends ImageProvider<infer Options> ? Options : unknown 
            "netlify": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/netlify').default> extends ImageProvider<infer Options> ? Options : unknown 
            "netlifyLargeMedia": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/netlifyLargeMedia').default> extends ImageProvider<infer Options> ? Options : unknown 
            "netlifyImageCdn": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/netlifyImageCdn').default> extends ImageProvider<infer Options> ? Options : unknown 
            "prepr": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/prepr').default> extends ImageProvider<infer Options> ? Options : unknown 
            "none": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/none').default> extends ImageProvider<infer Options> ? Options : unknown 
            "prismic": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/prismic').default> extends ImageProvider<infer Options> ? Options : unknown 
            "sanity": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/sanity').default> extends ImageProvider<infer Options> ? Options : unknown 
            "shopify": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/shopify').default> extends ImageProvider<infer Options> ? Options : unknown 
            "storyblok": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/storyblok').default> extends ImageProvider<infer Options> ? Options : unknown 
            "strapi": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/strapi').default> extends ImageProvider<infer Options> ? Options : unknown 
            "strapi5": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/strapi5').default> extends ImageProvider<infer Options> ? Options : unknown 
            "twicpics": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/twicpics').default> extends ImageProvider<infer Options> ? Options : unknown 
            "unsplash": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/unsplash').default> extends ImageProvider<infer Options> ? Options : unknown 
            "uploadcare": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/uploadcare').default> extends ImageProvider<infer Options> ? Options : unknown 
            "vercel": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/vercel').default> extends ImageProvider<infer Options> ? Options : unknown 
            "wagtail": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/wagtail').default> extends ImageProvider<infer Options> ? Options : unknown 
            "weserv": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/weserv').default> extends ImageProvider<infer Options> ? Options : unknown 
            "sirv": ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/providers/sirv').default> extends ImageProvider<infer Options> ? Options : unknown 
          }
        }
        export {}
        