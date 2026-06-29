/** PNG 1×1 px — fichier minimal pour les tests d'upload local. */
export const MINIMAL_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64"
);

export function e2ePngUpload(name: string) {
  return {
    name,
    mimeType: "image/png",
    buffer: MINIMAL_PNG,
  };
}
