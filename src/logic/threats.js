// Threat Validator & Conflict Detector for Crown Matrix

export function checkThreats(board, size, regions) {
  const crowns = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 1) { // 1 represents Crown
        crowns.push({ r, c, region: regions[r][c] });
      }
    }
  }

  const conflicts = [];
  const conflictingCellKeys = new Set();

  for (let i = 0; i < crowns.length; i++) {
    for (let j = i + 1; j < crowns.length; j++) {
      const c1 = crowns[i];
      const c2 = crowns[j];

      let type = null;

      if (c1.r === c2.r) {
        type = 'row';
      } else if (c1.c === c2.c) {
        type = 'col';
      } else if (Math.abs(c1.r - c2.r) === Math.abs(c1.c - c2.c)) {
        type = 'diag';
      } else if (c1.region !== undefined && c1.region === c2.region) {
        type = 'region';
      } else if (Math.abs(c1.r - c2.r) <= 1 && Math.abs(c1.c - c2.c) <= 1) {
        type = 'touch';
      }

      if (type) {
        conflicts.push({
          from: [c1.r, c1.c],
          to: [c2.r, c2.c],
          type
        });
        conflictingCellKeys.add(`${c1.r},${c1.c}`);
        conflictingCellKeys.add(`${c2.r},${c2.c}`);
      }
    }
  }

  // Calculate threatened attack paths (cells hit by at least one crown)
  const threatened = Array.from({ length: size }, () => Array(size).fill(false));

  crowns.forEach(({ r, c, region }) => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i === r && j === c) continue;

        // Same row, col, diagonal, or region, or touching
        const sameRow = (i === r);
        const sameCol = (j === c);
        const sameDiag = Math.abs(i - r) === Math.abs(j - c);
        const sameRegion = (region !== undefined && regions[i][j] === region);
        const adjacent = Math.abs(i - r) <= 1 && Math.abs(j - c) <= 1;

        if (sameRow || sameCol || sameDiag || sameRegion || adjacent) {
          threatened[i][j] = true;
        }
      }
    }
  });

  const crownCount = crowns.length;
  // Calculate unique regions
  const uniqueRegions = new Set();
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      uniqueRegions.add(regions[r][c]);
    }
  }
  const targetCrowns = uniqueRegions.size > 0 ? uniqueRegions.size : size;
  const isSolved = crownCount === targetCrowns && conflicts.length === 0;

  return {
    conflicts,
    conflictingCellKeys,
    threatened,
    crownCount,
    targetCrowns,
    isSolved,
    isValid: conflicts.length === 0
  };
}
