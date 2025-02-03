import fetch from 'node-fetch';

export async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/google/gemma-2-2b-it",
        {
            method: "POST",
            headers: {
                Authorization: process.env.BEARER_AUTH,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

