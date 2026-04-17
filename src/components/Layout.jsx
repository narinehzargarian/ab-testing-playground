import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ActionButton, Flex, Text, View, Heading } from '@adobe/react-spectrum';
import Home from '@spectrum-icons/workflow/Home';
import ShoppingCart from '@spectrum-icons/workflow/ShoppingCart';
import GraphBarVertical from '@spectrum-icons/workflow/GraphBarVertical';
import Education from '@spectrum-icons/workflow/Education';
import FileAdd from '@spectrum-icons/workflow/FileAdd';
import RealTimeCustomerProfile from '@spectrum-icons/workflow/RealTimeCustomerProfile';
import { useState } from 'react';
import UserSwitcher from './UserSwitcher';
import DebugPanel from './DebugPanel';

const navItems = [
  { path: '/', label: 'Landing', icon: <Home /> },
  { path: '/pricing', label: 'Pricing', icon: <ShoppingCart /> },
  { path: '/onboarding', label: 'Onboarding', icon: <Education /> },
  { path: '/upload', label: 'Upload', icon: <FileAdd /> },
  { path: '/dashboard', label: 'Dashboard', icon: <GraphBarVertical /> },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileUserPicker, setShowMobileUserPicker] = useState(false);

  return (
    <View UNSAFE_className="app-layout">
      {/* Sidebar — desktop */}
      <View UNSAFE_className="sidebar">
        <View padding="size-300">
          <Heading level={3} margin={0} UNSAFE_className="sidebar-title">
            A/B Testing
          </Heading>
          <Text UNSAFE_className="sidebar-subtitle">A/B Testing Playground</Text>
        </View>

        <Flex direction="column" gap="size-50" UNSAFE_className="sidebar-nav" marginTop="size-200">
          {navItems.map(item => (
            <ActionButton
              key={item.path}
              isQuiet
              onPress={() => navigate(item.path)}
              UNSAFE_className={`nav-item ${location.pathname === item.path ? 'nav-item-active' : ''}`}
            >
              {item.icon}
              <Text>{item.label}</Text>
            </ActionButton>
          ))}
        </Flex>

        <View UNSAFE_className="sidebar-user-switcher">
          <UserSwitcher />
        </View>
      </View>

      {/* Main content */}
      <View UNSAFE_className="main-content">
        <Outlet />
      </View>

      {/* Bottom nav — mobile */}
      <View UNSAFE_className="bottom-nav">
        {showMobileUserPicker && (
          <View UNSAFE_className="mobile-user-picker-popup">
            <UserSwitcher />
          </View>
        )}
        <Flex justifyContent="space-around">
          {navItems.map(item => (
            <ActionButton
              key={item.path}
              isQuiet
              onPress={() => navigate(item.path)}
              UNSAFE_className={`bottom-nav-item ${location.pathname === item.path ? 'nav-item-active' : ''}`}
            >
              {item.icon}
            </ActionButton>
          ))}
          <ActionButton
            isQuiet
            onPress={() => setShowMobileUserPicker(!showMobileUserPicker)}
            UNSAFE_className={`bottom-nav-item ${showMobileUserPicker ? 'nav-item-active' : ''}`}
          >
            <RealTimeCustomerProfile />
          </ActionButton>
        </Flex>
      </View>

      {/* Debug panel — floating */}
      <DebugPanel />
    </View>
  );
}
