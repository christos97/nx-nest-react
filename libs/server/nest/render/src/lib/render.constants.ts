import type { Render } from '@ntua-saas-10/shared-types';
import type { Canvas } from 'canvas';

const pdf = 'pdf';
const svg = 'svg';
const png = 'png';
const html = 'html';

const contentTypes = {
  [svg]: 'image/svg+xml',
  [pdf]: 'application/pdf',
  [png]: 'image/png',
  [html]: 'text/html',
} as const;

export type SupportedContentType = (typeof contentTypes)[keyof typeof contentTypes];

export type RenderMapperConfig = {
  contentType: SupportedContentType;
  renderType: Render['type'];
  canvasType: Canvas['type'];
};

export type ContentTypeMapperType = {
  [key in RenderMapperConfig['contentType']]: {
    renderType: RenderMapperConfig['renderType'];
    canvasType: RenderMapperConfig['canvasType'];
  };
};
/**
 *
 * @param {SupportedContentType} contentType  The `SupportedContentType` of the render
 * @param {Render['type']} renderType
 * @example "svg" | "pdf" | "png" | "html"
 * @param {Canvas['type']} canvasType
 * @example "svg" | "pdf" | "image"
 * @returns {RenderMapperConfig} `RenderMapperConfig`
 */
const createRenderMapperConfig = (
  contentType: RenderMapperConfig['contentType'],
  renderType: RenderMapperConfig['renderType'],
  canvasType: RenderMapperConfig['canvasType'],
): RenderMapperConfig => ({ contentType, renderType, canvasType });

export const renderMapperConfig: ReadonlyArray<RenderMapperConfig> = [
  createRenderMapperConfig(contentTypes[pdf], pdf, pdf),
  createRenderMapperConfig(contentTypes[svg], svg, svg),
  createRenderMapperConfig(contentTypes[png], png, 'image'),
  createRenderMapperConfig(contentTypes[html], html, svg),
];

export const ContentTypeMapper = renderMapperConfig.reduce(
  (acc: ContentTypeMapperType, { contentType, renderType, canvasType }: RenderMapperConfig) => {
    acc[contentType] = { renderType, canvasType };
    return acc;
  },
  {} as ContentTypeMapperType,
);
