const execa = require('execa')
const _ = require('lodash')

const run = args => execa('blkid', args)
    .then(response =>
        response.stdout.split('\n').map(x => {

            const path = x.match(/^(\S+)\:/)
            const uuid = x.match(/\bUUID\b\=\"([^\"]+)\"/)
            const type = x.match(/\bTYPE\b\=\"([^\"]+)\"/)
            const label = x.match(/\bLABEL\b\=\"([^\"]+)\"/)
            const partuuid = x.match(/\bPARTUUID\b\=\"([^\"]+)\"/)
            const partlabel = x.match(/\bPARTLABEL\b\=\"([^\"]+)\"/)

            return {
                path: _.get(path, '[1]', 'unknown'),
                uuid: _.get(uuid, '[1]', 'unknown'),
                type: _.get(type, '[1]', 'unknown'),
                label: _.get(label, '[1]', 'unknown'),
                partuuid: _.get(partuuid, '[1]', 'unknown'),
                partlabel: _.get(partlabel, '[1]', 'unknown'),
            }
        })
    )

const blkid = () => run('-c /dev/null')

blkid.partition = path => run('-c /dev/null').then(list => {
    return list.find(function (e) {
        return e.path === path
    })
})

module.exports = blkid