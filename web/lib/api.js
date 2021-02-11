export function getStrapiURL(path = "") {
    return `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/"
    }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl);
    return await response.json();
}

export async function postAPI(path,data){
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl,{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(data)
    })
    return await response.text();
}