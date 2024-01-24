export const useFetchApiWithAuth = async (request, opts) => {
    const { $jwtAuth } = useNuxtApp();
    const config = useRuntimeConfig();

    const { data: response, error } = await $jwtAuth.fetch(`${config.public.apiBaseUrl}${request}`, {
        ...opts,
        async onResponseError({ request, response, options }) {
            // Log error
            if (response.status === 401) {
                $jwtAuth.logout();
                alert("Sesi anda habis. silahkan masuk kembali");
            }else {
                console.error('onResponseError', response);
            }
        },
        async onResponse({ request, response, options }) {
            // Log response
            if (response.status === 200){
                window.location.href = "/manage";
                alert(response._data.message);
            }
        }
    });
    if( error.data.statusCode === 401 ) {
        $jwtAuth.logout();
    }
    return { response, error };
}
