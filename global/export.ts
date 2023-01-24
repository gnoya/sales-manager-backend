import { exportConfig } from './config/export'
import { exportContracts } from './contracts/export'

const exportingConfiguration: Record<string, string[]> = {
  user: ['user', 'sale', 'auth'],
  product: ['product', 'sale'],
  sale: ['sale'],
  auth: ['auth', 'gateway'],
  gateway: [],
}

export default function exportGlobal() {
  console.log('\nExporting contracts:')
  exportContracts(exportingConfiguration)

  console.log('\nExporting config files:')
  exportConfig(Object.keys(exportingConfiguration))
  console.log('')
}
