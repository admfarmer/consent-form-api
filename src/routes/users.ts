/// <reference path="../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as HttpStatus from 'http-status-codes';
import * as crypto from 'crypto';

import { UserModel } from '../models/user';

const userModel = new UserModel();

const router = (fastify, { }, next) => {

  var db: Knex = fastify.db;

  fastify.get('/', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {

    try {
      const rs: any = await userModel.list(db);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })

  fastify.post('/select', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const userCid = req.body.userCid;

    try {
      const rs: any = await userModel.select(db, userCid);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })

  fastify.post('/insert', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const userCid = req.body.userCid;
    const userName = req.body.userName;

    const userPassword = req.body.userPassword;
    const encPassword = crypto.createHash('md5').update(userPassword).digest('hex');

    const userFullname = req.body.userFullname;
    const userHospcode = req.body.userHospcode;
    const userStatus = req.body.userStatus;

    const data: any = {
      userCid: userCid,
      userName: userName,
      userPassword: encPassword,
      userFullname: userFullname,
      userHospcode: userHospcode,
      userStatus: userStatus
    };

    try {
      const rs: any = await userModel.save(db, data);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })

  //update?userID=xx
  fastify.put('/update', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const userID = req.query.userID;
    const userCid = req.body.userCid;
    const userName = req.body.userName;
    const userPassword = req.body.userPassword;
    const userFullname = req.body.userFullname;
    const userHospcode = req.body.userHospcode;
    const userStatus = req.body.userStatus;

    const info: any = {
      userCid: userCid,
      userName: userName,
      userFullname: userFullname,
      userHospcode: userHospcode,
      userStatus: userStatus
    };

    if (userPassword) {
      var encPass = crypto.createHash('md5').update(userPassword).digest('hex');
      info.userPassword = encPass;
    }

    try {
      const rs: any = await userModel.update(db, userID, info);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })
  //changepass?userID=xx
  fastify.put('/changepass', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const userID = req.query.userID;
    const userPassword = req.body.userPassword;
    const encPassword = crypto.createHash('md5').update(userPassword).digest('hex');

    const info: any = {
      userPassword: encPassword
    };

    try {
      const rs: any = await userModel.update(db, userID, info);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })
  //remove?userID=xx
  fastify.delete('/remove', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const userID: any = req.query.userID;

    try {
      const rs: any = await userModel.remove(db, userID);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })

  next();

}

module.exports = router;