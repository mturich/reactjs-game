/**
 * @vitest-environment jsdom
 */

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Tickspeed from '../TickSpeed';
import initialGameState from '../../../common/initialGameState';

describe('<Tickspeed/>', () => {
   it('test case', () => {
      const dispach = vi.fn();
      const tickspeed = { current: 2000 };
      const gs = JSON.parse(initialGameState);
      render(<Tickspeed gs={gs} dispatch={dispach} tickspeedRef={tickspeed}></Tickspeed>);
      expect(screen.getByText(/2000/i)).toBeInTheDocument();
   });
});
