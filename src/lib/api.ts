export async function runDemo(endpoint: string, payload: Record<string, string>) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Demo API failed: ${response.status}`)
  }

  return response.json()
}