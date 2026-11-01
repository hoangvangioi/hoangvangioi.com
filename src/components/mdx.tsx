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
    // MDX types img props as a plain <img> (src: string | Blob) while ImageZoom
    // takes next/image props (src: string | StaticImport). The old `any` hid
    // every image prop error inside MDX from typecheck.
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
