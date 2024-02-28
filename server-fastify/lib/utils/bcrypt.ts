import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; 

/**
 * Hashes the given password using bcrypt.
 * @param password The password to hash
 * @returns A Promise resolving to the hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compares a plaintext password with a hashed password using bcrypt.
 * @param password The plaintext password to compare
 * @param hashedPassword The hashed password to compare against
 * @returns A Promise resolving to a boolean indicating whether the passwords match
 */
export async function comparePasswords(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
