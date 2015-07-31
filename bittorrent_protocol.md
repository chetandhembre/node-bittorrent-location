##What is bencoding?
bencoding is use to encode bittorrent files
[learn more here](https://en.wikipedia.org/wiki/Bencoding)

##what is torrent file?
A torrent file does not contain the content to be distributed; it only contains
information about those files, such as their names, sizes, folder structure, and
cryptographic hash values for verifying file integrity.

torrent file is encoded in bencoded format

Following is part of torrent file
#info:
	1. piece length : number bytes per piece
	2. pieces : concatanation of sha1 hash of piece
	3. length : length of file in bytes (only when single file is share)
#name: name of original file
#private :  check if content is private or not
#creation date : date on which this torrent is created
#comment: comment added while creting torrent file
#announce:  url tracker
#accountlists:  it is list of trackers
#url-list: this is direct download link over http/ftp protocol [2]
#files: it is list of files present in torrent content. every entry will have following fields
	1. path : path of file relative to root directory of torrent content
	2. name : name of file
	3. length : size of torrented file
	4. offset: (to be explore)

##How can I parse .torrent file ?
.torrent file is encoded using `bencode` method. I wrote code for this in `parse_torrent.js`

##What are peers ? 
A peer is one instance of a BitTorrent client running on a computer on the Internet to which other clients connect and transfer data.

##What are swarm ?
All peer sharing torrent are called swarm. So peer who are downloading and uploading file are collectively called swarm

##What is tracker ?
If bittorent we download files in small pieces and then combine them to create
one desired file. But when any bittorrent client want to start downloading file it requierd to know which are peers have required piece and here tracker comes into picture as it tells bittorrent client peers which has required data 
[more info](https://en.wikipedia.org/wiki/BitTorrent_tracker)


##How tracker contributes to bittorrent ?
We can have two type of tracker `http tracker` and `udp tracker`. Following way, we can handle these two tracker
	1. Http Tracker
		you can get complete protocol [here](https://wiki.theory.org/BitTorrentSpecification#Tracker_HTTP.2FHTTPS_Protocol). I have implemented this in `http_tracker.js`
	2. UDP Tracker
		It uses has it's own [protocol](http://www.bittorrent.org/beps/bep_0015.html). UDP tracker more used because less overhead it has than Http tracker.

##Process
1. you get .torrent file
2. from torrent file you get all tracker list (annouce)

##Reference
1. [Bittorrent Specification](https://wiki.theory.org/BitTorrentSpecification)
2. [url-list proposal](http://getright.com/seedtorrent.html)
3. [udp tracker protocol](http://www.bittorrent.org/beps/bep_0015.html)
