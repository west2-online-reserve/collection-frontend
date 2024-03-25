import { resolve } from 'path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
export const pkgPath = resolve(__dirname, '../../../')
