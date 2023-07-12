interface ImportMeta {
  env: {
    readonly VITE_API_URL: string;
    readonly VITE_API_URL_IMAGE: string;
  };
}

declare module "*.styl" {
  const content: Record<string, string>;
  export default content;
}
