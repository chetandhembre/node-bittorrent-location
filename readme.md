# Bittorrent-Location

get location of tracker available for torrent file or magnet link.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# Features

 * support `torrent file` and `magnet link`
 * gives `latitude` and `longitude` of tracker

# Installation
```
npm i bittorrent-location --save
```

# Test
```
npm test
```

# Usage
```
var Bittorrent_Location = require('bittorrent-location')

var bittorrentLocation = new Bittorrent_Location('my.torrent')

bittorrentLocation.on('update', function (location) {
  console.log(location) //location of tracker
})

bittorrentLocation.on('error', function (err) {
  console.log(err) // error
})

setTimeout(function () {
  bittorrentLocation.stop()
}, 5000)

```

# Limitation

* `stop()` call wont exit program (need assistance to find  issue)
* location related api call are limited by  [iplocation](https://www.npmjs.com/package/iplocation) which uses [freegeoip.net](http://freegeoip.net).
* currently only support `udp` trackers

# Contributions

send PR if you want some changes in module. If you are having issue then create issue.

# License

MIT
