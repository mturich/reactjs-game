/**
 * @vitest-environment jsdom
 */

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';

describe('DisplayAntimatter', () => {
   it('tests the buy one time clockspeed reduction', async () => {
      const user = userEvent.setup();
      const toTest = 2000;
      const rate = 1 - 0.11;
      render(<App />);

      expect(screen.getByText(new RegExp(`${toTest} ms`, 'i'))).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: /cost one time/i }));
      expect(screen.queryByText(new RegExp(`${toTest} ms`, 'i'))).not.toBeInTheDocument();
      expect(screen.getByText(new RegExp(`${toTest * rate} ms`, 'i'))).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: /cost one time/i }));
      expect(
         screen.getByText(new RegExp(`${(toTest * rate *rate).toFixed(0)} ms`, 'i'))
      ).toBeInTheDocument();
   });
});
