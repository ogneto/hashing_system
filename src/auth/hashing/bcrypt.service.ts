import * as bycrypt from 'bcryptjs';
import { HashingService } from './hashing.service';

export class BycryptService extends HashingService {
  async hash(password: string): Promise<string> {
    const salt = await bycrypt.genSalt();
    return bycrypt.hash(password, salt);
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    return bycrypt.compare(password, passwordHash);
  }
}
