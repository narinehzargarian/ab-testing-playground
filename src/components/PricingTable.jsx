/**
 * PricingTable — Variant B of the pricing layout experiment.
 * A comparison table showing all plans side by side with feature rows.
 */

import { Button, Text, View } from '@adobe/react-spectrum';

const features = [
  { name: 'View PDFs', free: true, pro: true, enterprise: true },
  { name: 'Convert files', free: '2/day', pro: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Edit PDFs', free: false, pro: true, enterprise: true },
  { name: 'E-signatures', free: false, pro: true, enterprise: true },
  { name: 'Compress files', free: false, pro: true, enterprise: true },
  { name: 'Admin console', free: false, pro: false, enterprise: true },
  { name: 'SSO integration', free: false, pro: false, enterprise: true },
  { name: 'Priority support', free: false, pro: false, enterprise: true },
];

function CellValue({ value }) {
  if (value === true) return <Text UNSAFE_className="table-check">✓</Text>;
  if (value === false) return <Text UNSAFE_className="table-cross">—</Text>;
  return <Text UNSAFE_className="table-value">{value}</Text>;
}

export default function PricingTable({ onSelectPlan }) {
  return (
    <View UNSAFE_className="pricing-table-container">
      <table className="pricing-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Free<br /><span className="table-price">$0/mo</span></th>
            <th className="table-popular">Pro<br /><span className="table-price">$19.99/mo</span></th>
            <th>Enterprise<br /><span className="table-price">$34.99/user/mo</span></th>
          </tr>
        </thead>
        <tbody>
          {features.map(f => (
            <tr key={f.name}>
              <td>{f.name}</td>
              <td><CellValue value={f.free} /></td>
              <td className="table-popular"><CellValue value={f.pro} /></td>
              <td><CellValue value={f.enterprise} /></td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td>
              <Button variant="primary" style="outline" onPress={() => onSelectPlan?.('Free')}>Get Started</Button>
            </td>
            <td className="table-popular">
              <Button variant="accent" style="fill" onPress={() => onSelectPlan?.('Pro')}>Start Free Trial</Button>
            </td>
            <td>
              <Button variant="primary" style="outline" onPress={() => onSelectPlan?.('Enterprise')}>Contact Sales</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
}
