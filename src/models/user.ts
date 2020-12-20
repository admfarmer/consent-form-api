import * as Knex from 'knex';

export class UserModel {
  tableName: string = 'users';

  list(db: Knex) {
    return db(this.tableName)
  }

  select(db: Knex, userCid: any) {
    return db(this.tableName)
      .where('userCid', 'userCid');
  }

  login(db: Knex, userName: string, userPassword: string) {
    return db(this.tableName)
      .select('userCid', 'userFullname', 'userHospcode')
      .where({
        userName: userName,
        userPassword: userPassword,
        userStatus: 'Y'
      });
  }

  save(db: Knex, user: any) {
    return db(this.tableName).insert(user);
  }

  update(db: Knex, userID: any, info: any) {
    return db(this.tableName)
      .where('userID', userID)
      .update(info);
  }

  remove(db: Knex, userID: any) {
    return db(this.tableName)
      .where('userID', userID)
      .del();
  }
}