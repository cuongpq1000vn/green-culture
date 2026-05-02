export default {
  async health(ctx) {
    ctx.body = { status: 'ok', timestamp: new Date().toISOString() };
  },
};
