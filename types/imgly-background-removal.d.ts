declare module '@imgly/background-removal' {
  export function removeBackground(
    image: File | Blob | ArrayBuffer | Uint8Array,
    options?: {
      output?: {
        quality?: number;
      };
    }
  ): Promise<Blob>;
}
