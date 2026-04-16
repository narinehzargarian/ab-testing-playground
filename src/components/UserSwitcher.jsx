/**
 * UserSwitcher — a dropdown to switch between simulated users.
 *
 * In production you'd never have this — the SDK identifies users
 * automatically. This exists purely for demo purposes so you can
 * see how different users get different variant assignments
 * and personalized experiences.
 */

import { Picker, Item, Text, Flex, View } from '@adobe/react-spectrum';
import { useExperimentContext } from '../experimentation/ExperimentContext';
import { mockUsers } from '../data/mockUsers';

export default function UserSwitcher() {
  const { currentUser, setCurrentUser } = useExperimentContext();

  return (
    <View padding="size-200">
      <Picker
        label="Simulated User"
        selectedKey={currentUser.id}
        onSelectionChange={(key) => {
          const user = mockUsers.find(u => u.id === key);
          if (user) setCurrentUser(user);
        }}
        width="100%"
      >
        {mockUsers.map(user => (
          <Item key={user.id} textValue={user.name}>
            <Text>{user.name}</Text>
            <Text slot="description">{user.segment} {user.isNewVisitor ? '(new)' : ''}</Text>
          </Item>
        ))}
      </Picker>
      <Flex gap="size-100" marginTop="size-100" alignItems="center" UNSAFE_className="segment-badge-container">
        <View
          UNSAFE_className={`segment-badge segment-${currentUser.segment}`}
          padding="size-50"
          borderRadius="regular"
        >
          <Text UNSAFE_className="segment-badge-text">{currentUser.segment}</Text>
        </View>
      </Flex>
    </View>
  );
}
