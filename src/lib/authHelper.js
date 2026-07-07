import crypto from 'crypto';

const SALT = 'zeta_salt_2026';

// Cryptographic SHA-256 hash using native Node.js crypto module
export function hashPassword(password) {
  if (!password) return '';
  return crypto.createHash('sha256').update(password + SALT).digest('hex');
}

// Automatically seed default admin credentials on database creation
export async function seedDefaultAdmin(UserModel) {
  try {
    const count = await UserModel.countDocuments();
    if (count === 0) {
      const hashedPass = hashPassword('zetawala2026');
      await UserModel.create({
        name: 'Administrator',
        username: 'admin',
        password: hashedPass,
        role: 'admin'
      });
      console.log('Seeded default admin account (username: admin, password: zetawala2026)');
    }
  } catch (err) {
    console.error('Failed to seed default admin:', err);
  }
}
