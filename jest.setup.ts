import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ParentProvider from '@/app/Provider';

beforeAll(() => {
  const mockGradient = {
    addColorStop: jest.fn(),
  };
  const mockGetContext = jest.fn(() => ({
    clearRect: jest.fn(),
    rect: jest.fn(),
    fillRect: jest.fn(),
    strokeRect: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    fill: jest.fn(),
    arc: jest.fn(),
    ellipse: jest.fn(),
    arcTo: jest.fn(),
    bezierCurveTo: jest.fn(),
    quadraticCurveTo: jest.fn(),
    closePath: jest.fn(),
    fillText: jest.fn(),
    strokeText: jest.fn(),
    measureText: jest.fn(() => ({ width: 100 })), // Mocked response for measureText
    drawImage: jest.fn(),
    setLineDash: jest.fn(),
    getLineDash: jest.fn(() => []), // Mocked response for getLineDash
    lineWidth: 1,
    strokeStyle: '',
    fillStyle: '',
    globalAlpha: 1,
    save: jest.fn(),
    restore: jest.fn(),
    translate: jest.fn(),
    rotate: jest.fn(),
    scale: jest.fn(),
    transform: jest.fn(),
    setTransform: jest.fn(),
    clip: jest.fn(),
    createLinearGradient: jest.fn(() => mockGradient),
    createRadialGradient: jest.fn(() => mockGradient),
    createPattern: jest.fn(),
    filter: '',
  }));

  // @ts-ignore
  HTMLCanvasElement.prototype.getContext = mockGetContext;
});


const customRender = (ui: any, options?: any) => render(ui, { wrapper: ParentProvider, ...options });

export * from '@testing-library/react';

export { customRender as render };