module.exports = {
  PORT: process.env.PORT || 3003,
  MONGODB: process.env.MONGODB || 'mongodb://localhost:27017/bit-bank',
  SECRET: process.env.SECRET || 'misecreto',
  DROPBOX_TOKEN: process.env.DROPBOX_TOKEN || ''
}
