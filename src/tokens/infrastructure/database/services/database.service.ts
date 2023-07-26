import { DataSource, ObjectType, Repository } from 'typeorm';
import { IDatabaseService } from '../interface/IDatabase.service';
import { appDataSource } from '../../../config/database.config';
import { injectable } from 'inversify';

@injectable()
export class DatabaseService implements IDatabaseService {
  private static myDataSource: DataSource;

  private async getConnection(): Promise<DataSource | undefined> {
    if (DatabaseService.myDataSource?.isInitialized) {
      console.log('Connection Already Established!');
      return DatabaseService.myDataSource;
    }

    try {
      DatabaseService.myDataSource = await appDataSource.initialize();
      console.log('Connection Established!');
    } catch (error) {
      console.log(error);
    }

    return DatabaseService.myDataSource;
  }

  public async getRepository(
    entity: ObjectType<any>
  ): Promise<Repository<any> | undefined> {
    const connection = await this.getConnection();
    return connection?.getRepository(entity);
  }
}
