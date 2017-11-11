const path = require('path')
const url = require('url')

const fs = require('fs-extra')
const { send } = require('micro')

const NOTES = 'C,C#,Db,D,D#,Eb,E,F,F#,Gb,G,G#,Ab,A,A#,Bb,B'.split(',')
const CHORDS = '5,7,7#5,9,dim,m,m7,m7b5,m9,maj,maj7'.split(',')
const REG_EXP = new RegExp(`^(${NOTES.join('|')})(${CHORDS.join('|')})?$`)
const DOC_URL = 'https://github.com/shiningjason1989/chords'
const ERR_NOT_FOUND = `Not Found: See ${DOC_URL} to find available endpoints.`
const ERR_BAD_REQUEST = `Bad Request: See ${DOC_URL} to find expected params.`

module.exports = async (req, res) => {
  const { query, pathname } = url.parse(req.url, true)

  if (pathname !== '/') return send(res, 404, { error: ERR_NOT_FOUND })
  if (!query || !query.names) return send(res, 400, { error: ERR_BAD_REQUEST })

  const shapes = {}
  const names = Array.isArray(query.names)
    ? query.names
    : query.names.split(',')
  for (let name of names) {
    if (shapes[name]) continue
    const matches = name.match(REG_EXP)
    if (matches) {
      const [, note, chord = 'maj'] = matches
      const pathname = path.join(
        __dirname,
        'node_modules/chord-chart/guitar',
        `${note}${chord}.json`
      )
      shapes[name] = await fs.readJson(pathname)
    }
  }

  return shapes
}
