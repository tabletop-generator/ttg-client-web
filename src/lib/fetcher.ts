interface SWRResError extends Error {
  info: any;
  status: number;
}

export async function fetcher([route, token]: [string, string?]) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${route}`, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error(
      `An error occurred while fetching the data.`
    ) as SWRResError;
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
}
