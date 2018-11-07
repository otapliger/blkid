# blkid

Node.js module for the **blkid** linux command

It requires root privileges to get actual information

## Install

```sh
npm install @otapliger/blkid --save
```

## Usage

```javascript

const blkid = require('@otapliger/blkid')

// GET INFO FROM ALL PARTITIONS
blkid().then(response => {
  console.log(response)
})

// GET INFO FROM A SINGLE PARTITION
blkid.partition("/dev/sda1").then(response => {
  console.log(response)
})
```

## API

### blkid()

Returns a promise for an array of partitions

### blkid.partition(path)

Returns a promise for an object with the info for the specified partition

* *path* - the path to the partition

## LICENSE

[MIT](https://github.com/otapliger/blkid/blob/master/LICENSE)