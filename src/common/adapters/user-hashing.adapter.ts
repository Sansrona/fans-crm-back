import * as bcrypt from 'bcrypt';

export class UserHashingManager {
  private async _generateHash(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  private async _generateSalt(round: number) {
    return await bcrypt.genSalt(round);
  }

  async checkPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async getHashAndSalt(password: string) {
    const passwordSalt = await this._generateSalt(10);
    return await this._generateHash(password, passwordSalt);
  }
}
