module.exports = parseTorrent

var rTorrent = require('read-torrent')

function parseTorrent (filepath, cb) {
  return rTorrent(filepath, cb)
}
