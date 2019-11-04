export function SeparationLineSchema(type: string) {
  return {
    blocks: {
      [type]: {
        isVoid: true
      }
    }
  };
}
