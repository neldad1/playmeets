import { useState, useEffect, SyntheticEvent } from 'react';
import { Button, Form, Input } from 'antd';
import { FlexColumn, FlexRow, Label, Logo } from '../Content/Content.styled';
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from '../../common/Firebase';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';

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
        <Logo src="/logo512.svg" alt="Playmeets" />
      </Link>

      <FlexRow>
        <Label>Not a member yet?</Label>
        <Link to="/signup">Sign Up</Link>
      </FlexRow>

      <Form layout="vertical">
        <Form.Item label="Email" required>
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e: SyntheticEvent) =>
              setEmail((e.target as HTMLInputElement).value)
            }
          />
        </Form.Item>
        <Form.Item label="Password" name="password" required>
          <Input.Password
            placeholder="Enter your password"
            value={password}
            onChange={(e: SyntheticEvent) =>
              setPassword((e.target as HTMLInputElement).value)
            }
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Log In
          </Button>
        </Form.Item>
      </Form>

      <Button
        type="primary"
        ghost
        onClick={signInWithGoogle}
        icon={<GoogleOutlined />}
      >
        Login with Google
      </Button>
    </FlexColumn>
  );
};

export default LogIn;
