import {type ParsedUrlQuery} from 'node:querystring';
import {type FilterQuery, MikroORM, sql} from '@mikro-orm/postgresql';
import {type PagedResponse} from '../../type.js';
import {Pension} from './pension.entity.js';

export const orm = await MikroORM.init();
const em = orm.em;

export const listPensions = async (parameters: ParsedUrlQuery): Promise<PagedResponse<Pension>> => {
  const where: FilterQuery<Pension> = {};
  const options = {
    offset: 0,
    limit: 10,
  };

  if (parameters.likeId) {
    // @ts-expect-error as using raw sql
    where[sql`cast(p0.id as text)`] = {$like: `%${String(parameters.likeId)}%`};
  }

  if (parameters.likePotName) {
    where.potName = {$like: `%${String(parameters.likePotName)}%`};
  }

  if (parameters.gtAmount && parameters.ltAmount) {
    where.amount = {$gt: Number(parameters.gtAmount), $lt: Number(parameters.ltAmount)};
  } else if (parameters.gtAmount) {
    where.amount = {$gt: Number(parameters.gtAmount)};
  } else if (parameters.ltAmount) {
    where.amount = {$lt: Number(parameters.ltAmount)};
  }

  if (parameters.offset) {
    options.offset = Number(parameters.offset);
  }

  if (parameters.limit) {
    options.limit = Number(parameters.limit);
  }

  const [pensions, total] = await em.fork().findAndCount(Pension, where, options);

  return {
    object: 'list',
    offset: options.offset,
    limit: options.limit,
    total,
    data: pensions,
  };
};
