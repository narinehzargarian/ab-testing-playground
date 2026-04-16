/**
 * FeaturesSection — static feature grid, no experiments here.
 *
 * Not everything on the page is experimented on. This section shows
 * Acrobat Web's core features and stays the same for all users.
 * It provides context for the experiments above and below it.
 */

import { Flex, Heading, Text, View } from '@adobe/react-spectrum';

const features = [
  {
    title: 'Convert PDF',
    description: 'Turn Word, Excel, and PowerPoint files into PDFs. Convert PDFs to other formats.',
    icon: '📄'
  },
  {
    title: 'Edit PDF',
    description: 'Add, delete, and modify text and images directly in your PDF documents.',
    icon: '✏️'
  },
  {
    title: 'Sign Documents',
    description: 'Request and add electronic signatures to any document in minutes.',
    icon: '✍️'
  },
  {
    title: 'Compress PDF',
    description: 'Reduce file size while maintaining quality. Perfect for email attachments.',
    icon: '📦'
  }
];

export default function FeaturesSection() {
  return (
    <View UNSAFE_className="features-section" padding="size-500">
      <Heading level={2} UNSAFE_className="features-heading" alignSelf="center">
        Everything you need for PDFs
      </Heading>
      <Flex UNSAFE_className="features-grid" gap="size-300" wrap justifyContent="center">
        {features.map(feature => (
          <View key={feature.title} UNSAFE_className="feature-card" padding="size-300">
            <Text UNSAFE_className="feature-icon">{feature.icon}</Text>
            <Heading level={3} UNSAFE_className="feature-title">{feature.title}</Heading>
            <Text UNSAFE_className="feature-description">{feature.description}</Text>
          </View>
        ))}
      </Flex>
    </View>
  );
}
