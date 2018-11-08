const execa = require('execa')

const run = args => execa('blkid', args)
    .then(response =>
        response.stdout.split('\n').map(x => {
            return {
                path: (x.match(/^(\S+)\:/) || [null])[1],
                uuid: (x.match(/\bUUID\b\=\"([^\"]+)\"/) || [null])[1],
                type: (x.match(/\bTYPE\b\=\"([^\"]+)\"/) || [null])[1],
                label: (x.match(/\bLABEL\b\=\"([^\"]+)\"/) || [null])[1],
                partuuid: (x.match(/\bPARTUUID\b\=\"([^\"]+)\"/) || [null])[1],
                partlabel: (x.match(/\bPARTLABEL\b\=\"([^\"]+)\"/) || [null])[1]
            }
        })
    )

const blkid = () => run('-c /dev/null');

blkid.partition = path => run('-c /dev/null').then(list => {
    return list.find(function (e) {
        return e.path === path
    })
})

module.exports = blkid;