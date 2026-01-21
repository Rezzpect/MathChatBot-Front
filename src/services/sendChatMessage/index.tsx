export default async function sendMessage(message: string) {
    const res = await fetch(import.meta.env.VITE_N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message
        }),
    })

    if (!res.ok) {
        throw new Error("Failed to send message to chatbot");
    } else {
        return res.json() as Promise<{reply:string}>
    }
}