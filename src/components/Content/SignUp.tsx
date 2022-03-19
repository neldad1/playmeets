import { useState, useEffect, SyntheticEvent } from 'react';
import { Button, Form, Input } from 'antd';
import {
  AuthFlexColumn,
  AuthFlexRow,
  Label,
  Logo,
} from '../Content/Content.styled';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../../Firebase';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';
import { displayError } from '../../Common/AlertMessage';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const register = () => {
    if (!name) displayError('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(
      (user) => Boolean(user) && navigate('/finishsignup')
    );
    return subscriber; // unsubscribe on unmount
  }, [navigate]);

  return (
    <AuthFlexColumn>
      <Link to="/">
        <Logo src="/logo512.svg" alt="Playmeets" />
      </Link>

      <AuthFlexRow>
        <Label>Already a member?</Label>
        <Link to="/login">Log In</Link>
      </AuthFlexRow>

      <Form layout="vertical">
        <Form.Item label="Full Name" required>
          <Input
            placeholder="Enter your full name"
            value={name}
            onChange={(e: SyntheticEvent) =>
              setName((e.target as HTMLInputElement).value)
            }
          />
        </Form.Item>
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
          <Button type="primary" onClick={register}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>

      <Button
        type="primary"
        ghost
        onClick={signInWithGoogle}
        icon={<GoogleOutlined />}
      >
        Continue with Google
      </Button>
    </AuthFlexColumn>
  );
};

export default SignUp;
