export const compare = jest.fn();
export const hashSync = jest.fn();

jest.mock('bcryptjs', () => {
  return {
    compare,
    hashSync,
  };
});
