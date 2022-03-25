import { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form, Input } from 'antd';
import { FlexColumn, Logo } from './Pages.styled';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../common/Firebase';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';
import { displayError } from '../common/AlertMessage';
import { FlexRow, Label } from '../components/Components.styled';

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
      (user) => Boolean(user) && navigate('/finish-signup')
    );
    return subscriber; // unsubscribe on unmount
  }, [navigate]);

  return (
    <FlexColumn>
      <Link to="/">
        <Logo src="/logo512.svg" alt="Playmeets" />
      </Link>

      <FlexRow>
        <Label>Already a member?</Label>
        <Link to="/login">Log In</Link>
      </FlexRow>

      <Form layout="vertical">
        <Form.Item label="Full Name" required>
          <Input
            placeholder="Enter your full name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </Form.Item>
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
    </FlexColumn>
  );
};

export default SignUp;
