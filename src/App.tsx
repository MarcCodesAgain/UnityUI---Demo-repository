import { useState } from 'react';
import {
  Button,
  Typography,
  Input,
  Select,
  Checkbox,
  Radio,
  Badge,
  Alert,
  Avatar,
  Divider,
  Spinner,
  CountUp,
  Card,
  SpotlightCard,
  Modal,
  useModal,
  CommandPalette,
  useCommandPalette,
  colors,
  fontFamily,
  type CommandItem,
} from '@marcllopis/unityui';

const COMMANDS: CommandItem[] = [
  { id: '1', label: 'Go to Home',        icon: '🏠', group: 'Navigation', shortcut: ['⌘', 'H'], onSelect: () => alert('→ Home') },
  { id: '2', label: 'New Component',     icon: '✦',  group: 'Actions',    shortcut: ['⌘', 'N'], onSelect: () => alert('New component') },
  { id: '3', label: 'Switch Dark Mode',  icon: '🌑', group: 'Theme',      keywords: ['dark', 'theme'], onSelect: () => alert('Dark mode') },
  { id: '4', label: 'View on GitHub',    icon: '⬡',  group: 'Help',       keywords: ['source', 'repo'], onSelect: () => window.open('https://github.com/MarcCodesAgain/UnityUI', '_blank', 'noopener') },
];

const LINKS = [
  { label: 'npm package', href: 'https://www.npmjs.com/package/@marcllopis/unityui' },
  { label: 'Storybook', href: 'https://main--6a3ecef7019c1a5d67a81d71.chromatic.com/' },
  { label: 'Source on GitHub', href: 'https://github.com/MarcCodesAgain/UnityUI' },
];

// Styled with the library's own tokens, as plain links (a <button> inside an <a> is invalid HTML).
const linkStyle: React.CSSProperties = {
  border: `1px solid ${colors.black}`,
  color: colors.black,
  fontFamily: fontFamily.mono,
  fontSize: 12,
  letterSpacing: '0.08em',
  padding: '8px 14px',
  textDecoration: 'none',
  textTransform: 'uppercase',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 64 }}>
      <Typography variant="overline" style={{ color: '#636363', marginBottom: 16, display: 'block' }}>
        {title}
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
        {children}
      </div>
    </section>
  );
}

export default function App() {
  const modal = useModal();
  const cmd = useCommandPalette();
  const [inputVal, setInputVal] = useState('');
  const [selectVal, setSelectVal] = useState('');
  const [checked, setChecked] = useState(false);
  const [radio, setRadio] = useState('a');
  const [dismissed, setDismissed] = useState(false);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 24px', fontFamily: "'Inter', sans-serif" }}>

      <div style={{ marginBottom: 64 }}>
        <Typography variant="overline" style={{ color: '#636363' }}>@marcllopis/unityui</Typography>
        <Typography variant="h1" style={{ margin: '8px 0 16px' }}>Component Showcase</Typography>
        <Typography variant="body" style={{ color: '#636363', maxWidth: 560 }}>
          A quick tour of all UnityUI components imported from npm and running in a plain Vite + React app.
        </Typography>
        <nav aria-label="Project links" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer" style={linkStyle}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <Divider variant="strong" spacing="lg" />

      <Section title="Buttons">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="lg">Large</Button>
        <Button variant="primary" loading>Loading</Button>
        <Button variant="primary" disabled>Disabled</Button>
      </Section>

      <Section title="Typography">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="body">Body text — Inter, 16px, the workhorse of the system.</Typography>
          <Typography variant="caption">Caption — smaller, secondary information</Typography>
          <Typography variant="overline">Overline — JetBrains Mono, uppercase</Typography>
          <Typography variant="h2">Hover me: headings get a blue sweep</Typography>
          <Typography variant="h2" noHighlight>Same heading with noHighlight</Typography>
        </div>
      </Section>

      <Section title="Badges">
        <Badge label="Default" />
        <Badge label="Primary" variant="primary" />
        <Badge label="Outline" variant="outline" />
        <Badge label="Ghost" variant="ghost" />
        <Badge label="Active" variant="primary" dot />
      </Section>

      <Section title="Alerts">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Alert variant="info" title="Info">Something you should know.</Alert>
          <Alert variant="success" title="Success">Everything went well.</Alert>
          <Alert variant="warning" title="Warning">Proceed with caution.</Alert>
          {!dismissed && (
            <Alert variant="error" title="Error" onDismiss={() => setDismissed(true)}>
              Something went wrong. Dismiss me with the × button.
            </Alert>
          )}
        </div>
      </Section>

      <Section title="Avatars">
        <Avatar initials="ML" size="sm" />
        <Avatar initials="ML" size="md" status="online" />
        <Avatar initials="AK" size="lg" status="away" />
        <Avatar initials="JP" size="xl" status="offline" />
      </Section>

      <Section title="Input & Select">
        <Input
          label="Email"
          placeholder="you@example.com"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
        />
        <Select
          label="Role"
          placeholder="Select a role…"
          value={selectVal}
          onChange={e => setSelectVal(e.target.value)}
          options={[
            { value: 'designer',  label: 'Designer' },
            { value: 'frontend',  label: 'Frontend Developer' },
            { value: 'backend',   label: 'Backend Developer' },
          ]}
        />
      </Section>

      <Section title="Checkbox & Radio">
        <Checkbox
          label="I agree to the Terms of Service"
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
        />
        <div style={{ display: 'flex', gap: 16 }}>
          {(['a', 'b', 'c'] as const).map((val) => (
            <Radio
              key={val}
              label={`Option ${val.toUpperCase()}`}
              name="demo-radio"
              value={val}
              checked={radio === val}
              onChange={() => setRadio(val)}
            />
          ))}
        </div>
      </Section>

      <Section title="Spinner">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="xl" />
      </Section>

      <Section title="CountUp">
        <CountUp to={1_000_000} prefix="$" separator="," duration={2000} />
        <CountUp to={98.6} decimals={1} suffix="%" duration={1500} />
        <CountUp to={42} duration={1000} />
      </Section>

      <Section title="Card">
        <Card style={{ width: 280 }}>
          <Card.Header>
            <Typography variant="h4">Card title</Typography>
          </Card.Header>
          <Card.Body>
            <Typography variant="body" style={{ color: '#636363' }}>
              This is a basic card with header, body and footer sub-components.
            </Typography>
          </Card.Body>
          <Card.Footer>
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button variant="primary" size="sm">Confirm</Button>
          </Card.Footer>
        </Card>

        <Card interactive style={{ width: 280 }}>
          <Card.Body>
            <Badge label="Interactive" variant="primary" />
            <Typography variant="h4" style={{ marginTop: 12 }}>Hover me</Typography>
            <Typography variant="body" style={{ color: '#636363', marginTop: 8 }}>
              Cards can be interactive — hover for the border animation.
            </Typography>
          </Card.Body>
        </Card>
      </Section>

      <Section title="SpotlightCard">
        <SpotlightCard style={{ width: 280, padding: 0 }}>
          <SpotlightCard.Body>
            <SpotlightCard.Icon>⚡</SpotlightCard.Icon>
            <SpotlightCard.Title style={{ marginTop: 16 }}>Fast by default</SpotlightCard.Title>
            <SpotlightCard.Description>
              Move your cursor across the card. Zero React re-renders on mousemove.
            </SpotlightCard.Description>
          </SpotlightCard.Body>
        </SpotlightCard>

        <SpotlightCard glowColor="#22C55E" style={{ width: 280, padding: 0 }}>
          <SpotlightCard.Body>
            <SpotlightCard.Icon>✦</SpotlightCard.Icon>
            <SpotlightCard.Title style={{ marginTop: 16 }}>Custom glow</SpotlightCard.Title>
            <SpotlightCard.Description>
              Any hex colour works — the glow adapts automatically.
            </SpotlightCard.Description>
          </SpotlightCard.Body>
        </SpotlightCard>
      </Section>

      <Section title="Modal">
        <Button variant="primary" onClick={modal.open}>Open Modal</Button>
        <Modal isOpen={modal.isOpen} onClose={modal.close} title="Confirm action" size="sm">
          <Modal.Body>
            Are you sure you want to continue? This action cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={modal.close}>Cancel</Button>
            <Button variant="primary" onClick={modal.close}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </Section>

      <Section title="Command Palette">
        <Button variant="secondary" onClick={cmd.open}>Open Palette</Button>
        <Typography variant="caption" style={{ color: '#888' }}>or press ⌘K</Typography>
        <CommandPalette {...cmd} items={COMMANDS} />
      </Section>

      <Divider variant="strong" spacing="lg" />

      <div style={{ textAlign: 'center', paddingTop: 16 }}>
        <Typography variant="caption" style={{ color: '#ABABAB' }}>
          Built with @marcllopis/unityui · Swiss Minimalism Design System
        </Typography>
      </div>
    </div>
  );
}
