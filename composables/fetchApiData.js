export const useFetchApi = (request, opts) => {
    const config = useRuntimeConfig();

    return useFetch(`${config.public.apiBaseUrl}${request}`, opts);
}

