const execa = require('execa')
const _ = require('lodash')

const run = args => execa('blkid', args)
    .then(response =>
        response.stdout.split('\n').map(x => {

            const regexPath = /^(\S+)\:/
            const regexUUID = /\bUUID\b\=\"([^\"]+)\"/
            const regexType = /\bTYPE\b\=\"([^\"]+)\"/
            const regexLabel = /\bLABEL\b\=\"([^\"]+)\"/
            const regexPartUUID = /\bPARTUUID\b\=\"([^\"]+)\"/
            const regexPartLabel = /\bPARTLABEL\b\=\"([^\"]+)\"/

            return {
                path: _.get(x.match(regexPath), '[1]', 'unknown'),
                uuid: _.get(x.match(regexUUID), '[1]', 'unknown'),
                type: _.get(x.match(regexType), '[1]', 'unknown'),
                label: _.get(x.match(regexLabel), '[1]', 'unknown'),
                partuuid: _.get(x.match(regexPartUUID), '[1]', 'unknown'),
                partlabel: _.get(x.match(regexPartLabel), '[1]', 'unknown'),
            }
        })
    )

const blkid = () => run('-c /dev/null')

blkid.partition = path => run('-c /dev/null').then(list => {
    return list.find(function (e) {
        return e.path === path
    })
})

blkid.fs = type => run('-c /dev/null').then(list => {
    return list.filter(function (e) {
        return e.type === type
    })
})

module.exports = blkid