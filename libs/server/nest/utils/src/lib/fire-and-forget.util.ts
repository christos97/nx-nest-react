export async function fireAndForget(fn: () => void) {
  try {
    await fn();
  } catch (error) {
    console.error('Fire and forget function encountered an error:', error);
  }
}
