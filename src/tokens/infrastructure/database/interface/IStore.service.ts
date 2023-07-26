export interface IStoreService {
  set(key: string, value: string): Promise<any>;
  get(key: string): Promise<any>;
}
