// Backtracking Constraint Solver & Hint Engine for Crown Matrix
import { checkThreats } from './threats';

export function canPlaceCrown(crowns, regions, r, c) {
  for (const crown of crowns) {
    if (crown.r === r) return false; // same row
    if (crown.c === c) return false; // same col
    if (Math.abs(crown.r - r) === Math.abs(crown.c - c)) return false; // same diagonal
    if (regions && regions[r][c] === regions[crown.r][crown.c]) return false; // same region
    if (Math.abs(crown.r - r) <= 1 && Math.abs(crown.c - c) <= 1) return false; // adjacent touch
  }
  return true;
}

export function solveNQueens(size, regions, existingCrowns = []) {
  const solutions = [];
  
  function backtrack(row, currentCrowns) {
    if (solutions.length > 0) return; // Find first valid solution
    if (row === size) {
      solutions.push([...currentCrowns]);
      return;
    }

    // If row already has a pre-existing crown, validate and move to next row
    const rowCrown = existingCrowns.find(c => c.r === row);
    if (rowCrown) {
      if (canPlaceCrown(currentCrowns, regions, rowCrown.r, rowCrown.c)) {
        backtrack(row + 1, [...currentCrowns, rowCrown]);
      }
      return;
    }

    for (let col = 0; col < size; col++) {
      // Skip if cell conflicts with existing crowns
      if (canPlaceCrown(currentCrowns, regions, row, col)) {
        currentCrowns.push({ r: row, c: col });
        backtrack(row + 1, currentCrowns);
        currentCrowns.pop();
      }
    }
  }

  // Separate fixed vs dynamic
  const startCrowns = [];
  existingCrowns.forEach(c => {
    if (canPlaceCrown(startCrowns, regions, c.r, c.c)) {
      startCrowns.push(c);
    }
  });

  backtrack(0, []);
  return solutions.length > 0 ? solutions[0] : null;
}

export function getSmartHint(board, size, regions) {
  const threats = checkThreats(board, size, regions);

  // 1. If conflicts exist
  if (threats.conflicts.length > 0) {
    const firstConflict = threats.conflicts[0];
    return {
      type: 'error',
      message: `Conflict detected! Crown at Row ${firstConflict.from[0] + 1}, Col ${firstConflict.from[1] + 1} is under attack.`,
      highlightCell: firstConflict.from
    };
  }

  // Get current crowns
  const currentCrowns = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 1) {
        currentCrowns.push({ r, c });
      }
    }
  }

  // 2. Check if puzzle is already solved
  if (threats.isSolved) {
    return {
      type: 'success',
      message: '🎉 Matrix Complete! Excellent spatial reasoning!',
      highlightCell: null
    };
  }

  // 3. Run solver with current crowns
  const solution = solveNQueens(size, regions, currentCrowns);

  if (!solution) {
    return {
      type: 'warning',
      message: '⚠️ Current crown configuration blocks all valid solutions. Remove a crown to proceed.',
      highlightCell: currentCrowns.length > 0 ? [currentCrowns[currentCrowns.length - 1].r, currentCrowns[currentCrowns.length - 1].c] : null
    };
  }

  // 4. Find first unplaced crown in the solution
  const nextCrown = solution.find(s => !currentCrowns.some(c => c.r === s.r && c.c === s.c));

  if (nextCrown) {
    return {
      type: 'hint',
      message: `✨ Smart Hint: Place a Crown at Row ${nextCrown.r + 1}, Column ${nextCrown.c + 1}.`,
      highlightCell: [nextCrown.r, nextCrown.c]
    };
  }

  return {
    type: 'info',
    message: 'Keep analyzing the matrix grid!',
    highlightCell: null
  };
}
