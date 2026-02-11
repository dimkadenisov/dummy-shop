const BASE_URL = "/api";

export async function get<T>(
  path: string,
  params?: Record<string, string | number>,
): Promise<T> {
  const qs = new URLSearchParams();
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value) qs.set(key, String(value));
    }
  }
  const query = qs.toString();
  const url = `${BASE_URL}${path}${query ? `?${query}` : ""}`;
  const res = await fetch(url, {
    credentials: "include",
  });
  if (!res.ok) {
    const json = await res.json();

    throw new Error(json.message ?? `GET ${path} failed: ${res.status}`);
  }
  return res.json();
}

export async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  if (!res.ok) {
    const json = await res.json();

    throw new Error(json.message ?? `POST ${path} failed: ${res.status}`);
  }
  return res.json();
}
