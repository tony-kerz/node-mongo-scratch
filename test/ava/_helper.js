import debug from '@watchmen/debug'

const dbg = debug(__filename)

export function check({result}) {
  result.error && dbg('error=%o', result.error)
}
