import type { ComponentProps } from 'react';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { File, Folder, Files } from 'fumadocs-ui/components/files';
import {
  Adsense,
  Error,
  Info,
  LinkButton,
  Tip,
  Warning,
  Accordion,
} from '@/components/mdx/index';
import {
  ImageZoom,
  type ImageZoomProps,
} from 'fumadocs-ui/components/image-zoom';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    // `MDXComponents['img']` đòi props của thẻ <img> thường (src có thể là
    // `string | Blob`), còn `ImageZoom` nhận props kiểu next/image
    // (src: `string | StaticImport`). Hai kiểu không giao nhau nên phải khai
    // báo tham số theo MDX rồi cast khi truyền xuống — thay vì `any` như trước
    // (any khiến mọi lỗi prop của ảnh trong MDX lọt qua typecheck).
    img: (props: ComponentProps<'img'>) => (
      <ImageZoom {...(props as unknown as ImageZoomProps)} />
    ),
    ImageZoom,
    Adsense,
    Tip,
    Info,
    Error,
    Warning,
    LinkButton,
    Tab,
    Tabs,
    Step,
    Steps,
    File,
    Files,
    Folder,
    TypeTable,
    Accordion,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
