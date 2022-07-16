/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import DisplayAntimatter from '../DisplayAntimatter';
import initialGameState from '../../../common/initialGameState';
import { GameState } from '../../../common/GameStateInterface';

describe('DisplayAntimatter', () => {
   it('should render Antimatter component', () => {
      const gs: GameState = JSON.parse(initialGameState);
      render(<DisplayAntimatter gameState={gs} />);
      expect(screen.getByText(/You/i)).toBeInTheDocument();
      screen.debug();
   });
});
