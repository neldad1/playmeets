import { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form, Input } from 'antd';
import { FlexColumn, Logo } from './Pages.styled';
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from '../common/Firebase';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';
import { FlexBlock, FlexRowLeft, Label } from '../components/Components.styled';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(
      (user) => Boolean(user) && navigate('/events')
    );
    return subscriber; // unsubscribe on unmount
  }, [navigate]);

  return (
    <FlexColumn>
      <Link to="/">
        <Logo data-testid="logo" src="/playmeets/logo512.svg" alt="Playmeets" />
      </Link>

      <FlexRowLeft>
        <Label>Not a member yet?</Label>
        <Link to="/signup">Sign Up</Link>
      </FlexRowLeft>

      <Form layout="vertical">
        <Form.Item label="Email" required>
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </Form.Item>
        <Form.Item label="Password" name="password" required>
          <Input.Password
            placeholder="Enter your password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </Form.Item>
        <Form.Item>
          <FlexBlock>
            <Button
              type="primary"
              onClick={() => logInWithEmailAndPassword(email, password)}
            >
              Log In
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => signInWithGoogle()}
              icon={<GoogleOutlined />}
            >
              Login with Google
            </Button>
          </FlexBlock>
        </Form.Item>
      </Form>
    </FlexColumn>
  );
};

export default LogIn;
