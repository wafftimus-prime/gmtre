import { v4 as uuidv4 } from 'uuid';

export function generateUUID(): string {
  return uuidv4();
}

export function generateShortUUID(length: number = 8): string {
  const uuid = uuidv4().replace(/-/g, ''); // Remove dashes to compact the UUID a bit
  return uuid.substring(0, length); // Return the first N characters for a shorter ID
}
