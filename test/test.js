/*
things to test
1. valid torrent (done)
2. valid magnet link (done)
3. invalid torrent file (done)
4. invalid magnet link (done)
*/
var path = require('path')

var test = require('tap').test
var BittorentLocation = require('../')

test('deno', function (t) {
  t.ok(true)
  t.end()
})

test('should return valid location of torrent file', function (t) {
  var bittorentLocation = new BittorentLocation(path.resolve(__dirname, 'torrent/bitlove-intro.torrent'))
  bittorentLocation.on('update', function (data) {
    t.type(data, Object)
    t.ok(data.latitude)
    t.ok(data.longitude)
    t.ok(data.ip)
  })

  bittorentLocation.on('error', function (err) {
    throw new Error(err)
  })

  setTimeout(function () {
    bittorentLocation.stop()
    t.end()
  }, 1000)
})

test('should return valid magnet link', function (t) {
  var bittorentLocation = new BittorentLocation('magnet:?xt=urn:btih:d2474e86c95b19b8bcfdb92bc12c9d44667cfa36&dn=Leaves+of+Grass+by+Walt+Whitman.epub&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337')
  bittorentLocation.on('update', function (data) {
    t.type(data, Object)
    t.ok(data.latitude)
    t.ok(data.longitude)
    t.ok(data.ip)
  })

  bittorentLocation.on('error', function (err) {
    throw new Error(err)
  })

  setTimeout(function () {
    bittorentLocation.stop()
    t.end()
  }, 1000)
})

test('should return invalid torrent file', function (t) {
  var bittorentLocation = new BittorentLocation(path.resolve(__dirname, 'torrent/invalid.torrent'))
  bittorentLocation.on('update', function (data) {
    throw new Error(data)
  })

  bittorentLocation.on('error', function (err) {
    t.ok(err)
    t.end()
  })
})

test('should return invalid magnet link file', function (t) {
  var bittorentLocation = new BittorentLocation('magnet12:?xt=urn:btih:d2474e86c95b19b8bcfdb92bc12c9d44667cfa36&dn=Leaves+of+Grass+by+Walt+Whitman.epub&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337')
  bittorentLocation.on('update', function (data) {
    throw new Error(data)
  })

  bittorentLocation.on('error', function (err) {
    t.ok(err)
    t.end()
  })
})

