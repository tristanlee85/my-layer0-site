module.exports = {
  routes: './src/routes.ts',
  connector: '@layer0/starter',
  backends: {
    origin: {
      domainOrIp: 'www.vektorstudio.com',
      hostHeader: 'www.vektorstudio.com',
      disableCheckCert: true,
    },
  },
}
