/* eslint-disable import/no-unresolved */
/* eslint-disable no-plusplus */
import { FastifyReply, FastifyRequest } from 'fastify';
import { error, success } from '../../../helpers';
import { normalizeSchedule } from '../../../helpers/normalize/group-data-schedule';
import { Prisma } from '../../../config/prisma';

const indexSchedule = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    // const { date } = req.params as { date: string };
    const data = await Prisma.dentistSchedule.findFirst({
      include: {
        week: true,
      },
    });

    if (!data) {
      return reply
        .status(404)
        .send(error(
          { name: 'ERR_SCHEDULE_DATA_NOT_FOUND', status: 404 },
        ));
    }

    const schedule = normalizeSchedule(data.week);

    return reply.code(200).send({
      ...success({
        name: 'SUCCESS_SCHEDULE_FOUND',
        status: 200,
        payload: {
          ...schedule,
        },
      }),
    });
  } catch (_err) {
    return reply.code(404).send({
      ...error({
        name: 'ERR_SCHEDULE_DATA_NOT_FOUND',
        status: 404,
      }),
    });
  }
};

export { indexSchedule };