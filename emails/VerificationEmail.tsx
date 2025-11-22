import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Section,
  Text,
  Container,
  Body,
  Hr,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verify Your Account</title>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Your verification code is {otp} - expires in 10 minutes</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with gradient */}
          <Section style={header}>
            <Heading style={headerTitle}>Real Feedback</Heading>
            <Text style={headerSubtitle}>Account Verification</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading as="h2" style={greeting}>
              Hello, {username}! 👋
            </Heading>
            
            <Text style={paragraph}>
              Thank you for signing up for <strong>Real Feedback</strong>. To complete your registration and secure your account, please use the verification code below:
            </Text>

            {/* OTP Box */}
            <Section style={otpContainer}>
              <Text style={otpCode}>{otp}</Text>
            </Section>

            <Text style={expiryNotice}>
              ⏱️ This code will expire in <strong>10 minutes</strong>
            </Text>

            <Hr style={divider} />

            {/* Security Notice */}
            <Text style={securityTitle}>🔒 Security Notice</Text>
            <Text style={paragraph}>
              If you didn't request this verification code, please ignore this email. Your account remains secure and no action is needed.
            </Text>

            <Text style={footerNote}>
              Never share this code with anyone, including Real Feedback staff. We will never ask for your verification code.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} Real Feedback. All rights reserved.
            </Text>
            <Text style={footerText}>
              This is an automated message, please do not reply to this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  padding: '20px 0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  maxWidth: '600px',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
};

const header = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '40px 32px',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 8px 0',
  letterSpacing: '-0.5px',
};

const headerSubtitle = {
  color: 'rgba(255, 255, 255, 0.9)',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
};

const content = {
  padding: '40px 32px',
};

const greeting = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 20px 0',
  lineHeight: '1.3',
};

const paragraph = {
  color: '#4a5568',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 20px 0',
};

const otpContainer = {
  backgroundColor: '#f7fafc',
  border: '2px dashed #667eea',
  borderRadius: '12px',
  padding: '24px',
  textAlign: 'center' as const,
  margin: '32px 0',
};

const otpCode = {
  color: '#667eea',
  fontSize: '42px',
  fontWeight: '700',
  letterSpacing: '8px',
  fontFamily: '"Courier New", Courier, monospace',
  margin: '0',
  userSelect: 'all' as const,
};

const expiryNotice = {
  color: '#e53e3e',
  fontSize: '14px',
  fontWeight: '600',
  textAlign: 'center' as const,
  margin: '0 0 24px 0',
};

const divider = {
  borderColor: '#e2e8f0',
  margin: '24px 0',
};

const securityTitle = {
  color: '#2d3748',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 12px 0',
};

const footerNote = {
  color: '#718096',
  fontSize: '13px',
  fontStyle: 'italic' as const,
  margin: '20px 0 0 0',
  padding: '16px',
  backgroundColor: '#edf2f7',
  borderRadius: '8px',
  borderLeft: '4px solid #667eea',
};

const footer = {
  backgroundColor: '#f7fafc',
  padding: '24px 32px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e2e8f0',
};

const footerText = {
  color: '#a0aec0',
  fontSize: '12px',
  margin: '4px 0',
  lineHeight: '1.5',
};
