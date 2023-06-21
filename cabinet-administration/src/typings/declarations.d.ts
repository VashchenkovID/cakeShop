declare module '*.styl' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.md';

declare module '*.md' {
  const content: string;
  export = content;
}

declare module '*.svg' {
  const content: string;
  export = content;
}

declare module '*.png' {
  const content: string;
  export = content;
}

declare module '*.jpg' {
  const content: string;
  export = content;
}

declare module '*.jpeg' {
  const content: string;
  export = content;
}
