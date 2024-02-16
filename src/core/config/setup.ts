// load all modules
import 'src/modules/user/setup'
import { startServer } from '../infrastructure/server'

export default function setup() {
  // Add your setup code here
  console.log('Setup code')

  console.log('start server')
  void startServer()
}
