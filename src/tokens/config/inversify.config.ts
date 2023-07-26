import 'reflect-metadata';
import { Container } from 'inversify';
import { TokenService } from '../infrastructure/services/token.service';
import { TokenRepositoryPG } from '../infrastructure/adapters/token.repository.pg';
import { IDatabaseService } from '../infrastructure/database/interface/IDatabase.service';
import { DatabaseService } from '../infrastructure/database/services/database.service';
import { TYPES } from '../types/types.core';
import { ITokenRepository } from '../domain/token.repository';
import { IStoreService } from '../infrastructure/database/interface/IStore.service';
import { StoreService } from '../infrastructure/database/services/store.service';

const container = new Container();
container.bind<TokenService>(TokenService).to(TokenService);
container.bind<ITokenRepository>(TYPES.ITokenRepository).to(TokenRepositoryPG);
container.bind<IDatabaseService>(TYPES.IDatabaseService).to(DatabaseService);
container.bind<IStoreService>(TYPES.IStoreService).to(StoreService);
export { container };
