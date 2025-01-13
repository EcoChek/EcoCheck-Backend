import { Injectable } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { users } from 'src/database/schema/users';

@Injectable()
export class SqlShortcuts {
    static readonly userObject = sql`JSONB_BUILD_OBJECT('id', ${users.id}, 'username', ${users.email})`;

    static async first<T>(promise: Promise<T[]>): Promise<T | undefined> {
        return (await promise)[0];
    }
}
