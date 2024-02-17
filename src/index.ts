import loadConfigurations from './core/config/setup'
import { startServer } from './core/infrastructure/server'

async function startUp() {
  await loadConfigurations()
  await startServer()
}

void startUp()
