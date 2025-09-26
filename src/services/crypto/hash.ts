/**
 * Simple hash utility for development purposes
 * WARNING: This is NOT cryptographically secure - use only for development
 */

export class SimpleHash {
  /**
   * Create a simple hash of a string (development only)
   * @param input - String to hash
   * @returns Simple hash string
   */
  static create(input: string): string {
    let hash = 0;
    if (input.length === 0) return hash.toString();
    
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(36);
  }

  /**
   * Verify a string against a hash
   * @param input - String to verify
   * @param hash - Hash to compare against
   * @returns True if match
   */
  static verify(input: string, hash: string): boolean {
    return this.create(input) === hash;
  }

  /**
   * Create a salted hash (slightly more secure for dev)
   * @param input - String to hash
   * @param salt - Salt string
   * @returns Salted hash
   */
  static createSalted(input: string, salt: string = 'dev_salt_2024'): string {
    return this.create(input + salt);
  }

  /**
   * Verify against a salted hash
   * @param input - String to verify
   * @param hash - Hash to compare against
   * @param salt - Salt used in original hash
   * @returns True if match
   */
  static verifySalted(input: string, hash: string, salt: string = 'dev_salt_2024'): boolean {
    return this.createSalted(input, salt) === hash;
  }
}

// Export default for convenience
export default SimpleHash;