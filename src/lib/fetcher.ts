export const fetcher = async (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json());

