const configuredServer = process.env.NEXT_PUBLIC_HTTP_SERVER?.trim().replace(/\/+$/, "");
export const HTTP_SERVER = configuredServer || (process.env.NODE_ENV === "development" ? "http://localhost:4000" : "");

export function serverUrl(path: string) {
  if (!HTTP_SERVER) throw new Error("The Express server URL is not configured. Set NEXT_PUBLIC_HTTP_SERVER and rebuild the client.");
  return `${HTTP_SERVER}${path}`;
}
