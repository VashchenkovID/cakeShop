interface ImportMeta {
  env: {
    readonly REACT_APP_API_URL: string;
    readonly REACT_APP_IMAGE: string;
  };
}

declare module "*.styl" {
  const content: Record<string, string>;
  export default content;
}
