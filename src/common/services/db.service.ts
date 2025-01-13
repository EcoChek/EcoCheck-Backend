import { Inject } from '@nestjs/common';
import { ClsService, ClsStore } from 'nestjs-cls';

export interface CustomClsStore extends ClsStore {
  userID: number;
}

export abstract class DBService {
  @Inject()
  private readonly clsService: ClsService<CustomClsStore>;

  get userID(): number {
    return this.clsService.get('userID');
  }
}
