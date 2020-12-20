/// <reference path="../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as HttpStatus from 'http-status-codes';

import { PersonModel } from '../models/person';

const personModel = new PersonModel();

const router = (fastify, { }, next) => {

  var db: Knex = fastify.db;

  fastify.get('/', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {

    try {
      const rs: any = await personModel.list(db);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })

  fastify.post('/select_cid', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const cid = req.body.cid;

    try {
      const rs: any = await personModel.select_cid(db, cid);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })

  fastify.post('/select_hospcode', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const hospcode = req.body.hospcode;

    try {
      const rs: any = await personModel.select_hospcode(db, hospcode);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })


  fastify.post('/insert', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const cid = req.body.cid;
    const fullname = req.body.fullname;
    const sex = req.body.sex;
    const hospcode = req.body.hospcode;
    const register = req.body.register;
    const date_reg = req.body.date_reg;

    const data: any = {
      cid: cid,
      fullname: fullname,
      sex: sex,
      hospcode: hospcode,
      register: register,
      date_reg: date_reg
    };

    try {
      const rs_cid: any = await personModel.select_cid(db, cid);
      const cid_x = rs_cid[0].cid;
      console.log(cid_x);
      if (!cid_x) {
        let rs: any = await personModel.save(db, data);
        reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
      } else {
        reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: "พบเลขบัตรประชาชนลงทะเบียนแล้ว" })
      }
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })
  //update?id=xx
  fastify.put('/update', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const id = req.query.id;
    const cid = req.body.cid;
    const fullname = req.body.fullname;
    const sex = req.body.sex;
    const hospcode = req.body.hospcode;
    const register = req.body.register;
    const date_reg = req.body.date_reg;

    const info: any = {
      cid: cid,
      fullname: fullname,
      sex: sex,
      hospcode: hospcode,
      register: register,
      date_reg: date_reg
    };

    try {
      let rs: any = await personModel.update(db, cid, info);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })
  //remove?id=xx
  fastify.delete('/remove', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const id: any = req.query.id;

    try {
      let rs: any = await personModel.remove(db, id);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })

  next();

}

module.exports = router;