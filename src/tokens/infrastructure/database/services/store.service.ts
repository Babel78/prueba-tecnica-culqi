import { RedisClientType } from 'redis';
import { IStoreService } from '../interface/IStore.service';
import { redisClient } from '../../../config/store.config';
import { injectable } from 'inversify';

@injectable()
export class StoreService implements IStoreService {
  private static clientStore: RedisClientType;
  private async getConnection(): Promise<any> {
    if (StoreService.clientStore?.isOpen) {
      return StoreService.clientStore;
    }
    await redisClient.connect();
    return redisClient;
  }

  async set(key: string, value: string): Promise<any> {
    const clientStore = await this.getConnection();
    await clientStore?.set(key, value, { EX: 60 * 15 });
  }
  async get(key: string): Promise<any> {
    const clientStore = await this.getConnection();
    return await clientStore?.get(key);
  }
}
