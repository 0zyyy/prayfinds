// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'PrayFinds',
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            ],
            link: [
                {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap"
                }],
        },
    },
    runtimeConfig: {
      public: {
          apiBaseUrl: process.env.API_BASE_URL
      }
    },
    devtools: {enabled: true},
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        'nuxt-jwt-auth'
    ],
    ssr: true,
    nuxtJwtAuth: {
        baseUrl: process.env.API_BASE_URL, // URL of your backend
        endpoints: {
            login: '/login', // Where to request login (POST)
            logout: '/logout', // Where to request logout (POST)
            user: '/user', // Where to request user data (GET)
            signup: '/register' // Where to request signup (POST)
        },
        redirects: {
            home: '/', // Where to redirect after successfull login and logout
            login: '/login', // Where to redirect if user is not logged in and accesses a logged-only route
            logout: '/logout' // Where to redirect if user is logged in and accesses a guest-only route
        }
    }
})
