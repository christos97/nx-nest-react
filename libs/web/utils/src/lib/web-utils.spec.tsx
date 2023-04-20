import { render } from '@testing-library/react';

import WebUtils from './web-utils';

describe('WebUtils', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebUtils />);
    expect(baseElement).toBeTruthy();
  });
});
