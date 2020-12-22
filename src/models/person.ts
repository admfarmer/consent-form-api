import * as Knex from 'knex';

export class PersonModel {
  tableName: string = 'person';

  list(db: Knex) {
    return db('person').select('person.*', 'documents.file_path', 'documents.document_id')
      .leftJoin('documents', 'documents.document_code', 'person.cid')
  }

  select_cid(db: Knex, cid: any) {
    return db(this.tableName)
      .where('cid', cid);
  }

  select_hospcode(db: Knex, hospcode: any) {
    return db(this.tableName)
      .where('hospcode', hospcode);
  }

  save(db: Knex, info: any) {
    return db(this.tableName).insert(info);
  }

  update(db: Knex, id: any, info: any) {
    return db(this.tableName)
      .where('id', id)
      .update(info);
  }

  remove(db: Knex, id: any) {
    return db(this.tableName)
      .where('id', id)
      .del();
  }
}