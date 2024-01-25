export const useFetchApiWithAuth = async (request, opts) => {
    const {$jwtAuth} = useNuxtApp();
    const config = useRuntimeConfig();

    try {
        await $jwtAuth.fetch(`${config.public.apiBaseUrl}${request}`, {
            ...opts,
            async onResponseError({request, response, options}) {
                // Log error
                if (response.status === 401) {
                    $jwtAuth.logout();
                    alert("Sesi anda habis. silahkan masuk kembali");
                } else {
                    console.error('onResponseError', response);
                }
            },
        });

    } catch (e) {
        console.log(e);
    }
}
