import prisma from '../config/prisma.js';

const models = {
  users: { delegate: 'user', orderBy: { createdAt: 'desc' }, include: undefined },
  certification: { delegate: 'certification', orderBy: { createdAt: 'desc' }, include: { product: true, standard: true } },
  compliance: { delegate: 'complianceCheck', orderBy: { createdAt: 'desc' }, include: { user: true, product: true } },
  documents: { delegate: 'document', orderBy: { createdAt: 'desc' }, include: { user: true } },
  chat: { delegate: 'chatSession', orderBy: { createdAt: 'desc' }, include: { user: true } },
};

export const resourceService = {
  async list(resource, { skip = 0, take = 20 } = {}) {
    const config = models[resource];
    const delegate = prisma[config.delegate];
    const args = { skip, take, orderBy: config.orderBy };
    if (config.include) args.include = config.include;
    const [data, total] = await Promise.all([delegate.findMany(args), delegate.count()]);
    return { data, total };
  },

  async getById(resource, id) {
    if (!id || !/^[0-9a-f-]{36}$/i.test(id)) return null;
    const config = models[resource];
    const args = { where: { id } };
    if (config.include) args.include = config.include;
    return prisma[config.delegate].findUnique(args);
  },
};

export default resourceService;