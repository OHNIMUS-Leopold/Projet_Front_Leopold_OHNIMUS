export default async function (endpoint: string, {method, body}: { 
    method: 'GET'|'POST'|'DELETE'|'PUT', 
    body?: {[key: string]:string} 
}) {

    try {

        const config = useRuntimeConfig()

        const response = await fetch(`${config.public.apiTrackingBaseUrl}${endpoint}`, {
            method,
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${useCookie('api_tracking').value}`
            },
            ...body && {
                body: JSON.stringify(body)
            }
        })

        if (!response.ok) throw new Error('Une erreur est survenue')

        await response.json()

    } catch (err) {
        console.error(err)
    }

    // return ...
}