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
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    img: (props: any) => <ImageZoom {...props} />,
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
