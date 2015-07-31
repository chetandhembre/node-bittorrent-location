module.exports = TorrentLocation

var EventEmitter = require('events').EventEmitter

var rTorrent = require('./lib/parse_torrent')
var inherits = require('inherits')
var UdpTracker = require('bittorrent-udp-tracker')
var iplocation = require('iplocation')

inherits(TorrentLocation, EventEmitter)

/*
TODO:
1. test cases (done)
2. readme
*/
function TorrentLocation (filePath, peerId) {
  var self = this
  EventEmitter.call(self)
  self.filePath = filePath
  self.peerId = peerId || '01234567890123456789'
  self.udpTrackers = []
  self.stop = function () {
    self.udpTrackers.forEach(function (tracker) {
      if (tracker.destory) {
        tracker.destory()
      }
      tracker.removeListener('error', onUdpTrackerError)
      tracker.removeListener('update', onUdpTrackerUpdate)
    })
    self.removeAllListeners('error')
    self.removeAllListeners('update')
  }

  function onUdpTrackerError (msg) {
    this.removeListener('error', onUdpTrackerError)
    this.removeListener('update', onUdpTrackerUpdate)
    handleError.bind(self, msg)()
  }

  function onUdpTrackerUpdate (update) {
    handleUpdate.bind(self, update)()
  }

  rTorrent(self.filePath, function (err, parseTorrent) {
    if (err) {
      self.emit('error', err.message)
      self.stop()
      return
    }

    self.infoHash = parseTorrent['infoHash']
    self.announceUrl = parseTorrent['announce']
    for (var i = 0; i < self.announceUrl.length; i++) {
      var url = self.announceUrl[i]

      if (isUDP(url)) {
        var udpTracker = new UdpTracker(self.peerId, self.infoHash, url)
        udpTracker.on('error', onUdpTrackerError)
        udpTracker.on('update', onUdpTrackerUpdate)
        udpTracker.announce(2, {})
        self.udpTrackers.push(udpTracker)
      }
    }
  })
}

function isUDP (url) {
  return url.trim().indexOf('udp://') === 0
}

function handleError (msg) {
  var self = this
  self.emit('error', msg)
}

function handleUpdate (data) {
  var self = this
  data.peers = data.peers || []
  if (!Array.isArray(data.peers)) {
    data.peers = [data.peers]
  }

  data.peers.forEach(function (ip) {
    iplocation(ip.split(':')[0], handleIpLocationResponse.bind(self))
  })
}

function handleIpLocationResponse (err, res) {
  var self = this
  if (err) {
    self.emit('error', err.toString())
  } else {
    self.emit('update', res)
  }
}
